import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  TruckIcon,
  PhoneIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Halal Food Guide | Jeju Central Masjid',
  description:
    'A general guide to eating halal in Jeju — what to check for on labels, ingredients to avoid, useful Korean phrases, and how to contact the masjid if you\u2019re unsure.',
}

const GUIDES = [
  {
    icon: CheckBadgeIcon,
    title: 'Look for certification',
    points: [
      'KMF (Korea Muslim Federation) mark',
      'International marks: JAKIM, MUI, HFCE',
      'When in doubt, check the brand online',
    ],
  },
  {
    icon: ExclamationTriangleIcon,
    title: 'Avoid these ingredients',
    points: [
      'Pork, lard, bacon, ham (\uB3FC\uC9C0, \uBCA0\uC774\uCEE8)',
      'Alcohol, wine, mirin, rum extract',
      'Gelatin & rennet (unless halal-certified)',
    ],
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Read labels carefully',
    points: [
      'Sauces & broths often contain pork stock',
      '\u201CNatural flavor\u201D can hide non-halal sources',
      'Processed meat is usually not halal',
    ],
  },
  {
    icon: ShoppingBagIcon,
    title: 'Safer choices locally',
    points: [
      'Fresh fish, seafood, eggs, dairy',
      'Fruits, vegetables, rice, grains',
      'Clearly labelled vegetarian products',
    ],
  },
]

const ONLINE_TIPS = [
  'Most brothers and sisters in Jeju order halal meat online from the mainland (Seoul/Busan-based halal butchers).',
  'Frozen halal chicken, beef, and lamb can be shipped to Jeju via standard delivery services.',
  'Plan ahead — delivery to Jeju may take 1\u20133 extra days compared to the mainland.',
  'Pool orders with other families at the masjid to save on shipping costs.',
]

const PHRASES_INGREDIENTS = [
  { ko: '\uB3FC\uC9C0\uACE0\uAE30\uAC00 \uB4E4\uC5B4\uC788\uB098\uC694?', en: 'Does this contain pork?', ar: '\u0647\u0644 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0644\u062D\u0645 \u0627\u0644\u062E\u0646\u0632\u064A\u0631\u061F' },
  { ko: '\uC220\uC774 \uB4E4\uC5B4\uC788\uB098\uC694?', en: 'Does this contain alcohol?', ar: '\u0647\u0644 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0643\u062D\u0648\u0644\u061F' },
  { ko: '\uD560\uB784 \uC74C\uC2DD\uC774 \uC788\uB098\uC694?', en: 'Do you have halal food?', ar: '\u0647\u0644 \u0644\u062F\u064A\u0643\u0645 \u0637\u0639\u0627\u0645 \u062D\u0644\u0627\u0644\u061F' },
]

const PHRASES_DIET = [
  { ko: '\uC800\uB294 \uBB34\uC2AC\uB9BC\uC774\uC5D0\uC694', en: 'I am Muslim', ar: '\u0623\u0646\u0627 \u0645\u0633\u0644\u0645' },
  { ko: '\uCC44\uC2DD\uC8FC\uC758 \uC74C\uC2DD \uC8FC\uC138\uC694', en: 'Please give me vegetarian food', ar: '\u0645\u0646 \u0641\u0636\u0644\u0643 \u0623\u0639\u0637\u0646\u064A \u0637\u0639\u0627\u0645\u0627\u064B \u0646\u0628\u0627\u062A\u064A\u0627\u064B' },
  { ko: '\uD574\uC0B0\uBB3C\uC740 \uAD1C\uCC2E\uC544\uC694', en: 'Seafood is okay', ar: '\u0627\u0644\u0645\u0623\u0643\u0648\u0644\u0627\u062A \u0627\u0644\u0628\u062D\u0631\u064A\u0629 \u0645\u0642\u0628\u0648\u0644\u0629' },
]

export default function HalalFoodPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHeader
        eyebrow="Halal Food Guide"
        title="Eating halal in Jeju"
        description="A practical guide for brothers and sisters living in or visiting Jeju. A few halal-friendly restaurants operate on the island, but there is no dedicated halal grocery store yet — so the tips below are what our community relies on, insha'Allah."
        action={{ label: 'Contact us', href: '/contact' }}
      />

      {/* Heads-up banner */}
      <section className="bg-white pt-10 sm:pt-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 rounded-2xl border border-islamic-gold/25 bg-islamic-gold/5 p-5 sm:p-6">
            <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-gold/20 text-islamic-gold-dark">
              <ExclamationTriangleIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-islamic-navy sm:text-base">
                A few halal restaurants · no halal grocery store yet
              </p>
              <p className="mt-1 text-sm leading-relaxed text-islamic-navy/70 sm:text-base">
                There are a small number of halal-friendly restaurants scattered around
                the island, but no dedicated halal grocery store. Most of our community
                orders halal meat online from the mainland and shops carefully at
                regular supermarkets using the checks below. For up-to-date
                recommendations, please ask at the masjid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* General guides */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl sm:mb-10">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              General Guides
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-islamic-navy sm:text-3xl">
              What to check for
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {GUIDES.map((g) => (
              <article
                key={g.title}
                className="flex flex-col rounded-2xl border border-islamic-navy/8 bg-white p-6 transition hover:-translate-y-0.5 hover:border-islamic-green/30 hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                  <g.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-islamic-navy sm:text-lg">
                  {g.title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-islamic-navy/70">
                  {g.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-islamic-green" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ordering halal online */}
      <section className="bg-islamic-cream py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green/15 text-islamic-green">
              <TruckIcon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-islamic-navy sm:text-3xl">
                Ordering halal meat online
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-islamic-navy/75 sm:text-base">
                {ONLINE_TIPS.map((tip) => (
                  <li key={tip} className="flex gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-islamic-green" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Korean phrases */}
      <section className="bg-islamic-navy py-14 text-white sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-10">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-gold">
              <span className="h-px w-8 bg-islamic-gold" />
              Useful Korean phrases
              <span className="h-px w-8 bg-islamic-gold" />
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Ask before you order
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-bold text-islamic-gold">
                Asking about ingredients
              </h3>
              <ul className="space-y-4">
                {PHRASES_INGREDIENTS.map((p) => (
                  <li key={p.en}>
                    <p className="font-semibold">{p.ko}</p>
                    <p className="text-sm text-islamic-cream/85">{p.en}</p>
                    <p className="font-arabic-modern arabic-features text-sm text-islamic-cream/70">
                      {p.ar}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-bold text-islamic-gold">
                Dietary restrictions
              </h3>
              <ul className="space-y-4">
                {PHRASES_DIET.map((p) => (
                  <li key={p.en}>
                    <p className="font-semibold">{p.ko}</p>
                    <p className="text-sm text-islamic-cream/85">{p.en}</p>
                    <p className="font-arabic-modern arabic-features text-sm text-islamic-cream/70">
                      {p.ar}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Not sure? Contact us */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-5 rounded-2xl bg-islamic-cream-light p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green text-white">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-bold text-islamic-navy sm:text-lg">
                  Not sure about a product?
                </p>
                <p className="mt-1 text-sm text-islamic-navy/70 sm:text-base">
                  Send us a photo of the label or ingredient list — we&apos;ll do our best
                  to help, insha&apos;Allah.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-islamic-green px-6 py-3 text-sm font-semibold text-white shadow-md shadow-islamic-green/25 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark sm:text-base"
            >
              Contact us
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Share recommendations */}
      <section className="bg-islamic-green py-14 text-white sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
          </span>
          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
            Found something halal-friendly?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-islamic-cream/90 sm:text-lg">
            If you discover a certified product, a reliable restaurant with vegetarian
            or seafood options, or a trustworthy online halal supplier — share it with
            the community so we can all benefit.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-islamic-gold px-6 py-3 text-sm font-bold text-islamic-navy transition hover:-translate-y-0.5 hover:bg-islamic-gold-dark sm:text-base"
          >
            Share a recommendation
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
