import type { IncomingMessage, ServerResponse } from "node:http";
import { handleStripeWebhook } from "../src/server/handleStripeWebhook";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    await handleStripeWebhook(req, res);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Webhook failed";
    if (!res.headersSent) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: message }));
    }
  }
}
