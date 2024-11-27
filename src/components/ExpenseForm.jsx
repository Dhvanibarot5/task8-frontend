import React, { useState } from "react";

const categories = ["Food", "Travel", "Shopping", "Bills", "Others"];

const ExpenseForm = ({ onAddExpense, onClose }) => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
    paymentMethod: "cash",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || isNaN(formData.amount) || !formData.date) {
      alert("Please provide valid inputs.");
      return;
    }
    onAddExpense(formData);
    setFormData({
      amount: "",
      description: "",
      date: "",
      category: "",
      paymentMethod: "cash",
    });
  };

  return (
    <form className="p-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="p-2 border rounded"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="p-2 border rounded"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input type="date" name="date" className="p-2 border rounded" value={formData.date} onChange={handleInputChange} required />
        <select name="category" className="p-2 border rounded" value={formData.category} onChange={handleInputChange} required>
          <option value="">Select Category</option>
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))
          ) : (
            <option value="">No categories available</option>
          )}
        </select>

        <select name="paymentMethod" className="p-2 border rounded" value={formData.paymentMethod} onChange={handleInputChange}>
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
        </select>
        <div className="flex gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex-1" type="submit">
            Add Expense
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded flex-1" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
