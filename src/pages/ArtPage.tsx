import { SectionHeader } from "../components/SectionHeader";
import { CTAButton } from "../components/CTAButton";
import { FeaturedThumbGallery } from "../components/FeaturedThumbGallery";
import { GalleryGrid } from "../components/GalleryGrid";
import { PageHero } from "../components/PageHero";
import {
  artPrints,
  artStickers,
  artTshirts,
  featuredInstallations,
} from "../data/art";
import { site } from "../data/site";
import "./ArtPage.css";

export function ArtPage() {
  return (
    <div className="art-page">
      <PageHero
        title="Art"
        tagline="Specializing in risograph printing and custom frame making"
        image="/images/art/together-in-leather.png"
        imageAlt="Together in Leather risograph print by Kyle Holiday"
        imagePosition="center 20%"
      />

      <div className="page page--after-hero">
        <div className="page-inner">
        <section className="section" id="prints">
          <SectionHeader title="Framed prints, stickers, and t-shirts" />

          {featuredInstallations.map((installation) => (
            <article key={installation.id} className="art-featured">
              <div className="art-featured__visual">
                <img
                  src={installation.image}
                  alt={installation.imageAlt}
                  className="art-featured__image"
                />
              </div>
              <div className="art-featured__content">
                <p className="art-featured__dates">{installation.dates}</p>
                <h2 className="art-featured__title">{installation.title}</h2>
                <p className="art-featured__venue">{installation.venue}</p>
                <div className="prose">
                  <p>{installation.description}</p>
                </div>
                {installation.gallery && installation.gallery.length > 0 && (
                  <FeaturedThumbGallery images={installation.gallery} />
                )}
              </div>
            </article>
          ))}

          <div className="art-gallery">
            <GalleryGrid items={artPrints} />
          </div>
        </section>

        <section className="section" id="stickers">
          <SectionHeader title="Stickers" subtitle="Vinyl stickers and packs" />
          <GalleryGrid
            items={artStickers}
            imageAspect="square"
            showShopLinks
          />
        </section>

        <section className="section" id="t-shirts">
          <SectionHeader title="T-Shirts" subtitle="Screenprinted tees" />
          <div className="art-tshirts">
            {artTshirts.map((shirt) => (
              <article key={shirt.id} className="art-tshirt-card">
                <div className="art-tshirt-card__image-wrap">
                  {shirt.shopUrl ? (
                    <a
                      href={shirt.shopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="art-tshirt-card__image-link"
                    >
                      <img
                        src={shirt.src}
                        alt={shirt.alt}
                        className="art-tshirt-card__image"
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <img
                      src={shirt.src}
                      alt={shirt.alt}
                      className="art-tshirt-card__image"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="art-tshirt-card__info">
                  <h3 className="art-tshirt-card__title">{shirt.title}</h3>
                  <p className="art-tshirt-card__caption">{shirt.caption}</p>
                  {shirt.shopUrl && (
                    <CTAButton to="/shop?style=shirt">
                      Order in the shop
                    </CTAButton>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section art-cta">
          <div className="art-cta__box">
            <h3>Interested in acquiring a piece?</h3>
            <p>Email me or come see me in person at an event.</p>
            <div className="cta-group">
              <CTAButton href={`mailto:${site.email}?subject=Art%20Inquiry`}>
                Email Kyle
              </CTAButton>
              <CTAButton to="/contact" variant="secondary">
                View Events
              </CTAButton>
            </div>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}
