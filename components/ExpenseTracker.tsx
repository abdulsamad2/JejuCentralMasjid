'use client'

import { useState } from 'react'
import { ChartBarIcon, LightBulbIcon, HomeIcon, WifiIcon, PhoneIcon, TruckIcon } from '@heroicons/react/24/outline'

type ExpenseCategory = {
  id: string
  name: string
  amount: number
  icon: React.ElementType
  color: string
}

type MonthlyExpense = {
  month: string
  year: number
  total: number
  categories: ExpenseCategory[]
}

// Sample data for monthly expenses
const expensesData: MonthlyExpense[] = [
  {
    month: 'October',
    year: 2025,
    total: 5240000,
    categories: [
      { id: 'rent', name: 'Rent', amount: 2500000, icon: HomeIcon, color: 'bg-blue-100 text-blue-700' },
      { id: 'utilities', name: 'Utilities', amount: 850000, icon: LightBulbIcon, color: 'bg-yellow-100 text-yellow-700' },
      { id: 'internet', name: 'Internet & Phone', amount: 120000, icon: WifiIcon, color: 'bg-purple-100 text-purple-700' },
      { id: 'maintenance', name: 'Maintenance', amount: 450000, icon: TruckIcon, color: 'bg-red-100 text-red-700' },
      { id: 'misc', name: 'Miscellaneous', amount: 320000, icon: ChartBarIcon, color: 'bg-green-100 text-green-700' },
    ]
  },
  {
    month: 'September',
    year: 2025,
    total: 4980000,
    categories: [
      { id: 'rent', name: 'Rent', amount: 2500000, icon: HomeIcon, color: 'bg-blue-100 text-blue-700' },
      { id: 'utilities', name: 'Utilities', amount: 780000, icon: LightBulbIcon, color: 'bg-yellow-100 text-yellow-700' },
      { id: 'internet', name: 'Internet & Phone', amount: 120000, icon: WifiIcon, color: 'bg-purple-100 text-purple-700' },
      { id: 'maintenance', name: 'Maintenance', amount: 380000, icon: TruckIcon, color: 'bg-red-100 text-red-700' },
      { id: 'misc', name: 'Miscellaneous', amount: 200000, icon: ChartBarIcon, color: 'bg-green-100 text-green-700' },
    ]
  }
]

export default function ExpenseTracker() {
  const [activeMonth, setActiveMonth] = useState(0)

  const currentExpense = expensesData[activeMonth]
  
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center">
            <ChartBarIcon className="h-8 w-8 text-islamic-navy mr-2" />
            <h2 className="text-3xl font-bold text-islamic-navy">Monthly Expense Transparency</h2>
          </div>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            We believe in complete transparency about how your donations are used.
            Here's a breakdown of our monthly operational expenses.
          </p>
        </div>

        {/* Month Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {expensesData.map((expense, index) => (
            <button
              key={`${expense.month}-${expense.year}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeMonth === index
                  ? 'bg-islamic-navy text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setActiveMonth(index)}
            >
              {expense.month} {expense.year}
            </button>
          ))}
        </div>

        <div className="bg-islamic-cream/30 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-islamic-navy/90 text-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{currentExpense.month} {currentExpense.year} Expenses</h3>
              <span className="text-xl font-bold">₩{currentExpense.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-6">
            <ul className="space-y-4">
              {currentExpense.categories.map((category) => (
                <li key={category.id} className="bg-white rounded-lg p-4 shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`${category.color} p-3 rounded-full`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <span className="ml-4 text-lg font-medium text-islamic-navy">{category.name}</span>
                    </div>
                    <span className="font-bold text-lg text-islamic-navy">₩{category.amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-islamic-green h-2.5 rounded-full" 
                        style={{ width: `${(category.amount / currentExpense.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 text-right">
                      {Math.round((category.amount / currentExpense.total) * 100)}% of total expenses
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="font-semibold text-islamic-navy">Expense Funding Sources</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    These expenses are covered by your monthly general donations
                  </p>
                </div>
                <a 
                  href="#"
                  className="text-islamic-green hover:text-islamic-green-dark font-medium flex items-center"
                >
                  View complete financial report
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}