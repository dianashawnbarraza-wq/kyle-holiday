import "./SectionHeader.css";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  return (
    <header className={`section-header section-header--${align}`}>
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </header>
  );
}
