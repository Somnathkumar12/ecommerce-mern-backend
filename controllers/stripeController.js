import Stripe from "stripe";
import Order from "../models/Order.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return res.status(500).json({
        message: "Stripe secret key not loaded"
      });
    }

    // 🔥 Initialize Stripe INSIDE the request
    const stripe = new Stripe(stripeKey);

    const { cartItems, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map(item => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.qty
      })),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart"
    });

    await Order.create({
      user: userId,
      orderItems: cartItems,
      totalPrice: cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      ),
      isPaid: true
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
