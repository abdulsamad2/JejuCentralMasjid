export type NewsItem = {
  slug: string
  title: string
  excerpt: string
  body: string[]
  date: string // ISO YYYY-MM-DD
  tag?: string
  image?: string
}

export const NEWS: NewsItem[] = [
  {
    slug: 'eid-al-fitr-2026-announcement',
    title: 'Eid Al-Fitr 2026 Announcement',
    excerpt:
      'Eid Salah timings, the khutbah, and community breakfast — details for the blessed day inshaAllah.',
    body: [
      'Alhamdulillah, Eid Al-Fitr will be celebrated at Jeju Central Masjid this year. Brothers, sisters, and families from across the island are warmly invited to join us.',
      'Eid Salah will begin shortly after sunrise, followed by the khutbah and a short reminder. Please arrive early to find a place comfortably.',
      'A simple community breakfast will be served after the prayer — tea, dates, and light food shared together. Volunteers are welcome to help prepare or clean up.',
      'For the exact time and any last-minute updates, please check our WhatsApp/Kakao groups, or contact the masjid directly.',
    ],
    date: '2026-03-20',
    tag: 'Announcement',
    image: '/assets/mosque-2.jpg',
  },
  {
    slug: 'ramadan-2026-prayer-iftar-schedule',
    title: 'Ramadan 2026 Prayer & Iftar Schedule',
    excerpt:
      'Iftar, taraweeh, and daily i’tikaaf schedule — alhamdulillah, please join us this holy month.',
    body: [
      'Ramadan Mubarak. Jeju Central Masjid will host iftar and Taraweeh every night during the blessed month, insha’Allah.',
      'Iftar is open to everyone — students, workers, families, and visitors. Please come a few minutes before Maghrib so we can welcome you and seat the sisters and brothers in their respective sections.',
      'Taraweeh prayers will follow Isha each night. One of our senior brothers will recite the complete Qur’an across the month.',
      'On the last 10 nights, we will arrange i’tikaaf for those who wish to dedicate themselves to worship. Please contact us in advance to register and coordinate logistics.',
    ],
    date: '2026-02-12',
    tag: 'Timetable',
    image: '/assets/mosque-3.jpg',
  },
  {
    slug: 'community-iftar-open-to-all',
    title: 'Community Iftar — Open to All',
    excerpt:
      'Every Friday during Ramadan we host an open iftar for students, families, and visitors.',
    body: [
      'Every Friday during Ramadan, the masjid hosts a community iftar — open to all, no booking required.',
      'This is a chance for new arrivals on Jeju to meet the community, for non-Muslim friends to experience Ramadan, and for everyone to share the blessing of breaking fast together.',
      'If you’d like to sponsor or help cook a Friday iftar, please contact us — even small contributions make a big difference.',
    ],
    date: '2026-02-20',
    tag: 'Event',
    image: '/assets/mosque-1.jpg',
  },
  {
    slug: 'permanent-masjid-appeal',
    title: 'Appeal: A Permanent Home for Our Masjid',
    excerpt:
      'Alhamdulillah the community has grown — your sadaqah brings us closer to a permanent masjid.',
    body: [
      'For 3.5 years, Jeju Central Masjid has served the ummah from a rented hall. Alhamdulillah, with the growing community, we are working towards a permanent masjid — a place that will be ours, insha’Allah, for generations.',
      'A permanent masjid means proper, separate halls for brothers and sisters; a dedicated madrasah space for our children; a Dawah and cultural centre for visitors and new Muslims; and stability that monthly rent simply cannot provide.',
      'Every contribution is a sadaqah jariyah — its reward continues for as long as the masjid stands and the ummah benefits.',
    ],
    date: '2026-01-10',
    tag: 'Appeal',
    image: '/assets/mosque-2.jpg',
  },
]

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return NEWS.find((n) => n.slug === slug)
}

export function formatNewsDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
