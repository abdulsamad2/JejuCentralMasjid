import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import VisitRequestForm from '@/components/VisitRequestForm'
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

const requestButton =
  'inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-islamic-green px-8 py-3 text-base font-bold text-white shadow-md shadow-islamic-green/25 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark sm:w-auto'

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbJsonLd trail={[{ name: 'Book a Visit', path: '/visit' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(visitJsonLd) }}
      />

      {/* Intro and form together, so on a phone the form starts on the first screen. */}
      <section className="border-b border-islamic-navy/8 bg-gradient-to-b from-islamic-cream-light to-islamic-cream">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8 lg:pb-16 lg:pt-14">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
                <span className="h-px w-8 bg-islamic-green" />
                Book a Visit
              </p>
              <h1 className="mt-2 text-3xl font-bold leading-tight text-islamic-navy sm:mt-3 sm:text-4xl lg:text-5xl">
                Visit the masjid
              </h1>
              <p className="mt-3 text-base leading-relaxed text-islamic-navy/75 sm:text-lg">
                Free guided visits for everyone, Muslim or not. Tell us when you&apos;d like to come and someone
                will be there to welcome you.
              </p>

              {/* Beside the form on large screens; phones get these below the form. */}
              <div className="hidden lg:block">
                <HowItWorks className="mt-10" />
              </div>
            </div>

            <div id="request" className="scroll-mt-24 lg:col-span-7 lg:scroll-mt-28">
              <div className="rounded-2xl border border-islamic-navy/8 bg-white p-4 shadow-sm sm:p-8">
                <h2 className="sr-only">Request a visit</h2>
                <VisitRequestForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical details */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-8">
            <div className="rounded-2xl border border-islamic-navy/8 bg-white p-5 shadow-sm sm:p-6 lg:hidden">
              <HowItWorks />
            </div>

            <div className="rounded-2xl border border-islamic-navy/8 bg-white p-5 shadow-sm sm:p-6 lg:col-span-3">
              <h2 className="text-lg font-bold text-islamic-navy">Good to know</h2>
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3.5 md:grid-cols-2">
                {GOOD_TO_KNOW.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-islamic-gold" />
                    <span className="text-sm leading-relaxed text-islamic-navy">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 lg:col-span-2">
              <div className="rounded-2xl border border-islamic-navy/8 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-bold text-islamic-navy">Where we are</h2>
                <p className="mt-2 text-sm leading-relaxed text-islamic-navy">
                  {MASJID_ADDRESS_EN_LINES[0]}
                  <br />
                  {MASJID_ADDRESS_EN_LINES[1]}, {MASJID_ADDRESS_EN_LINES[2]}
                </p>
                <p lang="ko" className="mt-1 text-sm text-islamic-navy/70">
                  {MASJID_ADDRESS_KO}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <a
                    href={MASJID_MAPS.kakao}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#FEE500] px-2 py-2 text-sm font-bold text-[#3C1E1E] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    Kakao
                  </a>
                  <a
                    href={MASJID_MAPS.naver}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#03C75A] px-2 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    Naver
                  </a>
                  <a
                    href={MASJID_MAPS.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#4285F4] px-2 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    Google
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-islamic-navy/8 bg-white p-5 shadow-sm sm:p-6">
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
                      className="flex min-h-[44px] items-center text-base font-semibold text-islamic-navy hover:text-islamic-green"
                    >
                      {p.display}
                    </a>
                  ))}
                  <a
                    href={MASJID_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center text-sm font-semibold text-islamic-green hover:text-islamic-green-dark"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit questions */}
      <section aria-labelledby="visit-faq-heading" className="bg-islamic-cream-light py-12 sm:py-16">
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

          {/* Readers who scrolled this far get straight back to the form. */}
          <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
            <p className="text-lg font-bold text-islamic-navy">Ready to visit?</p>
            <a href="#request" className={requestButton}>
              Request a visit
            </a>
            <p className="text-sm text-islamic-navy/70">
              More questions about prayer times, facilities or donations?{' '}
              <Link href="/faq" className="font-semibold text-islamic-green hover:text-islamic-green-dark">
                See the full FAQ
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function HowItWorks({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <h2 className="text-lg font-bold text-islamic-navy">How it works</h2>
      <ol className="mt-4 space-y-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-3.5">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-islamic-green/10 text-sm font-bold text-islamic-green">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-bold text-islamic-navy">{step.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-islamic-navy/70">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
