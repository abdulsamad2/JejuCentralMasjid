import type { Metadata } from 'next'

const SITE = 'Jeju Central Masjid'

type OgImage = { url: string; width: number; height: number; alt: string }

export const DEFAULT_OG_IMAGE: OgImage = {
  url: '/assets/mosque-2.jpg',
  width: 1600,
  height: 739,
  alt: 'Jeju Central Masjid prayer hall',
}

/**
 * Per-page metadata. Next.js replaces (does not merge) the layout's
 * openGraph/twitter objects when a page sets a title, and leaves them alone
 * when it doesn't — so without this every page shared on KakaoTalk,
 * WhatsApp or Facebook previewed as the homepage (og:title/og:url).
 * Canonical URLs come from the layout (`canonical: './'`).
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string
  description: string
  path: string
  image?: OgImage
}): Metadata {
  const socialTitle = `${title} | ${SITE}`
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: SITE,
      locale: 'en_US',
      alternateLocale: 'ko_KR',
      url: path,
      title: socialTitle,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image.url],
    },
  }
}
