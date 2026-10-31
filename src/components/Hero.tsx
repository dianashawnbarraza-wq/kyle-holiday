import { site } from "../data/site";
import "./Hero.css";

const heroImage = "/images/hero-cruise-vest.jpg";

type HeroProps = {
  compact?: boolean;
};

export function Hero({ compact = false }: HeroProps) {
  return (
    <section
      className={`hero cursor-on-red${compact ? " hero--compact" : ""}`}
    >
      <div className="hero__layout">
        <div className="hero__copy">
          <h1 className="hero__title">{site.name}</h1>
          <p className="hero__tagline">{site.heroIntro.replace(/\.$/, "")}</p>
        </div>

        <div className="hero__media">
          <img
            src={heroImage}
            alt="Kyle Holiday from behind in a black leather vest with Mx. Cruise LA Leather 2026 title patch"
            className="hero__image"
          />
        </div>
      </div>
    </section>
  );
}
