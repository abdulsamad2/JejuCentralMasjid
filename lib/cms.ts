import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { NewsItem } from '@/lib/data/news'
import type { EventItem } from '@/lib/data/events'

/**
 * Read-side bridge between Payload CMS and the frontend components.
 * Maps CMS documents onto the plain NewsItem/EventItem shapes the
 * components were already built around.
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
