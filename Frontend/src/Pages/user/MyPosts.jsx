import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { Pencil, Trash2 } from "lucide-react";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyPosts = async () => {
    try {
      const res = await API.get("/posts/my");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching my posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const deletePost = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${id}`);
      fetchMyPosts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100">
        <p className="text-slate-600 animate-pulse text-lg">
          Loading your posts...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold mb-8 text-slate-800">
          My Posts
        </h2>

        {posts.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-8 text-center text-slate-500">
            You have not created any posts yet.
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
              >

                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {post.title}
                </h3>

                <p className="text-slate-600 line-clamp-3">
                  {post.content}
                </p>

                {/* Status */}
                <div className="mt-4 text-sm">
                  <span className="font-medium text-slate-500 mr-2">
                    Status:
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      post.isApproved
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {post.isApproved ? "Published" : "Pending"}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-5">

                  {/* Edit */}
                  <button
                    onClick={() => navigate(`/edit-post/${post._id}`)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition shadow-md"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deletePost(post._id)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition shadow-md"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyPosts;