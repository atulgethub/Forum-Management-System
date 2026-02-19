import { Link } from "react-router-dom";
import CommentSection from "./CommentSection";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
      <p className="text-gray-600 mt-3 line-clamp-3">{post.content}</p>

      <div className="flex justify-between items-center mt-5 text-sm text-gray-500">
        <span>Posted by {post.author?.name || "Anonymous"}</span>
        <Link to={`/post/${post._id}`} className="text-blue-600 hover:underline">
          Read More
        </Link>
      </div>

      {/* Comment Section */}
      <CommentSection postId={post._id} />
    </div>
  );
};

export default PostCard;
