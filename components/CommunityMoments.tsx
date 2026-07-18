import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronRightIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  UserGroupIcon,
  SparklesIcon,
  MegaphoneIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline'

type Moment = {
  src: string
  alt: string
  tag: string
  title: string
  description: string
  icon: typeof GlobeAltIcon
  href: string
}

const MOMENTS: Moment[] = [
  {
    src: '/assets/dawah-korean-visitors.jpg',
    alt: 'Local Korean students and visitors listening to a talk at Jeju Central Masjid',
    tag: 'Dawah',
    title: 'Korean visitors at the masjid',
    description:
      'Local Korean students and visitors come to learn about Islam and experience the masjid firsthand.',
    icon: GlobeAltIcon,
    href: '/services',
  },
  {
    src: '/assets/eid-prayer.jpg',
    alt: 'Eid prayer gathered outdoors in Jeju',
    tag: 'Eid',
    title: 'Eid prayers together',
    description:
      'The ummah comes together for Eid salah — a beautiful gathering of brothers, sisters, and families on Jeju Island.',
    icon: SparklesIcon,
    href: '/events',
  },
  {
    src: '/assets/iftaar-gathering.jpg',
    alt: 'Community iftar gathering at Jeju Central Masjid',
    tag: 'Iftar',
    title: 'Breaking fast together',
    description:
      'Brothers and sisters share iftar at the masjid — a time of gratitude, food, and community during Ramadan.',
    icon: UserGroupIcon,
    href: '/events',
  },
  {
    src: '/assets/children-quran.jpg',
    alt: "Children learning Qur'an at Jeju Central Masjid",
    tag: "Children's Classes",
    title: 'Little hands, holy words',
    description:
      "The next generation learning Noorani Qaida and beginning their journey with the Qur'an.",
    icon: AcademicCapIcon,
    href: '/services',
  },
  {
    src: '/assets/jummah-05.jpeg',
    alt: 'Khutbah during Jummah prayer at Jeju Central Masjid',
    tag: 'Jummah',
    title: 'Friday, all together',
    description:
      'Every Friday the whole island community gathers for the khutbah and Jummah salah — students, workers, and travelers side by side.',
    icon: MegaphoneIcon,
    href: '/contact',
  },
  {
    src: '/assets/gathering-04.jpg',
    alt: 'Monthly community gathering sharing a meal at the masjid',
    tag: 'Monthly Gathering',
    title: 'A monthly family dinner',
    description:
      'Once a month we sit down together for food, reminders, and brotherhood — newcomers are always welcome.',
    icon: CalendarDaysIcon,
    href: '/events',
  },
]

// Small snapshots strip — a taste of the full gallery
const SNAPSHOTS = [
  { src: '/assets/five-time-prayer-03.jpeg', alt: 'Daily congregational prayer' },
  { src: '/assets/jeju-family-16.jpg', alt: 'Our Jeju Muslim family' },
  { src: '/assets/volunteer-04.jpg', alt: 'Masjid volunteers at work' },
  { src: '/assets/visitor-06.jpg', alt: 'Visitors welcomed at the masjid' },
  { src: '/assets/eid-fitr-07.jpg', alt: 'Eid al-Fitr celebration' },
  { src: '/assets/community-elders-04.jpg', alt: 'Elders of our community' },
]

export default function CommunityMoments() {
  return (
    <section
      aria-labelledby="moments-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Our Ummah
            </p>
            <h2
              id="moments-heading"
              className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl"
            >
              Moments from the masjid
            </h2>
            <p className="mt-3 text-base text-islamic-navy/70 sm:text-lg">
              Every photo here is a real moment from our community — praying, learning, eating, and
              growing together on Jeju Island.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:self-auto"
          >
            View gallery
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {MOMENTS.map((m, i) => {
            return (
              <article
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-islamic-navy-dark shadow-lg ring-1 ring-islamic-navy/5 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-islamic-navy-dark via-islamic-navy-dark/50 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-6">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-islamic-gold/20 text-islamic-gold backdrop-blur-sm">
                      <m.icon className="h-4 w-4" />
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                      {m.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-tight sm:text-xl">{m.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-islamic-cream/85">
                    {m.description}
                  </p>
                  <Link
                    href={m.href}
                    className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-white/20"
                  >
                    Learn more
                    <ChevronRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* Snapshot strip — a taste of the full gallery */}
        <div className="mt-10 sm:mt-12">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {SNAPSHOTS.map((s) => (
              <Link
                key={s.src}
                href="/gallery"
                className="group relative block aspect-square overflow-hidden rounded-xl bg-islamic-navy ring-1 ring-islamic-navy/5"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-islamic-navy/60">
            Alhamdulillah — one small masjid, many stories.{' '}
            <Link
              href="/gallery"
              className="font-semibold text-islamic-green hover:text-islamic-green-dark"
            >
              Browse all photos
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}