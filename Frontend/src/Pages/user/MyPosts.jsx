import { useEffect, useState } from "react";
import API from "../../api/axios";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      const res = await API.get("/posts/my"); // 🔥 backend route
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching my posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (loading) {
    return <p className="text-center">Loading your posts...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">My Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">You have not created any posts.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold">
              {post.title}
            </h3>

            <p className="text-gray-600 mt-2">
              {post.content}
            </p>

            <div className="mt-3 text-sm">
              Status:{" "}
              <span
                className={`font-semibold ${
                  post.isApproved
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {post.isApproved ? "Published" : "Pending"}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPosts;