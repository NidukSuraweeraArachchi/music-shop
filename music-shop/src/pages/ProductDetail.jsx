import React from 'react';
import { useParams, Link } from 'react-router-dom';

const dummyProducts = [
  { id: 1, name: 'Yamaha Acoustic Guitar', price: 299.99, description: 'A high-quality acoustic guitar from Yamaha.', image: '/guitar.jpg' },
  { id: 2, name: 'Casio Keyboard', price: 199.99, description: 'Portable digital keyboard with 61 keys.', image: '/keyboard.jpg' },
  { id: 3, name: 'Pearl Drum Set', price: 499.99, description: 'Complete drum kit for beginners and pros.', image: '/drum.jpg' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = dummyProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Product not found</h2>
        <Link to="/products" className="text-blue-600 underline">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
      <h1 className="text-4xl font-bold mt-4 mb-2">{product.name}</h1>
      <p className="text-xl text-gray-600 mb-4">${product.price}</p>
      <p className="text-gray-700 mb-6">{product.description}</p>
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add to Cart</button>
      <div className="mt-4">
        <Link to="/products" className="text-blue-600 underline">← Back to Products</Link>
      </div>
    </div>
  );
};

export default ProductDetail;
