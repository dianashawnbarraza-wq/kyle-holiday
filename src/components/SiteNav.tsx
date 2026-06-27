import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { navLinks, site } from "../data/site";
import "./SiteNav.css";

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

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
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
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-nav__toggle-icon" aria-hidden="true" />
        </button>

        <nav
          id="site-nav-menu"
          className="site-nav__links"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `site-nav__link${
                  isActive && !suppressActive ? " site-nav__link--active" : ""
                }`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        type="button"
        className="site-nav__backdrop"
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </header>
  );
}
