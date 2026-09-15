'use client'

import React, { useState } from 'react'

/*
 * Dashboard: subscribe a personal calendar to the private visit feed
 * (app/(frontend)/api/visit-calendar/[code]). The links are built on the
 * server (lib/server/visitCalendarFeed.ts) and only shown to logged-in admins.
 */
export function CalendarSubscribe({ links }: { links: { https: string; webcal: string; google: string } }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.https)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* clipboard blocked — the link is visible to select by hand */
    }
  }

  return (
    <details className="jcm-calendar">
      <summary>Put confirmed visits in your calendar automatically</summary>
      <div className="jcm-calendar__body">
        <p>
          Subscribe once and every confirmed visit appears in your calendar — with the time, who is meeting them
          and their phone number. Changed visits update and declined ones disappear on their own.
        </p>
        <div className="jcm-calendar__actions">
          <a className="jcm-calendar__button" href={links.google} target="_blank" rel="noreferrer">
            Add to Google Calendar
          </a>
          <a className="jcm-calendar__button" href={links.webcal}>
            Add to Apple Calendar or Outlook
          </a>
          <button type="button" className="jcm-calendar__button" onClick={copy}>
            {copied ? 'Link copied' : 'Copy link'}
          </button>
        </div>
        <p className="jcm-calendar__note">
          Google Calendar checks for new visits a few times a day, so a visit you just confirmed can take some hours to
          appear — for that one, use &quot;Add to Google Calendar&quot; on the visit itself. Keep this link private:
          anyone with it can see visitors&apos; names and phone numbers.
        </p>
        <input className="jcm-calendar__url" readOnly value={links.https} onFocus={(e) => e.currentTarget.select()} />
      </div>
    </details>
  )
}
