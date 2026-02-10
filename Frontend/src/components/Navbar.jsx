import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-[10%] w-full bg-zinc-800 flex justify-between items-center px-8 text-white">
      
      {/* Logo */}
      <h1 className="text-xl font-bold">
        <Link to="/">Forum</Link>
      </h1>

      {/* Links */}
      <div className="flex items-center gap-x-6">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login" className="bg-white text-blue-600 px-2 py-1 rounded">Login</Link>
        <Link to="/register" className="border px-2 py-1 rounded">Register</Link>
      </div>

    </div>
  );
};

export default Navbar;
