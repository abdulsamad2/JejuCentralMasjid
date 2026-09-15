import { getPayload } from 'payload'
import config from '@payload-config'
import { isValidVisitCalendarCode } from '@/lib/server/visitCalendarFeed'
import { buildIcs, fromVisitRequest } from '@/lib/visitCalendar'

// Always fresh: calendar apps poll this, and it holds visitor contact details.
export const dynamic = 'force-dynamic'

const DAY_MS = 24 * 60 * 60 * 1000

/**
 * Private calendar feed of confirmed visits for committee calendars
 * (Google, Apple, Outlook subscribe to it). The URL code is the only key —
 * see lib/server/visitCalendarFeed.ts.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  if (!isValidVisitCalendarCode(code.replace(/\.ics$/, ''))) {
    return new Response('Not found', { status: 404 })
  }
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'visit-requests',
    where: {
      and: [
        { status: { in: ['confirmed', 'visited'] } },
        // Recent history plus everything ahead.
        { confirmedDate: { greater_than_equal: new Date(Date.now() - 60 * DAY_MS).toISOString() } },
      ],
    },
    sort: 'confirmedDate',
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })
  return new Response(buildIcs(docs.map(fromVisitRequest)), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="masjid-visits.ics"',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
