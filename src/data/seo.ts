import { site } from "./site";
import { tagFaq, tagGallery } from "./tags";

export const siteUrl = "https://www.kyleholiday.com";

export const defaultOgImage = `${siteUrl}/images/hero.png`;

export const seoKeywords = [
  "Kyle Holiday",
  "pet play tags",
  "pet ID tags",
  "puppy play tag",
  "puppy play collar tag",
  "custom pet tag",
  "custom engraved tag",
  "personalized pup tag",
  "furries",
  "furry pet tag",
  "Mx. Cruise LA Leather",
  "Mx. leather title",
  "leather titleholder",
  "Cruise LA",
  "Eagle LA",
  "queer leather Los Angeles",
  "trans leather artist",
  "custom leather gear",
  "RIVET leather",
  "pet play accessories",
  "laser cut pet tags",
  "Los Angeles leatherworker",
] as const;

export type PageSeoConfig = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const sharedKeywords = seoKeywords;

export const pageSeo: Record<string, PageSeoConfig> = {
  "/": {
    title: `${site.name} — Pet Play Tags, Leather & Art | ${site.title}`,
    description:
      "Kyle Holiday (Mx. Cruise LA Leather 2026) makes custom pet play tags, puppy play collar tags, pet ID tags, leather gear, and queer art in Los Angeles. Host of Cruise LA at Eagle LA.",
    path: "/",
    keywords: sharedKeywords,
  },
  "/pet-play-tags": {
    title: "Custom Pet Play Tags & Puppy Play ID Tags | Kyle Holiday",
    description:
      "Shop personalized pet play tags, puppy play collar tags, and custom engraved pet ID tags handmade in Los Angeles. Bone, heart, and drop shapes — 16 colors, glow, and blacklight options.",
    path: "/pet-play-tags",
    keywords: [
      "pet play tags",
      "pet ID tags",
      "puppy play tag",
      "puppy play collar tag",
      "custom pet tag",
      "custom engraved tag",
      "personalized pup tag",
      "furries",
      "furry pet tag",
      "laser cut pet tags",
      "Los Angeles pet play",
      "Kyle Holiday Etsy",
      ...sharedKeywords,
    ],
  },
  "/about": {
    title: `About Kyle Holiday | ${site.title} Titleholder`,
    description:
      "Meet Kyle Holiday — Mexican-American trans leather titleholder, artist, and co-host of RIVET. Mx. Cruise LA Leather 2026 shares art, education, and custom gear in Los Angeles.",
    path: "/about",
    keywords: [
      "Mx. Cruise LA Leather",
      "Mx. leather title",
      "leather titleholder",
      "trans leather artist",
      "Cruise LA",
      "RIVET leather",
      ...sharedKeywords,
    ],
  },
  "/leatherwork": {
    title: "Custom Leather Gear Los Angeles | Kyle Holiday",
    description:
      "Custom leather collars, harnesses, cuffs, and pup gear made to order in Los Angeles by Kyle Holiday — Mx. Cruise LA Leather 2026.",
    path: "/leatherwork",
    keywords: [
      "custom leather gear",
      "puppy collar",
      "leather harness Los Angeles",
      "queer leatherworker",
      ...sharedKeywords,
    ],
  },
  "/art": {
    title: "Queer Leather Art, Prints & Stickers | Kyle Holiday",
    description:
      "Risograph prints, stickers, and screenprinted tees by Kyle Holiday — queer, trans, and kink-forward art from Los Angeles.",
    path: "/art",
    keywords: [
      "queer leather art",
      "trans artist Los Angeles",
      "kink art prints",
      ...sharedKeywords,
    ],
  },
  "/contact": {
    title: "Contact Kyle Holiday | Cruise LA & Custom Orders",
    description:
      "Email Kyle Holiday for custom pet play tags, leather quotes, and event bookings. Find Cruise LA every 3rd Saturday at Eagle LA, 4–9pm.",
    path: "/contact",
    keywords: [
      "Cruise LA",
      "Eagle LA",
      "contact Kyle Holiday",
      "custom tag order",
      ...sharedKeywords,
    ],
  },
};

export function getPageSeo(pathname: string): PageSeoConfig {
  return pageSeo[pathname] ?? pageSeo["/"];
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: siteUrl,
  image: `${siteUrl}${site.logo}`,
  jobTitle: site.title,
  pronouns: site.pronouns,
  email: site.email,
  sameAs: [site.instagram, site.etsy],
  knowsAbout: [
    "pet play tags",
    "puppy play",
    "custom leatherwork",
    "queer leather community",
    "Cruise LA",
  ],
  homeLocation: {
    "@type": "Place",
    name: "Los Angeles, California",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: siteUrl,
  description: pageSeo["/"].description,
  inLanguage: "en-US",
  author: {
    "@type": "Person",
    name: site.name,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: personJsonLd,
  url: `${siteUrl}/about`,
};

const cruiseLaEventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: site.cruiseLA.name,
  description:
    "Queer leather party hosted by Kyle Holiday — Mx. Cruise LA Leather 2026. Every 3rd Saturday of the month at Eagle LA.",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: site.cruiseLA.venue,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Person",
    name: site.name,
    url: siteUrl,
  },
};

const petTagsItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kyle Holiday Pet Play Tags",
  description:
    "Custom pet play tags, puppy play collar tags, and personalized pet ID tags available on Etsy.",
  itemListElement: tagGallery.map((tag, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: tag.title,
      description: tag.caption,
      image: `${siteUrl}${tag.src}`,
      url: tag.shopUrl,
      brand: {
        "@type": "Brand",
        name: site.name,
      },
      category: "Pet Play Tags",
    },
  })),
};

export function getJsonLdForPath(pathname: string): Record<string, unknown>[] {
  const graphs: Record<string, unknown>[] = [websiteJsonLd, personJsonLd];

  if (pathname === "/about") {
    graphs.push(organizationJsonLd);
  }

  if (pathname === "/" || pathname === "/contact" || pathname === "/about") {
    graphs.push(cruiseLaEventJsonLd);
  }

  if (pathname === "/pet-play-tags") {
    graphs.push(petTagsItemListJsonLd);
    graphs.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tagFaq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return graphs;
}
