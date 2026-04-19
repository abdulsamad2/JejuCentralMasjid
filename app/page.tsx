import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PrayerTimesBar from '../components/PrayerTimesBar'
import Hero from '../components/Hero'
import NewsSection from '../components/NewsSection'
import EventsSection from '../components/EventsSection'
import ServicesSection from '../components/ServicesSection'
import MediaSection from '../components/MediaSection'
import WeeklyCirclesPromo from '../components/WeeklyCirclesPromo'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <PrayerTimesBar />
      <Hero />
      <NewsSection />
      <EventsSection />
      <ServicesSection />
      <MediaSection />
      <WeeklyCirclesPromo />
      <Footer />
    </main>
  )
}