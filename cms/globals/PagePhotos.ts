import type { Field, GlobalConfig } from 'payload'

import { revalidatePaths } from '../revalidate'

/**
 * One slot per fixed photo on the site, each picked from Images. An empty
 * slot keeps the section's built-in photo (see pickPhoto in lib/cms.ts), so
 * nothing changes on the site until an admin chooses something.
 */

const KEEP = 'Leave empty to keep the current photo.'

const photo = (name: string, label: string, where: string, shape: string): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  admin: { description: `${where} Shown ${shape}. ${KEEP}` },
})

const photos = (name: string, label: string, where: string, shape: string, max: number): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  hasMany: true,
  maxRows: max,
  admin: { description: `${where} Shown ${shape}; choose up to ${max}, in order. ${KEEP}` },
})

// One of the six "Moments from the masjid" cards, laid out three to a row.
const card = (name: string, label: string): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  admin: { width: '33%', description: KEEP },
})

export const PagePhotos: GlobalConfig = {
  slug: 'page-photos',
  label: 'Page photos',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Images',
    description: 'Choose the photo for each section of the website, from Images.',
  },
  hooks: {
    afterChange: [revalidatePaths({ path: '/', type: 'layout' })],
  },
  fields: [
    {
      name: 'guide',
      type: 'ui',
      admin: { components: { Field: '/cms/components/AdminGuides#PagePhotosGuide' } },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Homepage',
          fields: [
            {
              name: 'moments',
              label: 'Community moments cards',
              type: 'group',
              admin: { description: 'The six photo cards in the "Moments from the masjid" section. Each is shown as a 4:3 card with text over the bottom.' },
              fields: [
                { type: 'row', fields: [card('dawah', 'Korean visitors card'), card('eid', 'Eid prayers card'), card('iftar', 'Breaking fast card')] },
                { type: 'row', fields: [card('children', "Children's classes card"), card('jummah', 'Jummah card'), card('gathering', 'Monthly gathering card')] },
              ],
            },
            photos('momentsStrip', 'Photo strip under the cards', 'The row of small photos under the cards, linking to the gallery.', 'as squares', 6),
            photo('weeklyCircles', 'Weekly circles', 'The "Weekly circles" section.', 'tall (4:5)'),
            photo('quranTeacher', "Qur'an teacher", 'The small round portrait in the "Unlock the Qur\'an" section.', 'as a small circle'),
            photo('supportAppeal', 'Support the masjid', 'The donation appeal section.', 'tall (4:5)'),
            photo('visitUs', 'Visit us', 'The "Come pray with us" section above the map — ideally the building.', 'wide (16:9)'),
          ],
        },
        {
          label: 'About page',
          fields: [
            photo('aboutMain', 'Main photo', 'Beside the introduction on the About page.', 'tall (4:5)'),
            photos('aboutLibrary', 'Library photos', 'The library section of the About page.', 'as 4:3 tiles', 4),
          ],
        },
        {
          label: 'Permanent masjid page',
          fields: [photo('permanentMasjid', 'Current masjid photo', 'The photo of the current rented hall.', 'tall (4:5)')],
        },
      ],
    },
  ],
}
