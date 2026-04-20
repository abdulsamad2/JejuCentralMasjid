import Link from 'next/link'
import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

type NewsItem = {
  title: string
  excerpt: string
  date: string // ISO YYYY-MM-DD
  tag?: string
  image?: string
  href?: string
}

const NEWS: NewsItem[] = [
  {
    title: 'Eid Al-Fitr 2026 Announcement',
    excerpt: 'Eid Salah timings, the khutbah, and community breakfast — details for the blessed day inshaAllah.',
    date: '2026-03-20',
    tag: 'Announcement',
    image: '/assets/mosque-2.jpg',
    href: '#',
  },
  {
    title: 'Ramadan 2026 Prayer & Iftar Schedule',
    excerpt: 'Iftar, taraweeh, and daily i\u2019tikaaf schedule — alhamdulillah, please join us this holy month.',
    date: '2026-02-12',
    tag: 'Timetable',
    image: '/assets/mosque-3.jpg',
    href: '#',
  },
  {
    title: 'Community Iftar — Open to All',
    excerpt: 'Every Friday during Ramadan we host an open iftar for students, families, and visitors.',
    date: '2026-02-20',
    tag: 'Event',
    image: '/assets/mosque-1.jpg',
    href: '#',
  },
  {
    title: 'Appeal: A Permanent Home for Our Masjid',
    excerpt: 'Alhamdulillah the community has grown — your sadaqah brings us closer to a permanent masjid.',
    date: '2026-01-10',
    tag: 'Appeal',
    image: '/assets/mosque-2.jpg',
    href: '/donate',
  },
]

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function NewsSection() {
  return (
    <section id="news" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Announcements
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl">
              From the masjid
            </h2>
            <p className="mt-3 max-w-2xl text-base text-islamic-navy/70 sm:text-lg">
              Stay up to date with what's happening at Jeju Central Masjid.
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:self-auto"
          >
            All news
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {NEWS.map((item, i) => (
            <Link
              key={i}
              href={item.href ?? '#'}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-islamic-navy/5 transition hover:-translate-y-1 hover:shadow-xl hover:ring-islamic-green/20"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-islamic-navy">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                )}
                {item.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-islamic-green shadow-sm">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-islamic-navy/50">
                  {formatDate(item.date)}
                </p>
                <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-islamic-navy transition group-hover:text-islamic-green sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-islamic-navy/65">
                  {item.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-islamic-green">
                  Read more
                  <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
