import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Central Jeju Mosque | Masjid Jeju Tengah',
  description: 'Central Jeju Mosque serving the Muslim community in Jeju Island with prayer services, halal food guidance, community events, and educational programs.',
  keywords: 'mosque, masjid, jeju, islam, muslim, prayer times, halal food, community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}