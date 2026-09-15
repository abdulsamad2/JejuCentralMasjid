import React from 'react'
import type { Payload } from 'payload'

import { visitCalendarLinks } from '@/lib/server/visitCalendarFeed'
import { CalendarSubscribe } from './CalendarSubscribe'

/**
 * Dashboard box: what's waiting for a reply, and who is coming to visit.
 * Each count links to its list, already filtered. Styles: `.jcm-inbox*` in
 * app/(payload)/custom.scss.
 */

const kstToday = (): string => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })

const visitDay = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Seoul' })

// Emails the person should have received (committee notifications aren't
// counted — the request is on this dashboard anyway). See cms/email/tracking.ts.
const UNSENT_EMAILS = [
  { collection: 'visit-requests', label: 'visit request', emails: ['acknowledgement', 'confirmation'] },
  { collection: 'contact-submissions', label: 'message', emails: ['acknowledgement'] },
  { collection: 'receipt-requests', label: 'receipt request', emails: ['acknowledgement', 'receipt'] },
] as const

const unsentWhere = (emails: readonly string[]) => ({
  or: emails.map((e) => ({ [`emails.${e}`]: { in: ['failed', 'off'] } })),
})

const unsentHref = (collection: string, emails: readonly string[]) =>
  `/admin/collections/${collection}?` +
  emails.map((e, i) => `where[or][${i}][emails.${e}][in]=failed,off`).join('&')

export async function InboxSummary({ payload }: { payload: Payload }) {
  const emailOff = payload.email?.name === 'console'
  const calendarLinks = visitCalendarLinks()
  const unsent = await Promise.all(
    UNSENT_EMAILS.map(async (u) => ({
      ...u,
      count: (await payload.count({ collection: u.collection, where: unsentWhere(u.emails) })).totalDocs,
    })),
  )
  const unsentTotal = unsent.reduce((n, u) => n + u.count, 0)
  const [visits, messages, receipts, upcoming] = await Promise.all([
    payload.count({ collection: 'visit-requests', where: { status: { equals: 'new' } } }),
    payload.count({ collection: 'contact-submissions', where: { handled: { not_equals: true } } }),
    payload.count({ collection: 'receipt-requests', where: { status: { equals: 'pending' } } }),
    payload.find({
      collection: 'visit-requests',
      where: {
        and: [{ status: { equals: 'confirmed' } }, { confirmedDate: { greater_than_equal: `${kstToday()}T00:00:00.000Z` } }],
      },
      sort: 'confirmedDate',
      limit: 3,
      depth: 0,
    }),
  ])

  const rows = [
    {
      count: visits.totalDocs,
      label: visits.totalDocs === 1 ? 'new visit request' : 'new visit requests',
      href: '/admin/collections/visit-requests?where[status][equals]=new',
    },
    {
      count: messages.totalDocs,
      label: messages.totalDocs === 1 ? 'unanswered message' : 'unanswered messages',
      href: '/admin/collections/contact-submissions?where[handled][not_equals]=true',
    },
    {
      count: receipts.totalDocs,
      label: receipts.totalDocs === 1 ? 'receipt request to issue' : 'receipt requests to issue',
      href: '/admin/collections/receipt-requests?where[status][equals]=pending',
    },
  ]
  const waiting = rows.reduce((n, r) => n + r.count, 0)

  return (
    <section className="jcm-panel">
      <div className="jcm-panel__head jcm-panel__head--row">
        <h3>Needs a reply</h3>
        <p>{waiting === 0 ? 'All caught up' : `${waiting} waiting`}</p>
      </div>
      {emailOff && (
        <div className="jcm-inbox__alert jcm-inbox__alert--off" role="alert">
          <strong>Automatic emails are switched off</strong>
          The website can&apos;t send email right now (RESEND_API_KEY isn&apos;t set where the site runs), so nobody
          is emailed about new requests and visitors get no replies. Reply to people yourself until it&apos;s fixed.
        </div>
      )}
      {unsentTotal > 0 && (
        <div className="jcm-inbox__alert jcm-inbox__alert--unsent">
          <strong>
            {unsentTotal} {unsentTotal === 1 ? 'person is' : 'people are'} still waiting for an email
          </strong>
          These automatic emails didn&apos;t go out. Open each one to send it yourself.
          <ul>
            {unsent
              .filter((u) => u.count > 0)
              .map((u) => (
                <li key={u.collection}>
                  <a href={unsentHref(u.collection, u.emails)}>
                    {u.count} {u.label}
                    {u.count === 1 ? '' : 's'}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
      <div className="jcm-inbox">
        {rows.map((r) => (
          <a key={r.href} href={r.href} className={`jcm-inbox__item${r.count > 0 ? ' jcm-inbox__item--waiting' : ''}`}>
            <strong>{r.count}</strong>
            <span>{r.label}</span>
          </a>
        ))}
      </div>
      {upcoming.docs.length > 0 && (
        <div className="jcm-inbox__upcoming">
          <p className="jcm-inbox__upcoming-title">Upcoming visits</p>
          <ul>
            {upcoming.docs.map((v) => (
              <li key={v.id}>
                <a href={`/admin/collections/visit-requests/${v.id}`}>
                  <span className="jcm-inbox__when">
                    {v.confirmedDate ? visitDay(v.confirmedDate) : ''}
                    {v.confirmedTime ? `, ${v.confirmedTime}` : ''}
                  </span>
                  <span>
                    {v.organisation || v.name} ({v.groupSize} {v.groupSize === 1 ? 'person' : 'people'})
                    {v.host ? `, meeting: ${v.host}` : ', no host set yet'}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {calendarLinks && <CalendarSubscribe links={calendarLinks} />}
    </section>
  )
}
