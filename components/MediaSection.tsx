'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PlayIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

/**
 * Media grid — masonry/CSS-columns layout.
 *
 * Each item keeps its natural aspect ratio (portrait reels and landscape
 * posts can coexist without height-mismatch artifacts).
 *
 * Each item supplies EITHER:
 *   - `youtubeId`     — a YouTube video ID (thumbnails auto-generated)
 *   - `embedUrl`      — full iframe src (Facebook reel, post, Vimeo, etc.)
 *
 * `aspect: 'portrait'` = 9:16 (reels, stories)
 * `aspect: 'landscape'` = 16:9 (posts, khutbahs, YouTube)
 */

type Platform = 'facebook' | 'youtube' | 'other'

type MediaItem = {
  title: string
  description: string
  youtubeId?: string
  embedUrl?: string
  thumbnail?: string
  aspect?: 'landscape' | 'portrait'
  platform?: Platform
  externalUrl?: string
}

const MEDIA: MediaItem[] = [
  {
    title: 'From our community',
    description: 'A recent post from Jeju Central Masjid on Facebook.',
    embedUrl:
      'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fgimbogcheol.810828%2Fposts%2Fpfbid0vxd6SQgz174B42Yu7eAXA6CSFetJpmNgxWZgU2tJhhnseHhcAkLqxjufm9CDTHvpl&show_text=false&width=500',
    thumbnail: '/assets/mosque-3.jpg',
    aspect: 'landscape',
    platform: 'facebook',
    externalUrl:
      'https://www.facebook.com/gimbogcheol.810828/posts/pfbid0vxd6SQgz174B42Yu7eAXA6CSFetJpmNgxWZgU2tJhhnseHhcAkLqxjufm9CDTHvpl',
  },
  {
    title: 'Moments at the masjid',
    description: 'A short reel from the Jeju Central Masjid community.',
    embedUrl:
      'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1714614372593338%2F&show_text=false&width=267&t=0',
    thumbnail: '/assets/mosque-2.jpg',
    aspect: 'portrait',
    platform: 'facebook',
    externalUrl: 'https://www.facebook.com/reel/1714614372593338/',
  },
]

function thumbnailFor(item: MediaItem): string {
  if (item.thumbnail) return item.thumbnail
  if (item.youtubeId) return `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`
  return ''
}

function embedSrcFor(item: MediaItem): string | null {
  if (item.embedUrl) return item.embedUrl
  if (item.youtubeId) return `https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`
  return null
}

function PlatformBadge({ platform }: { platform: Platform }) {
  if (platform === 'facebook') {
    return (
      <span
        aria-label="Facebook"
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#1877F2] shadow ring-1 ring-black/5"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4V14h2.7v8h3.4z" />
        </svg>
      </span>
    )
  }
  if (platform === 'youtube') {
    return (
      <span
        aria-label="YouTube"
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#FF0000] shadow ring-1 ring-black/5"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M23 7.3c-.3-1.1-1.1-2-2.2-2.3C18.8 4.5 12 4.5 12 4.5s-6.8 0-8.8.5c-1.1.3-2 1.2-2.2 2.3C.5 9.3.5 12 .5 12s0 2.7.5 4.7c.3 1.1 1.1 2 2.2 2.3 2 .5 8.8.5 8.8.5s6.8 0 8.8-.5c1.1-.3 2-1.2 2.2-2.3.5-2 .5-4.7.5-4.7s0-2.7-.5-4.7zM9.8 15.5V8.5l5.8 3.5-5.8 3.5z" />
        </svg>
      </span>
    )
  }
  return null
}

export default function MediaSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="media" className="bg-islamic-cream-light py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              Media
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl">
              Videos &amp; reels from the masjid
            </h2>
            <p className="mt-3 max-w-2xl text-base text-islamic-navy/70 sm:text-lg">
              Watch short reels and posts from events, khutbahs, and community life.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:self-auto"
          >
            View all
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>

        {/* Masonry — CSS columns keep natural aspects, no height-mismatch */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6">
          {MEDIA.map((item, i) => {
            const isActive = activeIndex === i
            const embedSrc = embedSrcFor(item)
            const thumb = thumbnailFor(item)
            const isPortrait = item.aspect === 'portrait'
            const mediaAspect = isPortrait ? 'aspect-[9/16]' : 'aspect-video'

            return (
              <article
                key={i}
                className="group mb-5 inline-block w-full break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-islamic-navy/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-islamic-green/20 lg:mb-6"
              >
                <div
                  className={`relative ${mediaAspect} w-full overflow-hidden bg-islamic-navy-dark`}
                >
                  {isActive && embedSrc ? (
                    <iframe
                      src={embedSrc}
                      title={item.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Play ${item.title}`}
                      className="group/play absolute inset-0 block w-full"
                    >
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumb}
                          alt={item.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover/play:scale-[1.04]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-islamic-navy to-islamic-navy-dark" />
                      )}
                      <span className="absolute inset-0 bg-gradient-to-t from-islamic-navy-dark/80 via-islamic-navy-dark/10 to-transparent" />

                      {/* Platform badge + aspect pill */}
                      <span className="absolute left-3 top-3 flex items-center gap-2">
                        {item.platform && <PlatformBadge platform={item.platform} />}
                        {isPortrait && (
                          <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-islamic-navy shadow ring-1 ring-black/5">
                            Reel
                          </span>
                        )}
                      </span>

                      {/* Play button */}
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl ring-4 ring-white/30 transition duration-300 group-hover/play:scale-110 group-hover/play:ring-white/50">
                          <PlayIcon className="ml-0.5 h-7 w-7 text-islamic-green" />
                        </span>
                      </span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-3 p-5">
                  <h3 className="line-clamp-2 text-base font-bold leading-snug text-islamic-navy sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-islamic-navy/65">
                    {item.description}
                  </p>
                  {item.externalUrl && (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-islamic-green transition hover:text-islamic-green-dark"
                    >
                      {item.platform === 'facebook' ? 'Watch on Facebook' : 'Open original'}
                      <ChevronRightIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
