import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";

// Public Pages
import Login from "./Pages/Login";
import SignUp from "./pages/SignUp";

// User Pages
import Home from "./Pages/Home";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

// Admin Pages



import PostDetails from "./pages/user/PostDetails";
import Dashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import ViewForums from "./pages/admin/ViewForums";
import ForumApprove from "./pages/admin/ForumApprove";

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <SignUp /> : <Navigate to="/" />} />

      {/* ================= ADMIN ROUTES ================= */}
      {user?.role === "admin" && (
        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="forums" element={<ViewForums />} />
          <Route path="users" element={<UserManagement />}/>
          <Route path="approve" element={<ForumApprove />} />

        </Route>
      )}

      {/* ================= USER ROUTES ================= */}
      {user?.role === "user" && (
        <Route path="/" element={<MainLayout />}>

          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="post/:id" element={<PostDetails />} />

        </Route>
      )}

      {/* ================= FALLBACK ================= */}
      <Route
        path="*"
        element={<Navigate to={user ? (user.role === "admin" ? "/admin" : "/") : "/login"} />}
      />

    </Routes>
  );
};

export default App;