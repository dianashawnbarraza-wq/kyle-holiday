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
        <p className="hero__eyebrow">{site.tagline}</p>
        <h1 className="hero__title">{site.name}</h1>
        {!compact && (
          <>
            <h2 className="hero__subtitle">{site.heroIntro}</h2>
            <div className="hero__ctas cta-group">
              <CTAButton to="/pet-play-tags">Pet Play Tags</CTAButton>
              <CTAButton to="/#events" variant="secondary">
                Upcoming Events
              </CTAButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
