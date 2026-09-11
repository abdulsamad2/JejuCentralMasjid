import 'server-only'
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { NewsItem } from '@/lib/data/news'
import type { EventItem } from '@/lib/data/events'
import type { GalleryItem } from '@/lib/data/gallery'
import { HERO_SLIDES, type HeroSlide } from '@/lib/data/heroSlides'

/**
 * Read-side bridge between Payload CMS and the frontend components.
 * Maps CMS documents onto the plain NewsItem/EventItem/GalleryItem/HeroSlide
 * shapes the components were already built around.
 */

type NewsDoc = {
  slug?: string | null
  title: string
  excerpt: string
  body: string
  date: string
  tag?: string | null
  photo?: number | { url?: string | null } | null
  image?: string | null
}

type EventDoc = {
  title: string
  description?: string | null
  startDate: string
  startTime?: string | null
  endTime?: string | null
  location?: string | null
  recurring?: string | null
}

const paragraphs = (text: string): string[] =>
  text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean)

const mapNews = (doc: NewsDoc): NewsItem => ({
  slug: doc.slug ?? '',
  title: doc.title,
  excerpt: doc.excerpt,
  body: paragraphs(doc.body),
  date: doc.date.slice(0, 10),
  tag: doc.tag ?? undefined,
  image:
    (doc.photo && typeof doc.photo === 'object' && doc.photo.url) || doc.image || undefined,
})

// Payload stores the admin-chosen focal point as percentages; used as the
// CSS object-position so object-cover crops keep the subject in frame.
const focalPosition = (doc: { focalX?: number | null; focalY?: number | null }): string | undefined =>
  doc.focalX == null || doc.focalY == null ? undefined : `${doc.focalX}% ${doc.focalY}%`

const mapEvent = (doc: EventDoc): EventItem => ({
  title: doc.title,
  description: doc.description ?? undefined,
  startDate: doc.startDate.slice(0, 10),
  startTime: doc.startTime ?? undefined,
  endTime: doc.endTime ?? undefined,
  location: doc.location ?? undefined,
  recurring: doc.recurring ?? undefined,
})

export async function getAllNews(): Promise<NewsItem[]> {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'news',
      sort: '-date',
      limit: 100,
      depth: 1,
    })
    return (docs as NewsDoc[]).map(mapNews)
  } catch (err) {
    console.error('CMS unavailable — rendering without news:', err)
    return []
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'news',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    const doc = (docs as NewsDoc[])[0]
    return doc ? mapNews(doc) : undefined
  } catch (err) {
    console.error('CMS unavailable — news post not rendered:', err)
    return undefined
  }
}

export async function getEvents(): Promise<EventItem[]> {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'events',
      sort: 'startDate',
      limit: 100,
    })
    // Hide one-off events once their date has passed (Korea time);
    // recurring events (e.g. "Every Friday") stay visible with their date
    // rolled forward to the next occurrence of the same weekday.
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })
    return (docs as EventDoc[])
      .map(mapEvent)
      .filter((ev) => ev.recurring || ev.startDate >= today)
      .map((ev) => {
        if (!ev.recurring || ev.startDate >= today) return ev
        const weekday = new Date(ev.startDate + 'T00:00:00Z').getUTCDay()
        const todayDate = new Date(today + 'T00:00:00Z')
        const daysAhead = (weekday - todayDate.getUTCDay() + 7) % 7
        const next = new Date(todayDate.getTime() + daysAhead * 86400000)
        return { ...ev, startDate: next.toISOString().slice(0, 10) }
      })
      .sort((a, b) => a.startDate.localeCompare(b.startDate))
  } catch (err) {
    console.error('CMS unavailable — rendering without events:', err)
    return []
  }
}

export async function getGallery(): Promise<{ categories: string[]; items: GalleryItem[] }> {
  try {
    const payload = await getPayload({ config })
    const [categories, photos] = await Promise.all([
      payload.find({
        collection: 'gallery-categories',
        sort: '_order',
        pagination: false,
        depth: 0,
        select: { name: true },
      }),
      // Gallery photos are the Images that have a gallery category. No
      // `select`: the upload url is computed from the filename and comes back
      // null if it isn't loaded.
      payload.find({
        collection: 'media',
        where: { galleryCategory: { exists: true } },
        sort: '_order',
        pagination: false,
        depth: 0,
      }),
    ])
    const nameById = new Map(categories.docs.map((c) => [c.id, c.name]))
    const items = photos.docs.flatMap((doc): GalleryItem[] => {
      const categoryId = typeof doc.galleryCategory === 'object' ? doc.galleryCategory?.id : doc.galleryCategory
      const category = categoryId == null ? undefined : nameById.get(categoryId)
      if (!doc.url || !category) return []
      return [{ src: doc.url, title: doc.alt || '', category, position: focalPosition(doc) }]
    })
    return {
      categories: categories.docs.map((c) => c.name).filter((name) => items.some((i) => i.category === name)),
      items,
    }
  } catch (err) {
    // Rethrow rather than return an empty gallery: when a background
    // revalidation fails, Next.js keeps serving the last good page, whereas an
    // empty result would be cached. (Not falling back to the original static
    // list either — that could bring back photos an admin has removed.)
    console.error('CMS unavailable — keeping the last good gallery page:', err)
    throw err
  }
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const payload = await getPayload({ config })
    const { slides } = await payload.findGlobal({ slug: 'home-slider', depth: 1 })
    const mapped = (slides ?? []).flatMap((slide): HeroSlide[] => {
      const image = typeof slide.image === 'object' ? slide.image : null
      if (slide.visible === false || !image?.url) return []
      return [
        {
          src: image.url,
          alt: image.alt || slide.title,
          title: slide.title,
          description: slide.description,
          ctaLabel: slide.ctaLabel,
          ctaHref: slide.ctaHref,
          position: focalPosition(image),
        },
      ]
    })
    // The homepage hero must never be empty — fall back to the built-in slides.
    return mapped.length > 0 ? mapped : HERO_SLIDES
  } catch (err) {
    console.error('CMS unavailable — rendering built-in hero slides:', err)
    return HERO_SLIDES
  }
}

export type SitePhoto = { src: string; alt: string; position?: string }

/** The Page photos slots (see cms/globals/PagePhotos.ts), fetched once per render. */
export const getPagePhotos = cache(async () => {
  try {
    const payload = await getPayload({ config })
    return await payload.findGlobal({ slug: 'page-photos', depth: 1 })
  } catch (err) {
    console.error('CMS unavailable — using built-in page photos:', err)
    return null
  }
})

type MediaLike = { url?: string | null; alt?: string | null; focalX?: number | null; focalY?: number | null }

/** The admin's choice for a slot, or the section's built-in photo when the slot is empty. */
export function pickPhoto(value: unknown, fallback: SitePhoto): SitePhoto {
  const media = value && typeof value === 'object' ? (value as MediaLike) : null
  if (!media?.url) return fallback
  return { src: media.url, alt: media.alt || fallback.alt, position: focalPosition(media) }
}

/** Multi-photo slots: the admin's photos in order, or the built-in set when none are chosen. */
export function pickPhotos(values: unknown, fallback: SitePhoto[]): SitePhoto[] {
  const chosen = (Array.isArray(values) ? values : [])
    .map((v) => pickPhoto(v, { src: '', alt: '' }))
    .filter((p) => p.src)
  return chosen.length > 0 ? chosen : fallback
}
