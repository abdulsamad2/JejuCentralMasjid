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
  const rows = details
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 0;color:#5b6b7c;font-size:14px;">${esc(label)}</td>
        <td style="padding:8px 0;color:#0E3A5F;font-size:14px;font-weight:600;text-align:right;">${esc(value)}</td>
      </tr>`,
    )
    .join('')

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
      <p style="margin:0 0 20px;color:#3a4a5c;font-size:14px;line-height:1.6;">
        Assalamu alaikum${greeting ? ` ${esc(greeting)}` : ''},<br/>
        ${esc(intro)}
      </p>
      ${rows ? `<table width="100%" style="border-top:1px solid #eee;border-bottom:1px solid #eee;">${rows}</table>` : ''}
      <p style="margin:20px 0 0;color:#3a4a5c;font-size:14px;line-height:1.6;">${esc(next)}</p>
      <p style="margin:20px 0 0;color:#3a4a5c;font-size:14px;line-height:1.6;">
        Something urgent? Call or message us on WhatsApp or KakaoTalk:
        <a href="tel:${MASJID_CHAT_PHONE.tel}" style="color:#0B8F4A;white-space:nowrap;">${MASJID_CHAT_PHONE.display}</a>
      </p>
    </div>
    <div style="padding:16px 28px;background:#FBF8F0;border-top:1px solid #eee;text-align:center;">
      <p style="margin:0;color:#8a8574;font-size:12px;">
        Jeju Central Masjid · ${MASJID_ADDRESS_EN_LINES[0]}, Jeju-si ·
        <a href="mailto:${INFO_EMAIL}" style="color:#0B8F4A;">${INFO_EMAIL}</a><br/>
        You are receiving this because this address was entered on jejucentralmasjid.kr.
      </p>
    </div>
  </div>
</body>
</html>`
}
