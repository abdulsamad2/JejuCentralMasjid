import type { ReactNode } from 'react'
import { pageMetadata } from '@/lib/seo/pageMetadata'

// The page itself is a client component, which cannot export metadata.
export const metadata = pageMetadata({
  title: 'Donate',
  description:
    'Support Jeju Central Masjid, a volunteer-run mosque in a rented space on Jeju Island. Give sadaqah or zakat by Korean bank transfer and help build a permanent masjid. 제주 이슬람 사원 후원 안내.',
  path: '/donate',
})

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
