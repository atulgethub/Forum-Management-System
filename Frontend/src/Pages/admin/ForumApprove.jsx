import { useEffect, useState } from "react";
import API from "../../api/axios";
import { CheckCircle } from "lucide-react";

const ForumApprove = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/admin/posts");
      const pending = res.data.filter((p) => !p.isApproved);
      setPosts(pending);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const approvePost = async (id) => {
    try {
      await API.put(`/admin/posts/approve/${id}`);
      setPosts((prev) => prev.filter((post) => post._id !== id)); // instant UI update
    } catch (error) {
      console.error("Error approving post:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-slate-500">
        Loading pending forums...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden p-6">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100"></div>

      <div className="relative z-10 max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold mb-8 text-slate-800">
          Pending Forums
        </h2>

        {posts.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-2xl p-8 text-center text-slate-500">
            No pending posts 🎉
          </div>
        ) : (
          <div className="space-y-6">

            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white/70 backdrop-blur-xl border border-white shadow-xl p-6 rounded-2xl flex flex-col md:flex-row md:justify-between md:items-center gap-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >
                {/* Title */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-800">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    By: {post.author?.email || "Unknown"}
                  </p>
                </div>

                {/* Publish Button */}
                <button
                  onClick={() => approvePost(post._id)}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition duration-200 shadow-md hover:shadow-lg"
                >
                  <CheckCircle size={18} />
                  Publish
                </button>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default ForumApprove;