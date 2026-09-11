import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import VisitRequestForm from '@/components/VisitRequestForm'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import {
  MASJID_ADDRESS_EN_LINES,
  MASJID_ADDRESS_KO,
  MASJID_MAPS,
  MASJID_PHONES,
  MASJID_WHATSAPP,
} from '@/lib/constants/masjidLocation'
import { pageMetadata } from '@/lib/seo/pageMetadata'
import { VISIT_NOTICE_DAYS } from '@/lib/constants/visits'

export const metadata = pageMetadata({
  title: 'Book a Visit',
  description:
    'Visit Jeju Central Masjid on Jeju Island — book a free guided visit and someone will welcome you, show you around and answer your questions. Non-Muslim visitors, travellers, schools and groups are all welcome.',
  path: '/visit',
  image: { url: '/assets/mosque-1.jpg', width: 1600, height: 900, alt: 'The prayer hall at Jeju Central Masjid' },
})

// A real sequence, so the steps are numbered.
const STEPS = [
  { title: 'Send a request', text: 'Tell us when you would like to come and how many people.' },
  { title: 'We confirm by email', text: 'Usually within 1–2 days, with the time and who will meet you.' },
  { title: 'Someone welcomes you', text: 'A member of the community shows you around and answers questions.' },
]

const GOOD_TO_KNOW = [
  'Visits are free.',
  `Book at least ${VISIT_NOTICE_DAYS} days ahead. Schools and groups, please book 1–2 weeks ahead.`,
  'The masjid is on the 2nd floor, reached by stairs only (there is no lift). Let us know if anyone needs help.',
  'Please remove your shoes at the entrance.',
  'Please wear clothing that covers shoulders and knees (no shorts or sleeveless tops). Sisters may wish to bring a headscarf.',
  'There are separate spaces for brothers and sisters.',
  "Photos of the masjid are welcome, but please don't photograph people while they pray, and ask before photographing anyone.",
  'Friday 13:05–14:00 is Jummah prayer. Choose another time for a guided visit, or come and watch quietly.',
  'If your plans change, please let us know. Our volunteers set time aside for you.',
]

// Shown on the page and mirrored in the FAQPage structured data below.
const VISIT_FAQ = [
  {
    q: 'Do I need to be Muslim to visit?',
    a: 'No. Everyone is welcome, whatever your faith. Nobody will ask you to pray or take part in anything.',
  },
  {
    q: 'What happens during a visit?',
    a: 'Someone from the community welcomes you, shows you the prayer hall, the wudu (washing) area and our multilingual library, and answers your questions.',
  },
  {
    q: 'Can I ask anything?',
    a: 'Yes — about Islam, prayer, fasting, halal food or life as a Muslim in Jeju. No question is too basic.',
  },
  {
    q: 'Can children and school groups come?',
    a: 'Yes. Children are welcome with an adult. Schools and groups, please book 1–2 weeks ahead and tell us the number of students and teachers.',
  },
  {
    q: 'Can I visit without booking?',
    a: 'Yes — the doors are open for prayer around the clock. Without a booking, though, there may be no one there to show you around.',
  },
  {
    q: 'How will I know my visit is confirmed?',
    a: "We email you once a volunteer is arranged, usually within 1–2 days. If you haven't heard from us by then, call or message us.",
  },
  { q: 'Is there a cost?', a: 'No, visits are free.' },
]

const SITE = 'https://jejucentralmasjid.kr'

const visitJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE}/visit#page`,
      url: `${SITE}/visit`,
      name: 'Book a visit to Jeju Central Masjid',
      inLanguage: 'en',
      about: { '@id': `${SITE}/#masjid` },
      potentialAction: {
        '@type': 'ReserveAction',
        name: 'Book a guided visit',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE}/visit`, inLanguage: 'en' },
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE}/visit#faq`,
      mainEntity: VISIT_FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbJsonLd trail={[{ name: 'Book a Visit', path: '/visit' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(visitJsonLd) }}
      />
      <PageHeader
        eyebrow="Book a Visit"
        title="Visit the masjid"
        description="Everyone is welcome, Muslim or not. The masjid isn't always staffed, so book your visit and someone will be there to welcome you, show you around and answer your questions."
      />

      {/* How it works */}
      <section className="border-b border-islamic-navy/8 py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">How booking works</h2>
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-islamic-green text-base font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-base font-bold text-islamic-navy">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-islamic-navy/70">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Form + practical details */}
      <section className="bg-islamic-cream-light py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold leading-tight text-islamic-navy sm:text-3xl">Request a visit</h2>
              <div className="mt-8 rounded-2xl border border-islamic-navy/8 bg-white p-5 shadow-sm sm:p-8">
                <VisitRequestForm />
              </div>
            </div>

            <aside className="lg:col-span-2">
              <div className="space-y-5 lg:sticky lg:top-28">
                <div className="rounded-2xl border border-islamic-navy/8 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-islamic-navy">Good to know</h2>
                  <ul className="mt-4 space-y-3.5">
                    {GOOD_TO_KNOW.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-islamic-gold" />
                        <span className="text-sm leading-relaxed text-islamic-navy">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-islamic-navy/8 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-islamic-navy">Where we are</h2>
                  <p className="mt-2 text-sm leading-relaxed text-islamic-navy">
                    {MASJID_ADDRESS_EN_LINES[0]}
                    <br />
                    {MASJID_ADDRESS_EN_LINES[1]}, {MASJID_ADDRESS_EN_LINES[2]}
                  </p>
                  <p lang="ko" className="mt-1 text-sm text-islamic-navy/70">
                    {MASJID_ADDRESS_KO}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={MASJID_MAPS.kakao}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#FEE500] px-3.5 py-2 text-sm font-bold text-[#3C1E1E] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Kakao Map
                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={MASJID_MAPS.naver}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#03C75A] px-3.5 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Naver Map
                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={MASJID_MAPS.google}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-[#4285F4] px-3.5 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      Google Maps
                      <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-islamic-navy/8 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-islamic-navy">
                    Visiting in the next {VISIT_NOTICE_DAYS} days?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-islamic-navy/70">
                    Call or message us on WhatsApp or KakaoTalk so we can arrange someone quickly.
                  </p>
                  <div className="mt-3 flex flex-col">
                    {MASJID_PHONES.map((p) => (
                      <a
                        key={p.tel}
                        href={`tel:${p.tel}`}
                        className="py-1 text-base font-semibold text-islamic-navy hover:text-islamic-green"
                      >
                        {p.display}
                      </a>
                    ))}
                    <a
                      href={MASJID_WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm font-semibold text-islamic-green hover:text-islamic-green-dark"
                    >
                      Message on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Visit questions */}
      <section aria-labelledby="visit-faq-heading" className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="visit-faq-heading" className="text-2xl font-bold leading-tight text-islamic-navy sm:text-3xl">
            Questions about visiting
          </h2>
          <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
            {VISIT_FAQ.map((f) => (
              <div key={f.q} className="border-t border-islamic-navy/10 pt-5">
                <dt className="text-base font-bold text-islamic-navy">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-islamic-navy/80">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-sm text-islamic-navy/70">
            More questions about prayer times, facilities or donations?{' '}
            <Link href="/faq" className="font-semibold text-islamic-green hover:text-islamic-green-dark">
              See the full FAQ
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
