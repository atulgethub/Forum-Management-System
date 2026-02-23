import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
  const { user } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  // Fetch comments
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Add comment
  const handleComment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!text) {
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
      console.log(err);
      alert("Failed to add comment");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">

      <h3 className="text-xl font-semibold mb-4">
        Comments
      </h3>

      {/* Comment Input */}
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
          <div key={c._id} className="border-b py-2">
            <p className="font-medium">
              {c.author?.name}
            </p>
            <p>{c.text}</p>
          </div>
        ))
      )}

    </div>
  );
};

export default CommentSection;