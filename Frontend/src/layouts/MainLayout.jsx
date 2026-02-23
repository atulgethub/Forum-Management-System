import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Content Area */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 py-6 gap-6">

        {/* Sidebar */}
        <aside className="hidden md:block w-64">
          <div className="bg-white shadow-md rounded-lg p-4 h-full">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default MainLayout;