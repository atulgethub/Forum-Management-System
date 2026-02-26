import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // ✅ fixed
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login({ email, password });
    setLoading(false);

    if (!res.success) {
      alert(res.message);
      return;
    }

    if (res.user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>

      {/* Glow Effects */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-400 opacity-30 rounded-full blur-3xl"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-10 text-white">

        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-white/70 mb-8 text-sm">
          Sign in to continue to your account
        </p>

        <form className="space-y-6" onSubmit={handleLogin}>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-white/60" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-white/60" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 cursor-pointer text-white/70 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-6 text-white/80 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-pink-300 hover:text-white transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}