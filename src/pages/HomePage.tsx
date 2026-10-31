import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { HomeOfferings } from "../components/HomeOfferings";
import { SectionHeader } from "../components/SectionHeader";
import { CollapsibleEventList } from "../components/CollapsibleEventList";
import { KyleGallery } from "../components/KyleGallery";
import { events } from "../data/events";
import { kyleGallery, kyleGallerySection } from "../data/kyleGallery";
import { site } from "../data/site";
import "./HomePage.css";

export function HomePage() {
  const introRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = introRef.current;
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
    <div className="home-page">
      <Hero />

      <div className="home-page__content">
          <section className="section home-intro" ref={introRef}>
            <div className="home-intro__layout">
              <div className="home-intro__photo-wrap">
                <img
                  src="/images/home-intro-kyle.jpg"
                  alt="Kyle Holiday in leather vest and chaps at a club entrance"
                  className="home-intro__photo"
                  loading="lazy"
                />
              </div>
              <div className="home-intro__copy">
                <h2 className="home-intro__headline">
                  Making art, leather, and trouble
                </h2>
                <p className="home-intro__text">
                  Hi, I&apos;m Kyle (Mx. Cruise LA Leather 2026, they/he). Born
                  in Los Angeles, I&apos;m a Latine artist, leatherworker, pet
                  play accessory maker, and kinkster. I got into leatherworking
                  to make gear that was gender affirming and custom. I&apos;m
                  also passionate about sharing my knowledge with others.
                </p>
                <p className="home-intro__text">
                  Cruise me at Cruise LA (Eagle LA) every third Saturday. If
                  you&apos;re interested in making leather gear or leather care,
                  I help co-run a series called RIVET. I&apos;m excited to
                  connect with community members who are just entering the scene
                  and those who&apos;ve been here for years.
                </p>
                <div className="home-intro__links">
                  <Link to="/about" className="home-intro__link">
                    Read more <span aria-hidden="true">→</span>
                  </Link>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-intro__link"
                  >
                    Instagram <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="section home-spotlight-section">
            <HomeOfferings />
          </section>

          <section className="section home-events" id="events">
            <SectionHeader
              title="Events"
              subtitle="Find me around Los Angeles and beyond"
            />
            <CollapsibleEventList events={events} initialCount={4} />
          </section>

          <section className="section">
            <SectionHeader
              title={kyleGallerySection.title}
              subtitle={kyleGallerySection.subtitle}
            />
            <div className="home-gallery">
              <KyleGallery images={kyleGallery} size="large" />
            </div>
          </section>
      </div>
    </div>
  );
}
