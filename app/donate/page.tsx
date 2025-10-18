'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ExpenseTracker from '../../components/ExpenseTracker'
import MonthlyFinanceSummary from '../../components/MonthlyFinanceSummary'
import {
  HeartIcon,
  HomeIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState('')
  const [donationType, setDonationType] = useState('building')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isRecurring, setIsRecurring] = useState(false)
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const presetAmounts = [50000, 100000, 250000, 500000, 1000000]
  const progress = 35 // 35% towards goal

  const donationCategories = [
    {
      id: 'building',
      icon: HomeIcon,
      title: 'Permanent Mosque Building',
      description: 'Help us acquire land and construct a dedicated mosque facility',
      goal: '800,000,000 KRW',
      raised: '280,000,000 KRW',
      priority: 'Highest'
    },
    {
      id: 'facilities', 
      icon: CurrencyDollarIcon,
      title: 'Prayer Facilities',
      description: 'Separate prayer areas, ablution facilities, and prayer equipment',
      goal: '100,000,000 KRW',
      raised: '45,000,000 KRW',
      priority: 'High'
    },
    {
      id: 'community',
      icon: HeartIcon,
      title: 'Community Programs',
      description: 'Educational programs, community events, and support services',
      goal: '50,000,000 KRW',
      raised: '32,000,000 KRW',
      priority: 'Medium'
    },
    {
      id: 'general',
      icon: BanknotesIcon,
      title: 'General Fund',
      description: 'Operational costs, utilities, and day-to-day expenses as shown in our monthly transparency report below',
      goal: '30,000,000 KRW',
      raised: '18,000,000 KRW',
      priority: 'Ongoing'
    }
  ]

  const paymentMethods = [
    { id: 'card', title: 'Credit/Debit Card', icon: CreditCardIcon },
    { id: 'bank', title: 'Bank Transfer', icon: BanknotesIcon },
    { id: 'crypto', title: 'Cryptocurrency', icon: CurrencyDollarIcon }
  ]

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle donation processing here
    console.log('Donation submitted:', {
      amount: donationAmount,
      type: donationType,
      method: paymentMethod,
      recurring: isRecurring,
      donor: donorInfo
    })
  }

  return (
    <main>
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-islamic-green text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <HeartIcon className="h-12 w-12 text-islamic-gold" />
            <h1 className="text-4xl lg:text-6xl font-bold">Support Our Mosque</h1>
          </div>
          <p className="text-xl text-islamic-cream mb-8 max-w-3xl mx-auto leading-relaxed">
            Help us establish a permanent home for the Muslim community in Jeju Island. 
            Your contribution, no matter the size, makes a difference.
          </p>
          
          {/* Progress Indicator */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Building Fund Progress</h3>
              <p className="text-islamic-cream">280,000,000 KRW raised of 800,000,000 KRW goal</p>
            </div>
            <div className="bg-white/20 rounded-full h-4 mb-4">
              <div 
                className="bg-islamic-gold rounded-full h-4 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-islamic-cream">
              <span>0 KRW</span>
              <span className="font-bold text-islamic-gold">{progress}% Complete</span>
              <span>800M KRW</span>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Categories */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-islamic-navy text-center mb-12">Choose Your Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {donationCategories.map((category) => (
              <div 
                key={category.id}
                className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  donationType === category.id 
                    ? 'border-islamic-green bg-islamic-green/5' 
                    : 'border-gray-200 hover:border-islamic-green/50'
                }`}
                onClick={() => setDonationType(category.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-islamic-green/10 rounded-full flex items-center justify-center">
                    <category.icon className="h-8 w-8 text-islamic-green" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-islamic-navy">{category.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        category.priority === 'Highest' ? 'bg-red-100 text-red-800' :
                        category.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                        category.priority === 'Medium' ? 'bg-islamic-gold/10 text-islamic-gold' :
                        'bg-islamic-green/10 text-islamic-green'
                      }`}>
                        {category.priority} Priority
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Raised: {category.raised}</span>
                        <span>Goal: {category.goal}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-islamic-green rounded-full h-2 transition-all duration-300"
                          style={{ width: `${(parseInt(category.raised.replace(/[^0-9]/g, '')) / parseInt(category.goal.replace(/[^0-9]/g, ''))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expenses Transparency Call-to-Action */}
      <section className="bg-islamic-green/10 py-8 border-y border-islamic-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-islamic-navy mb-2">Transparency Commitment</h3>
              <p className="text-gray-700">
                We believe in complete transparency. View our monthly financial summary and detailed expenses below to see exactly how your donations help maintain our mosque.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="#"
                className="px-6 py-3 bg-islamic-green text-white rounded-lg font-medium hover:bg-islamic-green-dark transition-all flex items-center justify-center"
                onClick={(e) => { e.preventDefault(); window.scrollTo({top: document.querySelector('.max-w-7xl')?.getBoundingClientRect().bottom || 0, behavior: 'smooth'}); }}
              >
                <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                Financial Summary
              </a>
              <a 
                href="#monthly-expenses" 
                className="px-6 py-3 bg-islamic-navy text-white rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center justify-center"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                View Detailed Expenses
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-islamic-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
            <div className="flex items-center space-x-3 mb-8">
              <CurrencyDollarIcon className="h-8 w-8 text-islamic-green" />
              <h2 className="text-3xl font-bold text-islamic-navy">Make Your Donation</h2>
            </div>

            <form onSubmit={handleDonationSubmit} className="space-y-8">
              {/* Donation Amount */}
              <div>
                <label className="block text-lg font-semibold text-islamic-navy mb-4">
                  Donation Amount (KRW)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount.toString())}
                      className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                        donationAmount === amount.toString()
                          ? 'border-islamic-green bg-islamic-green text-white'
                          : 'border-gray-300 hover:border-islamic-green'
                      }`}
                    >
                      ₩{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green"
                />
              </div>

              {/* Recurring Donation */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="w-5 h-5 text-islamic-green border-gray-300 rounded focus:ring-islamic-green"
                />
                <label htmlFor="recurring" className="text-islamic-navy font-semibold">
                  Make this a monthly recurring donation
                </label>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-lg font-semibold text-islamic-navy mb-4">
                  Payment Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-islamic-green bg-islamic-green/5'
                          : 'border-gray-300 hover:border-islamic-green/50'
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <method.icon className="h-6 w-6 text-islamic-green" />
                        <span className="font-semibold text-islamic-navy">{method.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donor Information */}
              <div>
                <h3 className="text-lg font-semibold text-islamic-navy mb-4">Donor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={donorInfo.phone}
                    onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green"
                  />
                  <input
                    type="text"
                    placeholder="Address (for receipt)"
                    value={donorInfo.address}
                    onChange={(e) => setDonorInfo({...donorInfo, address: e.target.value})}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-green"
                  />
                </div>
              </div>

              {/* Security & Trust Indicators */}
              <div className="bg-islamic-cream rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-islamic-green" />
                  <h4 className="font-bold text-islamic-navy">Secure & Transparent</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-islamic-green" />
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-islamic-green" />
                    <span>Tax Deductible</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-islamic-green" />
                    <span>Zakat Eligible</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-islamic-green text-white py-4 rounded-lg text-xl font-bold hover:bg-islamic-green-dark transition-all duration-300 hover:shadow-lg"
              >
                Donate ₩{donationAmount ? parseInt(donationAmount).toLocaleString() : '0'} Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Alternative Donation Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-islamic-navy text-center mb-12">Other Ways to Donate</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-islamic-cream rounded-2xl p-8 text-center">
              <BanknotesIcon className="h-12 w-12 text-islamic-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-islamic-navy mb-4">Bank Transfer</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Bank:</strong> KB Bank</p>
                <p><strong>Account:</strong> 123-456-789-012</p>
                <p><strong>Name:</strong> Central Jeju Mosque</p>
              </div>
            </div>
            
            <div className="bg-islamic-cream rounded-2xl p-8 text-center">
              <HeartIcon className="h-12 w-12 text-islamic-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-islamic-navy mb-4">In-Person</h3>
              <p className="text-gray-600 mb-4">
                Visit our mosque during prayer times or community events to make a cash donation.
              </p>
              <button className="btn-primary">
                Find Location
              </button>
            </div>
            
            <div className="bg-islamic-cream rounded-2xl p-8 text-center">
              <ChartBarIcon className="h-12 w-12 text-islamic-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-islamic-navy mb-4">Corporate Sponsorship</h3>
              <p className="text-gray-600 mb-4">
                Partner with us through corporate sponsorship programs for larger contributions.
              </p>
              <button className="btn-secondary">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-16 bg-islamic-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Your Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-islamic-gold mb-4">₩50,000</h3>
              <p className="text-islamic-cream">
                Provides prayer mats and Quran copies for new community members
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-islamic-gold mb-4">₩250,000</h3>
              <p className="text-islamic-cream">
                Funds one month of Islamic education classes for children
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-islamic-gold mb-4">₩1,000,000</h3>
              <p className="text-islamic-cream">
                Contributes to ablution facility construction
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold text-islamic-gold mb-4">₩5,000,000</h3>
              <p className="text-islamic-cream">
                Major contribution toward permanent mosque building fund
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <p className="text-xl text-islamic-cream font-arabic mb-4">
              وَمَا تُنفِقُوا مِنْ خَيْرٍ فَلِأَنفُسِكُمْ
            </p>
            <p className="text-islamic-cream">
              "And whatever good you spend is for yourselves" - Quran 2:272
            </p>
          </div>
        </div>
      </section>

      {/* Monthly Financial Summary Section */}
      <MonthlyFinanceSummary />
      
     
      <Footer />
    </main>
  )
}