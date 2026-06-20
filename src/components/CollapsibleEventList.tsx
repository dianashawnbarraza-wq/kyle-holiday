import { useState } from "react";
import type { EventItem } from "../data/events";
import { EventList } from "./EventList";
import "./CollapsibleEventList.css";

type CollapsibleEventListProps = {
  events: EventItem[];
  initialCount?: number;
  compact?: boolean;
};

export function CollapsibleEventList({
  events,
  initialCount = 4,
  compact = false,
}: CollapsibleEventListProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = events.length > initialCount;
  const visibleEvents = expanded ? events : events.slice(0, initialCount);

  return (
    <div className="collapsible-event-list">
      <EventList events={visibleEvents} compact={compact} />

      {hasMore && (
        <div className="collapsible-event-list__actions">
          {!expanded ? (
            <button
              type="button"
              className="cta-btn cta-btn--ghost collapsible-event-list__btn"
              onClick={() => setExpanded(true)}
            >
              Load more
            </button>
          ) : (
            <button
              type="button"
              className="cta-btn cta-btn--ghost collapsible-event-list__btn"
              onClick={() => setExpanded(false)}
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
}
