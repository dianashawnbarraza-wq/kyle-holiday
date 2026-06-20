import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        const nav = document.querySelector(".site-nav");
        const subnav = document.querySelector(".art-subnav");
        const offset =
          (nav?.getBoundingClientRect().height ?? 0) +
          (subnav?.getBoundingClientRect().height ?? 0) +
          16;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      return;
    }

    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}
