import "./SectionHeader.css";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  level?: 1 | 2;
};

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  level = 2,
}: SectionHeaderProps) {
  const TitleTag = level === 1 ? "h1" : "h2";

  return (
    <header className={`section-header section-header--${align}`}>
      <TitleTag className="section-header__title">{title}</TitleTag>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </header>
  );
}
