'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  CakeIcon,
  AcademicCapIcon,
  HeartIcon,
  SpeakerWaveIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'

const upcomingEvents = [
  {
    id: 1,
    title: 'Friday Jumu\'ah Prayer',
    date: '2024-10-25',
    time: '12:30 PM',
    duration: '1 hour',
    location: 'Main Prayer Hall',
    category: 'Religious',
    description: 'Weekly congregational prayer with khutbah in Arabic and Korean translation',
    capacity: 80,
    registered: 45,
    recurring: 'Weekly',
    icon: SpeakerWaveIcon
  },
  {
    id: 2,
    title: 'Islamic Studies Class - Seerah',
    date: '2024-10-26',
    time: '7:00 PM',
    duration: '2 hours',
    location: 'Education Room',
    category: 'Education',
    description: 'Learning about the life of Prophet Muhammad (PBUH) - Session 8: The Hijra',
    capacity: 25,
    registered: 18,
    recurring: 'Weekly',
    icon: AcademicCapIcon
  },
  {
    id: 3,
    title: 'Community Iftar Planning Meeting',
    date: '2024-10-28',
    time: '6:30 PM',
    duration: '1.5 hours',
    location: 'Community Room',
    category: 'Community',
    description: 'Planning for next Ramadan\'s community iftar program and volunteer coordination',
    capacity: 20,
    registered: 12,
    recurring: null,
    icon: UserGroupIcon
  },
  {
    id: 4,
    title: 'New Muslim Support Circle',
    date: '2024-10-30',
    time: '3:00 PM',
    duration: '2 hours',
    location: 'Meeting Room',
    category: 'Support',
    description: 'Monthly gathering for new Muslims to ask questions and find community support',
    capacity: 15,
    registered: 8,
    recurring: 'Monthly',
    icon: HeartIcon
  },
  {
    id: 5,
    title: 'Youth Islamic Quiz Competition',
    date: '2024-11-02',
    time: '2:00 PM',
    duration: '3 hours',
    location: 'Main Hall',
    category: 'Youth',
    description: 'Fun and educational Islamic knowledge competition for ages 12-18 with prizes',
    capacity: 40,
    registered: 23,
    recurring: null,
    icon: CakeIcon
  },
  {
    id: 6,
    title: 'Women\'s Islamic Circle - Tajweed',
    date: '2024-11-05',
    time: '10:00 AM',
    duration: '2 hours',
    location: 'Women\'s Section',
    category: 'Education',
    description: 'Quran recitation improvement class focusing on proper pronunciation and melody',
    capacity: 20,
    registered: 15,
    recurring: 'Bi-weekly',
    icon: SpeakerWaveIcon
  }
]

const pastEvents = [
  {
    title: 'Eid al-Adha Celebration 2024',
    date: '2024-06-16',
    attendees: 150,
    description: 'Special Eid prayer, community feast, and cultural activities'
  },
  {
    title: 'Ramadan Charity Drive',
    date: '2024-04-15',
    attendees: 85,
    description: 'Food collection and distribution for needy families'
  },
  {
    title: 'Islamic History Seminar',
    date: '2024-03-20',
    attendees: 60,
    description: 'Guest speaker from Seoul on Islamic civilization'
  }
]

const categories = [
  { name: 'All', color: 'bg-islamic-cream text-islamic-navy' },
  { name: 'Religious', color: 'bg-islamic-green/10 text-islamic-green' },
  { name: 'Education', color: 'bg-islamic-gold/10 text-islamic-gold' },
  { name: 'Community', color: 'bg-islamic-navy/10 text-islamic-navy' },
  { name: 'Youth', color: 'bg-islamic-green/20 text-islamic-green-dark' },
  { name: 'Support', color: 'bg-islamic-gold/20 text-islamic-gold-dark' }
]

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const filteredEvents = selectedCategory === 'All' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.category === selectedCategory)

  const handleEventRegistration = (event: any) => {
    setSelectedEvent(event)
    setShowRegistrationForm(true)
  }

  const getCategoryColor = (category: string) => {
    return categories.find(cat => cat.name === category)?.color || 'bg-gray-100 text-gray-800'
  }

  return (
    <main>
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-islamic-green text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <CalendarDaysIcon className="h-12 w-12 text-islamic-gold" />
            <h1 className="text-4xl lg:text-6xl font-bold">Community Events</h1>
          </div>
          <p className="text-xl text-islamic-cream mb-8 max-w-3xl mx-auto">
            Join us for regular religious services, educational programs, and community activities 
            that strengthen our bonds as a Muslim community in Jeju Island
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <UserGroupIcon className="h-8 w-8 text-islamic-gold mx-auto mb-2" />
              <p className="font-semibold">Weekly Programs</p>
              <p className="text-islamic-cream text-sm">Regular Friday prayers and classes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <CakeIcon className="h-8 w-8 text-islamic-gold mx-auto mb-2" />
              <p className="font-semibold">Special Events</p>
              <p className="text-islamic-cream text-sm">Eid celebrations and community gatherings</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <AcademicCapIcon className="h-8 w-8 text-islamic-gold mx-auto mb-2" />
              <p className="font-semibold">Educational Programs</p>
              <p className="text-islamic-cream text-sm">Islamic studies and language classes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories Filter */}
      <section className="py-8 bg-islamic-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-islamic-green text-white shadow-lg'
                    : category.color + ' hover:shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-islamic-navy text-center mb-12">Upcoming Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-islamic-green/10 rounded-full flex items-center justify-center">
                        <event.icon className="h-6 w-6 text-islamic-green" />
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                        {event.recurring && (
                          <span className="ml-2 text-xs text-gray-500">{event.recurring}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-islamic-navy mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <ClockIcon className="h-4 w-4" />
                      <span>{event.time} ({event.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <UserGroupIcon className="h-4 w-4" />
                      <span>{event.registered}/{event.capacity} registered</span>
                    </div>
                  </div>
                  
                  {/* Registration Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Registration</span>
                      <span>{Math.round((event.registered / event.capacity) * 100)}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-islamic-green rounded-full h-2 transition-all duration-300"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleEventRegistration(event)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      event.registered >= event.capacity
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-islamic-green text-white hover:bg-islamic-green-dark hover:shadow-lg'
                    }`}
                    disabled={event.registered >= event.capacity}
                  >
                    {event.registered >= event.capacity ? 'Event Full' : 'Register Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <CalendarDaysIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500 mb-2">No events found</p>
              <p className="text-gray-400">Try selecting a different category or check back later</p>
            </div>
          )}
        </div>
      </section>

      {/* Monthly Calendar Preview */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-islamic-navy text-center mb-12">Event Calendar</h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
              </button>
              <h3 className="text-2xl font-bold text-islamic-navy">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRightIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-3 text-center font-semibold text-gray-600 text-sm">
                  {day}
                </div>
              ))}
              {/* Calendar days would be generated here */}
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="aspect-square p-2 border border-gray-100 hover:bg-islamic-cream/50 transition-colors cursor-pointer">
                  <div className="text-sm text-gray-600">{((i % 30) + 1)}</div>
                  {/* Event indicators would go here */}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <button className="btn-primary">
                View Full Calendar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-islamic-navy text-center mb-12">Past Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="bg-islamic-cream rounded-2xl p-6">
                <h3 className="text-lg font-bold text-islamic-navy mb-2">{event.title}</h3>
                <div className="text-sm text-gray-600 mb-3">
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{event.attendees} attendees</span>
                </div>
                <p className="text-gray-700 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Proposal */}
      <section className="py-16 bg-islamic-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <PlusIcon className="h-8 w-8 text-islamic-gold" />
            <h2 className="text-3xl font-bold">Propose an Event</h2>
          </div>
          <p className="text-xl text-islamic-cream mb-8">
            Have an idea for a community event or program? We'd love to hear from you!
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-islamic-gold mb-4">Types of Events We Welcome</h3>
                <ul className="space-y-2 text-islamic-cream text-sm text-left">
                  <li>• Educational workshops and seminars</li>
                  <li>• Cultural celebrations and festivals</li>
                  <li>• Community service projects</li>
                  <li>• Youth and family activities</li>
                  <li>• Interfaith dialogue sessions</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-islamic-gold mb-4">How to Propose</h3>
                <ul className="space-y-2 text-islamic-cream text-sm text-left">
                  <li>• Submit your idea via our contact form</li>
                  <li>• Include event details and objectives</li>
                  <li>• Specify target audience and date preferences</li>
                  <li>• We'll review and get back within 7 days</li>
                </ul>
              </div>
            </div>
            
            <a 
              href="/contact"
              className="inline-block bg-islamic-gold text-islamic-navy px-8 py-3 rounded-lg font-semibold hover:bg-islamic-gold-dark transition-colors"
            >
              Submit Event Proposal
            </a>
          </div>
        </div>
      </section>

      {/* Registration Modal (would be implemented with proper modal) */}
      {showRegistrationForm && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-islamic-navy mb-4">Register for Event</h3>
            <h4 className="text-lg text-gray-600 mb-6">{selectedEvent.title}</h4>
            
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green"
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowRegistrationForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-islamic-green text-white px-4 py-2 rounded-lg hover:bg-islamic-green-dark transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}