import { useEffect, useState } from "react";
import API from "../../api/axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    const res = await API.get(
      `/admin/users?page=${page}&search=${search}`
    );
    setUsers(res.data.users);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const deleteUser = async (id) => {
    await API.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  const blockUser = async (id) => {
    await API.put(`/admin/users/block/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      <input
        type="text"
        placeholder="Search user..."
        className="border p-2 mb-4"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      {users.map((user) => (
        <div key={user._id} className="bg-white p-4 mb-2 rounded shadow">
          <p>{user.name} ({user.email})</p>
          <p>Status: {user.isBlocked ? "Blocked" : "Active"}</p>

          <button
            onClick={() => blockUser(user._id)}
            className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded"
          >
            {user.isBlocked ? "Unblock" : "Block"}
          </button>

          <button
            onClick={() => deleteUser(user._id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
};

export default UserManagement;