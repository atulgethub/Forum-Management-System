import { useEffect, useState } from "react";
import API from "../../api/axios";

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
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white shadow p-6 rounded-xl text-center">
          <h2 className="font-semibold">Total Posts</h2>
          <p className="text-3xl font-bold">{stats.totalPosts}</p>
        </div>

        <div className="bg-white shadow p-6 rounded-xl text-center">
          <h2 className="font-semibold">Published</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalPublished}
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded-xl text-center">
          <h2 className="font-semibold">Pending</h2>
          <p className="text-3xl font-bold text-yellow-600">
            {stats.totalPending}
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded-xl text-center">
          <h2 className="font-semibold">Total Users</h2>
          <p className="text-3xl font-bold">
            {stats.totalUsers}
          </p>
        </div>

      </div>

      {/* Recent Posts */}
      <h2 className="text-xl font-semibold mb-4">
        Recent Posts
      </h2>

      <div className="space-y-3">
        {stats.recentPosts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded shadow">

            <h3 className="font-bold">
              {post.title}
            </h3>

            <p className="text-gray-500 text-sm">
              By: {post.author?.name || "Unknown"}
            </p>

            <p className="text-sm text-gray-400">
              Status:{" "}
              <span
                className={
                  post.isApproved
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {post.isApproved ? "Published" : "Pending"}
              </span>
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}