import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await register(form);

      if (!res?.success) {
        alert(res?.message || "Registration failed");
        return;
      }

      alert("Registration successful ✅");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* ===== Background Gradient ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>

      {/* Glow Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-pink-400 rounded-full blur-3xl opacity-30"></div>

      {/* ===== Glass Card ===== */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 text-white">

        <h2 className="text-3xl font-bold text-center mb-8">
          Create Account 🚀
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            {errors.name && (
              <p className="text-pink-300 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            {errors.email && (
              <p className="text-pink-300 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/20 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 cursor-pointer text-sm text-white/80 hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </span>

            {errors.password && (
              <p className="text-pink-300 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-70"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center text-white/80 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-300 hover:text-white transition"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}