'use client'

import Link from 'next/link'
import { 
  AcademicCapIcon, 
  HeartIcon, 
  UserGroupIcon, 
  GlobeAltIcon,
  HandRaisedIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  BuildingOffice2Icon,
  UsersIcon,
  CakeIcon,
  BookOpenIcon,
  LanguageIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

const services = [
  {
    icon: CakeIcon,
    title: 'Halal Food Preparation',
    description: 'Community kitchen providing halal meals for visitors, tourists, and special occasions including Ramadan.',
    highlight: 'Active',
    color: 'green',
    status: 'Operating daily',
    link: '/services#kitchen',
    category: 'essential'
  },
  {
    icon: AcademicCapIcon,
    title: 'University Student Guidance',
    description: 'Support for Muslim university students studying in Jeju, including academic and social assistance.',
    highlight: 'Priority',
    color: 'blue',
    status: 'Serving 30+ students',
    link: '/services#students',
    category: 'essential'
  },
  {
    icon: GlobeAltIcon,
    title: 'Tourist & Visitor Services',
    description: 'Assistance for Muslim tourists with prayer times, halal food guidance, and local support.',
    highlight: 'Essential',
    color: 'purple',
    status: '24/7 guidance',
    link: '/services#tourism',
    category: 'essential'
  },
  {
    icon: UserGroupIcon,
    title: 'Prayer Facilities',
    description: 'Separate prayer areas for men and women in our current temporary facility.',
    highlight: 'Temporary',
    color: 'orange',
    status: 'Working on permanent space',
    link: '/services#prayer',
    category: 'essential'
  },
  {
    icon: ClipboardDocumentListIcon,
    title: 'Halal Food Guidance',
    description: 'Educational sessions on halal food preparation and sourcing in Jeju (guidance only, not certification).',
    link: '/services#halal-guidance',
    category: 'education'
  },
  {
    icon: UsersIcon,
    title: 'Ramadan Programs',
    description: 'Special sessions, community iftars, and support during the holy month of Ramadan.',
    link: '/services#ramadan',
    category: 'community'
  },
  {
    icon: HeartIcon,
    title: 'Marriage & Family',
    description: 'Nikah ceremonies, marriage counseling, and family guidance services for the Muslim community.',
    link: '/services#marriage',
    category: 'community'
  },
  {
    icon: BookOpenIcon,
    title: 'Islamic Education',
    description: 'Quran classes, Islamic studies, and Arabic language sessions for adults and children.',
    link: '/services#education',
    category: 'education'
  },
  {
    icon: HandRaisedIcon,
    title: 'Community Counseling',
    description: 'Personal and spiritual counseling sessions for individuals and families in need of guidance.',
    link: '/services#counseling',
    category: 'support'
  },
  {
    icon: BuildingOffice2Icon,
    title: 'Integration Support',
    description: 'Help for new Muslim residents with housing, documentation, and social integration.',
    link: '/services#integration',
    category: 'support'
  },
  {
    icon: PhoneIcon,
    title: 'Emergency Assistance',
    description: 'Support for Muslims facing emergency situations while in Jeju Island.',
    link: '/services#emergency',
    category: 'support'
  }
]

import { useState } from 'react'

function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [showMore, setShowMore] = useState(false)

  // Filter services based on active category
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory)

  // Service categories
  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'essential', name: 'Essential Services' },
    { id: 'education', name: 'Education' },
    { id: 'community', name: 'Community' },
    { id: 'support', name: 'Support' }
  ]

  // Get color classes based on service color
  const getColorClasses = (color: string | undefined) => {
    const colorMap: Record<string, string> = {
      green: 'bg-islamic-green-light text-white',
      blue: 'bg-islamic-navy-light text-white',
      purple: 'bg-purple-500 text-white',
      orange: 'bg-islamic-gold-muted text-islamic-navy'
    }
    return color && colorMap[color] ? colorMap[color] : 'bg-gray-200 text-gray-800'
  }

  // Get icon background based on service color
  const getIconBgClasses = (color: string | undefined) => {
    const bgMap: Record<string, string> = {
      green: 'from-islamic-green-light/20 to-islamic-green-light/5 text-islamic-green-light',
      blue: 'from-islamic-navy-light/20 to-islamic-navy-light/5 text-islamic-navy-light',
      purple: 'from-purple-500/20 to-purple-500/5 text-purple-500',
      orange: 'from-islamic-gold-muted/20 to-islamic-gold-muted/5 text-islamic-gold-muted'
    }
    return `bg-gradient-to-br ${color && bgMap[color] ? bgMap[color] : 'from-islamic-navy/20 to-islamic-navy/5 text-islamic-navy'}`
  }

  return (
    <section className="py-24 pb-32 bg-gradient-to-b from-islamic-cream to-islamic-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-islamic-green-light/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-islamic-gold-muted/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="bg-islamic-white/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg border border-islamic-green-light/10 mb-3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-islamic-navy to-islamic-green-light bg-clip-text text-transparent text-readable">
                Community Services
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-readable">
              Support for Muslim students, tourists, residents, and visitors in Jeju Island
            </p>
          </div>
          
          {/* Service Statistics */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <div className="bg-islamic-white/70 backdrop-blur-sm rounded-xl px-5 py-2 border border-islamic-green-light/20">
              <div className="text-xl font-bold text-islamic-green-light text-readable">11+</div>
              <div className="text-sm text-gray-600 text-readable">Services</div>
            </div>
            <div className="bg-islamic-white/70 backdrop-blur-sm rounded-xl px-5 py-2 border border-islamic-gold-muted/20">
              <div className="text-xl font-bold text-islamic-gold-muted text-readable">24/7</div>
              <div className="text-sm text-gray-600 text-readable">Support</div>
            </div>
            <div className="bg-islamic-white/70 backdrop-blur-sm rounded-xl px-5 py-2 border border-islamic-navy/20">
              <div className="text-xl font-bold text-islamic-navy text-readable">100+</div>
              <div className="text-sm text-gray-600 text-readable">Members</div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-20">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`btn-islamic text-readable ${
                  activeCategory === category.id
                    ? 'btn-islamic-primary shadow-md'
                    : 'bg-islamic-white text-islamic-navy hover:bg-islamic-green-light hover:text-white border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid - Highlighted Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {filteredServices.filter(service => service.highlight).slice(0, 4).map((service, index) => (
            <div
              key={`highlight-${index}`}
              className="relative bg-islamic-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              {/* Service Badge */}
              <div className={`absolute top-3 right-3 ${getColorClasses(service.color)} text-sm font-bold px-3 py-1 rounded-full text-readable`}>
                {service.highlight}
              </div>
              
              {/* Icon */}
              <div className="p-6">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${getIconBgClasses(service.color)} group-hover:scale-110 transition-all duration-300`}>
                  <service.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-lg font-bold text-islamic-navy mb-2 text-readable">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-base mb-4 line-clamp-3 text-readable">
                  {service.description}
                </p>
                
                {service.status && (
                  <div className="flex items-center text-base text-islamic-green-light mb-4 text-readable">
                    <div className="w-2 h-2 bg-islamic-green-light rounded-full mr-2 animate-pulse"></div>
                    {service.status}
                  </div>
                )}
                
                <Link 
                  href={service.link}
                  className="inline-flex items-center text-base font-medium text-islamic-green-light hover:text-islamic-green-dark transition-colors text-readable"
                >
                  <span>Learn more</span>
                  <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Service List - Remaining Services */}
        <div className="bg-islamic-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-20">
          <div className="bg-islamic-navy/95 text-white p-6">
            <h3 className="text-xl font-bold text-readable">All Available Services</h3>
            <p className="text-islamic-cream/90 text-base mt-1 text-readable">
              Supporting the Muslim community in Jeju Island
            </p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {filteredServices.slice(0, showMore ? undefined : 6).map((service, index) => (
              <div key={`list-${index}`} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconBgClasses(service.color)}`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <h4 className="text-base font-semibold text-islamic-navy truncate text-readable">
                        {service.title}
                      </h4>
                      {service.highlight && (
                        <span className={`ml-2 ${getColorClasses(service.color)} text-sm px-2 py-0.5 rounded-full text-readable`}>
                          {service.highlight}
                        </span>
                      )}
                    </div>
                    <p className="text-base text-gray-600 line-clamp-2 text-readable">
                      {service.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <Link
                      href={service.link}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-islamic-green-light/10 text-islamic-green-light hover:bg-islamic-green-light hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Show More/Less Button */}
          {filteredServices.length > 6 && (
            <div className="p-4 border-t border-gray-100 text-center">
              <button
                onClick={() => setShowMore(!showMore)}
                className="btn-islamic btn-islamic-secondary text-readable"
              >
                <span className="font-medium">
                  {showMore ? 'Show Less' : `Show ${filteredServices.length - 6} More Services`}
                </span>
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform ${showMore ? 'rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Services Info Card */}
        <div className="bg-gradient-to-br from-islamic-navy to-islamic-navy/90 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 pointer-events-none">
            <div className="islamic-pattern h-full w-full opacity-5"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
            {/* Notice Card */}
            <div className="bg-islamic-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-islamic-gold-muted/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-islamic-gold-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-islamic-gold-muted mb-2 text-readable">Important Notice</h4>
                  <ul className="space-y-1 text-base text-islamic-cream/90 list-disc list-inside text-readable">
                    <li>We provide halal food guidance, not official certification</li>
                    <li>Kitchen facilities available during special events and Ramadan</li>
                    <li>Currently operating from a temporary rented facility</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-3 text-white">Need Help?</h4>
                <p className="text-islamic-cream/90 mb-6 text-sm">
                  Whether you're a student, tourist, or resident, our community is here to support you.
                </p>
                <div className="flex justify-center gap-4">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center bg-islamic-gold text-islamic-navy px-4 py-2 rounded-lg font-medium hover:bg-islamic-gold/90 transition-all"
                  >
                    <span>Contact Us</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </Link>
                  <Link 
                    href="/donate" 
                    className="inline-flex items-center bg-islamic-green text-white px-4 py-2 rounded-lg font-medium hover:bg-islamic-green-dark transition-all"
                  >
                    <span>Support Us</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection