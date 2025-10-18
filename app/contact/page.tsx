'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactReason: 'general'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Phone',
      details: ['+82-64-123-4567', 'Available 9 AM - 8 PM'],
      action: 'tel:+82641234567'
    },
    {
      icon: EnvelopeIcon, 
      title: 'Email',
      details: ['info@jejumasjid.org', 'imam@jejumasjid.org'],
      action: 'mailto:info@jejumasjid.org'
    },
    {
      icon: MapPinIcon,
      title: 'Location',
      details: ['Jeju-do, Jeju-si, 특별자치도,', 'Sancheondandong 2-gil, 15 2층'],
      action: '#location'
    },
    {
      icon: ClockIcon,
      title: 'Office Hours',
      details: ['Mon-Fri: 9 AM - 8 PM', 'Sat-Sun: 10 AM - 6 PM'],
      action: null
    }
  ]

  const services = [
    {
      title: 'Religious Services',
      description: 'Prayer guidance, Islamic education, Quran classes',
      contact: 'imam@jejumasjid.org'
    },
    {
      title: 'Community Support',
      description: 'Housing assistance, translation services, counseling',
      contact: 'support@jejumasjid.org'
    },
    {
      title: 'Event Planning',
      description: 'Wedding ceremonies, community events, celebrations',
      contact: 'events@jejumasjid.org'
    },
    {
      title: 'Donations',
      description: 'Building fund, general donations, zakat distribution',
      contact: 'donations@jejumasjid.org'
    }
  ]

  return (
    <main>
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-islamic-green text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-islamic-cream mb-8 max-w-3xl mx-auto">
            Get in touch with Central Jeju Mosque for any questions, support, or to join our community
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center group">
                <div className="bg-islamic-cream p-6 rounded-2xl hover:bg-islamic-green/10 transition-all duration-300 group-hover:shadow-lg">
                  <div className="w-16 h-16 bg-islamic-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-islamic-green/20">
                    <info.icon className="h-8 w-8 text-islamic-green" />
                  </div>
                  <h3 className="text-xl font-bold text-islamic-navy mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">{detail}</p>
                    ))}
                  </div>
                  {info.action && (
                    <a
                      href={info.action}
                      className="inline-block mt-4 text-islamic-green font-semibold hover:text-islamic-green-dark transition-colors"
                    >
                      Contact Now
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <ChatBubbleLeftIcon className="h-8 w-8 text-islamic-green" />
                <h2 className="text-3xl font-bold text-islamic-navy">Send us a Message</h2>
              </div>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-islamic-navy mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-islamic-navy mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-islamic-navy mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent"
                        placeholder="+82-10-XXXX-XXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactReason" className="block text-sm font-semibold text-islamic-navy mb-2">
                        Contact Reason
                      </label>
                      <select
                        id="contactReason"
                        name="contactReason"
                        value={formData.contactReason}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="religious">Religious Services</option>
                        <option value="community">Community Support</option>
                        <option value="events">Event Planning</option>
                        <option value="donation">Donations</option>
                        <option value="volunteer">Volunteering</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-islamic-navy mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-islamic-navy mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green focus:border-transparent resize-none"
                      placeholder="Please describe your inquiry or request..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-islamic-green hover:bg-islamic-green-dark text-white hover:shadow-lg'
                    }`}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-islamic-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-islamic-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-islamic-navy mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {setSubmitted(false); setFormData({name: '', email: '', phone: '', subject: '', message: '', contactReason: 'general'})}}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

            {/* Map and Location Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-islamic-navy mb-6">Visit Our Mosque</h3>
                <div className="bg-islamic-navy rounded-lg h-64 flex items-center justify-center text-white">
                  <div className="text-center">
                    <MapPinIcon className="h-12 w-12 text-islamic-gold mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">Mosque Location</h4>
                    <p className="text-islamic-cream">Jeju-do, Jeju-si, 특별자치도</p>
                    <p className="text-islamic-cream">Sancheondandong 2-gil, 15 2층</p>
                    <p className="text-sm text-islamic-cream/80 mt-2">
                      Jeju Island, South Korea
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <ClockIcon className="h-5 w-5 text-islamic-green mt-1" />
                    <div>
                      <p className="font-semibold text-islamic-navy">Prayer Times</p>
                      <p className="text-gray-600 text-sm">5 daily prayers • Friday Jumu'ah at 12:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <UserIcon className="h-5 w-5 text-islamic-green mt-1" />
                    <div>
                      <p className="font-semibold text-islamic-navy">Visitors Welcome</p>
                      <p className="text-gray-600 text-sm">All Muslims and interested individuals welcome</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Contact */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-islamic-navy mb-6">Direct Service Contacts</h3>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index} className="border-l-4 border-islamic-green pl-4">
                      <h4 className="font-bold text-islamic-navy">{service.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                      <a 
                        href={`mailto:${service.contact}`}
                        className="text-islamic-green text-sm font-semibold hover:text-islamic-green-dark"
                      >
                        {service.contact}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-islamic-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Emergency Support</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <p className="text-xl text-islamic-cream mb-6">
              Need immediate assistance or facing an emergency situation?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-islamic-gold mb-2">24/7 Emergency Contact</h3>
                <p className="text-2xl font-bold">+82-10-XXXX-XXXX</p>
                <p className="text-islamic-cream text-sm">For urgent religious or community matters</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-islamic-gold mb-2">Korean Emergency Services</h3>
                <p className="text-2xl font-bold">119 (Fire/Medical) • 112 (Police)</p>
                <p className="text-islamic-cream text-sm">National emergency numbers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}