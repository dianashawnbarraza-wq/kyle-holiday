import { Link } from "react-router-dom";
import "./Hero.css";

export type PageHeroLink = {
  label: string;
  href: string;
  external?: boolean;
};

type PageHeroProps = {
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  links?: PageHeroLink[];
  className?: string;
};

export function PageHero({
  title,
  tagline,
  image,
  imageAlt,
  imagePosition,
  links,
  className,
}: PageHeroProps) {
  return (
    <section
      className={`hero hero--enter cursor-on-red${className ? ` ${className}` : ""}`}
    >
      <div className="hero__layout">
        <div className="hero__copy">
          <h1 className="hero__title">{title}</h1>
          <p className="hero__tagline">{tagline}</p>
          {links && links.length > 0 && (
            <div className="hero__links">
              {links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero__link"
                  >
                    {link.label} <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <Link key={link.href} to={link.href} className="hero__link">
                    {link.label} <span aria-hidden="true">→</span>
                  </Link>
                ),
              )}
            </div>
          )}
        </div>

        <div className="hero__media">
          <img
            src={image}
            alt={imageAlt}
            className="hero__image"
            decoding="async"
            fetchPriority="high"
            style={
              imagePosition ? { objectPosition: imagePosition } : undefined
            }
          />
        </div>
      </div>
    </section>
  );
}
