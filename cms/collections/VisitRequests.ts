import type { CollectionConfig } from 'payload'

import {
  MASJID_ADDRESS_EN,
  MASJID_ADDRESS_KO,
  MASJID_MAPS,
  MASJID_PHONES,
} from '../../lib/constants/masjidLocation'
import { acknowledgementHtml, committeeRecipients, esc, INFO_EMAIL } from '../email/notify'

const SITE = 'https://jejucentralmasjid.kr'

export const VISITOR_TYPES = [
  { label: 'Korean or local visitor', value: 'local' },
  { label: 'Muslim traveller from overseas', value: 'overseas-muslim' },
  { label: 'School, university or group', value: 'group' },
  { label: 'Other', value: 'other' },
] as const

export const VISIT_LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Korean (한국어)', value: 'ko' },
  { label: 'Other', value: 'other' },
] as const

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

const labelOf = (list: readonly { label: string; value: string }[], value?: string | null) =>
  list.find((o) => o.value === value)?.label ?? value ?? ''

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
      'Visit bookings from the website. Find someone who can be at the masjid, then set Status to "Confirmed" and save — the visitor is emailed the details automatically.',
  },
  hooks: {
    beforeChange: [
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
      async ({ doc, previousDoc, operation, req }) => {
        try {
          if (operation === 'create') {
            await req.payload.sendEmail({
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
            })
          }
        } catch (err) {
          req.payload.logger.error(`Visit request notification email failed: ${String(err)}`)
        }
        try {
          if (operation === 'create') {
            // Let the visitor know it arrived — the visit isn't confirmed yet.
            await req.payload.sendEmail({
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
            })
          }
          if (operation === 'update' && doc.status === 'confirmed' && previousDoc?.status !== 'confirmed') {
            await req.payload.sendEmail({
              to: doc.email,
              replyTo: INFO_EMAIL,
              subject: `Your visit to Jeju Central Masjid is confirmed — ${day(doc.confirmedDate)}`,
              html: `<p>Assalamu alaikum ${esc(doc.name)},</p>
                <p>Thank you for booking a visit. Someone will be at the masjid to welcome you:</p>
                <p><strong>${esc(day(doc.confirmedDate))}${doc.confirmedTime ? `, ${esc(doc.confirmedTime)}` : ''}</strong><br/>
                ${doc.host ? `Meeting you: ${esc(doc.host)}<br/>` : ''}
                ${esc(MASJID_ADDRESS_EN)}<br/>${esc(MASJID_ADDRESS_KO)}</p>
                ${doc.visitorNote ? `<p style="white-space:pre-wrap">${esc(doc.visitorNote)}</p>` : ''}
                <p>Maps: <a href="${MASJID_MAPS.kakao}">Kakao Map</a> · <a href="${MASJID_MAPS.naver}">Naver Map</a> · <a href="${MASJID_MAPS.google}">Google Maps</a></p>
                <p>The masjid is on the 2nd floor, reached by stairs only (there is no lift). Please remove your
                shoes at the entrance and wear clothing that covers shoulders and knees; sisters may wish to bring
                a headscarf. Photos of the masjid are welcome, but please don't photograph people while they pray.</p>
                <p>If your plans change, reply to this email or call ${esc(MASJID_PHONES.map((p) => p.display).join(' / '))}.</p>
                <p>We look forward to meeting you.<br/>Jeju Central Masjid</p>`,
            })
            req.payload.logger.info(`Visit confirmation emailed to ${doc.email}`)
          }
        } catch (err) {
          req.payload.logger.error(`Visit request email failed: ${String(err)}`)
        }
        return doc
      },
    ],
  },
  fields: [
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
          'Choosing "Confirmed" and saving emails the visitor the date, time and address. For "Declined", reply to them by email with another option.',
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
    {
      type: 'collapsible',
      label: 'Confirmation (sent to the visitor)',
      admin: {
        description:
          'Filled from the request when you confirm. Change the date or time here first if you agreed a different slot.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'confirmedDate',
              label: 'Confirmed date',
              type: 'date',
              admin: { width: '33%', date: { pickerAppearance: 'dayOnly', displayFormat: 'EEE d MMM yyyy' } },
            },
            { name: 'confirmedTime', label: 'Confirmed time', type: 'text', admin: { width: '33%' } },
            {
              name: 'host',
              label: 'Who will meet them',
              type: 'text',
              admin: { width: '33%', description: 'Optional, e.g. "Brother Ahmed".' },
            },
          ],
        },
        {
          name: 'visitorNote',
          label: 'Note to the visitor',
          type: 'textarea',
          admin: { description: 'Optional. Added to the confirmation email.' },
        },
      ],
    },
    {
      name: 'adminNotes',
      label: 'Internal notes',
      type: 'textarea',
      admin: { position: 'sidebar', description: 'Only visible to admins.' },
    },
  ],
}
