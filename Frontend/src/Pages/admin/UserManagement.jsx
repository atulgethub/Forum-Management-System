import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Search, Trash2, Shield, ShieldOff } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await API.get(
        `/admin/users?page=${page}&search=${search}`
      );
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const deleteUser = async (id) => {
    await API.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  const blockUser = async (id) => {
    await API.put(`/admin/users/block/${id}`);
    fetchUsers();
  };

  return (
    <div className="min-h-screen relative overflow-hidden p-6">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-8 text-slate-800">
          User Management
        </h2>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white shadow-sm focus:ring-2 focus:ring-slate-400 focus:outline-none transition"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        {/* Users List */}
        {loading ? (
          <div className="text-center text-slate-500">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-2xl p-8 text-center text-slate-500">
            No users found
          </div>
        ) : (
          <div className="space-y-6">

            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white/70 backdrop-blur-xl border border-white shadow-xl p-6 rounded-2xl flex flex-col md:flex-row md:justify-between md:items-center gap-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >
                {/* User Info */}
                <div>
                  <p className="font-semibold text-lg text-slate-800">
                    {user.name}
                  </p>

                  <p className="text-sm text-slate-500 break-all">
                    {user.email}
                  </p>

                  <p className="text-sm mt-2">
                    Status:{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

                  <button
                    onClick={() => blockUser(user._id)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white transition shadow-md hover:shadow-lg ${
                      user.isBlocked
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    {user.isBlocked ? <Shield size={16} /> : <ShieldOff size={16} />}
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    onClick={() => deleteUser(user._id)}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition shadow-md hover:shadow-lg"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-10">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 rounded-xl bg-slate-300 hover:bg-slate-400 transition disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-slate-600 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 rounded-xl bg-slate-300 hover:bg-slate-400 transition disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
};

export default UserManagement;