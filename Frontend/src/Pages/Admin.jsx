import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users");
        setUsers(res.data.users || []); // safe fallback
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user._id} className="p-3 border rounded mb-2">
            <p><strong>{user.name}</strong></p>
            <p>{user.email}</p>
          </div>
        ))
      )}
    </div>
  );
}