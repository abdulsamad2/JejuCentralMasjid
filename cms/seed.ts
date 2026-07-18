/**
 * One-time content seed — imports the news posts and events that used to be
 * hardcoded in lib/data/*.ts into the CMS. Images stay static under /public/assets.
 *
 * Run with:  npm run seed
 * Idempotent: skips any collection that already has documents.
 */
import { getPayload } from 'payload'
import config from '../payload.config'

const NEWS = [
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
    ].join('\n\n'),
    date: '2026-03-20',
    tag: 'Announcement' as const,
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
    ].join('\n\n'),
    date: '2026-02-12',
    tag: 'Timetable' as const,
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
    ].join('\n\n'),
    date: '2026-02-20',
    tag: 'Event' as const,
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
    ].join('\n\n'),
    date: '2026-01-10',
    tag: 'Appeal' as const,
    image: '/assets/mosque-2.jpg',
  },
]

const EVENTS = [
  {
    title: 'Jummah Prayer',
    description: 'Weekly congregational prayer and khutbah — open to all.',
    startDate: '2026-04-24',
    startTime: '13:15',
    endTime: '14:00',
    location: 'Jeju Central Masjid',
    recurring: 'Every Friday',
  },
  {
    title: 'Community Iftar',
    description: 'Open iftar gathering bringing brothers, sisters, and families together.',
    startDate: '2026-05-03',
    startTime: '18:10',
    endTime: '20:00',
    location: 'Jeju Central Masjid',
  },
]

const payload = await getPayload({ config })

const newsCount = await payload.count({ collection: 'news' })
if (newsCount.totalDocs > 0) {
  payload.logger.info(`News already has ${newsCount.totalDocs} docs — skipping.`)
} else {
  for (const item of NEWS) {
    await payload.create({
      collection: 'news',
      data: {
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        body: item.body,
        date: item.date,
        tag: item.tag,
        image: item.image,
      },
    })
    payload.logger.info(`Seeded news: ${item.slug}`)
  }
}

const eventsCount = await payload.count({ collection: 'events' })
if (eventsCount.totalDocs > 0) {
  payload.logger.info(`Events already has ${eventsCount.totalDocs} docs — skipping.`)
} else {
  for (const ev of EVENTS) {
    await payload.create({ collection: 'events', data: ev })
    payload.logger.info(`Seeded event: ${ev.title}`)
  }
}

payload.logger.info('Seed complete.')
process.exit(0)
