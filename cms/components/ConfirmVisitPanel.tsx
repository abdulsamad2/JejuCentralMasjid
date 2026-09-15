'use client'

import React, { useState } from 'react'
import { useDocumentInfo, useForm, useFormFields } from '@payloadcms/ui'

import { buildIcs, fromVisitRequest, googleCalendarLink } from '@/lib/visitCalendar'

/*
 * Top of a visit request: confirm the visit (date, time, who meets them, a
 * note) and email the visitor a formal confirmation in one click. Once
 * confirmed it shows what was sent and lets an admin change the details and
 * send the confirmation again. The email itself is sent by the
 * VisitRequests afterChange hook. Styles: `.jcm-confirm*` in custom.scss.
 */

const toDateInput = (iso?: string | null): string => {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })
}

// Stored the same way the public form stores dates: noon UTC, so the day never shifts.
const fromDateInput = (value: string): string | null => (value ? `${value}T12:00:00.000Z` : null)

const longDate = (iso?: string | null): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Seoul',
      })
    : ''

const EMAIL_STATE: Record<string, { text: string; tone: 'ok' | 'warn' }> = {
  sent: { text: 'Confirmation email sent', tone: 'ok' },
  manual: { text: 'Confirmation sent manually', tone: 'ok' },
  failed: { text: 'Confirmation email failed — see Emails in the sidebar', tone: 'warn' },
  off: { text: 'Confirmation email not sent (email is switched off) — see Emails in the sidebar', tone: 'warn' },
}

export function ConfirmVisitPanel() {
  const { id } = useDocumentInfo()
  const { submit } = useForm()
  const f = useFormFields(([fields]) => ({
    status: fields.status?.value as string | undefined,
    name: fields.name?.value as string | undefined,
    email: fields.email?.value as string | undefined,
    date: fields.date?.value as string | undefined,
    time: fields.time?.value as string | undefined,
    groupSize: fields.groupSize?.value as number | undefined,
    confirmedDate: fields.confirmedDate?.value as string | undefined,
    confirmedTime: fields.confirmedTime?.value as string | undefined,
    host: fields.host?.value as string | undefined,
    visitorNote: fields.visitorNote?.value as string | undefined,
    confirmationEmail: fields['emails.confirmation']?.value as string | undefined,
    phone: fields.phone?.value as string | undefined,
    organisation: fields.organisation?.value as string | undefined,
    visitorType: fields.visitorType?.value as string | undefined,
    accessibility: fields.accessibility?.value as string | undefined,
    language: fields.language?.value as string | undefined,
    message: fields.message?.value as string | undefined,
  }))

  const confirmed = f.status === 'confirmed'
  const [editing, setEditing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [draft, setDraft] = useState(() => ({
    date: toDateInput(f.confirmedDate || f.date),
    time: f.confirmedTime || f.time || '',
    host: f.host || '',
    note: f.visitorNote || '',
  }))

  if (!id) return null

  const send = async (resend: boolean) => {
    if (!draft.date) return
    setBusy(true)
    try {
      await submit({
        overrides: {
          status: 'confirmed',
          confirmedDate: fromDateInput(draft.date),
          confirmedTime: draft.time,
          host: draft.host,
          visitorNote: draft.note,
          resendConfirmation: resend,
        },
      })
      setEditing(false)
    } finally {
      setBusy(false)
    }
  }

  const form = (resend: boolean) => (
    <div className="jcm-confirm__form">
      <div className="jcm-confirm__row">
        <label className="jcm-confirm__field">
          <span>Date</span>
          <input type="date" required value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
        </label>
        <label className="jcm-confirm__field">
          <span>Time</span>
          <input type="time" value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} />
        </label>
        <label className="jcm-confirm__field jcm-confirm__field--wide">
          <span>Who will meet them</span>
          <input
            type="text"
            placeholder='e.g. "Brother Ahmed"'
            value={draft.host}
            onChange={(e) => setDraft({ ...draft, host: e.target.value })}
          />
        </label>
      </div>
      <label className="jcm-confirm__field jcm-confirm__field--wide">
        <span>Note to the visitor (optional)</span>
        <textarea
          rows={3}
          placeholder="e.g. Please ring the bell at the 2nd-floor door when you arrive."
          value={draft.note}
          onChange={(e) => setDraft({ ...draft, note: e.target.value })}
        />
      </label>
      <p className="jcm-confirm__preview">
        {f.name || 'The visitor'} will get a formal email at <strong>{f.email}</strong> with these details, the
        address and map links, and what to know before coming.
      </p>
      <div className="jcm-confirm__actions">
        <button type="button" className="jcm-confirm__primary" disabled={busy || !draft.date} onClick={() => send(resend)}>
          {busy ? 'Sending…' : resend ? 'Save and send the email again' : 'Confirm visit and send email'}
        </button>
        {resend && (
          <button type="button" className="jcm-confirm__secondary" disabled={busy} onClick={() => setEditing(false)}>
            Cancel
          </button>
        )}
      </div>
    </div>
  )

  if (!confirmed) {
    return (
      <section className="jcm-confirm">
        <div className="jcm-confirm__head">
          <h3>Confirm this visit</h3>
          <p>
            Requested: {longDate(f.date)}
            {f.time ? ` at ${f.time}` : ''}, {f.groupSize ?? 1} {f.groupSize === 1 ? 'person' : 'people'}. Change
            the date or time below if you agreed a different slot.
          </p>
        </div>
        {form(false)}
        <p className="jcm-confirm__decline">
          Can&apos;t host them? Set Status to &quot;Declined&quot; in the sidebar and reply to them by email with
          another option.
        </p>
      </section>
    )
  }

  const emailState = f.confirmationEmail ? EMAIL_STATE[f.confirmationEmail] : undefined
  const calendarVisit = fromVisitRequest({ ...f, id, groupSize: f.groupSize ?? null })
  const googleLink = googleCalendarLink(calendarVisit)
  // A one-event calendar file: opens in Apple Calendar, Outlook and others.
  const downloadIcs = () => {
    const url = URL.createObjectURL(new Blob([buildIcs([calendarVisit], 'Masjid visit')], { type: 'text/calendar' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `masjid-visit-${id}.ics`
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return (
    <section className="jcm-confirm jcm-confirm--done">
      <div className="jcm-confirm__head">
        <h3>Visit confirmed</h3>
        <p>
          {longDate(f.confirmedDate)}
          {f.confirmedTime ? ` at ${f.confirmedTime}` : ''}
          {f.host ? `, meeting: ${f.host}` : ', no host set'}
        </p>
        {emailState && <p className={`jcm-confirm__email jcm-confirm__email--${emailState.tone}`}>{emailState.text}</p>}
      </div>
      {editing ? (
        form(true)
      ) : (
        <div className="jcm-confirm__actions">
          {googleLink && (
            <a className="jcm-confirm__secondary jcm-confirm__link" href={googleLink} target="_blank" rel="noreferrer">
              Add to Google Calendar
            </a>
          )}
          <button type="button" className="jcm-confirm__secondary" onClick={downloadIcs}>
            Download calendar file
          </button>
          <button type="button" className="jcm-confirm__secondary" onClick={() => setEditing(true)}>
            Change details
          </button>
          <button type="button" className="jcm-confirm__secondary" disabled={busy} onClick={() => send(true)}>
            {busy ? 'Sending…' : 'Send the confirmation again'}
          </button>
        </div>
      )}
    </section>
  )
}
