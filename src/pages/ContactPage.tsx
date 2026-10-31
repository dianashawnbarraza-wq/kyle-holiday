import { CTAButton } from "../components/CTAButton";
import { PageHero } from "../components/PageHero";
import { site } from "../data/site";
import "./ContactPage.css";

export function ContactPage() {
  return (
    <div className="contact-page">
      <PageHero
        title="Contact"
        tagline="Get in touch with me"
        image="/images/contact/cruise-la-leather.png"
        imageAlt="Kyle Holiday in Mx. Cruise LA Leather 2026 title vest at the Eagle"
        imagePosition="center 18%"
      />

      <div className="page page--after-hero">
        <div className="page-inner">
          <section className="section contact-info">
            <a href={`mailto:${site.email}`} className="contact-info__item">
              <span className="contact-info__label">Email</span>
              <span className="contact-info__value">{site.email}</span>
            </a>

            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info__item"
            >
              <span className="contact-info__label">Instagram</span>
              <span className="contact-info__value">{site.instagramHandle}</span>
            </a>

            <div className="contact-info__item contact-info__item--static">
              <span className="contact-info__label">{site.cruiseLA.name}</span>
              <span className="contact-info__value">
                {site.cruiseLA.schedule}
              </span>
              <span className="contact-info__detail">{site.cruiseLA.venue}</span>
            </div>
          </section>

          <section className="section contact-booking">
            <div className="contact-booking__box">
              <h3>Want me at your event?</h3>
              <p>
                Vending, performances, leather clinics, and more — reach out and
                let&apos;s talk.
              </p>
              <CTAButton
                href={`mailto:${site.email}?subject=Event%20Booking%20Inquiry`}
              >
                Get in Touch
              </CTAButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
