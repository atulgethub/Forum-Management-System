import { useEffect, useState } from "react";
import API from "../../api/axios";

const ViewForums = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/admin/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔥 APPROVE / UNAPPROVE
  const handleApprove = async (id) => {
    try {
      await API.put(`/admin/posts/approve/${id}`);
      fetchPosts(); // refresh after update
    } catch (error) {
      console.error("Error approving post:", error.response?.data || error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading forums...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">All Forums</h2>

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-2">
              {post.title}
            </h3>

            <p className="text-gray-700 mb-3">
              {post.content}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                By {post.author?.name || "Unknown"}
              </span>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded text-white text-xs ${
                    post.isApproved
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {post.isApproved ? "Published" : "Pending"}
                </span>

                {/* 🔥 Publish Button */}
                <button
                  onClick={() => handleApprove(post._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                >
                  {post.isApproved ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewForums;