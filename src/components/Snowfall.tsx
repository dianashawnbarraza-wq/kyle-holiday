import { useMemo } from "react";
import "./Snowfall.css";

const FLAKE_COUNT = 80;
const GLYPHS = ["❄", "❅", "✻", "✦"];

function makeFlakes() {
  return Array.from({ length: FLAKE_COUNT }, (_, index) => {
    const seed = (index * 9301 + 49297) % 233280;
    const rand = seed / 233280;
    const rand2 = ((index * 49297 + 9301) % 233280) / 233280;
    const rand3 = ((index * 13579 + 24680) % 233280) / 233280;
    const isGlyph = index % 6 === 0;

    return {
      id: index,
      left: `${rand * 100}%`,
      size: isGlyph ? 10 + rand2 * 14 : 2 + rand2 * 6,
      duration: 9 + rand3 * 16,
      delay: -(rand * 22),
      drift: `${(rand2 - 0.5) * 120}px`,
      opacity: 0.35 + rand3 * 0.55,
      blur: isGlyph ? 0 : rand * 1.4,
      glyph: isGlyph ? GLYPHS[index % GLYPHS.length] : "",
      restTop: `${rand3 * 90}%`,
    };
  });
}

export function Snowfall() {
  const flakes = useMemo(makeFlakes, []);

  return (
    <div className="snowfall" aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className={
            flake.glyph ? "snowfall__flake snowfall__flake--glyph" : "snowfall__flake"
          }
          style={
            {
              "--left": flake.left,
              "--size": `${flake.size}px`,
              "--duration": `${flake.duration}s`,
              "--delay": `${flake.delay}s`,
              "--drift": flake.drift,
              "--opacity": flake.opacity,
              "--blur": `${flake.blur}px`,
              "--rest-top": flake.restTop,
            } as React.CSSProperties
          }
        >
          {flake.glyph}
        </span>
      ))}
    </div>
  );
}
