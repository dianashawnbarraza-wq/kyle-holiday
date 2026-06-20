import { artSubNav } from "../data/art";
import "./ArtSubNav.css";

export function ArtSubNav() {
  return (
    <nav className="art-subnav" aria-label="Art categories">
      <ul className="art-subnav__list">
        {artSubNav.map((item) => (
          <li key={item.id}>
            <a href={item.href} className="art-subnav__link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
