import Link from 'next/link'
import { MegaphoneIcon } from '@heroicons/react/24/outline'
import { NEWS } from '../lib/data/news'

/**
 * TV-style news ticker — sits above the Hero on the homepage.
 *
 * Items render twice in the same track. The CSS animation translates the
 * track from 0 to -50% over a fixed duration; because the second copy is a
 * pixel-perfect duplicate of the first, the loop is seamless.
 *
 * Pauses on hover/focus so users can read or click an item.
 * Animation is disabled under prefers-reduced-motion.
 */

export default function NewsTicker() {
  if (NEWS.length === 0) return null
  const items = [...NEWS].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="news-ticker-pauseable relative isolate overflow-hidden bg-islamic-navy text-white">
      <div className="mx-auto flex max-w-7xl items-stretch">
        {/* Sticky label on the left */}
        <div className="z-10 flex flex-shrink-0 items-center gap-2 bg-islamic-gold px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-islamic-navy sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-xs">
          <MegaphoneIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Latest</span>
          <span className="xs:hidden">News</span>
        </div>

        {/* Ticker viewport — fades the edges so items appear/disappear smoothly */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)',
          }}
        >
          <div className="news-ticker-track flex w-max items-center whitespace-nowrap py-2 text-sm sm:text-[15px]">
            {/* Render the items twice for seamless loop */}
            {[...items, ...items].map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/news/${item.slug}`}
                className="group inline-flex items-center px-5 transition hover:text-islamic-gold sm:px-7"
              >
                {item.tag && (
                  <span className="mr-2.5 rounded-full bg-islamic-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-islamic-gold sm:text-[11px]">
                    {item.tag}
                  </span>
                )}
                <span className="font-semibold">{item.title}</span>
                <span className="mx-3 text-islamic-cream/40">·</span>
                <span className="text-islamic-cream/70">{item.excerpt}</span>
                <span className="mx-5 inline-block h-1 w-1 rounded-full bg-islamic-cream/30 sm:mx-7" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
