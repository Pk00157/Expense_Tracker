import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import AIInsights from "./components/AI/AIInsights";
import DashboardLayout from "./components/layout/DashboardLayout";
import ExpenseForm from "./components/expense/ExpenseForm";
import ExpenseList from "./components/expense/ExpenseList";
import ExpenseTable from "./components/analytics/ExpenseTable";

import WeeklySummary from "./components/analytics/WeeklySummary";
import StatsPanel from "./components/analytics/StatsPanel";
import ExpenseChart from "./components/analytics/ExpenseChart";


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

const addExpense = async (expenseData) => {
  try {
    const res = await fetch("http://localhost:18080/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(expenseData)
    });

    if (!res.ok) throw new Error("Failed to add expense");

    const data = await res.json();

    setExpenses((prev) => [...prev, data]);

    toast.success("Expense added 💰");

  } catch (err) {
    toast.error("Failed to add expense");
    console.error(err);
  }
};
const deleteExpense = async (id) => {
  try {
    const res = await fetch(`http://localhost:18080/expenses/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Delete failed");

    setExpenses((prev) =>
      prev.filter((expense) => expense.id !== id)
    );

    toast.success("Expense deleted 🗑️");

  } catch (err) {
    toast.error("Delete failed");
    console.error("Delete error:", err);
  }
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
  <>
      <Toaster
  position="top-right"
  toastOptions={{
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff"
    }
  }}
/>
  <DashboardLayout setPage={setPage}>

    {page === "dashboard" && (
      <>
        <ExpenseForm onAddExpense={addExpense} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} onUpdate={updateExpense} />
        <WeeklySummary expenses={expenses} />
        {/* <StatsPanel expenses={expenses} /> */}
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
  </>
  
  

  );
}

export default App;