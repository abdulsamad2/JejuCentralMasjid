import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import PrayerTimesWidget from '../components/PrayerTimesWidget'
import DonationSection from '../components/DonationSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <PrayerTimesWidget />
      <AboutSection />
      <ServicesSection />
      <DonationSection />
      <Footer />
    </main>
  )
}