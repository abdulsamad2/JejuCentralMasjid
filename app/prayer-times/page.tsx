'use client'

import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { 
  CURRENT_PRAYER_TIMES, 
  PRAYERS_LIST, 
  MONTHLY_PRAYER_SCHEDULE,
  FRIDAY_PRAYER_TIMES,
  MOSQUE_LOCATION
} from '../../lib/constants/prayerTimes'
import { 
  fetchTodayPrayerTimes,
  getAdhanPlayerUrl,
  getAdhanCalendarUrl,
  convertTo12Hour,
  AdhanPrayerTimes
} from '../../lib/services/adhanApi'
import { 
  ClockIcon, 
  MapPinIcon, 
  CalendarIcon, 
  GlobeAltIcon,
  SunIcon,
  MoonIcon,
  PlayIcon,
  LinkIcon
} from '@heroicons/react/24/outline'

export default function PrayerTimesPage() {
  const [currentDate, setCurrentDate] = useState('')
  const [hijriDate, setHijriDate] = useState('')
  const [apiPrayerTimes, setApiPrayerTimes] = useState<AdhanPrayerTimes | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFriday, setIsFriday] = useState(false)

  useEffect(() => {
    const now = new Date()
    const dayOfWeek = now.getDay()
    setIsFriday(dayOfWeek === 5) // Friday = 5
    
    setCurrentDate(now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    }))
    
    // Simplified Hijri date calculation (in real app, use proper Islamic calendar library)
    setHijriDate('15 Rabi\' al-Awwal 1446 AH')

    // Fetch prayer times from Adhan API
    const fetchApiTimes = async () => {
      try {
        const times = await fetchTodayPrayerTimes()
        setApiPrayerTimes(times)
      } catch (error) {
        console.error('Failed to fetch API prayer times:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApiTimes()
  }, [])

  // Using centralized monthly schedule
  const monthlySchedule = MONTHLY_PRAYER_SCHEDULE

  // Using centralized prayer times
  const todayTimes = CURRENT_PRAYER_TIMES

  const prayerInfo = [
    {
      name: 'Fajr',
      arabic: 'الفجر',
      time: todayTimes.fajr,
      apiTime: apiPrayerTimes?.fajr,
      description: 'Dawn prayer, begins at true dawn',
      icon: SunIcon,
    },
    {
      name: 'Sunrise',
      arabic: 'الشروق',
      time: todayTimes.sunrise,
      apiTime: apiPrayerTimes?.sunrise,
      description: 'Sunrise time, end of Fajr prayer time',
      icon: SunIcon,
    },
    // Show Jummah instead of Dhuhr on Fridays
    ...(isFriday ? [{
      name: 'Jummah',
      arabic: 'الجمعة',
      time: todayTimes.jumma,
      iqamaTime: FRIDAY_PRAYER_TIMES.iqama,
      khutbahTime: FRIDAY_PRAYER_TIMES.khutbah,
      description: 'Friday congregation prayer with Khutbah',
      icon: SunIcon,
      isSpecial: true,
    }] : [{
      name: 'Dhuhr', 
      arabic: 'الظهر',
      time: todayTimes.dhuhr,
      apiTime: apiPrayerTimes?.dhuhr,
      description: 'Midday prayer, begins after sun passes zenith',
      icon: SunIcon,
    }]),
    {
      name: 'Asr',
      arabic: 'العصر', 
      time: todayTimes.asr,
      apiTime: apiPrayerTimes?.asr,
      description: 'Afternoon prayer, begins when shadow equals object length',
      icon: SunIcon,
    },
    {
      name: 'Maghrib',
      arabic: 'المغرب',
      time: todayTimes.maghrib,
      apiTime: apiPrayerTimes?.maghrib,
      description: 'Sunset prayer, begins immediately after sunset',
      icon: MoonIcon,
    },
    {
      name: 'Isha',
      arabic: 'العشاء',
      time: todayTimes.isha,
      apiTime: apiPrayerTimes?.isha,
      description: 'Night prayer, begins when twilight disappears',
      icon: MoonIcon,
    },
  ]

  return (
    <main>
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-islamic-green text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <ClockIcon className="h-10 w-10 text-islamic-gold" />
            <h1 className="text-4xl lg:text-6xl font-bold">Prayer Times</h1>
          </div>
          <p className="text-xl text-islamic-cream mb-8 max-w-3xl mx-auto">
            Accurate prayer times for Jeju Island calculated according to Islamic guidelines
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <MapPinIcon className="h-6 w-6 text-islamic-gold mx-auto mb-2" />
              <p className="font-semibold">Location</p>
              <p className="text-islamic-cream">Jeju Island, South Korea</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <CalendarIcon className="h-6 w-6 text-islamic-gold mx-auto mb-2" />
              <p className="font-semibold">Gregorian Date</p>
              <p className="text-islamic-cream">{currentDate}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <CalendarIcon className="h-6 w-6 text-islamic-gold mx-auto mb-2" />
              <p className="font-semibold">Hijri Date</p>
              <p className="text-islamic-cream font-arabic-modern arabic-features">{hijriDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Prayer Times */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-islamic-navy text-center mb-12">Today's Prayer Times</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {prayerInfo.map((prayer, index) => {
              const IconComponent = prayer.icon;
              return (
                <div key={prayer.name} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 min-h-[320px] border ${prayer.isSpecial ? 'border-islamic-gold border-2 bg-gradient-to-br from-islamic-gold/5 to-islamic-green/5' : 'border-gray-100'}`}>
                  <div className="text-center h-full flex flex-col justify-between">
                    <div className="flex-1">
                      <div className={`w-16 h-16 ${prayer.isSpecial ? 'bg-islamic-gold/20' : 'bg-islamic-green/10'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`h-8 w-8 ${prayer.isSpecial ? 'text-islamic-gold' : 'text-islamic-green'}`} />
                      </div>
                      <h3 className={`text-xl font-bold mb-2 leading-tight ${prayer.isSpecial ? 'text-islamic-gold' : 'text-islamic-navy'}`}>
                        {prayer.name}
                        {prayer.isSpecial && <span className="block text-sm text-islamic-navy mt-1">Friday Prayer</span>}
                      </h3>
                      <p className="text-islamic-green font-arabic-modern text-base mb-4 arabic-features text-optimize">{prayer.arabic}</p>
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      {prayer.isSpecial ? (
                        <div className="space-y-2">
                          <div className="bg-islamic-navy/5 rounded-lg p-2">
                            <p className="text-xs text-islamic-navy font-semibold">Khutbah</p>
                            <p className="text-lg font-bold text-islamic-gold">{prayer.khutbahTime}</p>
                          </div>
                          <div className="bg-islamic-gold/10 rounded-lg p-2">
                            <p className="text-xs text-islamic-navy font-semibold">Iqama (Congregation)</p>
                            <p className="text-xl font-bold text-islamic-navy">{prayer.iqamaTime}</p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-2xl font-bold text-islamic-gold mb-2 leading-tight">{prayer.time}</p>
                          {prayer.apiTime && (
                            <p className="text-sm text-islamic-navy mb-2">
                              API: {convertTo12Hour(prayer.apiTime)}
                            </p>
                          )}
                        </div>
                      )}
                      <p className="text-xs text-gray-600 leading-relaxed px-2 mt-2">{prayer.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Adhan Player & API Links */}
      <section className="py-16 bg-islamic-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Prayer Time Resources</h2>
            <p className="text-islamic-cream max-w-3xl mx-auto">
              Access accurate prayer times and Adhan notifications for Jeju Island using the Aladhan API
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Adhan Player */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <PlayIcon className="h-12 w-12 text-islamic-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-islamic-gold mb-3">Adhan Player</h3>
              <p className="text-islamic-cream mb-4 text-sm">
                Listen to Adhan calls for Jeju location
              </p>
              <a 
                href={getAdhanPlayerUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-islamic-gold text-islamic-navy px-4 py-2 rounded-lg font-semibold hover:bg-islamic-gold/80 transition-colors"
              >
                <PlayIcon className="h-4 w-4" />
                <span>Play Adhan</span>
              </a>
            </div>

            {/* Prayer Calendar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <CalendarIcon className="h-12 w-12 text-islamic-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-islamic-gold mb-3">Prayer Calendar</h3>
              <p className="text-islamic-cream mb-4 text-sm">
                View monthly prayer times calendar
              </p>
              <a 
                href={getAdhanCalendarUrl()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-islamic-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-islamic-green/80 transition-colors"
              >
                <CalendarIcon className="h-4 w-4" />
                <span>View Calendar</span>
              </a>
            </div>

            {/* API Status */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <GlobeAltIcon className="h-12 w-12 text-islamic-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-islamic-gold mb-3">API Status</h3>
              <div className="space-y-2">
                <div className={`px-3 py-1 rounded-full text-sm ${isLoading ? 'bg-yellow-500/20 text-yellow-300' : apiPrayerTimes ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {isLoading ? 'Loading...' : apiPrayerTimes ? 'Connected' : 'Error'}
                </div>
                <p className="text-xs text-islamic-cream">
                  Aladhan API for Jeju Island
                </p>
              </div>
            </div>
          </div>

          {/* Mosque Location Info */}
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-islamic-gold mb-4">Central Jeju Mosque Location</h3>
                <div className="space-y-2 text-islamic-cream">
                  <p className="flex items-center space-x-2">
                    <MapPinIcon className="h-4 w-4 text-islamic-gold" />
                    <span>{MOSQUE_LOCATION.address}</span>
                  </p>
                  <p className="text-sm">
                    Coordinates: {MOSQUE_LOCATION.coordinates.latitude}°N, {MOSQUE_LOCATION.coordinates.longitude}°E
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-islamic-gold mb-4">Calculation Method</h3>
                <div className="space-y-2 text-islamic-cream text-sm">
                  <p>• Islamic Society of North America (ISNA)</p>
                  <p>• Hanafi School of Thought</p>
                  <p>• Korea Standard Time (KST)</p>
                  <p>• Updated from Aladhan API</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qibla Direction */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-islamic-navy text-white rounded-2xl p-8 lg:p-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <GlobeAltIcon className="h-10 w-10 text-islamic-gold" />
              <h2 className="text-3xl font-bold">Qibla Direction</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl font-bold text-islamic-gold mb-4">292°</div>
                <p className="text-xl text-islamic-cream mb-2">Northwest Direction</p>
                <p className="text-islamic-cream">From Jeju Island to Makkah</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-islamic-gold font-semibold">Distance to Makkah</p>
                  <p className="text-lg">7,045 kilometers</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-islamic-gold font-semibold">Coordinates</p>
                  <p className="text-sm">Jeju: 33.4996°N, 126.5312°E</p>
                  <p className="text-sm">Makkah: 21.4225°N, 39.8262°E</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Prayer Schedule */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-islamic-navy text-center mb-12">Monthly Prayer Schedule</h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-islamic-navy text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-center font-semibold">Fajr</th>
                    <th className="px-6 py-4 text-center font-semibold">Sunrise</th>
                    <th className="px-6 py-4 text-center font-semibold">Dhuhr</th>
                    <th className="px-6 py-4 text-center font-semibold">Asr</th>
                    <th className="px-6 py-4 text-center font-semibold">Maghrib</th>
                    <th className="px-6 py-4 text-center font-semibold">Isha</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlySchedule.map((day, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-islamic-cream/50 transition-colors`}>
                      <td className="px-6 py-4 font-semibold text-islamic-navy">{day.date}</td>
                      <td className="px-6 py-4 text-center">{day.fajr}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{day.sunrise}</td>
                      <td className="px-6 py-4 text-center">{day.dhuhr}</td>
                      <td className="px-6 py-4 text-center">{day.asr}</td>
                      <td className="px-6 py-4 text-center">{day.maghrib}</td>
                      <td className="px-6 py-4 text-center">{day.isha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 bg-islamic-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Important Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-islamic-gold mb-4">Calculation Method</h3>
              <ul className="space-y-2 text-islamic-cream">
                <li>• Muslim World League calculation method</li>
                <li>• Fajr angle: 18 degrees</li>
                <li>• Isha angle: 17 degrees</li>
                <li>• Coordinates: 33.4996°N, 126.5312°E</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-islamic-gold mb-4">Prayer Guidelines</h3>
              <ul className="space-y-2 text-islamic-cream">
                <li>• Times shown are for Jeju city center</li>
                <li>• Sunrise time is for reference only</li>
                <li>• Times may vary ±2 minutes across the island</li>
                <li>• Check with mosque for congregation times</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-islamic-cream text-sm">
              For prayer time notifications and Islamic calendar integration, 
              consider installing Muslim prayer apps that support Jeju Island location.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}