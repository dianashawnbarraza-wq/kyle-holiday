import { CTAButton } from "./CTAButton";
import { site } from "../data/site";
import "./Hero.css";

const heroImage = "/images/hero.png";

type HeroProps = {
  compact?: boolean;
};

export function Hero({ compact = false }: HeroProps) {
  return (
    <section className={`hero${compact ? " hero--compact" : ""}`}>
      <div className="hero__bg">
        <img
          src={heroImage}
          alt="Kyle Holiday self portrait in leather at a bar entrance"
          className="hero__image"
        />
      </div>
      <div className="hero__content">
        <h1 className="hero__title">{site.name}</h1>
        {!compact && (
          <>
            <p className="hero__role">
              <span>{site.title}</span>
              <span className="hero__role-separator" aria-hidden="true">
                ·
              </span>
              <span>Making Play Personal</span>
            </p>
            <div className="hero__ctas cta-group">
              <CTAButton to="/shop">Shop</CTAButton>
              <CTAButton to="/#events" variant="secondary">
                Events
              </CTAButton>
            </div>
            <p className="hero__cta-note">New pet play tag styles!</p>
          </>
        )}
      </div>
    </section>
  );
}
