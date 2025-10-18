'use client'

import { useState } from 'react'
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  CalendarIcon,
  HandThumbUpIcon,
  PresentationChartBarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

type MonthData = {
  month: string
  year: number
  donations: {
    total: number
    building: number
    general: number
    programs: number
    other: number
  }
  expenses: {
    total: number
    rent: number
    utilities: number
    maintenance: number
    programs: number
    other: number
  }
  balance: number
}

// Sample financial data
const financialData: MonthData[] = [
  {
    month: 'October',
    year: 2025,
    donations: {
      total: 6750000,
      building: 4500000,
      general: 1200000,
      programs: 800000,
      other: 250000
    },
    expenses: {
      total: 5240000,
      rent: 2500000,
      utilities: 850000,
      maintenance: 450000,
      programs: 1120000,
      other: 320000
    },
    balance: 1510000
  },
  {
    month: 'September',
    year: 2025,
    donations: {
      total: 6120000,
      building: 4200000,
      general: 980000,
      programs: 720000,
      other: 220000
    },
    expenses: {
      total: 4980000,
      rent: 2500000,
      utilities: 780000,
      maintenance: 380000,
      programs: 1120000,
      other: 200000
    },
    balance: 1140000
  },
  {
    month: 'August',
    year: 2025,
    donations: {
      total: 5870000,
      building: 3800000,
      general: 950000,
      programs: 820000,
      other: 300000
    },
    expenses: {
      total: 4850000,
      rent: 2500000,
      utilities: 750000,
      maintenance: 350000,
      programs: 1050000,
      other: 200000
    },
    balance: 1020000
  }
]

export default function MonthlyFinanceSummary() {
  const [activeMonth, setActiveMonth] = useState(0)
  
  const currentData = financialData[activeMonth]
  const donationPercentage = Math.round((currentData.donations.total / 7000000) * 100) // Against target of 7M
  const balanceColor = currentData.balance > 0 ? 'text-green-600' : 'text-red-600'
  const BalanceIcon = currentData.balance > 0 ? ArrowTrendingUpIcon : ArrowTrendingDownIcon
  
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center">
            <PresentationChartBarIcon className="h-8 w-8 text-islamic-navy mr-2" />
            <h2 className="text-3xl font-bold text-islamic-navy">Monthly Financial Summary</h2>
          </div>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            Transparency is our commitment. Here's a summary of our monthly donations and expenses.
          </p>
        </div>

        {/* Month selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {financialData.map((data, index) => (
            <button
              key={`${data.month}-${data.year}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                activeMonth === index
                  ? 'bg-islamic-navy text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setActiveMonth(index)}
            >
              <CalendarIcon className="h-4 w-4 mr-1" />
              {data.month} {data.year}
            </button>
          ))}
        </div>

        {/* Financial summary card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-islamic-navy/95 text-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{currentData.month} {currentData.year} Summary</h3>
              <div className="flex items-center">
                <div className={`${balanceColor} bg-white/10 rounded-lg px-3 py-1.5 flex items-center font-medium`}>
                  <BalanceIcon className="h-4 w-4 mr-1" />
                  Net: ₩{currentData.balance.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Donations column */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-islamic-green/10 mr-3">
                      <CurrencyDollarIcon className="h-6 w-6 text-islamic-green" />
                    </div>
                    <h4 className="text-lg font-bold text-islamic-navy">Monthly Donations</h4>
                  </div>
                  <div className="text-lg font-bold text-islamic-green">
                    ₩{currentData.donations.total.toLocaleString()}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600">Goal Progress</span>
                    <span className="text-sm font-medium">{donationPercentage}% of ₩7,000,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-islamic-green h-2 rounded-full" 
                      style={{ width: `${donationPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <ul className="space-y-3 mt-6">
                  <li className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-2">
                    <span className="text-gray-600">Building Fund</span>
                    <span className="font-medium">₩{currentData.donations.building.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-2">
                    <span className="text-gray-600">General Operations</span>
                    <span className="font-medium">₩{currentData.donations.general.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-2">
                    <span className="text-gray-600">Community Programs</span>
                    <span className="font-medium">₩{currentData.donations.programs.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-2">
                    <span className="text-gray-600">Other Donations</span>
                    <span className="font-medium">₩{currentData.donations.other.toLocaleString()}</span>
                  </li>
                </ul>
              </div>

              {/* Expenses column */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-red-50 mr-3">
                      <ChartBarIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <h4 className="text-lg font-bold text-islamic-navy">Monthly Expenses</h4>
                  </div>
                  <div className="text-lg font-bold text-red-600">
                    ₩{currentData.expenses.total.toLocaleString()}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600">Budget Utilization</span>
                    <span className="text-sm font-medium">
                      {Math.round((currentData.expenses.total / currentData.donations.total) * 100)}% of donations
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${(currentData.expenses.total / currentData.donations.total) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <ul className="space-y-3 mt-6">
                  <li className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-2">
                    <span className="text-gray-600">Rent</span>
                    <span className="font-medium">₩{currentData.expenses.rent.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-2">
                    <span className="text-gray-600">Utilities</span>
                    <span className="font-medium">₩{currentData.expenses.utilities.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-2">
                    <span className="text-gray-600">Maintenance</span>
                    <span className="font-medium">₩{currentData.expenses.maintenance.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b border-dashed border-gray-200 pb-2">
                    <span className="text-gray-600">Programs</span>
                    <span className="font-medium">₩{currentData.expenses.programs.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between items-center text-sm pb-2">
                    <span className="text-gray-600">Other</span>
                    <span className="font-medium">₩{currentData.expenses.other.toLocaleString()}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center text-islamic-navy">
                  <HandThumbUpIcon className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    {currentData.balance > 0 ? 'Positive balance this month' : 'Deficit this month'}: 
                    <span className={`${balanceColor} font-bold ml-1`}>
                      ₩{Math.abs(currentData.balance).toLocaleString()}
                    </span>
                  </span>
                </div>
                <a 
                  href="#monthly-expenses" 
                  className="text-islamic-green hover:text-islamic-green-dark font-medium flex items-center"
                >
                  View detailed expense breakdown
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}