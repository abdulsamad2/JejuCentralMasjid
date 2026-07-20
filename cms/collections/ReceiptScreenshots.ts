import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const ReceiptScreenshots: CollectionConfig = {
  slug: 'receipt-screenshots',
  labels: { singular: 'Receipt screenshot', plural: 'Receipt screenshots' },
  access: {
    // Uploads come only via /api/receipt-request (validated, rate-limited);
    // the raw REST create is closed. Screenshots contain bank details —
    // never publicly readable.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Inbox',
    description: 'Payment screenshots uploaded with receipt requests. Admin-only.',
  },
  upload: {
    staticDir: path.resolve(dirname, '../../receipt-screenshots'),
    mimeTypes: ['image/*'],
    // Keep stored size small — these are only for verification.
    resizeOptions: { width: 1200, withoutEnlargement: true },
    formatOptions: { format: 'webp', options: { quality: 75 } },
  },
  fields: [],
}
