import Link from 'next/link'
import { MASJID_ADDRESS_KO, MASJID_PHONES } from '../lib/constants/masjidLocation'

/**
 * Visible Korean-language introduction — for Korean neighbors, visitors, and
 * officials, and a strong relevance signal for Naver/Daum search.
 */
export default function KoreanIntro() {
  return (
    <section aria-labelledby="korean-intro-heading" className="bg-white py-14 sm:py-16" lang="ko">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-islamic-navy/8 bg-gradient-to-br from-islamic-cream-light to-white p-7 shadow-sm sm:p-10">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
            <span className="h-px w-8 bg-islamic-green" />
            한국어 안내
          </p>
          <h2
            id="korean-intro-heading"
            className="mt-3 text-2xl font-bold leading-tight text-islamic-navy sm:text-3xl"
          >
            제주 중앙 마스지드 · 제주 이슬람 사원
          </h2>
          <p className="mt-4 text-base leading-relaxed text-islamic-navy/80">
            제주도에 있는 이슬람 사원(모스크)입니다. 하루 다섯 번의 예배가 열리며, 매주 금요일
            오후에는 주무아(금요 합동 예배)가 있습니다. 무슬림뿐 아니라 이슬람에 관심 있는 분,
            견학을 원하시는 분 모두 언제나 환영합니다. 방문 전 연락을 주시면 안내해 드리겠습니다.
          </p>
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 text-sm text-islamic-navy/80 sm:grid-cols-2">
            <div className="flex gap-2">
              <dt className="font-bold text-islamic-navy">주소</dt>
              <dd>{MASJID_ADDRESS_KO}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-bold text-islamic-navy">개방 시간</dt>
              <dd>연중무휴 24시간</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-bold text-islamic-navy">금요 예배</dt>
              <dd>매주 금요일 오후 1시 15분경</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-bold text-islamic-navy">연락처</dt>
              <dd>{MASJID_PHONES[0].display} (WhatsApp · 카카오톡)</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-islamic-navy/70">
            할랄 음식 안내, 단체 견학, 이슬람에 대한 질문 등은{' '}
            <Link href="/contact" className="font-semibold text-islamic-green hover:text-islamic-green-dark">
              문의 페이지
            </Link>
            를 이용해 주세요.
          </p>
        </div>
      </div>
    </section>
  )
}
