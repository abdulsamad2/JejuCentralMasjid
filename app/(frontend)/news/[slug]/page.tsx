import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  ArrowLeftIcon,
  CalendarIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { formatNewsDate } from '@/lib/data/news'
import { getAllNews, getNewsBySlug } from '@/lib/cms'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 120

export async function generateStaticParams() {
  const news = await getAllNews()
  return news.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const item = await getNewsBySlug(slug)
  if (!item) return { title: 'News' }
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      type: 'article',
      title: item.title,
      description: item.excerpt,
      publishedTime: `${item.date}T09:00:00+09:00`,
      ...(item.image ? { images: [{ url: item.image }] } : {}),
    },
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const item = await getNewsBySlug(slug)
  if (!item) notFound()

  const related = (await getAllNews()).filter((n) => n.slug !== item.slug).slice(0, 3)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: item.title,
        description: item.excerpt,
        datePublished: `${item.date}T09:00:00+09:00`,
        ...(item.image ? { image: `https://jejumasjid.kr${item.image}` } : {}),
        author: { '@type': 'Organization', name: 'Jeju Central Masjid' },
        publisher: {
          '@type': 'Organization',
          name: 'Jeju Central Masjid',
          logo: { '@type': 'ImageObject', url: 'https://jejumasjid.kr/assets/jeju-masjid-logo-icon.png' },
        },
        mainEntityOfPage: `https://jejumasjid.kr/news/${item.slug}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://jejumasjid.kr' },
          { '@type': 'ListItem', position: 2, name: 'News', item: 'https://jejumasjid.kr/news' },
          { '@type': 'ListItem', position: 3, name: item.title },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      <article>
        {item.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-islamic-navy sm:aspect-[21/9]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-islamic-navy-dark/70 via-islamic-navy-dark/20 to-transparent" />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-islamic-green hover:text-islamic-green-dark"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to all news
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {item.tag && (
              <span className="inline-flex items-center rounded-full bg-islamic-green/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-islamic-green">
                {item.tag}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-islamic-navy/55">
              <CalendarIcon className="h-3.5 w-3.5" />
              {formatNewsDate(item.date)}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl">
            {item.title}
          </h1>

          <p className="mt-4 text-lg italic leading-relaxed text-islamic-navy/70">
            {item.excerpt}
          </p>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-islamic-navy/80 sm:text-lg">
            {item.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-islamic-cream py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-islamic-navy sm:text-3xl">
                More from the masjid
              </h2>
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-islamic-green hover:text-islamic-green-dark"
              >
                All news
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/news/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-islamic-navy/5 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-islamic-navy">
                    {r.image && (
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-islamic-navy/50">
                      {formatNewsDate(r.date)}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-base font-bold text-islamic-navy transition group-hover:text-islamic-green sm:text-lg">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
