import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import Admin from "./pages/Admin";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

// Layout wrapper for authenticated pages
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="hidden md:block md:col-span-3">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="col-span-12 md:col-span-9">{children}</div>
      </div>
    </div>
  );
};

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!user ? <SignUp /> : <Navigate to="/" />}
      />

      {/* Protected Routes */}
      {user && (
        <>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          />
          <Route
            path="/create"
            element={
              <MainLayout>
                <CreatePost />
              </MainLayout>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <MainLayout>
                <EditPost />
              </MainLayout>
            }
          />
          <Route
            path="/post/:id"
            element={
              <MainLayout>
                <PostDetails />
              </MainLayout>
            }
          />

          {/* Admin-only route */}
          {user.role === "admin" && (
            <Route
              path="/admin"
              element={
                <MainLayout>
                  <Admin />
                </MainLayout>
              }
            />
          )}
        </>
      )}

      {/* Catch-all */}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  );
};

export default App;
