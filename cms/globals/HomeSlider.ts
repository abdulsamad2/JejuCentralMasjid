import type { GlobalConfig, PayloadRequest } from 'payload'

import { revalidatePaths } from '../revalidate'

// Slides are shown full-width (up to ~2.2:1 on desktop), so small or
// portrait photos look blurry or get cut down to a thin strip.
const MIN_SLIDE_WIDTH = 1200

export const HomeSlider: GlobalConfig = {
  slug: 'home-slider',
  label: 'Homepage slider',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    description: 'The big rotating banner at the top of the homepage.',
  },
  hooks: {
    afterChange: [revalidatePaths('/')],
  },
  fields: [
    {
      name: 'guide',
      type: 'ui',
      admin: { components: { Field: '/cms/components/AdminGuides#SliderGuide' } },
    },
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Slide', plural: 'Slides' },
      admin: {
        initCollapsed: true,
        components: { RowLabel: '/cms/components/SlideRowLabel#SlideRowLabel' },
      },
      fields: [
        {
          name: 'visible',
          label: 'Show on website',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Untick to hide this slide without deleting it.' },
          validate: (value: boolean | null | undefined, { data }: { data: unknown }) => {
            if (value !== false) return true
            const slides = (data as { slides?: { visible?: boolean | null }[] })?.slides ?? []
            return slides.some((s) => s.visible !== false)
              ? true
              : 'At least one slide must be shown on the website.'
          },
        },
        {
          name: 'image',
          label: 'Photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'A wide (landscape) photo, at least 1200 pixels wide. Any file size is fine — it is compressed automatically.',
          },
          validate: async (value: unknown, { req }: { req: PayloadRequest }) => {
            if (!value) return 'Please choose a photo.'
            const id = typeof value === 'object' ? (value as { id: number }).id : (value as number)
            try {
              const image = await req.payload.findByID({ collection: 'media', id, depth: 0, req })
              const { width, height } = image
              if (!width || !height) return true
              if (height > width) {
                return 'This photo is upright (portrait). Please use a wide (landscape) photo — one taken with the phone held sideways.'
              }
              if (width < MIN_SLIDE_WIDTH) {
                return `This photo is too small (${width} pixels wide) and would look blurry. Please use a photo at least ${MIN_SLIDE_WIDTH} pixels wide — any photo straight from a phone camera is fine.`
              }
            } catch {
              // Image lookup failed — let the relationship check report it.
            }
            return true
          },
        },
        {
          name: 'title',
          label: 'Heading',
          type: 'text',
          required: true,
          maxLength: 60,
          admin: { description: '2–5 words, e.g. "Jummah at the Masjid".' },
        },
        {
          name: 'description',
          label: 'Text',
          type: 'textarea',
          required: true,
          maxLength: 260,
          admin: { description: 'One or two sentences shown under the heading.' },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'ctaLabel',
              label: 'Button text',
              type: 'text',
              required: true,
              maxLength: 30,
              admin: { width: '50%', description: 'e.g. "Visit Us" or "Support Us".' },
            },
            {
              name: 'ctaHref',
              label: 'Button link',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
                description: 'A page on this site, e.g. /donate — or a full https:// link.',
              },
              validate: (value: string | null | undefined) =>
                !value || /^(\/|https?:\/\/)/.test(value)
                  ? true
                  : 'Start with / for a page on this site (e.g. /donate) or https:// for an external link.',
            },
          ],
        },
      ],
    },
  ],
}
