import { Resend } from "resend";
import { site } from "../data/site.js";
import {
  formatUsd,
  fulfillmentLabel,
  isPickupFulfillment,
} from "../data/shop.js";
import {
  formatAddress,
  orderSummaryLine,
  type ShopOrder,
} from "./shopOrders.js";

function notifyEmail() {
  return process.env.ORDER_NOTIFY_EMAIL?.trim() || site.email;
}

function fromAddress() {
  return (
    process.env.RESEND_FROM?.trim() ||
    "Santa Kyle's Workshop <onboarding@resend.dev>"
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function orderEmailHtml(order: ShopOrder, origin: string) {
  const pickup = isPickupFulfillment(order.fulfillment);
  const how = fulfillmentLabel(order.fulfillment) || order.fulfillment;
  const address = pickup
    ? how || "Event pickup"
    : formatAddress(order.shipping) || "No shipping address";
  const items = order.items
    .map((item) => {
      const detail = item.description
        ? `<div style="color:#666;font-size:14px">${escapeHtml(item.description)}</div>`
        : "";
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #eee;vertical-align:top">
          <strong>${escapeHtml(item.name)}</strong>
          ${detail}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;vertical-align:top">
          ${item.quantity} × ${formatUsd(item.amount / Math.max(1, item.quantity))}
        </td>
      </tr>`;
    })
    .join("");

  return `<div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#111">
    <p style="letter-spacing:.08em;text-transform:uppercase;font-size:12px;color:#666">Santa Kyle's Workshop</p>
    <h1 style="font-size:28px;margin:0 0 16px">New order</h1>
    <p>${escapeHtml(order.name || "Someone")} paid ${formatUsd(order.amountTotal)}.</p>
    <table style="width:100%;border-collapse:collapse">${items}</table>
    <p><strong>${pickup ? "Pickup" : "Ship to"}</strong><br>${escapeHtml(address).replaceAll("\n", "<br>")}</p>
    <p>
      ${order.email ? `Email: ${escapeHtml(order.email)}<br>` : ""}
      ${order.phone ? `Phone: ${escapeHtml(order.phone)}<br>` : ""}
      ${how ? `${pickup ? "Pickup" : "Shipping"}: ${escapeHtml(how)}<br>` : ""}
      ${!pickup && order.weight ? `Weight: ${escapeHtml(order.weight)}` : ""}
    </p>
    <p><a href="${origin}/orders">Open the order queue</a></p>
  </div>`;
}

export async function emailKyleNewOrder(order: ShopOrder, origin: string) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    console.warn("RESEND_API_KEY is not set; skipped order email.");
    return { sent: false as const };
  }

  const resend = new Resend(key);
  const subject = `New order · ${orderSummaryLine(order)}`;
  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: notifyEmail(),
    subject,
    html: orderEmailHtml(order, origin),
    text: [
      "New Santa Kyle's Workshop order",
      orderSummaryLine(order),
      "",
      isPickupFulfillment(order.fulfillment)
        ? fulfillmentLabel(order.fulfillment) || "Event pickup"
        : formatAddress(order.shipping) || "No shipping address",
      order.email ?? "",
      order.phone ?? "",
      "",
      ...order.items.map(
        (item) =>
          `${item.quantity} × ${item.name}${item.description ? ` — ${item.description}` : ""}`,
      ),
      "",
      `${origin}/orders`,
    ]
      .filter((line) => line.length > 0)
      .join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }

  return { sent: true as const };
}
