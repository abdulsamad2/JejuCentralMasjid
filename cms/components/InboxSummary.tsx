import React from 'react'
import type { Payload } from 'payload'

/**
 * Dashboard box: what's waiting for a reply, and who is coming to visit.
 * Each count links to its list, already filtered. Styles: `.jcm-inbox*` in
 * app/(payload)/custom.scss.
 */

const kstToday = (): string => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })

const visitDay = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Seoul' })

export async function InboxSummary({ payload }: { payload: Payload }) {
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
    </section>
  )
}
