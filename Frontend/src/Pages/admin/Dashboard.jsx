import { useEffect, useState } from "react";
import API from "../../api/axios";
import { FileText, CheckCircle, Clock, Users } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalPublished: 0,
    totalPending: 0,
    totalUsers: 0,
    recentPosts: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">

      {/* ===== Background ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-100"></div>
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-300 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative z-10">

        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Admin Dashboard
        </h1>

        {/* ===== Stats Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {/* Total Posts */}
          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl p-6 rounded-2xl hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-600 font-medium">Total Posts</h2>
              <FileText className="text-indigo-600" />
            </div>
            <p className="text-3xl font-bold mt-4 text-gray-800">
              {stats.totalPosts}
            </p>
          </div>

          {/* Published */}
          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl p-6 rounded-2xl hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-600 font-medium">Published</h2>
              <CheckCircle className="text-green-600" />
            </div>
            <p className="text-3xl font-bold mt-4 text-green-600">
              {stats.totalPublished}
            </p>
          </div>

          {/* Pending */}
          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl p-6 rounded-2xl hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-600 font-medium">Pending</h2>
              <Clock className="text-yellow-500" />
            </div>
            <p className="text-3xl font-bold mt-4 text-yellow-600">
              {stats.totalPending}
            </p>
          </div>

          {/* Users */}
          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl p-6 rounded-2xl hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-600 font-medium">Total Users</h2>
              <Users className="text-purple-600" />
            </div>
            <p className="text-3xl font-bold mt-4 text-gray-800">
              {stats.totalUsers}
            </p>
          </div>
        </div>

        {/* ===== Recent Posts Section ===== */}
        <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Recent Posts
          </h2>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">

            {stats.recentPosts.length === 0 ? (
              <p className="text-gray-500 text-sm">No recent posts</p>
            ) : (
              stats.recentPosts.map((post) => (
                <div
                  key={post._id}
                  className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-gray-800">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    By: {post.author?.name || "Unknown"}
                  </p>

                  <p className="text-sm mt-1">
                    Status:{" "}
                    <span
                      className={
                        post.isApproved
                          ? "text-green-600 font-medium"
                          : "text-yellow-600 font-medium"
                      }
                    >
                      {post.isApproved ? "Published" : "Pending"}
                    </span>
                  </p>
                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </div>
  );
}