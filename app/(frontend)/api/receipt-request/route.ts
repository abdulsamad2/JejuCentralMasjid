import { getPayload } from 'payload'
import config from '@payload-config'
import { allowRequest, botCheck, clientIp } from '@/lib/server/antiSpam'

const MAX_SCREENSHOT_BYTES = 8 * 1024 * 1024

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const ua = req.headers.get('user-agent') || ''
    const ip = clientIp(req)

    const reason = botCheck({
      honeypot: form.get('website'),
      startedAt: form.get('startedAt'),
      userAgent: ua,
    })
    if (reason) return new Response(null, { status: 204 })

    if (!allowRequest(`receipt:${ip}`, 3, 60 * 60 * 1000)) {
      return Response.json({ error: 'Too many requests — please try again later.' }, { status: 429 })
    }

    const name = String(form.get('name') || '').slice(0, 120)
    const email = String(form.get('email') || '').slice(0, 200)
    const amount = Number(form.get('amount'))
    const transferDate = String(form.get('transferDate') || '')
    const designation = String(form.get('designation') || 'Sadaqah')
    if (!name || !email || !Number.isFinite(amount) || amount < 1 || !transferDate) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    let screenshotId: number | undefined
    const file = form.get('screenshot')
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_SCREENSHOT_BYTES || !file.type.startsWith('image/')) {
        return Response.json({ error: 'Screenshot must be an image under 8MB.' }, { status: 400 })
      }
      const shot = await payload.create({
        collection: 'receipt-screenshots',
        overrideAccess: true,
        file: {
          data: Buffer.from(await file.arrayBuffer()),
          name: file.name || 'screenshot.jpg',
          mimetype: file.type,
          size: file.size,
        },
        data: {},
      })
      screenshotId = shot.id as number
    }

    await payload.create({
      collection: 'receipt-requests',
      overrideAccess: true,
      data: {
        name,
        email,
        amount,
        transferDate,
        designation: (['Sadaqah', 'Masjid', 'Zakat'] as const).find((d) => d === designation) ?? 'Sadaqah',
        status: 'pending',
        ...(screenshotId ? { screenshot: screenshotId } : {}),
      },
    })
    return Response.json({ ok: true }, { status: 201 })
  } catch {
    return Response.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
