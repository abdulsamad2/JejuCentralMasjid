'use client'

import { useState } from 'react'
import { ChatBubbleOvalLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MASJID_PHONES } from '../lib/constants/masjidLocation'

/**
 * Floating contact widget — bottom-right corner on every page.
 *
 * Tap the bubble to expand quick-action chips for Kakao Talk, WhatsApp,
 * and a direct phone call. Designed for high-conversion: visible on every
 * page without being in the way, brand colors for instant recognition.
 */

const KAKAO_HREF = 'https://pf.kakao.com/_jejumasjid' // Update with the masjid's Kakao Channel handle
const WHATSAPP_HREF = `https://wa.me/${MASJID_PHONES[0].tel.replace('+', '')}` // First number → WhatsApp
const PHONE_HREF = `tel:${MASJID_PHONES[0].tel}`

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div
      aria-label="Contact the masjid"
      className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
    >
      {/* Action chips — appear above the toggle when open */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        {/* Kakao Talk */}
        <a
          href={KAKAO_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
          aria-label="Chat on Kakao Talk"
        >
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-islamic-navy shadow-lg ring-1 ring-black/5">
            Kakao Talk
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEE500] shadow-lg ring-1 ring-black/5 transition group-hover:scale-110">
            {/* Kakao Talk speech-bubble glyph */}
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-[#3C1E1E]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 3C6.48 3 2 6.55 2 10.92c0 2.78 1.86 5.22 4.65 6.6-.2.74-.74 2.69-.85 3.11-.13.52.19.51.4.37.16-.11 2.6-1.77 3.65-2.49.7.1 1.42.16 2.15.16 5.52 0 10-3.55 10-7.92S17.52 3 12 3z" />
            </svg>
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
          aria-label="Chat on WhatsApp"
        >
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-islamic-navy shadow-lg ring-1 ring-black/5">
            WhatsApp
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-lg ring-1 ring-black/5 transition group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-white"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.3 5.2 4.6 3.1 1.2 3.1.8 3.7.8.6 0 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2.2C6.6 2.2 2.2 6.6 2.2 12c0 1.7.5 3.4 1.3 4.8L2.1 21.9l5.2-1.4c1.4.8 3 1.2 4.7 1.2 5.4 0 9.8-4.4 9.8-9.8S17.4 2.2 12 2.2zm0 17.8c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 15 3.5 13.5 3.5 12 3.5 7.3 7.3 3.5 12 3.5s8.5 3.8 8.5 8.5S16.7 20 12 20z" />
            </svg>
          </span>
        </a>

        {/* Direct call */}
        <a
          href={PHONE_HREF}
          className="group flex items-center gap-3"
          aria-label="Call the masjid"
        >
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-islamic-navy shadow-lg ring-1 ring-black/5">
            Call us
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-islamic-navy shadow-lg ring-1 ring-black/5 transition group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.6 10.8a15.05 15.05 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.36 11.36 0 0 0 3.55.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.55 1 1 0 0 1-.25 1l-2.22 2.25z" />
            </svg>
          </span>
        </a>
      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close contact options' : 'Open contact options'}
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-islamic-green text-white shadow-xl ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark sm:h-16 sm:w-16 ${
          open ? 'rotate-90' : ''
        }`}
      >
        {open ? (
          <XMarkIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        ) : (
          <ChatBubbleOvalLeftIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        )}
      </button>
    </div>
  )
}
