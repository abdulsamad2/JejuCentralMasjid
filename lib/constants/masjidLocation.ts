/**
 * Single source of truth for the masjid address & map links.
 * Update here and the Footer, VisitUs section, Contact page all stay in sync.
 */

/** Canonical names. Use these everywhere so listings stay byte-identical. */
export const MASJID_NAME_EN = 'Jeju Central Masjid'
export const MASJID_NAME_KO = '제주 이슬람 사원'
/** Transliterated form — secondary, kept for search coverage only. */
export const MASJID_NAME_KO_ALT = '제주 중앙 마스지드'
/**
 * NH NongHyup account holder name — must match the bank record exactly.
 * Unspaced and NOT interchangeable with MASJID_NAME_KO; do not "fix" it.
 */
export const MASJID_BANK_ACCOUNT_NAME = '제주중앙마스지드'

export const MASJID_ADDRESS_KO =
  '제주특별자치도 제주시 산천단동 2길 15, 2층 (아라일동)'

export const MASJID_ADDRESS_EN_LINES = [
  'Sancheondandong 2-gil 15, 2F',
  'Jeju-si, Jeju-do',
  'South Korea',
] as const

export const MASJID_ADDRESS_EN = MASJID_ADDRESS_EN_LINES.join(', ')

/** Verified against the Google Maps listing (near the JNU back gate). */
export const MASJID_COORDS = { lat: 33.449313, lng: 126.558229 } as const

/** Google Maps place ID for "Jeju Central Masjid", as a decimal CID. */
export const MASJID_GOOGLE_CID = '15156272360544769526'

/** Kakao Map place ID for 제주 중앙 마스지드. */
export const MASJID_KAKAO_PLACE_ID = '890609743'

const KO_QUERY = encodeURIComponent(MASJID_ADDRESS_KO)

export const MASJID_MAPS = {
  // Link to the claimed listings by place ID rather than an address search — a
  // text search can land visitors on one of the other Jeju prayer locations.
  google: `https://maps.google.com/?cid=${MASJID_GOOGLE_CID}`,
  kakao: `https://place.map.kakao.com/${MASJID_KAKAO_PLACE_ID}`,
  // TODO: replace with the Naver place URL once the SmartPlace listing is live.
  naver: `https://map.naver.com/p/search/${KO_QUERY}`,
} as const

export const MASJID_PHONES = [
  { display: '+82 10 4246 9202', tel: '+821042469202' },
  { display: '+82 10 2924 4670', tel: '+821029244670' },
] as const

/** Instant-chat number — reachable on both KakaoTalk and WhatsApp. */
export const MASJID_CHAT_PHONE = MASJID_PHONES[0]

/** KakaoTalk ID to search & add for instant chat. */
export const MASJID_KAKAO_ID = 'asifsgr97'

/**
 * KakaoTalk 1:1 Open Chat link — direct click-to-chat like WhatsApp.
 * Create in the KakaoTalk app: 채팅 탭 → 말풍선+ → 오픈채팅 → 1:1 채팅 →
 * name it "제주 중앙 마스지드" → share → copy link (open.kakao.com/o/…).
 * Paste it here and the floating chat widget switches to direct chat.
 */
export const MASJID_KAKAO_OPENCHAT = ''

export const MASJID_WHATSAPP = `https://wa.me/${MASJID_CHAT_PHONE.tel.replace('+', '')}`
