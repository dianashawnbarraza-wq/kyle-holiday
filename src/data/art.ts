import type { GalleryImage } from "./gallery";

export type ArtPiece = {
  id: string;
  title: string;
  caption: string;
  src?: string;
  alt: string;
  series?: string;
  shopUrl?: string;
};

export const artSubNav = [
  { id: "prints", label: "Prints", href: "#prints" },
  { id: "stickers", label: "Stickers", href: "#stickers" },
  { id: "t-shirts", label: "T-Shirts", href: "#t-shirts" },
] as const;

export type FeaturedInstallation = {
  id: string;
  title: string;
  dates: string;
  description: string;
  venue: string;
  image: string;
  imageAlt: string;
  gallery?: GalleryImage[];
};

export const togetherInLeatherGallery: GalleryImage[] = [
  {
    id: "ride-lick",
    src: "/images/art/together-in-leather/ride-lick.png",
    alt: "Black leather boots with Ride and Lick lace tags",
    caption: "Ride / Lick",
  },
  {
    id: "kat",
    src: "/images/art/together-in-leather/kat.png",
    alt: "Person in black leather outfit standing in a field of purple flowers",
    caption: "Kat",
  },
  {
    id: "kyle",
    src: "/images/art/together-in-leather/kyle.png",
    alt: "Kyle Holiday in a leather vest looking out over a field",
    caption: "Kyle Holiday",
  },
  {
    id: "try-it-and-find-out",
    src: "/images/art/together-in-leather/try-it-and-find-out.png",
    alt: "Try it and find out bear sticker on chainmail",
    caption: "Try It and Find Out",
  },
  {
    id: "together-in-leather-print",
    src: "/images/art/together-in-leather/together-in-leather-print.png",
    alt: "Together in Leather risograph print illustration",
    caption: "Together in Leather",
  },
];

export const togetherInLeatherFeatured: FeaturedInstallation = {
  id: "together-in-leather",
  title: "Together in Leather",
  dates: "March 1st, 2026 to present at Folklore",
  description: `Together in Leather — a risograph print celebrating queer leather joy, custom framed and on view at Folklore Salon & Barber in Los Angeles.`,
  venue: "Folklore Salon & Barber, Los Angeles",
  image: "/images/art/together-in-leather.png",
  imageAlt:
    "Together in Leather risograph print in a pink acrylic frame at Folklore Salon and Barber",
  gallery: togetherInLeatherGallery,
};

export const monster4MonsterGallery: GalleryImage[] = [
  {
    id: "spank",
    src: "/images/art/spank.jpg",
    alt: "Mothboys Spank Cryptid art Risograph Print by Kyle Holiday",
    caption: "Spank",
  },
  {
    id: "mothboy",
    src: "/images/art/mothboy.jpeg",
    alt: "Mothboy risograph print by Kyle Holiday",
    caption: "Mothboy",
  },
  {
    id: "blood-lust",
    src: "/images/art/blood-lust.jpeg",
    alt: "Blood Lust risograph print by Kyle Holiday",
    caption: "Blood Lust",
  },
  {
    id: "unpleasant-dreams",
    src: "/images/art/unpleasant-dreams.jpeg",
    alt: "Kyle Holiday Risograph Print Unpleasant Dreams",
    caption: "Unpleasant Dreams",
  },
];

export const monster4MonsterFeatured: FeaturedInstallation = {
  id: "monster4monster",
  title: "Monster4Monster",
  dates: "10/1/24 – 12/31/24 at Folklore",
  description: `Kinky cryptids! Beasts in bondage! Queers in horror! This print series by Kyle Holiday is more than the creatures under and in your bed. It's the yearning for something dark inside. The hairs on our chin and our baying at the moon. To feel like a horror to some, but an angel to others.`,
  venue: "Folklore Salon & Barber, Los Angeles",
  image: "/images/art/damned.jpg",
  imageAlt: "Damned — Vampire risograph print by Kyle Holiday",
  gallery: monster4MonsterGallery,
};

export const featuredInstallations: FeaturedInstallation[] = [
  togetherInLeatherFeatured,
  monster4MonsterFeatured,
];

export const artPrints: ArtPiece[] = [
  {
    id: "great-butts-of-la",
    title: "Great Butts of LA",
    caption: "Risograph print",
    src: "/images/art/great-butts-of-la.png",
    alt: "Great Butts of LA risograph print by Kyle Holiday",
  },
  {
    id: "olive-garden",
    title: "My Pussy Tastes Like Olive Garden",
    caption: "Risograph print",
    src: "/images/art/olive-garden.jpg",
    alt: "My Pussy Tastes Like Olive Garden — Kyle Holiday Riso Print",
  },
];

export const artStickers: ArtPiece[] = [
  {
    id: "olive-garden-sticker",
    title: "My Pussy Tastes Like Olive Garden",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/olive-garden-sticker.jpg",
    alt: "My Pussy Tastes Like Olive Garden vinyl sticker by Kyle Holiday",
    shopUrl:
      "https://www.etsy.com/listing/1710361868/my-pussy-tastes-like-olive-garden-vinyl",
  },
  {
    id: "shadowbanned-sticker",
    title: "All My Friends Are Shadowbanned",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/shadowbanned-sticker.png",
    alt: "All my friends are shadowbanned vinyl sticker by Kyle Holiday",
    shopUrl:
      "https://www.etsy.com/listing/1835654186/all-my-friends-are-shadowbanned-vinyl",
  },
  {
    id: "praise-coming-sticker",
    title: "Keep the Praise Coming",
    caption: "Holographic vinyl sticker",
    src: "/images/art/stickers/praise-coming-sticker.png",
    alt: "Keep the Praise Coming holographic vinyl sticker by Kyle Holiday",
    shopUrl:
      "https://www.etsy.com/listing/4516456000/keep-the-praise-coming-holographic-vinyl",
  },
  {
    id: "sleepytime-bear-sticker",
    title: "Sleepytime Bondage Bear",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/sleepytime-bear-sticker.png",
    alt: "Sleepytime bondage bear vinyl sticker by Kyle Holiday",
    shopUrl:
      "https://www.etsy.com/listing/1724542479/sleepytime-bondage-bear-vinyl-sticker",
  },
  {
    id: "leather-babes-sticker",
    title: "Trans Leather Babes",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/trans-leather-babes-sticker.png",
    alt: "Trans Leather Babes vinyl sticker by Kyle Holiday",
    shopUrl:
      "https://www.etsy.com/listing/1718361144/leather-big-boys-t4t-vinyl-sticker",
  },
  {
    id: "rainforest-cafe-sticker",
    title: "Get Me Pregnant at Rainforest Cafe",
    caption: "Vinyl sticker",
    src: "/images/art/stickers/rainforest-cafe-sticker.jpg",
    alt: "Get Me Pregnant at Rainforest Cafe vinyl sticker by Kyle Holiday",
    shopUrl:
      "https://www.etsy.com/listing/1766984835/get-me-pregnant-at-rainforest-cafe-vinyl",
  },
];

export const artTshirts: ArtPiece[] = [
  {
    id: "trans-leather-babes-tee",
    title: "Trans Leather Babes",
    caption: "Four-color screenprint on super soft tees",
    src: "/images/title-tshirt.png",
    alt: "Black t-shirt with Trans Leather Babes glitter screen print",
    shopUrl:
      "https://www.etsy.com/listing/4490224009/trans-leather-babes-screen-printed-t",
  },
];
