// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
       {/* Header */}
            <header className="bg-white shadow w-full py-4 px-6">
              <div className="flex justify-between items-center max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-600">🎸 MusicVerse</h1>
              </div>
            </header>
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

export default Navbar; // Default export is important
