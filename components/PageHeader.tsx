import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

type PageHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  action?: {
    label: string
    href: string
  }
}

/**
 * Consistent page header used across all non-home pages.
 * Matches the home section-header pattern:
 *   - Green underline + uppercase eyebrow
 *   - Large bold navy heading
 *   - Short description
 *   - Optional pill CTA on the right
 * Cream background, sits directly under the navbar.
 */
export default function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <section className="border-b border-islamic-navy/8 bg-gradient-to-b from-islamic-cream-light to-islamic-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-islamic-green">
              <span className="h-px w-8 bg-islamic-green" />
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-islamic-navy sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-2xl text-base text-islamic-navy/70 sm:text-lg">
                {description}
              </p>
            )}
          </div>
          {action && (
            <Link
              href={action.href}
              className="inline-flex items-center gap-1.5 self-start rounded-full border border-islamic-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-islamic-navy transition hover:border-islamic-green hover:text-islamic-green sm:self-auto"
            >
              {action.label}
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
