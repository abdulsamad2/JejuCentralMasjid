'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
]

const PERMANENT_MASJID_HREF = '/permanent-masjid'
const PERMANENT_MASJID_LABEL = 'Permanent Masjid'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div aria-hidden="true" className="h-[80px] lg:h-[96px]" />
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-200 ${
          scrolled ? 'shadow-sm ring-1 ring-islamic-navy/5' : ''
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 lg:py-4"
          aria-label="Global"
        >
          <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
            <Image
              src="/assets/jeju-masjid-logo-icon.png"
              alt="Jeju Central Masjid"
              width={311}
              height={227}
              className="h-12 w-auto flex-shrink-0 object-contain sm:h-14 lg:h-16"
              priority
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-bold tracking-tight text-islamic-navy sm:text-base lg:text-lg">
                Jeju Central Masjid
              </span>
              <span className="truncate text-base font-semibold tracking-[0.06em] text-islamic-green sm:text-lg sm:tracking-[0.08em] lg:text-xl">
                제주 이슬람 사원
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? 'text-islamic-green'
                      : 'text-islamic-navy hover:text-islamic-green'
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-islamic-green" />
                  )}
                </Link>
              )
            })}

            {/* Featured campaign — sits between plain nav and the Donate CTA so it
                catches the eye but doesn't compete with the primary action. */}
            <Link
              href={PERMANENT_MASJID_HREF}
              className={`ml-2 inline-flex items-center gap-1.5 rounded-full border-2 border-islamic-gold/70 bg-islamic-gold/10 px-4 py-1.5 text-sm font-bold text-islamic-gold-dark transition hover:-translate-y-0.5 hover:border-islamic-gold hover:bg-islamic-gold/20 hover:shadow-md ${
                pathname === PERMANENT_MASJID_HREF ? 'bg-islamic-gold/25 shadow-sm' : ''
              }`}
            >
              <BuildingLibraryIcon className="h-4 w-4" />
              {PERMANENT_MASJID_LABEL}
            </Link>

            <Link
              href="/donate"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-islamic-green px-5 py-2 text-sm font-semibold text-white shadow-md shadow-islamic-green/25 transition hover:-translate-y-0.5 hover:bg-islamic-green-dark hover:shadow-lg"
            >
              Donate
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open main menu"
            className="inline-flex items-center justify-center rounded-lg p-2 text-islamic-navy transition hover:bg-islamic-cream lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-7 w-7" />
          </button>
        </nav>

        <div
          className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-islamic-navy-dark/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image
                  src="/assets/jeju-masjid-logo-icon.png"
                  alt="Jeju Central Masjid"
                  width={311}
                  height={227}
                  className="h-11 w-auto object-contain"
                />
                <span className="text-sm font-bold text-islamic-navy">Jeju Central Masjid</span>
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                className="rounded-lg p-2 text-islamic-navy hover:bg-islamic-cream"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-7 w-7" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {navigation.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-3 text-base font-semibold transition ${
                      active
                        ? 'bg-islamic-cream text-islamic-green'
                        : 'text-islamic-navy hover:bg-islamic-cream'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}

              <Link
                href={PERMANENT_MASJID_HREF}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-islamic-gold/70 bg-islamic-gold/10 px-4 py-3 text-base font-bold text-islamic-gold-dark transition hover:bg-islamic-gold/20"
              >
                <BuildingLibraryIcon className="h-5 w-5" />
                {PERMANENT_MASJID_LABEL}
              </Link>
              <Link
                href="/donate"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-islamic-green px-4 py-3 text-base font-semibold text-white shadow-md shadow-islamic-green/25 hover:bg-islamic-green-dark"
              >
                Donate
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
