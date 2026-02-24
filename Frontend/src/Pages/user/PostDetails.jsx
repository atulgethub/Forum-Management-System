import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import CommentSection from "../../components/CommentSection";

export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError("Post not found or not approved.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 p-6">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <div className="bg-white shadow-md rounded-xl p-6">

        <h2 className="text-3xl font-bold text-gray-800">
          {post.title}
        </h2>

        <div className="mt-3 text-sm text-gray-500">
          Posted by{" "}
          <span className="font-medium text-gray-700">
            {post.author?.email ?? "Unknown"}
          </span>{" "}
          •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </div>

        <p className="mt-6 text-gray-700 whitespace-pre-line">
          {post.content}
        </p>

        {/* COMMENT BUTTON */}
        <div className="mt-6">
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {showComments ? "Hide Comments" : "Show Comments"}
          </button>
        </div>

      </div>

      {/* ONLY RENDER WHEN TRUE */}
      {showComments && (
        <div className="bg-white shadow-md rounded-xl p-6">
          <CommentSection postId={post._id} />
        </div>
      )}

    </div>
  );
}