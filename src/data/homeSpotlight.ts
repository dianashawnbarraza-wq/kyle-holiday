export type HomeSpotlightSlide = {
  id: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  shopUrl: string;
  ctaLabel: string;
};

export const homeSpotlightSlides: HomeSpotlightSlide[] = [
  {
    id: "title-tshirt",
    headline: "Title t-shirt celebrating trans joy in leather",
    description:
      "Trans Leather Babes drawn by Kyle and printed on super soft tees. Four color screenprint for lovers of leather and queer burger babes.",
    image: "/images/title-tshirt.png",
    imageAlt: "Black t-shirt with Trans Leather Babes glitter screen print",
    shopUrl:
      "https://www.etsy.com/listing/4490224009/trans-leather-babes-screen-printed-t",
    ctaLabel: "Shop the Tee on Etsy",
  },
  {
    id: "barbed-wire-bone",
    headline: "Barbed Wire Bone Dog Tag",
    description:
      "Personalized puppy play collar tags in bone shape with a barbed wire border. Pick your color, text, and font — laser cut and hand finished in LA.",
    image: "/images/tags/etsy/barbed-wire-bone.jpg",
    imageAlt: "Personalized barbed wire puppy pet play collar tag in bone shape",
    shopUrl:
      "https://www.etsy.com/listing/1836159961/personalized-puppy-play-collar-tag",
    ctaLabel: "Order on Etsy",
  },
  {
    id: "praise-coming-sticker",
    headline: "Keep the Praise Coming",
    description:
      "Holographic vinyl sticker for your water bottle, laptop, or gear bag. A little sparkle for the praise pigs in your life.",
    image: "/images/art/stickers/praise-coming-sticker.png",
    imageAlt: "Keep the Praise Coming holographic vinyl sticker by Kyle Holiday",
    shopUrl:
      "https://www.etsy.com/listing/4516456000/keep-the-praise-coming-holographic-vinyl",
    ctaLabel: "Shop on Etsy",
  },
];
