export function loadExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

export function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}