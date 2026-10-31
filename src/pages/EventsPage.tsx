import { CollapsibleEventList } from "../components/CollapsibleEventList";
import { PageHero } from "../components/PageHero";
import { events } from "../data/events";
import "./EventsPage.css";

export function EventsPage() {
  return (
    <div className="events-page">
      <PageHero
        title="Events"
        tagline="See you in Los Angeles and beyond"
        image="/images/events/leather-queers-in-the-park-hero.jpg"
        imageAlt="Leather Queers in the Park flyer — a black combat boot with gothic lettering, presented by Mx. Cruise LA Leather 2026 and Cruise LA Bootblack 2026"
        imagePosition="center center"
      />

      <div className="page page--after-hero">
        <div className="page-inner">
          <section className="section" id="events">
            <CollapsibleEventList events={events} initialCount={8} />
          </section>
        </div>
      </div>
    </div>
  );
}
