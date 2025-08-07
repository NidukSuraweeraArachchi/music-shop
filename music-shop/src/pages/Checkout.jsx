// src/pages/Checkout.jsx
import React from 'react';

const Checkout = () => {
  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Shipping Address"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Card Number"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="CVV"
          className="w-full px-4 py-2 border rounded"
        />
        <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
