import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-gray-800 text-white fixed h-full p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `py-2 px-4 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/create-post"
            className={({ isActive }) =>
              `py-2 px-4 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Create Post
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `py-2 px-4 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
            }
          >
            Manage Users
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
