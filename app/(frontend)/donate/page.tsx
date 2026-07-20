'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import {
  HomeIcon,
  HeartIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

const BANK_ACCOUNT = '317-0031-1483-91'

const IMPACTS = [
  { amount: '₩20,000', note: 'Helps provide prayer mats, Qur\u2019ans and daily supplies' },
  { amount: '₩50,000', note: 'Helps cover the masjid\u2019s rent and utilities' },
  { amount: '₩100,000', note: 'Supports library books and community programs' },
  { amount: '₩500,000', note: 'Helps sponsor a community iftar' },
]

export default function DonatePage() {
  const [copied, setCopied] = useState(false)

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(BANK_ACCOUNT)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* noop */
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHeader
        eyebrow="Support Our Masjid"
        title="Help build a permanent home"
        description="Jeju Central Masjid is a small, volunteer-run community mosque in a rented space. Every sadaqah brings us closer to a permanent masjid, insha'Allah."
      />

      {/* Bank transfer — primary way to donate */}
      <section className="py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1">
            {/* Korean bank transfer */}
            <div>
              <div className="h-full rounded-3xl border border-islamic-gold/30 bg-gradient-to-br from-islamic-cream-light to-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-gold/15 text-islamic-gold-dark">
                      <BanknotesIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-islamic-gold-dark">
                        Bank Transfer · KRW
                      </p>
                      <p className="text-sm font-semibold text-islamic-navy">Korean account</p>
                    </div>
                  </div>
                  <span className="hidden items-center gap-1 rounded-full bg-islamic-green/10 px-3 py-1 text-xs font-semibold text-islamic-green sm:inline-flex">
                    <ShieldCheckIcon className="h-3.5 w-3.5" />
                    Direct to masjid
                  </span>
                </div>

                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-3 border-b border-islamic-navy/8 pb-3">
                    <dt className="text-islamic-navy/60">Bank</dt>
                    <dd className="text-right font-semibold text-islamic-navy">
                      NH NongHyup Bank <span className="text-islamic-navy/60">(농협은행)</span>
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-islamic-navy/8 pb-3">
                    <dt className="text-islamic-navy/60">Account name</dt>
                    <dd className="text-right font-semibold text-islamic-navy">
                      제주중앙마스지드 <span className="text-islamic-navy/60">(Jeju Central Masjid)</span>
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-islamic-navy/60">Account no.</dt>
                    <dd className="text-right font-mono font-semibold text-islamic-navy">{BANK_ACCOUNT}</dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={copyAccount}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-islamic-navy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-islamic-navy-dark"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <ClipboardDocumentIcon className="h-4 w-4" />
                      Copy account number
                    </>
                  )}
                </button>

                <p className="mt-4 rounded-xl bg-white p-3 text-xs leading-relaxed text-islamic-navy/65 ring-1 ring-islamic-navy/5">
                  Please include <span className="font-semibold text-islamic-navy">&quot;Sadaqah&quot;</span>,{' '}
                  <span className="font-semibold text-islamic-navy">&quot;Masjid&quot;</span> or{' '}
                  <span className="font-semibold text-islamic-navy">&quot;Zakat&quot;</span> in the transfer memo. Email your confirmation to{' '}
                  <a href="mailto:info@jejucentralmasjid.kr" className="font-semibold text-islamic-green hover:text-islamic-green-dark">
                    info@jejucentralmasjid.kr
                  </a>{' '}
                  for a receipt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="bg-islamic-cream py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
                <span className="h-px w-8 bg-islamic-green" />
                Where It Goes
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-islamic-navy sm:text-3xl">
                Three ways your donation helps
              </h2>
              <p className="mt-3 text-base text-islamic-navy/70 sm:text-lg">
                Write your intention in the transfer memo — every KRW is used with care and amanah.
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-4 rounded-2xl border border-islamic-navy/8 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                    <HomeIcon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-islamic-navy sm:text-lg">Permanent Masjid Building</h3>
                    <p className="mt-1 text-sm text-islamic-navy/65">
                      A long-term fund to acquire and build a dedicated masjid with purpose-built prayer spaces.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 rounded-2xl border border-islamic-navy/8 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                    <HeartIcon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-islamic-navy sm:text-lg">Sadaqah &amp; Day-to-Day</h3>
                    <p className="mt-1 text-sm text-islamic-navy/65">
                      Rent, utilities, library books, prayer mats, Qur&apos;an copies, and community iftars.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4 rounded-2xl border border-islamic-navy/8 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
                    <BanknotesIcon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-islamic-navy sm:text-lg">Zakat</h3>
                    <p className="mt-1 text-sm text-islamic-navy/65">
                      Distributed to eligible recipients under qualified supervision, according to shari&apos;ah.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Your Impact
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-islamic-navy sm:text-3xl">
              How your donation helps
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {IMPACTS.map((i) => (
              <div
                key={i.amount}
                className="rounded-2xl border border-islamic-navy/8 bg-white p-5 text-center transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
              >
                <p className="text-2xl font-extrabold text-islamic-green sm:text-3xl">{i.amount}</p>
                <p className="mt-2 text-sm leading-snug text-islamic-navy/70">{i.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qur'an ayah band — softer than old navy block */}
      <section className="bg-islamic-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <p className="font-arabic-display arabic-features-fancy text-2xl leading-loose text-islamic-navy sm:text-4xl">
            وَمَا تُنفِقُوا مِنْ خَيْرٍ فَلِأَنفُسِكُمْ
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm italic text-islamic-navy/70 sm:text-base">
            &ldquo;And whatever good you spend is for yourselves.&rdquo;
            <span className="ml-2 text-islamic-green">— Qur&apos;an 2:272</span>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
