import Link from 'next/link'
import {
  UserGroupIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
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
    title: 'Prayers & Halaqas',
    description: 'Five daily prayers, Jummah, and weekly halaqas (A\u2019mal, Gashat, Community Gathering).',
    href: '/services',
  },
  {
    icon: AcademicCapIcon,
    title: "Children's Classes",
    description: 'Weekend Qur\u2019an and Islamic studies for kids, led by volunteer teachers.',
    href: '/services',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Mashwara',
    description: 'Islamic consultation and advisory sessions for personal and community matters.',
    href: '/services',
  },
  {
    icon: GlobeAltIcon,
    title: 'Dawah & Visitors',
    description: 'Mosque tours, introductions to Islam, and support for Korean visitors and new Muslims.',
    href: '/services',
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
              Khidmat · Our Services
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl">
              Serving the ummah
            </h2>
            <p className="mt-3 max-w-2xl text-base text-islamic-navy/70 sm:text-lg">
              Programs for prayer, learning, family, and community — insha&apos;Allah serving
              everyone who walks through our doors.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:self-auto"
          >
            All services
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