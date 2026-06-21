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
};

export function CTAButton({
  children,
  to,
  href,
  variant = "primary",
  external = false,
  className = "",
}: CTAButtonProps) {
  const classes = `cta-btn cta-btn--${variant} ${className}`.trim();

  const opensInNewTab =
    external ||
    (typeof href === "string" &&
      (href.startsWith("http://") || href.startsWith("https://")));

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
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
        {children}
      </a>
    );
  }

  return <span className={classes}>{children}</span>;
}
