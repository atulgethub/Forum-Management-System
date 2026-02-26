import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
  const { user } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleComment = async () => {
    if (!text.trim()) return;

    try {
      const res = await API.post("/comments", {
        postId,
        text,
      });

      setComments([res.data, ...comments]);
      setText("");
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-6 animate-pulse">
        Loading comments...
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/40">

      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Comments
      </h3>

      {/* Add Comment */}
      {user && (
        <div className="mb-8 flex gap-4 items-start">

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold">
            {user.email?.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-white/80 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Write a comment..."
              rows={3}
            />

            <button
              onClick={handleComment}
              className="mt-3 px-6 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Post Comment
            </button>
          </div>
        </div>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <p className="text-gray-500 text-center">
          No comments yet
        </p>
      ) : (
        <div className="space-y-6">
          {comments.map((c) => (
            <div
              key={c._id}
              className="flex gap-4 bg-white/80 p-4 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold">
                {c.author?.email?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {c.author?.email}
                </p>
                <p className="text-gray-600 mt-1">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default CommentSection;