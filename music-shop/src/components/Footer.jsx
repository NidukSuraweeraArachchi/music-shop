import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 px-6">
        <div>
          <h5 className="font-bold mb-3">About Us</h5>
          <ul className="text-sm space-y-2">
            <li><Link to="#" className="hover:underline">Company Info</Link></li>
            <li><Link to="#" className="hover:underline">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-3">Quick Links</h5>
          <ul className="text-sm space-y-2">
            <li><Link to="#" className="hover:underline">Post Ad</Link></li>
            <li><Link to="#" className="hover:underline">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-3">Contact</h5>
          <p className="text-sm">support@musicmart.lk</p>
          <p className="text-sm">+94 77 000 0000</p>
        </div>
        <div>
          <h5 className="font-bold mb-3">Follow Us</h5>
          <div className="flex space-x-4">
            {/* Inline SVG icons (no extra libs needed) */}
            <a href="#" aria-label="Facebook" className="opacity-80 hover:opacity-100">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9V12.1h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.87h-2.34v7.03C18.34 21.25 22 17.08 22 12.06z"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="opacity-80 hover:opacity-100">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.24 4.24 0 0 0 1.86-2.35 8.37 8.37 0 0 1-2.67 1.02 4.18 4.18 0 0 0-7.12 3.81A11.88 11.88 0 0 1 3.15 4.6a4.17 4.17 0 0 0 1.29 5.58 4.1 4.1 0 0 1-1.9-.53v.05a4.18 4.18 0 0 0 3.35 4.1 4.2 4.2 0 0 1-1.89.07 4.19 4.19 0 0 0 3.91 2.9A8.38 8.38 0 0 1 2 19.55a11.83 11.83 0 0 0 6.41 1.88c7.69 0 11.9-6.37 11.9-11.9 0-.18-.01-.36-.02-.54A8.5 8.5 0 0 0 22.46 6z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="opacity-80 hover:opacity-100">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.8A4.2 4.2 0 1 0 16.2 12 4.2 4.2 0 0 0 12 7.8zm6.3-.9a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2zM12 9.6A2.4 2.4 0 1 1 9.6 12 2.4 2.4 0 0 1 12 9.6z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} MusicMart Lanka. All rights reserved.
      </div>
    </footer>
  );
}
