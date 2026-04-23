import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import MawaqitWidget from '../components/MawaqitWidget'
import ServicesSection from '../components/ServicesSection'
import UnlockQuranSection from '../components/UnlockQuranSection'
import WeeklyCirclesPromo from '../components/WeeklyCirclesPromo'
import CommunityMoments from '../components/CommunityMoments'
import HalalFoodSection from '../components/HalalFoodSection'
import EventsSection from '../components/EventsSection'
import NewsSection from '../components/NewsSection'
import SupportAppeal from '../components/SupportAppeal'
import VisitUsSection from '../components/VisitUsSection'

/**
 * Homepage narrative flow:
 *   1. Utility  — who's here / when is next prayer
 *   2. Identity — who we are (Hero)
 *   3. Programs — what we offer (Services → Unlock Qur'an → Weekly Circles)
 *   4. Proof    — community moments (real photos)
 *   5. Timely   — events & news
 *   6. Action   — donate (with context built) → visit us
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* 1. Identity */}
      <Hero />

      {/* 2. Authoritative prayer times (Mawaqit) */}
      <MawaqitWidget />

      {/* 3. Programs */}
      <ServicesSection />
      <UnlockQuranSection />
      <WeeklyCirclesPromo />

      {/* 4. Proof */}
      <CommunityMoments />

      {/* 5. Action (primary) — ride the momentum from community proof */}
      <SupportAppeal />

      {/* 6. Practical living guide */}
      <HalalFoodSection />

      {/* 7. Timely */}
      <EventsSection />
      <NewsSection />

      {/* 8. Visit */}
      <VisitUsSection />

      <Footer />
    </main>
  )
}