import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/posts", {
        title,
        content,
        isApproved: false,
      });

      alert("Post submitted for admin approval ✅");

      setTitle("");
      setContent("");

      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Post creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200 transition-all duration-300">

        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Create New Forum
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Forum Title
            </label>
            <input
              type="text"
              placeholder="Enter forum title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 shadow-sm"
              required
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Forum Content
            </label>
            <textarea
              placeholder="Write your forum content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 h-44 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300 shadow-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition-all duration-300 shadow-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            {loading ? "Submitting..." : "Submit for Approval"}
          </button>

        </form>

      </div>
    </div>
  );
}