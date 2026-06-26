import { Hero } from "../components/Hero";
import { HomeSpotlightBanner } from "../components/HomeSpotlightBanner";
import { SectionHeader } from "../components/SectionHeader";
import { CollapsibleEventList } from "../components/CollapsibleEventList";
import { KyleGallery } from "../components/KyleGallery";
import { events } from "../data/events";
import { homeSpotlightSlides } from "../data/homeSpotlight";
import { kyleGallery } from "../data/kyleGallery";
import "./HomePage.css";

export function HomePage() {
  return (
    <>
      <Hero />

      <div className="page">
        <div className="page-inner">
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
              title="Gallery"
              subtitle="Leather, title, and community — click any photo to view larger"
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
