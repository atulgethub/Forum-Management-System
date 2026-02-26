import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b border-slate-200 shadow-sm px-4 md:px-8 py-4 flex items-center justify-between transition-all duration-300">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Hamburger */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl text-slate-700 hover:text-blue-600 transition"
        >
          ☰
        </button>

        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
          Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Clickable User Profile */}
        <button
          onClick={() => navigate("/profile")}
          className="hidden sm:flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:shadow-md hover:scale-105 transition duration-300"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200">
            <User size={16} className="text-slate-700" />
          </div>
          <span className="text-slate-700 font-medium">
            {user?.name}
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;