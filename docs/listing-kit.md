# Jeju Central Masjid — Listing & Directory Kit

Copy-paste data for every directory submission. **Use these exact values
everywhere** — consistent name/address/phone is itself a ranking signal.

## Core data (NAP)

| Field | Value |
|---|---|
| Name (EN) | Jeju Central Masjid |
| Name (KO) | 제주 이슬람 사원 |
| Name (KO, alt) | 제주 중앙 마스지드 (secondary — search coverage only) |
| Category | Mosque / 이슬람 사원 (religious organization) |
| Address (EN) | Sancheondandong 2-gil 15, 2F, Jeju-si, Jeju-do 63243, South Korea |
| Postal code | 63243 |
| Address (KO) | 제주특별자치도 제주시 산천단동 2길 15, 2층 (아라일동) |
| Coordinates | 33.449313, 126.558229 |
| Google Maps listing | https://maps.google.com/?cid=15156272360544769526 |
| Kakao Map listing | https://place.map.kakao.com/890609743 |
| Phone | +82 10-4246-9202 |
| Email | info@jejucentralmasjid.kr |
| Website | https://jejucentralmasjid.kr |
| Hours | Open 24 hours, 7 days |
| Jummah | Every Friday 13:05–14:00 |
| Instagram | https://www.instagram.com/jejucentralmasjid/ |
| Facebook | https://www.facebook.com/JejuCentralMasjid |

## Short description (EN) — for directory "about" fields

> Jeju Central Masjid is the community mosque of Jeju Island, South Korea,
> open 24/7 for the five daily prayers with Jummah every Friday (13:05).
> The masjid has separate prayer spaces for brothers and sisters, a
> multilingual Islamic library (Korean, English, Urdu, Bangla, Uzbek,
> Turkish), daily children's Qur'an classes, and a warm welcome for
> travelers, students, and anyone curious about Islam.

## Short description (KO)

> 제주 이슬람 사원(제주 중앙 마스지드)은 제주도의 이슬람 사원입니다. 연중무휴 24시간 개방하며
> 하루 다섯 번의 예배와 매주 금요일 오후 1시 5분 주무아(금요 합동 예배)가
> 열립니다. 남녀 예배 공간이 분리되어 있으며, 한국어 도서를 포함한 다국어
> 이슬람 도서관을 운영합니다. 여행객과 방문객 모두 환영합니다.

## Naver SmartPlace 제출용 (Korean submission pack)

**업체명**: 제주 이슬람 사원 (Jeju Central Masjid)
**업종/카테고리**: 종교시설 → 이슬람교 사원 (모스크)
**대표 키워드 (5개)**: 제주 모스크 · 제주 이슬람 사원 · 제주 무슬림 · 기도실 · 할랄

**소개글 (상세 설명):**

> 제주 이슬람 사원(제주 중앙 마스지드)은 제주도의 이슬람 사원(모스크)입니다.
>
> 연중무휴 24시간 개방되며, 하루 다섯 번의 예배가 진행되고 매주 금요일
> 오후 1시 5분에는 주무아(금요 합동 예배)가 열립니다. 남성과 여성을 위한
> 예배 공간이 분리되어 있습니다.
>
> 한국어·영어·우르두어·방글라어·우즈베크어·터키어 도서를 갖춘 다국어
> 이슬람 도서관을 운영하며, 매일 저녁(마그립 예배 이후) 어린이 꾸란 교실이
> 열립니다. 라마단 기간에는 매일 이프타르(공동 저녁 식사)를 함께합니다.
>
> 무슬림뿐만 아니라 이슬람이 궁금한 분, 견학을 원하시는 분 모두 언제나
> 환영합니다. 제주 여행 중인 무슬림 여행객을 위한 할랄 음식 안내도
> 도와드립니다. 방문 전 전화 또는 카카오톡/WhatsApp(+82 10-4246-9202)으로
> 연락 주시면 친절히 안내해 드리겠습니다.
>
> 홈페이지: https://jejucentralmasjid.kr

**찾아오시는 길:**

> 제주시 아라일동 산천단동 2길에 위치해 있으며, 회색 3층 건물의 2층입니다.
> 건물 2층 창문에 "Welcome to Jeju Central Masjid" 다국어 안내판이 보입니다.

**영업시간**: 매일 00:00–24:00 (연중무휴)

## Photos to upload (already on the site)

- Exterior: `public/assets/masjid-exterior-front.jpg` (required by Mawaqit)
- Exterior street view: `public/assets/masjid-exterior-street.jpg`
- Interior/prayer: `public/assets/five-time-prayer-01.jpeg`
- Library: `public/assets/library-shelves.jpg`

## Data corrections already applied

Both blockers are resolved — the NAP above is now safe to copy everywhere.

- **Coordinates.** `33.449313, 126.558229`, verified against the Google
  Maps listing (near the JNU back gate). The site previously shipped
  `33.4996, 126.5312`, which is Jeju city centre, about 6 km off.
- **Phone.** `MASJID_CHAT_PHONE` carried `+82 10-4346-9202`, one digit off
  from the real number. It now derives from `MASJID_PHONES[0]`, so the
  WhatsApp and KakaoTalk links can't drift from the published number again.

**Good news: neither bad value escaped.** A sweep of the live directories
(2026-07-25) found no third-party listing carrying `33.4996, 126.5312` or
`4346`. The wrong pin never propagated — it only ever existed in our own
code. Nothing needs retracting.

## Live listing audit — 2026-07-25

What's actually out there, as opposed to what the tracker assumed.

**Already listed, needs correcting (do these first — wrong data already
in front of travellers):**

- **Salam Jeju** — https://salamjeju.com/en/muslim-guide/musallas/jeju-central-masjid
  Coordinates are right, but it lists **Jummah 12:30** (ours is 13:05) and
  gives the contact email as **islamjeju@daum.net** — that address belongs
  to the *Jeju Islamic Center*, a different organisation. The listing also
  carries no website link. Ask for all three to be fixed.
- **TripAdvisor** — https://www.tripadvisor.com/Attraction_Review-g297885-d27972455-Reviews-Jeju_Central_Masjid-Jeju_Jeju_Island.html
  Exists already, 5.0 from 1 review, ranked #111 of 216 things to do in
  Jeju. Address and postal code correct; **no phone, no website, no hours,
  unclaimed**. Claim it rather than creating a new one.
- **Kakao Map** — listed as **제주센트럴마스지드**, a transliteration, not our
  canonical **제주 이슬람 사원**. Fix on claiming, or every Korean-language
  aggregator inherits the wrong name.
- **Have Halal Will Travel** — a Jeju Central Masjid listing already
  exists. Email B below assumes it doesn't — rewrite it as a correction
  request plus the story pitch.

**Genuinely empty — greenfield, no competing entry:**

- **OpenStreetMap** — nothing. Searches for both "mosque Jeju" and
  "제주 이슬람" return zero results. Item #4 is a clean first edit.
- **IslamicFinder** — Jeju City shows *"Be the first to add an Islamic
  place in this area."* Item #11 is uncontested.

**Occupied by the wrong mosque — these need a correction request, not a
submission:**

- **Wikipedia** lists two Jeju entities, *Jeju Rahman Mosque* and *Jeju
  Islamic Cultural Centre*, and neither is us. A reader concludes those are
  Jeju's mosques.
- **KTO / VisitKorea** presents *Jeju Islamic Center* (정한 오피스텔 1208,
  42 Noyeon-ro) as Jeju's mosque and permanent prayer room.
- **HalalTrip** lists *Jeju Islamic Cultural Center* — as email A assumes.

**Confirmed:** postal code **63243**, from the Mawaqit slug and the
TripAdvisor listing independently.

## Submission tracker

Work top to bottom — the first five are worth more than the rest combined.
All free. "KR ID" = needs a Korean phone number or resident/business ID.

| # | Listing | KR ID | Status |
|---|---|---|---|
| 1 | Google Business Profile — https://business.google.com (category: Mosque) | No | ☐ |
| 2 | Naver SmartPlace — https://smartplace.naver.com (pack above) | Yes | ☐ |
| 3 | Kakao Map — listing exists; **claim** it at https://business.kakao.com and check the pin, hours, phone | Helps | ◐ |
| 4 | OpenStreetMap — tag block below (**verified empty — greenfield**) | No | ☐ |
| 5 | Apple Business Connect — https://businessconnect.apple.com | No | ☐ |
| 6 | Bing Places — https://www.bingplaces.com (imports from GBP) | No | ☐ |
| 7 | Wikidata — item block below | No | ☐ |
| 8 | Waze — https://www.waze.com/editor (add as a Place) | No | ☐ |
| 9 | Mawaqit — complete the existing profile (photos, site, iqama) | No | ☐ |
| 10 | Salatomatic / Zabihah — https://www.salatomatic.com ("Add a Listing") | No | ☐ |
| 11 | IslamicFinder — https://www.islamicfinder.org/places/ (**Jeju is empty**) | No | ☐ |
| 12 | HalalTrip — email A below | No | ☐ |
| 13 | Have Halal Will Travel — listing **exists**; correct it, then pitch a story | No | ◐ |
| 14 | Halal Navi — https://www.halalnavi.com | No | ☐ |
| 15 | Korea Muslim Federation — email C below | Helps | ☐ |
| 16 | Wikipedia — Talk page request (see note) | No | ☐ |
| 17 | Prayer-time apps — automatic via #1 + #4, no forms to chase | — | ☐ |
| 18 | KTO Muslim-Friendly Korea — contact directly, write in Korean | Helps | ☐ |
| 19 | Visit Jeju — https://www.visitjeju.net | Helps | ☐ |
| 20 | Jeju Tourism Organization — ask about Muslim-traveller resources | Helps | ☐ |
| 21 | TripAdvisor — listing **exists** (d27972455); claim it, add phone/site/hours | No | ◐ |
| 22 | Foursquare — https://foursquare.com/venue/claim | No | ☐ |
| 23 | Jeju 외국인주민지원센터 / immigration community pages | Helps | ☐ |
| 24 | Jeju National University international office (orientation guide) | Helps | ☐ |
| 25 | Website link in Instagram bio + Facebook page "About" | No | ☐ |

### #4 — OpenStreetMap tag block

The single highest-leverage entry after Google. Muslim Pro, Athan, Qibla
Finder, Organic Maps, Maps.me and most prayer-time apps ingest from OSM —
one edit here reaches apps we would otherwise have to petition one by one.

```
amenity=place_of_worship
religion=muslim
denomination=sunni
name=제주 이슬람 사원
name:en=Jeju Central Masjid
name:ko=제주 이슬람 사원
name:ar=مسجد جيجو المركزي
building:levels=3
level=1
website=https://jejucentralmasjid.kr/
phone=+82 10-4246-9202
opening_hours=24/7
service_times=Fr 13:05
addr:full=제주특별자치도 제주시 산천단동 2길 15, 2층
addr:city=제주시
addr:province=제주특별자치도
addr:postcode=63243
addr:country=KR
wheelchair=no
female_prayer_room=yes
```

`level=1` is correct for the 2nd floor — OSM floor numbering is
zero-indexed, so Korean 2층 is `level=1`. Set `wheelchair` to
`yes`/`limited` if that's actually accurate.

### #7 — Wikidata item

Feeds knowledge panels, Wikipedia infoboxes, and a long tail of search and
AI systems. Underrated for the effort involved.

| Property | Value |
|---|---|
| instance of (P31) | mosque (Q32815) |
| coordinate location (P625) | 33.449313, 126.558229 |
| official website (P856) | https://jejucentralmasjid.kr/ |
| country (P17) | South Korea (Q884) |
| located in (P131) | Jeju City |

### #16 — Wikipedia (do **not** edit this one directly)

https://en.wikipedia.org/wiki/List_of_mosques_in_South_Korea

Editing our own entry is a conflict of interest under Wikipedia policy and
will likely be reverted. Instead, post on the article's **Talk page**,
disclose the connection, and request the addition citing independent
sources. Do #15 (Korea Muslim Federation) first so there's something
citable to point at.

### #15 — note on the Korea Muslim Federation

Their existing Jeju entry is the old Jeju Islamic Center in Nohyeong-dong,
not us. Ask both to be added *and* to have the outdated entry corrected.
Being on the KMF list is what gets us cited by journalists, Wikipedia, and
government tourism pages downstream — worth a phone call, not just email C.

### #18 — note on KTO

KTO maintains a 100+ entry prayer-facility list
(https://english.visitkorea.or.kr/enu/ATR/SI_ENG_prayerList.jsp) with no
public submission form — contact them directly, in Korean if possible.
Lead with: main congregational mosque on Jeju, 24/7 access, separate
facilities for women, already receiving Korean visitors for tours. They
also distribute free prayer mats and Qibla compasses to listed facilities
— worth asking.

## Ready-to-send emails (send from info@jejucentralmasjid.kr)

### A) HalalTrip — via https://www.halaltrip.com contact/feedback form

Subject: Update Jeju mosque listing — Jeju Central Masjid

> Assalamu alaikum HalalTrip team,
>
> We run Jeju Central Masjid, the community mosque of Jeju Island, South
> Korea. Your Jeju city guide currently lists the "Jeju Islamic Cultural
> Center" — could you please add or update the listing to Jeju Central
> Masjid with our current details?
>
> Name: Jeju Central Masjid (제주 이슬람 사원)
> Address: Sancheondandong 2-gil 15, 2F, Jeju-si, Jeju-do, South Korea
> Hours: open 24/7 · Jummah Fridays 13:05
> Website: https://jejucentralmasjid.kr
> Phone/WhatsApp: +82 10-4246-9202
>
> The masjid welcomes Muslim travelers daily and has separate prayer
> spaces for men and women. Photos are available on our website or on
> request. JazakAllah khair for helping travelers find us.
>
> Jeju Central Masjid committee

### B) Have Halal Will Travel — hello@havehalalwilltravel.com (or site contact form)

Subject: Jeju mosque details for your Jeju halal travel guide

> Assalamu alaikum HHWT team,
>
> Thank you for your Jeju halal travel guide — many visitors find us
> through articles like yours. We'd love the guide to include the
> island's mosque with current details:
>
> Jeju Central Masjid (제주 이슬람 사원)
> Sancheondandong 2-gil 15, 2F, Jeju-si · open 24/7 · Jummah Fri 13:05
> https://jejucentralmasjid.kr · WhatsApp +82 10-4246-9202
>
> We're glad to answer questions or provide photos for the article.
>
> JazakAllah khair,
> Jeju Central Masjid committee

### C) Korea Muslim Federation (한국이슬람교중앙회) — via koreaislam.org contact

Subject: 제주 이슬람 사원 등록 요청 / Jeju mosque listing request

> Assalamu alaikum,
>
> We are the committee of Jeju Central Masjid (제주 이슬람 사원), serving
> the Muslim community of Jeju Island with daily prayers, Jummah, and
> community programs. We would be honored to be included in KMF's list of
> mosques and musallas in Korea.
>
> Address: 제주특별자치도 제주시 산천단동 2길 15, 2층
> Website: https://jejucentralmasjid.kr
> Phone: +82 10-4246-9202 · Email: info@jejucentralmasjid.kr
>
> JazakAllah khair.

### D) Salam Jeju — correction request (send this first)

Their listing currently shows the wrong Jummah time and another mosque's
email address, so travellers are being misdirected today.

Subject: Correction for your Jeju Central Masjid listing

> Assalamu alaikum Salam Jeju team,
>
> JazakAllah khair for listing us in your Muslim guide to Jeju — visitors
> genuinely find us through it. Three details need correcting:
>
> 1. Jummah is at **13:05**, not 12:30.
> 2. The contact email shown, islamjeju@daum.net, belongs to the Jeju
>    Islamic Center in Nohyeong-dong — a different organisation. Ours is
>    **info@jejucentralmasjid.kr**.
> 3. Please add our website: **https://jejucentralmasjid.kr**
>
> Everything else on the listing, including the map pin, is correct.
> Our full name in Korean is 제주 이슬람 사원.
>
> JazakAllah khair,
> Jeju Central Masjid committee

## Structured data — already shipped

The site emits JSON-LD, so search engines and aggregators can read our
prayer times, location, and services without anyone submitting a form:

- `Mosque` (site-wide) — `app/(frontend)/layout.tsx`, including the weekly
  Jummah `Event`, `amenityFeature`, and the `sameAs` list
- `FAQPage` — `app/(frontend)/faq/page.tsx`
- `Event` — `app/(frontend)/events/page.tsx`
- `NewsArticle` — `app/(frontend)/news/[slug]/page.tsx`
- `BreadcrumbList` — every page. Article pages build it inline; the other
  ten use `<BreadcrumbJsonLd trail={...}>` next to their `<PageHeader>`,
  which prepends Home for you. New pages should add one line to match.

Nothing outstanding. Validate any change at https://validator.schema.org
and https://search.google.com/test/rich-results.

## Rules

- Never buy backlinks or use "SEO submission" services — they trigger
  Google/Naver penalties. Twenty-five good listings beat five hundred bad
  ones; link farms at best do nothing and at worst associate us with spam
  networks.
- **The Korean name is 제주 이슬람 사원.** Submit that everywhere. 제주 중앙
  마스지드 is a secondary alias, and 제주센트럴마스지드 (Kakao's current
  spelling) is not ours at all. One exception, never to be "corrected":
  the NH NongHyup account holder name is **제주중앙마스지드**, unspaced,
  because that is the literal bank record — changing it breaks donations.
- Never list **Jeju Islamic Center** as an alias for us. It is a separate
  organisation in Nohyeong-dong. Claiming its name to catch its searches
  is what causes travellers to arrive at the wrong building.
- One listing per platform; keep NAP **byte-identical** everywhere.
  "Sancheondandong 2-gil 15" and "Sancheondan-dong 2 gil 15" read as two
  different places to an aggregator. That's the whole game in local search.
- When any listing goes live, add its URL to the site's structured data
  `sameAs` list (ask the developer).
- Reviews outrank directories. Politely inviting visiting travellers to
  leave a Google review moves ranking more than the bottom half of the
  tracker. Ask in person, never by mass message, and never offer anything
  in exchange — that violates Google's policy.
- Expect months, not days. Naver and Kakao review manually and can take
  weeks; Google postcard verification up to two; KTO and KMF are
  email-and-wait. Submit everything, then check back.
- Disambiguate deliberately. Three Muslim prayer locations show up in Jeju
  City on Google Maps: us, the older Jeju Islamic Center in Nohyeong-dong,
  and Masjid Indonesia (Baiturrahman) on Jungang-ro. Reviews show
  travellers arriving at the wrong one and finding it closed or unsuitable
  for congregational prayer. Saying "main congregational mosque," "Jummah
  and Eid held here," and "open 24/7" in every listing is a real service to
  visitors, not just SEO.
