import type { GalleryImage } from "./gallery";

export type KyleGalleryImage = GalleryImage;

export const kyleGallerySection = {
  title: "My Title Year",
  subtitle: "Some pics from my title year.",
} as const;

export const kyleGallery: KyleGalleryImage[] = [
  {
    id: "self-portrait",
    src: "/images/kyle-gallery/self-portrait.png",
    alt: "Kyle Holiday self portrait outdoors in leather cross-body harness",
    caption: "Self portrait",
  },
  {
    id: "title-vest",
    src: "/images/kyle-gallery/title-vest.png",
    alt: "Kyle Holiday wearing Mx. Cruise LA Leather 2026 title vest and cap",
    caption: "Photo by A Klass",
  },
  {
    id: "cruise-la-cheer",
    src: "/images/kyle-gallery/cruise-la-cheer.png",
    alt: "Kyle Holiday cheering in leather harness in front of Cruise LA banner",
    caption: "Photo by Amina Cruz",
  },
  {
    id: "leather-portrait",
    src: "/images/kyle-gallery/leather-portrait.png",
    alt: "Kyle Holiday in leather gear at a club bathroom",
    caption: "Photo by A Klass",
  },
  {
    id: "tof-house",
    src: "/images/kyle-gallery/tof-house.png",
    alt: "Kyle Holiday in leather harness at Tom of Finland house",
    caption: "Photo by Onur Hastürk",
  },
  {
    id: "mirror-mirror",
    src: "/images/kyle-gallery/mirror-mirror.png",
    alt: "Art portrait of Kyle Holiday — Mirror, Mirror by sweatmother",
    caption: "Mirror, Mirror — sweatmother 2025",
  },
];
