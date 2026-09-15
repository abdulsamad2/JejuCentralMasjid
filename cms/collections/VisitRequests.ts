import type { CollectionConfig } from 'payload'

import {
  MASJID_ADDRESS_EN,
  MASJID_ADDRESS_KO,
  MASJID_MAPS,
  MASJID_PHONES,
} from '../../lib/constants/masjidLocation'
import { acknowledgementHtml, committeeRecipients, esc, INFO_EMAIL, visitConfirmationHtml } from '../email/notify'
import { emailsField, isSavingEmailResults, saveEmailResults, sendTracked } from '../email/tracking'

import { labelOf, VISIT_LANGUAGES, VISITOR_TYPES } from '../../lib/constants/visits'

const SITE = 'https://jejucentralmasjid.kr'
const RESEND_CONFIRMATION = 'jcmResendVisitConfirmation'

const day = (iso?: string | null): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Seoul',
      })
    : ''


export const VisitRequests: CollectionConfig = {
  slug: 'visit-requests',
  labels: { singular: 'Visit request', plural: 'Visit requests' },
  defaultSort: '-createdAt',
  access: {
    // Requests come only via /api/visit-request (spam-filtered, rate-limited);
    // the raw REST create is closed. Only admins read and manage.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'name',
    group: 'Inbox',
    defaultColumns: ['name', 'date', 'groupSize', 'visitorType', 'status'],
    description:
      'Visit bookings from the website. Open a request, find someone who can be at the masjid, then use "Confirm visit" — the visitor is emailed a formal confirmation.',
  },
  hooks: {
    beforeChange: [
      // "Send the confirmation again" is a virtual field (never stored): hand
      // it to afterChange through the request context.
      ({ data, context }) => {
        if (data?.resendConfirmation) context[RESEND_CONFIRMATION] = true
        return data
      },
      // Confirming without changing the time keeps the visitor's requested slot.
      ({ data, originalDoc }) => {
        if (data?.status === 'confirmed' && originalDoc?.status !== 'confirmed') {
          data.confirmedDate ||= originalDoc?.date ?? data.date
          data.confirmedTime ||= originalDoc?.time ?? data.time
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation, req, context }) => {
        if (isSavingEmailResults(context)) return doc
        const results: Record<string, Awaited<ReturnType<typeof sendTracked>> | undefined> = {}
        if (operation === 'create') {
          results.committee = await sendTracked(
            req,
            {
              ...committeeRecipients(),
              replyTo: doc.email,
              subject: `Visit request — ${doc.name}, ${day(doc.date)} (${doc.groupSize} ${doc.groupSize === 1 ? 'person' : 'people'})`,
              html: `<p>New visit request from the website:</p>
                <p><strong>${esc(doc.name)}</strong> (${esc(doc.email)}${doc.phone ? `, ${esc(doc.phone)}` : ''})<br/>
                ${esc(labelOf(VISITOR_TYPES, doc.visitorType))}${doc.organisation ? `: ${esc(doc.organisation)}` : ''}<br/>
                Date: ${esc(day(doc.date))}${doc.time ? ` at ${esc(doc.time)}` : ''}<br/>
                ${doc.altDate ? `Alternative date: ${esc(day(doc.altDate))}<br/>` : ''}
                People: ${esc(doc.groupSize)}<br/>
                Language: ${esc(labelOf(VISIT_LANGUAGES, doc.language))}
                ${doc.accessibility ? `<br/><strong>Access needs:</strong> ${esc(doc.accessibility)}` : ''}</p>
                ${doc.message ? `<p style="white-space:pre-wrap">${esc(doc.message)}</p>` : ''}
                <p>Find someone who can be at the masjid, then confirm in the admin panel — the visitor is emailed automatically:<br/>
                <a href="${SITE}/admin/collections/visit-requests/${doc.id}">Open request</a></p>`,
            },
            'Visit request notification',
          )
          // Let the visitor know it arrived — the visit isn't confirmed yet.
          results.acknowledgement = await sendTracked(
            req,
            {
              to: doc.email,
              replyTo: INFO_EMAIL,
              subject: 'We received your visit request — Jeju Central Masjid',
              html: acknowledgementHtml({
                name: doc.name,
                heading: 'We received your visit request',
                intro: 'Thank you for wanting to visit. Your request has reached the masjid committee.',
                details: [
                  ['Date', day(doc.date)],
                  ...(doc.time ? [['Time', doc.time] as [string, string]] : []),
                  ['People', String(doc.groupSize)],
                  ['Visitor', labelOf(VISITOR_TYPES, doc.visitorType)],
                ],
                next: "Your visit isn't confirmed yet. We'll email you again once someone is arranged to meet you, usually within 1–2 days.",
              }),
            },
            'Visit request acknowledgement',
          )
        }
        const newlyConfirmed = doc.status === 'confirmed' && previousDoc?.status !== 'confirmed'
        const resend = doc.status === 'confirmed' && Boolean(context?.[RESEND_CONFIRMATION])
        if (operation === 'update' && (newlyConfirmed || resend)) {
          results.confirmation = await sendTracked(
            req,
            {
              to: doc.email,
              replyTo: INFO_EMAIL,
              subject: `Your visit to Jeju Central Masjid is confirmed — ${day(doc.confirmedDate)}`,
              html: visitConfirmationHtml({
                name: doc.name,
                date: day(doc.confirmedDate),
                time: doc.confirmedTime,
                host: doc.host,
                people: doc.groupSize,
                note: doc.visitorNote,
                addressEn: MASJID_ADDRESS_EN,
                addressKo: MASJID_ADDRESS_KO,
                maps: MASJID_MAPS,
                phones: MASJID_PHONES.map((p) => p.display),
              }),
            },
            'Visit confirmation',
          )
        }
        return saveEmailResults({ collection: 'visit-requests', doc, req, results })
      },
    ],
  },
  fields: [
    {
      name: 'confirmPanel',
      type: 'ui',
      admin: { components: { Field: '/cms/components/ConfirmVisitPanel#ConfirmVisitPanel' } },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New — needs a reply', value: 'new' },
        { label: 'Confirmed — visitor emailed', value: 'confirmed' },
        { label: 'Declined', value: 'declined' },
        { label: 'Visited', value: 'visited' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Use "Confirm visit" at the top to confirm and email the visitor. For "Declined", reply to them by email with another option.',
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          label: 'Phone / KakaoTalk / WhatsApp',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'visitorType',
          label: 'Visitor',
          type: 'select',
          options: [...VISITOR_TYPES],
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'organisation', label: 'School or organisation', type: 'text', admin: { width: '50%' } },
        {
          name: 'accessibility',
          label: 'Access needs',
          type: 'text',
          admin: { width: '50%', description: 'The masjid is up a flight of stairs with no lift.' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          label: 'Requested date',
          type: 'date',
          required: true,
          admin: { width: '33%', date: { pickerAppearance: 'dayOnly', displayFormat: 'EEE d MMM yyyy' } },
        },
        {
          name: 'time',
          label: 'Requested time',
          type: 'text',
          admin: { width: '33%', description: '24h, e.g. 14:00' },
        },
        {
          name: 'altDate',
          label: 'Alternative date',
          type: 'date',
          admin: { width: '33%', date: { pickerAppearance: 'dayOnly', displayFormat: 'EEE d MMM yyyy' } },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'groupSize', label: 'People', type: 'number', required: true, min: 1, max: 100, admin: { width: '50%' } },
        {
          name: 'language',
          label: 'Preferred language',
          type: 'select',
          options: [...VISIT_LANGUAGES],
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'message', label: 'Message from the visitor', type: 'textarea' },
    // Set through the "Confirm visit" panel (ConfirmVisitPanel), which shows them.
    { name: 'confirmedDate', type: 'date', admin: { hidden: true } },
    { name: 'confirmedTime', type: 'text', admin: { hidden: true } },
    { name: 'host', label: 'Who will meet them', type: 'text', admin: { hidden: true } },
    { name: 'visitorNote', label: 'Note to the visitor', type: 'textarea', admin: { hidden: true } },
    { name: 'resendConfirmation', type: 'checkbox', virtual: true, admin: { hidden: true } },
    {
      name: 'adminNotes',
      label: 'Internal notes',
      type: 'textarea',
      admin: { position: 'sidebar', description: 'Only visible to admins.' },
    },
    emailsField([
      ['acknowledgement', '"We received your request" to the visitor'],
      ['confirmation', 'Visit confirmation to the visitor'],
      ['committee', 'Notification to the committee'],
    ]),
  ],
}
