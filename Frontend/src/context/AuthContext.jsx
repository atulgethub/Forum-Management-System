import { createContext, useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  // User state: null if not logged in
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // optional for loading state

  // On app load: check token and fetch user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/auth/me")  // backend route to get logged-in user info
        .then(res => setUser(res.data))
        .catch(err => {
          console.log("Invalid token", err);
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const res = await API.post("/auth/login", credentials);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Set user data
      setUser(res.data.user);

      navigate("/"); // redirect home
      return { success: true };

    } catch (err) {
      console.error(err.response?.data);
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  // Register function
  const register = async (data) => {
    try {
      const res = await API.post("/auth/register", data);

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      navigate("/"); // redirect home
      return { success: true };

    } catch (err) {
      console.error(err.response?.data);
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
