import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import EmailLink from '@/components/EmailLink'
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

import { getEvents } from '@/lib/cms'
import { MASJID_CHAT_PHONE, MASJID_WHATSAPP } from '@/lib/constants/masjidLocation'

export const revalidate = 120

export const metadata = {
  title: 'Events',
  description:
    'Upcoming events and gatherings at Jeju Central Masjid. To RSVP, please contact us — no online form required. 제주 이슬람 사원의 행사와 모임 안내.',
}

function calendarUrl(ev: {
  title: string
  description?: string
  startDate: string
  startTime?: string
  endTime?: string
  location?: string
}) {
  const d = ev.startDate.replace(/-/g, '')
  const dates = ev.startTime
    ? `${d}T${ev.startTime.replace(':', '')}00/${d}T${(ev.endTime || ev.startTime).replace(':', '')}00`
    : `${d}/${d}`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${ev.title} — Jeju Central Masjid`,
    dates,
    ctz: 'Asia/Seoul',
    details: ev.description || 'Event at Jeju Central Masjid',
    location: ev.location || 'Jeju Central Masjid, Sancheondandong 2-gil 15, Jeju-si',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function fmt(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    weekday: d.toLocaleDateString('en-GB', { weekday: 'long' }),
    full: d.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  }
}

export default async function EventsPage() {
  const UPCOMING = await getEvents()
  const eventsJsonLd = {
    '@context': 'https://schema.org',
    '@graph': UPCOMING.map((ev) => ({
      '@type': 'Event',
      name: ev.title,
      description: ev.description || 'Event at Jeju Central Masjid',
      startDate: ev.startTime ? `${ev.startDate}T${ev.startTime}:00+09:00` : ev.startDate,
      ...(ev.endTime ? { endDate: `${ev.startDate}T${ev.endTime}:00+09:00` } : {}),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      isAccessibleForFree: true,
      location: {
        '@type': 'Place',
        name: 'Jeju Central Masjid',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Sancheondandong 2-gil 15, 2F',
          addressLocality: 'Jeju-si',
          addressRegion: 'Jeju-do',
          addressCountry: 'KR',
        },
      },
      organizer: { '@type': 'Organization', name: 'Jeju Central Masjid', url: 'https://jejucentralmasjid.kr' },
    })),
  }
  return (
    <main className="min-h-screen bg-white">
      {UPCOMING.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
        />
      )}
      <Navbar />

      <BreadcrumbJsonLd trail={[{ name: 'Events', path: '/events' }]} />

      <PageHeader
        eyebrow="Masjid Calendar"
        title="Events & gatherings"
        description="Join us for prayers, learning, and community gatherings, insha'Allah. To RSVP, simply message or call the masjid — no online form needed."
        action={{ label: 'Contact us', href: '/contact' }}
      />

      {/* Upcoming events */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Upcoming
            </p>
            <h2 className="mt-3 text-2xl font-bold text-islamic-navy sm:text-3xl">
              What&rsquo;s coming up
            </h2>
          </div>

          {UPCOMING.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-islamic-navy/15 bg-islamic-cream-light p-8 text-center">
              <CalendarDaysIcon className="mx-auto h-8 w-8 text-islamic-green" />
              <p className="mt-3 text-base font-semibold text-islamic-navy">
                No events scheduled right now
              </p>
              <p className="mt-1 text-sm text-islamic-navy/65">
                Please check back soon, insha&apos;Allah.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {UPCOMING.map((ev) => {
                const { day, month, weekday, full } = fmt(ev.startDate)
                return (
                  <li key={ev.startDate + ev.title}>
                    <article className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-islamic-navy/5 sm:flex-row sm:items-stretch sm:p-6">
                      <div className="flex sm:flex-col sm:items-center sm:justify-start">
                        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green sm:h-20 sm:w-20">
                          <span className="text-[10px] font-bold uppercase tracking-wider">
                            {month}
                          </span>
                          <span className="text-2xl font-extrabold leading-none sm:text-3xl">
                            {day}
                          </span>
                        </div>
                        <span className="ml-3 self-center text-xs font-semibold text-islamic-navy/60 sm:ml-0 sm:mt-2 sm:text-center">
                          {weekday}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {ev.recurring && (
                            <span className="inline-flex items-center rounded-full bg-islamic-gold/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-islamic-gold-dark">
                              {ev.recurring}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 text-lg font-bold text-islamic-navy sm:text-xl">
                          {ev.title}
                        </h3>
                        {ev.description && (
                          <p className="mt-1 text-sm text-islamic-navy/70 sm:text-base">
                            {ev.description}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-islamic-navy/65 sm:text-sm">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDaysIcon className="h-3.5 w-3.5" />
                            {full}
                          </span>
                          {ev.startTime && (
                            <span className="inline-flex items-center gap-1.5">
                              <ClockIcon className="h-3.5 w-3.5" />
                              {ev.startTime}
                              {ev.endTime && ` – ${ev.endTime}`}
                            </span>
                          )}
                          {ev.location && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPinIcon className="h-3.5 w-3.5" />
                              {ev.location}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-islamic-green hover:text-islamic-green-dark"
                          >
                            RSVP — message the masjid
                            <ChevronRightIcon className="h-4 w-4" />
                          </Link>
                          <a
                            href={calendarUrl(ev)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-islamic-navy/60 transition hover:text-islamic-green"
                          >
                            <CalendarDaysIcon className="h-4 w-4" />
                            Add to calendar
                          </a>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      {/* How to RSVP */}
      <section className="bg-islamic-cream py-12 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              How to RSVP
              <span className="h-px w-8 bg-islamic-green" />
            </p>
            <h2 className="mt-3 text-2xl font-bold text-islamic-navy sm:text-3xl">
              Simple &amp; direct
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-islamic-navy/70 sm:text-base">
              We keep things small and personal — no online registration needed. Just let
              us know you&rsquo;re coming and we&rsquo;ll save you a spot, insha&apos;Allah.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href={MASJID_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-islamic-navy/5 transition hover:-translate-y-0.5 hover:ring-islamic-green/30"
            >
              <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-bold text-islamic-navy">
                  WhatsApp <span className="font-semibold text-islamic-navy/60">{MASJID_CHAT_PHONE.display}</span>
                </p>
                <p className="mt-0.5 text-sm text-islamic-navy/65">
                  Fastest way — send us a short message with the event name.
                </p>
              </div>
            </a>

            <EmailLink className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-islamic-navy/5 transition hover:-translate-y-0.5 hover:ring-islamic-green/30">
              <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <EnvelopeIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-bold text-islamic-navy">Email</p>
                <p className="mt-0.5 text-sm text-islamic-navy/65">
                  For non-urgent questions — we reply within 1–2 days.
                </p>
              </div>
            </EmailLink>
          </div>
        </div>
      </section>

      {/* Suggest an event */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-islamic-navy sm:text-2xl">
            Have an event idea?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-islamic-navy/65 sm:text-base">
            Talks, learning circles, family programs — if you&rsquo;d like to organise or
            suggest something, get in touch and we&rsquo;ll see what we can do together.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green"
          >
            Share your idea
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
