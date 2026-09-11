export type HeroSlide = {
  src: string
  alt: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  /** CSS object-position focal point for the crop, e.g. '50% 72%'. Defaults to center. */
  position?: string
}

/**
 * The original homepage slides. The live slides are edited in the CMS
 * (Homepage slider); these were imported from here and remain as the
 * fallback if the CMS is unreachable.
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/assets/five-time-prayer-01.jpeg',
    alt: 'Congregation praying together at Jeju Central Masjid',
    position: '50% 72%',
    title: 'Five Daily Prayers',
    description:
      'All five daily prayers are held in congregation at the masjid, with our doors open around the clock. Come pray with us — brothers and sisters each have their own dedicated space.',
    ctaLabel: 'Visit Us',
    ctaHref: '/contact',
  },
  {
    src: '/assets/jummah-02.jpeg',
    alt: 'Imam delivering the Friday khutbah at Jeju Central Masjid',
    // Khateeb sits left-of-centre; hold him in frame on the narrow mobile crop.
    position: '42% 54%',
    title: 'Jummah at the Masjid',
    description:
      'Every Friday the whole island community gathers for the khutbah and Jummah salah — students, workers, families, and travellers side by side.',
    ctaLabel: 'Jummah Times',
    ctaHref: '/services',
  },
  {
    src: '/assets/mosque-3.jpg',
    alt: 'Around Jeju Central Masjid on Jeju Island',
    title: 'In the Heart of Jeju',
    description:
      'Located in the heart of Jeju, it serves students, workers, families, new Muslims, and visitors by providing opportunities to learn about Islam, ask questions, and take meaningful steps in faith.',
    ctaLabel: 'Learn More',
    ctaHref: '/about',
  },
  {
    src: '/assets/mosque-1.jpg',
    alt: 'Inside the Jeju Central Masjid prayer hall',
    title: 'Service, Unity & Compassion',
    description:
      'Committed to service, unity, and compassion, the masjid aims to strengthen both spiritual life and community well-being through outreach, care, and positive engagement with society.',
    ctaLabel: 'Support Us',
    ctaHref: '/donate',
  },
]
