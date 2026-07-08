import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CTAButton } from "../components/CTAButton";
import { GalleryGrid } from "../components/GalleryGrid";
import { SectionHeader } from "../components/SectionHeader";
import { TagGallery } from "../components/TagGallery";
import { artStickers, artTshirts } from "../data/art";
import { leatherCategories, leatherDetails, leatherIntro } from "../data/leatherwork";
import { site } from "../data/site";
import { tagGallery } from "../data/tags";
import "./ShopPage.css";

const shopFilters = [
  { value: "all", label: "All" },
  { value: "pet-play-tags", label: "Pet Play Tags" },
  { value: "leatherwork", label: "Leatherwork" },
  { value: "art", label: "Art" },
] as const;

type ShopFilter = (typeof shopFilters)[number]["value"];

const artShopItems = [...artStickers, ...artTshirts];

function filterFromHash(hash: string): ShopFilter {
  if (hash === "#leatherwork") return "leatherwork";
  if (hash === "#art") return "art";
  if (hash === "#pet-play-tags" || hash === "") return "pet-play-tags";
  return "pet-play-tags";
}

export function ShopPage() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<ShopFilter>(() =>
    filterFromHash(hash),
  );

  useEffect(() => {
    if (!hash) {
      navigate("/shop#pet-play-tags", { replace: true });
      return;
    }

    setActiveFilter(filterFromHash(hash));
  }, [hash, navigate]);

  const showSection = (section: Exclude<ShopFilter, "all">) =>
    activeFilter === "all" || activeFilter === section;

  return (
    <div className="page shop-page">
      <div className="page-inner">
        <SectionHeader
          title="Shop"
          subtitle="Pet play tags, custom leatherwork, and art by Kyle Holiday."
          level={1}
        />

        <div className="shop-page__category-nav" aria-label="Filter shop categories">
          {shopFilters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                className={`shop-page__category-link${
                  isActive ? " shop-page__category-link--active" : ""
                }`}
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {showSection("pet-play-tags") && (
          <section className="section shop-section" id="pet-play-tags">
            <div className="shop-section__heading">
              <SectionHeader
                title="Pet Play Tags"
                subtitle="Laser cut and hand-finished in my studio. I make bone-shaped, heart-shaped, round tags, and more for the puppy and pet community. Customize them and check out all the colors on Etsy, or in-store at Stockroom (Los Angeles)."
              />
              <CTAButton href={site.etsy} external variant="secondary">
                Shop All on Etsy
              </CTAButton>
            </div>
            <TagGallery items={tagGallery} />
          </section>
        )}

        {showSection("leatherwork") && (
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
        )}

        {showSection("art") && (
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
        )}
      </div>
    </div>
  );
}
