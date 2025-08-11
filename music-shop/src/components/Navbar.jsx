// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">

        {/* Logo + Brand Name */}
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="guitar" className="text-pink-500 text-2xl">🎸</span>
          <h1 className="text-xl font-bold text-gray-800">MusicVerse</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <Link to="/cart" className="hover:text-blue-600 transition-colors">Cart</Link>
          <Link to="/login" className="hover:text-blue-600 transition-colors">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
