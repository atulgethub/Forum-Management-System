import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function UserDashboard() {
const [stats, setStats] = useState({
  totalPosts: 0,
  totalPublished: 0,
  totalPending: 0,
  totalComments: 0,
  recentPosts: [],
});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/posts/user/stats");
        setStats(res.data);
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500 animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        My Dashboard
      </h1>

      {/* ================= Stats Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-md shadow-lg p-6 rounded-2xl text-center transition duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white">
          <h2 className="font-semibold text-gray-600 mb-2">My Posts</h2>
          <p className="text-3xl font-bold text-blue-600 transition duration-300">
            {stats.totalPosts}
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-md shadow-lg p-6 rounded-2xl text-center transition duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white">
          <h2 className="font-semibold text-gray-600 mb-2">Published</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalPublished}
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-md shadow-lg p-6 rounded-2xl text-center transition duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white">
          <h2 className="font-semibold text-gray-600 mb-2">Pending</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {stats.totalPending}
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-md shadow-lg p-6 rounded-2xl text-center transition duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white">
          <h2 className="font-semibold text-gray-600 mb-2">Comments</h2>
          <p className="text-3xl font-bold text-purple-600">
            {stats.totalComments}
          </p>
        </div>

      </div>

      {/* ================= Recent Posts ================= */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        My Recent Posts
      </h2>

      {stats.recentPosts.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow-md text-center text-gray-500">
          No recent posts found.
        </div>
      ) : (
        <div className="space-y-4">
          {stats.recentPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-md transition duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg mb-1 text-gray-800">
                {post.title}
              </h3>

              <p className="text-sm text-gray-400 mb-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>

              <span
                className={`text-sm font-medium transition duration-300 ${
                  post.isApproved
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {post.isApproved ? "Published" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}