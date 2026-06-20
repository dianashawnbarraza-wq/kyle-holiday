import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { navLinks, site } from "../data/site";
import "./SiteNav.css";

export function SiteNav() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const suppressActive = pathname === "/";

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    e.preventDefault();
    if (hash) {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="site-nav">
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

        <nav className="site-nav__links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `site-nav__link${
                  isActive && !suppressActive ? " site-nav__link--active" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
