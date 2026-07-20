import Link from 'next/link'
import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

/**
 * Support appeal — inspired by Green Lane Masjid's homepage appeal block.
 * Rewritten for Jeju Central Masjid: a small community mosque with real,
 * modest impact numbers. Honest over inflated.
 */
export default function SupportAppeal() {
  return (
    <section
      aria-labelledby="support-heading"
      className="bg-islamic-cream-light py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Text */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Sadaqah Jariyah
            </p>
            <h2
              id="support-heading"
              className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl"
            >
              Support Your Masjid Today
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-islamic-navy/80 sm:text-lg">
              <p>
                Every week, Jeju Central Masjid hosts the{' '}
                <span className="font-semibold text-islamic-navy">five daily prayers</span>,{' '}
                <span className="font-semibold text-islamic-navy">Jummah</span>, and learning
                circles — A&rsquo;mal on Thursdays, Gasht on Sundays, a daily Hadith session
                after Isha, and Community Gathering on Sundays.
              </p>
              <p>
                We run{' '}
                <span className="font-semibold text-islamic-navy">Children&rsquo;s classes</span>{' '}
                every day after Maghrib, a{' '}
                <span className="font-semibold text-islamic-navy">Monthly Gathering</span>, and{' '}
                <span className="font-semibold text-islamic-navy">Mashwara</span> sessions for
                consultation and advice. We also welcome{' '}
                <span className="font-semibold text-islamic-navy">Korean visitors</span> and anyone
                curious about Islam.
              </p>
              <p>
                Our on-site library offers Islamic books in{' '}
                <span className="font-semibold text-islamic-navy">Korean, Urdu, and English</span> —
                a place to learn, ask questions, and find guidance. During Ramadan we serve{' '}
                <span className="font-semibold text-islamic-navy">community iftars</span> open to
                all.
              </p>
              <p className="text-islamic-navy">
                When you donate, you are not simply supporting a rented space — you are investing
                in worship, learning, and community care that continues every single day.
              </p>
              <p className="text-islamic-navy/90">
                Every person who prays, learns, or finds guidance here carries ongoing reward
                for everyone who helped make it possible, insha&rsquo;Allah.
              </p>
            </div>

            <blockquote className="mt-7 border-l-4 border-islamic-gold bg-white p-5 shadow-sm ring-1 ring-islamic-navy/5 sm:p-6">
              <p className="font-arabic-display arabic-features-fancy text-xl leading-loose text-islamic-navy sm:text-2xl">
                أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ
              </p>
              <p className="mt-3 text-sm italic leading-relaxed text-islamic-navy/75 sm:text-base">
                &ldquo;The most beloved deed to Allah is the most regular and constant even if it
                were little.&rdquo;
                <span className="ml-2 font-semibold not-italic text-islamic-green">
                  — Sahih al-Bukhari
                </span>
              </p>
            </blockquote>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/donate"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-md bg-islamic-gold px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-islamic-navy shadow-[0_10px_30px_-10px_rgba(201,162,75,0.55)] transition hover:-translate-y-0.5 hover:bg-islamic-gold-light hover:shadow-xl sm:text-base"
              >
                Support Jeju Central Masjid
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-islamic-navy/15 bg-white px-6 py-3 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:text-base"
              >
                Learn more about us
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-lg lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl ring-1 ring-islamic-navy/5">
                <Image
                  src="/assets/mosque-1.jpg"
                  alt="Jeju Central Masjid community"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-islamic-navy-dark/55 via-transparent to-transparent" />
              </div>

              {/* Stat chip — small but real */}
              <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-islamic-navy/5 sm:-left-6 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-islamic-green">
                  Every donation
                </p>
                <p className="mt-1 text-2xl font-extrabold text-islamic-navy sm:text-3xl">
                  Sadaqah Jariyah
                </p>
                <p className="mt-1 text-xs text-islamic-navy/65 sm:text-sm">
                  Continuing reward while the masjid serves
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
