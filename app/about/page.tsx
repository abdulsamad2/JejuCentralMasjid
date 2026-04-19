import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import {
  BookOpenIcon,
  UserGroupIcon,
  HomeIcon,
  ClockIcon,
  HeartIcon,
  HandRaisedIcon,
  SparklesIcon,
  ChevronRightIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'About | Jeju Central Masjid',
  description:
    'About Jeju Central Masjid — a welcoming community mosque on Jeju Island with separate prayer areas, a small multilingual library, and a growing ummah.',
}

const facilities = [
  {
    icon: UserGroupIcon,
    title: 'Separate Prayer Areas',
    description:
      'Dedicated prayer spaces for brothers and sisters, with respectful partitioning.',
  },
  {
    icon: BookOpenIcon,
    title: 'Multilingual Library',
    description:
      'A small on-site library of Islamic books in Korean, Urdu, and English — free to read or borrow.',
  },
  {
    icon: HomeIcon,
    title: 'Welcoming Space',
    description:
      'A rented second-floor space arranged for prayer, study, community meals, and classes.',
  },
  {
    icon: SparklesIcon,
    title: 'Wudu Facilities',
    description:
      'Clean ablution area for brothers and sisters, maintained daily by community volunteers.',
  },
]

const services = [
  'Five daily prayers & Jummah',
  'Weekly halaqas (A’mal, Gashat, Community Gathering)',
  'Nikah (Islamic marriage) & family guidance',
  'New Muslim support',
  'Halal food guidance across Jeju',
  'Community iftars during Ramadan',
  'Student & visitor welcome',
  'Library lending & reading',
]

const timings = [
  { label: 'Daily Prayers', detail: 'Five prayers — Fajr through Isha' },
  { label: 'Jummah', detail: 'Every Friday · Iqama 13:30 (Khutbah from 13:15)' },
  { label: 'Weekly Circles', detail: 'Thu (A’mal), Sat (Gashat), Sun (Community)' },
  { label: 'Library', detail: 'Open around prayer times — ask any volunteer' },
]

const guidelines = [
  'Remove shoes before entering the prayer area',
  'Modest dress for all visitors; head covering for women inside the prayer hall',
  'Maintain a respectful quiet during prayer times',
  'Non-Muslim visitors are welcome — please introduce yourself to a volunteer',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHeader
        eyebrow="About Us"
        title="Who we are"
        description="Jeju Central Masjid is a small, welcoming community mosque serving the Muslim community across Jeju Island — students, families, workers, and visitors from all backgrounds."
        action={{ label: 'Support the masjid', href: '/donate' }}
      />

      {/* Intro split */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
                <span className="h-px w-8 bg-islamic-green" />
                Our Story
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl">
                A community mosque on Jeju Island
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-islamic-navy/75 sm:text-lg">
                <p>
                  Jeju Central Masjid (<span className="font-arabic-display arabic-features text-islamic-green">مسجد جيجو المركزي</span>)
                  is a grassroots mosque born from the needs of Muslim students, workers, and families
                  who made Jeju Island their home.
                </p>
                <p>
                  We currently operate from a modest <span className="font-semibold text-islamic-navy">rented second-floor space</span>{' '}
                  that hosts the five daily prayers, Jummah, weekly halaqas, and a small library —
                  all run by the community, for the community.
                </p>
                <p>
                  Our doors are open to Muslims and non-Muslims alike. Whether you&apos;re here to pray,
                  learn about Islam, borrow a book, or simply introduce yourself — you are welcome.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-islamic-green px-6 py-3 text-sm font-semibold text-white shadow-md shadow-islamic-green/25 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark sm:text-base"
                >
                  Visit us
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-islamic-navy/15 bg-white px-6 py-3 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:text-base"
                >
                  Our services
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-islamic-navy/5">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/assets/mosque-2.jpg"
                    alt="Jeju Central Masjid community"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-islamic-navy-dark/60 via-transparent to-transparent" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-islamic-navy/8 bg-white p-4 text-center">
                  <p className="text-2xl font-extrabold text-islamic-green">5×</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-islamic-navy/60">
                    Daily Salah
                  </p>
                </div>
                <div className="rounded-2xl border border-islamic-navy/8 bg-white p-4 text-center">
                  <p className="text-2xl font-extrabold text-islamic-green">3</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-islamic-navy/60">
                    Languages
                  </p>
                </div>
                <div className="rounded-2xl border border-islamic-navy/8 bg-white p-4 text-center">
                  <p className="text-2xl font-extrabold text-islamic-green">100%</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-islamic-navy/60">
                    Volunteer-run
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-islamic-cream py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              The Space
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl">
              What you&apos;ll find inside
            </h2>
            <p className="mt-3 text-base text-islamic-navy/70 sm:text-lg">
              Small, functional, and maintained with care by volunteers.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {facilities.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-islamic-navy/8 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-islamic-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-islamic-navy/65">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-3xl border border-islamic-navy/8 bg-white p-8 shadow-sm sm:p-10">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <HeartIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-islamic-navy">Our Mission</h3>
              <p className="mt-3 text-base leading-relaxed text-islamic-navy/75">
                To provide a welcoming place of worship, learning, and community for Muslims on
                Jeju Island — grounded in the Quran and Sunnah, open to all, and free from sectarian
                divides.
              </p>
            </div>
            <div className="rounded-3xl border border-islamic-gold/30 bg-gradient-to-br from-islamic-cream-light to-white p-8 shadow-sm sm:p-10">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-gold/15 text-islamic-gold-dark">
                <HandRaisedIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-islamic-navy">Our Vision</h3>
              <p className="mt-3 text-base leading-relaxed text-islamic-navy/75">
                To insha&apos;Allah establish a permanent masjid on Jeju Island — with purpose-built
                prayer spaces for brothers and sisters, expanded Islamic education, and a cultural
                bridge to our Korean neighbours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When to visit */}
      <section className="bg-islamic-cream py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
                <span className="h-px w-8 bg-islamic-green" />
                When to Visit
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl">
                The masjid is most alive around prayer times
              </h2>
              <p className="mt-4 text-base leading-relaxed text-islamic-navy/70 sm:text-lg">
                We don&apos;t keep formal office hours — the building is open before and after each
                prayer. For a private visit or tour, please contact us in advance.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green"
              >
                <ClockIcon className="h-4 w-4 text-islamic-green" />
                Plan a visit
              </Link>
            </div>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-islamic-navy/8 overflow-hidden rounded-2xl border border-islamic-navy/8 bg-white">
                {timings.map((t) => (
                  <li key={t.label} className="flex items-start gap-4 p-5 sm:p-6">
                    <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                      <ClockIcon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-islamic-navy sm:text-base">{t.label}</p>
                      <p className="mt-0.5 text-sm text-islamic-navy/65">{t.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services summary */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
                <span className="h-px w-8 bg-islamic-green" />
                What We Offer
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl">
                Services &amp; programs
              </h2>
              <p className="mt-4 text-base leading-relaxed text-islamic-navy/70 sm:text-lg">
                A snapshot of what happens at the masjid week to week. See the full list on our
                services page.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-islamic-green px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-islamic-green/25 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark"
              >
                All services
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 rounded-xl border border-islamic-navy/8 bg-white p-4"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-islamic-green/15 text-islamic-green">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-medium text-islamic-navy">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor guidelines */}
      <section className="bg-islamic-cream py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-islamic-navy/8 bg-white p-8 shadow-sm sm:p-10">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Visitor Guidelines
            </p>
            <h2 className="mt-3 text-2xl font-bold text-islamic-navy sm:text-3xl">
              A few simple things to know
            </h2>
            <ul className="mt-5 space-y-3">
              {guidelines.map((g) => (
                <li key={g} className="flex items-start gap-3 text-base text-islamic-navy/80">
                  <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-islamic-green/15 text-islamic-green">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Donate CTA band */}
      <section className="relative overflow-hidden bg-islamic-navy text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l8 22 22 8-22 8-8 22-8-22-22-8 22-8z' fill='%23ffffff' fill-opacity='.5'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-gold">
            <span className="h-px w-8 bg-islamic-gold" />
            Support the Masjid
            <span className="h-px w-8 bg-islamic-gold" />
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            Help us secure a permanent home on Jeju Island
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-islamic-cream/85 sm:text-lg">
            Every contribution — however small — is a sadaqah jariyah that helps us move from a
            rented floor to a masjid of our own.
          </p>
          <Link
            href="/donate"
            className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-md bg-islamic-gold px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-islamic-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-islamic-gold-light sm:text-base"
          >
            Donate Now
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
