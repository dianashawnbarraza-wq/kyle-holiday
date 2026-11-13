import Stripe from "stripe";
import { site } from "../data/site.js";
import { getStripeClient } from "./stripeClient.js";
import {
  type CartItem,
  type Fulfillment,
  type EngravingFillId,
  type ShopFont,
  MAX_CART_ITEMS,
  cartQuantity,
  cartShippingCents,
  cartWeightOz,
  formatWeight,
  getColor,
  getFont,
  isValidEngravingFill,
  fulfillmentLabel,
  getShippingMethod,
  getSize,
  getStyle,
  isHolidayCutoffPassed,
  isPickupFulfillment,
  itemSummary,
  itemUnitPrice,
  sanitizeEngraving,
  shopSiteUrl,
  stickerDealSavingsCents,
} from "../data/shop.js";

export type CheckoutPayload = {
  items?: Array<{
    styleId?: string;
    sizeId?: string;
    colorId?: string;
    engravingColorId?: string;
    fontId?: string;
    backFontId?: string;
    sides?: number;
    engraving?: string;
    backEngraving?: string;
    quantity?: number;
  }>;
  fulfillment?: string;
};

function getStripe() {
  return getStripeClient();
}

function normalizeFulfillment(value: string | undefined): Fulfillment {
  if (value === "ship") return "ground";
  const method = getShippingMethod(value);
  if (!method) {
    throw new Error("Choose shipping or pickup");
  }
  if (
    method.kind === "pickup" &&
    isHolidayCutoffPassed(method.cutoffDate)
  ) {
    throw new Error("That pickup date has passed. Choose shipping or another pickup.");
  }
  return method.id;
}

function normalizeCart(payload: CheckoutPayload): {
  items: CartItem[];
  fulfillment: Fulfillment;
} {
  const fulfillment = normalizeFulfillment(payload.fulfillment);
  const rawItems = payload.items ?? [];
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error("Add something to your bag");
  }

  const items: CartItem[] = rawItems.map((item, index) => {
    const style = item.styleId ? getStyle(item.styleId) : undefined;
    if (!style) throw new Error("Choose a product");

    const size = item.sizeId ? getSize(style, item.sizeId) : undefined;
    if (!size) throw new Error("Choose a size");

    const quantity = Math.min(10, Math.max(1, Math.floor(item.quantity ?? 1)));

    if (style.kind !== "tag") {
      return {
        id: `item-${index}`,
        styleId: style.id,
        sizeId: size.id,
        quantity,
      };
    }

    const color = item.colorId ? getColor(item.colorId) : undefined;
    const font = item.fontId ? getFont(item.fontId) : undefined;
    const backFont = item.backFontId ? getFont(item.backFontId) : font;
    const engraving = sanitizeEngraving(item.engraving ?? "");
    const backEngraving = sanitizeEngraving(item.backEngraving ?? "");
    const sides: 1 | 2 = item.sides === 2 && style.allowsSides ? 2 : 1;

    if (!color) throw new Error("Choose a color");
    if (sides === 2 && !color.allowsDoubleSided) {
      throw new Error("That color can't be engraved on both sides");
    }
    if (!isValidEngravingFill(color.id, item.engravingColorId)) {
      throw new Error("Choose an engraving color");
    }
    if (!font) throw new Error("Choose a font");
    if (!engraving) throw new Error("Add engraving text");
    if (sides === 2 && !backEngraving) {
      throw new Error("Add back engraving for two-sided tags");
    }

    return {
      id: `item-${index}`,
      styleId: style.id,
      sizeId: size.id,
      colorId: color.id,
      engravingColorId: item.engravingColorId as EngravingFillId,
      fontId: font.id as ShopFont["id"],
      backFontId: sides === 2 ? (backFont?.id as ShopFont["id"]) : undefined,
      sides,
      engraving,
      backEngraving: sides === 2 ? backEngraving : undefined,
      quantity,
    };
  });

  if (cartQuantity(items) > MAX_CART_ITEMS) {
    throw new Error(`Bags can hold up to ${MAX_CART_ITEMS} items`);
  }

  return { items, fulfillment };
}

function shippingOptionsFor(
  items: CartItem[],
  fulfillment: Fulfillment,
): Stripe.Checkout.SessionCreateParams.ShippingOption[] {
  if (isPickupFulfillment(fulfillment)) return [];

  const method = getShippingMethod(fulfillment)!;
  const amount = cartShippingCents(items, fulfillment);
  const missedCutoff = isHolidayCutoffPassed(method.cutoffDate);
  const displayName =
    fulfillment === "priority"
      ? missedCutoff
        ? "USPS Priority Mail"
        : "Priority Mail · by Dec. 18"
      : missedCutoff
        ? "USPS Ground Advantage"
        : "Ground Advantage · by Dec. 17";

  return [
    {
      shipping_rate_data: {
        type: "fixed_amount",
        display_name: displayName.slice(0, 100),
        fixed_amount: { amount, currency: "usd" },
        delivery_estimate:
          fulfillment === "priority"
            ? {
                minimum: { unit: "business_day", value: 1 },
                maximum: { unit: "business_day", value: 3 },
              }
            : {
                minimum: { unit: "business_day", value: 2 },
                maximum: { unit: "business_day", value: 5 },
              },
      },
    },
  ];
}

export async function createCheckoutSession(
  payload: CheckoutPayload,
  origin: string,
) {
  const { items, fulfillment } = normalizeCart(payload);
  const stripe = getStripe();
  const method = getShippingMethod(fulfillment);
  const pickup = isPickupFulfillment(fulfillment);
  const weight = cartWeightOz(items);

  const stickerSavings = stickerDealSavingsCents(items);
  const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
  if (stickerSavings > 0) {
    const coupon = await stripe.coupons.create({
      amount_off: stickerSavings,
      currency: "usd",
      duration: "once",
      name: "3 stickers for $10",
      metadata: { source: "sticker-deal" },
    });
    discounts.push({ coupon: coupon.id });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/shop/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/shop`,
    payment_intent_data: {
      description: pickup
        ? fulfillmentLabel(fulfillment)
        : "Santa Kyle's Workshop",
      statement_descriptor: "KYLE HOLIDAY",
    },
    branding_settings: {
      display_name: "Kyle Holiday",
    },
    phone_number_collection: { enabled: true },
    billing_address_collection: "required",
    ...(pickup
      ? {}
      : {
          shipping_address_collection: { allowed_countries: ["US"] },
          shipping_options: shippingOptionsFor(items, fulfillment),
        }),
    custom_text: {
      submit: {
        message:
          pickup && method
            ? `${method.label}${method.detail ? `, ${method.detail}` : ""}, ${method.cutoffLabel}. I'll have your order at the table.`
            : method
              ? `USPS ${method.label.replace("USPS ", "")}. Christmas cutoff ${method.cutoffLabel}. Ships in discreet packaging.`
              : "Handmade in Los Angeles. Ships in discreet packaging.",
      },
      after_submit: {
        message: `Follow me on Instagram ${site.instagramHandle} for making-of and shipping updates: ${site.instagram}`,
      },
    },
    line_items: items.map((item) => {
      const style = getStyle(item.styleId)!;
      const description = itemSummary(item) || style.caption;
      return {
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: itemUnitPrice(item),
          product_data: {
            name: style.title,
            ...(description ? { description } : {}),
            images: [`${shopSiteUrl}${style.src}`],
          },
        },
      };
    }),
    ...(discounts.length > 0 ? { discounts } : {}),
    metadata: {
      fulfillment,
      fulfillment_label: fulfillmentLabel(fulfillment),
      item_count: String(cartQuantity(items)),
      weight_oz: String(weight),
      weight: formatWeight(weight),
      sticker_deal_savings: String(stickerSavings),
      engravings: items
        .map((item) => item.engraving)
        .filter(Boolean)
        .join(", ")
        .slice(0, 500),
    },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  return { url: session.url };
}
