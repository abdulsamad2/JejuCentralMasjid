import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Admin user', plural: 'Admin users' },
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
    description: 'Committee members who can log in to this admin panel.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
