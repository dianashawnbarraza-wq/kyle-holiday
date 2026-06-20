import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import type { GalleryImage } from "../data/gallery";
import "./GalleryLightbox.css";

type GalleryLightboxProps = {
  images: GalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

export function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onChangeIndex,
}: GalleryLightboxProps) {
  const isOpen = activeIndex !== null;
  const image = activeIndex !== null ? images[activeIndex] : null;
  const total = images.length;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onChangeIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, onChangeIndex, total]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onChangeIndex((activeIndex + 1) % total);
  }, [activeIndex, onChangeIndex, total]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  if (!isOpen || !image) return null;

  return createPortal(
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      onClick={onClose}
    >
      <div
        className="gallery-lightbox__panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="gallery-lightbox__close"
          onClick={onClose}
          aria-label="Close gallery"
        >
          ×
        </button>

        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--prev"
          onClick={goPrev}
          aria-label="Previous photo"
        >
          ‹
        </button>

        <figure className="gallery-lightbox__figure">
          <img
            src={image.src}
            alt={image.alt}
            className="gallery-lightbox__image"
          />
          <figcaption className="gallery-lightbox__caption">
            {image.caption && (
              <span className="gallery-lightbox__caption-text">
                {image.caption}
              </span>
            )}
            <span className="gallery-lightbox__counter">
              {activeIndex + 1} / {total}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          className="gallery-lightbox__nav gallery-lightbox__nav--next"
          onClick={goNext}
          aria-label="Next photo"
        >
          ›
        </button>
      </div>
    </div>,
    document.body,
  );
}
