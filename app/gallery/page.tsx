import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import GalleryGrid from '../../components/GalleryGrid'

export const metadata = {
  title: 'Gallery | Central Jeju Masjid',
  description: 'Browse photos from our community, events, and activities at Central Jeju Masjid.',
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="bg-islamic-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our Gallery
            </h1>
            <p className="mt-4 text-xl text-islamic-gold max-w-2xl mx-auto">
              <span className="font-arabic-modern arabic-features">صور من مسجد جيجو المركزي</span> 
              <br />Photos from Central Jeju Masjid
            </p>
          </div>
        </div>
      </div>
      <GalleryGrid />
      <Footer />
    </main>
  )
}