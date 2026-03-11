function WeeklySummary({ expenses }) {
  const now = new Date();

  const weekExpenses = expenses.filter((expense) => {
    const date = new Date(expense.created_at);
    const diff = now - date;
    const days = diff / (1000 * 60 * 60 * 24);
    return days <= 7;
  });

  const total = weekExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = {};
  weekExpenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  const topCategory =
    Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "None";

  const avgDaily = Math.round(total / 7);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Weekly Summary
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total spent */}
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Total Spent</p>
          <h3 className="text-2xl font-bold text-blue-600 mt-1">
            ₹{total}
          </h3>
        </div>

        {/* Transactions */}
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Transactions</p>
          <h3 className="text-2xl font-bold text-purple-600 mt-1">
            {weekExpenses.length}
          </h3>
        </div>

        {/* Top category */}
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Top Category</p>
          <h3 className="text-2xl font-bold text-green-600 mt-1">
            {topCategory}
          </h3>
        </div>

        {/* Avg daily */}
        <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
          <p className="text-gray-500 text-sm">Avg Daily Spend</p>
          <h3 className="text-2xl font-bold text-orange-500 mt-1">
            ₹{avgDaily}
          </h3>
        </div>

      </div>
    </div>
  );
}

export default WeeklySummary;