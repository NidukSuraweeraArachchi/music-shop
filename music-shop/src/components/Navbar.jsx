import React from "react";
import { Link, NavLink } from "react-router-dom";

const navLink =
  "hover:text-blue-600 transition-colors px-2 py-1 rounded";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <span role="img" aria-label="guitar" className="text-pink-500 text-2xl">
            🎸
          </span>
          <span className="text-xl font-bold text-gray-800">MusicVerse</span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6 text-gray-700 font-medium">
          <NavLink to="/" className={navLink}>Home</NavLink>
          <NavLink to="/products" className={navLink}>Products</NavLink>
          <NavLink to="/cart" className={navLink}>Cart</NavLink>
          <NavLink to="/login" className={navLink}>Login</NavLink>
        </div>
      </div>
    </nav>
  );
}
