import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function EditPost() {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // Admin check
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      alert("Access denied. Admins only.");
      navigate("/");
    }
  }, [user, loading, navigate]);

  // Fetch post
  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, { title, content });
      alert("Post updated successfully");
      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err.response?.data);
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);
      alert("Post deleted successfully");
      navigate("/admin"); // go back to admin dashboard
    } catch (err) {
      console.error(err.response?.data);
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 h-40 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete Post
          </button>
        </div>
      </form>
    </div>
  );
}
