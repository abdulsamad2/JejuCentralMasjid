import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Amiri, Scheherazade_New, Noto_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import FloatingContact from '@/components/FloatingContact'
import TrackPageview from '@/components/TrackPageview'
import {
  MASJID_ADDRESS_EN_LINES,
  MASJID_COORDS,
  MASJID_MAPS,
  MASJID_NAME_EN,
  MASJID_NAME_KO,
  MASJID_NAME_KO_ALT,
  MASJID_PHONES,
} from '@/lib/constants/masjidLocation'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// The three Arabic faces are ~480 KB combined and are used only for a handful
// of decorative lines, never above the fold. Preloading them put six
// High-priority font requests ahead of the LCP hero image on mobile.
// `preload: false` still loads them when Arabic text renders (display: swap),
// just not on the critical path.
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  preload: false,
})
const scheherazade = Scheherazade_New({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-scheherazade',
  preload: false,
})
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-arabic',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jejucentralmasjid.kr'),
  title: {
    default: 'Jeju Central Masjid · 제주 이슬람 사원 | Mosque on Jeju Island, Korea',
    template: '%s | Jeju Central Masjid',
  },
  description:
    'Jeju Central Masjid (제주 이슬람 사원) — a welcoming mosque on Jeju Island, South Korea. Daily prayers, Jummah, halal guidance, community events, and Islamic education. 제주도의 이슬람 사원 — 기도 시간, 할랄 안내, 커뮤니티 행사.',
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
  alternates: {
    canonical: './',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  // Site ownership verification for Google Search Console & Naver Search Advisor.
  // Set the env vars in Vercel after registering the site with each service.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION
      ? { other: { 'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION } }
      : {}),
  },
  other: {
    'geo.region': 'KR-49',
    'geo.placename': 'Jeju-si, Jeju-do, South Korea',
    'geo.position': `${MASJID_COORDS.lat};${MASJID_COORDS.lng}`,
    ICBM: `${MASJID_COORDS.lat}, ${MASJID_COORDS.lng}`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Jeju Central Masjid',
    locale: 'en_US',
    alternateLocale: 'ko_KR',
    url: 'https://jejucentralmasjid.kr',
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

/** Next Friday (Asia/Seoul) as YYYY-MM-DD — keeps the Jummah Event from going stale. */
function nextFridayISO(): string {
  const seoulNow = new Date(Date.now() + 9 * 60 * 60 * 1000)
  const daysAhead = (5 - seoulNow.getUTCDay() + 7) % 7
  const friday = new Date(seoulNow.getTime() + daysAhead * 24 * 60 * 60 * 1000)
  return friday.toISOString().slice(0, 10)
}

const MASJID_ID = 'https://jejucentralmasjid.kr/#masjid'

// Built per render (not module scope) so the Jummah date tracks ISR revalidation.
const buildMosqueJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Mosque',
  '@id': MASJID_ID,
  name: MASJID_NAME_EN,
  // 'Jeju Islamic Center' deliberately excluded — that is a different
  // organisation in Nohyeong-dong, and claiming it as an alias feeds the
  // exact mix-up that sends travellers to the wrong building.
  alternateName: [MASJID_NAME_KO, MASJID_NAME_KO_ALT],
  description:
    'A welcoming mosque on Jeju Island, South Korea, open 24/7 with the five daily prayers, Jummah every Friday, halal guidance, Islamic education, and community events. Everyone is welcome.',
  url: 'https://jejucentralmasjid.kr',
  image: [
    'https://jejucentralmasjid.kr/assets/mosque-2.jpg',
    'https://jejucentralmasjid.kr/assets/masjid-exterior-front.jpg',
    'https://jejucentralmasjid.kr/assets/library-shelves.jpg',
  ],
  logo: 'https://jejucentralmasjid.kr/assets/jeju-masjid-logo-icon.png',
  telephone: MASJID_PHONES[0].tel,
  email: 'info@jejucentralmasjid.kr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: MASJID_ADDRESS_EN_LINES[0],
    addressLocality: 'Jeju-si',
    addressRegion: 'Jeju-do',
    postalCode: '63243',
    addressCountry: 'KR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: MASJID_COORDS.lat,
    longitude: MASJID_COORDS.lng,
  },
  hasMap: [MASJID_MAPS.google, MASJID_MAPS.kakao, MASJID_MAPS.naver],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  isAccessibleForFree: true,
  publicAccess: true,
  religiousDenomination: 'Sunni Islam',
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Separate prayer area for women',
      value: true,
    },
    { '@type': 'LocationFeatureSpecification', name: 'Wudu facilities', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Multilingual Islamic library', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Open 24 hours', value: true },
  ],
  event: {
    '@type': 'Event',
    name: 'Jummah Prayer',
    description: 'Friday congregational prayer and khutbah. Open to all.',
    startDate: `${nextFridayISO()}T13:05:00+09:00`,
    endDate: `${nextFridayISO()}T14:00:00+09:00`,
    eventSchedule: {
      '@type': 'Schedule',
      byDay: 'https://schema.org/Friday',
      startTime: '13:05',
      endTime: '14:00',
      repeatFrequency: 'P1W',
      scheduleTimezone: 'Asia/Seoul',
    },
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: { '@id': MASJID_ID },
    isAccessibleForFree: true,
  },
  keywords:
    'mosque, masjid, Jeju, prayer times, Jummah, halal, Islam Korea, 제주 모스크, 제주 이슬람 사원, 할랄, 기도',
  sameAs: [
    'https://www.facebook.com/JejuCentralMasjid',
    'https://www.instagram.com/jejucentralmasjid/',
    MASJID_MAPS.google,
    MASJID_MAPS.kakao,
  ],
})

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildMosqueJsonLd()) }}
        />
        {children}
        <FloatingContact />
        <TrackPageview />
        <Analytics />
        {/* Umami (open-source analytics) — enabled by setting the env vars. */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            defer
            src={process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://cloud.umami.is/script.js'}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </body>
    </html>
  )
}
