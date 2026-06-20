import { SectionHeader } from "../components/SectionHeader";
import { CTAButton } from "../components/CTAButton";
import {
  hardwareOptions,
  leatherCategories,
  leatherDetails,
  leatherIntro,
} from "../data/leatherwork";
import { site } from "../data/site";
import "./LeatherworkPage.css";

export function LeatherworkPage() {
  return (
    <div className="page">
      <div className="page-inner">
        <SectionHeader
          title="Leatherwork"
          subtitle="Custom gear for all bodies"
        />

        <section className="section prose leather-intro">
          <p>{leatherIntro}</p>
          <p>{leatherDetails}</p>
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
          <div className="leather-grid">
            {leatherCategories.map((item) => (
              <article key={item.id} className="leather-card">
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
  );
}
