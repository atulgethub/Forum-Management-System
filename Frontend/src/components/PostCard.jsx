import { useState } from "react";
import CommentSection from "./CommentSection";

const PostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>

      {/* Post content */}
      <p className={`text-gray-600 mt-3 ${!expanded ? "line-clamp-3" : ""}`}>
        {post.content}
      </p>

      {/* Read More / Read Less link */}
      {post.content.length > 150 && (
        <button
          onClick={toggleExpand}
          className="text-blue-600 hover:underline text-sm mt-2"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}

      {/* Post meta */}
      <div className="flex justify-between items-center mt-5 text-sm text-gray-500 flex-wrap">
        <span>
          Posted by {post.author?.name || "Anonymous"} on{" "}
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Comment Section */}
      <CommentSection postId={post._id} />
    </div>
  );
};

export default PostCard;
