import type { ArtPiece } from "../data/art";
import { CTAButton } from "./CTAButton";
import { PlaceholderImage } from "./PlaceholderImage";
import "./GalleryGrid.css";

type GalleryGridProps = {
  items: ArtPiece[];
  imageAspect?: "square" | "portrait";
  showShopLinks?: boolean;
};

export function GalleryGrid({
  items,
  imageAspect = "portrait",
  showShopLinks = false,
}: GalleryGridProps) {
  return (
    <div className="gallery-grid">
      {items.map((item) => (
        <article key={item.id} className="gallery-grid__card">
          <div
            className={`gallery-grid__image-wrap gallery-grid__image-wrap--${imageAspect}`}
          >
            {item.src ? (
              item.shopUrl ? (
                <a
                  href={item.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gallery-grid__image-link"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="gallery-grid__image"
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="gallery-grid__image"
                  loading="lazy"
                />
              )
            ) : (
              <PlaceholderImage
                label={item.title}
                aspectRatio="square"
                className="gallery-grid__placeholder"
              />
            )}
          </div>
          <div className="gallery-grid__info">
            <h3 className="gallery-grid__title">{item.title}</h3>
            <p className="gallery-grid__caption">{item.caption}</p>
            {showShopLinks && item.shopUrl && (
              <CTAButton
                href={item.shopUrl}
                external
                variant="ghost"
                className="gallery-grid__shop-link"
              >
                View on Etsy
              </CTAButton>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
