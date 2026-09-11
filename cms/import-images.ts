/**
 * One-time import of the images that used to be hardcoded in the frontend:
 *   - lib/data/gallery.ts    → Gallery categories + Images tagged with a gallery category
 *   - lib/data/heroSlides.ts → Images + the Homepage slider global
 *
 * Every file goes through the normal upload pipeline, so it is compressed
 * (1600px WebP) and stored in Vercel Blob exactly like an admin upload.
 * The originals in public/assets are left untouched.
 *
 * Run with:  npm run import:images
 * Idempotent: existing categories and images are reused (matched by name and
 * filename), and the slider is only filled while it has no slides.
 * Runs sequentially so the drag-and-drop order follows the original lists.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import { generateKeyBetween } from 'payload/shared'
import config from '../payload.config'
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../lib/data/gallery'
import { HERO_SLIDES } from '../lib/data/heroSlides'

const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public')

// Uploads are converted to WebP, so "/assets/eid-prayer.jpg" is stored as "eid-prayer.webp".
const storedFilename = (src: string): string => path.basename(src).replace(/\.[a-z0-9]+$/i, '') + '.webp'

// '50% 72%' → { focalX: 50, focalY: 72 }
const parsePosition = (position?: string): { focalX: number; focalY: number } | undefined => {
  const match = position?.match(/^([\d.]+)%\s+([\d.]+)%$/)
  return match ? { focalX: Number(match[1]), focalY: Number(match[2]) } : undefined
}

// Payload checks the local ./media folder when choosing a filename, even when
// files go to Blob. Stray local copies make it rename every upload
// ("five-time-prayer-02" → "five-time-prayer-3"), which also breaks the
// filename matching that keeps this script safe to re-run.
const localMediaDir = path.resolve(publicDir, '../media')
if (process.env.BLOB_READ_WRITE_TOKEN && fs.existsSync(localMediaDir) && fs.readdirSync(localMediaDir).length > 0) {
  console.error(`Stopping: ${localMediaDir} has local files. Move or delete that folder first, then re-run.`)
  process.exit(1)
}

const payload = await getPayload({ config })

// --- Gallery categories -----------------------------------------------------

const categoryIds = new Map<string, number>()
for (const name of GALLERY_CATEGORIES) {
  const { docs } = await payload.find({
    collection: 'gallery-categories',
    where: { name: { equals: name } },
    limit: 1,
    depth: 0,
  })
  const doc = docs[0] ?? (await payload.create({ collection: 'gallery-categories', data: { name } }))
  if (!docs[0]) payload.logger.info(`Created category: ${name}`)
  categoryIds.set(name, doc.id)
}

// --- Homepage slider ----------------------------------------------------------

const slider = await payload.findGlobal({ slug: 'home-slider', depth: 0 })
if ((slider.slides ?? []).length > 0) {
  payload.logger.info(`Homepage slider already has ${slider.slides.length} slides — skipping.`)
} else {
  const slides = []
  for (const slide of HERO_SLIDES) {
    const filename = storedFilename(slide.src)
    const { docs } = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
      depth: 0,
    })
    const image =
      docs[0] ??
      (await payload.create({
        collection: 'media',
        data: { alt: slide.alt, ...parsePosition(slide.position) },
        filePath: path.join(publicDir, slide.src),
      }))
    slides.push({
      image: image.id,
      title: slide.title,
      description: slide.description,
      ctaLabel: slide.ctaLabel,
      ctaHref: slide.ctaHref,
    })
    payload.logger.info(`Slide image ready: ${slide.src}`)
  }
  await payload.updateGlobal({ slug: 'home-slider', data: { slides } })
  payload.logger.info(`Homepage slider filled with ${slides.length} slides.`)
}

// --- Gallery photos ---------------------------------------------------------
// Gallery photos are Images with a gallery category. An image that is already
// in Images (e.g. one the slider uses — imported above, with its crop point)
// is reused and just gets its category.

let created = 0
let tagged = 0
let skipped = 0
for (const item of GALLERY_ITEMS) {
  const category = categoryIds.get(item.category)
  if (!category) throw new Error(`Unknown category "${item.category}" for ${item.src}`)
  const filename = storedFilename(item.src)
  const { docs } = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  })
  const existing = docs[0]
  if (existing?.galleryCategory) {
    skipped++
    continue
  }
  if (existing) {
    // Move it to the end of the drag-and-drop order (new uploads land there
    // automatically), so the gallery keeps the original list order.
    const { docs: last } = await payload.find({
      collection: 'media',
      where: { _order: { exists: true } },
      sort: '-_order',
      limit: 1,
      depth: 0,
    })
    await payload.update({
      collection: 'media',
      id: existing.id,
      data: { galleryCategory: category, _order: generateKeyBetween(last[0]?._order ?? null, null) },
    })
    tagged++
  } else {
    await payload.create({
      collection: 'media',
      data: { alt: item.title, galleryCategory: category },
      filePath: path.join(publicDir, item.src),
    })
    created++
  }
  payload.logger.info(`[${created + tagged + skipped}/${GALLERY_ITEMS.length}] ${item.src}`)
}
payload.logger.info(`Gallery photos: ${created} uploaded, ${tagged} existing images tagged, ${skipped} already in the gallery.`)

payload.logger.info('Image import complete.')
process.exit(0)
