// Adhan API Service for fetching prayer times
// Location: Jeju-do, Jeju-si, South Korea

export interface AdhanPrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  sunset: string;
  maghrib: string;
  isha: string;
  imsak: string;
  midnight: string;
  firstthird: string;
  lastthird: string;
}

export interface AdhanResponse {
  code: number;
  status: string;
  data: {
    timings: AdhanPrayerTimes;
    date: {
      readable: string;
      timestamp: string;
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
        };
        year: string;
        designation: {
          abbreviated: string;
          expanded: string;
        };
        holidays: string[];
      };
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
        };
        month: {
          number: number;
          en: string;
        };
        year: string;
        designation: {
          abbreviated: string;
          expanded: string;
        };
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: any;
        location: {
          latitude: number;
          longitude: number;
        };
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: any;
    };
  };
}

// Jeju coordinates
const JEJU_COORDINATES = {
  latitude: 33.4996,
  longitude: 126.5312,
  city: 'Jeju',
  country: 'South Korea'
};

// Adhan API base URL
const ADHAN_API_BASE = 'https://api.aladhan.com/v1';

/**
 * Fetch current day prayer times for Jeju location
 */
export async function fetchTodayPrayerTimes(): Promise<AdhanPrayerTimes | null> {
  try {
    const { latitude, longitude } = JEJU_COORDINATES;
    const url = `${ADHAN_API_BASE}/timings?latitude=${latitude}&longitude=${longitude}&method=2&school=0`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: AdhanResponse = await response.json();
    
    if (data.code === 200 && data.data?.timings) {
      return data.data.timings;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error fetching prayer times from Adhan API:', error);
    return null;
  }
}

/**
 * Fetch prayer times for a specific date
 */
export async function fetchPrayerTimesForDate(date: Date): Promise<AdhanPrayerTimes | null> {
  try {
    const { latitude, longitude } = JEJU_COORDINATES;
    const timestamp = Math.floor(date.getTime() / 1000);
    const url = `${ADHAN_API_BASE}/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=2&school=0`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: AdhanResponse = await response.json();
    
    if (data.code === 200 && data.data?.timings) {
      return data.data.timings;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error fetching prayer times for date:', error);
    return null;
  }
}

/**
 * Fetch monthly prayer times calendar
 */
export async function fetchMonthlyPrayerTimes(year: number, month: number): Promise<AdhanResponse[] | null> {
  try {
    const { latitude, longitude } = JEJU_COORDINATES;
    const url = `${ADHAN_API_BASE}/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2&school=0`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.code === 200 && data.data) {
      return data.data;
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error fetching monthly prayer times:', error);
    return null;
  }
}

/**
 * Convert 24-hour time to 12-hour format
 */
export function convertTo12Hour(time24: string): string {
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

/**
 * Get Adhan player URL for Jeju
 */
export function getAdhanPlayerUrl(): string {
  return 'https://aladhan.com/play/Jeju/South%20Korea';
}

/**
 * Get Adhan calendar URL for Jeju
 */
export function getAdhanCalendarUrl(): string {
  return 'https://aladhan.com/calendar/Jeju/South%20Korea';
}

/**
 * Get Ramadan calendar URL for current year
 */
export function getRamadanCalendarUrl(year?: number): string {
  const currentYear = year || new Date().getFullYear();
  return `https://aladhan.com/ramadan-calendar/${currentYear}`;
}