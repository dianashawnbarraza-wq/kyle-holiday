export type LeatherCategory = {
  id: string;
  title: string;
  src: string;
  alt: string;
};

export const leatherIntro = `I'm excited to offer custom leather gear that's durable for play and perfect to wear out. My interest in leather working began as pieces "off the shelf" never fit me and more masculine pieces were definitely not made for me. I make gear for all bodies (masc and femme) and I strive to be budget friendly, offering the best in return.`;

export const leatherDetails = `Black leather with your choice of black, chrome, and gold hardware. I will have gear pieces at events, but I make harnesses and belts to order.`;

export const leatherCategories: LeatherCategory[] = [
  {
    id: "puppy-collar",
    title: "Puppy Collar",
    src: "/images/leather/puppy-collar.jpeg",
    alt: "Black leather puppy collar with hardware",
  },
  {
    id: "collar-leash",
    title: "Collar and Leash",
    src: "/images/leather/collar-leash.jpeg",
    alt: "Leather collar and leash with gold hardware",
  },
  {
    id: "suspenders",
    title: "Dropback Suspenders",
    src: "/images/leather/dropback-suspenders.png",
    alt: "Black leather dropback suspenders with silver hardware",
  },
  {
    id: "martingale",
    title: "Martingale",
    src: "/images/leather/martingale.jpeg",
    alt: "Black leather martingale collar",
  },
  {
    id: "thigh-strap",
    title: "Thigh Strap",
    src: "/images/leather/thigh-strap.jpeg",
    alt: "Black leather thigh strap harness",
  },
  {
    id: "femme-harness",
    title: "Femme Harness",
    src: "/images/leather/femme-harness.jpeg",
    alt: "Black leather femme harness",
  },
  {
    id: "cross-body-harness",
    title: "Cross Body Harness",
    src: "/images/leather/cross-body-harness.png",
    alt: "Black leather cross body harness with silver hardware at Tom of Finland house",
  },
  {
    id: "locking-cuffs",
    title: "Locking Cuffs",
    src: "/images/leather/locking-cuffs.jpeg",
    alt: "Black leather locking cuffs",
  },
  {
    id: "choke-collar",
    title: "Choke Collar",
    src: "/images/leather/choke-collar.jpg",
    alt: "Pull-out choke collar with custom tag",
  },
];

export const hardwareOptions = ["Black hardware", "Chrome hardware", "Gold hardware"];
