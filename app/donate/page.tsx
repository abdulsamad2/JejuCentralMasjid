'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import MonthlyFinanceSummary from '../../components/MonthlyFinanceSummary'
import {
  HomeIcon,
  HeartIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'

const DESIGNATIONS = [
  {
    id: 'masjid',
    label: 'Masjid Building',
    desc: 'Permanent home fund',
  },
  {
    id: 'sadaqah',
    label: 'Sadaqah',
    desc: 'Rent, utilities, day-to-day',
  },
  {
    id: 'zakat',
    label: 'Zakat',
    desc: 'Distributed to those in need',
  },
]

const PRESETS = [20000, 50000, 100000, 250000, 500000]

const IMPACTS = [
  { amount: '₩20,000', note: 'A week of prayer mats & Qur\u2019an care' },
  { amount: '₩50,000', note: 'One day of rent contribution' },
  { amount: '₩100,000', note: 'Library books in Korean / Urdu / English' },
  { amount: '₩500,000', note: 'Fully sponsors a community iftar' },
]

export default function DonatePage() {
  const [designation, setDesignation] = useState<string>('masjid')
  const [amount, setAmount] = useState<string>('')
  const [isRecurring, setIsRecurring] = useState(false)
  const [copied, setCopied] = useState(false)

  const progress = 35
  const raised = '280,000,000'
  const goal = '800,000,000'

  const displayAmount = amount ? parseInt(amount).toLocaleString() : '0'

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText('XXX-XXXX-XXXX-XX')
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

      {/* Progress + quick-donate split */}
      <section className="py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
            {/* Progress card */}
            <div className="lg:col-span-2">
              <div className="h-full rounded-3xl border border-islamic-navy/8 bg-gradient-to-br from-islamic-cream-light to-white p-6 shadow-sm sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-islamic-green">
                  Building Fund
                </p>
                <p className="mt-4 text-5xl font-extrabold leading-none text-islamic-navy sm:text-6xl">
                  {progress}%
                </p>
                <p className="mt-2 text-sm text-islamic-navy/65">
                  <span className="font-semibold text-islamic-navy">₩{raised}</span> raised of ₩{goal} goal
                </p>
                <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-islamic-navy/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-islamic-green to-islamic-green-light transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-islamic-navy/8 pt-5 text-center">
                  <div className="rounded-xl bg-white p-3 ring-1 ring-islamic-navy/5">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-islamic-navy/55">
                      Raised
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-islamic-navy">₩280M</dd>
                  </div>
                  <div className="rounded-xl bg-white p-3 ring-1 ring-islamic-navy/5">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-islamic-navy/55">
                      Goal
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-islamic-navy">₩800M</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Quick donate card */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-islamic-navy/8 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-islamic-green">
                      Donate Online
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-islamic-navy sm:text-3xl">
                      Give in seconds
                    </h2>
                  </div>
                  <span className="hidden items-center gap-1 rounded-full bg-islamic-green/10 px-3 py-1 text-xs font-semibold text-islamic-green sm:inline-flex">
                    <ShieldCheckIcon className="h-3.5 w-3.5" />
                    Secure
                  </span>
                </div>

                {/* Designation pills */}
                <div className="mt-6">
                  <label className="text-xs font-bold uppercase tracking-[0.14em] text-islamic-navy/60">
                    Designation
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {DESIGNATIONS.map((d) => {
                      const active = designation === d.id
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDesignation(d.id)}
                          className={`rounded-xl border px-3 py-3 text-left transition ${
                            active
                              ? 'border-islamic-green bg-islamic-green text-white shadow-md shadow-islamic-green/20'
                              : 'border-islamic-navy/10 bg-white text-islamic-navy hover:border-islamic-green/40'
                          }`}
                        >
                          <p className={`text-sm font-bold ${active ? 'text-white' : 'text-islamic-navy'}`}>
                            {d.label}
                          </p>
                          <p className={`mt-0.5 text-[11px] leading-tight ${active ? 'text-white/85' : 'text-islamic-navy/55'}`}>
                            {d.desc}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Amount presets */}
                <div className="mt-6">
                  <label className="text-xs font-bold uppercase tracking-[0.14em] text-islamic-navy/60">
                    Amount (KRW)
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {PRESETS.map((p) => {
                      const active = amount === p.toString()
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setAmount(p.toString())}
                          className={`rounded-xl border py-2.5 text-sm font-bold tabular-nums transition ${
                            active
                              ? 'border-islamic-green bg-islamic-green/10 text-islamic-green-dark'
                              : 'border-islamic-navy/10 text-islamic-navy hover:border-islamic-green/40'
                          }`}
                        >
                          ₩{p.toLocaleString()}
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-3 flex items-center rounded-xl border border-islamic-navy/15 bg-white px-4 focus-within:border-islamic-green focus-within:ring-2 focus-within:ring-islamic-green/20">
                    <span className="text-islamic-navy/40">₩</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="Other amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-transparent py-3 pl-2 text-sm text-islamic-navy placeholder:text-islamic-navy/40 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Recurring */}
                <label className="mt-5 flex items-center gap-3 rounded-xl border border-islamic-navy/10 bg-islamic-cream-light p-4">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="h-4 w-4 rounded border-islamic-navy/30 text-islamic-green focus:ring-islamic-green"
                  />
                  <span className="text-sm text-islamic-navy">
                    <span className="font-semibold">Make this monthly</span> — a small recurring
                    sadaqah has lasting reward, insha&apos;Allah.
                  </span>
                </label>

                <button
                  type="button"
                  className="mt-6 inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-md bg-islamic-gold px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-islamic-navy shadow-[0_10px_30px_-10px_rgba(201,162,75,0.55)] transition hover:-translate-y-0.5 hover:bg-islamic-gold-light sm:text-base"
                >
                  Donate ₩{displayAmount} Now
                  <ChevronRightIcon className="h-4 w-4" />
                </button>

                <p className="mt-3 text-center text-[11px] text-islamic-navy/50">
                  Online payments will be processed securely by our provider. Prefer bank transfer?
                  See details below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank transfer + causes */}
      <section className="bg-islamic-cream py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
            {/* Korean bank transfer */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-3xl border border-islamic-gold/30 bg-gradient-to-br from-islamic-cream-light to-white p-6 shadow-sm sm:p-8">
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

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-3 border-b border-islamic-navy/8 pb-3">
                    <dt className="text-islamic-navy/60">Bank</dt>
                    <dd className="text-right font-semibold text-islamic-navy">[Bank name]</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-b border-islamic-navy/8 pb-3">
                    <dt className="text-islamic-navy/60">Account name</dt>
                    <dd className="text-right font-semibold text-islamic-navy">Jeju Central Masjid</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="text-islamic-navy/60">Account no.</dt>
                    <dd className="text-right font-mono font-semibold text-islamic-navy">XXX-XXXX-XXXX-XX</dd>
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
                  <a href="mailto:info@jejumasjid.org" className="font-semibold text-islamic-green hover:text-islamic-green-dark">
                    info@jejumasjid.org
                  </a>{' '}
                  for a receipt.
                </p>
              </div>
            </div>

            {/* Causes */}
            <div className="lg:col-span-3">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
                <span className="h-px w-8 bg-islamic-green" />
                Where It Goes
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-islamic-navy sm:text-3xl">
                Three ways your gift helps
              </h2>
              <p className="mt-3 text-base text-islamic-navy/70 sm:text-lg">
                You choose the designation when you donate. Every KRW is tracked and reported monthly.
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
              What a donation does
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

      {/* Transparency — keeps MonthlyFinanceSummary, framed consistently */}
      <section id="transparency" className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
                <span className="h-px w-8 bg-islamic-green" />
                Transparency
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-islamic-navy sm:text-3xl">
                Where every KRW goes
              </h2>
              <p className="mt-3 max-w-2xl text-base text-islamic-navy/70 sm:text-lg">
                We publish our monthly income and expenses so donors can see exactly how their
                sadaqah is being used.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 self-start rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:self-auto"
            >
              Questions? Contact us
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <MonthlyFinanceSummary />
        </div>
      </section>

      <Footer />
    </main>
  )
}
