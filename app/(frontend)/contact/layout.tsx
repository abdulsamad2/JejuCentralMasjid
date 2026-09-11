import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pageMetadata'

// The page itself is a client component, which cannot export metadata.
export const metadata = pageMetadata({
  title: 'Contact & Directions',
  description:
    'Contact Jeju Central Masjid — address, directions with Kakao, Naver and Google Maps, phone, WhatsApp and email. 제주 이슬람 사원 연락처와 오시는 길.',
  path: '/contact',
  image: { url: '/assets/masjid-exterior-front.jpg', width: 1920, height: 1440, alt: 'The building of Jeju Central Masjid' },
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
