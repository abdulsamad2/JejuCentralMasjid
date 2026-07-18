'use client'

import { useEffect, useRef, useState } from 'react'
import { ChatBubbleOvalLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  MASJID_CHAT_PHONE,
  MASJID_KAKAO_ID,
  MASJID_KAKAO_OPENCHAT,
  MASJID_PHONES,
  MASJID_WHATSAPP,
} from '../lib/constants/masjidLocation'

/**
 * Floating contact widget — bottom-right corner on every page.
 *
 * Tap the bubble to expand quick-action chips for WhatsApp (primary),
 * KakaoTalk, and a direct phone call. WhatsApp opens with a prefilled
 * greeting so visitors never face an empty chat box. A one-time teaser
 * label invites first-time visitors; Escape or tapping outside closes.
 */

const PHONE_HREF = `tel:${MASJID_PHONES[0].tel}`
const WHATSAPP_CHAT = `${MASJID_WHATSAPP}?text=${encodeURIComponent(
  'Assalamu alaikum! I have a question about Jeju Central Masjid.',
)}`
const TEASER_KEY = 'jcm-chat-teaser-seen'

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const [kakaoCopied, setKakaoCopied] = useState(false)
  const [teaser, setTeaser] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // One-time teaser: appears after a short delay on the visitor's first page,
  // then never again this session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(TEASER_KEY)) return
    } catch {
      return
    }
    const show = setTimeout(() => setTeaser(true), 3000)
    const hide = setTimeout(() => dismissTeaser(), 12000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  const dismissTeaser = () => {
    setTeaser(false)
    try {
      sessionStorage.setItem(TEASER_KEY, '1')
    } catch {
      /* noop */
    }
  }

  // Escape key and tap-outside both close the menu.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const toggle = () => {
    dismissTeaser()
    setOpen((v) => !v)
  }

  // Kakao offers no link/SDK to open a 1:1 chat with a personal ID
  // (only Kakao Channels support that), so: copy the ID, then launch
  // the KakaoTalk app on mobile where the visitor pastes it in search.
  const openKakao = async () => {
    try {
      await navigator.clipboard.writeText(MASJID_KAKAO_ID)
    } catch {
      /* noop */
    }
    setKakaoCopied(true)
    setTimeout(() => setKakaoCopied(false), 2400)
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
      window.location.href = 'kakaotalk://'
    }
  }

  return (
    <div
      ref={rootRef}
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
        {/* WhatsApp — primary: opens a chat with a prefilled greeting */}
        <a
          href={WHATSAPP_CHAT}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3"
          aria-label={`Chat on WhatsApp ${MASJID_CHAT_PHONE.display}`}
          tabIndex={open ? 0 : -1}
        >
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-islamic-navy shadow-lg ring-1 ring-black/5">
            WhatsApp — fastest reply
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

        {/* Kakao Talk — direct 1:1 open chat when the link exists, else copy-ID fallback */}
        {MASJID_KAKAO_OPENCHAT ? (
          <a
            href={MASJID_KAKAO_OPENCHAT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3"
            aria-label="Chat on KakaoTalk"
            tabIndex={open ? 0 : -1}
          >
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-islamic-navy shadow-lg ring-1 ring-black/5">
              KakaoTalk — 바로 채팅
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEE500] shadow-lg ring-1 ring-black/5 transition group-hover:scale-110">
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
        ) : (
          <button
            type="button"
            onClick={openKakao}
            className="group flex items-center gap-3"
            aria-label={`Copy our KakaoTalk ID ${MASJID_KAKAO_ID}`}
            tabIndex={open ? 0 : -1}
          >
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-islamic-navy shadow-lg ring-1 ring-black/5">
              {kakaoCopied ? `ID copied! Search ${MASJID_KAKAO_ID}` : `KakaoTalk · ${MASJID_KAKAO_ID}`}
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
          </button>
        )}

        {/* Direct call */}
        <a
          href={PHONE_HREF}
          className="group flex items-center gap-3"
          aria-label="Call the masjid"
          tabIndex={open ? 0 : -1}
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

      <div className="flex items-center gap-3">
        {/* One-time teaser label */}
        {teaser && !open && (
          <button
            type="button"
            onClick={toggle}
            className="animate-[fadeIn_.4s_ease-out] rounded-full bg-white px-4 py-2 text-xs font-bold text-islamic-navy shadow-lg ring-1 ring-black/5"
          >
            Assalamu alaikum! Questions? Chat with us{' '}
            <span aria-hidden="true" className="ml-0.5">
              👋
            </span>
          </button>
        )}

        {/* Toggle */}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? 'Close contact options' : 'Open contact options'}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-islamic-green text-white shadow-xl ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark sm:h-16 sm:w-16 ${
            open ? 'rotate-90' : ''
          }`}
        >
          {!open && (
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 animate-ping rounded-full bg-islamic-green/40 [animation-duration:2.5s] motion-reduce:hidden"
            />
          )}
          {open ? (
            <XMarkIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          ) : (
            <ChatBubbleOvalLeftIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          )}
        </button>
      </div>
    </div>
  )
}
