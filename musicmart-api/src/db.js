import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "musicmart",
  connectionLimit: 10,
  waitForConnections: true
});

export async function assertDb() {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT 1 AS ok");
    if (!rows || !rows[0] || rows[0].ok !== 1) {
      throw new Error("DB connection check failed");
    }
  } finally {
    conn.release();
  }
}
