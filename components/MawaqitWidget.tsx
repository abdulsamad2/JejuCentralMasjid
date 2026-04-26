import Link from 'next/link'
import { HeartIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const MAWAQIT_SLUG =
  'jeju-central-masjid-15-sancheondandong-2-gil-jeju-si-jeju-do-63243-cheju-south-korea'

const DESKTOP_SRC =
  `https://mawaqit.net/en/w/${MAWAQIT_SLUG}?showOnly5PrayerTimes=0`

const MOBILE_SRC =
  `https://mawaqit.net/en/m/${MAWAQIT_SLUG}?showNotification=0&showSearchButton=0&showFooter=0&showFlashMessage=0&view=mobile`

/**
 * Welcome + authoritative prayer times. On desktop the "Serving the ummah"
 * intro sits next to the Mawaqit widget so neither feels lonely. On mobile
 * they stack. The inner overflow-hidden wrapper clips the "Powered by"
 * footer that Mawaqit renders inside the iframe.
 */
export default function MawaqitWidget() {
  return (
    <section
      aria-labelledby="welcome-heading"
      className="bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Welcome / serving the ummah — left on desktop, second on mobile */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Khidmat · Our Services
            </p>
            <h2
              id="welcome-heading"
              className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl"
            >
              Serving the ummah
            </h2>
            <p className="mt-3 max-w-xl text-base text-islamic-navy/70 sm:text-lg">
              Programs for prayer, learning, family, and community —
              insha&apos;Allah serving everyone who walks through our doors.
            </p>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-islamic-green/10 px-4 py-2 text-sm font-semibold text-islamic-green-dark">
              <HeartIcon className="h-4 w-4" />
              Separate prayer area for sisters
            </p>

            <div className="mt-6">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green"
              >
                All services
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Prayer times widget — right on desktop, FIRST on mobile (so prayer-time visitors see it immediately) */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-islamic-green lg:text-left">
              Today&rsquo;s Salah Times
            </p>
            <div className="overflow-hidden rounded-2xl bg-islamic-navy shadow-md ring-1 ring-islamic-navy/15 lg:shadow-sm">
              {/* Mobile / below lg — taller card so the iframe content breathes */}
              <div className="block h-[500px] overflow-hidden sm:h-[520px] lg:hidden">
                <iframe
                  src={MOBILE_SRC}
                  title="Jeju Central Masjid prayer times — mobile view"
                  loading="lazy"
                  className="h-[540px] w-full border-0"
                />
              </div>
              {/* Desktop / lg+ */}
              <div className="hidden h-[340px] overflow-hidden lg:block">
                <iframe
                  src={DESKTOP_SRC}
                  title="Jeju Central Masjid prayer times"
                  loading="lazy"
                  className="h-[400px] w-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
