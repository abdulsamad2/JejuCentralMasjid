import { APIError, type CollectionConfig } from 'payload'

import { revalidatePaths } from '../revalidate'

export const GalleryCategories: CollectionConfig = {
  slug: 'gallery-categories',
  labels: { singular: 'Gallery category', plural: 'Gallery categories' },
  // Drag-and-drop ordering in the list view; the gallery filter buttons
  // follow this order.
  orderable: true,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'photos'],
    group: 'Images',
    description:
      'The filter buttons on the Gallery page (e.g. "Eid", "Prayers"). Drag a row by the grip on its left to change the order of the buttons. Categories with no photos are hidden on the website.',
  },
  hooks: {
    afterChange: [revalidatePaths('/gallery')],
    afterDelete: [revalidatePaths('/gallery')],
    beforeDelete: [
      // Deleting a category would leave its photos uncategorised — make the
      // admin move or delete them first.
      async ({ id, req }) => {
        const { totalDocs } = await req.payload.count({
          collection: 'media',
          where: { galleryCategory: { equals: id } },
          req,
        })
        if (totalDocs > 0) {
          throw new APIError(
            `This category still has ${totalDocs} photo${totalDocs === 1 ? '' : 's'}. In Images, move them to another category (or clear their Gallery category) first.`,
            400,
            undefined,
            true,
          )
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'The text on the filter button, e.g. "Eid".' },
    },
    {
      name: 'photos',
      type: 'join',
      collection: 'media',
      on: 'galleryCategory',
      admin: { description: 'Photos in this category. To move a photo, open it and change its Gallery category.' },
    },
  ],
}
