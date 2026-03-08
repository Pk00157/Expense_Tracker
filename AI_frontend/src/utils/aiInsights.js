export function generateInsights(expenses) {
  if (expenses.length === 0) {
    return ["No data yet. Add expenses to see insights."];
  }

  const insights = [];
  const now = new Date();

  const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = day === 0 ? 6 : day - 1;
    start.setDate(start.getDate() - diff);
    start.setHours(0, 0, 0, 0);
    return start;
  };

  const startOfThisWeek = getStartOfWeek(now);

  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

  const thisWeekExpenses = expenses.filter(
    (e) => new Date(e.date) >= startOfThisWeek
  );

  const lastWeekExpenses = expenses.filter((e) => {
    const date = new Date(e.date);
    return date >= startOfLastWeek && date < startOfThisWeek;
  });

  const thisWeekTotal = thisWeekExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const lastWeekTotal = lastWeekExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  if (lastWeekTotal > 0) {
    const change = ((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100;

    if (change > 0) {
      insights.push(
        `Your spending increased by ${change.toFixed(
          1
        )}% compared to last week.`
      );
    } else {
      insights.push(
        `Great! Your spending decreased by ${Math.abs(
          change
        ).toFixed(1)}% compared to last week.`
      );
    }
  }

  return insights;
}
  const daysPassed = Math.max(
    1,
    Math.ceil((now - startOfThisWeek) / (1000 * 60 * 60 * 24))
  );

  const avgPerDay = thisWeekTotal / daysPassed;
  const projectedWeeklyTotal = avgPerDay * 7;

  insights.push(
    `At your current pace, you may spend approximately ₹${projectedWeeklyTotal.toFixed(
      0
    )} this week.`
  );

    const amounts = expenses.map((e) => e.amount);

  const average =
    amounts.reduce((sum, val) => sum + val, 0) / amounts.length;

  const threshold = average * 2;

  const anomalies = expenses.filter((e) => e.amount > threshold);

  if (anomalies.length > 0) {
    insights.push(
      `You had ${anomalies.length} unusually high expense(s) compared to your average spending.`
    );
  }