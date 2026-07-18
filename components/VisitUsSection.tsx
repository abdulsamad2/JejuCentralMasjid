import Link from 'next/link'
import {
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChevronRightIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'
import {
  MASJID_ADDRESS_EN_LINES,
  MASJID_ADDRESS_KO,
  MASJID_MAPS,
  MASJID_PHONES,
} from '../lib/constants/masjidLocation'

export default function VisitUsSection() {
  return (
    <section
      aria-labelledby="visit-heading"
      className="bg-islamic-cream py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Map — visual anchor on the left */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-islamic-navy/8 bg-white shadow-sm">
              <div className="relative aspect-[4/3] w-full bg-islamic-navy sm:aspect-[16/10]">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    MASJID_ADDRESS_KO,
                  )}&z=17&output=embed`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  title={`Jeju Central Masjid · ${MASJID_ADDRESS_KO}`}
                />
              </div>
              {/* Address bar with prominent Kakao Map CTA */}
              <div className="flex flex-col gap-3 border-t border-islamic-navy/8 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-islamic-navy/55">
                    Address
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-islamic-navy sm:text-base">
                    {MASJID_ADDRESS_KO}
                  </p>
                </div>
                <a
                  href={MASJID_MAPS.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#FEE500] px-4 py-2 text-sm font-bold text-[#3C1E1E] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Open in Kakao Map
                  <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Info — right column */}
          <div className="lg:col-span-5">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Ziyarah · Visit Us
            </p>
            <h2
              id="visit-heading"
              className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl"
            >
              Come pray with us
            </h2>
            <p className="mt-3 text-base leading-relaxed text-islamic-navy/75 sm:text-lg">
              Everyone is welcome — Muslims and non-Muslims, residents and visitors. Our doors open
              24/7 — our doors are always open, with separate spaces for brothers and sisters.
            </p>

            <ul className="mt-7 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-islamic-navy/55">
                    Address
                  </p>
                  <p className="mt-1 text-sm text-islamic-navy sm:text-base">
                    {MASJID_ADDRESS_EN_LINES[0]}
                    <br />
                    {MASJID_ADDRESS_EN_LINES[1]}, {MASJID_ADDRESS_EN_LINES[2]}
                  </p>
                  <p className="mt-1 text-sm text-islamic-navy/65">{MASJID_ADDRESS_KO}</p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <a
                      href={MASJID_MAPS.google}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#4285F4] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Google Maps
                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={MASJID_MAPS.kakao}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#FEE500] px-4 py-2.5 text-sm font-bold text-[#3C1E1E] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Kakao Map
                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={MASJID_MAPS.naver}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#03C75A] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Naver Map
                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                  <ClockIcon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-islamic-navy/55">
                    When we&rsquo;re open
                  </p>
                  <p className="mt-1 text-sm font-semibold text-islamic-green sm:text-base">
                    24/7 · Always open
                  </p>
                  <p className="text-xs text-islamic-navy/65 sm:text-sm">
                    Jummah Fri 13:30
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-islamic-navy/55">
                    Get in touch
                  </p>
                  <span className="mt-1 flex flex-col">
                    {MASJID_PHONES.map((p) => (
                      <a
                        key={p.tel}
                        href={`tel:${p.tel}`}
                        className="text-sm font-medium text-islamic-navy hover:text-islamic-green sm:text-base"
                      >
                        {p.display}
                      </a>
                    ))}
                  </span>
                  <a
                    href="mailto:info@jejumasjid.kr"
                    className="mt-0.5 inline-flex items-center gap-1 text-sm text-islamic-navy/70 hover:text-islamic-green"
                  >
                    <EnvelopeIcon className="h-3.5 w-3.5" />
                    info@jejumasjid.kr
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-islamic-green px-6 py-3 text-sm font-semibold text-white shadow-md shadow-islamic-green/25 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark sm:text-base"
              >
                Contact us
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-islamic-navy/15 bg-white px-6 py-3 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:text-base"
              >
                More about us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}