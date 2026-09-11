'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { VISIT_NOTICE_DAYS } from '@/lib/constants/visits'

const inputCls =
  'w-full rounded-xl border border-islamic-navy/15 bg-white px-4 py-3 text-sm text-islamic-navy placeholder:text-islamic-navy/40 focus:border-islamic-green focus:outline-none focus:ring-2 focus:ring-islamic-green/20'

// Values match VISITOR_TYPES / VISIT_LANGUAGES in cms/collections/VisitRequests.ts.
const VISITOR_OPTIONS = [
  { value: 'local', label: 'Korean or local visitor' },
  { value: 'overseas-muslim', label: 'Muslim traveller from overseas' },
  { value: 'group', label: 'School, university or group' },
  { value: 'other', label: 'Other' },
]

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'ko', label: 'Korean (한국어)' },
  { value: 'other', label: 'Other' },
]

// Earliest bookable date (Korea time), matching the check in /api/visit-request.
const earliestVisitDate = () =>
  new Date(Date.now() + VISIT_NOTICE_DAYS * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA', {
    timeZone: 'Asia/Seoul',
  })

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-islamic-navy/60">{children}</p>
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

  // The form collapses into the confirmation; bring it into view and move
  // focus there so screen readers announce it.
  useEffect(() => {
    if (!done || !doneRef.current) return
    doneRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    doneRef.current.focus({ preventScroll: true })
  }, [done])

  const set =
    (k: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value })

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
        className="rounded-2xl border border-islamic-green/20 bg-islamic-green/5 p-8 text-center focus:outline-none"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-islamic-green/15 text-islamic-green">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-2xl font-bold text-islamic-navy">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-islamic-navy/70">
          We&apos;ve sent a copy to <span className="font-semibold text-islamic-navy">{form.email}</span>. Your visit
          isn&apos;t confirmed yet: we&apos;ll email again within 1–2 days to confirm and let you know who will meet
          you.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false)
            setForm(EMPTY)
          }}
          className="mt-6 inline-flex items-center rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green"
        >
          Book another visit
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-islamic-navy">
          Who is visiting?<span className="text-islamic-green"> *</span>
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {VISITOR_OPTIONS.map((opt) => {
            const checked = form.visitorType === opt.value
            return (
              <label
                key={opt.value}
                className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
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
                <span className="text-sm font-semibold text-islamic-navy">{opt.label}</span>
              </label>
            )
          })}
        </div>
        {form.visitorType === 'group' && (
          <div className="mt-4 rounded-xl bg-islamic-cream-light p-4">
            <Label htmlFor="visit-organisation" optional>School or organisation name</Label>
            <input
              id="visit-organisation"
              autoComplete="organization"
              value={form.organisation}
              onChange={set('organisation')}
              className={inputCls}
            />
            <Hint>
              Please book schools and groups 1–2 weeks ahead, and tell us the number of students and teachers.
            </Hint>
          </div>
        )}
      </fieldset>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="visit-name">Your name</Label>
          <input id="visit-name" required autoComplete="name" value={form.name} onChange={set('name')} className={inputCls} />
        </div>
        <div>
          <Label htmlFor="visit-email">Email</Label>
          <input
            id="visit-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={set('email')}
            className={inputCls}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <Label htmlFor="visit-phone" optional>Phone, KakaoTalk or WhatsApp</Label>
          <input
            id="visit-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={set('phone')}
            className={inputCls}
            placeholder="+82 10 1234 5678"
          />
        </div>
        <div>
          <Label htmlFor="visit-language">Preferred language</Label>
          <select id="visit-language" value={form.language} onChange={set('language')} className={inputCls}>
            {LANGUAGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="visit-date">Date</Label>
          <input
            id="visit-date"
            type="date"
            required
            min={earliest}
            value={form.date}
            onChange={set('date')}
            className={inputCls}
          />
          <Hint>At least {VISIT_NOTICE_DAYS} days from today.</Hint>
        </div>
        <div>
          <Label htmlFor="visit-alt-date" optional>Another date that works</Label>
          <input
            id="visit-alt-date"
            type="date"
            min={form.date || earliest}
            value={form.altDate}
            onChange={set('altDate')}
            className={inputCls}
          />
        </div>
        <div>
          <Label htmlFor="visit-time" optional>Time</Label>
          <input id="visit-time" type="time" value={form.time} onChange={set('time')} className={inputCls} />
        </div>
        <div>
          <Label htmlFor="visit-people">Number of people</Label>
          <input
            id="visit-people"
            type="number"
            required
            min={1}
            max={100}
            inputMode="numeric"
            value={form.groupSize}
            onChange={set('groupSize')}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="visit-access" optional>Access needs</Label>
        <input
          id="visit-access"
          value={form.accessibility}
          onChange={set('accessibility')}
          className={inputCls}
          placeholder="e.g. someone uses a wheelchair or can't manage stairs"
        />
        <Hint>The masjid is on the 2nd floor, up a flight of stairs with no lift.</Hint>
      </div>

      <div>
        <Label htmlFor="visit-message" optional>Anything we should know?</Label>
        <textarea
          id="visit-message"
          rows={4}
          value={form.message}
          onChange={set('message')}
          className={`${inputCls} resize-none`}
          placeholder="What would you like to see or ask?"
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

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-islamic-green px-8 py-3 text-sm font-bold text-white shadow-md shadow-islamic-green/25 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark disabled:cursor-not-allowed disabled:bg-islamic-navy/30 disabled:hover:translate-y-0 sm:w-auto sm:text-base"
      >
        {busy ? 'Sending…' : 'Request a visit'}
      </button>
    </form>
  )
}
