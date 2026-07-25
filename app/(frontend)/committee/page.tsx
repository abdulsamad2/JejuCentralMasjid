import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import {
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  HeartIcon,
  GlobeAltIcon,
  HomeIcon,
  CalendarDaysIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  ChevronRightIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Masjid Committee',
  description:
    'How Jeju Central Masjid is organised — the Imam, senior committee, and department coordinators who serve the community.',
}

type Node = {
  role: string
  name?: string
  blurb: string
  icon: typeof UserGroupIcon
  accent: 'navy' | 'green' | 'gold'
}

const IMAM: Node = {
  role: 'Imam',
  name: 'Spiritual leadership',
  blurb:
    'Leads the five daily prayers, Jummah khutbah, and provides religious guidance for the community.',
  icon: SparklesIcon,
  accent: 'navy',
}

const SENIOR: Node[] = [
  {
    role: 'Chairman',
    blurb: 'Sets direction, chairs committee meetings, represents the masjid externally.',
    icon: ShieldCheckIcon,
    accent: 'navy',
  },
  {
    role: 'General Secretary',
    blurb: 'Coordinates departments, manages communications, day-to-day operations.',
    icon: UserGroupIcon,
    accent: 'navy',
  },
  {
    role: 'Treasurer',
    blurb: 'Manages funds, donations, monthly bills, transparency reports.',
    icon: HomeIcon,
    accent: 'navy',
  },
]

type Cluster = {
  title: string
  accent: 'green' | 'gold' | 'navy'
  items: { icon: typeof UserGroupIcon; role: string; body: string }[]
}

const CLUSTERS: Cluster[] = [
  {
    title: 'Education & Spiritual',
    accent: 'green',
    items: [
      {
        icon: BookOpenIcon,
        role: 'Faith Learning & Hadith',
        body: "A'mal · Gasht · Community Gathering · Daily Hadith after Isha",
      },
      {
        icon: AcademicCapIcon,
        role: "Children's Madrasah",
        body: 'Daily Qur’an & Islamic studies after Maghrib',
      },
      {
        icon: BookOpenIcon,
        role: 'Library',
        body: 'Korean / Urdu / English Islamic books',
      },
    ],
  },
  {
    title: 'Community & Outreach',
    accent: 'gold',
    items: [
      {
        icon: GlobeAltIcon,
        role: 'Dawah & Visitors',
        body: 'Mosque tours, Korean visitors, new Muslim support',
      },
      {
        icon: HeartIcon,
        role: 'Sisters’ Affairs',
        body: 'Sisters’ prayer space, programs & monthly seerah',
      },
      {
        icon: UserGroupIcon,
        role: 'New Arrivals & Welcome',
        body: 'Orientation, accommodation tips, settling-in support',
      },
      {
        icon: ChatBubbleLeftRightIcon,
        role: 'Social Media',
        body: 'Online presence, updates, awareness',
      },
    ],
  },
  {
    title: 'Operations',
    accent: 'navy',
    items: [
      {
        icon: CalendarDaysIcon,
        role: 'Events & Ramadan',
        body: 'Iftars, Eid prayers, Taraweeh, special gatherings',
      },
      {
        icon: WrenchScrewdriverIcon,
        role: 'Maintenance & Cleaning',
        body: 'Prayer hall, kitchen, wudu area, toilets',
      },
    ],
  },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Volunteer-led, no paid staff',
    body: 'Every role is filled by community volunteers — no salaries, no personal gains.',
  },
  {
    step: '2',
    title: 'Cyclic responsibility transfer',
    body: 'As students and researchers come and go, responsibilities are handed over to new members.',
  },
  {
    step: '3',
    title: 'Shura (consultation) for decisions',
    body: 'Major decisions are made through committee consultation, grounded in Islamic principles.',
  },
  {
    step: '4',
    title: 'Handled with amanah',
    body: 'Every contribution is managed with care and accountability by the committee.',
  },
]

const accentClasses = {
  navy: 'bg-islamic-navy text-white',
  green: 'bg-islamic-green text-white',
  gold: 'bg-islamic-gold text-islamic-navy',
} as const

const accentRing = {
  navy: 'ring-islamic-navy/20',
  green: 'ring-islamic-green/30',
  gold: 'ring-islamic-gold/30',
} as const

const accentDot = {
  navy: 'bg-islamic-navy',
  green: 'bg-islamic-green',
  gold: 'bg-islamic-gold',
} as const

function TreeCard({ node, size = 'md' }: { node: Node; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'p-4 max-w-[220px]',
    md: 'p-5 max-w-[260px]',
    lg: 'p-6 max-w-[300px]',
  }
  return (
    <div
      className={`relative w-full rounded-2xl bg-white shadow-md ring-1 ${
        accentRing[node.accent]
      } ${sizes[size]}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
            accentClasses[node.accent]
          }`}
        >
          <node.icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-base font-bold text-islamic-navy">{node.role}</p>
          {node.name && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-islamic-navy/55">
              {node.name}
            </p>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-islamic-navy/65 sm:text-sm">{node.blurb}</p>
    </div>
  )
}

export default function CommitteePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <BreadcrumbJsonLd trail={[{ name: 'Committee', path: '/committee' }]} />

      <PageHeader
        eyebrow="Shura · Committee"
        title="How the masjid is organised"
        description="Jeju Central Masjid is run entirely by volunteers — students, researchers, and community members serving in their own time. Here is the structure that keeps things running, insha'Allah."
        action={{ label: 'Volunteer with us', href: '/contact' }}
      />

      {/* Tree map / org chart */}
      <section className="bg-islamic-cream-light py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Org Chart
              <span className="h-px w-8 bg-islamic-green" />
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl">
              The structure
            </h2>
          </div>

          {/* TIER 1 — Imam */}
          <div className="flex flex-col items-center">
            <TreeCard node={IMAM} size="lg" />

            {/* vertical connector */}
            <div className="h-10 w-0.5 bg-islamic-navy/25" />

            {/* TIER 2 — Senior committee */}
            <div className="w-full">
              {/* Horizontal connector across siblings (desktop only) */}
              <div className="relative">
                <div className="absolute left-1/2 right-auto top-0 hidden h-0.5 w-2/3 -translate-x-1/2 bg-islamic-navy/25 md:block" />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
                {SENIOR.map((node) => (
                  <div key={node.role} className="relative flex flex-col items-center">
                    {/* short stub down from horizontal line on desktop */}
                    <div className="hidden h-6 w-0.5 bg-islamic-navy/25 md:block" />
                    <TreeCard node={node} size="md" />
                  </div>
                ))}
              </div>
            </div>

            {/* connector to departments tier */}
            <div className="h-10 w-0.5 bg-islamic-navy/25" />

            {/* Departments header pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-islamic-navy px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md sm:text-sm">
              <UserGroupIcon className="h-4 w-4" />
              Department Coordinators
            </div>

            {/* connector to clusters */}
            <div className="h-10 w-0.5 bg-islamic-navy/25" />

            {/* TIER 3 — Department clusters */}
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-6">
              {CLUSTERS.map((cluster) => (
                <div
                  key={cluster.title}
                  className={`rounded-3xl border-2 bg-white p-5 shadow-sm sm:p-6 ${
                    cluster.accent === 'green'
                      ? 'border-islamic-green/25'
                      : cluster.accent === 'gold'
                        ? 'border-islamic-gold/40'
                        : 'border-islamic-navy/15'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${accentDot[cluster.accent]}`} />
                    <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-islamic-navy/70">
                      {cluster.title}
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {cluster.items.map((item) => (
                      <li
                        key={item.role}
                        className="flex items-start gap-3 rounded-xl bg-islamic-cream-light/50 p-3"
                      >
                        <span
                          className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                            accentClasses[cluster.accent]
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-islamic-navy">{item.role}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-islamic-navy/65">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* connector to volunteers */}
            <div className="h-10 w-0.5 bg-islamic-navy/25" />

            {/* TIER 4 — Volunteers */}
            <div className="rounded-2xl border-2 border-dashed border-islamic-green/40 bg-white px-6 py-4 text-center shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-islamic-green">
                Volunteers
              </p>
              <p className="mt-1 text-sm font-semibold text-islamic-navy sm:text-base">
                Brothers &amp; sisters serving in every department
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl">
              Our principles of service
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {HOW_IT_WORKS.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-islamic-navy/8 bg-white p-6 shadow-sm"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-islamic-gold/15 text-sm font-extrabold text-islamic-gold-dark">
                  {s.step}
                </span>
                <h3 className="mt-4 text-base font-bold text-islamic-navy sm:text-lg">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-islamic-navy/65">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-islamic-navy py-14 text-white sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-islamic-gold/20 text-islamic-gold">
            <UserIcon className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Want to serve the masjid?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-islamic-cream/85 sm:text-lg">
            Every department welcomes volunteers — whether for an hour a week or an
            ongoing role. The reward, insha&rsquo;Allah, is from Allah (SWT).
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-islamic-gold px-6 py-3 text-sm font-bold text-islamic-navy transition hover:-translate-y-0.5 hover:bg-islamic-gold-light sm:text-base"
          >
            Get in touch
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
