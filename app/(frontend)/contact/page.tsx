'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import EmailLink from '@/components/EmailLink'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  UserGroupIcon,
  HomeIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'
import {
  MASJID_ADDRESS_EN_LINES,
  MASJID_ADDRESS_KO,
  MASJID_MAPS,
  MASJID_PHONES,
} from '@/lib/constants/masjidLocation'

const INQUIRIES = [
  'General',
  'New Muslim',
  'Ask the Imam',
  'Marriage Guidance',
  'Halal Guidance',
  'Library',
  'Mosque Tour',
  'Volunteering',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiry: 'General',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [startedAt] = useState(() => Date.now())

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting || submitted) return
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: honeypot, startedAt }),
      })
      if (!res.ok && res.status !== 204) throw new Error(`Request failed (${res.status})`)
      setSubmitted(true)
    } catch {
      setSubmitError(
        'Sorry, your message could not be sent. Please try again, or email us directly.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <BreadcrumbJsonLd trail={[{ name: 'Contact', path: '/contact' }]} />

      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Jeju Central Masjid"
        description="A small, welcoming community mosque on Jeju Island. Reach out with questions, visit us for prayer, or explore our library."
        action={{
          label: 'Open in Maps',
          href: MASJID_MAPS.google,
        }}
      />

      {/* Primary contact cards */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="rounded-2xl border border-islamic-navy/8 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <MapPinIcon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-islamic-navy/55">
                Address
              </p>
              <p className="mt-2 text-sm leading-relaxed text-islamic-navy">
                {MASJID_ADDRESS_EN_LINES[0]}
                <br />
                {MASJID_ADDRESS_EN_LINES[1]}, {MASJID_ADDRESS_EN_LINES[2]}
              </p>
              <p className="mt-1 text-sm text-islamic-navy/65">{MASJID_ADDRESS_KO}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={MASJID_MAPS.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#4285F4] px-3.5 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Google Maps
                  <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href={MASJID_MAPS.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#FEE500] px-3.5 py-2 text-sm font-bold text-[#3C1E1E] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Kakao Map
                  <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href={MASJID_MAPS.naver}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#03C75A] px-3.5 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Naver Map
                  <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-islamic-navy/8 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <PhoneIcon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-islamic-navy/55">
                Phone
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {MASJID_PHONES.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    className="block text-base font-semibold text-islamic-navy hover:text-islamic-green"
                  >
                    {p.display}
                  </a>
                ))}
              </div>
              <p className="mt-2 text-sm text-islamic-navy/60">
                <span className="font-semibold text-islamic-navy">Urgent? Call or message us</span>{' '}
                (WhatsApp / KakaoTalk) — the fastest way to reach us. Calls are best answered
                after prayer times.
              </p>
            </div>

            <div className="rounded-2xl border border-islamic-navy/8 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <EnvelopeIcon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-islamic-navy/55">
                Email
              </p>
              <EmailLink className="mt-2 block text-base font-semibold text-islamic-navy hover:text-islamic-green" />
              <p className="mt-1 text-sm text-islamic-navy/60">
                For non-urgent questions — we reply within 1–2 days, insha&apos;Allah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="bg-islamic-cream py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Visit Us
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-islamic-navy sm:text-3xl">
              What you&apos;ll find inside
            </h2>
            <p className="mt-3 text-base text-islamic-navy/70 sm:text-lg">
              Jeju Central Masjid is a small community mosque currently operating from a rented space on the 2nd floor.
              Everyone is welcome — Muslims and non-Muslims alike.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <div className="rounded-2xl border border-islamic-navy/8 bg-white p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <UserGroupIcon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-islamic-navy">Separate Prayer Areas</h3>
              <p className="mt-2 text-sm leading-relaxed text-islamic-navy/70">
                Dedicated prayer spaces for brothers and sisters, with respectful partitioning and separate entry where possible.
              </p>
            </div>

            <div className="rounded-2xl border border-islamic-navy/8 bg-white p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <BookOpenIcon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-islamic-navy">Small Library</h3>
              <p className="mt-2 text-sm leading-relaxed text-islamic-navy/70">
                A modest collection of Islamic books in <span className="font-semibold text-islamic-navy">Korean, Urdu, and English</span> — free to read on-site or borrow.
              </p>
            </div>

            <div className="rounded-2xl border border-islamic-navy/8 bg-white p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                <HomeIcon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-islamic-navy">A Rented Home, for Now</h3>
              <p className="mt-2 text-sm leading-relaxed text-islamic-navy/70">
                We currently rent our building. Please support our fundraising to secure a permanent masjid — every contribution helps, insha&apos;Allah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + side panel */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
                <span className="h-px w-8 bg-islamic-green" />
                Send a Message
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-islamic-navy sm:text-3xl">
                Get in touch
              </h2>
              <p className="mt-3 text-base text-islamic-navy/70">
                Tell us what you need and we&apos;ll reply as soon as we can.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-islamic-navy">
                        Full name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-islamic-navy/15 bg-white px-4 py-3 text-sm text-islamic-navy placeholder:text-islamic-navy/40 focus:border-islamic-green focus:outline-none focus:ring-2 focus:ring-islamic-green/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-islamic-navy">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-islamic-navy/15 bg-white px-4 py-3 text-sm text-islamic-navy placeholder:text-islamic-navy/40 focus:border-islamic-green focus:outline-none focus:ring-2 focus:ring-islamic-green/20"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-islamic-navy">
                        Phone <span className="font-normal text-islamic-navy/50">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-islamic-navy/15 bg-white px-4 py-3 text-sm text-islamic-navy placeholder:text-islamic-navy/40 focus:border-islamic-green focus:outline-none focus:ring-2 focus:ring-islamic-green/20"
                        placeholder="+82 10 1234 5678"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry" className="mb-1.5 block text-sm font-semibold text-islamic-navy">
                        Inquiry
                      </label>
                      <select
                        id="inquiry"
                        name="inquiry"
                        value={formData.inquiry}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-islamic-navy/15 bg-white px-4 py-3 text-sm text-islamic-navy focus:border-islamic-green focus:outline-none focus:ring-2 focus:ring-islamic-green/20"
                      >
                        {INQUIRIES.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-islamic-navy">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-islamic-navy/15 bg-white px-4 py-3 text-sm text-islamic-navy placeholder:text-islamic-navy/40 focus:border-islamic-green focus:outline-none focus:ring-2 focus:ring-islamic-green/20"
                      placeholder="Brief subject"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-islamic-navy">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full resize-none rounded-xl border border-islamic-navy/15 bg-white px-4 py-3 text-sm text-islamic-navy placeholder:text-islamic-navy/40 focus:border-islamic-green focus:outline-none focus:ring-2 focus:ring-islamic-green/20"
                      placeholder="Let us know how we can help..."
                    />
                  </div>

                  {/* Honeypot — humans never see or fill this */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  {submitError && (
                    <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-islamic-green px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-md shadow-islamic-green/25 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark disabled:cursor-not-allowed disabled:bg-islamic-navy/30 disabled:hover:translate-y-0 sm:w-auto sm:text-base"
                  >
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              ) : (
                <div className="mt-8 rounded-2xl border border-islamic-green/20 bg-islamic-green/5 p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-islamic-green/15 text-islamic-green">
                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-islamic-navy">Jazak&apos;Allah khair!</h3>
                  <p className="mt-2 text-islamic-navy/70">
                    Your message has been received. We&apos;ll get back to you soon, insha&apos;Allah.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '', inquiry: 'General' })
                    }}
                    className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>

            {/* Side panel */}
            <aside className="lg:col-span-2">
              <div className="sticky top-24 space-y-5">
                <div className="overflow-hidden rounded-2xl border border-islamic-navy/8 bg-white shadow-sm">
                  <div className="aspect-[4/3] w-full bg-islamic-navy">
                    <iframe
                      src={`https://www.google.com/maps?q=${encodeURIComponent(MASJID_ADDRESS_KO)}&z=17&output=embed`}
                      className="h-full w-full border-0"
                      loading="lazy"
                      title={`Jeju Central Masjid · ${MASJID_ADDRESS_KO}`}
                    />
                  </div>
                  {/* Kakao Map CTA pinned right under the map */}
                  <a
                    href={MASJID_MAPS.kakao}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#FEE500] px-4 py-3 text-sm font-bold text-[#3C1E1E] transition hover:bg-[#FFD700]"
                  >
                    Open in Kakao Map
                    <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                  </a>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-islamic-navy/55">
                      Find Us
                    </p>
                    <p className="mt-2 text-sm text-islamic-navy/80">
                      {MASJID_ADDRESS_EN_LINES[0]} · {MASJID_ADDRESS_EN_LINES[1]}
                    </p>
                    <p className="mt-1 text-xs text-islamic-navy/60">{MASJID_ADDRESS_KO}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <a
                        href={MASJID_MAPS.google}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl bg-[#4285F4] px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        Google Maps
                        <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={MASJID_MAPS.naver}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl bg-[#03C75A] px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        Naver Map
                        <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bank transfer card */}
                <div className="rounded-2xl border border-islamic-gold/30 bg-gradient-to-br from-islamic-cream-light to-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-islamic-gold/15 text-islamic-gold-dark">
                      <BanknotesIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-islamic-gold-dark">
                        Donate via Bank Transfer
                      </p>
                      <p className="text-sm font-semibold text-islamic-navy">Korean Won (KRW)</p>
                    </div>
                  </div>
                  <dl className="mt-4 space-y-2.5 text-sm">
                    <div className="flex items-start justify-between gap-3 border-b border-islamic-navy/8 pb-2.5">
                      <dt className="text-islamic-navy/60">Bank</dt>
                      <dd className="text-right font-semibold text-islamic-navy">
                        NH NongHyup Bank <span className="text-islamic-navy/60">(농협은행)</span>
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-3 border-b border-islamic-navy/8 pb-2.5">
                      <dt className="text-islamic-navy/60">Account name</dt>
                      <dd className="text-right font-semibold text-islamic-navy">
                        제주중앙마스지드 <span className="text-islamic-navy/60">(Jeju Central Masjid)</span>
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-islamic-navy/60">Account number</dt>
                      <dd className="text-right font-mono font-semibold text-islamic-navy">317-0031-1483-91</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-xs leading-relaxed text-islamic-navy/60">
                    Please include &quot;Sadaqah&quot;, &quot;Masjid&quot; or &quot;Zakat&quot; in the transfer memo. For a receipt, email us the confirmation.
                  </p>
                  <Link
                    href="/donate"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-islamic-green hover:text-islamic-green-dark"
                  >
                    More ways to donate
                    <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
