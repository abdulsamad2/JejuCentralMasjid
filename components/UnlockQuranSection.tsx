import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpenIcon,
  ChevronRightIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

const CURRICULUM = [
  'Nazirah Qur\u2019an with Tajweed',
  'Hifz-ul-Qur\u2019an',
  'Qur\u2019an Translation',
  'Noorani Qaida',
  'Fluent Qur\u2019an recitation',
  'Memorization of short Surahs',
]

/**
 * Unlock Qur'an — featured daily program section.
 * Content adapted from the masjid flyer (same wording) into a responsive
 * web layout that doesn't rely on a static poster image.
 */
export default function UnlockQuranSection() {
  return (
    <section
      aria-labelledby="unlock-quran-heading"
      className="relative overflow-hidden bg-gradient-to-br from-white via-islamic-cream-light to-white py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle Islamic pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 0l11 29 29 11-29 11-11 29-11-29-29-11 29-11z' fill='%230E3A5F' fill-opacity='.4'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left: program details */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-gold-dark">
              <span className="h-px w-8 bg-islamic-gold" />
              Ta&rsquo;lim al-Qur&rsquo;an · Daily Class
            </p>

            <h2
              id="unlock-quran-heading"
              className="mt-3 text-4xl font-extrabold leading-none tracking-tight text-islamic-navy sm:text-5xl lg:text-6xl"
            >
              Unlock Qur&rsquo;an
            </h2>
            <p className="mt-3 text-lg font-semibold text-islamic-green sm:text-xl">
              Start your day with the Qur&rsquo;an
            </p>
            <p className="mt-1 text-sm italic text-islamic-navy/60 sm:text-base">
              Teach yourself
            </p>

            {/* Curriculum list */}
            <div className="mt-7 rounded-2xl border border-islamic-navy/8 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-islamic-green">
                We Teach
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {CURRICULUM.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-islamic-navy sm:text-base"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-islamic-green text-white">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Meta chips */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-islamic-green/10 px-4 py-2 text-sm font-semibold text-islamic-green-dark">
                <ClockIcon className="h-4 w-4" />
                Class: After Maghrib prayer
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-islamic-navy/5 px-4 py-2 text-sm font-semibold text-islamic-navy">
                <MapPinIcon className="h-4 w-4 text-islamic-green" />
                Jeju Central Masjid
              </span>
            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-md bg-islamic-navy px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-islamic-navy-dark sm:text-base"
              >
                Start Now
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-islamic-navy/15 bg-white px-6 py-3 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:text-base"
              >
                Other programs
              </Link>
            </div>
          </div>

          {/* Right: ayah card (top) + small teacher portrait */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col gap-5">
              {/* Ayah card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-islamic-navy via-islamic-navy to-islamic-navy-dark p-8 text-white shadow-xl sm:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l8 22 22 8-22 8-8 22-8-22-22-8 22-8z' fill='%23ffffff' fill-opacity='.5'/%3E%3C/svg%3E\")",
                  }}
                />

                <div className="relative flex flex-col">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-islamic-gold/20 text-islamic-gold">
                    <BookOpenIcon className="h-6 w-6" />
                  </span>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-islamic-gold">
                    Qur&rsquo;an · Al-Isra 17:78
                  </p>

                  <p className="font-arabic-display arabic-features-fancy mt-4 text-3xl leading-[1.9] text-islamic-cream sm:text-4xl">
                    إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا
                  </p>

                  <p className="mt-5 text-base italic leading-relaxed text-islamic-cream/85 sm:text-lg">
                    &ldquo;Indeed, the recitation of the Qur&rsquo;an at dawn (Fajr) is
                    witnessed.&rdquo;
                  </p>
                </div>
              </div>

              {/* Teacher portrait — small card */}
              <div className="flex items-center gap-4 rounded-2xl border border-islamic-navy/8 bg-white p-3 shadow-sm sm:p-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                  <Image
                    src="/assets/qari.jpeg"
                    alt="Qur&rsquo;an teacher at Jeju Central Masjid"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-islamic-green">
                    Your teacher
                  </p>
                  <p className="mt-0.5 text-base font-bold text-islamic-navy sm:text-lg">
                    Qur&rsquo;an Teacher
                  </p>
                  <p className="text-xs text-islamic-navy/65 sm:text-sm">
                    Daily class · Jeju Central Masjid
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}