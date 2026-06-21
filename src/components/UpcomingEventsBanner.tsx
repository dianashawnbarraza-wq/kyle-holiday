import { Link } from "react-router-dom";
import type { EventItem } from "../data/events";
import "./UpcomingEventsBanner.css";

type UpcomingEventsBannerProps = {
  events: EventItem[];
  maxItems?: number;
};

export function UpcomingEventsBanner({
  events,
  maxItems = 3,
}: UpcomingEventsBannerProps) {
  const featured = events.slice(0, maxItems);

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="upcoming-events" aria-labelledby="upcoming-events-heading">
      <div className="upcoming-events__inner">
        <div className="upcoming-events__intro">
          <p className="upcoming-events__eyebrow">Coming up</p>
          <h2 id="upcoming-events-heading" className="upcoming-events__title">
            Upcoming events
          </h2>
          <p className="upcoming-events__lead">
            {featured.length === 1
              ? "One event on the calendar — come say hi."
              : `${featured.length} events on the calendar — come say hi.`}
          </p>
          <Link to="/#events" className="upcoming-events__cta">
            See full calendar
          </Link>
        </div>

        <div className="upcoming-events__cards">
          {featured.map((event, index) => (
            <article
              key={`${event.sortDate}-${event.title}`}
              className={`upcoming-events__card${
                index === 0 ? " upcoming-events__card--next" : ""
              }`}
            >
              {index === 0 && (
                <span className="upcoming-events__badge">Next up</span>
              )}
              {event.flyer && (
                <div className="upcoming-events__flyer-wrap">
                  <img
                    src={event.flyer}
                    alt={event.flyerAlt ?? `${event.title} flyer`}
                    className="upcoming-events__flyer"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="upcoming-events__details">
                <time className="upcoming-events__date">{event.date}</time>
                <h3 className="upcoming-events__event-title">{event.title}</h3>
                <p className="upcoming-events__location">{event.location}</p>
                {event.role && (
                  <p className="upcoming-events__role">{event.role}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
