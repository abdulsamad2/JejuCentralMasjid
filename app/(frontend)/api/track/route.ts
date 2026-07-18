import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '@payload-config'

const SOURCES: [RegExp, string][] = [
  [/google\./i, 'Google'],
  [/naver\./i, 'Naver'],
  [/(daum|kakao)\./i, 'Kakao/Daum'],
  [/instagram\./i, 'Instagram'],
  [/facebook\.|fb\./i, 'Facebook'],
  [/youtube\.|youtu\.be/i, 'YouTube'],
  [/bing\./i, 'Bing'],
  [/(twitter|x)\.com|t\.co/i, 'X (Twitter)'],
  [/whatsapp/i, 'WhatsApp'],
  [/duckduckgo\./i, 'DuckDuckGo'],
]

function sourceFrom(referrer: string, selfHost: string): string {
  if (!referrer) return 'Direct'
  try {
    const host = new URL(referrer).hostname
    if (host === selfHost || host === 'localhost') return 'Internal'
    for (const [pattern, label] of SOURCES) if (pattern.test(host)) return label
    return host.replace(/^www\./, '')
  } catch {
    return 'Direct'
  }
}

export async function POST(req: Request) {
  try {
    const { path, referrer, search } = (await req.json()) as {
      path?: string
      referrer?: string
      search?: string
    }
    if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('/admin')) {
      return new Response(null, { status: 204 })
    }
    const ua = req.headers.get('user-agent') || ''
    if (!ua || /bot|crawl|spider|preview|lighthouse|headless|monitor/i.test(ua)) {
      return new Response(null, { status: 204 })
    }

    const day = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const visitor = crypto
      .createHash('sha256')
      .update(`${ip}|${ua}|${day}|${process.env.PAYLOAD_SECRET || 'salt'}`)
      .digest('hex')
      .slice(0, 16)

    // UTM campaign tagging (e.g. links shared as ?utm_source=kakao_group)
    const utm = new URLSearchParams(typeof search === 'string' ? search : '')
    const utmSource = utm.get('utm_source')
    const campaign = [utmSource, utm.get('utm_medium'), utm.get('utm_campaign')]
      .filter(Boolean)
      .join(' / ')

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'pageviews',
      data: {
        path: path.slice(0, 200),
        day,
        source: utmSource
          ? utmSource.charAt(0).toUpperCase() + utmSource.slice(1)
          : sourceFrom(referrer || '', new URL(req.url).hostname),
        referrer: (referrer || '').slice(0, 300),
        campaign: campaign.slice(0, 200),
        country: req.headers.get('x-vercel-ip-country') || '',
        device: /Mobi|Android|iPhone|iPad/i.test(ua) ? 'mobile' : 'desktop',
        visitor,
      },
    })
  } catch {
    /* analytics must never break the site */
  }
  return new Response(null, { status: 204 })
}
