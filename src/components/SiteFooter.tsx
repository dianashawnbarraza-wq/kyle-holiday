import { Link } from "react-router-dom";
import { site } from "../data/site";
import "./SiteFooter.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link to="/" className="site-footer__brand">
          <span className="site-footer__logo-wrap">
            <img
              src={site.logo}
              alt=""
              className="site-footer__logo"
              width={56}
              height={56}
            />
          </span>
          <span className="site-footer__name">{site.name}</span>
        </Link>

        <div className="site-footer__links">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__link"
          >
            {site.instagramHandle}
          </a>
          <a href={`mailto:${site.email}`} className="site-footer__link">
            {site.email}
          </a>
        </div>

        <p className="site-footer__copy">
          © {year} {site.name}. {site.pronouns}.
        </p>
      </div>
    </footer>
  );
}
