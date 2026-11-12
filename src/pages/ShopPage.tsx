import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { SectionHeader } from "../components/SectionHeader";
import { ShopProductModal } from "../components/ShopProductModal";
import { Snowfall } from "../components/Snowfall";
import { site } from "../data/site";
import {
  type CartItem,
  type Fulfillment,
  MAX_CART_ITEMS,
  cartQuantity,
  cartShippingCents,
  cartSubtotalCents,
  cartTotalCents,
  cartWeightOz,
  formatUsd,
  stickerDealSavingsCents,
  stickersUntilDeal,
  formatWeight,
  getStyle,
  isHolidayCutoffPassed,
  itemSummary,
  itemUnitPrice,
  resolveStyleId,
  shippingMethods,
  shopStyles,
  stylePriceLabel,
} from "../data/shop";
import "./ShopPage.css";

const CART_KEY = "kyle-holiday-bag-v4";

function newItemId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => {
      const style = getStyle(item.styleId);
      return Boolean(style && style.id !== "mystery-sticker-pack");
    });
  } catch {
    return [];
  }
}

export function ShopPage() {
  const [params, setParams] = useSearchParams();
  const [openStyleId, setOpenStyleId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>(readCart);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("ground");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);

  const openStyle = openStyleId ? getStyle(openStyleId) : undefined;

  useEffect(() => {
    const fromUrl = resolveStyleId(params.get("style"));
    if (fromUrl) setOpenStyleId(fromUrl);
  }, [params]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!bagOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setBagOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [bagOpen]);

  const subtotal = useMemo(() => cartSubtotalCents(items), [items]);
  const stickerSavings = useMemo(() => stickerDealSavingsCents(items), [items]);
  const stickerNudge = useMemo(() => stickersUntilDeal(items), [items]);
  const shipping = useMemo(
    () => cartShippingCents(items, fulfillment),
    [items, fulfillment],
  );
  const total = useMemo(
    () => cartTotalCents(items, fulfillment),
    [items, fulfillment],
  );
  const weightOz = useMemo(() => cartWeightOz(items), [items]);
  const quantity = cartQuantity(items);
  const bagFull = quantity >= MAX_CART_ITEMS;

  function openProduct(styleId: string) {
    setBagOpen(false);
    setOpenStyleId(styleId);
    setCheckoutError(null);
  }

  function closeProduct() {
    setOpenStyleId(null);
    if (params.get("style")) {
      const next = new URLSearchParams(params);
      next.delete("style");
      setParams(next, { replace: true });
    }
  }

  function addToBag(item: Omit<CartItem, "id">) {
    if (bagFull) {
      setCheckoutError(`Bags can hold up to ${MAX_CART_ITEMS} items.`);
      return;
    }

    setCheckoutError(null);
    setItems((current) => {
      const match = current.find(
        (entry) =>
          entry.styleId === item.styleId &&
          entry.sizeId === item.sizeId &&
          entry.colorId === item.colorId &&
          entry.engravingColorId === item.engravingColorId &&
          entry.fontId === item.fontId &&
          entry.backFontId === item.backFontId &&
          (entry.sides ?? 1) === (item.sides ?? 1) &&
          entry.engraving === item.engraving &&
          (entry.backEngraving ?? "") === (item.backEngraving ?? ""),
      );

      const addBy = Math.max(1, item.quantity || 1);

      if (match) {
        const otherCount = cartQuantity(
          current.filter((entry) => entry.id !== match.id),
        );
        return current.map((entry) =>
          entry.id === match.id
            ? {
                ...entry,
                quantity: Math.min(
                  10,
                  entry.quantity + addBy,
                  MAX_CART_ITEMS - otherCount,
                ),
              }
            : entry,
        );
      }

      return [
        ...current,
        {
          ...item,
          id: newItemId(),
          quantity: Math.min(
            10,
            addBy,
            MAX_CART_ITEMS - cartQuantity(current),
          ),
        },
      ];
    });
    closeProduct();
    if (window.matchMedia("(max-width: 860px)").matches) {
      setBagOpen(true);
    }
  }

  function updateQuantity(id: string, nextQuantity: number) {
    setItems((current) => {
      if (nextQuantity < 1) {
        return current.filter((item) => item.id !== id);
      }
      const otherCount = cartQuantity(current.filter((item) => item.id !== id));
      const quantity = Math.min(10, nextQuantity, MAX_CART_ITEMS - otherCount);
      return current.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
    });
  }

  async function checkout() {
    if (items.length === 0) {
      setCheckoutError("Add something to your bag first.");
      return;
    }

    setCheckingOut(true);
    setCheckoutError(null);

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, fulfillment }),
      });
      const raw = await response.text();
      let data: { url?: string; error?: string } = {};
      try {
        data = raw ? (JSON.parse(raw) as { url?: string; error?: string }) : {};
      } catch {
        throw new Error("Could not start checkout. Try again in a minute.");
      }
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout");
      }
      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "Could not start checkout",
      );
      setCheckingOut(false);
    }
  }

  return (
    <div className="shop-page shop-page--holiday">
      <Snowfall />
      <PageHero
        className="hero--shop"
        title="Santa Kyle's Workshop"
        tagline="Order by December 17th (USPS Ground) for holiday delivery"
        image="/images/shop/santas-workshop-hero.jpg"
        imageAlt="Kyle Holiday as Santa in a leather harness wearing a round Mx Cruise LA Leather 2026 tag"
        imagePosition="center 18%"
        links={[
          { label: "Shop Tags", href: "/shop#tags" },
          { label: "Shop Tees", href: "/shop#tees" },
          { label: "Shop Stickers", href: "/shop#stickers" },
          { label: "Shop Prints", href: "/shop#prints" },
        ]}
      />

      <div className="page page--after-hero">
        <div className="page-inner">
          <section className="section shop-builder">
            <SectionHeader
              title="Fill a sack"
              subtitle="Check it twice."
            />

            <div className="shop-builder__layout">
              <div className="shop-builder__form">
                {(["tag", "shirt", "sticker", "print"] as const).map((kind) => {
                  const options = shopStyles.filter(
                    (option) => option.kind === kind,
                  );
                  if (options.length === 0) return null;
                  const sectionId =
                    kind === "tag"
                      ? "tags"
                      : kind === "shirt"
                        ? "tees"
                        : kind === "print"
                          ? "prints"
                          : "stickers";
                  return (
                    <div
                      key={kind}
                      className="shop-style-group"
                      id={sectionId}
                    >
                      <p className="shop-style-group__label">
                        {kind === "tag"
                          ? "Tags"
                          : kind === "shirt"
                            ? "Tees"
                            : kind === "print"
                              ? "Prints"
                              : "Vinyl stickers that can get wet 💦 · 3 for $10, your pick"}
                      </p>
                      <div className="shop-styles">
                        {options.map((option, index) => (
                          <button
                            key={option.id}
                            type="button"
                            className="shop-style"
                            onClick={() => openProduct(option.id)}
                          >
                            <img
                              src={option.src}
                              alt=""
                              className="shop-style__image"
                              width={400}
                              height={400}
                              decoding="async"
                              loading={
                                kind === "tag" && index < 4 ? "eager" : "lazy"
                              }
                            />
                            <span className="shop-style__copy">
                              <span className="shop-style__title">
                                {option.title}
                              </span>
                              <span className="shop-style__meta">
                                {option.caption.includes("$")
                                  ? option.caption
                                  : `${option.caption} · ${stylePriceLabel(option)}`}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {params.get("test") === "1" &&
                  shopStyles
                    .filter((option) => option.kind === "test")
                    .map((option) => (
                      <div
                        key={option.id}
                        className="shop-style-group"
                        id="test"
                      >
                        <p className="shop-style-group__label">Testing</p>
                        <div className="shop-styles">
                          <button
                            type="button"
                            className="shop-style"
                            onClick={() => openProduct(option.id)}
                          >
                            <img
                              src={option.src}
                              alt=""
                              className="shop-style__image"
                              width={400}
                              height={400}
                              decoding="async"
                              loading="lazy"
                            />
                            <span className="shop-style__copy">
                              <span className="shop-style__title">
                                {option.title}
                              </span>
                              <span className="shop-style__meta">
                                {option.caption} · {formatUsd(option.priceCents)}
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}

                <div className="shop-style-group" id="leather">
                  <p className="shop-style-group__label">Leather</p>
                  <div className="shop-leather">
                    <img
                      src="/images/leather/femme-harness.jpeg"
                      alt=""
                      className="shop-style__image"
                      width={400}
                      height={400}
                      decoding="async"
                      loading="lazy"
                    />
                    <div className="shop-leather__copy">
                      <Link
                        to="/leatherwork"
                        className="shop-leather__title"
                      >
                        I make leather gear to order.
                      </Link>
                      <a
                        className="shop-leather__email"
                        href={`mailto:${site.email}?subject=Leather%20Inquiry`}
                      >
                        Email me with any questions.
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {bagOpen && (
                <button
                  type="button"
                  className="shop-bag-backdrop"
                  aria-label="Close sack"
                  onClick={() => setBagOpen(false)}
                />
              )}

              <aside
                className={`shop-bag${bagOpen ? " shop-bag--open" : ""}`}
                id="sack"
                aria-live="polite"
              >
                <div className="shop-bag__handle" aria-hidden="true" />
                <div className="shop-bag__header">
                  <h3 className="shop-bag__title">
                    Your sack
                    {quantity > 0 ? ` · ${quantity}` : ""}
                  </h3>
                  <button
                    type="button"
                    className="shop-bag__close"
                    aria-label="Close sack"
                    onClick={() => setBagOpen(false)}
                  >
                    ×
                  </button>
                </div>

                {items.length === 0 ? (
                  <p className="shop-bag__empty">
                    Your sack is empty
                    <span className="shop-bag__empty-face" aria-hidden="true">
                      :(
                    </span>
                  </p>
                ) : (
                  <ul className="shop-bag__list">
                    {items.map((item) => {
                      const lineStyle = getStyle(item.styleId);
                      if (!lineStyle) return null;
                      return (
                        <li key={item.id} className="shop-bag__item">
                          <img
                            src={lineStyle.src}
                            alt=""
                            className="shop-bag__thumb"
                          />
                          <div className="shop-bag__details">
                            <p className="shop-bag__name">{lineStyle.title}</p>
                            <p className="shop-bag__meta">
                              {itemSummary(item)}
                            </p>
                            <div className="shop-bag__qty">
                              <button
                                type="button"
                                aria-label="Remove one"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                −
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                type="button"
                                aria-label="Add one"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <p className="shop-bag__price">
                            {formatUsd(itemUnitPrice(item) * item.quantity)}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <fieldset className="shop-fulfillment">
                  <legend className="shop-field__label">Shipping</legend>
                  {shippingMethods.map((method) => {
                    const price = cartShippingCents(items, method.id);
                    const missed = isHolidayCutoffPassed(method.cutoffDate);
                    return (
                      <label
                        key={method.id}
                        className="shop-radio shop-radio--stack"
                      >
                        <input
                          type="radio"
                          name="fulfillment"
                          checked={fulfillment === method.id}
                          onChange={() => setFulfillment(method.id)}
                        />
                        <span>
                          <span className="shop-radio__name">
                            {method.label}
                            {items.length > 0 ? ` · ${formatUsd(price)}` : ""}
                          </span>
                          <span className="shop-radio__cutoff">
                            {missed
                              ? `Christmas cutoff was ${method.cutoffLabel}`
                              : `Christmas cutoff ${method.cutoffLabel}`}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </fieldset>

                {stickerNudge > 0 && items.some((item) => getStyle(item.styleId)?.kind === "sticker") && (
                  <p className="shop-bag__deal-hint">
                    Add {stickerNudge} more{" "}
                    {stickerNudge === 1 ? "sticker" : "stickers"} for 3 for $10.
                  </p>
                )}

                <div className="shop-bag__totals">
                  {stickerSavings > 0 && (
                    <p className="shop-bag__deal">
                      <span>3 for $10, your pick</span>
                      <span>−{formatUsd(stickerSavings)}</span>
                    </p>
                  )}
                  <p>
                    <span>Subtotal</span>
                    <span>{formatUsd(subtotal)}</span>
                  </p>
                  <p>
                    <span>
                      Shipping
                      {items.length > 0 ? ` · ${formatWeight(weightOz)}` : ""}
                    </span>
                    <span>{formatUsd(shipping)}</span>
                  </p>
                  <p className="shop-bag__total">
                    <span>Total</span>
                    <span>{formatUsd(total)}</span>
                  </p>
                </div>

                {checkoutError && (
                  <p className="shop-bag__error" role="alert">
                    {checkoutError}
                  </p>
                )}

                <button
                  type="button"
                  className="cta-btn cta-btn--primary shop-checkout"
                  onClick={checkout}
                  disabled={checkingOut || items.length === 0}
                >
                  {checkingOut ? "Sending you to checkout…" : "Checkout"}
                </button>
                <p className="shop-bag__packaging">Ships in discreet packaging</p>
              </aside>
            </div>
          </section>
        </div>
      </div>

      {!openStyle && !bagOpen && (
        <button
          type="button"
          className="shop-sack-bar"
          aria-controls="sack"
          aria-expanded={bagOpen}
          onClick={() => setBagOpen(true)}
        >
          <span className="shop-sack-bar__label">Your sack</span>
          <span className="shop-sack-bar__meta">
            {quantity > 0
              ? `${quantity} · ${formatUsd(total)}`
              : "Tap to open"}
          </span>
        </button>
      )}

      {openStyle && (
        <ShopProductModal
          style={openStyle}
          remaining={MAX_CART_ITEMS - quantity}
          onClose={closeProduct}
          onAdd={addToBag}
        />
      )}
    </div>
  );
}
