import type { EventItem } from "../data/events";
import { CTAButton } from "./CTAButton";
import "./EventList.css";

type EventListProps = {
  events: EventItem[];
  compact?: boolean;
};

export function EventList({ events, compact = false }: EventListProps) {
  return (
    <ul className={`event-list${compact ? " event-list--compact" : ""}`}>
      {events.map((event) => (
        <li
          key={`${event.sortDate}-${event.title}`}
          className={`event-list__item${
            event.flyer ? " event-list__item--has-flyer" : ""
          }`}
        >
          <time className="event-list__date">{event.date}</time>
          <div className="event-list__body">
            <span className="event-list__title">{event.title}</span>
            <span className="event-list__location">{event.location}</span>
            {event.role && (
              <span className="event-list__role">{event.role}</span>
            )}
            {event.links && event.links.length > 0 && (
              <div className="event-list__links cta-group">
                {event.links.map((link) => (
                  <CTAButton
                    key={link.href}
                    href={link.href}
                    external
                    variant="secondary"
                  >
                    {link.label}
                  </CTAButton>
                ))}
              </div>
            )}
          </div>
          {event.flyer && (
            <div className="event-list__flyer-wrap">
              <img
                src={event.flyer}
                alt={event.flyerAlt ?? `${event.title} flyer`}
                className="event-list__flyer"
                loading="lazy"
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
