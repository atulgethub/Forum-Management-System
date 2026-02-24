import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="sticky top-0 z-30 bg-white shadow px-4 md:px-6 py-4 flex items-center justify-between">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Hamburger (mobile only) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl font-bold"
        >
          ☰
        </button>

        <h1 className="text-lg md:text-xl font-semibold">
          Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-gray-600 font-medium">
          {user?.name}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;