import { pool } from "../db.js";

export async function listProducts(_req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.json(rows);
  } catch (e) { next(e); }
}

export async function getProduct(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(rows[0]);
  } catch (e) { next(e); }
}

export async function createProduct(req, res, next) {
  try {
    const { name, price, description, image, brand, stock } = req.body;
    if (!name || !String(name).trim()) {
      return res.status(400).json({ message: "name is required" });
    }
    const [result] = await pool.query(
      "INSERT INTO products (name, price, description, image, brand, stock) VALUES (?,?,?,?,?,?)",
      [name.trim(), price ?? 0, description ?? null, image ?? null, brand ?? null, stock ?? 0]
    );
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
}

export async function updateProduct(req, res, next) {
  try {
    const { name, price, description, image, brand, stock } = req.body;
    const [result] = await pool.query(
      "UPDATE products SET name = COALESCE(?, name), price = COALESCE(?, price), description = COALESCE(?, description), image = COALESCE(?, image), brand = COALESCE(?, brand), stock = COALESCE(?, stock), updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [name, price, description, image, brand, stock, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    res.json(rows[0]);
  } catch (e) { next(e); }
}

export async function deleteProduct(req, res, next) {
  try {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
  } catch (e) { next(e); }
}
