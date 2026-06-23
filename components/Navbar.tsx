"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/lib/site";

const links = [
  { label: "About", href: "#about" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 320);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between px-5 py-4 transition-colors duration-500 md:px-10 ${
          scrolled
            ? "border-b border-line/70 bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <a
          href="#top"
          className="font-display text-lg tracking-[0.28em] text-cream"
        >
          {brand.name}
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-xs uppercase tracking-[0.22em] text-muted transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#reserve"
          className="group relative overflow-hidden rounded-full border border-amber/60 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-amber"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
            Reserve
          </span>
          <span className="absolute inset-0 -translate-y-full bg-amber transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
        </a>
      </div>
    </header>
  );
}
