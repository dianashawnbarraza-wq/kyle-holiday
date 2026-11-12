import type { IncomingMessage, ServerResponse } from "node:http";
import { handleOrdersApi } from "../src/server/handleOrdersApi";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    await handleOrdersApi(req, res);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not load orders";
    if (!res.headersSent) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: message }));
    }
  }
}
