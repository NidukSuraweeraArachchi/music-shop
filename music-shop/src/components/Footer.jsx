// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 px-6">
        <div>
          <h5 className="font-bold mb-3">About Us</h5>
          <ul className="text-sm space-y-2">
            <li><Link to="#">Company Info</Link></li>
            <li><Link to="#">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-3">Quick Links</h5>
          <ul className="text-sm space-y-2">
            <li><Link to="#">Post Ad</Link></li>
            <li><Link to="#">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-3">Contact</h5>
          <p className="text-sm">support@musicmart.lk</p>
        </div>
        <div>
          <h5 className="font-bold mb-3">Follow Us</h5>
          <div className="flex space-x-3">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        © 2025 MusicMart Lanka. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
