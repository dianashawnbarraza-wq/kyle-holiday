import type { TagPiece } from "../data/tags";
import { CTAButton } from "./CTAButton";
import "./TagGallery.css";

type TagGalleryProps = {
  items: TagPiece[];
};

export function TagGallery({ items }: TagGalleryProps) {
  return (
    <div className="tag-gallery">
      {items.map((item) => (
        <article key={item.id} className="tag-gallery__card">
          <div className="tag-gallery__image-wrap">
            <a
              href={item.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tag-gallery__image-link"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="tag-gallery__image"
                loading="lazy"
              />
            </a>
          </div>
          <div className="tag-gallery__info">
            <h3 className="tag-gallery__title">{item.title}</h3>
            <p className="tag-gallery__caption">{item.caption}</p>
            <CTAButton
              href={item.shopUrl}
              external
              variant="ghost"
              className="tag-gallery__shop-link"
            >
              View on Etsy
            </CTAButton>
          </div>
        </article>
      ))}
    </div>
  );
}
