import { useEffect, useState } from "react";

import AIInsights from "./components/AI/AIInsights";
import DashboardLayout from "./components/layout/DashboardLayout";
import ExpenseForm from "./components/expense/ExpenseForm";
import ExpenseList from "./components/expense/ExpenseList";
import ExpenseTable from "./components/analytics/ExpenseTable";

import WeeklySummary from "./components/analytics/WeeklySummary";
import StatsPanel from "./components/analytics/StatsPanel";
import ExpenseChart from "./components/analytics/ExpenseChart";

import { createExpense } from "./model/HeroModel";

function App() {

  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState("dashboard");

  const fetchExpenses = async () => {
    try {
      const res = await fetch("http://localhost:18080/expenses");
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = (expenseData) => {
    try {
      const newExpense = createExpense(expenseData);
      setExpenses((prev) => [...prev, newExpense]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteExpense = (id) => {
    setExpenses((prev) =>
      prev.filter((expense) => expense.id !== id)
    );
  };

  const updateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );
  };

  return (
  
  <DashboardLayout setPage={setPage}>

    {page === "dashboard" && (
      <>
        <ExpenseForm onAddExpense={addExpense} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} onUpdate={updateExpense} />
        <WeeklySummary expenses={expenses} />
        <StatsPanel expenses={expenses} />
        <ExpenseChart expenses={expenses} />
        <AIInsights expenses={expenses} />
      </>
    )}

    {page === "expenses" && (
      <ExpenseTable expenses={expenses} onDelete={deleteExpense} />
    )}
    {page === "analytics" && (
  <>
    <WeeklySummary expenses={expenses} />
    <StatsPanel expenses={expenses} />
    <ExpenseChart expenses={expenses} />
  </>
)}

{page === "insights" && (
  <AIInsights expenses={expenses} />
)}  

  </DashboardLayout>
  

  );
}

export default App;