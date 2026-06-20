import { useState } from "react";
import type { GalleryImage } from "../data/gallery";
import { GalleryLightbox } from "./GalleryLightbox";
import "./FeaturedThumbGallery.css";

type FeaturedThumbGalleryProps = {
  images: GalleryImage[];
};

export function FeaturedThumbGallery({ images }: FeaturedThumbGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="featured-thumb-gallery" role="list">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className="featured-thumb-gallery__trigger"
            onClick={() => setActiveIndex(index)}
            aria-label={`View larger: ${image.caption ?? image.alt}`}
            role="listitem"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="featured-thumb-gallery__image"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <GalleryLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChangeIndex={setActiveIndex}
      />
    </>
  );
}
