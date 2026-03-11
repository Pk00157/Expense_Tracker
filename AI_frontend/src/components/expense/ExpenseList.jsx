import { useState } from "react";

function ExpenseList({ expenses, onDelete, onUpdate }) {

  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id) => {
    setDeletingId(id);

    setTimeout(() => {
      onDelete(id);
      setDeletingId(null);
    }, 300); // animation duration
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        All Expenses
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {expenses.map((expense) => (
          <div
  key={expense.id}
  className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm 
  hover:shadow-xl hover:-translate-y-1 transition-all duration-300
  ${
    deletingId === expense.id
      ? "opacity-0 translate-x-10 scale-95"
      : "opacity-100"
  }`}
>
  {/* Header */}
  <div className="flex justify-between items-start mb-3">
    <h3 className="text-lg font-semibold text-gray-800">
      {expense.description}
    </h3>

    <span className="text-xs text-gray-400">
      {new Date(expense.created_at).toLocaleDateString()}
    </span>
  </div>

  {/* Amount */}
  <p className="text-3xl font-bold text-blue-600 mb-3">
    ₹{expense.amount}
  </p>

  {/* Category */}
  <div className="flex items-center justify-between mb-4">
    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
      {expense.category}
    </span>
  </div>

  {/* Confidence */}
  <div className="mb-4">
    <div className="flex justify-between text-xs text-gray-500 mb-1">
      <span>AI Confidence</span>
      <span>{Math.round(expense.confidence * 100)}%</span>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
        className="bg-blue-500 h-1.5 rounded-full"
        style={{ width: `${expense.confidence * 100}%` }}
      ></div>
    </div>
  </div>

  {/* Buttons */}
  <div className="flex gap-3 mt-4">
    <button
      onClick={() => handleDelete(expense.id)}
      className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white py-2 rounded-lg transition"
    >
      🗑 Delete
    </button>

    <button
      onClick={() => {
        const newDesc = prompt("Edit description", expense.description);
        if (!newDesc) return;

        const updated = {
          ...expense,
          description: newDesc,
        };

        onUpdate(updated);
      }}
      className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white py-2 rounded-lg transition"
    >
      ✏️ Edit
    </button>
  </div>
</div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;