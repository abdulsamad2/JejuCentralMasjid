'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  StarIcon,
  CheckBadgeIcon,
  MagnifyingGlassIcon,
  TagIcon
} from '@heroicons/react/24/outline'

const restaurants = [
  {
    id: 1,
    name: 'Halal Kitchen Jeju',
    type: 'Middle Eastern & Korean',
    area: 'Jeju City',
    address: '123 Halal Street, Jeju City',
    phone: '+82-64-123-4567',
    hours: '11:00 AM - 10:00 PM',
    rating: 4.5,
    certification: 'KMF Certified',
    specialties: ['Kebab', 'Korean BBQ', 'Biryani'],
    description: 'Authentic halal Korean and Middle Eastern cuisine with proper certification.',
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    name: 'Muslim Restaurant Seogwipo',
    type: 'Asian Fusion',
    area: 'Seogwipo',
    address: '456 Harbor Road, Seogwipo',
    phone: '+82-64-234-5678',
    hours: '12:00 PM - 9:00 PM',
    rating: 4.3,
    certification: 'Owner Verified',
    specialties: ['Seafood', 'Noodles', 'Curry'],
    description: 'Family-owned restaurant serving fresh halal seafood and Asian dishes.',
    image: '/api/placeholder/300/200'
  },
  {
    id: 3,
    name: 'Jeju Halal Mart & Café',
    type: 'Groceries & Light Meals',
    area: 'Jeju City',
    address: '789 Central Avenue, Jeju City',
    phone: '+82-64-345-6789',
    hours: '8:00 AM - 8:00 PM',
    rating: 4.7,
    certification: 'KMF Certified',
    specialties: ['Halal Groceries', 'Fresh Meat', 'Sandwiches'],
    description: 'One-stop shop for halal groceries and quick halal meals.',
    image: '/api/placeholder/300/200'
  }
]

const halalTips = [
  {
    title: 'Look for Certification',
    description: 'Check for KMF (Korea Muslim Federation) certification or ask about halal sources.',
    icon: CheckBadgeIcon
  },
  {
    title: 'Seafood Options', 
    description: 'Most seafood in Jeju is naturally halal, but verify cooking methods and ingredients.',
    icon: TagIcon
  },
  {
    title: 'Vegetarian Alternatives',
    description: 'When in doubt, vegetarian and vegan options are generally safer choices.',
    icon: TagIcon
  },
  {
    title: 'Ask About Ingredients',
    description: 'Learn key Korean phrases to ask about pork, alcohol, and other non-halal ingredients.',
    icon: TagIcon
  }
]

const groceryStores = [
  {
    name: 'Jeju Halal Market',
    address: 'Jeju City Center',
    specialties: ['Halal meat', 'Middle Eastern spices', 'Frozen foods'],
    contact: '+82-64-111-2222'
  },
  {
    name: 'Muslim Grocery Store',
    address: 'Near University area',
    specialties: ['South Asian products', 'Halal snacks', 'Prayer items'],
    contact: '+82-64-333-4444'
  },
  {
    name: 'International Food Store',
    address: 'Seogwipo district',
    specialties: ['Halal certification verification', 'Import foods', 'Ramadan supplies'],
    contact: '+82-64-555-6666'
  }
]

export default function HalalFoodPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArea, setSelectedArea] = useState('All Areas')

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesArea = selectedArea === 'All Areas' || restaurant.area === selectedArea
    return matchesSearch && matchesArea
  })

  return (
    <main>
      <Navbar />
      
      <PageHeader
        eyebrow="Halal Food Guide"
        title="Where to eat halal in Jeju"
        description="Discover halal dining options, grocery stores, and food guidance for the Muslim community in Jeju Island."
      />

      <section className="border-b border-islamic-navy/8 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-islamic-navy/40" />
              <input
                type="text"
                placeholder="Search restaurants, cuisine type..."
                className="w-full rounded-full border border-islamic-navy/15 bg-white py-3 pl-10 pr-4 text-sm text-islamic-navy placeholder:text-islamic-navy/40 focus:border-islamic-green focus:outline-none focus:ring-2 focus:ring-islamic-green/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="rounded-full border border-islamic-navy/15 bg-white px-4 py-3 text-sm text-islamic-navy focus:border-islamic-green focus:outline-none focus:ring-2 focus:ring-islamic-green/20"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              <option>All Areas</option>
              <option>Jeju City</option>
              <option>Seogwipo</option>
            </select>
          </div>
        </div>
      </section>

      {/* Halal Restaurants */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-islamic-navy text-center mb-12">Halal Restaurants</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-islamic-cream to-islamic-green/20"></div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-islamic-navy">{restaurant.name}</h3>
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-4 w-4 text-islamic-gold fill-current" />
                      <span className="text-sm font-semibold">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-islamic-green/10 text-islamic-green px-3 py-1 rounded-full text-sm font-semibold">
                      {restaurant.type}
                    </span>
                    <span className="bg-islamic-gold/10 text-islamic-gold px-3 py-1 rounded-full text-sm font-semibold">
                      {restaurant.certification}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{restaurant.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{restaurant.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <PhoneIcon className="h-4 w-4" />
                      <span>{restaurant.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <ClockIcon className="h-4 w-4" />
                      <span>{restaurant.hours}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-islamic-navy mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.specialties.map((specialty, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Grocery Stores */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-islamic-navy text-center mb-12">Halal Grocery Stores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groceryStores.map((store, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-islamic-navy mb-3">{store.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <PhoneIcon className="h-4 w-4" />
                    <span>{store.contact}</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-islamic-navy mb-2">Available Products:</p>
                  <ul className="space-y-1">
                    {store.specialties.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center space-x-2">
                        <CheckBadgeIcon className="h-4 w-4 text-islamic-green" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Halal Guidelines */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-islamic-navy text-center mb-12">Halal Dining Tips in Jeju</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {halalTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-islamic-cream rounded-2xl">
                <div className="w-12 h-12 bg-islamic-green/10 rounded-full flex items-center justify-center">
                  <tip.icon className="h-6 w-6 text-islamic-green" />
                </div>
                <div>
                  <h3 className="font-bold text-islamic-navy mb-2">{tip.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Korean Phrases for Halal Inquiries */}
      <section className="py-16 bg-islamic-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Useful Korean Phrases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-islamic-gold mb-4">Asking About Ingredients</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">돼지고기가 들어있나요?</p>
                  <p className="text-islamic-cream text-sm">Does this contain pork?</p>
                  <p className="text-islamic-cream text-xs font-arabic-modern arabic-features">هل يحتوي على لحم الخنزير؟</p>
                </div>
                <div>
                  <p className="font-semibold">술이 들어있나요?</p>
                  <p className="text-islamic-cream text-sm">Does this contain alcohol?</p>
                  <p className="text-islamic-cream text-xs font-arabic-modern arabic-features">هل يحتوي على كحول؟</p>
                </div>
                <div>
                  <p className="font-semibold">할랄 음식이 있나요?</p>
                  <p className="text-islamic-cream text-sm">Do you have halal food?</p>
                  <p className="text-islamic-cream text-xs font-arabic-modern arabic-features">هل لديكم طعام حلال؟</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-islamic-gold mb-4">Dietary Restrictions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">저는 무슬림이에요</p>
                  <p className="text-islamic-cream text-sm">I am Muslim</p>
                  <p className="text-islamic-cream text-xs font-arabic-modern arabic-features">أنا مسلم</p>
                </div>
                <div>
                  <p className="font-semibold">채식주의 음식 주세요</p>
                  <p className="text-islamic-cream text-sm">Please give me vegetarian food</p>
                  <p className="text-islamic-cream text-xs font-arabic-modern arabic-features">من فضلك أعطني طعام نباتي</p>
                </div>
                <div>
                  <p className="font-semibold">해산물은 괜찮아요</p>
                  <p className="text-islamic-cream text-sm">Seafood is okay</p>
                  <p className="text-islamic-cream text-xs font-arabic-modern arabic-features">المأكولات البحرية مقبولة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Recommendations */}
      <section className="py-16 bg-islamic-green text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Share Your Recommendations</h2>
          <p className="text-xl text-islamic-cream mb-8">
            Help fellow Muslims by sharing your halal food discoveries in Jeju Island
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <p className="text-islamic-cream mb-6">
              Found a new halal restaurant or grocery store? Let us know so we can add it to our directory!
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-islamic-gold text-islamic-navy px-8 py-3 rounded-lg font-semibold hover:bg-islamic-gold-dark transition-colors"
            >
              Submit Recommendation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}