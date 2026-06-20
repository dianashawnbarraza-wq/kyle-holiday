import { useState } from "react";
import type { KyleGalleryImage } from "../data/kyleGallery";
import { GalleryLightbox } from "./GalleryLightbox";
import "./KyleGallery.css";

type KyleGalleryProps = {
  images: KyleGalleryImage[];
  size?: "default" | "large";
};

export function KyleGallery({ images, size = "default" }: KyleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className={`kyle-gallery${
          size === "large" ? " kyle-gallery--large" : ""
        }`}
      >
        {images.map((image, index) => (
          <figure key={image.id} className="kyle-gallery__item">
            <button
              type="button"
              className="kyle-gallery__trigger"
              onClick={() => setActiveIndex(index)}
              aria-label={`View larger: ${image.caption ?? image.alt}`}
            >
              <div className="kyle-gallery__image-wrap">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="kyle-gallery__image"
                  loading="lazy"
                />
              </div>
            </button>
            {image.caption && (
              <figcaption className="kyle-gallery__caption">
                {image.caption}
              </figcaption>
            )}
          </figure>
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
