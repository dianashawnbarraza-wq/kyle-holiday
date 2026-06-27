import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  defaultOgImage,
  getJsonLdForPath,
  getPageSeo,
  siteUrl,
} from "../data/seo";

const JSON_LD_ID = "site-json-ld";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`,
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function upsertJsonLd(data: Record<string, unknown>[]) {
  let element = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.id = JSON_LD_ID;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": data,
  });
}

export function PageSEO() {
  const { pathname } = useLocation();
  const seo = getPageSeo(pathname);
  const canonicalUrl = `${siteUrl}${seo.path === "/" ? "" : seo.path}`;
  const ogImage = seo.ogImage ?? defaultOgImage;
  const keywords = (seo.keywords ?? []).join(", ");

  useEffect(() => {
    document.title = seo.title;

    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "keywords", keywords);
    upsertMeta("name", "author", "Kyle Holiday");
    upsertMeta("name", "robots", "index, follow, max-image-preview:large");

    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:site_name", "Kyle Holiday");
    upsertMeta("property", "og:locale", "en_US");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", ogImage);

    upsertLink("canonical", canonicalUrl);
    upsertJsonLd(getJsonLdForPath(pathname));
  }, [canonicalUrl, keywords, ogImage, pathname, seo.description, seo.title]);

  return null;
}
