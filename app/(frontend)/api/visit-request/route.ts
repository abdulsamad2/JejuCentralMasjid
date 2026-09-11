import { getPayload } from 'payload'
import config from '@payload-config'
import { allowRequest, botCheck, clientIp, looksLikeSpam } from '@/lib/server/antiSpam'
import { VISIT_LANGUAGES, VISITOR_TYPES } from '@/cms/collections/VisitRequests'
import { VISIT_NOTICE_DAYS } from '@/lib/constants/visits'

const DAY_MS = 24 * 60 * 60 * 1000
const koreaToday = (): string => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })

/** 'YYYY-MM-DD' from the notice period (Korea time) up to a year ahead, as a noon-UTC ISO date. */
function visitDate(value: unknown): string | null {
  const s = String(value || '')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null
  const today = Date.parse(koreaToday())
  const earliest = new Date(today + VISIT_NOTICE_DAYS * DAY_MS).toISOString().slice(0, 10)
  const latest = new Date(today + 366 * DAY_MS).toISOString().slice(0, 10)
  if (s < earliest || s > latest || Number.isNaN(Date.parse(s))) return null
  return `${s}T12:00:00.000Z`
}

const oneOf = <T extends string>(list: readonly { value: T }[], value: unknown, fallback: T): T =>
  list.find((o) => o.value === value)?.value ?? fallback

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>
    const ua = req.headers.get('user-agent') || ''
    const ip = clientIp(req)

    const reason = botCheck({ honeypot: body.website, startedAt: body.startedAt, userAgent: ua })
    if (reason) return new Response(null, { status: 204 }) // silently drop bots

    if (!allowRequest(`visit:${ip}`, 5, 60 * 60 * 1000)) {
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const date = visitDate(body.date)
    const altDate = body.altDate ? visitDate(body.altDate) : null
    const groupSize = Math.trunc(Number(body.groupSize))
    const time = String(body.time || '')
    const message = String(body.message || '')

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Please enter your name and a valid email address.' }, { status: 400 })
    }
    if (!date) {
      return Response.json(
        {
          error: `Please choose a date at least ${VISIT_NOTICE_DAYS} days from today. For a sooner visit, call or message us.`,
        },
        { status: 400 },
      )
    }
    if (!Number.isFinite(groupSize) || groupSize < 1 || groupSize > 100) {
      return Response.json({ error: 'Number of people must be between 1 and 100.' }, { status: 400 })
    }
    if (looksLikeSpam(message)) {
      return new Response(null, { status: 204 }) // silently drop link spam
    }

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'visit-requests',
      overrideAccess: true,
      data: {
        status: 'new',
        name: name.slice(0, 120),
        email: email.slice(0, 200),
        phone: String(body.phone || '').slice(0, 60),
        visitorType: oneOf(VISITOR_TYPES, body.visitorType, 'other'),
        organisation: String(body.organisation || '').slice(0, 150),
        accessibility: String(body.accessibility || '').slice(0, 500),
        date,
        altDate,
        time: /^\d{2}:\d{2}$/.test(time) ? time : '',
        groupSize,
        language: oneOf(VISIT_LANGUAGES, body.language, 'en'),
        message: message.slice(0, 3000),
      },
    })
    return Response.json({ ok: true }, { status: 201 })
  } catch {
    return Response.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
