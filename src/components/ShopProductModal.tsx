import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  type CartItem,
  type EngravingFillId,
  type ShopColor,
  type ShopFont,
  type ShopStyle,
  DOUBLE_SIDED_UPCHARGE_CENTS,
  MAX_ENGRAVING_LENGTH,
  engravingFills,
  formatUsd,
  getColor,
  itemUnitPrice,
  sanitizeEngraving,
  shopColors,
  shopFonts,
  styleGallery,
} from "../data/shop";
import "./ShopProductModal.css";

type ShopProductModalProps = {
  style: ShopStyle;
  remaining: number;
  onClose: () => void;
  onAdd: (item: Omit<CartItem, "id">) => void;
};

export function ShopProductModal({
  style,
  remaining,
  onClose,
  onAdd,
}: ShopProductModalProps) {
  const photos = useMemo(() => styleGallery(style), [style]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoFlipping, setPhotoFlipping] = useState(false);
  const flipTimer = useRef<number>(0);
  const [sizeId, setSizeId] = useState(style.sizes[0].id);
  const [colorId, setColorId] = useState<string | null>(null);
  const [engravingColorId, setEngravingColorId] =
    useState<EngravingFillId | null>(null);
  const [fontId, setFontId] = useState<ShopFont["id"]>("old-english");
  const [backFontId, setBackFontId] = useState<ShopFont["id"]>("old-english");
  const [sides, setSides] = useState<1 | 2>(1);
  const [engraving, setEngraving] = useState("");
  const [backEngraving, setBackEngraving] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const maxQuantity = Math.max(1, Math.min(10, remaining));
  const bagFull = remaining < 1;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (sides === 2 && colorId) {
      const color = shopColors.find((option) => option.id === colorId);
      if (color && !color.allowsDoubleSided) {
        setColorId(null);
      }
    }
  }, [sides, colorId]);

  useEffect(() => {
    const color = colorId ? getColor(colorId) : undefined;
    if (!color) {
      setEngravingColorId(null);
      return;
    }
    setEngravingColorId((current) => {
      if (current && color.engravingFills.includes(current)) return current;
      if (color.engravingFills.length === 1) return color.engravingFills[0];
      return null;
    });
  }, [colorId]);

  useEffect(() => {
    return () => window.clearTimeout(flipTimer.current);
  }, []);

  const activePhoto = photos[photoIndex];

  function showPhoto(index: number, flip: boolean) {
    if (index < 0 || index === photoIndex) return;
    window.clearTimeout(flipTimer.current);
    if (!flip) {
      setPhotoFlipping(false);
      setPhotoIndex(index);
      return;
    }
    setPhotoFlipping(true);
    flipTimer.current = window.setTimeout(() => {
      setPhotoIndex(index);
      flipTimer.current = window.setTimeout(() => {
        setPhotoFlipping(false);
      }, 300);
    }, 260);
  }

  function selectColor(color: ShopColor, disabled: boolean) {
    if (disabled) return;
    setColorId(color.id);
    const match = photos.findIndex((photo) => photo.colorId === color.id);
    if (match >= 0) showPhoto(match, true);
  }

  const previewPrice = itemUnitPrice({
    styleId: style.id,
    sizeId,
    sides: style.allowsSides ? sides : 1,
  });

  function add() {
    if (bagFull) {
      setError("Your sack is full.");
      return;
    }

    if (style.kind !== "tag") {
      onAdd({
        styleId: style.id,
        sizeId,
        quantity,
      });
      return;
    }

    const front = sanitizeEngraving(engraving);
    const back = sanitizeEngraving(backEngraving);
    const color = colorId
      ? shopColors.find((option) => option.id === colorId)
      : undefined;

    if (!color) {
      setError("Choose a color.");
      return;
    }
    if (sides === 2 && !color.allowsDoubleSided) {
      setError("That color can't be engraved on both sides.");
      return;
    }
    if (
      !engravingColorId ||
      !color.engravingFills.includes(engravingColorId)
    ) {
      setError("Choose an engraving color.");
      return;
    }
    if (!front) {
      setError("Add engraving text.");
      return;
    }
    if (sides === 2 && !back) {
      setError("Two-sided tags need text on the back too.");
      return;
    }

    onAdd({
      styleId: style.id,
      sizeId,
      colorId: color.id,
      engravingColorId,
      fontId,
      backFontId: sides === 2 ? backFontId : undefined,
      sides: style.allowsSides ? sides : 1,
      engraving: front,
      backEngraving: sides === 2 ? back : undefined,
      quantity,
    });
  }

  return (
    <div className="shop-modal" role="dialog" aria-modal="true" aria-labelledby="shop-modal-title">
      <div className="shop-modal__sheet">
        <header className="shop-modal__header">
          <div>
            <p className="shop-modal__kicker">{style.caption}</p>
            <h2 id="shop-modal-title" className="shop-modal__title">
              {style.title}
            </h2>
          </div>
          <button
            type="button"
            className="shop-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="shop-modal__layout">
          <div className="shop-modal__gallery">
            <div className="shop-modal__photo-stage">
              <div
                className={`shop-modal__photo-card${
                  photoFlipping ? " shop-modal__photo-card--flip" : ""
                }`}
              >
                <img
                  src={activePhoto?.src}
                  alt={
                    activePhoto?.label
                      ? `${activePhoto.label} ${style.alt}`
                      : style.alt
                  }
                  className="shop-modal__photo"
                />
                {activePhoto?.label && (
                  <span className="shop-modal__photo-label">
                    {activePhoto.label}
                  </span>
                )}
              </div>
            </div>
            {photos.length > 1 && (
              <div className="shop-modal__thumbs">
                {photos.map((photo, index) => (
                  <button
                    key={photo.src}
                    type="button"
                    className={`shop-modal__thumb${
                      index === photoIndex ? " shop-modal__thumb--active" : ""
                    }`}
                    onClick={() => showPhoto(index, false)}
                    aria-label={
                      photo.label
                        ? `${photo.label} photo`
                        : `Photo ${index + 1}`
                    }
                  >
                    <img src={photo.src} alt="" />
                    {photo.label && (
                      <span className="shop-modal__thumb-label">
                        {photo.label}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="shop-modal__form">
            {(style.kind === "shirt" ||
              (style.kind === "tag" && style.sizes.length > 0)) && (
              <fieldset className="shop-field">
                <legend className="shop-field__label">Size</legend>
                <div className="shop-picks">
                  {style.sizes.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      className={`shop-pick${
                        size.id === sizeId ? " shop-pick--active" : ""
                      }`}
                      aria-pressed={size.id === sizeId}
                      onClick={() => setSizeId(size.id)}
                    >
                      {size.name}
                      {size.priceCents
                        ? ` · ${formatUsd(size.priceCents)}`
                        : ""}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {style.allowsSides && (
              <fieldset className="shop-field">
                <legend className="shop-field__label">Sides</legend>
                <div className="shop-picks">
                  <button
                    type="button"
                    className={`shop-pick${
                      sides === 1 ? " shop-pick--active" : ""
                    }`}
                    aria-pressed={sides === 1}
                    onClick={() => setSides(1)}
                  >
                    One side
                  </button>
                  <button
                    type="button"
                    className={`shop-pick${
                      sides === 2 ? " shop-pick--active" : ""
                    }`}
                    aria-pressed={sides === 2}
                    onClick={() => setSides(2)}
                  >
                    Two sides · +{formatUsd(DOUBLE_SIDED_UPCHARGE_CENTS)}
                  </button>
                </div>
                {sides === 2 && (
                  <p className="shop-field__hint shop-field__hint--left">
                    Two-sided engraving works on opaque colors only.
                  </p>
                )}
              </fieldset>
            )}

            {style.allowsFont && (
              <fieldset className="shop-field">
                <legend className="shop-field__label">
                  {sides === 2 ? "Front font" : "Font"}
                </legend>
                <div className="shop-picks">
                  {shopFonts.map((font) => (
                    <button
                      key={font.id}
                      type="button"
                      className={`shop-pick${
                        font.id === fontId ? " shop-pick--active" : ""
                      }`}
                      aria-pressed={font.id === fontId}
                      onClick={() => setFontId(font.id)}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {style.allowsFont && sides === 2 && (
              <fieldset className="shop-field">
                <legend className="shop-field__label">Back font</legend>
                <div className="shop-picks">
                  {shopFonts.map((font) => (
                    <button
                      key={font.id}
                      type="button"
                      className={`shop-pick${
                        font.id === backFontId ? " shop-pick--active" : ""
                      }`}
                      aria-pressed={font.id === backFontId}
                      onClick={() => setBackFontId(font.id)}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {style.allowsColor && (
              <fieldset className="shop-field">
                <legend className="shop-field__label">Color</legend>
                <div className="shop-colors">
                  {shopColors.map((color) => {
                    const disabled =
                      sides === 2 && !color.allowsDoubleSided;
                    return (
                      <button
                        key={color.id}
                        type="button"
                        className={`shop-color${
                          color.id === colorId ? " shop-color--active" : ""
                        }${disabled ? " shop-color--disabled" : ""}`}
                        aria-pressed={color.id === colorId}
                        aria-disabled={disabled}
                        disabled={disabled}
                        aria-label={color.name}
                        title={
                          disabled
                            ? `${color.name} isn't available for two-sided tags`
                            : color.name
                        }
                        style={{ "--swatch": color.hex } as CSSProperties}
                        onClick={() => selectColor(color, disabled)}
                      >
                        <span className="shop-color__dot" />
                        <span className="shop-color__name">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {style.allowsEngraving && style.allowsColor && (
              <fieldset className="shop-field">
                <legend className="shop-field__label">Engraving color</legend>
                {colorId ? (
                  <div className="shop-colors">
                    {engravingFills
                      .filter((fill) =>
                        getColor(colorId)?.engravingFills.includes(fill.id),
                      )
                      .map((fill) => (
                        <button
                          key={fill.id}
                          type="button"
                          className={`shop-color${
                            fill.id === engravingColorId
                              ? " shop-color--active"
                              : ""
                          }`}
                          aria-pressed={fill.id === engravingColorId}
                          aria-label={fill.name}
                          style={{ "--swatch": fill.hex } as CSSProperties}
                          onClick={() => setEngravingColorId(fill.id)}
                        >
                          <span className="shop-color__dot" />
                          <span className="shop-color__name">{fill.name}</span>
                        </button>
                      ))}
                  </div>
                ) : (
                  <p className="shop-field__hint shop-field__hint--left">
                    Pick a tag color first.
                  </p>
                )}
              </fieldset>
            )}

            {style.allowsEngraving && (
              <>
                <label className="shop-field">
                  <span className="shop-field__label">
                    {sides === 2 ? "Front engraving" : "Engraving"}
                  </span>
                  <input
                    className="shop-input"
                    value={engraving}
                    maxLength={MAX_ENGRAVING_LENGTH}
                    placeholder="BRAT"
                    onChange={(event) => setEngraving(event.target.value)}
                  />
                  <span className="shop-field__hint">
                    {engraving.length}/{MAX_ENGRAVING_LENGTH}
                  </span>
                </label>

                {sides === 2 && (
                  <label className="shop-field">
                    <span className="shop-field__label">Back engraving</span>
                    <input
                      className="shop-input"
                      value={backEngraving}
                      maxLength={MAX_ENGRAVING_LENGTH}
                      placeholder="good pup"
                      onChange={(event) =>
                        setBackEngraving(event.target.value)
                      }
                    />
                  </label>
                )}
              </>
            )}

          </div>
        </div>
      </div>

      <div className="shop-modal__cta">
        {error && (
          <p className="shop-bag__error" role="alert">
            {error}
          </p>
        )}
        <div className="shop-modal__bar">
          <div className="shop-modal__qty">
            <span className="shop-modal__qty-label">Qty</span>
            <div className="shop-qty">
              <button
                type="button"
                aria-label="Remove one"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label="Add one"
                onClick={() =>
                  setQuantity((current) => Math.min(maxQuantity, current + 1))
                }
              >
                +
              </button>
            </div>
          </div>
          <button
            type="button"
            className="cta-btn cta-btn--primary shop-modal__add"
            onClick={add}
            disabled={bagFull}
          >
            Add to sack · {formatUsd(previewPrice * quantity)}
          </button>
        </div>
      </div>
    </div>
  );
}
