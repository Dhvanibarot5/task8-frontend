import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function Reports({ expenses }) {
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const years = [...new Set(expenses.map((expense) => new Date(expense.date).getFullYear()))].sort((a, b) => b - a);

  const getMonthlyData = () => {
    const monthlyExpenses = Array(12).fill(0);
    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      if (date.getFullYear() === selectedYear) {
        monthlyExpenses[date.getMonth()] += Number(expense.amount);
      }
    });
    return monthlyExpenses;
  };

  const getCategoryData = () => {
    const categoryExpenses = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      if (date.getFullYear() === selectedYear) {
        categoryExpenses[expense.category] = (categoryExpenses[expense.category] || 0) + Number(expense.amount);
      }
    });
    return categoryExpenses;
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Expenses",
        data: getMonthlyData(),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  const categoryData = {
    labels: Object.keys(getCategoryData()),
    datasets: [
      {
        label: "Category-wise Expenses",
        data: Object.values(getCategoryData()),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
      },
    ],
  };

  const yearlyTotal = getMonthlyData().reduce((a, b) => a + b, 0);
  const monthlyAverage = yearlyTotal / 12;
  const maxMonthlyExpense = Math.max(...getMonthlyData());
  const categoryTotals = getCategoryData();
  const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="p-2 border rounded">
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeFrame("monthly")}
            className={`px-4 py-2 rounded ${timeFrame === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeFrame("category")}
            className={`px-4 py-2 rounded ${timeFrame === "category" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Yearly Total</h3>
          <p className="text-2xl font-bold">{formatCurrency(yearlyTotal)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Monthly Average</h3>
          <p className="text-2xl font-bold">{formatCurrency(monthlyAverage)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Highest Monthly</h3>
          <p className="text-2xl font-bold">{formatCurrency(maxMonthlyExpense)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Top Category</h3>
          <p className="text-2xl font-bold">{topCategory ? topCategory[0] : "N/A"}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="h-[400px]">
          {timeFrame === "monthly" ? (
            <Line
              data={monthlyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          ) : (
            <Bar
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">% of Total</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getMonthlyData().map((amount, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{monthlyData.labels[index]}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(amount)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{yearlyTotal ? ((amount / yearlyTotal) * 100).toFixed(1) : 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
