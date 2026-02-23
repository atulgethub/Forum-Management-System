import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Content Area */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 py-6 gap-6">

        {/* Sidebar */}
        <aside className="hidden md:block w-1/4">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;