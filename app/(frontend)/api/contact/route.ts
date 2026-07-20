import { getPayload } from 'payload'
import config from '@payload-config'
import { allowRequest, botCheck, clientIp, looksLikeSpam } from '@/lib/server/antiSpam'

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>
    const ua = req.headers.get('user-agent') || ''
    const ip = clientIp(req)

    const reason = botCheck({ honeypot: body.website, startedAt: body.startedAt, userAgent: ua })
    if (reason) return new Response(null, { status: 204 }) // silently drop bots

    if (!allowRequest(`contact:${ip}`, 5, 60 * 60 * 1000)) {
      return Response.json({ error: 'Too many messages — please try again later.' }, { status: 429 })
    }

    const message = String(body.message || '')
    if (!body.name || !body.email || !message) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400 })
    }
    if (looksLikeSpam(message)) {
      return new Response(null, { status: 204 }) // silently drop link spam
    }

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'contact-submissions',
      overrideAccess: true,
      data: {
        name: String(body.name).slice(0, 120),
        email: String(body.email).slice(0, 200),
        phone: String(body.phone || '').slice(0, 40),
        inquiry: String(body.inquiry || 'General').slice(0, 60),
        subject: String(body.subject || '').slice(0, 200),
        message: message.slice(0, 5000),
      },
    })
    return Response.json({ ok: true }, { status: 201 })
  } catch {
    return Response.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
