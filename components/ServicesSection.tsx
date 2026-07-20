import Link from 'next/link'
import {
  UserGroupIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  ChevronRightIcon,
  HeartIcon,
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
    title: 'Prayers & Faith Learning',
    description: 'Five daily prayers, Jummah, weekly faith learning sessions (A’mal, Gasht, Community Gathering), and a daily hadith session after Isha.',
    href: '/services',
  },
  {
    icon: AcademicCapIcon,
    title: "Children's Classes",
    description: 'Daily Qur’an and Islamic studies for kids, every day after Maghrib.',
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
  {
    icon: HeartIcon,
    title: 'Marriage & Family Guidance',
    description: 'Guidance on Islamic marriage, pre-marriage preparation, and family life — by appointment.',
    href: '/services',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
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
