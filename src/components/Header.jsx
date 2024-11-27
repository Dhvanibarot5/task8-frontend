import React from 'react'

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-800">
            Expense Tracker
          </h1>
          
          <nav className="flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">
              Dashboard
            </a>
            <a href="/expenses" className="text-gray-600 hover:text-gray-900 font-medium">
              Expenses
            </a>
            <a href="/reports" className="text-gray-600 hover:text-gray-900 font-medium">
              Reports
            </a>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200">
              Add Expense
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header