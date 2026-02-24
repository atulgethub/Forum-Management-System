import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Post Data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${id}`);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Update Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/posts/${id}`, {
        title,
        content,
      });

      alert("Post updated successfully!");
      navigate("/my-posts");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading post...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Content</label>
          <textarea
            className="w-full border p-2 rounded h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>

      </form>
    </div>
  );
};

export default EditPost;