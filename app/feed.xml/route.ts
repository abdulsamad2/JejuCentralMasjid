import { getAllNews } from '@/lib/cms'

export const revalidate = 600

const BASE = 'https://jejumasjid.kr'

const escapeXml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export async function GET() {
  const news = await getAllNews()

  const items = news
    .map(
      (n) => `    <item>
      <title>${escapeXml(n.title)}</title>
      <link>${BASE}/news/${n.slug}</link>
      <guid isPermaLink="true">${BASE}/news/${n.slug}</guid>
      <pubDate>${new Date(n.date + 'T09:00:00+09:00').toUTCString()}</pubDate>
      <description>${escapeXml(n.excerpt)}</description>
    </item>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Jeju Central Masjid · 제주 중앙 마스지드 — News</title>
    <link>${BASE}</link>
    <description>News and announcements from Jeju Central Masjid, the mosque of Jeju Island, South Korea. 제주 이슬람 사원 소식.</description>
    <language>en</language>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
