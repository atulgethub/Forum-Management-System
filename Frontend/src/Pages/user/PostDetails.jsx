import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import CommentSection from "../../components/CommentSection";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Post not found or not approved.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded shadow text-center">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-600 p-4 rounded text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Post Content */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {post.title}
        </h2>

        <p className="mt-4 text-gray-700 leading-relaxed">
          {post.content}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Posted by <span className="font-medium">
            {post.author?.name || "Unknown"}
          </span>
        </p>
      </div>

      {/* Comment Section */}
      <CommentSection postId={post._id} />

    </div>
  );
}