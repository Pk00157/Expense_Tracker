import { useEffect, useState } from "react";

function ExpenseTable({ onDelete }) {

  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:18080/expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-6">

      <h2 className="text-xl font-semibold mb-4">
        Expense History
      </h2>

      <table className="w-full text-left border-collapse">

        <thead>
          <tr className="border-b">
            <th className="p-2">Description</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Confidence</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-b hover:bg-gray-50">

              <td className="p-2">{expense.description}</td>

              <td className="p-2 text-blue-600 font-semibold">
                ₹{expense.amount}
              </td>

              <td className="p-2">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
                  {expense.category}
                </span>
              </td>

              <td className="p-2 text-gray-600">
                {expense.confidence}
              </td>

              <td className="p-2">
                <button
                  onClick={() => onDelete(expense.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default ExpenseTable;