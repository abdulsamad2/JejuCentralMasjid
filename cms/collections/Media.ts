import path from 'path'
import { fileURLToPath } from 'url'
import { APIError, type CollectionConfig } from 'payload'

import { revalidatePaths } from '../revalidate'
import { photoUpload } from '../uploads'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * The one photo library. Every photo on the site lives here and is picked
 * from here: the gallery (any image with a Gallery category), the homepage
 * slider, news posts and the Page photos slots.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image', plural: 'Images' },
  // Drag-and-drop ordering; the Gallery page shows its photos in this order.
  orderable: true,
  access: {
    read: () => true,
  },
  admin: {
    group: 'Images',
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'galleryCategory'],
    components: { Description: '/cms/components/ImagesListGuide#ImagesListGuide' },
  },
  hooks: {
    // Images appear across the site — refresh every page.
    afterChange: [revalidatePaths({ path: '/', type: 'layout' })],
    afterDelete: [revalidatePaths({ path: '/', type: 'layout' })],
    beforeDelete: [
      // Explain where an image is still needed instead of silently leaving a
      // slide or post without its photo.
      async ({ id, req }) => {
        const slider = await req.payload.findGlobal({ slug: 'home-slider', depth: 0, req })
        const inSlider = (slider.slides ?? []).some((s) => (typeof s.image === 'object' ? s.image?.id : s.image) === id)
        if (inSlider) {
          throw new APIError(
            'This image is used in the homepage slider. Replace or remove that slide first.',
            400,
            undefined,
            true,
          )
        }
        const { totalDocs } = await req.payload.count({ collection: 'news', where: { photo: { equals: id } }, req })
        if (totalDocs > 0) {
          throw new APIError(
            `This image is the photo of ${totalDocs} news post${totalDocs === 1 ? '' : 's'}. Choose another photo for ${totalDocs === 1 ? 'it' : 'them'} first.`,
            400,
            undefined,
            true,
          )
        }
      },
    ],
  },
  upload: {
    // Local dev fallback directory; in production the Vercel Blob plugin
    // stores files in Blob storage instead.
    staticDir: path.resolve(dirname, '../../media'),
    ...photoUpload,
  },
  fields: [
    {
      name: 'tips',
      type: 'ui',
      admin: { components: { Field: '/cms/components/AdminGuides#PhotoTips' } },
    },
    {
      name: 'alt',
      label: 'Caption',
      type: 'text',
      admin: {
        description:
          'A few words about the photo, e.g. "Eid prayer 2026". Shown in the gallery and read aloud to blind visitors. Filled from the file name if left empty.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value.trim() !== '') return value
            const filename = typeof data?.filename === 'string' ? data.filename : ''
            return filename.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ').trim() || 'Photo'
          },
        ],
      },
    },
    {
      name: 'galleryCategory',
      label: 'Gallery category',
      type: 'relationship',
      relationTo: 'gallery-categories',
      admin: {
        position: 'sidebar',
        description: 'Choose a category to show this photo on the Gallery page. Leave empty to keep it out of the gallery.',
      },
    },
  ],
}
