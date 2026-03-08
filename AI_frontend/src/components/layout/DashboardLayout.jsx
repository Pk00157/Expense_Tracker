import Sidebar from "./Sidebar";

function DashboardLayout({ children ,setPage }) {
  return (
    
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar setPage={setPage} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>

    </div>
  );
}

export default DashboardLayout;