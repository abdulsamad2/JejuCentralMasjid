import Link from 'next/link'
import {
  UserGroupIcon,
  BookOpenIcon,
  HeartIcon,
  SparklesIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

type Service = {
  icon: typeof UserGroupIcon
  title: string
  description: string
  href: string
}

const services: Service[] = [
  {
    icon: UserGroupIcon,
    title: 'Prayers & Jummah',
    description: 'Five daily prayers in separate areas for brothers and sisters, plus Jummah every Friday.',
    href: '/about',
  },
  {
    icon: SparklesIcon,
    title: 'Weekly Halaqas',
    description: "A'mal (Thu), Gashat (Sat), and Community Gathering (Sun) — open to all.",
    href: '/services',
  },
  {
    icon: HeartIcon,
    title: 'Nikah & Family',
    description: 'Islamic marriage ceremonies and family guidance when an imam is available.',
    href: '/services',
  },
  {
    icon: BookOpenIcon,
    title: 'Multilingual Library',
    description: 'A small collection of Islamic books in Korean, Urdu, and English — free to read or borrow.',
    href: '/about',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              What We Do
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl">
              Services
            </h2>
            <p className="mt-3 max-w-2xl text-base text-islamic-navy/70 sm:text-lg">
              A small community mosque offering the essentials for prayer, learning, and connection.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:self-auto"
          >
            Learn more
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group flex flex-col rounded-2xl border border-islamic-navy/8 bg-white p-6 transition hover:-translate-y-1 hover:border-islamic-green/40 hover:shadow-xl"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green transition group-hover:bg-islamic-green group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-islamic-navy sm:text-xl">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-islamic-navy/65">
                {s.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-islamic-green">
                Learn more
                <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
