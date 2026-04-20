import Link from 'next/link'
import {
  CheckBadgeIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

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
      'Pork, lard, bacon, ham (돼지, 베이컨)',
      'Alcohol, wine, mirin, rum extract',
      'Gelatin & rennet (unless halal-certified)',
    ],
  },
  {
    icon: MagnifyingGlassIcon,
    title: 'Read labels carefully',
    points: [
      'Sauces & broths often contain pork stock',
      '"Natural flavor" can hide non-halal sources',
      'Processed meat is usually not halal',
    ],
  },
  {
    icon: ShoppingBagIcon,
    title: 'Safer choices locally',
    points: [
      'Fresh fish, seafood, eggs, dairy',
      'Fruits, vegetables, rice, grains',
      'Order halal meat online for delivery',
    ],
  },
]

export default function HalalFoodSection() {
  return (
    <section
      aria-labelledby="halal-food-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl sm:mb-12">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
            <span className="h-px w-8 bg-islamic-green" />
            Halal Food Guide
          </p>
          <h2
            id="halal-food-heading"
            className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl"
          >
            Eating halal in Jeju
          </h2>
          <p className="mt-4 text-base leading-relaxed text-islamic-navy/70 sm:text-lg">
            There is no dedicated halal grocery store on Jeju Island yet. Until there is,
            here are some general guides to help you shop and eat with confidence,
            insha&apos;Allah.
          </p>
        </div>

        {/* Heads-up banner */}
        <div className="mb-8 flex items-start gap-4 rounded-2xl border border-islamic-gold/25 bg-islamic-gold/5 p-5 sm:p-6">
          <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-gold/20 text-islamic-gold-dark">
            <ExclamationTriangleIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-islamic-navy sm:text-base">
              No halal grocery store on Jeju
            </p>
            <p className="mt-1 text-sm leading-relaxed text-islamic-navy/70 sm:text-base">
              Most brothers and sisters buy halal meat online from the mainland and rely on
              vegetarian, seafood, and certified packaged goods from regular supermarkets.
            </p>
          </div>
        </div>

        {/* Guide grid */}
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

        {/* Still unsure? */}
        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-islamic-cream-light p-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green text-white">
              <PhoneIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-bold text-islamic-navy sm:text-lg">
                Not sure about a product?
              </p>
              <p className="mt-1 text-sm text-islamic-navy/70 sm:text-base">
                Send us a photo of the label — we&apos;ll do our best to help, insha&apos;Allah.
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
  )
}
