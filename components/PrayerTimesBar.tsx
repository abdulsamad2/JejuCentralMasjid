'use client'

import { useEffect, useState } from 'react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { PRAYERS_LIST, getNextPrayer } from '../lib/constants/prayerTimes'

export default function PrayerTimesBar() {
  const [nextPrayer, setNextPrayer] = useState(getNextPrayer())
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const tick = () => {
      setNow(new Date())
      setNextPrayer(getNextPrayer())
    }
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  const todayLabel = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Asia/Seoul',
  })

  const hijriLabel = (() => {
    try {
      return new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(now)
    } catch {
      return ''
    }
  })()

  const prayers = PRAYERS_LIST.slice(0, 5)

  return (
    <section
      aria-label="Today's prayer times"
      className="relative border-b border-islamic-navy/10 bg-gradient-to-b from-islamic-cream to-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <div className="flex items-center gap-2 text-islamic-navy">
              <CalendarIcon className="h-4 w-4 flex-shrink-0 text-islamic-green sm:h-5 sm:w-5" />
              <div className="leading-tight">
                <p className="text-[13px] font-semibold sm:text-sm">{todayLabel}</p>
                {hijriLabel && (
                  <p className="text-[11px] text-islamic-navy/60 sm:text-xs">{hijriLabel} AH</p>
                )}
              </div>
            </div>

            {nextPrayer.timeRemaining && (
              <div className="inline-flex items-center gap-2 rounded-full bg-islamic-green/10 px-3 py-1 sm:hidden">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-islamic-green" />
                <span className="text-[11px] font-semibold text-islamic-green-dark">
                  {nextPrayer.name} in {nextPrayer.timeRemaining}
                </span>
              </div>
            )}
          </div>

          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:flex-1 sm:overflow-visible sm:px-0">
            <ul className="flex min-w-max items-stretch gap-2 sm:grid sm:min-w-0 sm:grid-cols-5 sm:gap-2">
              {prayers.map((p) => {
                const isNext = p.name === nextPrayer.name
                return (
                  <li
                    key={p.name}
                    className={`flex min-w-[68px] flex-col items-center justify-center rounded-xl border px-3 py-2 text-center transition sm:min-w-0 ${
                      isNext
                        ? 'border-islamic-green bg-islamic-green text-white shadow-md shadow-islamic-green/20'
                        : 'border-islamic-navy/10 bg-white text-islamic-navy hover:border-islamic-green/30'
                    }`}
                  >
                    <p
                      className={`text-[10px] font-bold uppercase tracking-wider sm:text-[11px] ${
                        isNext ? 'text-white/90' : 'text-islamic-navy/60'
                      }`}
                    >
                      {p.name}
                    </p>
                    <p className={`text-sm font-bold tabular-nums sm:text-base ${isNext ? 'text-white' : 'text-islamic-navy'}`}>
                      {p.time}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>

          {nextPrayer.timeRemaining && (
            <div className="hidden flex-col items-end text-right md:flex">
              <span className="text-[10px] font-bold uppercase tracking-wider text-islamic-navy/60">
                Next
              </span>
              <span className="text-sm font-semibold text-islamic-green-dark">
                {nextPrayer.name} · {nextPrayer.timeRemaining}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
