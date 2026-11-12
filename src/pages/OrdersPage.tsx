import { useEffect, useMemo, useState } from "react";
import { PageHero } from "../components/PageHero";
import { formatUsd } from "../data/shop";
import type { ShopOrder } from "../data/shopOrder";
import "../components/CTAButton.css";
import "./ShopPage.css";
import "./OrdersPage.css";

type OrdersPayload = {
  orders?: ShopOrder[];
  from?: string[];
  pirateShipUrl?: string;
  error?: string;
};

export function OrdersPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<ShopOrder[]>([]);
  const [from, setFrom] = useState<string[]>([]);
  const [pirateShipUrl, setPirateShipUrl] = useState(
    "https://ship.pirateship.com/",
  );
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"new" | "shipped">("new");

  async function loadOrders() {
    const response = await fetch("/api/orders");
    const data = (await response.json()) as OrdersPayload;
    if (response.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    if (!response.ok) {
      throw new Error(data.error || "Could not load orders");
    }
    setOrders(data.orders ?? []);
    setFrom(data.from ?? []);
    if (data.pirateShipUrl) setPirateShipUrl(data.pirateShipUrl);
    setAuthed(true);
  }

  useEffect(() => {
    loadOrders()
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Could not load orders");
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Wrong password.");
      }
      setPassword("");
      await loadOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setAuthed(false);
    setOrders([]);
  }

  async function markShipped(id: string, shipped: boolean) {
    setError(null);
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "ship", id, shipped }),
    });
    const data = (await response.json()) as {
      order?: ShopOrder;
      error?: string;
    };
    if (!response.ok || !data.order) {
      setError(data.error || "Could not update that order");
      return;
    }
    setOrders((current) =>
      current.map((order) => (order.id === id ? data.order! : order)),
    );
  }

  async function createLabel(order: ShopOrder) {
    const lines = [
      order.shipping?.name,
      order.shipping?.line1,
      order.shipping?.line2,
      [order.shipping?.city, order.shipping?.state, order.shipping?.postalCode]
        .filter(Boolean)
        .join(", "),
    ]
      .filter(Boolean)
      .join("\n");
    if (lines) {
      try {
        await navigator.clipboard.writeText(lines);
      } catch {
        // Printing still works if clipboard is blocked.
      }
    }
    window.open(pirateShipUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => window.print(), 250);
  }

  const visible = useMemo(
    () =>
      orders.filter((order) =>
        filter === "shipped" ? order.shipped : !order.shipped,
      ),
    [filter, orders],
  );

  return (
    <div className="orders-page">
      <PageHero
        title="Order queue"
        tagline="Paid shop orders, packing slips, and labels."
        image="/images/shop/santas-workshop-hero.jpg"
        imageAlt="Kyle Holiday as Santa in a leather harness"
        imagePosition="center 18%"
      />

      <div className="page page--after-hero">
        <div className="page-inner">
          {!authed ? (
            <form className="orders-login" onSubmit={login}>
              <label className="shop-field">
                <span className="shop-field__label">Password</span>
                <input
                  className="shop-input"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              {error && (
                <p className="shop-bag__error" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="cta-btn cta-btn--primary"
                disabled={loading}
              >
                {loading ? "Opening…" : "Open queue"}
              </button>
            </form>
          ) : (
            <section className="orders-queue">
              <div className="orders-toolbar">
                <div className="shop-picks">
                  <button
                    type="button"
                    className={`shop-pick${filter === "new" ? " shop-pick--active" : ""}`}
                    onClick={() => setFilter("new")}
                  >
                    Needs shipping ·{" "}
                    {orders.filter((order) => !order.shipped).length}
                  </button>
                  <button
                    type="button"
                    className={`shop-pick${filter === "shipped" ? " shop-pick--active" : ""}`}
                    onClick={() => setFilter("shipped")}
                  >
                    Shipped · {orders.filter((order) => order.shipped).length}
                  </button>
                </div>
                <button
                  type="button"
                  className="orders-link"
                  onClick={() => void logout()}
                >
                  Sign out
                </button>
              </div>

              {error && (
                <p className="shop-bag__error" role="alert">
                  {error}
                </p>
              )}

              {visible.length === 0 ? (
                <p className="orders-empty">No orders in this pile yet.</p>
              ) : (
                <ul className="orders-list">
                  {visible.map((order) => {
                    const open = openId === order.id;
                    return (
                      <li key={order.id} className="order-card">
                        <button
                          type="button"
                          className="order-card__toggle"
                          onClick={() =>
                            setOpenId(open ? null : order.id)
                          }
                        >
                          <span>
                            <strong>
                              {order.name || order.email || "Order"}
                            </strong>
                            <span className="order-card__meta">
                              {new Date(order.created * 1000).toLocaleString()}{" "}
                              · {formatUsd(order.amountTotal)}
                            </span>
                          </span>
                          <span className="order-card__chevron">
                            {open ? "−" : "+"}
                          </span>
                        </button>

                        {open && (
                          <div className="order-card__body">
                            <div className="order-slip" id={`slip-${order.id}`}>
                              <p className="order-slip__kicker">
                                Santa Kyle&apos;s Workshop
                              </p>
                              <div className="order-slip__grid">
                                <div>
                                  <p className="order-slip__label">From</p>
                                  {from.map((line) => (
                                    <p key={line}>{line}</p>
                                  ))}
                                </div>
                                <div>
                                  <p className="order-slip__label">Ship to</p>
                                  {order.shipping ? (
                                    <>
                                      <p>{order.shipping.name}</p>
                                      <p>{order.shipping.line1}</p>
                                      {order.shipping.line2 && (
                                        <p>{order.shipping.line2}</p>
                                      )}
                                      <p>
                                        {[
                                          order.shipping.city,
                                          order.shipping.state,
                                          order.shipping.postalCode,
                                        ]
                                          .filter(Boolean)
                                          .join(", ")}
                                      </p>
                                    </>
                                  ) : (
                                    <p>No address on this order.</p>
                                  )}
                                  {order.email && <p>{order.email}</p>}
                                  {order.phone && <p>{order.phone}</p>}
                                </div>
                              </div>
                              <ul className="order-slip__items">
                                {order.items.map((item, index) => (
                                  <li key={`${order.id}-${index}`}>
                                    <strong>
                                      {item.quantity} × {item.name}
                                    </strong>
                                    {item.description && (
                                      <span>{item.description}</span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                              <p className="order-slip__total">
                                {order.fulfillment
                                  ? `${order.fulfillment} · `
                                  : ""}
                                {order.weight ? `${order.weight} · ` : ""}
                                {formatUsd(order.amountTotal)}
                              </p>
                            </div>

                            <div className="order-card__actions">
                              <button
                                type="button"
                                className="cta-btn cta-btn--primary"
                                onClick={() => void createLabel(order)}
                              >
                                Create label
                              </button>
                              <button
                                type="button"
                                className="cta-btn cta-btn--secondary"
                                onClick={() =>
                                  void markShipped(order.id, !order.shipped)
                                }
                              >
                                {order.shipped
                                  ? "Mark as not shipped"
                                  : "Mark shipped"}
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
