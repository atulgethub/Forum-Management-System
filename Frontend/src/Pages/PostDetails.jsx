import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import CommentSection from "../components/CommentSection";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold">{post.title}</h2>
        <p className="mt-3 text-gray-700">{post.content}</p>
        <p className="mt-2 text-sm text-gray-500">Posted by {post.author}</p>
      </div>

      {/* Comments */}
      <CommentSection postId={post._id} />
    </div>
  );
}
