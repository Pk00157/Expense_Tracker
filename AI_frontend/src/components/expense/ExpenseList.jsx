function ExpenseList({ expenses, onDelete, onUpdate }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        All Expenses
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
          >
            {/* Description */}
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {expense.description}
            </h3>

            {/* Amount */}
            <p className="text-2xl font-bold text-blue-600 mb-2">
              ₹{expense.amount}
            </p>

            {/* Category */}
            <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full mb-2">
              {expense.category}
            </span>

            {/* Confidence */}
            <p className="text-sm text-gray-500 mb-4">
              Confidence: {expense.confidence}
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => onDelete(expense.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-lg transition"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  const newDesc = prompt("Edit description", expense.description);

                  if (!newDesc) return;

                  const updated = {
                    ...expense,
                    description: newDesc
                  };

                  onUpdate(updated);
                }}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded-lg transition"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;