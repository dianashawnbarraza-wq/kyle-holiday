import type { IncomingMessage, ServerResponse } from "node:http";
import {
  createCheckoutSession,
  type CheckoutPayload,
} from "../src/server/createCheckoutSession";

type VercelRequest = IncomingMessage & {
  method?: string;
  body?: unknown;
};

async function readJsonBody(req: VercelRequest) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(
  req: VercelRequest,
  res: ServerResponse,
) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const payload = (await readJsonBody(req)) as CheckoutPayload;
    const origin =
      (typeof req.headers.origin === "string" && req.headers.origin) ||
      `https://${req.headers.host}`;
    const { url } = await createCheckoutSession(payload, origin);
    res.statusCode = 200;
    res.end(JSON.stringify({ url }));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not start checkout";
    res.statusCode = 400;
    res.end(JSON.stringify({ error: message }));
  }
}
