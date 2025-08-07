// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">🎵 MusicVerse</Link>
        </h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/products" className="hover:text-yellow-300">Products</Link>
          <Link to="/cart" className="hover:text-yellow-300">Cart</Link>
          <Link to="/login" className="hover:text-yellow-300">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
