import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import GalleryGrid from '../../components/GalleryGrid'

export const metadata = {
  title: 'Gallery | Central Jeju Masjid',
  description: 'Browse photos from our community, events, and activities at Central Jeju Masjid.',
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        eyebrow="Our Gallery"
        title="Moments from the masjid"
        description="Photos from community events, prayers, and gatherings at Jeju Central Masjid."
      />
      <GalleryGrid />
      <Footer />
    </main>
  )
}