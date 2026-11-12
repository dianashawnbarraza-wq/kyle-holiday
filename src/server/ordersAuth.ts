import { createHmac, timingSafeEqual } from "node:crypto";
import type { ServerResponse } from "node:http";
import { parseCookies, type ApiRequest } from "./http";

export const ORDERS_COOKIE = "kyle_orders";

function secret() {
  const password = process.env.ORDERS_PASSWORD?.trim();
  if (!password) {
    throw new Error("Set ORDERS_PASSWORD to open the order queue.");
  }
  return password;
}

export function ordersPasswordConfigured() {
  return Boolean(process.env.ORDERS_PASSWORD?.trim());
}

export function signOrdersCookie() {
  const exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const payload = String(exp);
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyOrdersCookie(value: string | undefined) {
  if (!value || !ordersPasswordConfigured()) return false;
  const [payload, sig] = value.split(".");
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return false;
  }
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

export function isOrdersAuthed(req: ApiRequest) {
  const cookies = parseCookies(req.headers.cookie);
  return verifyOrdersCookie(cookies[ORDERS_COOKIE]);
}

export function passwordMatches(password: string) {
  const expected = Buffer.from(secret());
  const given = Buffer.from(password);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function setOrdersCookie(res: ServerResponse, origin: string) {
  const secure = origin.startsWith("https");
  res.setHeader(
    "Set-Cookie",
    `${ORDERS_COOKIE}=${encodeURIComponent(signOrdersCookie())}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}${secure ? "; Secure" : ""}`,
  );
}

export function clearOrdersCookie(res: ServerResponse, origin: string) {
  const secure = origin.startsWith("https");
  res.setHeader(
    "Set-Cookie",
    `${ORDERS_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`,
  );
}
