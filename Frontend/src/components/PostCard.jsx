import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${post._id}`);
      setComments(res.data);
    } catch (err) {
      console.log(err.response?.data || err);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post._id]);

  // Add comment
  const handleComment = async () => {
    if (!text.trim()) return;

    try {
      const res = await API.post("/comments", {
        postId: post._id,
        text,
      });

      setComments([res.data, ...comments]);
      setText("");
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-white/40 transition hover:shadow-2xl">

      {/* ===== Post Header ===== */}
      <div className="flex items-center gap-4 mb-6">

        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
          {post.author?.email?.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-semibold text-gray-800">
            {post.author?.email}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

      </div>

      {/* ===== Post Content ===== */}
      <h2 className="text-2xl font-bold mb-3 text-gray-800">
        {post.title}
      </h2>

      <p className="text-gray-600 leading-relaxed">
        {post.content}
      </p>

      {/* ===== Comments Section ===== */}
      <div className="mt-8 border-t pt-6">

        <h3 className="text-lg font-semibold mb-4">
          Comments ({comments.length})
        </h3>

        {/* Add Comment */}
        {user && (
          <div className="flex gap-3 mb-6">

            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold">
              {user.email?.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Write a comment..."
                rows={2}
              />

              <button
                onClick={handleComment}
                className="mt-2 px-5 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition hover:-translate-y-1 hover:shadow-lg"
              >
                Post Comment
              </button>
            </div>

          </div>
        )}

        {/* Comments List */}
        {loadingComments ? (
          <p className="text-gray-500 animate-pulse">
            Loading comments...
          </p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c._id}
                className="flex gap-3 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center font-semibold">
                  {c.author?.email?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    {c.author?.email}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {c.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default PostCard;