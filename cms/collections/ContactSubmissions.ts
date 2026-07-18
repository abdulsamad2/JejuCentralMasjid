import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Contact submission', plural: 'Contact submissions' },
  defaultSort: '-createdAt',
  access: {
    // Anyone can submit the website form; only logged-in admins can read/manage.
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'inquiry', 'subject', 'handled', 'createdAt'],
    group: 'Inbox',
    description: 'Messages sent from the website contact form.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'inquiry',
      type: 'text',
      admin: { description: 'Topic chosen in the form (General, Nikah, New Muslim, …).' },
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'handled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Tick once someone has replied to this message.',
      },
    },
  ],
}
