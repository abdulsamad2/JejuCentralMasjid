import Link from 'next/link'
import { CalendarIcon, ClockIcon, MapPinIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

type EventItem = {
  title: string
  description: string
  startDate: string // ISO YYYY-MM-DD
  startTime: string // HH:MM
  endTime?: string
  location?: string
  tag?: string
  href?: string
}

const EVENTS: EventItem[] = [
  {
    title: 'Jummah Prayer',
    description: "Weekly congregation with khutbah, followed by light refreshments. All are welcome.",
    startDate: '2026-04-24',
    startTime: '13:15',
    endTime: '14:00',
    location: 'Jeju Central Masjid',
    tag: 'Weekly',
    href: '/events',
  },
  {
    title: 'Community Iftar',
    description: 'Open iftar gathering bringing together brothers, sisters, and families from across Jeju.',
    startDate: '2026-03-06',
    startTime: '18:10',
    endTime: '20:00',
    location: 'Jeju Central Masjid',
    tag: 'Ramadan',
    href: '/events',
  },
  {
    title: "New Muslims' Welcome Session",
    description: 'A friendly meet-up for new Muslims and those wanting to learn more about Islam in Jeju.',
    startDate: '2026-05-03',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Jeju Central Masjid',
    tag: 'Community',
    href: '/events',
  },
]

function parts(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    weekday: d.toLocaleDateString('en-GB', { weekday: 'long' }),
  }
}

export default function EventsSection() {
  return (
    <section id="events" className="bg-islamic-cream py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Upcoming Events
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl">
              What&apos;s happening at the masjid
            </h2>
            <p className="mt-3 max-w-2xl text-base text-islamic-navy/70 sm:text-lg">
              Join us for prayer, learning, and community gatherings.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:self-auto"
          >
            Full calendar
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <ul className="space-y-4">
          {EVENTS.map((ev, i) => {
            const { day, month, weekday } = parts(ev.startDate)
            return (
              <li key={i}>
                <Link
                  href={ev.href ?? '/events'}
                  className="group flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-islamic-navy/5 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-islamic-green/20 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
                >
                  <div className="flex w-fit items-center gap-3 sm:flex-col sm:items-center sm:justify-center sm:gap-0">
                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-islamic-green to-islamic-green-dark text-white shadow-md sm:h-20 sm:w-20">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 sm:text-xs">
                        {month}
                      </span>
                      <span className="text-2xl font-extrabold leading-none sm:text-3xl">{day}</span>
                    </div>
                    <span className="text-xs font-semibold text-islamic-navy/60 sm:mt-2">{weekday}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {ev.tag && (
                        <span className="inline-flex items-center rounded-full bg-islamic-gold/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-islamic-gold-dark">
                          {ev.tag}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-islamic-navy/65">
                        <ClockIcon className="h-3.5 w-3.5" />
                        {ev.startTime}
                        {ev.endTime && ` – ${ev.endTime}`}
                      </span>
                      {ev.location && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-islamic-navy/65">
                          <MapPinIcon className="h-3.5 w-3.5" />
                          {ev.location}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-islamic-navy transition group-hover:text-islamic-green sm:text-xl">
                      {ev.title}
                    </h3>
                    <p className="mt-1 text-sm text-islamic-navy/65 sm:text-base">{ev.description}</p>
                  </div>

                  <span className="hidden items-center gap-1 text-sm font-semibold text-islamic-green sm:inline-flex">
                    Details
                    <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 rounded-2xl border border-dashed border-islamic-navy/15 bg-white/60 p-5 text-center text-sm text-islamic-navy/70 sm:text-base">
          <CalendarIcon className="mx-auto h-5 w-5 text-islamic-green" />
          <p className="mt-2">
            Subscribe our calendar: <Link href="/events" className="font-semibold text-islamic-green hover:underline">Google</Link> · <Link href="/events" className="font-semibold text-islamic-green hover:underline">iCalendar</Link> · <Link href="/events" className="font-semibold text-islamic-green hover:underline">Outlook</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
