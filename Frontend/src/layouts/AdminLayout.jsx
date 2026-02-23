import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();          // remove token + user state
    navigate("/login"); // redirect to login
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white fixed h-full p-6 flex flex-col">

        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        <nav className="flex flex-col space-y-2 flex-1">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `py-2 px-4 rounded transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/forums"
            className={({ isActive }) =>
              `py-2 px-4 rounded transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            View All Forums
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `py-2 px-4 rounded transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            User Management
          </NavLink>

          <NavLink
            to="/admin/approve"
            className={({ isActive }) =>
              `py-2 px-4 rounded transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            Forum Approve
          </NavLink>

        </nav>

        {/* 🔥 Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 py-2 px-4 rounded transition"
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;