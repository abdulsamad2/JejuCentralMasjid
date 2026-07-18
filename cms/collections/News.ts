import type { CollectionConfig } from 'payload'

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'News post', plural: 'News' },
  defaultSort: '-date',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'tag'],
    group: 'Content',
    description: 'Announcements shown on the homepage, the news ticker, and the News page.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'The URL of the post, e.g. "eid-al-fitr-2026". Leave empty to generate from the title.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value.trim() !== '') return slugify(value)
            if (data?.title) return slugify(data.title)
            return value
          },
        ],
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' },
      },
    },
    {
      name: 'tag',
      type: 'select',
      options: ['Announcement', 'Event', 'Timetable', 'Appeal', 'Community'],
      admin: { position: 'sidebar', isClearable: true },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: 'Short summary shown on cards and in the news ticker (1–2 sentences).' },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      admin: {
        rows: 14,
        description: 'The full text of the post. Separate paragraphs with an empty line.',
      },
    },
    {
      name: 'photo',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Drag & drop a photo here. Any size is fine — it is compressed automatically.',
      },
    },
    {
      // Legacy static-path images (used by the original seeded posts).
      // Hidden from the admin UI — new posts use the Photo upload above.
      name: 'image',
      type: 'text',
      admin: { hidden: true },
    },
  ],
}
