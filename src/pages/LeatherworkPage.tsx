import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { CTAButton } from "../components/CTAButton";
import { PageHero } from "../components/PageHero";
import { SectionHeader } from "../components/SectionHeader";
import {
  hardwareOptions,
  leatherCategories,
  leatherDetails,
  leatherIntro,
} from "../data/leatherwork";
import { site } from "../data/site";
import "./LeatherworkPage.css";

export function LeatherworkPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      grid.classList.add("is-visible");
      return;
    }

    grid.classList.add("will-animate");

    const observer = new IntersectionObserver(
      ([entry]) => {
        grid.classList.toggle("is-visible", entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="leather-page">
      <PageHero
        title="Leather"
        tagline="Custom gear for all bodies"
        image="/images/leather/femme-harness.jpeg"
        imageAlt="Black leather femme harness"
        imagePosition="center 18%"
      />

      <div className="page page--after-hero">
        <div className="page-inner">
        <section className="section leather-intro">
          <SectionHeader title="Collars, harnesses, bondage gear, and straps" />
          <div className="leather-intro__text prose">
            <p>{leatherIntro}</p>
            <p>{leatherDetails}</p>
          </div>
        </section>

        <section className="section">
          <div className="hardware-tags">
            {hardwareOptions.map((option) => (
              <span key={option} className="hardware-tag">
                {option}
              </span>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="leather-grid" ref={gridRef}>
            {leatherCategories.map((item, index) => (
              <article
                key={item.id}
                className="leather-card"
                style={
                  {
                    "--leather-delay": `${80 + index * 70}ms`,
                  } as CSSProperties
                }
              >
                <div className="leather-card__image-wrap">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="leather-card__image"
                    loading="lazy"
                  />
                </div>
                <h3 className="leather-card__title">{item.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section leather-cta">
          <div className="leather-cta__box">
            <h3>Custom quote</h3>
            <p>
              Harnesses, collars, cuffs, and more — made to order. I'll have gear
              at events, but custom pieces start with a conversation.
            </p>
            <div className="cta-group">
              <CTAButton
                href={`mailto:${site.email}?subject=Custom%20Leather%20Quote`}
              >
                Request a Quote
              </CTAButton>
              <CTAButton to="/contact" variant="secondary">
                Find Me at Events
              </CTAButton>
            </div>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}
