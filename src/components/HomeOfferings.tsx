import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { homeOfferings } from "../data/homeOfferings";
import "./HomeOfferings.css";

export function HomeOfferings() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      section.classList.add("is-visible");
      return;
    }

    section.classList.add("will-animate");

    const observer = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle("is-visible", entry.isIntersecting);
      },
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-offerings" ref={sectionRef}>
      <div className="home-offerings__gallery">
        {homeOfferings.map((item, index) => (
          <figure
            key={item.id}
            className="home-offerings__frame"
            style={
              {
                "--offer-delay": `${180 + index * 220}ms`,
              } as CSSProperties
            }
          >
            <img
              src={item.image}
              alt={item.imageAlt}
              className="home-offerings__image"
            />
          </figure>
        ))}
      </div>

      <div className="home-offerings__copy">
        <h2 className="home-offerings__title">Try it and find out</h2>
        <p className="home-offerings__text">
          Hi, I&apos;m Kyle (Mx. Cruise LA Leather 2026, they/he). I&apos;m a
          leather queer who crafts,
          makes art, and creates custom leather gear. Check out my work or{" "}
          <Link to="/contact" className="home-offerings__inline-link">
            get in touch
          </Link>{" "}
          if you would like to have me at your event or if you have a custom
          idea.
        </p>
        <div className="home-offerings__links">
          {homeOfferings.map((item) => (
            <Link key={item.id} to={item.to} className="home-offerings__link">
              {item.label} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
