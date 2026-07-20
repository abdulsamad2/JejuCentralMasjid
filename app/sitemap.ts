import type { MetadataRoute } from 'next'
import { getAllNews } from '@/lib/cms'

const BASE = 'https://jejucentralmasjid.kr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/events`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/news`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/gallery`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/donate`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faq`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/committee`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/permanent-masjid`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const news = await getAllNews()
  const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${BASE}/news/${n.slug}`,
    lastModified: new Date(n.date + 'T00:00:00'),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...newsRoutes]
}
