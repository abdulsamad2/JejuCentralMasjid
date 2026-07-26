'use client'

import { useState } from 'react'
import { ReceiptPercentIcon, CheckIcon } from '@heroicons/react/24/outline'

const inputCls =
  'w-full rounded-xl border border-islamic-navy/15 bg-white px-4 py-3 text-sm text-islamic-navy placeholder:text-islamic-navy/40 focus:border-islamic-green focus:outline-none focus:ring-2 focus:ring-islamic-green/20'

/**
 * Donation receipt request — donor fills details + payment screenshot;
 * the committee verifies the transfer in the bank app and issues the
 * receipt from the admin panel (emailed automatically).
 */
export default function ReceiptRequestForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    amount: '',
    transferDate: '',
    designation: 'Sadaqah',
  })
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [startedAt] = useState(() => Date.now())

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (busy || done) return
    setBusy(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('amount', form.amount)
      fd.append('transferDate', form.transferDate)
      fd.append('designation', form.designation)
      fd.append('website', honeypot)
      fd.append('startedAt', String(startedAt))
      if (file) fd.append('screenshot', file)
      const res = await fetch('/api/receipt-request', { method: 'POST', body: fd })
      if (!res.ok && res.status !== 204) throw new Error(`request failed (${res.status})`)
      setDone(true)
    } catch {
      setError('Sorry, the request could not be sent. Please try again or email us directly.')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-islamic-green/20 bg-islamic-green/5 p-6 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-islamic-green/15 text-islamic-green">
          <CheckIcon className="h-6 w-6" />
        </span>
        <p className="mt-3 text-base font-bold text-islamic-navy">Request received — jazakAllah khair!</p>
        <p className="mt-1 text-sm text-islamic-navy/70">
          We&apos;ll verify the transfer and email your receipt, usually within a day, insha&apos;Allah.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-islamic-green/10 text-islamic-green">
          <ReceiptPercentIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-islamic-green">
            Need a receipt?
          </p>
          <p className="text-sm font-semibold text-islamic-navy">
            Request a donation receipt by email
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input required placeholder="Your name" value={form.name} onChange={set('name')} className={inputCls} />
        <input required type="email" placeholder="Email for the receipt" value={form.email} onChange={set('email')} className={inputCls} />
        <div className="flex items-center rounded-xl border border-islamic-navy/15 bg-white px-4 focus-within:border-islamic-green focus-within:ring-2 focus-within:ring-islamic-green/20">
          <span className="text-islamic-navy/40">₩</span>
          <input
            required
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="Amount sent"
            value={form.amount}
            onChange={set('amount')}
            className="w-full bg-transparent py-3 pl-2 text-sm text-islamic-navy placeholder:text-islamic-navy/40 focus:outline-none"
          />
        </div>
        <input required type="date" aria-label="Transfer date" value={form.transferDate} onChange={set('transferDate')} className={inputCls} />
        <select value={form.designation} onChange={set('designation')} aria-label="Designation" className={inputCls}>
          <option>Sadaqah</option>
          <option>Masjid</option>
          <option>Zakat</option>
        </select>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-islamic-navy/20 bg-islamic-cream-light px-4 py-3 text-sm text-islamic-navy/70">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <span className="truncate">
            {file ? `📎 ${file.name}` : 'Attach payment screenshot (optional)'}
          </span>
        </label>
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
        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-islamic-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-islamic-navy-dark disabled:cursor-not-allowed disabled:bg-islamic-navy/30 sm:w-auto"
      >
        {busy ? 'Sending…' : 'Request receipt'}
      </button>
      <p className="text-xs leading-relaxed text-islamic-navy/50">
        We verify each transfer before issuing. Receipts confirm your donation — they are not
        tax-deduction certificates.
      </p>
    </form>
  )
}
