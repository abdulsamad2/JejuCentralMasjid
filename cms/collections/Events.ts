import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Event', plural: 'Events' },
  defaultSort: 'startDate',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'startTime', 'recurring'],
    group: 'Content',
    description: 'Events shown on the homepage calendar and the Events page.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' },
      },
    },
    {
      name: 'startTime',
      type: 'text',
      admin: { position: 'sidebar', description: '24h format, e.g. 13:15' },
    },
    {
      name: 'endTime',
      type: 'text',
      admin: { position: 'sidebar', description: '24h format, e.g. 14:00' },
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Jeju Central Masjid',
    },
    {
      name: 'recurring',
      type: 'text',
      admin: { description: 'Shown as a badge, e.g. "Every Friday". Leave empty for one-off events.' },
    },
  ],
}
