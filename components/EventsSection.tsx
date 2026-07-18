import Link from 'next/link'
import { ClockIcon, MapPinIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { getEvents } from '../lib/cms'

function parts(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    weekday: d.toLocaleDateString('en-GB', { weekday: 'short' }),
  }
}

export default async function EventsSection() {
  const events = await getEvents()
  return (
    <section id="events" className="bg-islamic-cream py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Masjid Calendar
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl">
              Upcoming events
            </h2>
            <p className="mt-3 max-w-2xl text-base text-islamic-navy/70 sm:text-lg">
              Prayers, gatherings, and community programs at the masjid.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:self-auto"
          >
            All events
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-islamic-navy/15 bg-islamic-cream-light p-8 text-center">
            <p className="text-base font-semibold text-islamic-navy">No events scheduled right now</p>
            <p className="mt-1 text-sm text-islamic-navy/65">Please check back soon, insha&apos;Allah.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {events.map((ev) => {
              const { day, month, weekday } = parts(ev.startDate)
              return (
                <li key={ev.startDate + ev.title}>
                  <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-islamic-navy/5 sm:gap-5 sm:p-5">
                    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-islamic-green/10 text-islamic-green sm:h-16 sm:w-16">
                      <span className="text-[10px] font-bold uppercase tracking-wider">{month}</span>
                      <span className="text-xl font-extrabold leading-none sm:text-2xl">{day}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-islamic-navy sm:text-lg">
                        {ev.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-islamic-navy/65 sm:text-sm">
                        <span>{weekday}</span>
                        {ev.startTime && (
                          <span className="inline-flex items-center gap-1">
                            <ClockIcon className="h-3.5 w-3.5" />
                            {ev.startTime}
                          </span>
                        )}
                        {ev.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPinIcon className="h-3.5 w-3.5" />
                            {ev.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-islamic-green hover:underline"
          >
            Contact us about an event
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
