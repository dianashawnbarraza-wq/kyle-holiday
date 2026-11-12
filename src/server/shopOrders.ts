import type Stripe from "stripe";
import {
  type ShopOrder,
  type ShopOrderAddress,
} from "../data/shopOrder.js";
import { site } from "../data/site.js";
import { formatUsd } from "../data/shop.js";
import { getStripeClient } from "./stripeClient.js";

export type { ShopOrder, ShopOrderAddress, ShopOrderItem } from "../data/shopOrder.js";

function addressFrom(
  session: Stripe.Checkout.Session,
): ShopOrderAddress | null {
  const collected = session.collected_information?.shipping_details;
  const legacy = (
    session as Stripe.Checkout.Session & {
      shipping_details?: {
        name?: string | null;
        address?: Stripe.Address | null;
      } | null;
    }
  ).shipping_details;
  const details = collected ?? legacy;
  const address = details?.address ?? session.customer_details?.address;
  if (!details && !address) return null;
  return {
    name: details?.name ?? session.customer_details?.name ?? null,
    line1: address?.line1 ?? null,
    line2: address?.line2 ?? null,
    city: address?.city ?? null,
    state: address?.state ?? null,
    postalCode: address?.postal_code ?? null,
    country: address?.country ?? null,
  };
}

export function orderFromSession(session: Stripe.Checkout.Session): ShopOrder {
  const lineItems = session.line_items?.data ?? [];
  return {
    id: session.id,
    created: session.created,
    amountTotal: session.amount_total ?? 0,
    email: session.customer_details?.email ?? session.customer_email ?? null,
    name: session.customer_details?.name ?? null,
    phone: session.customer_details?.phone ?? null,
    fulfillment: session.metadata?.fulfillment ?? null,
    shipped: session.metadata?.shipped === "true",
    weight: session.metadata?.weight ?? null,
    shipping: addressFrom(session),
    items: lineItems.map((item) => {
      const product = item.price?.product;
      const productData =
        product && typeof product !== "string" && !product.deleted
          ? product
          : undefined;
      return {
        name: productData?.name ?? item.description ?? "Item",
        description: productData?.description ?? null,
        quantity: item.quantity ?? 1,
        amount: item.amount_total ?? 0,
      };
    }),
  };
}

const expand = [
  "line_items",
  "line_items.data.price.product",
] as const;

export async function listShopOrders(): Promise<ShopOrder[]> {
  const stripe = getStripeClient();
  const sessions = await stripe.checkout.sessions.list({
    limit: 40,
    status: "complete",
  });
  const paid = sessions.data.filter(
    (session) => session.payment_status === "paid",
  );
  const detailed = await Promise.all(
    paid.map((session) =>
      stripe.checkout.sessions.retrieve(session.id, {
        expand: [...expand],
      }),
    ),
  );
  return detailed.map(orderFromSession);
}

export async function getShopOrder(id: string): Promise<ShopOrder> {
  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: [...expand],
  });
  if (session.status !== "complete" || session.payment_status !== "paid") {
    throw new Error("Order is not paid yet");
  }
  return orderFromSession(session);
}

export async function setOrderShipped(id: string, shipped: boolean) {
  const stripe = getStripeClient();
  const current = await stripe.checkout.sessions.retrieve(id);
  await stripe.checkout.sessions.update(id, {
    metadata: {
      ...current.metadata,
      shipped: shipped ? "true" : "false",
    },
  });
  return getShopOrder(id);
}

export function formatAddress(address: ShopOrderAddress | null) {
  if (!address) return "";
  return [
    address.name,
    address.line1,
    address.line2,
    [address.city, address.state, address.postalCode]
      .filter(Boolean)
      .join(", "),
    address.country,
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatAddressOneLine(address: ShopOrderAddress | null) {
  return formatAddress(address).replace(/\n/g, ", ");
}

export function pirateShipUrl() {
  return "https://ship.pirateship.com/";
}

export function shipFromLines() {
  const name = process.env.SHIP_FROM_NAME?.trim() || site.name;
  const line1 = process.env.SHIP_FROM_LINE1?.trim();
  const city = process.env.SHIP_FROM_CITY?.trim() || "Los Angeles";
  const state = process.env.SHIP_FROM_STATE?.trim() || "CA";
  const zip = process.env.SHIP_FROM_ZIP?.trim();
  return [
    name,
    line1,
    [city, state, zip].filter(Boolean).join(", "),
  ].filter(Boolean);
}

export function orderSummaryLine(order: ShopOrder) {
  const names = order.items
    .map((item) => item.name)
    .filter(Boolean)
    .slice(0, 4)
    .join(", ");
  return `${names || "Shop order"} · ${formatUsd(order.amountTotal)}`;
}
