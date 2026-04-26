import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import {
  HomeIcon,
  HeartIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  SparklesIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Build a Permanent Masjid | Jeju Central Masjid',
  description:
    'Jeju Central Masjid currently operates from a rented hall. Help us build a permanent masjid and Islamic centre on Jeju Island, insha’Allah.',
}

const REALITY = [
  {
    icon: HomeIcon,
    title: 'Rented hall',
    body: 'We operate from a rented second-floor space — formerly a restaurant — that we renovated together as a community.',
  },
  {
    icon: UserGroupIcon,
    title: 'A growing ummah',
    body: 'Brothers, sisters, students, families and visitors from many nations now call this place their masjid.',
  },
  {
    icon: HeartIcon,
    title: 'Volunteer-run',
    body: 'Every program — prayers, classes, halal food, dawah — is run by community volunteers, with no paid staff.',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Recurring rent & bills',
    body: 'Each month we pay rent, electricity, gas, and upkeep. Stability is fragile when the building is not ours.',
  },
]

const VISION = [
  {
    icon: BuildingLibraryIcon,
    title: 'A masjid of our own',
    body: 'A purpose-built building owned by the community — not rented, not borrowed — a permanent home for the ummah on Jeju.',
  },
  {
    icon: UserGroupIcon,
    title: 'Separate halls for brothers and sisters',
    body: 'Spacious, dignified prayer areas for both — designed properly from day one, not improvised with partitions.',
  },
  {
    icon: AcademicCapIcon,
    title: 'Children’s Islamic education',
    body: 'A dedicated madrasah space so the next generation of Muslims on Jeju learns Qur’an and deen with care.',
  },
  {
    icon: GlobeAltIcon,
    title: 'Dawah & cultural centre',
    body: 'A welcoming centre for Korean visitors, new Muslims, tourists and researchers — bridging Islam and Korean society.',
  },
]

export default function PermanentMasjidPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHeader
        eyebrow="Our Long-term Vision"
        title="Help us build a permanent masjid"
        description="For 3.5 years, Jeju Central Masjid has served the ummah from a rented hall. Insha’Allah, the next chapter is a permanent masjid and Islamic centre — owned by the community, built to last."
        action={{ label: 'Donate now', href: '/donate' }}
      />

      {/* Where we are today */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
                <span className="h-px w-8 bg-islamic-green" />
                Where We Are Today
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl">
                A community in a rented home
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-islamic-navy/75 sm:text-lg">
                <p>
                  About 3.5 years ago, Jeju Central Masjid began in a small two-room rented place.
                  As more brothers and sisters arrived on the island, we needed more room to pray,
                  learn, and serve.
                </p>
                <p>
                  Today we operate from a larger second-floor hall — a former restaurant we
                  renovated together with our own hands. Floors, kitchen, paint, partitions,
                  carpets, curtains: all funded by the community here in Korea and donations from
                  brothers in Qatar, Australia, and Indonesia.
                </p>
                <p>
                  Alhamdulillah, the masjid is alive and growing. But it is still rented. Every
                  month brings rent, electricity, gas, and uncertainty about the long-term
                  future of this building.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-islamic-navy/5">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/assets/mosque-1.jpg"
                    alt="Jeju Central Masjid — current rented hall"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-islamic-navy-dark/55 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-islamic-gold">
                      Today
                    </p>
                    <p className="mt-1 text-base font-semibold">
                      A rented second-floor hall
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Reality cards */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {REALITY.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-islamic-navy/8 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                  <r.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-islamic-navy">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-islamic-navy/65">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The vision */}
      <section className="bg-islamic-cream py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              The Vision
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl">
              A permanent masjid &amp; Islamic centre on Jeju
            </h2>
            <p className="mt-3 text-base text-islamic-navy/70 sm:text-lg">
              Jeju is a world-renowned tourist destination. As the Muslim community here grows, we
              need a proper masjid and Islamic centre — a lasting place of worship, learning, and
              welcome.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            {VISION.map((v) => (
              <div
                key={v.title}
                className="flex gap-4 rounded-2xl border border-islamic-navy/8 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-gold/15 text-islamic-gold-dark">
                  <v.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-islamic-navy">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-islamic-navy/70">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hadith reminder */}
      <section className="relative overflow-hidden bg-islamic-navy text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0l8 22 22 8-22 8-8 22-8-22-22-8 22-8z' fill='%23ffffff' fill-opacity='.5'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-islamic-gold/20 text-islamic-gold">
            <SparklesIcon className="h-6 w-6" />
          </span>
          <p className="font-arabic-display arabic-features-fancy mt-6 text-2xl leading-loose text-islamic-cream sm:text-3xl">
            مَنْ بَنَى مَسْجِدًا لِلَّهِ بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ
          </p>
          <p className="mx-auto mt-5 max-w-xl text-base italic leading-relaxed text-islamic-cream/85 sm:text-lg">
            &ldquo;Whoever builds a masjid for the sake of Allah, Allah will build for him a
            house in Paradise.&rdquo;
          </p>
          <p className="mt-2 text-sm text-islamic-gold">— Sahih al-Bukhari · Sahih Muslim</p>
        </div>
      </section>

      {/* How to help */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              How You Can Help
              <span className="h-px w-8 bg-islamic-green" />
            </p>
            <h2 className="mt-3 text-2xl font-bold text-islamic-navy sm:text-3xl">
              Be part of this work, insha&rsquo;Allah
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-islamic-navy/70 sm:text-lg">
              Every contribution — large or small, one-time or monthly — is a sadaqah jariyah
              that stays with you long after this dunya.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-start rounded-2xl border border-islamic-navy/8 bg-white p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <HeartIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-islamic-navy">Donate</h3>
              <p className="mt-2 flex-1 text-sm text-islamic-navy/65">
                Choose &ldquo;Masjid Building&rdquo; to direct your contribution to the permanent
                masjid fund.
              </p>
              <Link
                href="/donate"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-islamic-green hover:text-islamic-green-dark"
              >
                Donate now
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-col items-start rounded-2xl border border-islamic-navy/8 bg-white p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <CheckBadgeIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-islamic-navy">Set up monthly giving</h3>
              <p className="mt-2 flex-1 text-sm text-islamic-navy/65">
                A small recurring sadaqah every month adds up — and the reward continues,
                insha&rsquo;Allah.
              </p>
              <Link
                href="/donate"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-islamic-green hover:text-islamic-green-dark"
              >
                Make it monthly
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-col items-start rounded-2xl border border-islamic-navy/8 bg-white p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-islamic-navy">Spread the word</h3>
              <p className="mt-2 flex-1 text-sm text-islamic-navy/65">
                Share this page with family and friends. Every brother or sister you tell could
                be the one whose contribution opens the door.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-islamic-green hover:text-islamic-green-dark"
              >
                Get in touch
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Strong final CTA */}
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-islamic-navy via-islamic-navy to-islamic-navy-dark p-8 text-center text-white shadow-xl sm:p-12">
            <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">
              Help us secure a permanent home on Jeju Island
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-base text-islamic-cream/85 sm:text-lg">
              Your contribution today builds a masjid that will serve generations.
            </p>
            <Link
              href="/donate"
              className="mt-6 inline-flex min-h-[52px] items-center gap-2 rounded-md bg-islamic-gold px-8 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-islamic-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-islamic-gold-light sm:text-base"
            >
              Donate to the building fund
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
