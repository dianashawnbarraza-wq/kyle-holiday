import "./PlaceholderImage.css";

type PlaceholderImageProps = {
  label: string;
  aspectRatio?: "square" | "landscape" | "portrait" | "wide";
  className?: string;
};

export function PlaceholderImage({
  label,
  aspectRatio = "landscape",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      className={`placeholder-image placeholder-image--${aspectRatio} ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      <span className="placeholder-image__label">{label}</span>
    </div>
  );
}
