import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "admin") {
        alert("Access denied. Admins only.");
        navigate("/"); // redirect non-admins
        return;
      }

      API.get("/admin/users")
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
