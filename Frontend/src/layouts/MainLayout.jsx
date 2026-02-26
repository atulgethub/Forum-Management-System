import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 overflow-hidden">

      {/* ===== Mobile Overlay (Blurred) ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== Sidebar ===== */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-0
        `}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* ===== Main Section ===== */}
      <div className="flex-1 flex flex-col relative">

        {/* Modern Navbar Wrapper */}
        <div className="sticky top-0 z-30 backdrop-blur-md bg-white/70 border-b border-white/40 shadow-sm">
          <Navbar toggleSidebar={() => setSidebarOpen(true)} />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">

          {/* Glass Content Container */}
          <div className="min-h-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-10 border border-white/40 transition-all duration-300">

            <Outlet />

          </div>

        </main>

      </div>
    </div>
  );
};

export default MainLayout;