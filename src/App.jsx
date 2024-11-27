import React, { useState } from 'react';
import Header from './components/Header';
import ExpenseList from './components/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    setShowExpenseForm(false);
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses(expenses.map(expense => 
      expense.id === updatedExpense.id ? updatedExpense : expense
    ));
    setEditingExpense(null);
    setShowExpenseForm(false);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const startEditing = (expense) => {
    setEditingExpense(expense);
    setShowExpenseForm(true);
  };

  return (
    <div>
      <Header 
        showExpenseForm={showExpenseForm}
        setShowExpenseForm={setShowExpenseForm}
        onAddExpense={handleAddExpense}
        editingExpense={editingExpense}
        onEditExpense={handleEditExpense}
      />
      <ExpenseList 
        expenses={expenses}
        onDelete={handleDeleteExpense}
        onEdit={startEditing}
      />
    </div>
  );
}

export default App;
