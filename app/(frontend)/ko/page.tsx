import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import {
  MASJID_ADDRESS_KO,
  MASJID_BANK_ACCOUNT_NAME,
  MASJID_MAPS,
  MASJID_PHONES,
} from '@/lib/constants/masjidLocation'
import { VISIT_NOTICE_DAYS } from '@/lib/constants/visits'
import { pageMetadata } from '@/lib/seo/pageMetadata'

/**
 * The one Korean-language page. Naver and Korean-language AI answers rank
 * Korean body text, and the rest of the site is English. Copy comes from the
 * approved Korean text in docs/listing-kit.md — keep the two in step.
 */
const description =
  '제주 이슬람 사원(제주 중앙 마스지드)은 제주도의 이슬람 사원(모스크)입니다. 연중무휴 24시간 개방, 매주 금요일 주무아 예배, 견학 예약, 오시는 길, 후원 계좌 안내.'

export const metadata = {
  ...pageMetadata({ title: '제주 이슬람 사원 안내 (한국어)', description, path: '/ko' }),
  // Page-level alternates replace the layout's, so canonical is restated.
  alternates: { canonical: '/ko', languages: { en: '/', ko: '/ko' } },
}

const FAQS: { q: string; a: string }[] = [
  {
    q: '무슬림이 아니어도 방문할 수 있나요?',
    a: '네, 누구나 환영합니다. 예배 시간에 자유롭게 오시거나, 홈페이지에서 견학을 예약하시면 안내자가 맞이해 드립니다.',
  },
  {
    q: '견학은 어떻게 예약하나요? 비용이 있나요?',
    a: `견학은 무료입니다. 홈페이지 견학 예약 페이지에서 최소 ${VISIT_NOTICE_DAYS}일 전에 신청해 주세요. 학교·단체는 1~2주 전에 신청해 주시면 좋습니다. 한국어 안내가 가능합니다.`,
  },
  {
    q: '방문할 때 복장은 어떻게 해야 하나요?',
    a: '어깨와 무릎을 가리는 단정하고 편한 옷이면 됩니다. 여성분은 스카프를 가져오시면 좋습니다. 입구에서 신발을 벗습니다.',
  },
  {
    q: '제주 이슬람문화센터와 같은 곳인가요?',
    a: '아닙니다. 제주 이슬람 사원(Jeju Central Masjid)은 제주대학교 후문 근처 산천단동에 있으며, 노형동의 제주 이슬람문화센터나 중앙로의 인도네시아 마스지드와는 다른 곳입니다. 하루 다섯 번의 예배와 금요 합동 예배, 이드 예배가 이곳에서 열립니다.',
  },
  {
    q: '후원은 어떻게 하나요?',
    a: `농협은행 317-0031-1483-91 (예금주: ${MASJID_BANK_ACCOUNT_NAME})로 계좌이체해 주시면 됩니다. 영수증이 필요하시면 후원 페이지의 양식을 이용해 주세요.`,
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'ko',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const h2 = 'text-2xl font-bold text-islamic-navy sm:text-3xl'
const body = 'mt-4 space-y-4 text-base leading-relaxed text-islamic-navy/80 sm:text-lg'
const link = 'font-semibold text-islamic-green underline underline-offset-4 hover:text-islamic-green-dark'

export default function KoreanGuidePage() {
  return (
    <main lang="ko" className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <BreadcrumbJsonLd trail={[{ name: '한국어 안내', path: '/ko' }]} />

      <PageHeader
        eyebrow="한국어 안내"
        title="제주 이슬람 사원 (Jeju Central Masjid)"
        description="제주도의 이슬람 사원(모스크)입니다. 연중무휴 24시간 개방하며, 무슬림과 비무슬림, 도민과 여행객 모두 환영합니다."
        action={{ label: '견학 예약', href: '/visit' }}
      />

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className={h2}>사원 소개</h2>
            <div className={body}>
              <p>
                제주 이슬람 사원(제주 중앙 마스지드)은 연중무휴 24시간 개방되며, 하루 다섯 번의
                예배가 진행되고 매주 금요일 오후 1시 5분에는 주무아(금요 합동 예배)가 열립니다.
                남성과 여성을 위한 예배 공간이 분리되어 있습니다.
              </p>
              <p>
                한국어·영어·우르두어·방글라어·우즈베크어·터키어 도서를 갖춘 다국어 이슬람 도서관을
                운영하며, 매일 저녁(마그립 예배 이후) 어린이 꾸란 교실이 열립니다. 라마단 기간에는
                매일 이프타르(공동 저녁 식사)를 함께합니다.
              </p>
            </div>
          </div>

          <div>
            <h2 className={h2}>오시는 길 · 연락처</h2>
            <div className={body}>
              <p>
                주소: {MASJID_ADDRESS_KO}
                <br />
                제주대학교 후문 근처, 회색 3층 건물의 2층입니다(계단만 있습니다). 2층 창문에
                &quot;Welcome to Jeju Central Masjid&quot; 안내판이 보입니다.
              </p>
              <p>
                <a className={link} href={MASJID_MAPS.kakao} target="_blank" rel="noopener noreferrer">
                  카카오맵
                </a>{' '}
                ·{' '}
                <a className={link} href={MASJID_MAPS.naver} target="_blank" rel="noopener noreferrer">
                  네이버 지도
                </a>{' '}
                ·{' '}
                <a className={link} href={MASJID_MAPS.google} target="_blank" rel="noopener noreferrer">
                  Google 지도
                </a>
              </p>
              <p>
                전화·카카오톡·WhatsApp:{' '}
                <a className={link} href={`tel:${MASJID_PHONES[0].tel}`}>
                  {MASJID_PHONES[0].display}
                </a>
                <br />
                이메일: info@jejucentralmasjid.kr
              </p>
            </div>
          </div>

          <div>
            <h2 className={h2}>자주 묻는 질문</h2>
            <dl className="mt-4 space-y-6">
              {FAQS.map((f) => (
                <div key={f.q}>
                  <dt className="text-base font-bold text-islamic-navy sm:text-lg">{f.q}</dt>
                  <dd className="mt-1 text-base leading-relaxed text-islamic-navy/80">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/visit"
              className="inline-flex min-h-[48px] items-center rounded-full bg-islamic-green px-6 text-sm font-semibold text-white shadow-md shadow-islamic-green/25 transition hover:bg-islamic-green-dark"
            >
              견학 예약하기
            </Link>
            <Link
              href="/donate"
              className="inline-flex min-h-[48px] items-center rounded-full border border-islamic-navy/15 bg-white px-6 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green"
            >
              후원 안내
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
