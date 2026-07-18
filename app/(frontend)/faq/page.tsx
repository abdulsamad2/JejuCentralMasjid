import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { MASJID_ADDRESS_EN, MASJID_ADDRESS_KO } from '@/lib/constants/masjidLocation'

export const metadata = {
  title: 'FAQ — Visiting, Prayers & Donations',
  description:
    'Frequently asked questions about Jeju Central Masjid — visiting hours, Jummah times, what to wear, facilities for sisters, donations, halal food on Jeju, and how to get in touch.',
}

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Can non-Muslims visit the masjid?',
    a: 'Yes — everyone is welcome, Muslims and non-Muslims, residents and travelers. Come during any prayer time or message us first if you would like someone to show you around and answer questions.',
  },
  {
    q: 'When is Jummah (Friday prayer)?',
    a: 'Jummah is held every Friday in the early afternoon, with the khutbah beginning around 13:15. Times can shift slightly with the season, so please check the prayer times on our homepage before you come, and arrive a few minutes early to find a place.',
  },
  {
    q: 'Is the masjid open every day?',
    a: 'Yes — our doors are open 24/7 for all five daily prayers. The masjid is a rented space on the 2nd floor, and there is always a way in for prayer.',
  },
  {
    q: 'Is there a separate space for sisters?',
    a: 'Yes. The masjid has separate prayer spaces for brothers and sisters, and families are always welcome.',
  },
  {
    q: 'What should I wear when visiting?',
    a: 'Modest, comfortable clothing is appreciated — covering shoulders and knees. Sisters may wish to bring a headscarf. Shoes are removed at the entrance. If you forget anything, don’t worry — just come, and we will help.',
  },
  {
    q: 'Where exactly is the masjid?',
    a: `We are at ${MASJID_ADDRESS_EN} (${MASJID_ADDRESS_KO}). The easiest way to navigate is with the Kakao Map or Naver Map buttons on our contact page.`,
  },
  {
    q: 'How can I donate?',
    a: 'By bank transfer to our NH NongHyup Bank account 317-0031-1483-91 (account name: 제주중앙마스지드 / Jeju Central Masjid). Please write "Sadaqah", "Masjid", or "Zakat" in the transfer memo, and email us your confirmation if you would like a receipt. Full details are on the Donate page.',
  },
  {
    q: 'Is there halal food on Jeju Island?',
    a: 'Options are limited but growing — a few restaurants serve halal or Muslim-friendly food, and seafood and vegetarian dishes are widely available. Message us on WhatsApp or KakaoTalk and we will gladly share current recommendations near where you are staying.',
  },
  {
    q: 'I’m interested in Islam or want to become Muslim. Can you help?',
    a: 'Alhamdulillah — yes, warmly. Visit us at the masjid or reach out through the contact page. We can answer questions in a relaxed, no-pressure setting, provide books from our multilingual library, and support you at whatever pace is right for you.',
  },
  {
    q: 'How do I join an event or iftar?',
    a: 'No registration forms — just message or call us via WhatsApp, KakaoTalk, or the contact page and tell us you’re coming, and we will save you a spot, insha’Allah.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <PageHeader
        eyebrow="Questions & Answers"
        title="Frequently asked questions"
        description="Everything visitors usually ask about the masjid — and if your question isn't here, just message us."
        action={{ label: 'Contact us', href: '/contact' }}
      />

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-islamic-navy/8 bg-white shadow-sm open:border-islamic-green/30"
              >
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-bold text-islamic-navy transition hover:text-islamic-green sm:px-6 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDownIcon className="h-5 w-5 flex-shrink-0 text-islamic-navy/40 transition group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-islamic-navy/75 sm:px-6 sm:text-base">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-dashed border-islamic-navy/15 bg-islamic-cream-light p-8 text-center">
            <p className="text-base font-semibold text-islamic-navy">Still have a question?</p>
            <p className="mt-1 text-sm text-islamic-navy/65">
              We answer quickly on WhatsApp and KakaoTalk.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-islamic-green px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-islamic-green/25 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark"
            >
              Get in touch
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
