import type { CollectionConfig } from 'payload'

export const PageViews: CollectionConfig = {
  slug: 'pageviews',
  labels: { singular: 'Page view', plural: 'Page views' },
  access: {
    // Recorded server-side by the /api/track endpoint (local API bypasses
    // access control); the public REST API can neither write nor read.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Admin',
    useAsTitle: 'path',
    defaultColumns: ['path', 'source', 'country', 'device', 'day'],
    description:
      'Raw visitor data, recorded automatically. See the dashboard for the summary charts.',
  },
  fields: [
    { name: 'path', type: 'text', required: true, index: true },
    { name: 'day', type: 'text', required: true, index: true },
    { name: 'source', type: 'text' },
    { name: 'referrer', type: 'text' },
    { name: 'campaign', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'device', type: 'text' },
    // Salted daily hash — counts unique visitors without storing any
    // personal data (no raw IPs are kept).
    { name: 'visitor', type: 'text', index: true },
  ],
}
