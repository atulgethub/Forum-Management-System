import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function DeletePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all posts (admin)
  const fetchPosts = async () => {
    try {
      const res = await API.get("/admin/posts"); // admin route
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete post
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/posts/${id}`); // backend delete route
      alert("Post deleted successfully ✅");
      fetchPosts(); // refresh list
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete post");
    }
  };

  if (loading) {
    return <p className="text-center p-6">Loading posts...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-6">
        Delete Posts (Admin)
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        <div className="space-y-4">

          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-500">
                  By: {post.author?.email}
                </p>

                <p className="text-xs text-gray-400">
                  Status:{" "}
                  {post.isApproved ? "Published" : "Pending"}
                </p>
              </div>

              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}