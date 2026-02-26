import PostCard from "../../components/PostCard";
import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Latest Approved Forums
        </h1>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 text-center text-gray-500 animate-pulse">
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          /* Empty State */
          <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 text-center text-gray-500 transition duration-300 hover:shadow-xl">
            No approved posts available yet.
          </div>
        ) : (
          /* Posts List */
          <div className="space-y-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="transition duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-2xl"
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}