import Stripe from "stripe";

export function getStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Stripe is not connected yet. Add STRIPE_SECRET_KEY to take orders.",
    );
  }
  return new Stripe(key);
}
