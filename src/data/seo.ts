import { site } from "./site";
import { shopStyles } from "./shop";
import { tagFaq } from "./tags";

export const siteUrl = "https://www.kyleholiday.com";

export const defaultOgImage = `${siteUrl}/images/hero.png`;

export const seoKeywords = [
  "Kyle Holiday",
  "pet play",
  "pet play tags",
  "puppy play",
  "puppy play tags",
  "puppy play collar tag",
  "pet ID tags",
  "custom pet tag",
  "custom engraved tag",
  "personalized pup tag",
  "furries",
  "furry pet tag",
  "Mx Leather",
  "Mx. Leather",
  "Mx. Cruise LA Leather",
  "Mx Leather titleholder",
  "leather titleholder",
  "leather community",
  "queer leather",
  "kink",
  "BDSM",
  "BDSM community",
  "fetish",
  "Cruise LA",
  "Eagle LA",
  "queer leather Los Angeles",
  "trans leather artist",
  "custom leather gear",
  "leather collars",
  "leather harness",
  "RIVET leather",
  "pet play accessories",
  "laser cut pet tags",
  "Los Angeles leatherworker",
  "Los Angeles BDSM",
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
    title: `${site.name} — Leather, Pet Play, Puppy Play & Kink | ${site.title}`,
    description:
      "Kyle Holiday is Mx. Cruise LA Leather 2026 — a trans leather titleholder making custom pet play tags, puppy play collar tags, leather gear, and kink art in Los Angeles. Leather, BDSM, and puppy play community in LA.",
    path: "/",
    keywords: sharedKeywords,
  },
  "/shop": {
    title:
      "Shop Pet Play Tags, Puppy Play & Boot Lace Locks | Kyle Holiday",
    description:
      "Santa Kyle's Workshop: custom pet play tags, puppy play collar tags, engraved boot lace locks, leather-scene tees, and stickers. Handmade in Los Angeles for the leather, kink, and BDSM community.",
    path: "/shop",
    keywords: [
      "Kyle Holiday shop",
      "pet play tags",
      "puppy play tags",
      "boot lace locks",
      "custom leatherwork",
      "BDSM shop Los Angeles",
      "kink shop",
      ...sharedKeywords,
    ],
  },
  "/shop/thanks": {
    title: "Thank you for your order | Kyle Holiday",
    description:
      "Your Kyle Holiday order is in. You'll get a Stripe receipt, then shipping details from Kyle.",
    path: "/shop/thanks",
  },
  "/orders": {
    title: "Order queue | Kyle Holiday",
    description: "Private order queue for Kyle Holiday shop fulfillments.",
    path: "/orders",
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
    title: "Custom Leather, Kink & BDSM Gear Los Angeles | Kyle Holiday",
    description:
      "Custom leather collars, harnesses, puppy play gear, and BDSM pieces made to order in Los Angeles by Kyle Holiday — Mx. Leather titleholder, Mx. Cruise LA Leather 2026.",
    path: "/leatherwork",
    keywords: [
      "custom leather gear",
      "BDSM leather",
      "kink leather gear",
      "puppy collar",
      "leather harness Los Angeles",
      "queer leatherworker",
      "Mx Leather",
      ...sharedKeywords,
    ],
  },
  "/art": {
    title: "Queer Leather, Kink & BDSM Art | Kyle Holiday",
    description:
      "Risograph prints, stickers, and screenprinted tees by Kyle Holiday — queer, trans, leather, kink, and BDSM art from Los Angeles.",
    path: "/art",
    keywords: [
      "queer leather art",
      "trans artist Los Angeles",
      "kink art prints",
      ...sharedKeywords,
    ],
  },
  "/events": {
    title: "Leather, Kink & BDSM Events | Kyle Holiday",
    description:
      "Find Kyle Holiday — Mx. Cruise LA Leather 2026 — at leather, kink, BDSM, and puppy play events, Cruise LA at Eagle LA, and RIVET nights across Los Angeles.",
    path: "/events",
    keywords: [
      "Kyle Holiday events",
      "leather events Los Angeles",
      "BDSM events LA",
      "kink events Los Angeles",
      "Cruise LA",
      "Eagle LA",
      "RIVET leather",
      ...sharedKeywords,
    ],
  },
  "/contact": {
    title: "Contact Kyle Holiday | Leather, Pet Play & Custom Orders",
    description:
      "Email Kyle Holiday for custom pet play tags, puppy play tags, leather gear, and event bookings. Mx. Cruise LA Leather 2026 hosts Cruise LA every 3rd Saturday at Eagle LA.",
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

const pathAliases: Record<string, string> = {
  "/leather": "/leatherwork",
};

export function getPageSeo(pathname: string): PageSeoConfig {
  return pageSeo[pathAliases[pathname] ?? pathname] ?? pageSeo["/"];
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
    "leather",
    "kink",
    "BDSM",
    "pet play",
    "puppy play",
    "Mx Leather",
    "pet play tags",
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
    "Queer leather, kink, and BDSM party hosted by Kyle Holiday — Mx. Cruise LA Leather 2026. Every 3rd Saturday of the month at Eagle LA.",
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

const shopCatalogJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Santa Kyle's Workshop",
  description:
    "Custom pet play tags, puppy play collar tags, boot lace locks, leather-scene tees, and stickers handmade in Los Angeles.",
  url: `${siteUrl}/shop`,
  itemListElement: shopStyles
    .filter((style) => style.kind !== "test")
    .map((style, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: style.title,
        description: style.description || style.caption,
        image: `${siteUrl}${style.src}`,
        url: `${siteUrl}/shop?style=${style.id}`,
        brand: {
          "@type": "Brand",
          name: site.name,
        },
        category:
          style.kind === "tag"
            ? "Pet Play Tags"
            : style.kind === "lace-lock"
              ? "Boot Lace Locks"
              : style.kind === "shirt"
                ? "T-Shirts"
                : style.kind === "print"
                  ? "Art Prints"
                  : "Stickers",
      },
    })),
};

export function getJsonLdForPath(pathname: string): Record<string, unknown>[] {
  const path = pathAliases[pathname] ?? pathname;
  const graphs: Record<string, unknown>[] = [websiteJsonLd, personJsonLd];

  if (path === "/about") {
    graphs.push(organizationJsonLd);
  }

  if (
    path === "/" ||
    path === "/contact" ||
    path === "/about" ||
    path === "/events"
  ) {
    graphs.push(cruiseLaEventJsonLd);
  }

  if (path === "/leatherwork") {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      name: "Custom leather and BDSM gear",
      description:
        "Made-to-order leather collars, harnesses, puppy play gear, and kink pieces by Kyle Holiday in Los Angeles.",
      url: `${siteUrl}/leatherwork`,
    });
  }

  if (path === "/shop") {
    graphs.push(shopCatalogJsonLd);
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
