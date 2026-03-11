import { useState } from "react";

export default function ExpenseForm({ onAddExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!description.trim() || !amount) return;

  setLoading(true);

  await onAddExpense({
    description: description.trim(),
    amount: Number(amount),
  });

  setDescription("");
  setAmount("");
  setLoading(false);
};

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Add New Expense
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Expense description (Pizza, Uber, Coffee...)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Amount ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

      </form>
    </div>
  );
}