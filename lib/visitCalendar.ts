/**
 * Calendar entries for confirmed masjid visits — shared by the private
 * calendar feed (/api/visit-calendar/[code]) and the "Add to calendar"
 * buttons in the admin. Pure functions, safe on server and client.
 *
 * Visits are in Korea time (UTC+9, no daylight saving), so times are written
 * in UTC and every calendar app shows them correctly in its own time zone.
 */
import { labelOf, VISIT_LANGUAGES, VISITOR_TYPES } from './constants/visits'

export type CalendarVisit = {
  id: number | string
  name: string
  email?: string | null
  phone?: string | null
  organisation?: string | null
  visitorTypeLabel?: string | null
  groupSize?: number | null
  confirmedDate?: string | null
  confirmedTime?: string | null
  host?: string | null
  accessibility?: string | null
  languageLabel?: string | null
  message?: string | null
  updatedAt?: string | null
}

/** Map a visit request document (or admin form values) to a calendar entry. */
export function fromVisitRequest(doc: {
  id: number | string
  name?: string | null
  email?: string | null
  phone?: string | null
  organisation?: string | null
  visitorType?: string | null
  groupSize?: number | null
  confirmedDate?: string | null
  confirmedTime?: string | null
  host?: string | null
  accessibility?: string | null
  language?: string | null
  message?: string | null
  updatedAt?: string | null
}): CalendarVisit {
  return {
    ...doc,
    name: doc.name ?? 'Visitor',
    visitorTypeLabel: labelOf(VISITOR_TYPES, doc.visitorType),
    languageLabel: labelOf(VISIT_LANGUAGES, doc.language),
  }
}

const SITE = 'https://jejucentralmasjid.kr'
const LOCATION = 'Jeju Central Masjid, Sancheondandong 2-gil 15, 2F, Jeju-si, Jeju-do (제주시 산천단동 2길 15, 2층)'
/** How long a timed visit blocks in the calendar (the site doesn't promise a length). */
const BLOCK_MINUTES = 60
const KOREA_OFFSET_HOURS = 9

const pad = (n: number) => String(n).padStart(2, '0')

/** Visit date as YYYY-MM-DD in Korea time. */
function koreaDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })
}

/** Start/end of the visit: timed in UTC, or an all-day date when no time was set. */
export function visitWhen(v: CalendarVisit):
  | { allDay: true; start: string; end: string }
  | { allDay: false; start: Date; end: Date }
  | null {
  if (!v.confirmedDate) return null
  const [y, m, d] = koreaDate(v.confirmedDate).split('-').map(Number)
  const time = /^(\d{1,2}):(\d{2})$/.exec(v.confirmedTime ?? '')
  if (!time) {
    const next = new Date(Date.UTC(y, m - 1, d + 1))
    return {
      allDay: true,
      start: `${y}${pad(m)}${pad(d)}`,
      end: `${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}`,
    }
  }
  const start = new Date(Date.UTC(y, m - 1, d, Number(time[1]) - KOREA_OFFSET_HOURS, Number(time[2])))
  return { allDay: false, start, end: new Date(start.getTime() + BLOCK_MINUTES * 60_000) }
}

const utcStamp = (date: Date) =>
  `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`

export function visitTitle(v: CalendarVisit): string {
  const who = v.organisation?.trim() || v.name
  const people = v.groupSize ? ` (${v.groupSize} ${v.groupSize === 1 ? 'person' : 'people'})` : ''
  return `Masjid visit: ${who}${people}`
}

export function visitDescription(v: CalendarVisit): string {
  const details = [
    v.host ? `Meeting them: ${v.host}` : 'No host set yet',
    `Visitor: ${v.name}${v.organisation ? ` — ${v.organisation}` : ''}`,
    v.visitorTypeLabel && `Type: ${v.visitorTypeLabel}`,
    v.phone && `Phone: ${v.phone}`,
    v.email && `Email: ${v.email}`,
    v.languageLabel && `Language: ${v.languageLabel}`,
    v.accessibility && `Access needs: ${v.accessibility}`,
    v.message && `Message: ${v.message}`,
  ].filter(Boolean)
  return `${details.join('\n')}\n\nOpen in admin: ${SITE}/admin/collections/visit-requests/${v.id}`
}

// RFC 5545 text escaping and 75-octet line folding.
const escapeText = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

function fold(line: string): string {
  const bytes = new TextEncoder().encode(line)
  if (bytes.length <= 75) return line
  const parts: string[] = []
  let current = ''
  let size = 0
  for (const char of line) {
    const charSize = new TextEncoder().encode(char).length
    if (size + charSize > (parts.length === 0 ? 75 : 74)) {
      parts.push(current)
      current = ''
      size = 0
    }
    current += char
    size += charSize
  }
  parts.push(current)
  return parts.join('\r\n ')
}

function event(v: CalendarVisit): string[] {
  const when = visitWhen(v)
  if (!when) return []
  const stamp = utcStamp(v.updatedAt ? new Date(v.updatedAt) : new Date())
  return [
    'BEGIN:VEVENT',
    `UID:visit-${v.id}@jejucentralmasjid.kr`,
    `DTSTAMP:${stamp}`,
    // Subscribed calendars replace the event with the same UID when this changes.
    `LAST-MODIFIED:${stamp}`,
    when.allDay ? `DTSTART;VALUE=DATE:${when.start}` : `DTSTART:${utcStamp(when.start)}`,
    when.allDay ? `DTEND;VALUE=DATE:${when.end}` : `DTEND:${utcStamp(when.end)}`,
    `SUMMARY:${escapeText(visitTitle(v))}`,
    `LOCATION:${escapeText(LOCATION)}`,
    `DESCRIPTION:${escapeText(visitDescription(v))}`,
    `URL:${SITE}/admin/collections/visit-requests/${v.id}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
  ]
}

/** A whole calendar (feed or single-event file). */
export function buildIcs(visits: CalendarVisit[], name = 'Masjid visits'): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Jeju Central Masjid//Visits//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(name)}`,
    'X-WR-TIMEZONE:Asia/Seoul',
    // Ask subscribing apps to check for changes hourly (Google decides for itself).
    'REFRESH-INTERVAL;VALUE=DURATION:PT1H',
    'X-PUBLISHED-TTL:PT1H',
    ...visits.flatMap(event),
    'END:VCALENDAR',
  ]
  return lines.map(fold).join('\r\n') + '\r\n'
}

/** "Add to Google Calendar" link that opens a pre-filled event. */
export function googleCalendarLink(v: CalendarVisit): string | null {
  const when = visitWhen(v)
  if (!when) return null
  const dates = when.allDay ? `${when.start}/${when.end}` : `${utcStamp(when.start)}/${utcStamp(when.end)}`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: visitTitle(v),
    dates,
    details: visitDescription(v),
    location: LOCATION,
    ctz: 'Asia/Seoul',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
