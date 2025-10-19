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
  const [deviceOrientation, setDeviceOrientation] = useState(0)
  const [compassSupported, setCompassSupported] = useState(false)
  const [isCalibrating, setIsCalibrating] = useState(false)
  const [isAligned, setIsAligned] = useState(false)
  const [lastVibration, setLastVibration] = useState(0)
  const [compassAccuracy, setCompassAccuracy] = useState<number | null>(null)
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
        
        // Try to enable device orientation
        requestDeviceOrientation();
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

  // Request device orientation permission and setup compass
  const requestDeviceOrientation = async () => {
    try {
      // Check if DeviceOrientationEvent is supported
      if (typeof DeviceOrientationEvent !== 'undefined') {
        // For iOS 13+ devices, we need to request permission
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            setCompassSupported(true);
            setupCompass();
          }
        } else {
          // For Android and older iOS devices
          setCompassSupported(true);
          setupCompass();
        }
      }
    } catch (error) {
      console.error('Device orientation not supported:', error);
      setCompassSupported(false);
    }
  };

  // Setup compass listener
  const setupCompass = () => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        // Alpha is the compass heading in degrees (0-360)
        setDeviceOrientation(event.alpha);
        
        // Set compass accuracy if available
        if ((event as any).webkitCompassAccuracy !== undefined) {
          setCompassAccuracy((event as any).webkitCompassAccuracy);
        }
        
        // Check if user is aligned with Qibla (within 5 degrees)
        const relativeQibla = getRelativeQiblaDirection();
        const isCurrentlyAligned = Math.abs(relativeQibla) <= 5 || Math.abs(relativeQibla - 360) <= 5;
        
        // Trigger haptic feedback when aligned
        if (isCurrentlyAligned && !isAligned) {
          triggerHapticFeedback();
          setIsAligned(true);
        } else if (!isCurrentlyAligned) {
          setIsAligned(false);
        }
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    
    // Cleanup function
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  };

  // Trigger haptic feedback for mobile devices
  const triggerHapticFeedback = () => {
    const now = Date.now();
    // Prevent too frequent vibrations
    if (now - lastVibration > 1000) {
      try {
        // Modern Vibration API
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 50, 100]); // Pattern: vibrate-pause-vibrate
        }
        
        // iOS Haptic Feedback (if available)
        if ('haptic' in navigator && 'notification' in (navigator as any).haptic) {
          (navigator as any).haptic.notification({ type: 'success' });
        }
        
        setLastVibration(now);
      } catch (error) {
        console.log('Haptic feedback not available:', error);
      }
    }
  };

  // Calculate the relative Qibla direction based on device orientation
  const getRelativeQiblaDirection = () => {
    if (!compassSupported) return qiblaDirection.degrees;
    
    // Calculate relative direction: Qibla direction - device orientation
    let relativeDegrees = qiblaDirection.degrees - deviceOrientation;
    
    // Normalize to 0-360 range
    if (relativeDegrees < 0) relativeDegrees += 360;
    if (relativeDegrees >= 360) relativeDegrees -= 360;
    
    return relativeDegrees;
  };

  // Get alignment status text
  const getAlignmentStatus = () => {
    if (!compassSupported) return { text: 'Enable compass for live direction', color: 'text-gray-600' };
    
    const relativeQibla = getRelativeQiblaDirection();
    const deviation = Math.min(relativeQibla, 360 - relativeQibla);
    
    if (deviation <= 5) return { text: 'Perfect! You are facing Qibla', color: 'text-islamic-green' };
    if (deviation <= 15) return { text: 'Very close to Qibla direction', color: 'text-yellow-600' };
    if (deviation <= 45) return { text: 'Turn towards the arrow', color: 'text-orange-600' };
    
    // Determine which direction to turn
    const turnDirection = relativeQibla <= 180 ? 'right' : 'left';
    return { text: `Turn ${turnDirection} to find Qibla`, color: 'text-red-600' };
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
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 md:gap-4 mb-12">
          {prayerNames.map((prayer, index) => {
            const isNextPrayer = prayer.name === nextPrayerInfo.name
            const isDayTime = ['Fajr', 'Sunrise', 'Dhuhr', 'Jummah', 'Asr'].includes(prayer.name)
            const Icon = isDayTime ? SunIcon : MoonIcon
            
            return (
              <div 
                key={index}
                className={`relative flex items-center justify-between rounded-2xl transition-all duration-300 shadow-sm ${
                  isNextPrayer 
                    ? 'bg-gradient-to-r from-islamic-green to-islamic-green/90 text-white shadow-lg transform scale-[1.02]' 
                    : 'bg-white hover:shadow-md border border-gray-100/50 hover:border-islamic-green/20'
                } md:flex md:flex-col md:items-center md:justify-center md:text-center p-4 md:p-6`}
              >
                {/* Mobile Layout - Horizontal */}
                <div className="flex items-center space-x-4 md:hidden w-full">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                    isNextPrayer 
                      ? 'bg-white/20' 
                      : 'bg-gradient-to-br from-islamic-green/10 to-islamic-green/5'
                  }`}>
                    <Icon className={`h-8 w-8 ${
                      isNextPrayer ? 'text-white' : 'text-islamic-green'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0 pr-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-bold text-lg leading-tight ${
                            isNextPrayer ? 'text-white' : 'text-islamic-navy'
                          }`}>
                            {prayer.name}
                          </h3>
                          {isNextPrayer && (
                            <span className="bg-white/30 text-white text-xs px-2 py-1 rounded-full font-semibold">
                              Next
                            </span>
                          )}
                        </div>
                        <p className={`text-sm font-arabic-modern leading-tight ${
                          isNextPrayer ? 'text-white/90' : 'text-islamic-green/80'
                        }`}>
                          {prayer.arabic}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 flex flex-col items-end">
                        <p className={`text-2xl font-bold leading-tight mb-0.5 ${
                          isNextPrayer ? 'text-white' : 'text-islamic-navy'
                        }`}>
                          {prayer.time}
                        </p>
                        {isNextPrayer && nextPrayerInfo.timeRemaining && (
                          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                            in {nextPrayerInfo.timeRemaining}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Vertical */}
                <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:text-center relative w-full">
                  <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center ${
                    isNextPrayer 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-islamic-green/10 group-hover:bg-islamic-green/20'
                  } transition-all duration-300`}>
                    <Icon className={`h-8 w-8 ${
                      isNextPrayer 
                        ? 'text-white' 
                        : 'text-islamic-green group-hover:text-islamic-green'
                    }`} />
                  </div>
                  
                  <h3 className={`font-bold text-xl mb-2 ${
                    isNextPrayer ? 'text-white' : 'text-islamic-navy group-hover:text-islamic-gold'
                  } transition-colors duration-300`}>
                    {prayer.name}
                  </h3>
                  
                  <p className={`text-sm font-arabic-modern mb-3 arabic-features ${
                    isNextPrayer ? 'text-white/90' : 'text-islamic-green'
                  }`}>
                    {prayer.arabic}
                  </p>
                  
                  <p className={`text-3xl font-bold mb-2 ${
                    isNextPrayer ? 'text-white' : 'text-islamic-navy'
                  }`}>
                    {prayer.time}
                  </p>
                  
                  {isNextPrayer && (
                    <div className="animate-pulse flex flex-col items-center">
                      <p className="text-sm text-white/90 font-semibold bg-white/20 rounded-full px-3 py-1">
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
              </div>
            )
          })}
        </div>

        {/* Enhanced Info Panel */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 mb-12">
          {/* Current Time & Islamic Date */}
          <div className="bg-gradient-to-r from-islamic-navy to-islamic-navy/90 rounded-2xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="islamic-pattern h-full w-full"></div>
            </div>
            
            <div className="relative z-10 space-y-6 lg:space-y-8">
              {/* Current Time */}
              <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3 lg:mb-4">
              <ClockIcon className="h-5 w-5 lg:h-6 lg:w-6 text-islamic-gold" />
              <h3 className="text-base lg:text-lg font-semibold text-islamic-gold">Current Time</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
              <p className="text-5xl font-bold mb-2 text-islamic-cream">{currentTime}</p>
              <p className="text-islamic-gold text-sm font-medium">Korea Standard Time (KST)</p>
            </div>
              </div>
              
              {/* Islamic Date */}
              <div className="text-center border-t border-white/20 pt-4 lg:pt-6">
            <div className="flex items-center justify-center space-x-2 mb-3 lg:mb-4">
              <CalendarIcon className="h-5 w-5 lg:h-6 lg:w-6 text-islamic-gold" />
              <h3 className="text-base lg:text-lg font-semibold text-islamic-gold">Islamic Calendar</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 lg:p-6">
              <p className="text-lg lg:text-2xl font-bold mb-2 lg:mb-2 text-islamic-cream font-arabic-display text-optimize arabic-features-fancy">
                {new Date().toLocaleDateString('ar-SA-u-ca-islamic', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <div className="grid grid-cols-3 gap-2 lg:gap-3 mt-3 lg:mt-4">
                <div className="text-center">
                  <p className="text-islamic-gold text-xs font-medium">Day</p>
                  <p className="text-lg lg:text-xl font-bold">
                {new Date().toLocaleDateString('ar-SA-u-ca-islamic', { day: 'numeric' })}
                  </p>
                </div>
                <div className="text-center border-x border-white/20">
                  <p className="text-islamic-gold text-xs font-medium">Month</p>
                  <p className="text-xs lg:text-sm font-bold">
                {new Date().toLocaleDateString('ar-SA-u-ca-islamic', { month: 'long' })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-islamic-gold text-xs font-medium">Year</p>
                  <p className="text-lg lg:text-xl font-bold">
                {new Date().toLocaleDateString('ar-SA-u-ca-islamic', { year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="mt-3 lg:mt-4 pt-2 lg:pt-3 border-t border-white/20">
                <p className="text-xs text-islamic-cream opacity-80">
                  Hijri Calendar • Based on Lunar Months
                </p>
              </div>
            </div>
              </div>
            </div>
          </div>

          {/* Android-Style Qibla Direction */}
          <div className="bg-gradient-to-br from-white via-islamic-cream/30 to-white rounded-3xl p-4 lg:p-8 shadow-xl border border-islamic-gold/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="islamic-pattern h-full w-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-4 lg:mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2 lg:mb-4">
                  <GlobeAltIcon className="h-6 w-6 text-islamic-green" />
                  <h3 className="text-xl lg:text-2xl font-bold text-islamic-navy">Qibla Compass</h3>
                </div>
                <p className="text-sm lg:text-base text-gray-600 mb-3">Point your device towards Makkah Al-Mukarramah</p>
                
                {/* Status Indicators */}
                <div className="flex justify-center space-x-2 mb-3">
                  {compassSupported && (
                    <div className="inline-flex items-center space-x-2 bg-islamic-green/10 rounded-full px-3 py-1">
                      <div className={`w-2 h-2 rounded-full ${isAligned ? 'bg-islamic-green animate-pulse' : 'bg-yellow-500'}`}></div>
                      <span className="text-xs font-medium text-islamic-green">Live Compass</span>
                    </div>
                  )}
                  {isAligned && (
                    <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-3 py-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                      <span className="text-xs font-bold text-green-700">ALIGNED!</span>
                    </div>
                  )}
                </div>
                
                {/* Alignment Status */}
                <div className="mb-4">
                  <p className={`text-sm font-semibold ${getAlignmentStatus().color}`}>
                    {getAlignmentStatus().text}
                  </p>
                  {compassSupported && (
                    <p className="text-xs text-gray-500 mt-1">
                      Device: {Math.round(deviceOrientation)}° | Relative: {Math.round(getRelativeQiblaDirection())}°
                    </p>
                  )}
                </div>
              </div>

              {/* Mobile-Optimized Compass Display */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Main Compass Ring */}
                  <div className={`w-56 h-56 lg:w-64 lg:h-64 border-4 rounded-full relative bg-gradient-to-br from-islamic-cream to-white shadow-2xl transition-all duration-300 ${
                    isAligned ? 'border-islamic-green shadow-islamic-green/30' : 'border-islamic-gold/30'
                  }`}>
                    {/* Compass Rings */}
                    <div className="absolute inset-2 rounded-full border border-islamic-gold/20"></div>
                    <div className="absolute inset-4 rounded-full border border-islamic-gold/10"></div>
                    <div className="absolute inset-8 rounded-full border border-islamic-gold/5"></div>
                    
                    {/* Cardinal Points */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-islamic-navy bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-islamic-gold/30">N</div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-islamic-navy bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-islamic-gold/30">S</div>
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm font-bold text-islamic-navy bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-islamic-gold/30">W</div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-bold text-islamic-navy bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-islamic-gold/30">E</div>
                    
                    {/* Qibla Arrow with Kaaba Symbol */}
                    <div className="absolute inset-8 flex items-center justify-center">
                      <div 
                        className={`relative w-24 h-3 transition-transform duration-300 ${
                          isAligned ? 'animate-pulse' : ''
                        }`}
                        style={{ 
                          transform: `rotate(${compassSupported ? getRelativeQiblaDirection() : qiblaDirection.degrees - 180}deg)`,
                          transformOrigin: 'center'
                        }}
                      >
                        {/* Arrow Base */}
                        <div className={`w-20 h-3 rounded-full shadow-lg transition-colors duration-300 ${
                          isAligned 
                            ? 'bg-gradient-to-r from-transparent via-islamic-green to-islamic-green' 
                            : 'bg-gradient-to-r from-transparent via-islamic-gold to-islamic-gold'
                        }`}></div>
                        
                        {/* Kaaba Symbol at arrow tip */}
                        <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-sm shadow-lg flex items-center justify-center transition-colors duration-300 ${
                          isAligned ? 'bg-islamic-green' : 'bg-islamic-gold'
                        }`}>
                          {/* Kaaba representation */}
                          <div className="w-3 h-3 bg-white rounded-sm border border-gray-200 relative">
                            <div className="absolute inset-0.5 bg-gray-800 rounded-sm"></div>
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-islamic-gold rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Arrow pointer */}
                        <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-0 h-0 transition-colors duration-300 ${
                          isAligned 
                            ? 'border-l-4 border-l-islamic-green border-t-2 border-t-transparent border-b-2 border-b-transparent'
                            : 'border-l-4 border-l-islamic-gold border-t-2 border-t-transparent border-b-2 border-b-transparent'
                        }`}></div>
                      </div>
                    </div>
                    
                    {/* Center Circle with Compass Rose */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border-4 border-islamic-gold flex items-center justify-center">
                      <div className="text-xs font-bold text-islamic-navy">قبلة</div>
                    </div>
                    
                    {/* Device Orientation Indicator (for mobile) */}
                    {compassSupported && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-8 h-8 border-3 border-blue-500 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <div className="w-2 h-4 bg-blue-500 rounded-full"></div>
                        </div>
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-xs text-blue-600 font-medium">YOU</div>
                      </div>
                    )}
                    
                    {/* Alignment Glow Effect */}
                    {isAligned && (
                      <div className="absolute inset-0 rounded-full bg-islamic-green/10 animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Animated Rings */}
                  <div className={`absolute inset-0 w-56 h-56 lg:w-64 lg:h-64 border-2 rounded-full animate-ping transition-colors duration-300 ${
                    isAligned ? 'border-islamic-green/30' : 'border-islamic-gold/20'
                  }`}></div>
                  <div className={`absolute inset-4 w-48 h-48 lg:w-56 lg:h-56 border rounded-full animate-pulse transition-colors duration-300 ${
                    isAligned ? 'border-islamic-green/20' : 'border-islamic-gold/30'
                  }`}></div>
                </div>
              </div>

              {/* Android-Style Direction Info */}
              <div className="space-y-4">
                {/* Mobile Instructions */}
                {compassSupported && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200 lg:hidden">
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <span className="font-semibold text-blue-800">How to use:</span>
                      </div>
                      <p className="text-sm text-blue-700">Hold your phone flat and rotate until the Kaaba symbol points towards you. When aligned, your device will vibrate!</p>
                    </div>
                  </div>
                )}

                {/* Primary Info Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className={`rounded-2xl p-4 text-center border transition-all duration-300 ${
                    isAligned 
                      ? 'bg-gradient-to-br from-islamic-green/20 to-islamic-green/10 border-islamic-green/30 shadow-lg' 
                      : 'bg-gradient-to-br from-islamic-gold/10 to-islamic-gold/5 border-islamic-gold/20'
                  }`}>
                    <p className={`text-2xl lg:text-3xl font-bold mb-1 transition-colors duration-300 ${
                      isAligned ? 'text-islamic-green' : 'text-islamic-gold'
                    }`}>{qiblaDirection.degrees}°</p>
                    <p className="text-xs lg:text-sm text-gray-600 font-medium">Qibla Bearing</p>
                  </div>
                  <div className={`rounded-2xl p-4 text-center border transition-all duration-300 ${
                    isAligned 
                      ? 'bg-gradient-to-br from-islamic-green/20 to-islamic-green/10 border-islamic-green/30 shadow-lg' 
                      : 'bg-gradient-to-br from-islamic-green/10 to-islamic-green/5 border-islamic-green/20'
                  }`}>
                    <p className={`text-2xl lg:text-3xl font-bold mb-1 transition-colors duration-300 ${
                      isAligned ? 'text-islamic-green' : 'text-islamic-green'
                    }`}>{qiblaDirection.direction}</p>
                    <p className="text-xs lg:text-sm text-gray-600 font-medium">Direction</p>
                  </div>
                  <div className="bg-gradient-to-br from-islamic-navy/10 to-islamic-navy/5 rounded-2xl p-4 text-center border border-islamic-navy/20">
                    <p className="text-lg lg:text-xl font-bold text-islamic-navy mb-1">{qiblaDirection.distance.toLocaleString()}</p>
                    <p className="text-xs lg:text-sm text-gray-600 font-medium">km away</p>
                  </div>
                </div>

                {/* Compass Status */}
                {compassSupported && (
                  <div className={`rounded-2xl p-4 border transition-all duration-300 ${
                    isAligned 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isAligned ? 'bg-green-500' : 'bg-blue-500'
                        }`}>
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <p className={`font-semibold transition-colors duration-300 ${
                            isAligned ? 'text-green-800' : 'text-blue-800'
                          }`}>
                            {isAligned ? 'Perfect Alignment!' : 'Device Compass Active'}
                          </p>
                          <p className={`text-sm transition-colors duration-300 ${
                            isAligned ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            Device: {Math.round(deviceOrientation)}°
                            {compassAccuracy && ` | Accuracy: ±${compassAccuracy}°`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm transition-colors duration-300 ${
                          isAligned ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {isAligned ? 'Facing Qibla' : 'Relative Qibla'}
                        </p>
                        <p className={`text-lg font-bold transition-colors duration-300 ${
                          isAligned ? 'text-green-800' : 'text-blue-800'
                        }`}>
                          {Math.round(getRelativeQiblaDirection())}°
                        </p>
                      </div>
                    </div>
                    {isAligned && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <p className="text-center text-sm text-green-700 font-medium">
                          🕋 You are now facing the Holy Kaaba in Makkah
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Location & Enable Buttons */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                  {locationPermission === 'default' && (
                    <button
                      onClick={getUserLocation}
                      className="w-full bg-gradient-to-r from-islamic-green to-islamic-green/90 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 font-semibold text-lg"
                    >
                      <MapPinIcon className="h-6 w-6" />
                      <span>Enable Location & Compass</span>
                    </button>
                  )}
                  
                  {locationPermission === 'requesting' && (
                    <div className="flex items-center justify-center space-x-3 text-islamic-gold py-3">
                      <div className="animate-spin h-6 w-6 border-3 border-islamic-gold border-t-transparent rounded-full"></div>
                      <span className="font-medium text-lg">Getting your location...</span>
                    </div>
                  )}
                  
                  {locationPermission === 'granted' && userLocation && (
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 bg-islamic-green rounded-full animate-pulse"></div>
                        <p className="font-semibold text-islamic-green text-lg">Location & Compass Active</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        📍 {userLocation.lat.toFixed(4)}°, {userLocation.lng.toFixed(4)}°
                      </p>
                      <p className="text-xs text-gray-500">
                        Distance to Makkah: {qiblaDirection.distance.toLocaleString()} km
                      </p>
                      {!compassSupported && (
                        <button
                          onClick={requestDeviceOrientation}
                          className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium"
                        >
                          Enable Live Compass
                        </button>
                      )}
                    </div>
                  )}
                  
                  {locationPermission === 'denied' && (
                    <div className="text-center space-y-3">
                      <p className="font-medium text-red-600 text-lg">Location Access Denied</p>
                      <p className="text-sm text-gray-500">Showing default Jeju Island direction to Qibla</p>
                      <button
                        onClick={getUserLocation}
                        className="text-islamic-green hover:underline font-medium"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                  
                  {locationPermission === 'not-supported' && (
                    <div className="text-center">
                      <p className="text-gray-500">Location services not supported by your browser</p>
                      <p className="text-sm text-gray-400 mt-1">Showing default direction for Jeju Island</p>
                    </div>
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