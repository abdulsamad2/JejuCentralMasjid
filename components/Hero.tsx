'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { CURRENT_PRAYER_TIMES, getNextPrayer } from '../lib/constants/prayerTimes'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [nextPrayer, setNextPrayer] = useState(getNextPrayer())
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const updatePrayerAndTime = () => {
      const now = new Date()
      setCurrentTime(now)
      setNextPrayer(getNextPrayer())
    }

    // Update immediately
    updatePrayerAndTime()

    // Update every minute
    const interval = setInterval(updatePrayerAndTime, 60000)

    return () => clearInterval(interval)
  }, [])
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-600 via-green-700 to-green-800">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block text-islamic-gold">Jeju Central</span>
                <span className="block">Masjid</span>
              </h1>
              <div className="mt-4 font-arabic-display text-xl sm:text-2xl text-islamic-cream text-optimize arabic-features-fancy arabic-text-shadow">
                مرحباً بكم في مسجد جيجو المركزي
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-islamic-cream leading-relaxed max-w-2xl">
              Serving the Muslim community in Jeju Island with prayer services, 
              educational programs, halal food guidance, and community support for 
              students, visitors, and residents.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/prayer-times"
                className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <span>Prayer Times</span>
                <ChevronRightIcon className="h-5 w-5" />
              </Link>
              <Link
                href="/donate"
                className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <span>Help Build Our Mosque</span>
                <ChevronRightIcon className="h-5 w-5" />
              </Link>
            </div>

            {/* Current Status Banner */}
            <div className="bg-red-600/90 text-white p-6 rounded-lg border-l-4 border-islamic-gold">
              <h3 className="font-bold text-lg mb-2">🕌 Urgent: Need Permanent Location</h3>
              <p className="text-sm leading-relaxed">
                We are currently operating from a temporary location and seeking 
                donations to establish a permanent mosque space that can better 
                serve our growing community with separate prayer areas for men and women.
              </p>
            </div>
          </div>

          {/* Image/Logo Side */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div 
                className="w-80 h-80 lg:w-96 lg:h-96 rounded-full backdrop-blur-sm border-2 border-islamic-gold/30 shadow-2xl overflow-hidden relative"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.15))"
                }}
              >
                <Image
                  src="/assets/bg.jpg"
                  alt="Central Jeju Mosque"
                  fill
                  sizes="(max-width: 768px) 320px, 384px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-green-800/30 backdrop-blur-[1px]"></div>
              </div>
              
              {/* Floating Prayer Time Card */}
              <div className="absolute -bottom-8 -left-8 bg-white/95 p-6 rounded-xl shadow-2xl backdrop-blur-sm border-2 border-islamic-gold/20">
                <div className="text-islamic-navy text-center">
                  <p className="text-sm font-semibold">
                    {nextPrayer.isToday ? 'Next Prayer' : 'Next Prayer (Tomorrow)'}
                    {nextPrayer.isJummah && ' 🕌'}
                  </p>
                  <p className={`text-2xl font-bold ${nextPrayer.isJummah ? 'text-islamic-gold' : 'text-islamic-green'}`}>
                    {nextPrayer.name}
                  </p>
                  <p className="text-lg">{nextPrayer.time}</p>
                  {nextPrayer.isJummah && (
                    <p className="text-xs text-islamic-gold font-medium">
                      Friday Prayer • Iqama Time
                    </p>
                  )}
                  {nextPrayer.timeRemaining && (
                    <p className="text-sm text-islamic-gold font-medium">
                      in {nextPrayer.timeRemaining}
                    </p>
                  )}
                  <p className="text-xs mt-1 text-gray-600">
                    Now: {currentTime.toLocaleTimeString('ko-KR', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      timeZone: 'Asia/Seoul'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  )
}