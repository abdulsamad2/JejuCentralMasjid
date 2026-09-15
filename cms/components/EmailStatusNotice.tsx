'use client'

import React from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

/*
 * Top of the sidebar "Emails" group (cms/email/tracking.ts). Silent while
 * everything went out; otherwise says which emails the person never got and
 * opens a ready-addressed email so an admin can send it by hand.
 */

type Tracked = 'acknowledgement' | 'confirmation' | 'receipt' | 'committee'

const WHAT: Record<Tracked, string> = {
  acknowledgement: '"We received your request" email',
  confirmation: 'visit confirmation',
  receipt: 'donation receipt',
  committee: 'committee notification',
}

const SUBJECT: Record<string, Partial<Record<Tracked, string>>> = {
  'visit-requests': {
    acknowledgement: 'Your visit request — Jeju Central Masjid',
    confirmation: 'Your visit to Jeju Central Masjid is confirmed',
  },
  'contact-submissions': { acknowledgement: 'Your message to Jeju Central Masjid' },
  'receipt-requests': {
    acknowledgement: 'Your receipt request — Jeju Central Masjid',
    receipt: 'Your donation receipt — Jeju Central Masjid',
  },
}

const UNSENT = ['failed', 'off']

export function EmailStatusNotice() {
  const { collectionSlug } = useDocumentInfo()
  const values = useFormFields(([fields]) => ({
    acknowledgement: fields['emails.acknowledgement']?.value as string | undefined,
    confirmation: fields['emails.confirmation']?.value as string | undefined,
    receipt: fields['emails.receipt']?.value as string | undefined,
    committee: fields['emails.committee']?.value as string | undefined,
    email: fields.email?.value as string | undefined,
    name: fields.name?.value as string | undefined,
    confirmedDate: fields.confirmedDate?.value as string | undefined,
    confirmedTime: fields.confirmedTime?.value as string | undefined,
  }))

  const personal = (['acknowledgement', 'confirmation', 'receipt'] as const).filter((k) =>
    UNSENT.includes(values[k] ?? ''),
  )
  const committeeUnsent = UNSENT.includes(values.committee ?? '')
  if (personal.length === 0 && !committeeUnsent) return null

  const switchedOff = [...personal, ...(committeeUnsent ? ['committee' as const] : [])].some(
    (k) => values[k] === 'off',
  )
  const firstName = values.name?.trim().split(/\s+/)[0]

  const mailto = (key: Tracked) => {
    const lines = [`Assalamu alaikum${firstName ? ` ${firstName}` : ''},`, '']
    if (key === 'confirmation' && values.confirmedDate) {
      const date = new Date(values.confirmedDate).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        timeZone: 'Asia/Seoul',
      })
      lines.push(`Your visit is confirmed for ${date}${values.confirmedTime ? ` at ${values.confirmedTime}` : ''}.`, '')
    }
    const subject = SUBJECT[collectionSlug ?? '']?.[key] ?? 'Jeju Central Masjid'
    return `mailto:${encodeURIComponent(values.email ?? '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  }

  return (
    <div className="jcm-email-notice" role="status">
      <p className="jcm-email-notice__title">
        {personal.length > 0 ? 'Some emails were not sent' : 'The committee was not emailed'}
      </p>
      <p className="jcm-email-notice__why">
        {switchedOff
          ? 'Automatic email is switched off on the website, so nothing was sent.'
          : 'The email service reported an error (see "Last error" below).'}
      </p>
      {personal.map((key) => (
        <div key={key} className="jcm-email-notice__item">
          <span>
            {values.name || 'They'} did not get the {WHAT[key]}.
          </span>
          {values.email && (
            <a className="jcm-email-notice__action" href={mailto(key)}>
              Write to {values.email}
            </a>
          )}
        </div>
      ))}
      {committeeUnsent && (
        <p className="jcm-email-notice__item">
          Nobody on the committee was emailed about this request — you are seeing it here instead.
        </p>
      )}
      {personal.length > 0 && (
        <p className="jcm-email-notice__hint">After sending it yourself, set that email to &quot;Sent manually&quot; below and save.</p>
      )}
    </div>
  )
}
