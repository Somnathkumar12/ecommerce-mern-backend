import Stripe from "stripe";

export const createStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe key missing");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};
