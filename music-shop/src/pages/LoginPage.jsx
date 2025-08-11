// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // JS string, no TS types

  return (
    <div className="min-h-screen bg-[#F3F8FA] flex flex-col">
      {/* Top mini header */}
      <div className="h-12 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-emerald-600">
              <path
                d="M12 2v20M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-semibold text-gray-800">MusicLanka</span>
          </Link>

          <button
            type="button"
            className="text-xs text-gray-600 hover:text-gray-800 inline-flex items-center gap-1"
            title="Language"
          >
            <span>EN</span>
            <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-70">
              <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <div className="h-[3px] bg-emerald-600" />
      </div>

      {/* Centered auth card */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-[0_10px_25px_rgba(16,24,40,0.08)] overflow-hidden">
            {/* Tabs */}
            <div className="px-6 pt-4">
              <div className="flex items-center gap-6 text-sm">
                <button
                  type="button"
                  className={`pb-2 transition-colors ${
                    activeTab === 'login'
                      ? 'text-emerald-700 font-medium border-b-2 border-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
                <Link
                  to="/register"
                  className={`pb-2 transition-colors ${
                    activeTab === 'signup'
                      ? 'text-emerald-700 font-medium border-b-2 border-emerald-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onMouseEnter={() => setActiveTab('signup')}
                >
                  Sign up
                </Link>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3">
              <h1 className="text-xl font-semibold text-gray-900 mb-1">Welcome Back</h1>

              {/* Form */}
              <form className="mt-4 space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-9 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                    <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                      <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-400">
                        <path
                          d="M4 6h16v12H4zM4 6l8 6 8-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm text-gray-700">Password</label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-9 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path
                            d="M3 3l18 18M10.6 10.6a3 3 0 104.24 4.24M9.88 5.49A9.95 9.95 0 0121 12c-1.2 2.3-3.78 4.8-7 5.5M6.1 6.1C4.05 7.37 2.6 9.08 2 12c1.2 2.3 3.78 4.8 7 5.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path
                            d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zm10 3a3 3 0 110-6 3 3 0 010 6z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* remember + forgot */}
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-600" />
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="text-sm text-emerald-700 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  className="w-full h-10 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
                >
                  Login
                </button>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-xs text-gray-500">OR</span>
                  </div>
                </div>

                {/* Google button */}
                <button
                  type="button"
                  className="w-full h-10 rounded-md border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 transition inline-flex items-center justify-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 533.5 544.3">
                    <path fill="#EA4335" d="M533.5 278.4c0-18.5-1.6-37.1-5-55.1H272.1v104.3h147.2c-6.2 33.6-25 62-53.4 81v67.2h86.4c50.7-46.7 81.2-115.5 81.2-197.4z"/>
                    <path fill="#34A853" d="M272.1 544.3c72.6 0 133.7-23.9 178.3-64.8l-86.4-67.2c-24.1 16.2-55 25.7-91.9 25.7-70.6 0-130.4-47.6-151.9-111.8H30.7v69.9c44.3 88 135.1 148.2 241.4 148.2z"/>
                    <path fill="#4A90E2" d="M120.2 326.3c-10.5-31.6-10.5-65.6 0-97.2v-69.9H30.7C-10.2 215.7-10.2 328.6 30.7 423.4l89.5-69.9z"/>
                    <path fill="#FBBC05" d="M272.1 107.7c39.4-.6 77.5 14 106.4 40.9l79.3-79.3C410.7 25.1 343.9-1.1 272.1.1 165.8.1 75 60.3 30.7 148.3l89.5 69.9c21.5-64.2 81.3-110.5 151.9-110.5z"/>
                  </svg>
                  Continue with Google
                </button>
              </form>
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-500 mt-6">
            © {new Date().getFullYear()} MusicLanka. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
