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
        const res = await API.get("/posts/user/stats"); // ✅ CORRECT ROUTE
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard error:", err);
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
        <p className="text-center text-gray-500">Loading dashboard...</p>
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
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Dashboard
      </h1>

      {/* ================= Stats Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <h2 className="font-semibold text-gray-600">My Posts</h2>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalPosts}
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <h2 className="font-semibold text-gray-600">Published</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalPublished}
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <h2 className="font-semibold text-gray-600">Pending</h2>
          <p className="text-3xl font-bold text-yellow-600">
            {stats.totalPending}
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl text-center">
          <h2 className="font-semibold text-gray-600">Comments</h2>
          <p className="text-3xl font-bold text-purple-600">
            {stats.totalComments}
          </p>
        </div>

      </div>

      {/* ================= Recent Posts ================= */}
      <h2 className="text-xl font-semibold mb-4">
        My Recent Posts
      </h2>

      {stats.recentPosts.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
          No recent posts found.
        </div>
      ) : (
        <div className="space-y-4">
          {stats.recentPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-5 rounded-xl shadow-md"
            >
              <h3 className="font-bold text-lg mb-1">
                {post.title}
              </h3>

              <p className="text-sm text-gray-400 mb-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>

              <span
                className={`text-sm font-medium ${
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