import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { Save, ArrowLeft } from "lucide-react";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Fetch Post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Update Post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await API.put(`/posts/${id}`, { title, content });
      navigate("/my-posts");
    } catch (err) {
      alert("Failed to update post");
    } finally {
      setUpdating(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="animate-pulse text-slate-600">Loading...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Edit Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl h-40 resize-none focus:ring-2 focus:ring-slate-400 focus:outline-none transition"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={() => navigate("/my-posts")}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-300 hover:bg-slate-400 rounded-xl transition"
            >
              <ArrowLeft size={16} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition disabled:opacity-60"
            >
              <Save size={16} />
              {updating ? "Updating..." : "Update"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditPost;