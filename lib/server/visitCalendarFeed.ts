import 'server-only'
import { createHmac, timingSafeEqual } from 'crypto'

/**
 * The private visit-calendar feed lives at a URL containing a code derived
 * from PAYLOAD_SECRET, so there is nothing extra to configure and the code
 * can't be guessed. Changing PAYLOAD_SECRET changes the URL (admins would
 * re-subscribe). No secret set means no feed — the dev fallback secret in
 * payload.config.ts is public, so it must never produce a working link.
 */
function feedCode(): string | null {
  const secret = process.env.PAYLOAD_SECRET
  if (!secret) return null
  return createHmac('sha256', secret).update('jcm-visit-calendar-feed:v1').digest('hex').slice(0, 40)
}

export function isValidVisitCalendarCode(candidate: string): boolean {
  const code = feedCode()
  if (!code || candidate.length !== code.length) return false
  return timingSafeEqual(Buffer.from(candidate), Buffer.from(code))
}

/** Subscription links for the admin dashboard, or null when the feed is off. */
export function visitCalendarLinks(): { https: string; webcal: string; google: string } | null {
  const code = feedCode()
  if (!code) return null
  const path = `jejucentralmasjid.kr/api/visit-calendar/${code}`
  return {
    https: `https://${path}`,
    webcal: `webcal://${path}`,
    // Opens Google Calendar's "Add calendar" prompt for the feed.
    google: `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(`webcal://${path}`)}`,
  }
}
