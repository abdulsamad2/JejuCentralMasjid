import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Contact submission', plural: 'Contact submissions' },
  defaultSort: '-createdAt',
  hooks: {
    afterChange: [
      // Email the committee inbox whenever the website form is submitted.
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return doc
        try {
          await req.payload.sendEmail({
            to: 'info@jejucentralmasjid.kr',
            replyTo: doc.email,
            subject: `Website message — ${doc.inquiry || 'General'}: ${doc.subject || '(no subject)'}`,
            html: `<p><strong>${doc.name}</strong> (${doc.email}${doc.phone ? ` · ${doc.phone}` : ''})</p>
              <p style="white-space:pre-wrap">${doc.message}</p>
              <p><a href="https://jejucentralmasjid.kr/admin/collections/contact-submissions/${doc.id}">Open in admin</a> — reply directly to this email to answer.</p>`,
          })
        } catch (err) {
          req.payload.logger.error(`Contact notification email failed: ${String(err)}`)
        }
        return doc
      },
    ],
  },
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
