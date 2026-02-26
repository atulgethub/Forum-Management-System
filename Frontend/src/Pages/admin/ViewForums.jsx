import { useEffect, useState } from "react";
import API from "../../api/axios";
import { MessageCircle } from "lucide-react";

const ViewForums = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await API.get("/admin/posts");
        setPosts(postRes.data);

        const commentData = {};

        for (let post of postRes.data) {
          const res = await API.get(`/comments/${post._id}`);
          commentData[post._id] = res.data;
        }

        setComments(commentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading forums...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden p-6">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-300 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-300 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">

        <h2 className="text-3xl font-bold text-gray-800">
          All Forums
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts available</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition"
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h3>

              {/* Content */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {post.content}
              </p>

              {/* Author & Status */}
              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-gray-500">
                  By {post.author?.name || "Unknown"}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.isApproved
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {post.isApproved ? "Published" : "Pending"}
                </span>
              </div>

              {/* Comments Section */}
              <div className="border-t pt-4">

                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle size={18} className="text-gray-500" />
                  <h4 className="font-semibold text-gray-700">
                    Comments
                  </h4>
                </div>

                {comments[post._id]?.length > 0 ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">

                    {comments[post._id].map((comment) => (
                      <div
                        key={comment._id}
                        className="bg-white shadow-sm p-3 rounded-xl border border-gray-100"
                      >
                        <p className="text-sm text-gray-700">
                          {comment.text}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          By {comment.author?.name || "User"}
                        </p>
                      </div>
                    ))}

                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No comments yet
                  </p>
                )}

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default ViewForums;