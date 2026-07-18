import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import {
  UserGroupIcon,
  UserPlusIcon,
  BookOpenIcon,
  SparklesIcon,
  AcademicCapIcon,
  CakeIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  CheckIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Services | Jeju Central Masjid',
  description:
    'Services at Jeju Central Masjid — daily prayers, weekly halaqas, Children\u2019s classes, Monthly Gathering, Mashwara (consultation), Korean visitor outreach, library, and Ramadan programs.',
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
      'Separate section for sisters — dedicated prayer area',
      'Jummah every Friday · Iqama 13:30',
      'Open 24/7 — doors are always open',
    ],
  },
  {
    icon: SparklesIcon,
    title: 'Halaqas & Hadith',
    summary: 'Regular learning circles and a nightly hadith session — open to all, no registration needed.',
    bullets: [
      "A'mal (Islamic Activity) · Thursdays after Maghrib",
      'Gasht (Dawat o Tableegh) · Saturdays after Maghrib',
      'Community Gathering · Sundays after Asr',
      'Daily Hadith session · every day after Isha',
    ],
  },
  {
    icon: AcademicCapIcon,
    title: "Children's Classes",
    summary: 'Qur\u2019an and Islamic studies for children, every day after Maghrib.',
    bullets: [
      'Every day after Maghrib',
      'Qur\u2019an recitation & basics of Islam',
      'Age-appropriate Islamic stories',
    ],
  },
  {
    icon: CalendarDaysIcon,
    title: 'Monthly Gathering',
    summary: 'A larger community gathering held once a month — food, talks, and fellowship.',
    bullets: [
      'Held on a scheduled weekend each month',
      'Guest speakers and reminders',
      'Shared meal and community time',
    ],
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Mashwara · Consultation',
    summary: 'Islamic consultation and advisory sessions for personal and community matters.',
    bullets: [
      'Speak with knowledgeable volunteers',
      'Life, family, and religious questions',
      'Confidential and no appointment fee',
    ],
  },
  {
    icon: GlobeAltIcon,
    title: 'Dawah & Visitors',
    summary: 'Warm welcome and simple guidance for anyone who walks through our doors.',
    bullets: [
      'Short guidelines for first-time visitors',
      'Introductory materials about Islam',
      'Support for those taking their shahada',
    ],
  },
  {
    icon: UserPlusIcon,
    title: 'Orientation & Welcome',
    summary: 'Helping new students and community members settle into masjid life.',
    bullets: [
      'Introduction to prayer times and weekly programs',
      'Connecting new arrivals with the community',
      'Practical tips for living in Jeju',
    ],
  },
  {
    icon: HeartIcon,
    title: 'Islamic Marriage & Family Guidance',
    summary: 'Nikah ceremonies and family guidance rooted in Islamic teachings — by appointment.',
    bullets: [
      'Guidance on Islamic marriage (Nikah) principles and requirements',
      'Pre-marriage guidance and preparation',
      'Family and marital guidance based on Islamic teachings',
      'Information on marriage rights, responsibilities, and family life',
    ],
  },
  {
    icon: BookOpenIcon,
    title: 'Multilingual Library',
    summary: 'A modest on-site collection of Islamic books — free to read or borrow.',
    bullets: [
      'Books in Korean, Urdu, and English',
      'Qur\u2019an, tafsir, hadith, and beginner guides',
      'Ask any volunteer to borrow a book',
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
        eyebrow="Khidmat · Our Services"
        title="Serving the ummah"
        description="Jeju Central Masjid is a small, volunteer-run community mosque. The programs below are what we consistently offer, insha'Allah."
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
