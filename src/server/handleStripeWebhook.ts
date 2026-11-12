import type { ServerResponse } from "node:http";
import type { ApiRequest } from "./http";
import { readRawBody, sendJson } from "./http";
import { emailKyleNewOrder } from "./notifyOrder";
import { getShopOrder } from "./shopOrders";
import { getStripeClient } from "./stripeClient";

function requestOrigin(req: ApiRequest) {
  const host = req.headers.host;
  if (host?.includes("localhost")) return `http://${host}`;
  return `https://${host ?? "www.kyleholiday.com"}`;
}

export async function handleStripeWebhook(
  req: ApiRequest,
  res: ServerResponse,
) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret) {
    sendJson(res, 503, { error: "STRIPE_WEBHOOK_SECRET is not set" });
    return;
  }

  const signature = req.headers["stripe-signature"];
  if (typeof signature !== "string") {
    sendJson(res, 400, { error: "Missing Stripe signature" });
    return;
  }

  const raw = await readRawBody(req);
  const stripe = getStripeClient();

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid Stripe signature";
    sendJson(res, 400, { error: message });
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status === "paid" || session.status === "complete") {
      const order = await getShopOrder(session.id);
      try {
        await emailKyleNewOrder(order, requestOrigin(req));
      } catch (error) {
        console.error("Order email failed", error);
      }
    }
  }

  sendJson(res, 200, { received: true });
}
