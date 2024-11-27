import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ExpenseList from "./components/ExpenseList";
import Reports from "./components/Reports";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setExpenses((prevExpenses) => [...prevExpenses, expenseWithId]);
    setShowExpenseForm(false);
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) => (expense.id === updatedExpense.id ? { ...updatedExpense, updatedAt: new Date().toISOString() } : expense))
    );
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    }
  };

  return (
    <Router>
      <div>
        <Header showExpenseForm={showExpenseForm} setShowExpenseForm={setShowExpenseForm} onAddExpense={handleAddExpense} />
        <Routes>
          <Route path="/" element={<Dashboard expenses={expenses} />} />
          <Route
            path="/expenses"
            element={
              <ExpenseList
                expenses={expenses}
                onDelete={handleDeleteExpense}
                onEdit={handleEditExpense}
                editingExpense={editingExpense}
                setEditingExpense={setEditingExpense}
              />
            }
          />
          <Route path="/reports" element={<Reports expenses={expenses} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
