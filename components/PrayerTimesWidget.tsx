'use client'

import { useState, useEffect } from 'react'
import { ClockIcon, MapPinIcon, CalendarIcon, SunIcon, MoonIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { CURRENT_PRAYER_TIMES, PRAYERS_LIST, getNextPrayer } from '../lib/constants/prayerTimes'

export default function PrayerTimesWidget() {
  const [currentTime, setCurrentTime] = useState('')
  const [nextPrayerInfo, setNextPrayerInfo] = useState(getNextPrayer())
  const [isFriday, setIsFriday] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [qiblaDirection, setQiblaDirection] = useState({ degrees: 292, direction: 'NW', distance: 8850 })
  const [locationPermission, setLocationPermission] = useState<'default' | 'requesting' | 'granted' | 'denied' | 'not-supported'>('default')
  const [prayerNames, setPrayerNames] = useState([
    { name: 'Fajr', time: CURRENT_PRAYER_TIMES.fajr, arabic: 'الفجر' },
    { name: 'Sunrise', time: CURRENT_PRAYER_TIMES.sunrise, arabic: 'الشروق' },
    { name: 'Dhuhr', time: CURRENT_PRAYER_TIMES.dhuhr, arabic: 'الظهر' },
    { name: 'Asr', time: CURRENT_PRAYER_TIMES.asr, arabic: 'العصر' },
    { name: 'Maghrib', time: CURRENT_PRAYER_TIMES.maghrib, arabic: 'المغرب' },
    { name: 'Isha', time: CURRENT_PRAYER_TIMES.isha, arabic: 'العشاء' },
  ])

  // Calculate Qibla direction from user's location to Makkah
  const calculateQiblaDirection = (lat: number, lng: number) => {
    const makkahLat = 21.4225; // Makkah latitude
    const makkahLng = 39.8262; // Makkah longitude
    
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);
    const toDegrees = (radians: number) => radians * (180 / Math.PI);
    
    const deltaLng = toRadians(makkahLng - lng);
    const latRad = toRadians(lat);
    const makkahLatRad = toRadians(makkahLat);
    
    const y = Math.sin(deltaLng) * Math.cos(makkahLatRad);
    const x = Math.cos(latRad) * Math.sin(makkahLatRad) - 
              Math.sin(latRad) * Math.cos(makkahLatRad) * Math.cos(deltaLng);
    
    let bearing = toDegrees(Math.atan2(y, x));
    bearing = (bearing + 360) % 360; // Normalize to 0-360
    
    // Calculate distance using Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = toRadians(makkahLat - lat);
    const dLng = deltaLng;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRadians(lat)) * Math.cos(makkahLatRad) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    // Get cardinal direction
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const direction = directions[Math.round(bearing / 22.5) % 16];
    
    return {
      degrees: Math.round(bearing),
      direction,
      distance: Math.round(distance)
    };
  };

  // Get user's current location
  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      setLocationPermission('not-supported');
      return;
    }

    setLocationPermission('requesting');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        const qibla = calculateQiblaDirection(latitude, longitude);
        setQiblaDirection(qibla);
        setLocationPermission('granted');
      },
      (error) => {
        console.error('Location access denied:', error);
        setLocationPermission('denied');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutes
      }
    );
  };

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      const currentTimeStr = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        timeZone: 'Asia/Seoul' 
      })
      setCurrentTime(currentTimeStr)

      // Update Friday status and prayer names
      const isCurrentlyFriday = now.getDay() === 5
      setIsFriday(isCurrentlyFriday)
      
      // Update prayer names based on day
      const updatedPrayerNames = [
        { name: 'Fajr', time: CURRENT_PRAYER_TIMES.fajr, arabic: 'الفجر' },
        { name: 'Sunrise', time: CURRENT_PRAYER_TIMES.sunrise, arabic: 'الشروق' },
        isCurrentlyFriday 
          ? { name: 'Jummah', time: CURRENT_PRAYER_TIMES.jumma, arabic: 'الجمعة' }
          : { name: 'Dhuhr', time: CURRENT_PRAYER_TIMES.dhuhr, arabic: 'الظهر' },
        { name: 'Asr', time: CURRENT_PRAYER_TIMES.asr, arabic: 'العصر' },
        { name: 'Maghrib', time: CURRENT_PRAYER_TIMES.maghrib, arabic: 'المغرب' },
        { name: 'Isha', time: CURRENT_PRAYER_TIMES.isha, arabic: 'العشاء' },
      ]
      setPrayerNames(updatedPrayerNames)

      // Update next prayer info
      setNextPrayerInfo(getNextPrayer())
    }

    // Update immediately
    updateTimes()

    // Update every minute
    const timer = setInterval(updateTimes, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-islamic-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-3 mb-6 bg-white rounded-full px-6 py-3 shadow-lg">
            <ClockIcon className="h-8 w-8 text-islamic-gold" />
            <h2 className="text-4xl font-bold text-islamic-navy">Prayer Times</h2>
          </div>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Stay connected with accurate prayer times for the Muslim community in Jeju Island
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-600">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <MapPinIcon className="h-5 w-5 text-islamic-green" />
              <span className="font-medium">Jeju Island, South Korea</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <CalendarIcon className="h-5 w-5 text-islamic-gold" />
              <span className="font-medium">{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>

        {/* Prayer Times Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {prayerNames.map((prayer, index) => {
            const isNextPrayer = prayer.name === nextPrayerInfo.name
            const isDayTime = ['Fajr', 'Sunrise', 'Dhuhr', 'Jummah', 'Asr'].includes(prayer.name)
            const Icon = isDayTime ? SunIcon : MoonIcon
            
            return (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-500 transform hover:-translate-y-2 ${
                  isNextPrayer 
                    ? 'bg-gradient-to-br from-islamic-green-light to-islamic-green-dark text-white shadow-2xl scale-105' 
                    : 'bg-islamic-white hover:shadow-xl border border-gray-100 hover:border-islamic-gold-muted/50'
                }`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="islamic-pattern h-full w-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isNextPrayer 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-islamic-green-light/10 group-hover:bg-islamic-green-light/20'
                  } transition-all duration-300`}>
                    <Icon className={`h-8 w-8 ${
                      isNextPrayer 
                        ? 'text-white' 
                        : 'text-islamic-green-light group-hover:text-islamic-green-dark'
                    }`} />
                  </div>
                  
                  <h3 className={`font-bold text-xl mb-2 text-readable ${
                    isNextPrayer ? 'text-white' : 'text-islamic-navy group-hover:text-islamic-gold-muted'
                  } transition-colors duration-300`}>
                    {prayer.name}
                  </h3>
                  
                  <p className={`text-base font-arabic-modern mb-3 text-optimize arabic-features text-readable ${
                    isNextPrayer ? 'text-white/90' : 'text-islamic-green-light'
                  }`}>
                    {prayer.arabic}
                  </p>
                  
                  <p className={`text-3xl font-bold mb-2 text-readable ${
                    isNextPrayer ? 'text-white' : 'text-islamic-navy'
                  }`}>
                    {prayer.time}
                  </p>
                  
                  {isNextPrayer && (
                    <div className="animate-pulse">
                      <p className="text-sm text-white/90 font-semibold bg-white/20 rounded-full px-3 py-1 inline-block">
                        Next Prayer
                      </p>
                      {nextPrayerInfo.timeRemaining && (
                        <p className="text-xs text-white/80 mt-1">
                          in {nextPrayerInfo.timeRemaining}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Hover Effect */}
                {!isNextPrayer && (
                  <div className="absolute inset-0 bg-gradient-to-br from-islamic-green-light/5 to-islamic-gold-muted/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Enhanced Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 mt-20">
          {/* Current Time & Islamic Date */}
          <div className="bg-gradient-to-r from-islamic-navy to-islamic-navy/90 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="islamic-pattern h-full w-full"></div>
            </div>
            
            <div className="relative z-10 space-y-8">
              {/* Current Time */}
              <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ClockIcon className="h-6 w-6 text-islamic-gold" />
              <h3 className="text-lg font-semibold text-islamic-gold">Current Time</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
              <p className="text-5xl font-bold mb-2 text-islamic-cream">{currentTime}</p>
              <p className="text-islamic-gold text-sm font-medium">Korea Standard Time (KST)</p>
            </div>
              </div>
              
              {/* Islamic Date */}
              <div className="text-center border-t border-white/20 pt-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <CalendarIcon className="h-6 w-6 text-islamic-gold" />
              <h3 className="text-lg font-semibold text-islamic-gold">Islamic Calendar</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <p className="text-2xl font-bold mb-2 text-islamic-cream font-arabic-display text-optimize arabic-features-fancy">
                {new Date().toLocaleDateString('ar-SA-u-ca-islamic', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center">
                  <p className="text-islamic-gold text-xs font-medium">Day</p>
                  <p className="text-xl font-bold">
                {new Date().toLocaleDateString('ar-SA-u-ca-islamic', { day: 'numeric' })}
                  </p>
                </div>
                <div className="text-center border-x border-white/20">
                  <p className="text-islamic-gold text-xs font-medium">Month</p>
                  <p className="text-sm font-bold">
                {new Date().toLocaleDateString('ar-SA-u-ca-islamic', { month: 'long' })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-islamic-gold text-xs font-medium">Year</p>
                  <p className="text-xl font-bold">
                {new Date().toLocaleDateString('ar-SA-u-ca-islamic', { year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/20">
                <p className="text-xs text-islamic-cream opacity-80">
                  Hijri Calendar • Based on Lunar Months
                </p>
              </div>
            </div>
              </div>
            </div>
          </div>

          {/* Modern Qibla Direction */}
          <div className="bg-gradient-to-br from-islamic-white via-islamic-cream/30 to-islamic-white rounded-3xl p-8 shadow-2xl border border-islamic-gold-muted/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="islamic-pattern h-full w-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <GlobeAltIcon className="h-6 w-6 text-islamic-green-light" />
                  <h3 className="text-xl font-bold text-islamic-navy text-readable">Qibla Direction</h3>
                </div>
                <p className="text-base text-gray-600 text-readable">Direction to Makkah Al-Mukarramah</p>
              </div>

              {/* Compass Display */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Outer Ring */}
                  <div className="w-32 h-32 border-4 border-islamic-gold/30 rounded-full relative bg-gradient-to-br from-islamic-cream to-white shadow-inner">
                    {/* Cardinal Points */}
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-islamic-navy">N</div>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-islamic-navy">S</div>
                    <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs font-bold text-islamic-navy">W</div>
                    <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs font-bold text-islamic-navy">E</div>
                    
                    {/* Qibla Needle */}
                    <div className="absolute inset-4 flex items-center justify-center">
                      <div 
                        className="w-16 h-1 bg-gradient-to-r from-islamic-gold-muted via-islamic-gold to-islamic-green-light rounded-full shadow-lg transition-transform duration-1000"
                        style={{ 
                          transform: `rotate(${qiblaDirection.degrees - 180}deg)`,
                          transformOrigin: 'center'
                        }}
                      ></div>
                    </div>
                    
                    {/* Center Dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-islamic-gold rounded-full shadow-md border-2 border-white"></div>
                  </div>
                  
                  {/* Animated Rings */}
                  <div className="absolute inset-0 w-32 h-32 border-2 border-islamic-green/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-2 w-28 h-28 border border-islamic-gold/30 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Direction Info */}
              <div className="bg-islamic-navy/5 rounded-2xl p-4 text-center space-y-3">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-islamic-gold-muted text-readable">{qiblaDirection.degrees}°</p>
                    <p className="text-base text-gray-600 text-readable">Bearing</p>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-islamic-green-light text-readable">{qiblaDirection.direction}</p>
                    <p className="text-base text-gray-600 text-readable">Direction</p>
                  </div>
                  <div className="w-px h-12 bg-gray-300"></div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-islamic-navy text-readable">{qiblaDirection.distance.toLocaleString()}</p>
                    <p className="text-base text-gray-600 text-readable">km</p>
                  </div>
                </div>
                
                {/* Location Status */}
                <div className="pt-3 border-t border-gray-200">
                  {locationPermission === 'default' && (
                    <button
                      onClick={getUserLocation}
                      className="btn-islamic btn-islamic-primary flex items-center space-x-2 mx-auto"
                    >
                      <MapPinIcon className="h-4 w-4" />
                      <span>Use My Location</span>
                    </button>
                  )}
                  
                  {locationPermission === 'requesting' && (
                    <div className="flex items-center justify-center space-x-2 text-islamic-gold-muted">
                      <div className="animate-spin h-4 w-4 border-2 border-islamic-gold-muted border-t-transparent rounded-full"></div>
                      <span className="text-base text-readable">Getting your location...</span>
                    </div>
                  )}
                  
                  {locationPermission === 'granted' && userLocation && (
                    <div className="text-center">
                      <p className="text-base text-islamic-green-light font-medium text-readable">✓ Using your location</p>
                      <p className="text-sm text-gray-500">
                        {userLocation.lat.toFixed(4)}°, {userLocation.lng.toFixed(4)}°
                      </p>
                    </div>
                  )}
                  
                  {locationPermission === 'denied' && (
                    <div className="text-center">
                      <p className="text-base text-alert-orange text-readable">Location access denied</p>
                      <p className="text-xs text-gray-500">Showing default Jeju Island direction</p>
                    </div>
                  )}
                  
                  {locationPermission === 'not-supported' && (
                    <p className="text-sm text-gray-500 text-center">Location not supported by browser</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer Note */}
        <div className="mt-12 text-center">
          <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <MapPinIcon className="h-5 w-5 text-islamic-green" />
              <h4 className="font-semibold text-islamic-navy">Location Information</h4>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Prayer times are calculated for <span className="font-semibold text-islamic-navy">Jeju Island coordinates (33.4996°N, 126.5312°E)</span> 
              using the Islamic Society of North America (ISNA) calculation method with Hanafi school adjustments.
              <br />
              <span className="text-islamic-gold font-medium">Times may vary slightly. Please verify with local mosque announcements for Iqama times.</span>
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
              <span>• Accurate to ±2 minutes</span>
              <span>• Updated daily</span>
              <span>• Korean Standard Time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}