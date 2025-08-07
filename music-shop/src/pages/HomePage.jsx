import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/OIP.webp';

const HomePage = () => {
  return (
    <div
      className="flex flex-col items-start justify-start min-h-screen h-full text-center p-10 bg-gray-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >


      {/* Hero Section */}
      <section className="bg-blue-100 py-16 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-900">
          Buy and Sell Musical Instruments Across Sri Lanka
        </h2>
        <p className="text-lg mb-6 text-blue-800">
          The largest musical instrument marketplace in Sri Lanka
        </p>
        <div className="max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search for instruments..."
            className="w-full p-3 rounded-l-lg border border-blue-300"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700">
            Search
          </button>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="py-12 bg-white text-center">
        <h3 className="text-2xl font-bold mb-6">Browse Categories</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {["Electric Guitars", "Drums & Percussion", "Keyboards", "Wind Instruments", "Recording", "Accessories", "Other"].map((category) => (
            <div key={category} className="border p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <p className="font-medium text-xl">{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-12 bg-gray-50 text-center">
        <h3 className="text-2xl font-bold mb-6">Featured Listings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[{ name: "Acoustic Guitar", price: "LKR 125,000", image: "https://via.placeholder.com/300" },
            { name: "Electric Guitar", price: "LKR 185,000", image: "https://via.placeholder.com/300" },
            { name: "Drum Set", price: "LKR 250,000", image: "https://via.placeholder.com/300" }].map((product, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded" />
              <h4 className="text-lg font-semibold mt-4">{product.name}</h4>
              <p className="text-blue-600 font-bold">{product.price}</p>
              <button className="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white text-center">
        <h3 className="text-2xl font-bold mb-6">How It Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <h4 className="text-xl font-bold mb-2">1. List Your Instrument</h4>
            <p>Add your musical gear for sale easily.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">2. Connect with Buyers</h4>
            <p>Chat or call interested buyers directly.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">3. Complete the Sale</h4>
            <p>Deliver and finalize the deal hassle-free.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p className="text-sm">&copy; 2025 MusicVerse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
