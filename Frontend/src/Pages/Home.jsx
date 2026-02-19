import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Latest Posts</h1>

      {posts.length === 0 ? (
        <div className="bg-white shadow-md rounded-xl p-6 text-center text-gray-500">
          No posts available
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(p => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
