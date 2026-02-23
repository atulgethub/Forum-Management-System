import { useEffect, useState } from "react";
import API from "../../api/axios";

const ViewForums = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔥 Get all posts
        const postRes = await API.get("/admin/posts");
        setPosts(postRes.data);

        // 🔥 Get comments for each post
        const commentData = {};

        for (let post of postRes.data) {
          const res = await API.get(`/comments/${post._id}`);
          commentData[post._id] = res.data;
        }

        setComments(commentData);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading forums...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">All Forums</h2>

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white shadow-md rounded-xl p-6">

            {/* Post Title */}
            <h3 className="text-xl font-semibold mb-2">
              {post.title}
            </h3>

            {/* Post Content */}
            <p className="text-gray-700 mb-3">
              {post.content}
            </p>

            {/* Status */}
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>
                By {post.author?.name || "Unknown"}
              </span>

              <span
                className={`px-3 py-1 rounded text-white text-xs ${
                  post.isApproved
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {post.isApproved ? "Published" : "Pending"}
              </span>
            </div>

            {/* 🔥 Comments Section */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Comments</h4>

              {comments[post._id]?.length > 0 ? (
                comments[post._id].map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-gray-100 p-3 rounded mb-2"
                  >
                    <p className="text-sm text-gray-800">
                      {comment.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      By {comment.author?.name || "User"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  No comments yet
                </p>
              )}
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default ViewForums;