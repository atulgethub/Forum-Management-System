import { createContext, useState, useEffect } from "react";
import API from "../api/axios"; // your axios instance with baseURL
import { useNavigate } from "react-router-dom";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // User state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // useful for protecting routes

  // On app load: check token and fetch user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Set Authorization header
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      API.get("/auth/me") // backend route returns current user
        .then((res) => {
          setUser(res.data); // res.data should include role
        })
        .catch((err) => {
          console.log("Invalid token or session expired", err);
          localStorage.removeItem("token");
          delete API.defaults.headers.common["Authorization"];
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async ({ email, password }) => {
    try {
      const res = await API.post("/auth/login", { email, password });

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);

      // Set axios default header
      API.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      // Set user state
      setUser(res.data.user);

      navigate("/"); // redirect to home/dashboard
      return { success: true };
    } catch (err) {
      console.error("Login error:", err.response?.data);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // Register function (accepts optional role for admin creation)
  const register = async ({ name, email, password, role }) => {
    try {
      const res = await API.post("/auth/register", { name, email, password, role });

      localStorage.setItem("token", res.data.token);
      API.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      setUser(res.data.user);

      navigate("/"); // redirect to home/dashboard
      return { success: true };
    } catch (err) {
      console.error("Registration error:", err.response?.data);
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
