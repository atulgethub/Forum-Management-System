import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6 text-center">
        Loading profile...
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-6">

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        My Profile
      </h2>

      <div className="space-y-4 text-gray-700">

        <div>
          <span className="font-semibold">Name:</span> {user.name}
        </div>

        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>

        <div>
          <span className="font-semibold">Role:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-sm ${
              user.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {user.role}
          </span>
        </div>

        {user.isBlocked && (
          <div className="text-red-600 font-medium">
            ⚠ Your account is blocked by admin.
          </div>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition"
      >
        Logout
      </button>

    </div>
  );
}