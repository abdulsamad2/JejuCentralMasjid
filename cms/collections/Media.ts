import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'News image', plural: 'News images' },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    description:
      'Photos uploaded for news posts. Images are automatically resized and compressed (WebP).',
  },
  upload: {
    // Local dev fallback directory; in production the Vercel Blob plugin
    // stores files in Blob storage instead.
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*'],
    // Super-compress: cap at 1600px wide and convert to WebP.
    resizeOptions: { width: 1600, withoutEnlargement: true },
    formatOptions: { format: 'webp', options: { quality: 65 } },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Optional: short description of the photo. Filled from the filename if left empty.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value.trim() !== '') return value
            const filename = typeof data?.filename === 'string' ? data.filename : ''
            return filename.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ').trim() || 'News photo'
          },
        ],
      },
    },
  ],
}
