import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  Trash2,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-slate-800 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-100">

      {/* ===== Soft Background ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100"></div>

      {/* ===== Mobile Topbar ===== */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white p-4 flex justify-between items-center z-50 shadow-lg">
        <h1 className="font-semibold text-lg">Admin Panel</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ===== Sidebar ===== */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64
          bg-slate-900 text-white
          p-6 flex flex-col
          transition-transform duration-300
          z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h1 className="text-2xl font-bold mb-10 tracking-wide">
          Admin Panel
        </h1>

        <nav className="flex flex-col space-y-2 flex-1">

          <NavLink
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className={navItemStyle}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/forums"
            onClick={() => setIsOpen(false)}
            className={navItemStyle}
          >
            <FileText size={18} />
            View Forums
          </NavLink>

          <NavLink
            to="/admin/users"
            onClick={() => setIsOpen(false)}
            className={navItemStyle}
          >
            <Users size={18} />
            User Management
          </NavLink>

          <NavLink
            to="/admin/approve"
            onClick={() => setIsOpen(false)}
            className={navItemStyle}
          >
            <CheckCircle size={18} />
            Approve Forums
          </NavLink>

          <NavLink
            to="/admin/delete-posts"
            onClick={() => setIsOpen(false)}
            className={navItemStyle}
          >
            <Trash2 size={18} />
            Delete Posts
          </NavLink>

        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 mt-6 bg-red-600 hover:bg-red-700 transition py-3 rounded-xl"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* ===== Overlay (Mobile Only) ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ===== Main Content ===== */}
      <main className="relative md:ml-64 p-6 md:p-10 pt-20 md:pt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;