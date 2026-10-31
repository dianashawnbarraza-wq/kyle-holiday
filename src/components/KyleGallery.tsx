import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { KyleGalleryImage } from "../data/kyleGallery";
import { GalleryLightbox } from "./GalleryLightbox";
import "./KyleGallery.css";

type KyleGalleryProps = {
  images: KyleGalleryImage[];
  size?: "default" | "large";
};

export function KyleGallery({ images, size = "default" }: KyleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      gallery.classList.add("is-visible");
      return;
    }

    gallery.classList.add("will-animate");

    const observer = new IntersectionObserver(
      ([entry]) => {
        gallery.classList.toggle("is-visible", entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={galleryRef}
        className={`kyle-gallery${
          size === "large" ? " kyle-gallery--large" : ""
        }`}
      >
        {images.map((image, index) => (
          <figure
            key={image.id}
            className="kyle-gallery__item"
            style={
              {
                "--gallery-delay": `${120 + index * 90}ms`,
              } as CSSProperties
            }
          >
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
