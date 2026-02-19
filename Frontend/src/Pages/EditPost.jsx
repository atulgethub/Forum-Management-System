import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

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
      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err.response?.data);
      alert("Update failed");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
