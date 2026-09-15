/**
 * Shared pieces for the form-notification emails (contact messages, visit
 * requests, receipt requests).
 */
import { MASJID_ADDRESS_EN_LINES, MASJID_CHAT_PHONE } from '../../lib/constants/masjidLocation'

export const INFO_EMAIL = 'info@jejucentralmasjid.kr'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Who hears about new website submissions: the committee inbox, plus anyone
 * listed in NOTIFY_EMAILS (comma-separated). Extra people are BCC'd so their
 * personal addresses never appear in a thread with the public.
 */
export function committeeRecipients(): { to: string; bcc?: string[] } {
  const extra = [
    ...new Set(
      (process.env.NOTIFY_EMAILS || '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter((e) => EMAIL_RE.test(e) && e !== INFO_EMAIL),
    ),
  ]
  return extra.length ? { to: INFO_EMAIL, bcc: extra } : { to: INFO_EMAIL }
}

/** Visitor-supplied text goes into HTML emails. */
export const esc = (value: unknown): string =>
  String(value ?? '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

/**
 * Name for "Assalamu alaikum …" in replies to the public. Acknowledgements go
 * to whatever address was typed into a public form, so they never echo free
 * text back — and a "name" that looks like a link is dropped rather than
 * forwarded to someone else's inbox.
 */
export function greetingName(name: unknown): string {
  const n = String(name ?? '').replace(/\s+/g, ' ').trim()
  // Letters in any script (Korean, Arabic…), spaces and . ' ’ - only — and
  // nothing shaped like a domain ("evil.com", "St.John"): mail clients turn
  // bare domains into links. Anything else gets the plain greeting.
  const looksLikeName = /^[\p{L}\p{M} .'’-]{1,60}$/u.test(n) && !/\.\p{L}{2,}/u.test(n)
  return looksLikeName ? n : ''
}

const detailRows = (details: [label: string, value: string][]): string =>
  details.length === 0
    ? ''
    : `<table width="100%" style="border-top:1px solid #eee;border-bottom:1px solid #eee;">${details
        .map(
          ([label, value]) => `
      <tr>
        <td style="padding:8px 12px 8px 0;color:#5b6b7c;font-size:14px;vertical-align:top;">${esc(label)}</td>
        <td style="padding:8px 0;color:#0E3A5F;font-size:14px;font-weight:600;text-align:right;">${esc(value)}</td>
      </tr>`,
        )
        .join('')}</table>`

const paragraph = (html: string): string =>
  `<p style="margin:20px 0 0;color:#3a4a5c;font-size:14px;line-height:1.6;">${html}</p>`

/** The branded frame every public-facing email shares (matches the donation receipt). */
function brandedEmail({ heading, body, footerNote }: { heading: string; body: string; footerNote: string }): string {
  return `<!doctype html>
<html>
<body style="margin:0;padding:24px;background:#F7F3E9;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e0d0;">
    <div style="background:#0E3A5F;padding:24px;text-align:center;">
      <p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;">Jeju Central Masjid</p>
      <p style="margin:4px 0 0;color:#C9A24B;font-size:13px;">제주 이슬람 사원</p>
    </div>
    <div style="padding:28px;">
      <p style="margin:0 0 16px;color:#0E3A5F;font-size:20px;font-weight:bold;">${esc(heading)}</p>
      ${body}
    </div>
    <div style="padding:16px 28px;background:#FBF8F0;border-top:1px solid #eee;text-align:center;">
      <p style="margin:0;color:#8a8574;font-size:12px;">
        Jeju Central Masjid · ${MASJID_ADDRESS_EN_LINES[0]}, Jeju-si ·
        <a href="mailto:${INFO_EMAIL}" style="color:#0B8F4A;">${INFO_EMAIL}</a><br/>
        ${esc(footerNote)}
      </p>
    </div>
  </div>
</body>
</html>`
}

const urgentLine = paragraph(
  `Something urgent? Call or message us on WhatsApp or KakaoTalk:
  <a href="tel:${MASJID_CHAT_PHONE.tel}" style="color:#0B8F4A;white-space:nowrap;">${MASJID_CHAT_PHONE.display}</a>`,
)

/** Branded "we received it" email, matching the donation receipt layout. */
export function acknowledgementHtml({
  name,
  heading,
  intro,
  details = [],
  next,
}: {
  name: unknown
  heading: string
  intro: string
  details?: [label: string, value: string][]
  next: string
}): string {
  const greeting = greetingName(name)
  return brandedEmail({
    heading,
    footerNote: 'You are receiving this because this address was entered on jejucentralmasjid.kr.',
    body: `<p style="margin:0 0 20px;color:#3a4a5c;font-size:14px;line-height:1.6;">
        Assalamu alaikum${greeting ? ` ${esc(greeting)}` : ''},<br/>
        ${esc(intro)}
      </p>
      ${detailRows(details)}
      ${paragraph(esc(next))}
      ${urgentLine}`,
  })
}

/**
 * The formal "your visit is confirmed" email, sent when an admin confirms a
 * visit request. Only admins trigger it, but visitor-typed text is still escaped.
 */
export function visitConfirmationHtml({
  name,
  date,
  time,
  host,
  people,
  note,
  addressEn,
  addressKo,
  maps,
  phones,
}: {
  name: string
  date: string
  time?: string | null
  host?: string | null
  people: number
  note?: string | null
  addressEn: string
  addressKo: string
  maps: { kakao: string; naver: string; google: string }
  phones: string[]
}): string {
  const button = (href: string, label: string, bg: string, fg: string) =>
    `<a href="${href}" style="display:inline-block;margin:4px 6px 0 0;padding:9px 14px;border-radius:8px;background:${bg};color:${fg};font-size:13px;font-weight:bold;text-decoration:none;">${label}</a>`
  const tips = [
    'The masjid is on the 2nd floor, reached by stairs only (there is no lift).',
    'Please remove your shoes at the entrance.',
    'Please wear clothing that covers shoulders and knees. Sisters may wish to bring a headscarf.',
    "Photos of the masjid are welcome, but please don't photograph people while they pray.",
  ]
  return brandedEmail({
    heading: 'Your visit is confirmed',
    footerNote: 'You are receiving this because you booked a visit on jejucentralmasjid.kr.',
    body: `<p style="margin:0 0 20px;color:#3a4a5c;font-size:14px;line-height:1.6;">
        Assalamu alaikum ${esc(name)},<br/>
        Thank you for booking a visit to Jeju Central Masjid. We are pleased to confirm it, and someone from our
        community will be there to welcome you.
      </p>
      ${detailRows([
        ['Date', date],
        ...(time ? [['Time', time] as [string, string]] : []),
        ...(host ? [['Meeting you', host] as [string, string]] : []),
        ['People', String(people)],
        ['Address', addressEn],
      ])}
      <p style="margin:8px 0 0;color:#5b6b7c;font-size:13px;">${esc(addressKo)}</p>
      ${note ? paragraph(`<strong style="color:#0E3A5F;">A note from us</strong><br/><span style="white-space:pre-wrap;">${esc(note)}</span>`) : ''}
      ${paragraph(`<strong style="color:#0E3A5F;">Getting here</strong><br/>
        ${button(maps.kakao, 'Kakao Map', '#FEE500', '#3C1E1E')}${button(maps.naver, 'Naver Map', '#03C75A', '#ffffff')}${button(maps.google, 'Google Maps', '#4285F4', '#ffffff')}`)}
      ${paragraph(`<strong style="color:#0E3A5F;">Before you come</strong>`)}
      <ul style="margin:6px 0 0;padding-left:20px;color:#3a4a5c;font-size:14px;line-height:1.6;">
        ${tips.map((t) => `<li>${esc(t)}</li>`).join('')}
      </ul>
      ${paragraph(`If your plans change, please reply to this email or call ${phones.map((p) => `<span style="white-space:nowrap;">${esc(p)}</span>`).join(' or ')} so our volunteers know.`)}
      ${paragraph(`We look forward to meeting you, insha'Allah.<br/>Jeju Central Masjid`)}`,
  })
}
