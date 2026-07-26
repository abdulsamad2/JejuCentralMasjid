'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../lib/data/gallery'

const FILTERS = ['All', ...GALLERY_CATEGORIES.filter((c) => GALLERY_ITEMS.some((i) => i.category === c))]

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const items =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeCategory)

  const selected = lightboxIndex === null ? null : items[lightboxIndex]

  const close = useCallback(() => setLightboxIndex(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightboxIndex((idx) => (idx === null ? idx : (idx + dir + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, close, step])

  return (
    <section className="bg-islamic-cream py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
          {FILTERS.map((category) => {
            const active = activeCategory === category
            const count =
              category === 'All'
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((i) => i.category === category).length
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category)
                  setLightboxIndex(null)
                }}
                className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'bg-islamic-green text-white shadow-md shadow-islamic-green/20'
                    : 'bg-white text-islamic-navy ring-1 ring-islamic-navy/10 hover:ring-islamic-green hover:text-islamic-green'
                }`}
              >
                {category}
                <span className={`text-xs ${active ? 'text-white/75' : 'text-islamic-navy/45'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Photo grid */}
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-islamic-navy/15 bg-islamic-cream-light p-10 text-center">
            <p className="text-base font-semibold text-islamic-navy">No photos in this category yet</p>
            <p className="mt-1 text-sm text-islamic-navy/70">Please check back soon, insha&apos;Allah.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {items.map((item, i) => (
              <li key={item.src}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View photo: ${item.title}`}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-islamic-navy shadow-sm ring-1 ring-islamic-navy/5 transition hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-islamic-green"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-islamic-navy-dark/70 via-transparent to-transparent opacity-80 transition group-hover:opacity-100"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-3 text-left">
                    <span className="line-clamp-1 text-xs font-semibold text-white sm:text-sm">
                      {item.title}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Lightbox */}
        {selected && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-islamic-navy-dark/90 p-4"
            onClick={close}
          >
            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={close}
                aria-label="Close photo"
                className="absolute -top-1 right-0 z-10 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl">
                <Image
                  src={selected.src}
                  alt={selected.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="min-w-0 text-center">
                  <p className="truncate text-sm font-bold text-white sm:text-base">{selected.title}</p>
                  <p className="text-xs text-white/60">
                    {selected.category} · {(lightboxIndex ?? 0) + 1} of {items.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                >
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
