import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function ExpenseChart({ expenses }) {

  const categoryTotals = {};

  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + Number(expense.amount);
  });

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category]
  }));

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    "#6366f1"
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">

      <h2 className="text-xl font-semibold mb-6">
        Spending by Category
      </h2>

      <div className="w-full h-72">

        <ResponsiveContainer>
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend verticalAlign="bottom" />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ExpenseChart;