import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-blue-500 via-white to-blue-600">
      
      <div className="w-80 bg-white border rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        <form className="flex flex-col gap-3">
          
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your UserName"
            className="border p-2 rounded"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your Password"
            className="border p-2 rounded"
          />

          {/* Forgot Password */}
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline text-right"
          >
            Forgot Password?
          </Link>

          <button className="mt-2 bg-blue-700 text-white p-2 rounded hover:bg-blue-800">
            Login
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm mt-2">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>

        </form>
      </div>

    </div>
  );
};

export default Login;
