import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./CTAButton.css";

type CTAButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
  badge?: string;
};

export function CTAButton({
  children,
  to,
  href,
  variant = "primary",
  external = false,
  className = "",
  badge,
}: CTAButtonProps) {
  const classes = `cta-btn cta-btn--${variant} ${className}`.trim();
  const content = (
    <>
      {children}
      {badge ? <span className="cta-btn__badge">{badge}</span> : null}
    </>
  );

  const opensInNewTab =
    external ||
    (typeof href === "string" &&
      (href.startsWith("http://") || href.startsWith("https://")));

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={opensInNewTab ? "_blank" : undefined}
        rel={opensInNewTab ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return <span className={classes}>{content}</span>;
}
