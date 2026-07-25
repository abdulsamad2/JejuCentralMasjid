import { breadcrumbJsonLd, type Crumb } from '@/lib/seo/breadcrumbs'

/**
 * Emits BreadcrumbList JSON-LD. Drop next to <PageHeader> on any non-home
 * page; "Home" is added for you, so pass only the trail below it.
 */
export default function BreadcrumbJsonLd({ trail }: { trail: Crumb[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(trail)) }}
    />
  )
}
