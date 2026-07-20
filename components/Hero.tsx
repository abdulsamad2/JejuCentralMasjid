'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

type FeatureSlide = {
  src: string
  alt: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  /** CSS object-position focal point for the crop, e.g. '50% 72%'. Defaults to center. */
  position?: string
}

const SLIDES: FeatureSlide[] = [
  {
    src: '/assets/five-time-prayer-01.jpeg',
    alt: 'Congregation praying together at Jeju Central Masjid',
    position: '50% 72%',
    title: 'Five Daily Prayers',
    description:
      'All five daily prayers are held in congregation at the masjid, with our doors open around the clock. Come pray with us — brothers and sisters each have their own dedicated space.',
    ctaLabel: 'Visit Us',
    ctaHref: '/contact',
  },
  {
    src: '/assets/mosque-3.jpg',
    alt: 'Around Jeju Central Masjid on Jeju Island',
    title: 'In the Heart of Jeju',
    description:
      'Located in the heart of Jeju, it serves students, workers, families, new Muslims, and visitors by providing opportunities to learn about Islam, ask questions, and take meaningful steps in faith.',
    ctaLabel: 'Learn More',
    ctaHref: '/about',
  },
  {
    src: '/assets/mosque-1.jpg',
    alt: 'Inside the Jeju Central Masjid prayer hall',
    title: 'Service, Unity & Compassion',
    description:
      'Committed to service, unity, and compassion, the masjid aims to strengthen both spiritual life and community well-being through outreach, care, and positive engagement with society.',
    ctaLabel: 'Support Us',
    ctaHref: '/donate',
  },
  
]

const SLIDE_DURATION_MS = 7000
const SWIPE_THRESHOLD = 50

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReducedMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const goTo = useCallback((n: number) => {
    setIndex(((n % SLIDES.length) + SLIDES.length) % SLIDES.length)
  }, [])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (isPaused || reducedMotion) return
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, SLIDE_DURATION_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, reducedMotion])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > SWIPE_THRESHOLD) (dx < 0 ? next : prev)()
    touchStartX.current = null
  }

  return (
    <section
      aria-label="Featured"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-islamic-navy-dark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative h-[440px] w-full xs:h-[480px] sm:h-[560px] md:h-[620px] lg:h-[660px]">
        {SLIDES.map((slide, i) => {
          const isActive = i === index
          return (
            <div
              key={slide.src}
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SLIDES.length}`}
              className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
                isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              {/* Base image with subtle Ken Burns */}
              <div className={`absolute inset-0 ${isActive && !reducedMotion ? 'hero-kenburns' : ''}`}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: slide.position ?? '50% 50%' }}
                />
              </div>

              {/* MOBILE overlay — soft bottom-to-top gradient for legibility without harshness */}
              <div
                aria-hidden="true"
                className="absolute inset-0 sm:hidden"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(21,38,61,0.25) 0%, rgba(21,38,61,0.55) 45%, rgba(21,38,61,0.88) 100%)',
                }}
              />

              {/* DESKTOP overlay — feathered diagonal wash (soft, no hard edges) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 hidden sm:block"
                style={{
                  background:
                    'linear-gradient(102deg, rgba(21,38,61,0.92) 0%, rgba(21,38,61,0.82) 28%, rgba(21,38,61,0.55) 48%, rgba(21,38,61,0.15) 62%, rgba(21,38,61,0) 78%)',
                }}
              />

              {/* DESKTOP decorative slanted accent — thin teal wash, feathered */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 hidden sm:block"
                style={{
                  left: '44%',
                  width: '14%',
                  transform: 'skewX(-10deg)',
                  background:
                    'linear-gradient(90deg, rgba(15,118,110,0) 0%, rgba(15,118,110,0.28) 50%, rgba(15,118,110,0) 100%)',
                }}
              />

              {/* Content */}
              <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
                <div className="max-w-[32rem] text-white">
                  {isActive && (
                    <>
                      <h2
                        className="hero-fade-up text-[2rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
                        style={{ textShadow: '0 2px 24px rgba(8,16,30,0.35)' }}
                      >
                        {slide.title}
                      </h2>
                      <p
                        className="hero-fade-up mt-4 max-w-md text-[15px] leading-relaxed text-islamic-cream/90 sm:mt-6 sm:text-lg sm:leading-relaxed"
                        style={{ animationDelay: '100ms', textShadow: '0 1px 12px rgba(8,16,30,0.3)' }}
                      >
                        {slide.description}
                      </p>
                      <div
                        className="hero-fade-up mt-6 sm:mt-9"
                        style={{ animationDelay: '200ms' }}
                      >
                        <Link
                          href={slide.ctaHref}
                          className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-md bg-islamic-gold px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-islamic-navy shadow-[0_10px_30px_-10px_rgba(201,162,75,0.6)] transition hover:-translate-y-0.5 hover:bg-islamic-gold-light hover:shadow-[0_14px_36px_-10px_rgba(201,162,75,0.7)] sm:px-8 sm:text-base"
                        >
                          {slide.ctaLabel}
                          <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Desktop prev/next — understated, appear on hover */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/20 group-hover:opacity-100 lg:inline-flex lg:opacity-70 lg:hover:opacity-100"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/20 group-hover:opacity-100 lg:inline-flex lg:opacity-70 lg:hover:opacity-100"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>

        {/* Dot pagination — smooth pill shape, expands on active */}
        <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-2 sm:bottom-7">
          {SLIDES.map((s, i) => {
            const isActive = i === index
            return (
              <button
                key={s.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={isActive}
                className="group flex h-8 items-center justify-center px-1.5"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ease-out ${
                    isActive
                      ? 'w-10 bg-islamic-gold'
                      : 'w-6 bg-white/50 group-hover:bg-white/80'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
