import { useEffect, useState } from "react";
import API from "../../api/axios";

const ForumApprove = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/admin/posts");

      // Only pending posts
      const pending = res.data.filter((p) => !p.isApproved);

      setPosts(pending);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const approvePost = async (id) => {
    try {
      await API.put(`/admin/posts/approve/${id}`); // ✅ Correct endpoint
      fetchPosts(); // refresh list
    } catch (error) {
      console.error("Error approving post:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Pending Forums</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">No pending posts</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            {/* 🔥 Only Title */}
            <h3 className="font-semibold text-lg">
              {post.title}
            </h3>

            <button
              onClick={() => approvePost(post._id)}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Publish
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ForumApprove;