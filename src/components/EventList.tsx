import { useMemo, useState } from "react";
import type { EventItem } from "../data/events";
import type { GalleryImage } from "../data/gallery";
import { CTAButton } from "./CTAButton";
import { GalleryLightbox } from "./GalleryLightbox";
import "./EventList.css";

type EventListProps = {
  events: EventItem[];
  compact?: boolean;
};

function eventFlyerId(event: EventItem) {
  return `${event.sortDate}-${event.title}`;
}

export function EventList({ events, compact = false }: EventListProps) {
  const [activeFlyerIndex, setActiveFlyerIndex] = useState<number | null>(null);

  const flyerImages = useMemo<GalleryImage[]>(
    () =>
      events
        .filter((event) => event.flyer)
        .map((event) => ({
          id: eventFlyerId(event),
          src: event.flyer!,
          alt: event.flyerAlt ?? `${event.title} flyer`,
          caption: event.title,
        })),
    [events],
  );

  const flyerIndexById = useMemo(
    () => new Map(flyerImages.map((image, index) => [image.id, index])),
    [flyerImages],
  );

  return (
    <>
      <ul className={`event-list${compact ? " event-list--compact" : ""}`}>
        {events.map((event) => {
          const flyerIndex = event.flyer
            ? flyerIndexById.get(eventFlyerId(event))
            : undefined;

          return (
            <li
              key={eventFlyerId(event)}
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
              {event.flyer && flyerIndex !== undefined && (
                <button
                  type="button"
                  className="event-list__flyer-trigger"
                  onClick={() => setActiveFlyerIndex(flyerIndex)}
                  aria-label={`View larger: ${event.title} flyer`}
                >
                  <div className="event-list__flyer-wrap">
                    <img
                      src={event.flyer}
                      alt={event.flyerAlt ?? `${event.title} flyer`}
                      className="event-list__flyer"
                      loading="lazy"
                    />
                  </div>
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <GalleryLightbox
        images={flyerImages}
        activeIndex={activeFlyerIndex}
        onClose={() => setActiveFlyerIndex(null)}
        onChangeIndex={setActiveFlyerIndex}
      />
    </>
  );
}
