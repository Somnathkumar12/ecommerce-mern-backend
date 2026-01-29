import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env locally (Vercel ignores .env in prod)
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Health check FIRST
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend running 🚀" });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stripe", stripeRoutes);

// ✅ MongoDB: connect ONCE, safely
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectOnce() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = connectDB();
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// 🔥 DO NOT crash if DB fails — log instead
connectOnce().catch(err => {
  console.error("MongoDB connection failed:", err.message);
});

export default app;
