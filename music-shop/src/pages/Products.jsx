// src/pages/Product.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// If you created the api helper earlier, great—import it.
// If not, this tiny fetcher will still work with your Spring Boot backend on :8080.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
async function apiGetProduct(id) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`);
  if (!res.ok) throw new Error(res.status === 404 ? 'NOT_FOUND' : 'ERROR');
  return res.json();
}

// super-light cart using localStorage
function addToCart(item) {
  const key = 'cart_items';
  const current = JSON.parse(localStorage.getItem(key) || '[]');
  const idx = current.findIndex((r) => r.id === item.id);
  if (idx >= 0) {
    current[idx].qty += 1;
  } else {
    current.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  }
  localStorage.setItem(key, JSON.stringify(current));
}

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ready | notfound | error

  const formattedPrice = useMemo(() => {
    if (!product) return '';
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(product.price);
    } catch {
      return `$${Number(product.price).toFixed(2)}`;
    }
  }, [product]);

  useEffect(() => {
    let mounted = true;
    setStatus('loading');
    apiGetProduct(id)
      .then((data) => {
        if (!mounted) return;
        setProduct({
          id: data.id,
          name: data.name,
          price: data.price,
          description: data.description || 'No description provided.',
          image: data.image || '' // backend demo has no images
        });
        setStatus('ready');
      })
      .catch((e) => {
        if (!mounted) return;
        setStatus(e.message === 'NOT_FOUND' ? 'notfound' : 'error');
      });
    return () => { mounted = false; };
  }, [id]);

  if (status === 'loading') {
    return (
      <div className="max-w-3xl mx-auto p-6 animate-pulse">
        <div className="w-full h-64 bg-gray-200 rounded" />
        <div className="h-8 bg-gray-200 rounded mt-6 w-3/4" />
        <div className="h-6 bg-gray-200 rounded mt-3 w-1/3" />
        <div className="h-24 bg-gray-200 rounded mt-5" />
      </div>
    );
  }

  if (status === 'notfound') {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Product not found</h2>
        <Link to="/products" className="text-blue-600 underline">Back to Products</Link>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
        <p className="text-gray-600 mt-2">Please try again later.</p>
        <Link to="/products" className="text-blue-600 underline">Back to Products</Link>
      </div>
    );
  }

  // Fallback placeholder image
  const imgSrc =
    product.image && product.image.trim() !== ''
      ? product.image
      : 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop'; // generic music gear photo

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="overflow-hidden rounded-lg shadow bg-white">
        <img src={imgSrc} alt={product.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{product.name}</h1>
          <p className="text-xl text-emerald-700 font-semibold mb-4">{formattedPrice}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex items-center gap-3">
            <button
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-md hover:bg-emerald-700 transition"
              onClick={() => {
                addToCart(product);
                // Navigate to cart or just notify:
                // navigate('/cart');
                alert('Added to cart');
              }}
            >
              Add to Cart
            </button>
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-md border border-gray-300 hover:bg-gray-50 transition"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
