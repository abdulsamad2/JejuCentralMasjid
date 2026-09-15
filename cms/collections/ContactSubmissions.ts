import type { CollectionConfig } from 'payload'

import { acknowledgementHtml, committeeRecipients, esc, INFO_EMAIL } from '../email/notify'
import { emailsField, isSavingEmailResults, saveEmailResults, sendTracked } from '../email/tracking'

const SITE = 'https://jejucentralmasjid.kr'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Contact submission', plural: 'Contact submissions' },
  defaultSort: '-createdAt',
  hooks: {
    afterChange: [
      async ({ doc, operation, req, context }) => {
        if (operation !== 'create' || isSavingEmailResults(context)) return doc
        // Tell the committee (reply goes straight to the sender)…
        const committee = await sendTracked(
          req,
          {
            ...committeeRecipients(),
            replyTo: doc.email,
            subject: `Website message — ${doc.inquiry || 'General'}: ${doc.subject || '(no subject)'}`,
            html: `<p><strong>${esc(doc.name)}</strong> (${esc(doc.email)}${doc.phone ? ` · ${esc(doc.phone)}` : ''})</p>
              <p style="white-space:pre-wrap">${esc(doc.message)}</p>
              <p><a href="${SITE}/admin/collections/contact-submissions/${doc.id}">Open in admin</a> — reply directly to this email to answer.</p>`,
          },
          'Contact notification',
        )
        // …and let the sender know it arrived.
        const acknowledgement = await sendTracked(
          req,
          {
            to: doc.email,
            replyTo: INFO_EMAIL,
            subject: 'We received your message — Jeju Central Masjid',
            html: acknowledgementHtml({
              name: doc.name,
              heading: 'We received your message',
              intro: 'Thank you for getting in touch. Your message has reached the masjid committee.',
              next: "We usually reply within 1–2 days, insha'Allah. You can reply to this email to add anything.",
            }),
          },
          'Contact acknowledgement',
        )
        return saveEmailResults({ collection: 'contact-submissions', doc, req, results: { committee, acknowledgement } })
      },
    ],
  },
  access: {
    // Submissions come only via /api/contact (spam-filtered, rate-limited);
    // the raw REST create is closed. Only logged-in admins read/manage.
    create: () => false,
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
    emailsField([
      ['acknowledgement', '"We received your message" to the sender'],
      ['committee', 'Notification to the committee'],
    ]),
  ],
}
