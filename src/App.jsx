import React, { useState } from 'react';
import Header from './components/Header';
import ExpenseList from './components/ExpenseList';

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  return (
    <div>
      <Header onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}

export default App;
