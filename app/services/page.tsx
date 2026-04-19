import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import {
  UserGroupIcon,
  BookOpenIcon,
  HeartIcon,
  SparklesIcon,
  UserPlusIcon,
  CakeIcon,
  ChevronRightIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Services | Jeju Central Masjid',
  description:
    'Services at Jeju Central Masjid — daily prayers, weekly halaqas, Nikah, multilingual library, new Muslim support, and community iftars.',
}

type Service = {
  icon: typeof UserGroupIcon
  title: string
  summary: string
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    icon: UserGroupIcon,
    title: 'Prayers & Jummah',
    summary: 'Five daily prayers and Friday Jummah in a welcoming community setting.',
    bullets: [
      'Separate prayer areas for brothers and sisters',
      'Jummah every Friday · Iqama 13:30',
      'Open before and after each salah',
    ],
  },
  {
    icon: SparklesIcon,
    title: 'Weekly Halaqas',
    summary: "Regular learning circles — open to all, no registration needed.",
    bullets: [
      "A'mal · Thursdays after Maghrib",
      'Gashat · Saturdays after Maghrib',
      'Community Gathering · Sundays after Asr',
    ],
  },
  {
    icon: HeartIcon,
    title: 'Nikah & Family',
    summary: 'Islamic marriage ceremonies and family guidance when an imam is available.',
    bullets: [
      'Nikah ceremonies by appointment',
      'Pre-marriage guidance',
      'Family counselling — please contact us',
    ],
  },
  {
    icon: BookOpenIcon,
    title: 'Multilingual Library',
    summary: 'A modest on-site collection of Islamic books — free to read or borrow.',
    bullets: [
      'Books in Korean, Urdu, and English',
      'Quran, tafsir, hadith, and beginner guides',
      'Ask any volunteer to borrow a book',
    ],
  },
  {
    icon: UserPlusIcon,
    title: 'New Muslim Support',
    summary: 'A warm welcome and practical guidance for anyone new to Islam.',
    bullets: [
      'Introductory conversations with a volunteer',
      'Shahada ceremony in the masjid',
      'Starter Qur\u2019an and beginner books',
    ],
  },
  {
    icon: CakeIcon,
    title: 'Ramadan & Iftars',
    summary: 'Community iftars and special programming during the blessed month.',
    bullets: [
      'Open community iftars during Ramadan',
      'Extended prayer & taraweeh arrangements',
      'Volunteer cooking and serving',
    ],
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHeader
        eyebrow="What We Do"
        title="Services"
        description="Jeju Central Masjid is a small, volunteer-run community mosque. The services below are what we consistently offer, insha'Allah."
        action={{ label: 'Contact us', href: '/contact' }}
      />

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className="flex flex-col rounded-2xl border border-islamic-navy/8 bg-white p-6 transition hover:-translate-y-1 hover:border-islamic-green/40 hover:shadow-md sm:p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                  <s.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-lg font-bold text-islamic-navy sm:text-xl">{s.title}</h2>
                <p className="mt-2 text-sm text-islamic-navy/65 sm:text-base">{s.summary}</p>
                <ul className="mt-4 space-y-2 border-t border-islamic-navy/8 pt-4">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-islamic-navy/75">
                      <span className="mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-islamic-green/15 text-islamic-green">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA band */}
      <section className="bg-islamic-cream py-12 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-islamic-navy sm:text-3xl">
            Can we help with something else?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-islamic-navy/70">
            If you need a service not listed here — a funeral, a tour, or advice — please get in
            touch. We&apos;ll do our best to help, insha&apos;Allah.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-islamic-green px-6 py-3 text-sm font-semibold text-white shadow-md shadow-islamic-green/25 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark sm:text-base"
          >
            Contact us
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
