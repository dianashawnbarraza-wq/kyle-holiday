export type HomeOffering = {
  id: string;
  label: string;
  to: string;
  image: string;
  imageAlt: string;
};

export const homeOfferings: HomeOffering[] = [
  {
    id: "shop",
    label: "Shop",
    to: "/shop",
    image: "/images/tags/hall-of-fame/brat-collar.png",
    imageAlt: "Red bone tag engraved with brat on a black studded leather collar",
  },
  {
    id: "art",
    label: "Art",
    to: "/art",
    image: "/images/art/together-in-leather.png",
    imageAlt: "Together in Leather risograph print by Kyle Holiday",
  },
  {
    id: "leather",
    label: "Leather",
    to: "/leatherwork",
    image: "/images/leather/femme-harness.jpeg",
    imageAlt: "Black leather femme harness",
  },
];
