'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckIcon, ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { VISIT_NOTICE_DAYS } from '@/lib/constants/visits'

// 16px text on phones: iOS Safari zooms the page into any field smaller than that.
const inputCls =
  'block min-h-[48px] w-full appearance-none rounded-xl border border-islamic-navy/15 bg-white px-4 py-3 text-base text-islamic-navy placeholder:text-islamic-navy/40 focus:border-islamic-green focus:outline-none focus:ring-2 focus:ring-islamic-green/20 sm:text-sm'

// Values match VISITOR_TYPES / VISIT_LANGUAGES in lib/constants/visits.ts.
const VISITOR_OPTIONS = [
  { value: 'local', label: 'Korean or local visitor' },
  { value: 'overseas-muslim', label: 'Muslim traveller from abroad' },
  { value: 'group', label: 'School or group' },
  { value: 'other', label: 'Other' },
]

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'ko', label: 'Korean (한국어)' },
  { value: 'other', label: 'Other' },
]

const MAX_PEOPLE = 100

// Earliest bookable date (Korea time), matching the check in /api/visit-request.
const earliestVisitDate = () =>
  new Date(Date.now() + VISIT_NOTICE_DAYS * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA', {
    timeZone: 'Asia/Seoul',
  })

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs leading-relaxed text-islamic-navy/60">{children}</p>
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-islamic-navy">
      {children}
      {optional ? (
        <span className="font-normal text-islamic-navy/50"> (optional)</span>
      ) : (
        <span className="text-islamic-green"> *</span>
      )}
    </label>
  )
}

/** One numbered part of the form — the parts really are filled in order. */
function Part({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="flex items-center gap-2.5 text-base font-bold text-islamic-navy">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-islamic-green text-sm text-white"
        >
          {n}
        </span>
        {title}
      </legend>
      <div className="mt-4">{children}</div>
    </fieldset>
  )
}

const EMPTY = {
  visitorType: 'local',
  organisation: '',
  name: '',
  email: '',
  phone: '',
  language: 'en',
  date: '',
  time: '',
  groupSize: '1',
  altDate: '',
  accessibility: '',
  message: '',
}

/**
 * Visit booking — the masjid isn't always staffed, so visitors request a
 * slot and the committee confirms from the admin panel (the visitor is
 * emailed automatically). Posts to /api/visit-request.
 */
export default function VisitRequestForm() {
  const [form, setForm] = useState(EMPTY)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [startedAt] = useState(() => Date.now())
  // Worked out in the browser after load: /visit is a static page, and React
  // keeps server-rendered attributes as they are, so a value computed while
  // rendering would stay frozen at the build date.
  const [earliest, setEarliest] = useState<string>()
  useEffect(() => setEarliest(earliestVisitDate()), [])
  const doneRef = useRef<HTMLDivElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  // The form collapses into the confirmation; bring it into view and move
  // focus there so screen readers announce it.
  useEffect(() => {
    if (!done || !doneRef.current) return
    doneRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    doneRef.current.focus({ preventScroll: true })
  }, [done])

  // On a phone the button can be far below the field that needs fixing.
  useEffect(() => {
    if (error) errorRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [error])

  const set =
    (k: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value })

  const people = Math.min(MAX_PEOPLE, Math.max(1, Number(form.groupSize) || 1))
  const setPeople = (n: number) => setForm({ ...form, groupSize: String(Math.min(MAX_PEOPLE, Math.max(1, n))) })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (busy || done) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/visit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot, startedAt }),
      })
      if (!res.ok && res.status !== 204) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error || '')
      }
      setDone(true)
    } catch (err) {
      setError(
        (err instanceof Error && err.message) ||
          'Your request could not be sent. Please try again, or call or message us.',
      )
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-islamic-green/20 bg-islamic-green/5 p-6 text-center focus:outline-none sm:p-8"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-islamic-green/15 text-islamic-green">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-2xl font-bold text-islamic-navy">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-islamic-navy/70">
          We&apos;ve sent a copy to <span className="break-all font-semibold text-islamic-navy">{form.email}</span>.
          Your visit isn&apos;t confirmed yet: we&apos;ll email again within 1–2 days to confirm and let you know who
          will meet you.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false)
            setForm(EMPTY)
          }}
          className="mt-6 inline-flex min-h-[44px] items-center rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green"
        >
          Book another visit
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <Part n={1} title="Who is visiting?">
        <div className="grid grid-cols-2 gap-2.5">
          {VISITOR_OPTIONS.map((opt) => {
            const checked = form.visitorType === opt.value
            return (
              <label
                key={opt.value}
                className={`flex min-h-[56px] cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 transition sm:px-4 ${
                  checked
                    ? 'border-islamic-green bg-islamic-green/5 ring-1 ring-islamic-green'
                    : 'border-islamic-navy/15 bg-white hover:border-islamic-green/50'
                }`}
              >
                <input
                  type="radio"
                  name="visitorType"
                  value={opt.value}
                  checked={checked}
                  onChange={set('visitorType')}
                  className="h-4 w-4 flex-shrink-0 accent-islamic-green"
                />
                <span className="text-sm font-semibold leading-snug text-islamic-navy">{opt.label}</span>
              </label>
            )
          })}
        </div>
        {form.visitorType === 'group' && (
          <div className="mt-4 rounded-xl bg-islamic-cream-light p-4">
            <Label htmlFor="visit-organisation" optional>
              School or organisation name
            </Label>
            <input
              id="visit-organisation"
              autoComplete="organization"
              value={form.organisation}
              onChange={set('organisation')}
              className={inputCls}
            />
            <Hint>Please book schools and groups 1–2 weeks ahead, and tell us the number of students and teachers.</Hint>
          </div>
        )}
      </Part>

      <Part n={2} title="When would you like to come?">
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="visit-date">Date</Label>
            <input
              id="visit-date"
              type="date"
              required
              min={earliest}
              value={form.date}
              onChange={set('date')}
              className={`${inputCls} text-left`}
            />
            <Hint>At least {VISIT_NOTICE_DAYS} days from today.</Hint>
          </div>
          <div>
            <Label htmlFor="visit-time" optional>
              Time
            </Label>
            <input id="visit-time" type="time" value={form.time} onChange={set('time')} className={`${inputCls} text-left`} />
          </div>
          <div>
            <Label htmlFor="visit-people">People</Label>
            <div className="flex min-h-[48px] items-stretch overflow-hidden rounded-xl border border-islamic-navy/15 bg-white focus-within:border-islamic-green focus-within:ring-2 focus-within:ring-islamic-green/20">
              <button
                type="button"
                onClick={() => setPeople(people - 1)}
                disabled={people <= 1}
                aria-label="One person fewer"
                className="flex w-11 flex-shrink-0 items-center justify-center text-islamic-navy transition hover:bg-islamic-cream-light disabled:text-islamic-navy/25"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <input
                id="visit-people"
                type="number"
                required
                min={1}
                max={MAX_PEOPLE}
                inputMode="numeric"
                value={form.groupSize}
                onChange={set('groupSize')}
                className="w-full min-w-0 appearance-none border-x border-islamic-navy/10 bg-transparent text-center text-base font-semibold text-islamic-navy focus:outline-none sm:text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
              />
              <button
                type="button"
                onClick={() => setPeople(people + 1)}
                disabled={people >= MAX_PEOPLE}
                aria-label="One person more"
                className="flex w-11 flex-shrink-0 items-center justify-center text-islamic-navy transition hover:bg-islamic-cream-light disabled:text-islamic-navy/25"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Part>

      <Part n={3} title="Your details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="visit-name">Your name</Label>
            <input
              id="visit-name"
              required
              autoComplete="name"
              enterKeyHint="next"
              value={form.name}
              onChange={set('name')}
              className={inputCls}
            />
          </div>
          <div>
            <Label htmlFor="visit-email">Email</Label>
            <input
              id="visit-email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              enterKeyHint="next"
              value={form.email}
              onChange={set('email')}
              className={inputCls}
              placeholder="your@email.com"
            />
            <Hint>We send the confirmation here.</Hint>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="visit-phone" optional>
              Phone, KakaoTalk or WhatsApp
            </Label>
            <input
              id="visit-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={form.phone}
              onChange={set('phone')}
              className={inputCls}
              placeholder="+82 10 1234 5678"
            />
          </div>
        </div>

        {/* Everything optional folds away so the form stays short on a phone. */}
        <details className="group mt-5 rounded-xl border border-islamic-navy/10 bg-islamic-cream-light/60">
          <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="block text-sm font-semibold text-islamic-navy">Add more details (optional)</span>
              <span className="block text-xs text-islamic-navy/60">
                Language, another date, access needs or a message
              </span>
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className="h-5 w-5 flex-shrink-0 text-islamic-navy/50 transition group-open:rotate-180"
            />
          </summary>
          <div className="grid grid-cols-1 gap-4 border-t border-islamic-navy/10 p-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="visit-language" optional>
                Preferred language
              </Label>
              {/* The shared field style removes the native arrow, so draw one. */}
              <div className="relative">
                <select id="visit-language" value={form.language} onChange={set('language')} className={`${inputCls} pr-10`}>
                  {LANGUAGE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-islamic-navy/50"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="visit-alt-date" optional>
                Another date that works
              </Label>
              <input
                id="visit-alt-date"
                type="date"
                min={form.date || earliest}
                value={form.altDate}
                onChange={set('altDate')}
                className={`${inputCls} text-left`}
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="visit-access" optional>
                Access needs
              </Label>
              <input
                id="visit-access"
                value={form.accessibility}
                onChange={set('accessibility')}
                className={inputCls}
                placeholder="e.g. someone can't manage stairs"
              />
              <Hint>The masjid is on the 2nd floor, up a flight of stairs with no lift.</Hint>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="visit-message" optional>
                Anything we should know?
              </Label>
              <textarea
                id="visit-message"
                rows={3}
                value={form.message}
                onChange={set('message')}
                className={`${inputCls} resize-none`}
                placeholder="What would you like to see or ask?"
              />
            </div>
          </div>
        </details>
      </Part>

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

      <div>
        {error && (
          <p
            ref={errorRef}
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-islamic-green px-8 py-3 text-base font-bold text-white shadow-md shadow-islamic-green/25 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark disabled:cursor-not-allowed disabled:bg-islamic-navy/30 disabled:hover:translate-y-0"
        >
          {busy ? 'Sending…' : 'Request a visit'}
        </button>
        <p className="mt-3 text-center text-xs text-islamic-navy/60">
          Visits are free. We reply by email within 1–2 days.
        </p>
      </div>
    </form>
  )
}
