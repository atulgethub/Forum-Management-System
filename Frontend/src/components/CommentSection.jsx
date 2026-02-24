import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
  const { user } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch comments
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

  // Add comment
  const handleComment = async () => {
    if (!text.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      const res = await API.post("/comments", {
        postId,
        text,
      });

      setComments([res.data, ...comments]);
      setText("");
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Failed to add comment");
    }
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-6">

      <h3 className="text-xl font-semibold mb-4">
        Comments
      </h3>

      {/* Add Comment */}
      {user && (
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Write a comment..."
          />

          <button
            onClick={handleComment}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Comment
          </button>
        </div>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet</p>
      ) : (
        comments.map((c) => (
          <div key={c._id} className="border-b py-3">
            <p className="font-semibold">
              {c.author?.email}
            </p>
            <p>{c.text}</p>
          </div>
        ))
      )}

    </div>
  );
};

export default CommentSection;