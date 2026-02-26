import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";

// Public
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// User Pages
import Home from "./pages/user/Home";
import MyPosts from "./pages/user/MyPosts";
import Profile from "./pages/user/Profile";
import CreatePost from "./pages/user/CreatePost";
import EditPost from "./pages/user/EditPost";
import PostDetails from "./pages/user/PostDetails";
import UserDashboard from "./pages/user/UserDashboard";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import ViewForums from "./pages/admin/ViewForums";
import ForumApprove from "./pages/admin/ForumApprove";
import DeletePosts from "./pages/admin/DeletePosts";

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <Routes>

      {/* PUBLIC */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" replace />}
      />

      <Route
        path="/register"
        element={!user ? <SignUp /> : <Navigate to="/" replace />}
      />

      {/* ADMIN */}
      {user?.role === "admin" && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="forums" element={<ViewForums />} />
          <Route path="delete-posts" element={<DeletePosts />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="approve" element={<ForumApprove />} />
        </Route>
      )}

      {/* USER */}
      {user?.role === "user" && (
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="userDashboard" element={<UserDashboard />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="post/:id" element={<PostDetails />} />
        </Route>
      )}

      {/* DEFAULT REDIRECT */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              user
                ? user.role === "admin"
                  ? "/admin/dashboard"
                  : "/"
                : "/login"
            }
            replace
          />
        }
      />

    </Routes>
  );
};

export default App;