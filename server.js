import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 Explicit env load (Node 22 + Windows + ESM)
dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stripe", stripeRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// DB
connectDB();

app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log("MONGO_URI:", process.env.MONGO_URI);
  console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY);
});
