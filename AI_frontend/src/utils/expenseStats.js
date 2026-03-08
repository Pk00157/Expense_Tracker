export function calculateStats(expenses) {
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const now = new Date();
  const startOfWeek = new Date(now);
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  startOfWeek.setDate(now.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const weeklyExpenses = expenses.filter((expense) =>
    new Date(expense.date) >= startOfWeek
  );

  const weeklyTotal = weeklyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const newhighestExpense = expenses.length
    ? Math.max(...expenses.map((e) => e.amount))
    : 0;

  const averageExpense = expenses.length
    ? (totalExpenses / expenses.length).toFixed(2)
    : 0;

  const categoryCount = {};
  expenses.forEach((expense) => {
    categoryCount[expense.category] =
      (categoryCount[expense.category] || 0) + 1;
  });

  const mostFrequentCategory = Object.keys(categoryCount).length
    ? Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0]
    : "None";

  return {
    totalExpenses,
    weeklyTotal,
    newhighestExpense,
    averageExpense,
    mostFrequentCategory,
  };
}

export function getWeeklyChartData(expenses) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const now = new Date();
  const startOfWeek = new Date(now);
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  startOfWeek.setDate(now.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);
    
  const weeklyExpenses = expenses.filter(
    (expense) => new Date(expense.date) >= startOfWeek
  );

  const result = days.map((day) => ({
    day,
    total: 0
  }));

  weeklyExpenses.forEach((expense) => {
    const date = new Date(expense.date);
    let index = date.getDay();
    index = index === 0 ? 6 : index - 1;
    result[index].total += expense.amount;
  });

  return result;
}