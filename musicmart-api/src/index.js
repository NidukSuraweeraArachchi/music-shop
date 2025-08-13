import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";
import { assertDb, pool } from "./db.js";

dotenv.config();
const app = express();

// CORS for dev (open)
app.use(cors({ origin: true }));
app.use(express.json());

// Health
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/health/db", async (_req, res) => {
  try {
    const [r] = await pool.query("SELECT DATABASE() AS db");
    res.json({ ok: true, db: r?.[0]?.db || null });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Routes
app.use("/api/products", productsRouter);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

const port = Number(process.env.PORT || 5000);
const skipDb = String(process.env.SKIP_DB_CHECK || "").toLowerCase() === "true";

(async () => {
  if (!skipDb) {
    try {
      await assertDb();
      console.log("DB connection OK");
    } catch (e) {
      console.error("DB connection failed:", e.message);
      process.exit(1);
    }
  } else {
    console.warn("SKIP_DB_CHECK=true → starting server without DB check");
  }

  app.listen(port, () =>
    console.log(`API listening on http://localhost:${port}`)
  );
})();
