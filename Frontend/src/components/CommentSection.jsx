import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const CommentSection = ({ postId }) => {
  const { user } = useContext(AuthContext); // currently logged-in user
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const addComment = async () => {
    if (!user) return alert("Please login to comment");

    try {
      const res = await axios.post("http://localhost:5000/api/comments", {
        postId,
        text: comment,
        author: user._id, // 👈 send logged-in user id
      });

      setComments([...comments, res.data]);
      setComment("");
    } catch (err) {
      console.log(err);
      alert("Failed to add comment");
    }
  };

  return (
    <div className="mt-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="w-full border p-2 rounded"
      />
      <button
        onClick={addComment}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Comment
      </button>

      <div className="mt-4 space-y-2">
        {comments.map((c) => (
          <div key={c._id} className="p-2 border rounded bg-gray-50">
            <strong>{c.author.name || "User"}:</strong> {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
