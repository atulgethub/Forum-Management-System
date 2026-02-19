import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300">

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800">
        {post.title}
      </h3>

      {/* Content */}
      <p className="text-gray-600 mt-3 line-clamp-3">
        {post.content}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5 text-sm text-gray-500">
        <span>Posted by {post.author || "Anonymous"}</span>
        <Link to={`/post/${post._id}`} className="text-blue-600 hover:underline">
          Read More
        </Link>
      </div>

    </div>
  );
};

export default PostCard;
