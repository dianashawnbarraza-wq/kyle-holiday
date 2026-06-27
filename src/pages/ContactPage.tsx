import { SectionHeader } from "../components/SectionHeader";
import { CTAButton } from "../components/CTAButton";
import { CollapsibleEventList } from "../components/CollapsibleEventList";
import { events } from "../data/events";
import { site } from "../data/site";
import "./ContactPage.css";

export function ContactPage() {
  return (
    <div className="page">
      <div className="page-inner">
        <SectionHeader title="Contact" subtitle="Get in touch with me" level={1} />

        <section className="section contact-panel">
          <div className="contact-panel__photo-wrap">
            <img
              src="/images/contact/cruise-la-leather.png"
              alt="Kyle Holiday in Mx. Cruise LA Leather 2026 title vest at the Eagle"
              className="contact-panel__photo"
            />
          </div>

          <div className="contact-panel__links">
            <a
              href={`mailto:${site.email}`}
              className="contact-panel__item"
            >
              <span className="contact-panel__label">Email</span>
              <span className="contact-panel__value">{site.email}</span>
            </a>

            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-panel__item"
            >
              <span className="contact-panel__label">Instagram</span>
              <span className="contact-panel__value">
                {site.instagramHandle}
              </span>
            </a>

            <div className="contact-panel__item contact-panel__item--static">
              <span className="contact-panel__label">{site.cruiseLA.name}</span>
              <span className="contact-panel__value">
                {site.cruiseLA.schedule}
              </span>
              <span className="contact-panel__detail">
                {site.cruiseLA.venue}
              </span>
            </div>
          </div>
        </section>

        <section className="section contact-booking">
          <div className="contact-booking__box">
            <h3>Want me at your event?</h3>
            <p>
              Vending, performances, leather clinics, and more — reach out and
              let's talk.
            </p>
            <CTAButton
              href={`mailto:${site.email}?subject=Event%20Booking%20Inquiry`}
            >
              Get in Touch
            </CTAButton>
          </div>
        </section>

        <section className="section">
          <SectionHeader title="Events" />
          <CollapsibleEventList events={events} initialCount={4} />
        </section>
      </div>
    </div>
  );
}
