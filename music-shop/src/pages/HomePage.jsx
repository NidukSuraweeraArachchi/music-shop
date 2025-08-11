import React from 'react';
import { Link } from 'react-router-dom';
import videoBackground from '../assets/video.mp4'; // Ensure this video exists

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* ✅ Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ✅ Overlay to darken video */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* ✅ Page Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="py-24 text-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Buy and Sell Musical Instruments Across Sri Lanka
          </h2>
          <p className="text-lg mb-6">
            The largest musical instrument marketplace in Sri Lanka
          </p>
          <div className="max-w-lg mx-auto flex overflow-hidden rounded-lg border border-blue-300 bg-white">
            <input
              type="text"
              placeholder="Search for instruments..."
              className="w-full p-3 text-gray-800 outline-none"
            />
            <button className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700">
              Search
            </button>
          </div>
        </section>

        {/* Browse Categories */}
        <section className="py-12 bg-white text-center px-4">
          <h3 className="text-2xl font-bold mb-6">Browse Categories</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {[
              "Electric Guitars", "Drums & Percussion", "Keyboards",
              "Wind Instruments", "Recording", "Accessories", "Other"
            ].map((category) => (
              <div key={category} className="border p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <p className="font-medium text-xl">{category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section className="py-12 bg-gray-50 text-center px-4">
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
        <section className="py-12 bg-white text-center px-4">
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
      </div>
    </div>
  );
};

export default HomePage;
