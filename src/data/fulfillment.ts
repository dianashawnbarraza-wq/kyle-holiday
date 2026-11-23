import { isPickupFulfillment } from "./shop";

/** Stored on Stripe Checkout Session metadata as `fulfillment_status`. */
export type FulfillmentStatus =
  | "new"
  | "making"
  | "packing"
  | "labeled"
  | "shipped"
  | "ready"
  | "picked_up";

export type FulfillmentStep = {
  id: FulfillmentStatus;
  label: string;
};

export const shipSteps: FulfillmentStep[] = [
  { id: "new", label: "New" },
  { id: "making", label: "Make" },
  { id: "packing", label: "Pack" },
  { id: "labeled", label: "Label" },
  { id: "shipped", label: "Ship" },
];

export const pickupSteps: FulfillmentStep[] = [
  { id: "new", label: "New" },
  { id: "making", label: "Make" },
  { id: "ready", label: "Ready" },
  { id: "picked_up", label: "Picked up" },
];

export function stepsForFulfillment(fulfillment: string | null | undefined) {
  return isPickupFulfillment(fulfillment) ? pickupSteps : shipSteps;
}

export function isTerminalStatus(status: FulfillmentStatus) {
  return status === "shipped" || status === "picked_up";
}

export function statusLabel(status: FulfillmentStatus) {
  switch (status) {
    case "new":
      return "New";
    case "making":
      return "Making";
    case "packing":
      return "Packing";
    case "labeled":
      return "Labeled";
    case "shipped":
      return "Shipped";
    case "ready":
      return "Ready for pickup";
    case "picked_up":
      return "Picked up";
    default:
      return status;
  }
}

export function parseFulfillmentStatus(
  raw: string | null | undefined,
  shippedFlag: boolean,
  fulfillment: string | null | undefined,
): FulfillmentStatus {
  const allowed = new Set(
    stepsForFulfillment(fulfillment).map((step) => step.id),
  );
  if (raw && allowed.has(raw as FulfillmentStatus)) {
    return raw as FulfillmentStatus;
  }
  if (shippedFlag) {
    return isPickupFulfillment(fulfillment) ? "picked_up" : "shipped";
  }
  return "new";
}

export function trackingUrl(trackingNumber: string) {
  const cleaned = trackingNumber.replace(/\s+/g, "");
  if (!cleaned) return null;
  return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${encodeURIComponent(cleaned)}`;
}
