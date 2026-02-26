import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Trash2 } from "lucide-react";

export default function DeletePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/admin/posts");
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-slate-500">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden p-6">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-8 text-slate-800">
          Delete Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-slate-500">No posts available.</p>
        ) : (
          <div className="space-y-6">

            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white/70 backdrop-blur-xl border border-white shadow-xl p-6 rounded-2xl flex flex-col md:flex-row md:justify-between md:items-center gap-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >
                {/* Post Info */}
                <div className="flex-1">

                  <h3 className="font-semibold text-lg text-slate-800">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    By: {post.author?.email}
                  </p>

                  <p className="text-sm mt-2">
                    Status:{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.isApproved
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {post.isApproved ? "Published" : "Pending"}
                    </span>
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(post._id)}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl transition duration-200 shadow-md hover:shadow-lg"
                >
                  <Trash2 size={18} />
                  Delete
                </button>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}