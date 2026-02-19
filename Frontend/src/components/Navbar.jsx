import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ForumSystem
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>

          {user && (
            <>
              <Link to="/create" className="text-gray-700 hover:text-blue-600 transition">
                Create
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition">
                Profile
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
