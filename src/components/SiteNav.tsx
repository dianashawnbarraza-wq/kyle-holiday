import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { navLinks, site } from "../data/site";
import "./SiteNav.css";

function NavLinks({
  suppressActive,
  onNavigate,
  className,
  id,
}: {
  suppressActive: boolean;
  onNavigate?: () => void;
  className: string;
  id?: string;
}) {
  return (
    <nav id={id} className={className} aria-label="Main navigation">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `site-nav__link${
              isActive && !suppressActive ? " site-nav__link--active" : ""
            }`
          }
          onClick={onNavigate}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export function SiteNav() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const suppressActive = pathname === "/";

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (pathname !== "/") return;
    e.preventDefault();
    if (hash) {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggle = () => {
    setMenuOpen((open) => !open);
  };

  const mobileMenu =
    menuOpen &&
    createPortal(
      <div className="site-nav__mobile-root" role="presentation">
        <button
          type="button"
          className="site-nav__backdrop"
          aria-label="Close menu"
          onClick={closeMenu}
        />
        <div className="site-nav__mobile-panel">
          <button
            type="button"
            className="site-nav__close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <span className="site-nav__close-icon" aria-hidden="true" />
          </button>
          <NavLinks
            suppressActive={suppressActive}
            onNavigate={closeMenu}
            className="site-nav__links site-nav__links--mobile"
          />
        </div>
      </div>,
      document.body,
    );

  return (
    <header className={`site-nav${menuOpen ? " site-nav--open" : ""}`}>
      <div className="site-nav__inner">
        <NavLink to="/" className="site-nav__brand" end onClick={handleBrandClick}>
          <span className="site-nav__logo-wrap">
            <img
              src={site.logo}
              alt=""
              className="site-nav__logo"
              width={40}
              height={40}
            />
          </span>
          <span className="site-nav__name">{site.name}</span>
        </NavLink>

        <button
          type="button"
          className="site-nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={handleToggle}
        >
          <span className="site-nav__toggle-icon" aria-hidden="true" />
        </button>

        <NavLinks
          suppressActive={suppressActive}
          className="site-nav__links site-nav__links--desktop"
          id="site-nav-menu"
        />
      </div>

      {mobileMenu}
    </header>
  );
}
