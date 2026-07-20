// Centralized Prayer Times for Central Jeju Mosque
// All prayer times are in KST (Korea Standard Time)

export const CURRENT_PRAYER_TIMES = {
  fajr: '06:00',
  sunrise: '07:15', // Updated based on Fajr time
  dhuhr: '13:05',
  asr: '16:45',
  maghrib: '18:10',
  isha: '20:30',
  jumma: '13:05', // Friday prayer — khutbah begins (13:05–14:00)
}

export const PRAYER_NAMES = {
  fajr: { english: 'Fajr', arabic: 'الفجر' },
  dhuhr: { english: 'Dhuhr', arabic: 'الظهر' },
  asr: { english: 'Asr', arabic: 'العصر' },
  maghrib: { english: 'Maghrib', arabic: 'المغرب' },
  isha: { english: 'Isha', arabic: 'العشاء' },
  jumma: { english: 'Jummah', arabic: 'الجمعة' },
}

export const PRAYERS_LIST = [
  { name: 'Fajr', time: CURRENT_PRAYER_TIMES.fajr, arabic: PRAYER_NAMES.fajr.arabic },
  { name: 'Dhuhr', time: CURRENT_PRAYER_TIMES.dhuhr, arabic: PRAYER_NAMES.dhuhr.arabic },
  { name: 'Asr', time: CURRENT_PRAYER_TIMES.asr, arabic: PRAYER_NAMES.asr.arabic },
  { name: 'Maghrib', time: CURRENT_PRAYER_TIMES.maghrib, arabic: PRAYER_NAMES.maghrib.arabic },
  { name: 'Isha', time: CURRENT_PRAYER_TIMES.isha, arabic: PRAYER_NAMES.isha.arabic },
  { name: 'Jummah', time: CURRENT_PRAYER_TIMES.jumma, arabic: PRAYER_NAMES.jumma.arabic },
]

// Mosque Location for Adhan API
export const MOSQUE_LOCATION = {
  address: "Jeju-do, Jeju-si, 특별자치도, Sancheondandong 2-gil, 15 2층",
  coordinates: {
    latitude: 33.4996,
    longitude: 126.5312
  },
  city: "Jeju",
  country: "South Korea"
};

// Special Friday Prayer (Jummah) Times
export const FRIDAY_PRAYER_TIMES = {
  khutbah: '13:05', // Khutbah begins
  iqama: '13:30',   // Salah follows the khutbah; concludes by 14:00
};

// Monthly prayer schedule for October 2025
export const MONTHLY_PRAYER_SCHEDULE = [
  { date: 'Oct 1', fajr: '05:28', sunrise: '06:56', dhuhr: '12:15', asr: '15:47', maghrib: '18:22', isha: '19:52' },
  { date: 'Oct 5', fajr: '05:32', sunrise: '07:00', dhuhr: '12:15', asr: '15:45', maghrib: '18:18', isha: '19:48' },
  { date: 'Oct 10', fajr: '05:37', sunrise: '07:05', dhuhr: '12:15', asr: '15:42', maghrib: '18:13', isha: '19:43' },
  { date: 'Oct 15', fajr: '05:42', sunrise: '07:10', dhuhr: '12:15', asr: '15:39', maghrib: '18:08', isha: '19:38' },
  { date: 'Oct 18', fajr: '05:30', sunrise: '06:58', dhuhr: '12:15', asr: '15:45', maghrib: '18:20', isha: '19:50' }, // Current
  { date: 'Oct 20', fajr: '05:45', sunrise: '07:13', dhuhr: '12:15', asr: '15:36', maghrib: '18:05', isha: '19:35' },
  { date: 'Oct 25', fajr: '05:50', sunrise: '07:18', dhuhr: '12:15', asr: '15:32', maghrib: '18:00', isha: '19:30' },
  { date: 'Oct 31', fajr: '05:56', sunrise: '07:24', dhuhr: '12:16', asr: '15:28', maghrib: '17:55', isha: '19:25' },
]

// Next prayer calculation helper
export function getNextPrayer(): { name: string; time: string; arabic: string; timeRemaining?: string; isToday?: boolean; isJummah?: boolean } {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  const isFriday = now.getDay() === 5 // Friday = 5
  
  let prayerTimes = [
    { name: 'Fajr', time: CURRENT_PRAYER_TIMES.fajr, arabic: PRAYER_NAMES.fajr.arabic },
    { name: 'Dhuhr', time: CURRENT_PRAYER_TIMES.dhuhr, arabic: PRAYER_NAMES.dhuhr.arabic },
    { name: 'Asr', time: CURRENT_PRAYER_TIMES.asr, arabic: PRAYER_NAMES.asr.arabic },
    { name: 'Maghrib', time: CURRENT_PRAYER_TIMES.maghrib, arabic: PRAYER_NAMES.maghrib.arabic },
    { name: 'Isha', time: CURRENT_PRAYER_TIMES.isha, arabic: PRAYER_NAMES.isha.arabic },
  ]

  // Replace Dhuhr with Jummah on Fridays
  if (isFriday) {
    prayerTimes[1] = { name: 'Jummah', time: CURRENT_PRAYER_TIMES.jumma, arabic: PRAYER_NAMES.jumma.arabic }
  }
  
  for (const prayer of prayerTimes) {
    const [hours, minutes] = prayer.time.split(':').map(Number)
    const prayerTime = hours * 60 + minutes
    
    if (prayerTime > currentTime) {
      const remainingMinutes = prayerTime - currentTime
      const remainingHours = Math.floor(remainingMinutes / 60)
      const remainingMins = remainingMinutes % 60
      
      return {
        ...prayer,
        timeRemaining: remainingHours > 0 
          ? `${remainingHours}h ${remainingMins}m` 
          : `${remainingMins}m`,
        isToday: true,
        isJummah: isFriday && prayer.name === 'Jummah'
      }
    }
  }
  
  // If no prayer is left today, return Fajr for tomorrow
  const tomorrow = prayerTimes[0]
  const [fajrHours, fajrMinutes] = tomorrow.time.split(':').map(Number)
  const fajrTime = fajrHours * 60 + fajrMinutes
  const minutesUntilMidnight = (24 * 60) - currentTime
  const minutesAfterMidnight = fajrTime
  const totalMinutes = minutesUntilMidnight + minutesAfterMidnight
  
  const remainingHours = Math.floor(totalMinutes / 60)
  const remainingMins = totalMinutes % 60
  
  return {
    ...tomorrow,
    timeRemaining: `${remainingHours}h ${remainingMins}m`,
    isToday: false,
    isJummah: false
  }
}