import { SectionHeader } from "../components/SectionHeader";
import { CTAButton } from "../components/CTAButton";
import { ArtSubNav } from "../components/ArtSubNav";
import { FeaturedThumbGallery } from "../components/FeaturedThumbGallery";
import { GalleryGrid } from "../components/GalleryGrid";
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
    <div className="page">
      <div className="page-inner">
        <SectionHeader
          title="Art"
          subtitle="Prints, Risograph, Stickers, and T-shirts"
          level={1}
        />

        <ArtSubNav />

        <section className="section" id="prints">
          <SectionHeader title="Prints" subtitle="Risograph and framed works" />

          {featuredInstallations.map((installation) => (
            <div key={installation.id} className="art-featured">
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
            </div>
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
                    <CTAButton href={shirt.shopUrl} external>
                      Shop on Etsy
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
  );
}
