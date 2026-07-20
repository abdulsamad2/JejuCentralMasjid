import type { JSX } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import EmailLink from './EmailLink'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import {
  MASJID_ADDRESS_EN_LINES,
  MASJID_ADDRESS_KO,
  MASJID_MAPS,
  MASJID_PHONES,
  MASJID_WHATSAPP,
} from '../lib/constants/masjidLocation'

const visit = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/committee', label: 'Committee' },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

const community = [
  { href: '/services', label: 'Services' },
  { href: '/permanent-masjid', label: 'Permanent Masjid' },
  { href: '/donate', label: 'Donate' },
]

const socials: {
  href: string
  label: string
  icon: (props: { className?: string }) => JSX.Element
}[] = [
  {
    href: 'https://www.facebook.com/JejuCentralMasjid',
    label: 'Facebook',
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4V14h2.7v8h3.4z" />
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/jejucentralmasjid/',
    label: 'Instagram',
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.3.5.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.5.4 1.1.5 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.5 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.5.2-1.1.4-2.3.5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.3-.5-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.5-.4-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.5-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .5-.2 1.1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.4-.5.2-.9.5-1.3.9-.4.4-.6.8-.9 1.3-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.4 2.1.2.5.5.9.9 1.3.4.4.8.6 1.3.9.4.2 1 .3 2.1.4 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.4.5-.2.9-.5 1.3-.9.4-.4.6-.8.9-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.4-2.1-.2-.5-.5-.9-.9-1.3-.4-.4-.8-.6-1.3-.9-.4-.2-1-.3-2.1-.4-1.2-.1-1.5-.1-4.7-.1zm0 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6zm0 7.9a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2zm6.1-8.1a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0z" />
      </svg>
    ),
  },
  {
    href: MASJID_WHATSAPP,
    label: 'WhatsApp',
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.3 5.2 4.6 3.1 1.2 3.1.8 3.7.8.6 0 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2.2C6.6 2.2 2.2 6.6 2.2 12c0 1.7.5 3.4 1.3 4.8L2.1 21.9l5.2-1.4c1.4.8 3 1.2 4.7 1.2 5.4 0 9.8-4.4 9.8-9.8S17.4 2.2 12 2.2zm0 17.8c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 15 3.5 13.5 3.5 12 3.5 7.3 7.3 3.5 12 3.5s8.5 3.8 8.5 8.5S16.7 20 12 20z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-islamic-cream-light text-islamic-navy">
      {/* Warm top border — signals end of content, very subtle */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-islamic-green via-islamic-gold to-islamic-green"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/assets/jeju-masjid-logo-icon.png"
                alt="Jeju Central Masjid"
                width={311}
                height={227}
                className="h-16 w-auto object-contain"
              />
              <span className="flex flex-col leading-tight">
                <span className="text-base font-bold text-islamic-navy">Jeju Central Masjid</span>
                <span className="text-base font-semibold tracking-[0.06em] text-islamic-green">
                  제주 이슬람 사원
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-islamic-navy/70">
              Serving the Muslim community across Jeju Island with daily prayers, Islamic education,
              halal guidance, and community care — insha&apos;Allah building a permanent home for our ummah.
            </p>

            <Link
              href="/donate"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-islamic-green px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-islamic-green/20 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark hover:shadow-lg"
            >
              <HeartIcon className="h-4 w-4" />
              Support the Masjid
            </Link>

            <div className="mt-8 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-islamic-navy/70 ring-1 ring-islamic-navy/10 transition hover:bg-islamic-green hover:text-white hover:ring-islamic-green"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Visit */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-islamic-navy/55">
              Visit
            </h3>
            <ul className="mt-5 space-y-3">
              {visit.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-islamic-navy/75 transition hover:text-islamic-green"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-islamic-navy/55">
              Community
            </h3>
            <ul className="mt-5 space-y-3">
              {community.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-islamic-navy/75 transition hover:text-islamic-green"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-islamic-navy/55">
              Find Us
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-islamic-navy/75">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-islamic-green/10 text-islamic-green">
                  <MapPinIcon className="h-4 w-4" />
                </span>
                <span className="leading-relaxed">
                  {MASJID_ADDRESS_EN_LINES[0]}
                  <br />
                  {MASJID_ADDRESS_EN_LINES[1]}, {MASJID_ADDRESS_EN_LINES[2]}
                  <br />
                  <span className="text-islamic-navy/60">{MASJID_ADDRESS_KO}</span>
                </span>
              </li>
              <li className="ml-11 flex flex-wrap gap-2">
                <a
                  href={MASJID_MAPS.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-islamic-navy ring-1 ring-islamic-navy/15 transition hover:text-islamic-green hover:ring-islamic-green"
                >
                  Google Maps
                  <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                </a>
                <a
                  href={MASJID_MAPS.kakao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-islamic-navy ring-1 ring-islamic-navy/15 transition hover:text-islamic-green hover:ring-islamic-green"
                >
                  Kakao
                  <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                </a>
                <a
                  href={MASJID_MAPS.naver}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-islamic-navy ring-1 ring-islamic-navy/15 transition hover:text-islamic-green hover:ring-islamic-green"
                >
                  Naver
                  <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-islamic-green/10 text-islamic-green">
                  <PhoneIcon className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  {MASJID_PHONES.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="transition hover:text-islamic-green"
                    >
                      {p.display}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-islamic-green/10 text-islamic-green">
                  <EnvelopeIcon className="h-4 w-4" />
                </span>
                <EmailLink className="transition hover:text-islamic-green" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-islamic-navy/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-islamic-navy/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Jeju Central Masjid · All rights reserved</p>
          <Link
            href="/contact"
            className="font-semibold text-islamic-navy/70 transition hover:text-islamic-green"
          >
            Contact us
          </Link>
        </div>
        <div className="border-t border-islamic-navy/5">
          <p className="mx-auto max-w-7xl px-4 py-3 text-center text-[11px] text-islamic-navy/50 sm:px-6 lg:px-8">
            Built &amp; developed by{' '}
            <span className="font-semibold text-islamic-navy/70">Abdul Samad</span>{' '}
            · Please remember him and his family in your du&rsquo;as
          </p>
        </div>
      </div>
    </footer>
  )
}
