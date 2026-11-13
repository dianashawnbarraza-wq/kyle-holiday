export const shopSiteUrl = "https://www.kyleholiday.com";

export const MAX_CART_ITEMS = 20;
export const MAX_ENGRAVING_LENGTH = 20;
export const DOUBLE_SIDED_UPCHARGE_CENTS = 200;
export const STICKER_PRICE_CENTS = 400;
export const STICKER_DEAL_COUNT = 3;
export const STICKER_DEAL_CENTS = 1000;

export type ProductKind = "tag" | "shirt" | "sticker" | "print" | "test";

export type ShopSize = {
  id: string;
  name: string;
  priceCents?: number;
};

export type ShopFont = {
  id: "old-english" | "metal" | "typewriter";
  name: string;
};

export type EngravingFillId = "black" | "white";

export type ShopColor = {
  id: string;
  name: string;
  hex: string;
  houston: string;
  houstonUrl: string;
  allowsDoubleSided: boolean;
  engravingFills: EngravingFillId[];
};

export type ShopGalleryPhoto = {
  src: string;
  label?: string;
  colorId?: string;
};

export type ShopStyle = {
  id: string;
  kind: ProductKind;
  title: string;
  caption: string;
  src: string;
  alt: string;
  gallery?: Array<string | ShopGalleryPhoto>;
  priceCents: number;
  weightOz: number;
  sizes: ShopSize[];
  allowsSides: boolean;
  allowsFont: boolean;
  allowsColor: boolean;
  allowsEngraving: boolean;
};

export type CartItem = {
  id: string;
  styleId: string;
  sizeId: string;
  colorId?: string;
  engravingColorId?: EngravingFillId;
  fontId?: ShopFont["id"];
  backFontId?: ShopFont["id"];
  sides?: 1 | 2;
  engraving?: string;
  backEngraving?: string;
  quantity: number;
};

export type Fulfillment =
  | "ground"
  | "priority"
  | "pickup-cruise"
  | "pickup-akbar";

export const shopFonts: ShopFont[] = [
  { id: "old-english", name: "Old English" },
  { id: "metal", name: "Metal" },
  { id: "typewriter", name: "Typewriter" },
];

export const engravingFills: Array<{
  id: EngravingFillId;
  name: string;
  hex: string;
}> = [
  { id: "black", name: "Black", hex: "#161616" },
  { id: "white", name: "White", hex: "#f4f0ea" },
];

const eitherFill: EngravingFillId[] = ["black", "white"];

const tagReferencePhotos = [
  "/images/tags/reference/other-colors.jpg",
  "/images/tags/reference/pastel-colors.jpg",
  "/images/tags/reference/font-options.png",
  "/images/tags/reference/about-tags.png",
];

export const shopColors: ShopColor[] = [
  {
    id: "black",
    name: "Black",
    hex: "#161616",
    houston: "Black",
    houstonUrl: "https://houstonacrylic.com/products/black-cast-acrylic-sheet",
    allowsDoubleSided: true,
    engravingFills: ["white"],
  },
  {
    id: "white",
    name: "White",
    hex: "#f4f0ea",
    houston: "White",
    houstonUrl: "https://houstonacrylic.com/products/white-cast-acrylic-sheet",
    allowsDoubleSided: true,
    engravingFills: ["black"],
  },
  {
    id: "red",
    name: "Red",
    hex: "#c41e1e",
    houston: "Red 2793",
    houstonUrl: "https://houstonacrylic.com/products/red-2793-cast-acrylic-sheet",
    allowsDoubleSided: true,
    engravingFills: eitherFill,
  },
  {
    id: "hot-pink",
    name: "Hot Pink",
    hex: "#e21b70",
    houston: "Hot Pink",
    houstonUrl: "https://houstonacrylic.com/products/hot-pink-cast-acrylic-sheet",
    allowsDoubleSided: true,
    engravingFills: eitherFill,
  },
  {
    id: "baby-pink",
    name: "Baby Pink",
    hex: "#f4b6c8",
    houston: "Frosted Baby Pink",
    houstonUrl: "https://houstonacrylic.com/products/frosted-baby-pink-acrylic",
    allowsDoubleSided: true,
    engravingFills: ["black"],
  },
  {
    id: "slime-green",
    name: "Slime Green",
    hex: "#9fd400",
    houston: "Slime Green",
    houstonUrl:
      "https://houstonacrylic.com/products/fluorescent-green-cast-acrylic-sheet",
    allowsDoubleSided: true,
    engravingFills: eitherFill,
  },
  {
    id: "fluorescent-pink",
    name: "Fluorescent Pink (see through)",
    hex: "#ff2d8a",
    houston: "Fluorescent Red/Pink",
    houstonUrl: "https://houstonacrylic.com/products/flourescent-red-pink-acrylic",
    allowsDoubleSided: false,
    engravingFills: eitherFill,
  },
  {
    id: "fluorescent-green",
    name: "Fluorescent Green (see through)",
    hex: "#b6ff00",
    houston: "Fluorescent Green",
    houstonUrl:
      "https://houstonacrylic.com/products/fluorescent-green-cast-acrylic-sheet",
    allowsDoubleSided: false,
    engravingFills: eitherFill,
  },
  {
    id: "glow-green",
    name: "Glow in the Dark Green",
    hex: "#9dff6a",
    houston: "Green Glow in the Dark",
    houstonUrl:
      "https://houstonacrylic.com/products/green-glow-in-the-dark-cast-acrylic-sheet",
    allowsDoubleSided: false,
    engravingFills: eitherFill,
  },
  {
    id: "yellow",
    name: "Yellow",
    hex: "#f5d000",
    houston: "Yellow",
    houstonUrl: "https://houstonacrylic.com/products/yellow-cast-acrylic-sheet",
    allowsDoubleSided: true,
    engravingFills: ["black"],
  },
  {
    id: "orange",
    name: "Orange",
    hex: "#ff6a00",
    houston: "Orange",
    houstonUrl: "https://houstonacrylic.com/products/orange-cast-acrylic-sheet",
    allowsDoubleSided: true,
    engravingFills: eitherFill,
  },
  {
    id: "blue",
    name: "Blue",
    hex: "#2f6bff",
    houston: "Blue 2051",
    houstonUrl: "https://houstonacrylic.com/products/blue-cast-acrylic-sheet",
    allowsDoubleSided: true,
    engravingFills: ["white"],
  },
  {
    id: "pastel-lilac",
    name: "Pastel Lilac",
    hex: "#c4b0e0",
    houston: "Bright Pastel Lilac",
    houstonUrl: "https://houstonacrylic.com/products/bright-pastel-lilac-acrylic",
    allowsDoubleSided: false,
    engravingFills: eitherFill,
  },
  {
    id: "frosted-lilac",
    name: "Frosted Lilac",
    hex: "#a88fbd",
    houston: "Frosted Lilac",
    houstonUrl: "https://houstonacrylic.com/products/frosted-lilac-acrylic",
    allowsDoubleSided: true,
    engravingFills: eitherFill,
  },
  {
    id: "frosted-cherry",
    name: "Frosted Cherry",
    hex: "#c4454d",
    houston: "Frosted Cherry",
    houstonUrl: "https://houstonacrylic.com/products/frosted-cherry-red-acrylic",
    allowsDoubleSided: false,
    engravingFills: eitherFill,
  },
  {
    id: "spearmint",
    name: "Mint",
    hex: "#7ddeb0",
    houston: "Pastel Spearmint Green",
    houstonUrl:
      "https://houstonacrylic.com/products/pastel-spearmint-green-acrylic",
    allowsDoubleSided: true,
    engravingFills: eitherFill,
  },
  {
    id: "volcanic-pink",
    name: "Volcanic Pink (textured)",
    hex: "#ff2d8a",
    houston: "Volcanic Pink",
    houstonUrl: "https://houstonacrylic.com/",
    allowsDoubleSided: false,
    engravingFills: eitherFill,
  },
  {
    id: "volcanic-green",
    name: "Volcanic Green (textured)",
    hex: "#4c8a32",
    houston: "Volcanic Green",
    houstonUrl: "https://houstonacrylic.com/",
    allowsDoubleSided: false,
    engravingFills: eitherFill,
  },
];

const boneSizes: ShopSize[] = [
  { id: "regular", name: "Regular · 2.5\"", priceCents: 1400 },
  { id: "large", name: "Large · 2.85\"", priceCents: 1600 },
  { id: "xl", name: "XL · 3.25\"", priceCents: 1800 },
];

const heartSizes: ShopSize[] = [
  { id: "small", name: "Small · 1.2\"", priceCents: 1400 },
  { id: "medium", name: "Medium · 1.55\"", priceCents: 1600 },
  { id: "large", name: "Large · 1.8\"", priceCents: 1800 },
];

const largeOnly: ShopSize[] = [
  { id: "large", name: "Large · 2.85\"", priceCents: 1600 },
];
const roundSize: ShopSize[] = [
  { id: "one-size", name: "1.5\" wide", priceCents: 1400 },
];
const dropSize: ShopSize[] = [
  { id: "one-size", name: "Drop · 1.5\"", priceCents: 1500 },
];
const conversationHeartSizes: ShopSize[] = [
  { id: "small", name: "Small · 1.2\"", priceCents: 1500 },
  { id: "medium", name: "Medium · 1.55\"", priceCents: 1800 },
  { id: "large", name: "Large · 1.8\"", priceCents: 2000 },
];
const stickerSize: ShopSize[] = [{ id: "one-size", name: "One size" }];
const printSize: ShopSize[] = [{ id: "one-size", name: "Framed print" }];
const shirtSizes: ShopSize[] = [
  { id: "s", name: "S" },
  { id: "m", name: "M" },
  { id: "l", name: "L" },
  { id: "xl", name: "XL" },
];

export const shopStyles: ShopStyle[] = [
  {
    id: "bone",
    kind: "tag",
    title: "Custom Bone Tag",
    caption: "Classic bone",
    src: "/images/tags/etsy/puppy-bone.jpg",
    alt: "Custom bone pet play tag",
    gallery: [
      {
        src: "/images/tags/bones/pretty-puppy.jpg",
        label: "Black",
        colorId: "black",
      },
      {
        src: "/images/tags/bones/owned-volcanic-green.jpg",
        label: "Volcanic Green",
        colorId: "volcanic-green",
      },
      {
        src: "/images/tags/bones/mommys-mutt.jpg",
        label: "Mint",
        colorId: "spearmint",
      },
      {
        src: "/images/tags/bones/petal-pink.jpg",
        label: "Baby Pink",
        colorId: "baby-pink",
      },
      {
        src: "/images/tags/bones/pupsylle-orange.jpg",
        label: "Orange",
        colorId: "orange",
      },
      {
        src: "/images/tags/bones/amethyst-lilac.jpg",
        label: "Frosted Lilac",
        colorId: "frosted-lilac",
      },
      {
        src: "/images/tags/bones/spencer-fluorescent.jpg",
        label: "Fluorescent Pink",
        colorId: "fluorescent-pink",
      },
      {
        src: "/images/tags/bones/ghost-cherry.jpg",
        label: "Frosted Cherry",
        colorId: "frosted-cherry",
      },
      {
        src: "/images/tags/bones/urinal-yellow.jpg",
        label: "Yellow",
        colorId: "yellow",
      },
      {
        src: "/images/tags/bones/mutt-red.jpg",
        label: "Red",
        colorId: "red",
      },
      {
        src: "/images/tags/bones/dread-lilac.jpg",
        label: "Pastel Lilac",
        colorId: "pastel-lilac",
      },
      {
        src: "/images/tags/etsy/double-sided-bone.jpg",
        label: "Blue",
        colorId: "blue",
      },
      "/images/tags/etsy/puppy-bone.jpg",
      "/images/tags/glow-collection.png",
      "/images/tags/reference/other-colors.jpg",
      "/images/tags/reference/font-options.png",
      "/images/tags/reference/about-tags.png",
    ],
    priceCents: 1400,
    weightOz: 1,
    sizes: boneSizes,
    allowsSides: true,
    allowsFont: true,
    allowsColor: true,
    allowsEngraving: true,
  },
  {
    id: "heart",
    kind: "tag",
    title: "Custom Heart Tag",
    caption: "Heart shape",
    src: "/images/tags/etsy/heart-tag.jpg",
    alt: "Custom heart pet play tag",
    gallery: [
      "/images/tags/etsy/heart-tag.jpg",
      "/images/tags/hall-of-fame/good-girl-heart.png",
      "/images/tags/diet-coke-doll-hero.jpg",
      "/images/tags/good-girl.png",
      ...tagReferencePhotos,
    ],
    priceCents: 1400,
    weightOz: 1,
    sizes: heartSizes,
    allowsSides: false,
    allowsFont: true,
    allowsColor: true,
    allowsEngraving: true,
  },
  {
    id: "conversation-heart",
    kind: "tag",
    title: "Custom Conversation Heart Tag",
    caption: "Candy heart · custom text",
    src: "/images/tags/etsy/conversation-heart.jpg",
    alt: "Pastel conversation heart tags engraved PEACHES, POPPY, and MOMMY",
    gallery: [
      "/images/tags/etsy/conversation-heart.jpg",
      "/images/tags/etsy/heart-tag.jpg",
      "/images/tags/hall-of-fame/good-girl-heart.png",
      ...tagReferencePhotos,
    ],
    priceCents: 1500,
    weightOz: 1,
    sizes: conversationHeartSizes,
    allowsSides: false,
    allowsFont: true,
    allowsColor: true,
    allowsEngraving: true,
  },
  {
    id: "barbed-wire",
    kind: "tag",
    title: "Custom Barbed Wire Bone Tag",
    caption: "Large bone with barbed wire border",
    src: "/images/tags/etsy/barbed-wire-bone.jpg",
    alt: "Barbed wire bone pet play tag",
    gallery: [
      "/images/tags/etsy/barbed-wire-bone.jpg",
      "/images/tags/etsy/barbed-wire-custom.jpg",
      "/images/tags/barbed-bone.png",
      ...tagReferencePhotos,
    ],
    priceCents: 1400,
    weightOz: 1,
    sizes: largeOnly,
    allowsSides: false,
    allowsFont: true,
    allowsColor: true,
    allowsEngraving: true,
  },
  {
    id: "chain-bone",
    kind: "tag",
    title: "Custom Chain Bone Tag",
    caption: "Large bone with chain border",
    src: "/images/tags/etsy/chain-bone.png",
    alt: "Chain bone pet play tag",
    gallery: ["/images/tags/etsy/chain-bone.png", ...tagReferencePhotos],
    priceCents: 1400,
    weightOz: 1,
    sizes: largeOnly,
    allowsSides: false,
    allowsFont: true,
    allowsColor: true,
    allowsEngraving: true,
  },
  {
    id: "round",
    kind: "tag",
    title: "Custom Round Tag",
    caption: "1.5\" wide",
    src: "/images/tags/hall-of-fame/round-tags-collection.png",
    alt: "Custom round pet play tag",
    gallery: [
      "/images/tags/hall-of-fame/round-tags-collection.png",
      "/images/tags/bite-risk-round.png",
      ...tagReferencePhotos,
    ],
    priceCents: 1400,
    weightOz: 1,
    sizes: roundSize,
    allowsSides: false,
    allowsFont: true,
    allowsColor: true,
    allowsEngraving: true,
  },
  {
    id: "bite-risk",
    kind: "tag",
    title: "Custom Bite Me / Bite Risk Tag",
    caption: "Drop shape",
    src: "/images/tags/etsy/bite-me-drop.jpg",
    alt: "Red teardrop Bite Me tag with Sleepytime Bondage Bear stickers",
    gallery: [
      "/images/tags/etsy/bite-me-drop.jpg",
      "/images/tags/bite-risk-round.png",
      ...tagReferencePhotos,
    ],
    priceCents: 1500,
    weightOz: 1,
    sizes: dropSize,
    allowsSides: false,
    allowsFont: true,
    allowsColor: true,
    allowsEngraving: true,
  },
  {
    id: "shirt",
    kind: "shirt",
    title: "Trans Leather Babes Tee",
    caption: "Screenprinted t-shirt",
    src: "/images/title-tshirt.png",
    alt: "Black t-shirt with Trans Leather Babes glitter screen print",
    gallery: ["/images/title-tshirt.png"],
    priceCents: 3000,
    weightOz: 6,
    sizes: shirtSizes,
    allowsSides: false,
    allowsFont: false,
    allowsColor: false,
    allowsEngraving: false,
  },
  {
    id: "olive-garden-sticker",
    kind: "sticker",
    title: "My Pussy Tastes Like Olive Garden",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/olive-garden-sticker.jpg",
    alt: "My Pussy Tastes Like Olive Garden vinyl sticker by Kyle Holiday",
    priceCents: STICKER_PRICE_CENTS,
    weightOz: 0.2,
    sizes: stickerSize,
    allowsSides: false,
    allowsFont: false,
    allowsColor: false,
    allowsEngraving: false,
  },
  {
    id: "shadowbanned-sticker",
    kind: "sticker",
    title: "All My Friends Are Shadowbanned",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/shadowbanned-sticker.png",
    alt: "All my friends are shadowbanned vinyl sticker by Kyle Holiday",
    priceCents: STICKER_PRICE_CENTS,
    weightOz: 0.2,
    sizes: stickerSize,
    allowsSides: false,
    allowsFont: false,
    allowsColor: false,
    allowsEngraving: false,
  },
  {
    id: "praise-coming-sticker",
    kind: "sticker",
    title: "Keep the Praise Coming",
    caption: "Holographic vinyl sticker",
    src: "/images/art/stickers/praise-coming-sticker.png",
    alt: "Keep the Praise Coming holographic vinyl sticker by Kyle Holiday",
    priceCents: STICKER_PRICE_CENTS,
    weightOz: 0.2,
    sizes: stickerSize,
    allowsSides: false,
    allowsFont: false,
    allowsColor: false,
    allowsEngraving: false,
  },
  {
    id: "sleepytime-bear-sticker",
    kind: "sticker",
    title: "Sleepytime Bondage Bear",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/sleepytime-bear-sticker.png",
    alt: "Sleepytime bondage bear vinyl sticker by Kyle Holiday",
    priceCents: STICKER_PRICE_CENTS,
    weightOz: 0.2,
    sizes: stickerSize,
    allowsSides: false,
    allowsFont: false,
    allowsColor: false,
    allowsEngraving: false,
  },
  {
    id: "leather-babes-sticker",
    kind: "sticker",
    title: "Trans Leather Babes",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/trans-leather-babes-sticker.png",
    alt: "Trans Leather Babes vinyl sticker by Kyle Holiday",
    priceCents: STICKER_PRICE_CENTS,
    weightOz: 0.2,
    sizes: stickerSize,
    allowsSides: false,
    allowsFont: false,
    allowsColor: false,
    allowsEngraving: false,
  },
  {
    id: "rainforest-cafe-sticker",
    kind: "sticker",
    title: "Get Me Pregnant at Rainforest Cafe",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/rainforest-cafe-sticker.jpg",
    alt: "Get Me Pregnant at Rainforest Cafe vinyl sticker by Kyle Holiday",
    priceCents: STICKER_PRICE_CENTS,
    weightOz: 0.2,
    sizes: stickerSize,
    allowsSides: false,
    allowsFont: false,
    allowsColor: false,
    allowsEngraving: false,
  },
  {
    id: "phantom-sticker",
    kind: "sticker",
    title: "My Other Boyfriend Is the Phantom of the Opera",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/phantom-sticker.jpg",
    alt: "My Other Boyfriend Is the Phantom of the Opera vinyl sticker by Kyle Holiday",
    gallery: [
      "/images/art/stickers/phantom-sticker.jpg",
      "/images/art/stickers/phantom-sticker-hand.jpg",
    ],
    priceCents: STICKER_PRICE_CENTS,
    weightOz: 0.2,
    sizes: stickerSize,
    allowsSides: false,
    allowsFont: false,
    allowsColor: false,
    allowsEngraving: false,
  },
  {
    id: "anne-rice-sticker",
    kind: "sticker",
    title: "Anne Rice",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/anne-rice-sticker.jpg",
    alt: "Anne Rice vinyl sticker by Kyle Holiday",
    priceCents: STICKER_PRICE_CENTS,
    weightOz: 0.2,
    sizes: stickerSize,
    allowsSides: false,
    allowsFont: false,
    allowsColor: false,
    allowsEngraving: false,
  },
  {
    id: "leather-burger-boys-print",
    kind: "print",
    title: "Leather Burger Boys Art Print",
    caption: "Together in Leather · framed risograph",
    src: "/images/art/together-in-leather.png",
    alt: "Together in Leather risograph print in a pink acrylic frame",
    gallery: [
      "/images/art/together-in-leather.png",
      "/images/art/together-in-leather/together-in-leather-print.png",
    ],
    priceCents: 20000,
    weightOz: 16,
    sizes: printSize,
    allowsSides: false,
    allowsFont: false,
    allowsColor: false,
    allowsEngraving: false,
  },
  {
    id: "checkout-test",
    kind: "test",
    title: "Checkout Test",
    caption: "$1 — not a real product",
    src: "/logo.png",
    alt: "One dollar checkout test item",
    priceCents: 100,
    weightOz: 1,
    sizes: stickerSize,
    allowsSides: false,
    allowsFont: false,
    allowsColor: false,
    allowsEngraving: false,
  },
];

export const tagStyleRedirects: Record<string, string> = {
  "puppy-bone-old-english": "bone",
  "double-sided-bone": "bone",
  "heart-tag": "heart",
  "conversation-heart-tag": "conversation-heart",
  "bite-me": "bite-risk",
  "bite-risk-tag": "bite-risk",
  "barbed-wire-bone": "barbed-wire",
  "barbed-wire-custom": "barbed-wire",
  "chain-bone": "chain-bone",
  "toony-font-bone": "bone",
  "mystery-sticker-pack": "olive-garden-sticker",
};

export const itemWeightsOz = {
  tag: 1,
  shirt: 6,
  sticker: 0.2,
  print: 16,
  test: 1,
} as const;
export const PACKAGING_WEIGHT_OZ = 1;

export type ShippingMethodId = Fulfillment;

export type ShippingMethod = {
  id: ShippingMethodId;
  kind: "ship" | "pickup";
  label: string;
  detail?: string;
  cutoffLabel: string;
  cutoffDate: string;
};

export const shippingMethods: ShippingMethod[] = [
  {
    id: "ground",
    kind: "ship",
    label: "USPS Ground Advantage",
    cutoffLabel: "Thursday, Dec. 17",
    cutoffDate: "2026-12-17",
  },
  {
    id: "priority",
    kind: "ship",
    label: "USPS Priority Mail",
    cutoffLabel: "Friday, Dec. 18",
    cutoffDate: "2026-12-18",
  },
  {
    id: "pickup-cruise",
    kind: "pickup",
    label: "Pickup at Cruise",
    detail: "Cruise LA Holiday Market · Eagle LA",
    cutoffLabel: "Saturday, Nov. 21",
    cutoffDate: "2026-11-21",
  },
  {
    id: "pickup-akbar",
    kind: "pickup",
    label: "Pickup at Pink Pony Club",
    detail: "Akbar, Silver Lake",
    cutoffLabel: "Saturday, Dec. 6",
    cutoffDate: "2026-12-06",
  },
];

const groundAdvantageZone8Cents = [
  895, 1122, 1342, 1630, 1906, 2024, 2173, 2288, 2395, 2514, 2639,
];
const priorityMailZone8Cents = [
  1607, 1607, 1722, 2142, 2857, 3093, 3365, 3672, 3890, 4100, 4303,
];

export function getStyle(styleId: string) {
  return shopStyles.find((style) => style.id === styleId);
}

export function resolveStyleId(styleId: string | null) {
  if (!styleId) return null;
  if (styleId === "sticker" || styleId === "stickers") {
    return shopStyles.find((style) => style.kind === "sticker")?.id ?? null;
  }
  if (styleId === "print" || styleId === "prints") {
    return shopStyles.find((style) => style.kind === "print")?.id ?? null;
  }
  if (styleId === "tee" || styleId === "tees") return "shirt";
  return (
    tagStyleRedirects[styleId] ?? (getStyle(styleId) ? styleId : null)
  );
}

export function styleGallery(style: ShopStyle): ShopGalleryPhoto[] {
  const photos = [style.src, ...(style.gallery ?? [])].map((item) =>
    typeof item === "string" ? { src: item } : item,
  );
  return photos.filter(
    (photo, index, all) =>
      all.findIndex((entry) => entry.src === photo.src) === index,
  );
}

export function colorAllowsDoubleSided(colorId: string) {
  return getColor(colorId)?.allowsDoubleSided === true;
}

export function getColor(colorId: string) {
  const mapped = colorId === "volcanic" ? "volcanic-pink" : colorId;
  return shopColors.find((color) => color.id === mapped);
}

export function getEngravingFill(fillId: string) {
  return engravingFills.find((fill) => fill.id === fillId);
}

export function isValidEngravingFill(
  colorId: string,
  fillId: string | undefined,
): fillId is EngravingFillId {
  const color = getColor(colorId);
  return Boolean(
    fillId && color?.engravingFills.includes(fillId as EngravingFillId),
  );
}

export function getFont(fontId: string) {
  return shopFonts.find((font) => font.id === fontId);
}

export function getSize(style: ShopStyle, sizeId: string) {
  return style.sizes.find((size) => size.id === sizeId);
}

export function getShippingMethod(id: string | null | undefined) {
  return shippingMethods.find((method) => method.id === id);
}

export function isPickupFulfillment(id: string | null | undefined) {
  return getShippingMethod(id)?.kind === "pickup";
}

export function fulfillmentLabel(id: string | null | undefined) {
  const method = getShippingMethod(id);
  if (!method) return id ?? "";
  if (method.kind === "pickup") {
    return method.detail
      ? `${method.label} · ${method.cutoffLabel} · ${method.detail}`
      : `${method.label} · ${method.cutoffLabel}`;
  }
  return method.label;
}

export function availableFulfillmentMethods(now = new Date()) {
  return shippingMethods.filter(
    (method) =>
      method.kind === "ship" ||
      !isHolidayCutoffPassed(method.cutoffDate, now),
  );
}

export function isHolidayCutoffPassed(cutoffDate: string, now = new Date()) {
  const [year, month, day] = cutoffDate.split("-").map(Number);
  const cutoff = new Date(year, month - 1, day, 23, 59, 59, 999);
  return now > cutoff;
}

export function cartWeightOz(items: CartItem[]) {
  if (items.length === 0) return 0;
  const goods = items.reduce((sum, item) => {
    const style = getStyle(item.styleId);
    return sum + (style?.weightOz ?? itemWeightsOz.tag) * item.quantity;
  }, 0);
  return goods + PACKAGING_WEIGHT_OZ;
}

function billablePounds(weightOz: number) {
  return Math.max(1, Math.ceil(weightOz / 16));
}

function rateFromTable(table: number[], pounds: number) {
  const index = Math.min(pounds, table.length - 1);
  return table[index];
}

export function shippingCentsFor(items: CartItem[], method: ShippingMethodId) {
  if (isPickupFulfillment(method)) return 0;

  const weightOz = cartWeightOz(items);
  if (weightOz <= 0) return 0;

  if (method === "ground") {
    if (weightOz <= 15) return groundAdvantageZone8Cents[0];
    return rateFromTable(groundAdvantageZone8Cents, billablePounds(weightOz));
  }

  return rateFromTable(priorityMailZone8Cents, billablePounds(weightOz));
}

export function formatWeight(weightOz: number) {
  if (weightOz < 16) return `${weightOz} oz`;
  const pounds = weightOz / 16;
  return Number.isInteger(pounds) ? `${pounds} lb` : `${pounds.toFixed(1)} lb`;
}

export function formatUsd(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function sanitizeEngraving(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, MAX_ENGRAVING_LENGTH);
}

export function styleStartingPrice(style: ShopStyle) {
  const sized = style.sizes
    .map((size) => size.priceCents)
    .filter((price): price is number => typeof price === "number");
  return sized.length > 0 ? Math.min(...sized) : style.priceCents;
}

export function stylePriceLabel(style: ShopStyle) {
  const prices = new Set(
    style.sizes.map((size) => size.priceCents ?? style.priceCents),
  );
  const start = styleStartingPrice(style);
  return prices.size > 1 ? `from ${formatUsd(start)}` : formatUsd(start);
}

export function itemUnitPrice(
  item: Pick<CartItem, "styleId" | "sizeId" | "sides">,
) {
  const style = getStyle(item.styleId);
  if (!style) {
    throw new Error("Unknown product");
  }
  const size = item.sizeId ? getSize(style, item.sizeId) : undefined;
  const base = size?.priceCents ?? style.priceCents;
  const extra =
    style.allowsSides && item.sides === 2 ? DOUBLE_SIDED_UPCHARGE_CENTS : 0;
  return base + extra;
}

export function isStickerCartItem(item: Pick<CartItem, "styleId">) {
  return getStyle(item.styleId)?.kind === "sticker";
}

export function stickerCartQuantity(items: CartItem[]) {
  return items.reduce(
    (sum, item) => sum + (isStickerCartItem(item) ? item.quantity : 0),
    0,
  );
}

export function stickerDealSavingsCents(items: CartItem[]) {
  const groups = Math.floor(stickerCartQuantity(items) / STICKER_DEAL_COUNT);
  const offPerGroup =
    STICKER_PRICE_CENTS * STICKER_DEAL_COUNT - STICKER_DEAL_CENTS;
  return groups * offPerGroup;
}

export function stickersUntilDeal(items: CartItem[]) {
  const leftover = stickerCartQuantity(items) % STICKER_DEAL_COUNT;
  return leftover === 0 ? 0 : STICKER_DEAL_COUNT - leftover;
}

export function cartSubtotalCents(items: CartItem[]) {
  const raw = items.reduce(
    (sum, item) => sum + itemUnitPrice(item) * item.quantity,
    0,
  );
  return raw - stickerDealSavingsCents(items);
}

export function cartShippingCents(items: CartItem[], fulfillment: Fulfillment) {
  if (items.length === 0) return 0;
  return shippingCentsFor(items, fulfillment);
}

export function cartTotalCents(items: CartItem[], fulfillment: Fulfillment) {
  return cartSubtotalCents(items) + cartShippingCents(items, fulfillment);
}

export function cartQuantity(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function itemSummary(item: CartItem) {
  const style = getStyle(item.styleId);
  if (!style) return "";
  const size = getSize(style, item.sizeId);
  const parts =
    style.kind === "sticker" || style.kind === "print" ? [] : [size?.name];
  if (style.allowsColor && item.colorId) {
    parts.push(getColor(item.colorId)?.name);
  }
  if (style.allowsEngraving && item.engravingColorId) {
    const fill = getEngravingFill(item.engravingColorId)?.name;
    if (fill) parts.push(`${fill} engraving`);
  }
  if (style.allowsFont && item.fontId) {
    const frontFont = getFont(item.fontId)?.name;
    const backFont =
      item.sides === 2 && item.backFontId
        ? getFont(item.backFontId)?.name
        : undefined;
    if (backFont && backFont !== frontFont) {
      parts.push(`${frontFont} / ${backFont}`);
    } else {
      parts.push(frontFont);
    }
  }
  if (style.allowsSides) {
    parts.push(item.sides === 2 ? "Two sides" : "One side");
  }
  if (item.engraving) {
    parts.push(item.engraving);
  }
  if (item.backEngraving) {
    parts.push(item.backEngraving);
  }
  return parts.filter(Boolean).join(" · ");
}
