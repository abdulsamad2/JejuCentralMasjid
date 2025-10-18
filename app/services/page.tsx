'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import {
  AcademicCapIcon,
  HeartIcon,
  UserGroupIcon,
  LanguageIcon,
  HandRaisedIcon,
  ClipboardDocumentCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const services = [
  {
    id: 'education',
    icon: AcademicCapIcon,
    title: 'Islamic Education & Learning',
    description: 'Comprehensive Islamic education programs for all ages and backgrounds',
    features: [
      'Quran recitation and memorization classes',
      'Arabic language instruction (beginner to advanced)',
      'Islamic studies and theology courses',
      'Children\'s weekend Islamic school',
      'Adult conversion and new Muslim support',
      'Women\'s Islamic education circles'
    ],
    schedule: 'Saturdays: 10 AM - 4 PM, Weekday evenings: 7 PM - 9 PM',
    contact: 'education@jejumasjid.org',
    image: '/api/placeholder/400/300'
  },
  {
    id: 'marriage',
    icon: HeartIcon,
    title: 'Marriage & Family Services',
    description: 'Supporting Muslim families through all stages of life',
    features: [
      'Nikah (Islamic marriage) ceremonies',
      'Pre-marital counseling and guidance',
      'Marriage counseling for couples',
      'Family mediation services',
      'Divorce proceedings support',
      'Child custody Islamic guidance'
    ],
    schedule: 'By appointment - flexible scheduling',
    contact: 'family@jejumasjid.org',
    image: '/api/placeholder/400/300'
  },
  {
    id: 'community',
    icon: UserGroupIcon,
    title: 'Community Support Services',
    description: 'Practical assistance for community members in need',
    features: [
      'New arrival orientation and housing assistance',
      'Job search and career guidance',
      'Social services navigation',
      'Emergency financial assistance',
      'Mental health counseling referrals',
      'Elder care coordination'
    ],
    schedule: 'Monday-Friday: 9 AM - 6 PM',
    contact: 'support@jejumasjid.org',
    image: '/api/placeholder/400/300'
  },
  {
    id: 'translation',
    icon: LanguageIcon,
    title: 'Translation & Documentation',
    description: 'Language support services for the Muslim community',
    features: [
      'Korean-Arabic-English translation',
      'Document translation (official)',
      'Interpretation services for medical/legal appointments',
      'Immigration document assistance',
      'University application support',
      'Business document translation'
    ],
    schedule: 'Tuesday-Thursday: 10 AM - 5 PM',
    contact: 'translation@jejumasjid.org',
    image: '/api/placeholder/400/300'
  },
  {
    id: 'counseling',
    icon: HandRaisedIcon,
    title: 'Counseling & Spiritual Guidance',
    description: 'Personal and spiritual support in accordance with Islamic principles',
    features: [
      'Individual spiritual counseling',
      'Group therapy sessions',
      'Grief and loss support',
      'Addiction recovery programs',
      'Stress and anxiety management',
      'Life transition guidance'
    ],
    schedule: 'Available by appointment',
    contact: 'counseling@jejumasjid.org',
    image: '/api/placeholder/400/300'
  },
  {
    id: 'certification',
    icon: ClipboardDocumentCheckIcon,
    title: 'Halal Certification & Food Services',
    description: 'Ensuring access to halal food and proper Islamic dietary guidance',
    features: [
      'Halal restaurant verification',
      'Halal food source guidance',
      'Ramadan iftar coordination',
      'Community meal preparation',
      'Food pantry for needy families',
      'Dietary consultation'
    ],
    schedule: 'Daily inquiries welcome',
    contact: 'halal@jejumasjid.org',
    image: '/api/placeholder/400/300'
  }
]

const programs = [
  {
    title: 'Friday Jumu\'ah Prayer',
    time: 'Every Friday at 12:30 PM',
    description: 'Weekly congregational prayer with khutbah (sermon) in Arabic and Korean'
  },
  {
    title: 'Ramadan Programs',
    time: 'Daily during Ramadan month',
    description: 'Community iftar meals, Tarawih prayers, and special Ramadan activities'
  },
  {
    title: 'Eid Celebrations',
    time: 'Eid al-Fitr & Eid al-Adha',
    description: 'Special Eid prayers, community feast, and cultural celebrations'
  },
  {
    title: 'Youth Programs',
    time: 'Saturdays 2 PM - 5 PM',
    description: 'Islamic education, sports activities, and character development for teenagers'
  }
]

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-islamic-green text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Community Services</h1>
          <p className="text-xl text-islamic-cream mb-8 max-w-3xl mx-auto">
            Comprehensive support services designed to meet the spiritual, educational, 
            and practical needs of the Muslim community in Jeju Island
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-islamic-green/10 rounded-full flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-islamic-green" />
                    </div>
                    <h2 className="text-3xl font-bold text-islamic-navy">{service.title}</h2>
                  </div>
                  
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-islamic-navy mb-4">Services Offered:</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircleIcon className="h-5 w-5 text-islamic-green mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <ClockIcon className="h-5 w-5 text-islamic-gold" />
                      <span className="text-gray-600">{service.schedule}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="h-5 w-5 text-islamic-gold" />
                      <a 
                        href={`mailto:${service.contact}`}
                        className="text-islamic-green hover:text-islamic-green-dark font-semibold"
                      >
                        {service.contact}
                      </a>
                    </div>
                  </div>

                  <button className="btn-primary">
                    Learn More About This Service
                  </button>
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-gradient-to-br from-islamic-cream to-islamic-green/20 rounded-2xl h-80 flex items-center justify-center">
                    <div className="text-center">
                      <service.icon className="h-24 w-24 text-islamic-green/30 mx-auto mb-4" />
                      <p className="text-islamic-navy/70 font-semibold">{service.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Programs */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-islamic-navy text-center mb-12">Regular Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-islamic-navy mb-3">{program.title}</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <ClockIcon className="h-5 w-5 text-islamic-gold" />
                  <span className="font-semibold text-islamic-green">{program.time}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Request Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-islamic-navy text-white rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Request a Service</h2>
              <p className="text-xl text-islamic-cream">
                Need assistance or want to schedule a consultation? We're here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-islamic-gold mb-6">Contact Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-6 w-6 text-islamic-gold" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-islamic-cream">+82-64-123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="h-6 w-6 text-islamic-gold" />
                    <div>
                      <p className="font-semibold">General Email</p>
                      <p className="text-islamic-cream">services@jejumasjid.org</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-islamic-gold mb-6">Office Hours</h3>
                <div className="space-y-2 text-islamic-cream">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Emergency only</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <a 
                href="/contact"
                className="inline-block bg-islamic-gold text-islamic-navy px-8 py-3 rounded-lg font-semibold hover:bg-islamic-gold-dark transition-colors"
              >
                Contact Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 bg-islamic-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Join Our Team</h2>
          <p className="text-xl text-islamic-cream mb-8 max-w-3xl mx-auto">
            Help us serve the community by volunteering your time and skills. 
            Every contribution makes a difference in building a stronger Muslim community in Jeju.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <AcademicCapIcon className="h-12 w-12 text-islamic-gold mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Teaching & Education</h3>
              <p className="text-islamic-cream text-sm">Help with Islamic education, language classes, and tutoring</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <LanguageIcon className="h-12 w-12 text-islamic-gold mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Translation Services</h3>
              <p className="text-islamic-cream text-sm">Assist community members with translation and interpretation</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <UserGroupIcon className="h-12 w-12 text-islamic-gold mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Community Outreach</h3>
              <p className="text-islamic-cream text-sm">Help with events, fundraising, and community support activities</p>
            </div>
          </div>

          <a 
            href="/contact"
            className="inline-block bg-white text-islamic-green px-8 py-3 rounded-lg font-semibold hover:bg-islamic-cream transition-colors"
          >
            Volunteer With Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}