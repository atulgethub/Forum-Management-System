import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedAdminRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // If not logged in → redirect to login
  if (!user) return <Navigate to="/login" />;

  // If logged in but not admin → redirect to home
  if (user.role !== "admin") return <Navigate to="/" />;

  // If admin → render child routes
  return <Outlet />;
};

export default ProtectedAdminRoute;
