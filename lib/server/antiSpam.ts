/**
 * Lightweight, dependency-free spam defenses for the public form endpoints.
 *
 * - In-memory per-IP rate limiting (per serverless instance — not perfect,
 *   but stops bursts and costs nothing).
 * - Honeypot + minimum-fill-time checks shared by the form routes.
 */

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

/** Returns true if this key is within its rate limit. */
export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  // Opportunistic cleanup so the map can't grow unbounded.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k)
  }
  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  bucket.count += 1
  return bucket.count <= limit
}

export function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

/** Bot checks shared by the public forms. Returns a rejection reason or null. */
export function botCheck({
  honeypot,
  startedAt,
  userAgent,
  minFillMs = 3000,
}: {
  honeypot?: unknown
  startedAt?: unknown
  userAgent: string
  minFillMs?: number
}): string | null {
  // Honeypot: hidden field humans never fill.
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return 'honeypot'
  // Headless/bot user agents.
  if (!userAgent || /bot|crawl|spider|curl|wget|python|headless/i.test(userAgent)) return 'ua'
  // Time trap: humans don't complete a form in under a few seconds.
  const started = Number(startedAt)
  if (!Number.isFinite(started) || Date.now() - started < minFillMs) return 'too-fast'
  return null
}

/** Crude content heuristic: link-stuffed messages are almost always spam. */
export function looksLikeSpam(text: string): boolean {
  const urls = (text.match(/https?:\/\//gi) || []).length
  return urls > 2
}
