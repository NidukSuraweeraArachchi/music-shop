import React, { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

function currencyLKR(v) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 2,
    }).format(Number(v));
  } catch {
    return String(v);
  }
}

export default function Products() {
  const [items, setItems] = useState([]);
  const [state, setState] = useState("loading"); // loading | ready | error
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let live = true;
    setState("loading");
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`, { method: "GET" });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.error("GET /api/products failed:", res.status, res.statusText, text);
          if (live) {
            setErrMsg(`${res.status} ${res.statusText}`.trim() || "Request failed");
            setState("error");
          }
          return;
        }
        const data = await res.json();
        if (live) { setItems(data); setState("ready"); }
      } catch (e) {
        console.error("Network/CORS error:", e);
        if (live) { setErrMsg(e.message || "Network error"); setState("error"); }
      }
    })();
    return () => { live = false; };
  }, []);

  if (state === "loading")
    return <div className="max-w-7xl mx-auto p-6">Loading products…</div>;

  if (state === "error")
    return (
      <div className="max-w-7xl mx-auto p-6 text-red-600">
        Could not load products. Try again later.{errMsg ? ` (${errMsg})` : ""}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <a
          href="/admin"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Admin Panel
        </a>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600">No products yet. Add some from Admin Panel.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-lg shadow">
              <img
                src={
                  p.image && p.image.trim() !== ""
                    ? p.image
                    : "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop"
                }
                alt={p.name}
                className="w-full h-44 object-cover rounded"
              />
              <h4 className="mt-3 font-semibold">{p.name}</h4>
              <p className="text-blue-600 font-bold">
                {p.price != null ? currencyLKR(p.price) : "—"}
              </p>
              {p.brand && <p className="text-sm text-gray-600">Brand: {p.brand}</p>}
              <p className="text-sm text-gray-600">Stock: {p.stock ?? 0}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
