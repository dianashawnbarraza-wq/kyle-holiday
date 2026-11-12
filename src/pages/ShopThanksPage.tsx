import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CTAButton } from "../components/CTAButton";
import { PageHero } from "../components/PageHero";
import { site } from "../data/site";
import "./ShopPage.css";

const CART_KEY = "kyle-holiday-bag-v4";

export function ShopThanksPage() {
  useEffect(() => {
    localStorage.removeItem(CART_KEY);
  }, []);

  return (
    <div className="shop-page">
      <PageHero
        title="Thank you"
        tagline="I got your order. You'll get a receipt from Stripe, and I'll follow up when it's made."
        image="/images/tags/diet-coke-doll-hero.jpg"
        imageAlt="Red heart pet play tag engraved Diet Coke Dollop on a Kyle Holiday backing card"
        imagePosition="center 28%"
        links={[
          { label: "Order another", href: "/shop" },
          { label: "Back home", href: "/" },
        ]}
      />
      <div className="page page--after-hero">
        <div className="page-inner">
          <section className="section shop-follow">
            <p className="shop-thanks">
              I’ll send tracking when it ships. Questions:{" "}
              <Link to="/contact">say hi</Link>.
            </p>

            <div className="shop-follow__card">
              <a
                className="shop-follow__qr-link"
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/shop/instagram-qr.svg"
                  alt={`QR code to ${site.instagramHandle} on Instagram`}
                  className="shop-follow__qr"
                />
              </a>
              <div className="shop-follow__copy">
                <p className="shop-follow__kicker">Stay close</p>
                <h2 className="shop-follow__title">Follow me on Instagram</h2>
                <p className="shop-follow__text">
                  Scan the code or tap through to {site.instagramHandle}. I post
                  making-of, new tags, and shipping updates there.
                </p>
                <CTAButton href={site.instagram}>
                  Follow {site.instagramHandle}
                </CTAButton>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
