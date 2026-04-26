import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import { ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { NEWS, formatNewsDate } from '../../lib/data/news'

export const metadata = {
  title: 'News & Announcements | Jeju Central Masjid',
  description:
    'Latest announcements, events, and updates from Jeju Central Masjid — Eid timings, Ramadan schedule, community iftars, and the permanent masjid appeal.',
}

export default function NewsListingPage() {
  const items = [...NEWS].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHeader
        eyebrow="Akhbar · From the Masjid"
        title="News & announcements"
        description="Updates from Jeju Central Masjid — Eid and Ramadan schedules, community gatherings, and the appeal for a permanent masjid."
        action={{ label: 'Contact us', href: '/contact' }}
      />

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-islamic-navy/15 bg-islamic-cream-light p-10 text-center">
              <p className="text-base font-semibold text-islamic-navy">
                No announcements right now
              </p>
              <p className="mt-2 text-sm text-islamic-navy/65">
                Please check back soon, insha&apos;Allah.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-islamic-navy/5 transition hover:-translate-y-1 hover:shadow-xl hover:ring-islamic-green/20"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-islamic-navy">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    )}
                    {item.tag && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-islamic-green shadow-sm">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-islamic-navy/50">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      {formatNewsDate(item.date)}
                    </p>
                    <h2 className="mt-2 text-lg font-bold leading-snug text-islamic-navy transition group-hover:text-islamic-green sm:text-xl">
                      {item.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-islamic-navy/65">
                      {item.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-islamic-green">
                      Read more
                      <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
