import { LayoutDashboard, Receipt, BarChart3, Brain } from "lucide-react";

function Sidebar({ setPage }) {
  return (
    <div className="w-64 h-screen bg-slate-900 text-gray-200 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white">AI Expense</h2>
        <p className="text-xs text-gray-400">Smart finance tracker</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4">

        <div
          onClick={() => setPage("dashboard")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-slate-800 transition"
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </div>

        <div
          onClick={() => setPage("expenses")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-slate-800 transition"
        >
          <Receipt size={18} />
          <span>Expenses</span>
        </div>

        <div
          onClick={() => setPage("analytics")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-slate-800 transition"
        >
          <BarChart3 size={18} />
          <span>Analytics</span>
        </div>

        <div
          onClick={() => setPage("insights")}
          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-slate-800 transition"
        >
          <Brain size={18} />
          <span>AI Insights</span>
        </div>

      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 text-xs text-gray-500 border-t border-slate-800">
        AI Expense Tracker
      </div>

    </div>
  );
}

export default Sidebar;