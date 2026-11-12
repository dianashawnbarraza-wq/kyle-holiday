import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import {
  createCheckoutSession,
  type CheckoutPayload,
} from "./src/server/createCheckoutSession.js";
import { handleOrdersApi } from "./src/server/handleOrdersApi.js";
import { handleStripeWebhook } from "./src/server/handleStripeWebhook.js";
import { readJsonBody } from "./src/server/http.js";

function jsonError(res: ServerResponse, status: number, error: unknown) {
  const message =
    error instanceof Error ? error.message : "Request failed";
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: message }));
}

function shopApiDevPlugin() {
  return {
    name: "shop-api-dev",
    configureServer(server: {
      middlewares: {
        use: (
          path: string,
          handler: (
            req: IncomingMessage,
            res: ServerResponse,
            next: () => void,
          ) => void,
        ) => void;
      };
    }) {
      server.middlewares.use("/api/create-checkout", async (req, res, next) => {
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }
        if (req.method !== "POST") {
          next();
          return;
        }
        try {
          const payload = (await readJsonBody(req)) as CheckoutPayload;
          const origin = req.headers.origin || "http://localhost:5173";
          const { url } = await createCheckoutSession(payload, origin);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ url }));
        } catch (error) {
          jsonError(res, 400, error);
        }
      });

      server.middlewares.use("/api/orders", async (req, res, next) => {
        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end();
          return;
        }
        if (req.method !== "GET" && req.method !== "POST") {
          next();
          return;
        }
        try {
          await handleOrdersApi(req, res);
        } catch (error) {
          jsonError(res, 400, error);
        }
      });

      server.middlewares.use(
        "/api/stripe-webhook",
        async (req, res, next) => {
          if (req.method !== "POST") {
            next();
            return;
          }
          try {
            await handleStripeWebhook(req, res);
          } catch (error) {
            jsonError(res, 400, error);
          }
        },
      );
    },
  };
}

const envKeys = [
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "ORDERS_PASSWORD",
  "RESEND_API_KEY",
  "RESEND_FROM",
  "ORDER_NOTIFY_EMAIL",
  "SHIP_FROM_NAME",
  "SHIP_FROM_LINE1",
  "SHIP_FROM_CITY",
  "SHIP_FROM_STATE",
  "SHIP_FROM_ZIP",
] as const;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of envKeys) {
    if (env[key]) process.env[key] = env[key];
  }

  return {
    plugins: [react(), shopApiDevPlugin()],
  };
});
