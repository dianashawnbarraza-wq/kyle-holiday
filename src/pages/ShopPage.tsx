import { CTAButton } from "../components/CTAButton";
import { GalleryGrid } from "../components/GalleryGrid";
import { SectionHeader } from "../components/SectionHeader";
import { TagGallery } from "../components/TagGallery";
import { artStickers, artTshirts } from "../data/art";
import { leatherCategories, leatherDetails, leatherIntro } from "../data/leatherwork";
import { site } from "../data/site";
import { tagGallery } from "../data/tags";
import "./ShopPage.css";

const shopCategories = [
  { href: "#pet-play-tags", label: "Pet Play Tags" },
  { href: "#leatherwork", label: "Leather Work" },
  { href: "#art", label: "Art" },
] as const;

const artShopItems = [...artStickers, ...artTshirts];

export function ShopPage() {
  return (
    <div className="page shop-page">
      <div className="page-inner">
        <SectionHeader
          title="Shop"
          subtitle="Pet play tags, custom leatherwork, and art by Kyle Holiday."
          level={1}
        />

        <nav className="shop-page__category-nav" aria-label="Shop categories">
          {shopCategories.map((category) => (
            <a
              key={category.href}
              href={category.href}
              className="shop-page__category-link"
            >
              {category.label}
            </a>
          ))}
        </nav>

        <section className="section shop-section" id="pet-play-tags">
          <div className="shop-section__heading">
            <SectionHeader
              title="Pet Play Tags"
              subtitle="Custom puppy play tags, pet ID tags, and creature collar tags from Etsy."
            />
            <CTAButton href={site.etsy} external variant="secondary">
              Shop All on Etsy
            </CTAButton>
          </div>
          <TagGallery items={tagGallery} />
        </section>

        <section className="section shop-section" id="leatherwork">
          <div className="shop-section__heading">
            <SectionHeader
              title="Leather Work"
              subtitle="Made-to-order leather gear for all bodies."
            />
            <CTAButton href={`mailto:${site.email}?subject=Custom%20Leather%20Quote`}>
              Request a Quote
            </CTAButton>
          </div>
          <div className="prose shop-section__copy">
            <p>{leatherIntro}</p>
            <p>{leatherDetails}</p>
          </div>
          <div className="shop-leather-grid">
            {leatherCategories.map((item) => (
              <article key={item.id} className="shop-leather-card">
                <div className="shop-leather-card__image-wrap">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="shop-leather-card__image"
                    loading="lazy"
                  />
                </div>
                <h3 className="shop-leather-card__title">{item.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section shop-section" id="art">
          <div className="shop-section__heading">
            <SectionHeader
              title="Art"
              subtitle="Stickers, tees, prints, and queer leather artwork."
            />
            <CTAButton href={site.etsy} external variant="secondary">
              Shop Art on Etsy
            </CTAButton>
          </div>
          <GalleryGrid items={artShopItems} imageAspect="square" showShopLinks />
        </section>
      </div>
    </div>
  );
}
