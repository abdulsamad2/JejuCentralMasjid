import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jeju Central Masjid · 제주 이슬람 사원',
    short_name: 'Jeju Masjid',
    description:
      'A welcoming mosque on Jeju Island, South Korea — prayer times, events, and community.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF8F0',
    theme_color: '#0E3A5F',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
