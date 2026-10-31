import { useEffect, useRef } from "react";
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
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
            style={{ animationDelay: `${180 + index * 220}ms` }}
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
        <h2 className="home-offerings__title">Let&apos;s have a good time</h2>
        <p className="home-offerings__text">
          I vend in person around Los Angeles and offer items online.{" "}
          <Link to="/contact" className="home-offerings__inline-link">
            Get in touch
          </Link>{" "}
          if you would like to have me at your event.
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
