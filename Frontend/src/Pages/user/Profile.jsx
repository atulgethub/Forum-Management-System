import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function Profile() {
  const { user, logout, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 text-center animate-pulse">
          Loading profile...
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      setUploading(true);

      const res = await API.put("/users/upload-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // assuming backend returns updated user
      setUser(res.data);

    } catch (error) {
      console.error("Photo upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-gray-200">

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8 relative">

          <div
            onClick={handlePhotoClick}
            className="relative w-28 h-28 rounded-full cursor-pointer group"
          >
            {user.photo ? (
              <img
                src={user.photo}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-4xl font-bold shadow-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm font-medium">
              {uploading ? "Uploading..." : "Change Photo"}
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            className="hidden"
          />

          <h2 className="text-3xl font-bold mt-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {user.name}
          </h2>

          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Info Section */}
        <div className="space-y-6 text-gray-700">

          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-600">Role</span>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${
                user.role === "admin"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500"
              }`}
            >
              {user.role}
            </span>
          </div>

          {user.isBlocked && (
            <div className="bg-red-100 text-red-600 px-4 py-3 rounded-xl text-center font-medium">
              ⚠ Your account is blocked by admin.
            </div>
          )}

        </div>

        {/* Logout Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleLogout}
            className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}