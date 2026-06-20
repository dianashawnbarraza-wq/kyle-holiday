export const site = {
  name: "Kyle Holiday",
  logo: "/logo.png",
  tagline: "Leather · Play · Art",
  pronouns: "he/they",
  title: "Mx. Cruise LA Leather 2026",
  heroIntro: "Making play personal.",
  email: "mxcruiselaleather2026@gmail.com",
  instagram: "https://instagram.com/thekyleholiday",
  instagramHandle: "@thekyleholiday",
  etsy: "https://www.etsy.com/shop/KyleHoliday",
  stockroom: {
    url: "https://stockroom.com",
    bannerText: "Shop in person at The Stockroom in Los Angeles",
    name: "The Stockroom",
  },
  about: [
    `Kyle Holiday (he/they, Mx. Cruise LA Leather 2026) is a Mexican-American artist, leather worker, and kinkster residing and born in Los Angeles. His work celebrates trans identity, kink, and play through art and custom gear.`,
    `Passionate about art, education, and accessibility in leather, they are eager to share their craft and to help others embrace their own leather journey. Kyle currently co-hosts an educational series called RIVET, helping the queer community grow their skills and knowledge of leather.`,
    `Find them at Cruise LA every 3rd Saturday of the month at Eagle LA.`,
  ],
  cruiseLA: {
    name: "Cruise LA",
    schedule: "Every 3rd Saturday of the month",
    venue: "Eagle LA",
  },
} as const;

export const navLinks = [
  { to: "/#events", label: "Events" },
  { to: "/pet-play-tags", label: "Pet Play Tags" },
  { to: "/art", label: "Art" },
  { to: "/leatherwork", label: "Leatherwork" },
  { to: "/contact", label: "Contact" },
] as const;
