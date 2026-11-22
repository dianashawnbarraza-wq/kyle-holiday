import { Link } from "react-router-dom";
import { site } from "../data/site";
import "./PromoBanner.css";

/** True while the promo is still valid through the end of `endsOn` in LA. */
export function isPromoActive(now = new Date()) {
  const { endsOn } = site.promo;
  // Compare calendar dates in America/Los_Angeles so "through Dec 1" is inclusive.
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const today = formatter.format(now); // YYYY-MM-DD
  return today <= endsOn;
}

export function PromoBanner() {
  if (!isPromoActive()) return null;

  const { href, code } = site.promo;

  return (
    <div className="promo-banner" role="status">
      <Link to={href} className="promo-banner__link">
        <span className="promo-banner__text">
          Save 15% with code{" "}
          <span className="promo-banner__code">{code}</span> through Dec 1
        </span>
        <span className="promo-banner__cta" aria-hidden="true">
          Shop →
        </span>
      </Link>
    </div>
  );
}
