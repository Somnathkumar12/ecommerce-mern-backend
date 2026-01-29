import express from "express";
import { createCheckoutSession } from "../controllers/stripeController.js";

const router = express.Router();

router.post("/checkout", createCheckoutSession);

export default router;
