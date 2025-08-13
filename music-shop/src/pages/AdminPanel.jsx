import React, { useEffect, useMemo, useState } from "react";

// ---- Config: where your API lives ----
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

// ---- Minimal helpers (inline to keep this file self-contained) ----
async function apiList() {
  const r = await fetch(`${BASE_URL}/api/products`);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
async function apiCreate(body) {
  const r = await fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
async function apiUpdate(id, body) {
  const r = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
async function apiDelete(id) {
  const r = await fetch(`${BASE_URL}/api/products/${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error(await r.text());
}

function currency(v) {
  if (v === null || v === undefined || v === "") return "—";
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

// ---- Modal component (basic & accessible) ----
function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative mx-4 w-full max-w-2xl rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [items, setItems] = useState([]);
  const [state, setState] = useState("loading"); // loading | ready | error
  const [err, setErr] = useState("");
  const [query, setQuery] = useState("");

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit'
  const [editingId, setEditingId] = useState(null);

  // form state
  const emptyForm = {
    name: "",
    price: "",
    description: "",
    image: "",
    brand: "",
    stock: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // load products
  useEffect(() => {
    (async () => {
      try {
        setState("loading");
        const data = await apiList();
        setItems(data);
        setState("ready");
      } catch (e) {
        console.error(e);
        setErr(e.message || "Failed to load");
        setState("error");
      }
    })();
  }, []);

  // filtered view
  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (p) =>
        String(p.name ?? "").toLowerCase().includes(q) ||
        String(p.brand ?? "").toLowerCase().includes(q)
    );
  }, [items, query]);

  function openCreate() {
    setMode("create");
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(p) {
    setMode("edit");
    setEditingId(p.id);
    setForm({
      name: p.name ?? "",
      price: p.price ?? "",
      description: p.description ?? "",
      image: p.image ?? "",
      brand: p.brand ?? "",
      stock: p.stock ?? "",
    });
    setModalOpen(true);
  }

  async function handleDelete(p) {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    try {
      await apiDelete(p.id);
      setItems((prev) => prev.filter((x) => x.id !== p.id));
    } catch (e) {
      alert(`Delete failed: ${e.message || e}`);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return alert("Name is required");
    const payload = {
      name: form.name.trim(),
      price:
        form.price === "" || form.price === null
          ? 0
          : Number(form.price),
      description: form.description?.trim() || null,
      image: form.image?.trim() || null,
      brand: form.brand?.trim() || null,
      stock:
        form.stock === "" || form.stock === null
          ? 0
          : Number(form.stock),
    };
    if (Number.isNaN(payload.price)) return alert("Price must be a number");
    if (Number.isNaN(payload.stock)) return alert("Stock must be a number");

    try {
      setSaving(true);
      if (mode === "create") {
        const created = await apiCreate(payload);
        setItems((prev) => [created, ...prev]);
      } else {
        const updated = await apiUpdate(editingId, payload);
        setItems((prev) =>
          prev.map((x) => (x.id === editingId ? updated : x))
        );
      }
      setModalOpen(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (e) {
      alert(`Save failed: ${e.message || e}`);
    } finally {
      setSaving(false);
    }
  }

  if (state === "loading") {
    return (
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold">⚙️ Admin Panel</h1>
        <div className="animate-pulse space-y-3">
          <div className="h-10 w-48 rounded bg-gray-200" />
          <div className="h-10 w-full rounded bg-gray-200" />
          <div className="h-40 w-full rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold">⚙️ Admin Panel</h1>
        <p className="text-red-600">Failed to load products: {err}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">⚙️ Admin Panel</h1>
        <div className="flex items-center gap-2">
          <input
            className="w-64 rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            placeholder="Search by name or brand…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={openCreate}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-5 text-gray-500" colSpan={6}>
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">{p.id}</td>
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">{p.brand || "—"}</td>
                  <td className="px-4 py-3">{currency(p.price)}</td>
                  <td className="px-4 py-3">{p.stock ?? 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        className="rounded bg-emerald-600 px-3 py-1 text-white hover:bg-emerald-700"
                        onClick={() => openEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                        onClick={() => handleDelete(p)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        title={mode === "create" ? "Add Product" : `Edit Product #${editingId}`}
        onClose={() => (!saving ? setModalOpen(false) : null)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Name *</label>
              <input
                className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Brand</label>
              <input
                className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                value={form.brand}
                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Price (LKR)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Stock</label>
              <input
                type="number"
                step="1"
                min="0"
                className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                value={form.stock}
                onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Image URL (optional)
            </label>
            <input
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              placeholder="https://…"
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              rows={4}
              className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              className="rounded border px-4 py-2 hover:bg-gray-50"
              onClick={() => (!saving ? setModalOpen(false) : null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving…" : mode === "create" ? "Create" : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
