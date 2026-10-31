export type HomeOffering = {
  id: string;
  label: string;
  to: string;
  image: string;
  imageAlt: string;
};

export const homeOfferings: HomeOffering[] = [
  {
    id: "shirt",
    label: "Shirts",
    to: "/art#t-shirts",
    image: "/images/title-tshirt.png",
    imageAlt: "Trans Leather Babes screen-printed t-shirt by Kyle Holiday",
  },
  {
    id: "tags",
    label: "Play tags",
    to: "/shop#pet-play-tags",
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
