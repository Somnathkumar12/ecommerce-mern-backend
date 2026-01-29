import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createOrder, getOrders } from "../controllers/orderController.js";
export default express.Router().post("/", protect, createOrder).get("/", protect, getOrders);
