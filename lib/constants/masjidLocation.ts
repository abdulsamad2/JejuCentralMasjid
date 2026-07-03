/**
 * Single source of truth for the masjid address & map links.
 * Update here and the Footer, VisitUs section, Contact page all stay in sync.
 */

export const MASJID_ADDRESS_KO =
  '제주특별자치도 제주시 산천단동 2길 15, 2층 (아라일동)'

export const MASJID_ADDRESS_EN_LINES = [
  'Sancheondandong 2-gil 15, 2F',
  'Jeju-si, Jeju-do',
  'South Korea',
] as const

export const MASJID_ADDRESS_EN = MASJID_ADDRESS_EN_LINES.join(', ')

export const MASJID_COORDS = { lat: 33.4996, lng: 126.5312 } as const

const KO_QUERY = encodeURIComponent(MASJID_ADDRESS_KO)

export const MASJID_MAPS = {
  google: `https://www.google.com/maps/search/?api=1&query=${KO_QUERY}`,
  kakao: `https://map.kakao.com/?q=${KO_QUERY}`,
  naver: `https://map.naver.com/p/search/${KO_QUERY}`,
} as const

export const MASJID_PHONES = [
  { display: '+82 10 4246 9202', tel: '+821042469202' },
  { display: '+82 10 2924 4670', tel: '+821029244670' },
] as const

/** Instant-chat number — reachable on both KakaoTalk and WhatsApp. */
export const MASJID_CHAT_PHONE = { display: '+82 10 4346 9202', tel: '+821043469202' } as const

/** KakaoTalk ID to search & add for instant chat. */
export const MASJID_KAKAO_ID = 'asifsgr97'

export const MASJID_WHATSAPP = `https://wa.me/${MASJID_CHAT_PHONE.tel.replace('+', '')}`
