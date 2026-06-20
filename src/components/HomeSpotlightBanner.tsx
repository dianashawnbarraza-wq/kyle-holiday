import { useCallback, useEffect, useState } from "react";
import type { HomeSpotlightSlide } from "../data/homeSpotlight";
import { CTAButton } from "./CTAButton";
import "./HomeSpotlightBanner.css";

const ROTATE_MS = 6000;

type HomeSpotlightBannerProps = {
  slides: HomeSpotlightSlide[];
};

export function HomeSpotlightBanner({ slides }: HomeSpotlightBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || slides.length <= 1) return;

    const timer = window.setInterval(goNext, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [goNext, slides.length]);

  if (!slide) return null;

  return (
    <section
      className="home-spotlight"
      aria-labelledby="home-spotlight-heading"
      aria-roledescription="carousel"
    >
      <div className="home-spotlight__inner">
        <div className="home-spotlight__image-panel">
          {slides.map((item, index) => (
            <a
              key={item.id}
              href={item.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`home-spotlight__image-link${
                index === activeIndex ? " is-active" : ""
              }`}
              aria-hidden={index !== activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                className="home-spotlight__image"
              />
            </a>
          ))}
        </div>

        <div className="home-spotlight__content">
          <p className="home-spotlight__label">New</p>

          <div className="home-spotlight__copy">
            {slides.map((item, index) => (
              <div
                key={item.id}
                className={`home-spotlight__slide${
                  index === activeIndex ? " is-active" : ""
                }`}
                aria-hidden={index !== activeIndex}
              >
                <h2
                  id={index === activeIndex ? "home-spotlight-heading" : undefined}
                  className="home-spotlight__headline"
                >
                  {item.headline}
                </h2>
                <p className="home-spotlight__description">{item.description}</p>
                <CTAButton href={item.shopUrl} external>
                  {item.ctaLabel}
                </CTAButton>
              </div>
            ))}
          </div>

          <div
            className="home-spotlight__dots"
            role="tablist"
            aria-label="Featured products"
          >
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                className={`home-spotlight__dot${
                  index === activeIndex ? " is-active" : ""
                }`}
                aria-selected={index === activeIndex}
                aria-label={`Show ${item.headline}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
