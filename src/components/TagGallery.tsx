import { Link } from "react-router-dom";
import { resolveStyleId } from "../data/shop";
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
            <Link
              to={`/shop?style=${resolveStyleId(item.id) ?? "bone"}`}
              className="tag-gallery__image-link"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="tag-gallery__image"
                loading="lazy"
              />
            </Link>
          </div>
          <div className="tag-gallery__info">
            <h3 className="tag-gallery__title">{item.title}</h3>
            <p className="tag-gallery__caption">{item.caption}</p>
            <CTAButton
              to={`/shop?style=${resolveStyleId(item.id) ?? "bone"}`}
              variant="ghost"
              className="tag-gallery__shop-link"
            >
              Order this style
            </CTAButton>
          </div>
        </article>
      ))}
    </div>
  );
}
