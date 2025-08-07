// src/pages/AdminPanel.jsx
import React from 'react';

const AdminPanel = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">⚙️ Admin Panel</h1>
      <p className="text-gray-700 mb-4">Manage instruments, users, and orders here.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-blue-600 text-white p-4 rounded hover:bg-blue-700">Add New Product</button>
        <button className="bg-green-600 text-white p-4 rounded hover:bg-green-700">View Orders</button>
        <button className="bg-red-600 text-white p-4 rounded hover:bg-red-700">Manage Users</button>
      </div>
    </div>
  );
};

export default AdminPanel;
