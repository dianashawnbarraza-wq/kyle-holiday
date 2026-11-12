import type { ServerResponse } from "node:http";
import {
  clearOrdersCookie,
  isOrdersAuthed,
  ordersPasswordConfigured,
  passwordMatches,
  setOrdersCookie,
} from "./ordersAuth.js";
import {
  type ApiRequest,
  readJsonBody,
  sendJson,
} from "./http.js";
import {
  getShopOrder,
  listShopOrders,
  pirateShipUrl,
  setOrderShipped,
  shipFromLines,
} from "./shopOrders.js";

function requestOrigin(req: ApiRequest) {
  if (typeof req.headers.origin === "string" && req.headers.origin) {
    return req.headers.origin;
  }
  const host = req.headers.host;
  const proto = host?.includes("localhost") ? "http" : "https";
  return `${proto}://${host ?? "www.kyleholiday.com"}`;
}

export async function handleOrdersApi(req: ApiRequest, res: ServerResponse) {
  const origin = requestOrigin(req);

  if (req.method === "GET") {
    if (!ordersPasswordConfigured()) {
      sendJson(res, 503, {
        error: "Set ORDERS_PASSWORD to open the order queue.",
      });
      return;
    }
    if (!isOrdersAuthed(req)) {
      sendJson(res, 401, { error: "Sign in to see orders." });
      return;
    }

    const url = new URL(req.url ?? "/api/orders", origin);
    const id = url.searchParams.get("id");
    if (id) {
      const order = await getShopOrder(id);
      sendJson(res, 200, {
        order,
        from: shipFromLines(),
        pirateShipUrl: pirateShipUrl(),
      });
      return;
    }

    const orders = await listShopOrders();
    sendJson(res, 200, {
      orders,
      from: shipFromLines(),
      pirateShipUrl: pirateShipUrl(),
    });
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const body = (await readJsonBody(req)) as {
    action?: string;
    password?: string;
    id?: string;
    shipped?: boolean;
  };

  if (body.action === "login") {
    if (!ordersPasswordConfigured()) {
      sendJson(res, 503, {
        error: "Set ORDERS_PASSWORD to open the order queue.",
      });
      return;
    }
    if (!body.password || !passwordMatches(body.password)) {
      sendJson(res, 401, { error: "Wrong password." });
      return;
    }
    setOrdersCookie(res, origin);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (body.action === "logout") {
    clearOrdersCookie(res, origin);
    sendJson(res, 200, { ok: true });
    return;
  }

  if (!isOrdersAuthed(req)) {
    sendJson(res, 401, { error: "Sign in to see orders." });
    return;
  }

  if (body.action === "ship" && body.id) {
    const order = await setOrderShipped(body.id, body.shipped !== false);
    sendJson(res, 200, { order });
    return;
  }

  sendJson(res, 400, { error: "Unknown action" });
}
