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
| 2 | Naver SmartPlace — **blocked**: needs 사업자등록번호. Ask via email E first | Yes | ⊘ |
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
| 16 | Wikipedia — Talk page request; **blocked until #26 or press** | No | ☐ |
| 17 | Prayer-time apps — automatic via #1 + #4, no forms to chase | — | ☐ |
| 18 | KTO Muslim-Friendly Korea — contact directly, write in Korean | Helps | ☐ |
| 19 | Visit Jeju — https://www.visitjeju.net | Helps | ☐ |
| 20 | Jeju Tourism Organization — ask about Muslim-traveller resources | Helps | ☐ |
| 21 | TripAdvisor — listing **exists** (d27972455); claim it, add phone/site/hours | No | ◐ |
| 22 | Foursquare — **verified empty**; add via the **Swarm app** (web route is dead) | No | ☐ |
| 23 | Jeju 외국인주민지원센터 / immigration community pages | Helps | ☐ |
| 24 | Jeju National University international office (orientation guide) | Helps | ☐ |
| 25 | Website link in Instagram bio + Facebook page "About" | No | ☐ |
| 26 | islaminkorea.net — contact form; **unlocks #16** | No | ☐ |
| 27 | TMAP (티맵) — direct form, Korea's main driving nav | No | ☐ |
| 28 | Facebook page address → Instagram location tag (**quickest win**) | No | ☐ |
| 29 | HERE Map Creator — feeds in-car navigation, Garmin, Alexa | No | ☐ |
| 30 | TomTom MapShare Reporter | No | ☐ |
| 31 | halalhada.com — listing **exists but near-empty**; complete via email E | No | ◐ |

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

#### How to actually add it

Unlike Wikipedia, OSM has no conflict-of-interest rule — adding a place you
run is welcome, and first-hand knowledge is the *best* kind of source there.

1. Create an account: https://www.openstreetmap.org/user/new — email only,
   no phone verification.
2. Open the editor centred on the masjid:
   https://www.openstreetmap.org/edit#map=19/33.449313/126.558229
3. Click **Point** in the top toolbar, then click the building on the map.
4. In the "Search feature type" box, type `Mosque` and pick it.
5. Scroll to the bottom of the left sidebar to the **Tags** section and
   switch it to **text view** (the icon that looks like lines of text).
   Paste the whole tag block above at once — far faster than the form.
6. Click **Save**, write a changeset comment such as
   `Add Jeju Central Masjid (surveyed on site)`, and **Upload**.

**Do not copy the pin from Google Maps.** OSM prohibits data derived from
Google, and Google-derived edits get reverted. Place the node from your own
knowledge of the building or from the aerial imagery in the editor. You run
the masjid, so this is a survey — the strongest possible OSM source. The
coordinates in this file exist to keep *our own* listings consistent; they
are not the thing to transcribe into OSM.

If the node lands slightly off, drag it. Precision to the building matters
more than matching any number written down here.

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

### #16 — Wikipedia (do **not** edit the article directly)

https://en.wikipedia.org/wiki/List_of_mosques_in_South_Korea

Editing an article about our own masjid is a conflict of interest under
Wikipedia policy. Undisclosed COI edits get reverted and can get the
account blocked. The sanctioned route is a Talk page request, where an
uninvolved editor decides.

**Sources are the real blocker, not the policy.** As of 2026-07-25 no
independent source names us: TripAdvisor and our own social accounts don't
count, and islaminkorea.net — which this article already cites for 전주,
대구 and 파주 성원 — lists 아쉬라피아 제주 이슬람센터 and 우와이스 알 까르니
예배소 for Jeju, but not us. **Do #15 first.** Getting onto the KMF /
islaminkorea list is what makes this request succeed, because it is a
source the article's own editors already accept. One piece of local press
(JIBS, 제주일보, 한라일보) naming 제주 이슬람 사원 does the same job.

#### How to post the request

1. Create a Wikipedia account and sign in.
2. Go to **https://en.wikipedia.org/wiki/Talk:List_of_mosques_in_South_Korea**
3. Click **Add topic** (top right).
4. Title it: `Requesting addition of Jeju Central Masjid (COI disclosure)`
5. Paste the block below, filling in the citation, and **sign with four
   tildes** — `~~~~` — which Wikipedia expands into your signature. An
   unsigned request often gets ignored.
6. Wait. Do not re-post or edit the article if it's slow; ping the Talk
   page politely after a week or two.

```wikitext
{{edit COI|answered=no}}

'''Disclosure:''' I am a member of the committee of Jeju Central Masjid and
have a conflict of interest, so I am requesting this change rather than
making it myself.

I would like to request that Jeju Central Masjid be added to the list. It
is a congregational mosque on Jeju Island holding the five daily prayers,
Jumu'ah and Eid prayers, located on the second floor at Sancheondandong
2-gil 15, Jeju-si.

Proposed row:

|-
|Jeju Central Masjid
|{{lang|ko|제주 이슬람 사원}}
|
|[[Jeju Island]]
|
|Congregational mosque in Jeju City, near the back gate of
[[Jeju National University]]. Holds the five daily prayers, Jumu'ah and Eid
prayers.<ref>ADD CITATION HERE</ref>

Separately, and unrelated to my own listing: the Jeju entries in this table
may need review. The article lists "Jeju Rahman Mosque" and "Jeju Islamic
Cultural Centre", while islaminkorea.net lists {{lang|ko|아쉬라피아 제주
이슬람센터}} and {{lang|ko|우와이스 알 까르니 예배소}} for Jeju. I mention it
only as an observation for uninvolved editors. ~~~~
```

Leave the Images and Year columns blank rather than guessing — a wrong
founding date is worse than an empty cell, and an editor will ask for a
source for it anyway. Do not add our website as a citation; Wikipedia
wants an independent source, and citing ourselves reinforces the COI.

### #26 — islaminkorea.net (한국의 이슬람 성원)

https://www.islaminkorea.net — **not** the Korea Muslim Federation; it is an
independent Korean-language Islamic site running since 2018. Do it anyway,
and early: the English Wikipedia mosque list cites it for 전주 성원, 대구
성원 and 파주 성원, so being listed here is what makes the #16 Talk page
request actionable. Its Jeju page currently shows 아쉬라피아 제주 이슬람센터
and 우와이스 알 까르니 예배소, and not us.

No public submission form for mosques — use the contact form at
https://www.islaminkorea.net/ko/info/문의하기 and supply their fields
directly, which is what the message below does. Write in Korean.

Their entry template uses these fields, so give all of them:

> 안녕하세요. 제주도의 이슬람 사원 운영위원회입니다.
>
> 귀 사이트의 "이슬람 성원과 예배소" 목록에 저희 성원이 등록되어 있지 않아
> 등록을 요청드립니다. 필요한 정보를 아래와 같이 정리했습니다.
>
> **성원 이름**: 제주 이슬람 사원 (Jeju Central Masjid)
> **주소**: 제주특별자치도 제주시 산천단동 2길 15, 2층 (아라일동)
> **지도 정보**: CHX5+P7 제주시 (33.449313, 126.558229)
> **전화**: +82 10-4246-9202
> **카카오톡 ID**: asifsgr97
> **웹사이트**: https://jejucentralmasjid.kr
> **페이스북**: https://www.facebook.com/JejuCentralMasjid
> **인스타그램**: https://www.instagram.com/jejucentralmasjid/
> **개점 시간**: 연중무휴 24시간
> **금요일 기도가 있나요?**: 예 — 매주 금요일 13:05 (쿠트바 후 예배)
> **셰이크 이름**: (이맘 성함 기입)
> **셰이크 이메일**: info@jejucentralmasjid.kr
> **셰이크 학위**: (학위·이수 과정 기입)
>
> **성원 주간 프로그램**: 매일 다섯 번의 예배, 매일 저녁(마그립 후) 어린이
> 꾸란 교실, 주간 할라까
> **성원 월간 프로그램**: 월례 모임, 마슈와라(운영 협의)
> **성원 연간 프로그램**: 라마단 기간 매일 이프타르, 이드 예배
>
> 남녀 예배 공간이 분리되어 있으며, 한국어·영어·우르두어·방글라어·
> 우즈베크어·터키어 도서를 갖춘 다국어 이슬람 도서관을 운영합니다.
> 사진이 필요하시면 보내드리겠습니다.
>
> 감사합니다.
> 제주 이슬람 사원 운영위원회

Fill in the two 셰이크 fields before sending — their existing entries have
them, and a half-filled submission invites a round-trip.

The Plus Code above is derived from our verified coordinates; confirm it
against the Google Maps listing, which displays it, before sending.

### #15 — Korea Muslim Federation (한국이슬람교중앙회)

**The list page:** https://www.koreaislam.org/전국성원-및-지회안내/
("전국성원 및 지회안내" — national mosques and branches)

This is the canonical Korean-language reference. It carries 21 mosques
nationwide, and it is what journalists, Wikipedia and government tourism
pages cite downstream. Verified 2026-07-25.

**Its Jeju entry is not us:**

> Jeju Islamic Center — 제주특별자치도 제주시 노연로 42 정한오피스텔 1208호
> — 010-3692-3932

That is the Nohyeong-dong officetel, a different organisation. Note KTO's
VisitKorea page carries the *same* address, which strongly suggests KTO
copied KMF. That makes this the upstream source worth fixing first — one
correction here propagates to everything that cites it.

**There is no submission form.** The only form on the site (방문신청,
https://www.koreaislam.org/방문신청/) is for booking tours of Seoul Central
Mosque, not for listing requests, and no head-office email or phone is
published on either page. So this is a phone call or a letter to the KMF
head office at Seoul Central Mosque in Itaewon — get the number from the
site or by calling the Seoul mosque directly. Email C is a fallback and a
script for the call, not the primary route.

Ask for two things, not one: to be **added**, and for the Jeju entry to be
**corrected** so it no longer presents the Nohyeong-dong centre as the
island's mosque.

### #22 — Foursquare

**Verified empty (2026-07-25)** — no Jeju Central Masjid venue exists.

⚠️ **The website route no longer exists.** Foursquare City Guide was shut
down (app 2024-12-15, web 2025-04-28), taking the old "Contribute → Add a
New Place" dashboard with it. Any guide describing that flow predates the
shutdown. https://app.foursquare.com/venue/claim still handles *claiming*
an existing venue, but there is no venue here to claim.

**The only way to add a new place now is the Swarm mobile app** (iOS /
Android), Foursquare's surviving check-in product:

1. Install **Swarm** and sign in.
2. Tap to check in — easiest while physically at the masjid, since Swarm
   ranks by proximity.
3. Search `Jeju Central Masjid`. When nothing matches, choose the
   **add a new place** option at the bottom of the results.
4. Enter the details below and save, then check in once to confirm it.

Still worth the effort: Foursquare Places remains a data supplier to a long
tail of apps and some in-car systems, even though its consumer app is gone.

Details to enter:

- **Name**: Jeju Central Masjid
- **Category**: Spiritual Center → Mosque
- **Address**: Sancheondandong 2-gil 15, 2F, Jeju-si, Jeju-do 63243, KR
- **Phone**: +82 10-4246-9202
- **Website**: https://jejucentralmasjid.kr
- **Hours**: open 24 hours, 7 days

Phone verification (an automated call to the listed number) applies to
*claiming* a venue for business management, not to adding one via Swarm.
Add it in Swarm first; only pursue a claim afterwards if we actually want
the business tools.

### #27–#31 — additional easy wins (verified 2026-07-25)

Ordered by value for effort. All free.

**#27 TMAP (티맵) — do this one.** SK Telecom's navigation app is what most
Koreans actually use for driving, so it reaches residents and anyone in a
rental car far better than Foursquare does. Direct registration form, no
business account needed:
https://www.tmap.co.kr/my_tmap/my_map_tip/map_company_regi.do
Submissions are reviewed and **they do not notify you of the outcome** — so
check back rather than waiting.

Field by field:

| Field | Enter |
|---|---|
| 업체명 (main name) | `제주 이슬람 사원` |
| 지점명 (part name) | leave blank — we have no branches |
| 주소 | Find Address → `산천단동 2길 15` → rest of address: `2층` |
| 전화번호 | `010` · `4246` · `9202` |
| 업종 | search `종교` → pick the 이슬람 사원 / 종교시설 entry |
| 홈페이지 | `https://jejucentralmasjid.kr` |
| 주차 | **answer honestly — see below** |
| 휴무일 | 연중무휴 (open year-round) |
| 영업시간 | one entry, all days, `00:00–24:00` |

**주차 (parking) — this one needs a real answer, not a guess.** TMAP is a
driving app, so this field decides whether a family arrives and finds
nowhere to stop. If there is no dedicated parking, select 불가
(impossibility) and say so in 찾아오시는 길. A wrong "possible" here is worse
than leaving it unverified.

**찾아오시는 길 (directions, 500 chars):**

> 제주대학교 후문 인근, 제주시 아라일동 산천단동 2길에 있습니다. 회색 3층
> 건물의 2층이며, 2층 창문에 "Welcome to Jeju Central Masjid" 다국어
> 안내판이 걸려 있습니다. 건물 1층 입구로 들어와 계단을 이용해 2층으로
> 올라오시면 됩니다.

Add one sentence on where to park once you have decided the 주차 answer.

**소개글 (introduction, 1000 chars):**

> 제주 이슬람 사원(제주 중앙 마스지드)은 제주도의 이슬람 사원(모스크)입니다.
> 연중무휴 24시간 개방되며, 하루 다섯 번의 예배가 진행되고 매주 금요일
> 오후 1시 5분에는 주무아(금요 합동 예배)가 열립니다. 남성과 여성을 위한
> 예배 공간이 분리되어 있습니다.
> 한국어·영어·우르두어·방글라어·우즈베크어·터키어 도서를 갖춘 다국어
> 이슬람 도서관을 운영하며, 매일 저녁(마그립 예배 이후) 어린이 꾸란 교실이
> 열립니다. 라마단 기간에는 매일 이프타르(공동 저녁 식사)를 함께합니다.
> 무슬림뿐만 아니라 이슬람이 궁금한 분, 견학을 원하시는 분 모두 환영합니다.
> 제주 여행 중인 무슬림 여행객을 위한 할랄 음식 안내도 도와드립니다.
> 홈페이지: https://jejucentralmasjid.kr

**기타 요청사항 (other requests, 750 chars):**

> 종교시설(이슬람 사원)입니다. 영리 목적의 업소가 아니며 입장료나 예약 없이
> 누구나 방문할 수 있습니다.
> 업종 분류에 "이슬람 사원" 또는 "모스크"가 없을 경우 종교시설로 분류
> 부탁드립니다.
> 영문명 "Jeju Central Masjid"도 함께 등록해 주시면 외국인 방문객이 검색할
> 때 도움이 됩니다.
> 제주도 내 유일한 이슬람 사원으로, 제주시 노형동의 "제주 이슬람문화센터"와
> 는 다른 시설입니다. 혼동되지 않도록 별도 등록 부탁드립니다.
> 필요하시면 외관 사진을 제공해 드릴 수 있습니다.

**#28 Facebook Page address → Instagram location tag.** The quickest item on
this whole list. Make sure our Facebook page has a full street address set
under Page settings, with a Places-eligible category. That is what creates
the taggable location on Instagram, so visitors posting photos tag *us*
rather than a nearby café. Free reach from people already advertising us.

**#29 HERE Map Creator** — https://mapcreator.here.com — free, account only,
no business verification. HERE supplies the built-in navigation in a lot of
cars (Mercedes, BMW, Audi), plus Garmin and Amazon Alexa. Small effort,
genuinely long tail.

**#30 TomTom MapShare Reporter** — https://www.tomtom.com/mapshare/tools —
free, same idea as HERE, feeds TomTom-based car systems and AmiGO.

**#31 halalhada.com** — **already listed**, but the entry holds only a name
and a lot-number address: https://www.halalhada.com/mosque/338-jeju-central-masjid
No phone, website, hours, Jummah time, floor or postal code. Run by Hudago
Co. Ltd, who also ship an app, so a correction propagates to both. Use the
"Report an issue with this place" link — see email E.

Note on #29/#30: these matter because Jeju visitors overwhelmingly drive
rental cars. Between OSM (#4), TMAP (#27), HERE (#29), TomTom (#30) and
Waze (#8), that is essentially every in-car navigation system covered.

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

## #2 — Naver SmartPlace registration walkthrough

SmartPlace requires a registration number, and **the masjid has one**, so
this is unblocked. Have the certificate ready as a PDF or photo before
starting — the flow asks you to upload it.

1. Sign in at https://smartplace.naver.com with the masjid's Naver account.
   Create one first if needed; it requires Korean phone verification.
2. Choose **내 업체 등록하기** (register my business).
3. Enter the details — use the Naver pack above verbatim:
   - 업체명: **제주 이슬람 사원**
   - 업종: 종교시설 → 이슬람교 사원 (모스크)
   - 주소: 제주특별자치도 제주시 산천단동 2길 15, 2층
4. Upload the registration certificate and complete verification (SMS,
   document photo, and a phone confirmation call).
5. Wait for approval — typically 2–4 days, up to a week if the document
   needs manual review.

Then fill the profile completely: the 소개글, 찾아오시는 길, 영업시간
(00:00–24:00 연중무휴), the five keywords, and the four photos listed above.
An approved-but-empty listing ranks poorly.

**Two things to get right, because they are painful to change later:**

- Register as **제주 이슬람 사원**. If the certificate is in a different
  legal name, put that in the business-name field where required, but make
  the public 업체명 match our canonical name.
- Confirm the map pin lands on **33.449313, 126.558229**. Naver will
  geocode the address, and the address alone resolves ambiguously — drag
  the pin onto the actual building before submitting.

**When it goes live**, open the listing in Naver Map and copy the URL. It
looks like `map.naver.com/p/entry/place/1234567890`; the trailing number is
the place ID. Send it over and it replaces the address-search fallback in
`lib/constants/masjidLocation.ts`, and gets added to the schema `sameAs`.

If the registration number is rejected for being a 고유번호증 rather than a
사업자등록번호, ask SmartPlace 고객센터 what a 종교시설 should submit. The
fallback is Naver Map's 장소 제보 (place report), which creates a map entry
without an owner account — no control over photos, hours, or description,
but far better than being absent.

### D) Salam Jeju — correction request (send this first)

**Listing:** https://salamjeju.com/en/muslim-guide/musallas/jeju-central-masjid
**Run by:** Nasir Seong (a one-person site, not a company — write to a
person, not a "team")
**Email:** support@salamjeju.com · **WhatsApp:** +82 10-3302-7003
**Instagram:** @nasir_mgmt

The listing page also has a **"Report incorrect info"** link at the bottom.
Use that as well as writing — it routes to wherever he actually triages.

Still wrong as of 2026-07-25: Jummah shown as **12:30** (ours is 13:05),
contact email shown as **islamjeju@daum.net** (that belongs to the Jeju
Islamic Center, a different organisation), and **no website link**. The map
pin is correct.

Given it's one person doing this voluntarily and sending us traffic,
lead with thanks and keep it short. WhatsApp will likely get a faster
response than email.

Subject: Correction for your Jeju Central Masjid listing

> Assalamu alaikum Nasir,
>
> JazakAllah khair for including us in your Jeju Muslim guide — travellers
> genuinely find us through it, and the work you've put into that guide
> shows.
>
> Three small corrections to our entry:
>
> 1. **Jummah is at 13:05**, not 12:30. This is the one that matters most —
>    visitors have been arriving after the khutbah has started.
> 2. The contact email listed, islamjeju@daum.net, belongs to the **Jeju
>    Islamic Center** in Nohyeong-dong, which is a separate organisation.
>    Ours is **info@jejucentralmasjid.kr**.
> 3. Could you add our website — **https://jejucentralmasjid.kr** — where
>    prayer times stay current.
>
> The map pin and address are spot on. Our name in Korean is
> 제주 이슬람 사원.
>
> Happy to send photos, or to be a point of contact if you ever need
> something confirmed for the guide. If it's useful, we can also flag
> Ramadan and Eid timings to you each year so the guide stays ahead of it.
>
> JazakAllah khair,
> Jeju Central Masjid committee
> info@jejucentralmasjid.kr · +82 10-4246-9202

**Short WhatsApp version:**

> Assalamu alaikum Nasir — from Jeju Central Masjid. JazakAllah khair for
> listing us in the Jeju guide. Three quick fixes: Jummah is 13:05 (not
> 12:30); the email shown, islamjeju@daum.net, is the Jeju Islamic Center's,
> ours is info@jejucentralmasjid.kr; and could you add
> https://jejucentralmasjid.kr. Pin and address are correct. Happy to send
> photos or confirm anything for the guide anytime. JazakAllah khair.

### E) halalhada.com — completion request

**Our listing already exists:** https://www.halalhada.com/mosque/338-jeju-central-masjid
(They carry the Jeju Islamic Center *as well*, at /mosque/15 — both are
listed, so no disambiguation needed here.)

Operator: **Hudago Co. Ltd (후다고 주식회사)**, Chuncheon, Gangwon-do —
CEO You Cheonghyun, +82 10-8673-3085. They run an app as well as the site,
so a fix here propagates to both. Use the **"Report an issue with this
place"** link on the listing itself.

What the entry currently holds — name and a lot-number address, nothing
else:

> Jeju Central Masjid
> 368-80 Ara Il-dong, Jeju-si, Jeju Special Self-Governing Province Korea

Missing: floor, postal code, road-name address, phone, website, hours,
Jummah time, facilities, photos. The address is the old 지번 (lot) format
rather than the 도로명주소 that Korea has used officially since 2014, and
it omits 2층 — which matters, because a visitor at street level sees no
mosque.

> [정보 수정 요청] 제주 이슬람 사원 (Jeju Central Masjid)
>
> 등록해 주셔서 감사합니다. 현재 등록된 정보가 주소 일부만 있어 아래와 같이
> 보완 부탁드립니다.
>
> 주소(도로명): 제주특별자치도 제주시 산천단동 2길 15, **2층** (우 63243)
> — 현재 표시된 "368-80 아라일동"은 지번 주소이며, 건물 2층이라는 정보가
> 빠져 있어 방문객이 1층에서 찾지 못하는 경우가 있습니다.
> 전화: +82 10-4246-9202
> 홈페이지: https://jejucentralmasjid.kr
> 운영시간: 연중무휴 24시간
> 주무아(금요 예배): 매주 금요일 13:05
> 시설: 남녀 예배 공간 분리, 우두(세정) 시설, 다국어 이슬람 도서관
>
> 외관·내부 사진이 필요하시면 보내드리겠습니다. 감사합니다.
> 제주 이슬람 사원 운영위원회

English, if the form is in English:

> [Correction] Jeju Central Masjid — please complete our listing
>
> Thank you for listing us. The entry currently has only a partial address.
> Could you please add:
>
> Address (road name): Sancheondandong 2-gil 15, **2F**, Jeju-si, Jeju-do
> 63243 — the "368-80 Ara Il-dong" shown is the older lot-number format,
> and the entry omits that we are on the 2nd floor, so visitors arrive at
> street level and can't find us.
> Phone: +82 10-4246-9202
> Website: https://jejucentralmasjid.kr
> Hours: open 24/7 · Jummah every Friday 13:05
> Facilities: separate prayer areas for men and women, wudu facilities,
> multilingual Islamic library
>
> Happy to send exterior and interior photos. JazakAllah khair.

## Community platforms (Reddit, Facebook groups, forums)

These are **not** directories and must not be treated like one. There is no
submission form; there is a community that removes advertising and rewards
usefulness. Done wrong this gets the account banned and achieves nothing.

### The rule that governs all of it

**Answer questions; don't announce yourself.** A post saying "our masjid
exists, here is our website" gets removed. A reply to someone asking "where
can I pray in Jeju?" gets upvoted, stays searchable for years, and is read
by exactly the person who needs it.

**Always disclose the connection** — "I help run the masjid there". Reddit
punishes undisclosed promotion far harder than open self-interest.

### Reddit

Relevant subs: **r/korea**, **r/Living_in_Korea**, **r/koreatravel**,
**r/islam**, **r/MuslimLounge**, **r/travel**, **r/solotravel**, and — given
where Jeju's Muslim tourism actually comes from — **r/indonesia** and
**r/malaysia**.

1. Use an account with some existing comment history. Brand-new zero-karma
   accounts get auto-filtered before a human sees the post.
2. Search Reddit directly (the site search, or Google with
   `site:reddit.com jeju mosque` / `jeju prayer` / `jeju halal`) for
   existing threads and reply to those first. Old threads still rank in
   Google and still get read.
3. Only once you have some history, consider **one** genuinely useful post:
   *"Praying in Jeju — a complete guide for Muslim travellers."* Cover the
   airport prayer room, hotel facilities, the other musallas, halal
   restaurants, **and** us — as one entry among many, not the subject. A
   guide that helps people survives; an advert does not.

### Other community routes

- **Facebook groups** — "Muslims in Korea", Indonesian and Malaysian
  communities in Korea, and Jeju expat groups. Higher yield than Reddit for
  the resident congregation, and far more tolerant of a straightforward
  introduction post.
- **Naver Cafe / Daum Cafe** — where Korean-language community discussion
  actually happens. Worth it for Korean visitors and neighbours.
- **TripAdvisor Jeju forum** — answer "is there a mosque in Jeju" threads.
  Feeds the listing at #21.
- **Quora** — low effort, ranks well in Google for long-tail questions.

### Editorial targets found while auditing (pitch, don't submit)

These publish Jeju Muslim-travel content and take story pitches rather than
listings — the same approach as #13:

- halalkoreaguide.com — Korea-specific guide and app
- halalzilla.com — Muslim travel features
- klook.com/blog — ran a Muslim-friendly Jeju itinerary
- trip.com Muslim travel guides
- wanderlog.com — itinerary planner, listing-style entries

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
