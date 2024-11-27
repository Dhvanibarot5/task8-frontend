import React from 'react';
import { Link } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';

function Header({ showExpenseForm, setShowExpenseForm, onAddExpense }) {
  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-800">
              Expense Tracker
            </h1>
            
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
                Dashboard
              </Link>
              <Link to="/expenses" className="text-gray-600 hover:text-gray-900 font-medium">
                Expenses
              </Link>
              <Link to="/reports" className="text-gray-600 hover:text-gray-900 font-medium">
                Reports
              </Link>
              <button 
                onClick={() => setShowExpenseForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Add Expense
              </button>
            </nav>
          </div>
        </div>
      </header>

      {showExpenseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-md">
            <ExpenseForm 
              onAddExpense={onAddExpense}
              onClose={() => setShowExpenseForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
