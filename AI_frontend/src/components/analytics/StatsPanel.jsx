import StatCard from "./StatCard";

function StatsPanel({ expenses }) {

  const totalExpenses = expenses.length;

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const categoryTotals = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + Number(expense.amount);
  });

  const topCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] > categoryTotals[b] ? a : b
        )
      : "None";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

      <StatCard
        title="Total Expenses"
        value={totalExpenses}
        color="blue"
      />

      <StatCard
        title="Total Spent"
        value={`₹${totalSpent.toLocaleString()}`}
        color="green"
      />

      <StatCard
        title="Top Category"
        value={topCategory}
        color="purple"
      />

    </div>
  );
}

export default StatsPanel;