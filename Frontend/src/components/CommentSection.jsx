import { useEffect, useState } from "react";
import API from "../api/axios";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    API.get(`/comments/${postId}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [postId]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await API.post("/comments", { postId, text });
    setComments([...comments, res.data]);
    setText("");
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-md p-6">

      <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments</h3>

      <div className="space-y-3 mb-6">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (
          comments.map(c => (
            <div key={c._id} className="border rounded-lg p-3 bg-gray-50">
              {c.text}
            </div>
          ))
        )}
      </div>

      <form onSubmit={addComment} className="flex gap-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Post
        </button>
      </form>

    </div>
  );
};

export default CommentSection;
