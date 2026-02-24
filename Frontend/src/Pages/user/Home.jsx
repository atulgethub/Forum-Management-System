import PostCard from "../../components/PostCard";
import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function Home(){
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts"); // backend should return only approved posts
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
    <div className="max-w-6xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Latest Approved Forums
      </h1>

      {/* Loading State */}
      {loading ? (
        <div className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500">
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        /* Empty State */
        <div className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500">
          No approved posts available yet.
        </div>
      ) : (
        /* Posts List */
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}