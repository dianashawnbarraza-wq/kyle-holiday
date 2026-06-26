import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { HomeSpotlightBanner } from "../components/HomeSpotlightBanner";
import { SectionHeader } from "../components/SectionHeader";
import { CollapsibleEventList } from "../components/CollapsibleEventList";
import { KyleGallery } from "../components/KyleGallery";
import { events } from "../data/events";
import { homeSpotlightSlides } from "../data/homeSpotlight";
import { kyleGallery, kyleGallerySection } from "../data/kyleGallery";
import "./HomePage.css";

export function HomePage() {
  return (
    <>
      <Hero />

      <div className="page">
        <div className="page-inner">
          <section className="section home-intro">
            <p className="home-intro__text">
              Hi, I&apos;m Kyle (Mx. Cruise LA Leather 2026, they/he). I&apos;m a
              Latine artist, leatherworker, pet play accessory maker and kinkster.
            </p>
            <p className="home-intro__text">
              Glad you&apos;re here and you can{" "}
              <Link to="/about">read more about me here</Link>.
            </p>
          </section>

          <section className="section">
            <HomeSpotlightBanner slides={homeSpotlightSlides} />
          </section>

          <section className="section" id="events">
            <SectionHeader
              title="Events"
              subtitle="Find me around Los Angeles and beyond"
            />
            <CollapsibleEventList events={events} initialCount={4} compact />
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
    </>
  );
}
