import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import GalleryGrid from '@/components/GalleryGrid'
import { getGallery } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo/pageMetadata'

export const revalidate = 120

export const metadata = pageMetadata({
  title: 'Gallery',
  description: 'Browse photos from our community, events, and activities at Jeju Central Masjid.',
  path: '/gallery',
  image: { url: '/assets/gathering-04.jpg', width: 1536, height: 1536, alt: 'A community gathering at Jeju Central Masjid' },
})

export default async function GalleryPage() {
  const { categories, items } = await getGallery()
  return (
    <main className="min-h-screen">
      <Navbar />
      <BreadcrumbJsonLd trail={[{ name: 'Gallery', path: '/gallery' }]} />
      <PageHeader
        eyebrow="Our Gallery"
        title="Moments from the masjid"
        description="Photos from community events, prayers, and gatherings at Jeju Central Masjid."
      />
      <GalleryGrid categories={categories} photos={items} />
      <Footer />
    </main>
  )
}