import type { ServerResponse } from "node:http";
import type { FulfillmentStatus } from "../data/fulfillment.js";
import { isTerminalStatus, stepsForFulfillment } from "../data/fulfillment.js";
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
import { emailBuyerOrderShipped } from "./notifyOrder.js";
import {
  getShopOrder,
  listShopOrders,
  pirateShipUrl,
  setOrderShipped,
  shipFromLines,
  updateOrderFulfillment,
} from "./shopOrders.js";

function requestOrigin(req: ApiRequest) {
  if (typeof req.headers.origin === "string" && req.headers.origin) {
    return req.headers.origin;
  }
  const host = req.headers.host;
  const proto = host?.includes("localhost") ? "http" : "https";
  return `${proto}://${host ?? "www.kyleholiday.com"}`;
}

function isValidStatus(
  status: string,
  fulfillment: string | null,
): status is FulfillmentStatus {
  return stepsForFulfillment(fulfillment).some((step) => step.id === status);
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
    status?: string;
    trackingNumber?: string;
    notifyBuyer?: boolean;
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

  if (body.action === "update" && body.id) {
    const existing = await getShopOrder(body.id);
    if (body.status && !isValidStatus(body.status, existing.fulfillment)) {
      sendJson(res, 400, { error: "Invalid fulfillment status." });
      return;
    }

    let order = await updateOrderFulfillment(body.id, {
      status: body.status as FulfillmentStatus | undefined,
      trackingNumber:
        body.trackingNumber === undefined ? undefined : body.trackingNumber,
    });

    const shouldNotify =
      body.notifyBuyer === true ||
      (body.notifyBuyer !== false &&
        body.status !== undefined &&
        isTerminalStatus(order.status) &&
        !existing.shippedNotified);

    let notified = false;
    if (shouldNotify && isTerminalStatus(order.status)) {
      try {
        const result = await emailBuyerOrderShipped(order);
        notified = result.sent;
        if (result.sent) {
          order = await updateOrderFulfillment(body.id, {
            shippedNotified: true,
          });
        }
      } catch (error) {
        sendJson(res, 502, {
          order,
          error:
            error instanceof Error
              ? error.message
              : "Saved, but the buyer email failed.",
        });
        return;
      }
    }

    sendJson(res, 200, { order, notified });
    return;
  }

  sendJson(res, 400, { error: "Unknown action" });
}
