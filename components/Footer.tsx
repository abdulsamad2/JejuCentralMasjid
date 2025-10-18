import Link from 'next/link'
import Image from 'next/image'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'
import { CURRENT_PRAYER_TIMES } from '../lib/constants/prayerTimes'

export default function Footer() {
  const now = new Date()
  const isFriday = now.getDay() === 5
  return (
    <footer className="bg-islamic-navy text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/assets/jeju-masjid-logo.png"
                alt="Central Jeju Mosque"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-xl font-bold">Central Jeju Mosque</h3>
                <p className="text-islamic-gold font-arabic-modern text-sm text-optimize arabic-features">مسجد جيجو المركزي</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Serving the Muslim community in Jeju Island with prayer services, 
              educational programs, and community support. Currently seeking 
              donations for a permanent mosque location.
            </p>
            <div className="flex space-x-4">
              <Link href="/donate" className="btn-primary inline-block text-center">
                Support Our Mosque
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-islamic-gold mt-1" />
                <div>
                  <p className="text-sm text-gray-300">
                    Jeju-do, Jeju-si, 특별자치도,<br />
                    Sancheondandong 2-gil, 15 2층<br />
                    Jeju Island, South Korea
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-islamic-gold" />
                <p className="text-sm text-gray-300">+82-10-XXXX-XXXX</p>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-islamic-gold" />
                <p className="text-sm text-gray-300">info@jejumasjid.org</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/prayer-times" className="text-gray-300 hover:text-islamic-gold transition-colors">Prayer Times</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-islamic-gold transition-colors">Services</Link></li>
              <li><Link href="/events" className="text-gray-300 hover:text-islamic-gold transition-colors">Events</Link></li>
              <li><Link href="/halal-food" className="text-gray-300 hover:text-islamic-gold transition-colors">Halal Food</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-islamic-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Prayer Times Widget */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ClockIcon className="h-5 w-5 text-islamic-gold" />
            <h3 className="text-lg font-semibold">Today's Prayer Times (Jeju)</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="bg-islamic-navy/50 p-3 rounded-lg">
              <p className="text-islamic-gold font-semibold">Fajr</p>
              <p className="text-sm">{CURRENT_PRAYER_TIMES.fajr}</p>
            </div>
            <div className={`bg-islamic-navy/50 p-3 rounded-lg ${isFriday ? 'border-2 border-islamic-gold' : ''}`}>
              <p className="text-islamic-gold font-semibold">
                {isFriday ? 'Jummah' : 'Dhuhr'}
                {isFriday && <span className="block text-xs text-islamic-cream">Friday</span>}
              </p>
              <p className="text-sm">{isFriday ? CURRENT_PRAYER_TIMES.jumma : CURRENT_PRAYER_TIMES.dhuhr}</p>
            </div>
            <div className="bg-islamic-navy/50 p-3 rounded-lg">
              <p className="text-islamic-gold font-semibold">Asr</p>
              <p className="text-sm">{CURRENT_PRAYER_TIMES.asr}</p>
            </div>
            <div className="bg-islamic-navy/50 p-3 rounded-lg">
              <p className="text-islamic-gold font-semibold">Maghrib</p>
              <p className="text-sm">{CURRENT_PRAYER_TIMES.maghrib}</p>
            </div>
            <div className="bg-islamic-navy/50 p-3 rounded-lg">
              <p className="text-islamic-gold font-semibold">Isha</p>
              <p className="text-sm">{CURRENT_PRAYER_TIMES.isha}</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Jeju Central Masjid. All rights reserved. | Built with ❤️ for the Muslim community
          </p>
        </div>
      </div>
    </footer>
  )
}