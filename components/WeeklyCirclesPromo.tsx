import Link from 'next/link'
import Image from 'next/image'
import {
  SparklesIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

const circles = [
  {
    icon: SparklesIcon,
    title: "A'mal",
    schedule: 'Thursdays · After Maghrib',
  },
  {
    icon: BookOpenIcon,
    title: 'Gashat',
    schedule: 'Saturdays · After Maghrib',
  },
  {
    icon: UserGroupIcon,
    title: 'Community Gathering',
    schedule: 'Sundays · After Asr',
  },
]

export default function WeeklyCirclesPromo() {
  return (
    <section className="relative overflow-hidden bg-islamic-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l8 22 22 8-22 8-8 22-8-22-22-8 22-8z' fill='%23ffffff' fill-opacity='.5'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-gold">
              <span className="h-px w-8 bg-islamic-gold" />
              Weekly Circles
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Learning circles for brothers, sisters, and children
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-islamic-cream/85 sm:text-lg">
              Education teaches us how to think, how to work, and how to make decisions rooted in faith.
              Join our weekly halaqas — open to all skill levels, taught by qualified teachers.
            </p>

            <ul className="mt-8 space-y-3">
              {circles.map((c) => (
                <li
                  key={c.title}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-islamic-gold/15 text-islamic-gold">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-base font-bold leading-tight">{c.title}</p>
                    <p className="text-sm text-islamic-cream/75">{c.schedule}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/services"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-islamic-gold px-6 py-3 text-sm font-bold uppercase tracking-wider text-islamic-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-islamic-gold-light hover:shadow-xl sm:text-base"
              >
                View Weekly Schedule
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center gap-1 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10 sm:text-base"
              >
                Ask a Teacher
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
              <Image
                src="/assets/mosque-3.jpg"
                alt="Weekly circles at Jeju Central Masjid"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-islamic-navy-dark/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-2xl bg-white p-5 text-islamic-navy shadow-xl ring-1 ring-islamic-navy/5 sm:-left-6 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-islamic-green">
                Open to all
              </p>
              <p className="mt-1 text-2xl font-extrabold">Free · No registration</p>
              <p className="mt-1 text-xs text-islamic-navy/65">Walk-ins welcome</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
