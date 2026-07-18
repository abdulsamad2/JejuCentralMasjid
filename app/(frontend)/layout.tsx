import './globals.css'
import type { Metadata } from 'next'
import { Inter, Amiri, Scheherazade_New, Noto_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import FloatingContact from '@/components/FloatingContact'
import {
  MASJID_ADDRESS_EN_LINES,
  MASJID_COORDS,
  MASJID_PHONES,
} from '@/lib/constants/masjidLocation'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})
const scheherazade = Scheherazade_New({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-scheherazade',
})
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-arabic',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jejumasjid.kr'),
  title: {
    default: 'Jeju Central Masjid · 제주 이슬람 사원 | Mosque on Jeju Island, Korea',
    template: '%s | Jeju Central Masjid',
  },
  description:
    'Jeju Central Masjid (제주 중앙 마스지드) — a welcoming mosque on Jeju Island, South Korea. Daily prayers, Jummah, halal guidance, community events, and Islamic education. 제주도의 이슬람 사원 — 기도 시간, 할랄 안내, 커뮤니티 행사.',
  keywords: [
    'mosque',
    'masjid',
    'Jeju',
    'Jeju mosque',
    'Jeju masjid',
    'Islam Korea',
    'prayer times Jeju',
    'halal Jeju',
    'Jummah Jeju',
    '제주 모스크',
    '제주 이슬람 사원',
    '제주 마스지드',
    '이슬람',
    '할랄',
    '기도 시간',
  ],
  alternates: { canonical: './' },
  icons: { icon: '/assets/jeju-masjid-logo-icon.png' },
  openGraph: {
    type: 'website',
    siteName: 'Jeju Central Masjid',
    locale: 'en_US',
    alternateLocale: 'ko_KR',
    url: 'https://jejumasjid.kr',
    title: 'Jeju Central Masjid · 제주 이슬람 사원',
    description:
      'A welcoming mosque on Jeju Island, South Korea — daily prayers, Jummah, halal guidance, and community. Everyone is welcome.',
    images: [{ url: '/assets/mosque-2.jpg', width: 1600, height: 1200, alt: 'Jeju Central Masjid' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeju Central Masjid · 제주 이슬람 사원',
    description:
      'A welcoming mosque on Jeju Island, South Korea — daily prayers, Jummah, halal guidance, and community.',
    images: ['/assets/mosque-2.jpg'],
  },
}

const mosqueJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Mosque',
  name: 'Jeju Central Masjid',
  alternateName: '제주 중앙 마스지드',
  url: 'https://jejumasjid.kr',
  telephone: MASJID_PHONES[0].tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: MASJID_ADDRESS_EN_LINES[0],
    addressLocality: 'Jeju-si',
    addressRegion: 'Jeju-do',
    addressCountry: 'KR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: MASJID_COORDS.lat,
    longitude: MASJID_COORDS.lng,
  },
  openingHours: 'Mo-Su 00:00-24:00',
  isAccessibleForFree: true,
  sameAs: [
    'https://www.facebook.com/JejuCentralMasjid',
    'https://www.instagram.com/jejucentralmasjid/',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${amiri.variable} ${scheherazade.variable} ${notoSansArabic.variable}`}
    >
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mosqueJsonLd) }}
        />
        {children}
        <FloatingContact />
        <Analytics />
      </body>
    </html>
  )
}
