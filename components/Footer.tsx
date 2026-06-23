"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brand } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reserve-line > span", {
        yPercent: 115,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".reserve-line", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} id="reserve" className="relative bg-ink">
      {/* CTA */}
      <div className="mx-auto max-w-7xl px-5 py-32 text-center md:px-10 md:py-48">
        <span className="text-[11px] uppercase tracking-[0.3em] text-amber">
          (Reserve a table)
        </span>
        <h2 className="mt-8 font-display text-[15vw] leading-[0.86] md:text-[10rem]">
          <span className="reveal-line reserve-line">
            <span>Save your</span>
          </span>
          <span className="reveal-line reserve-line italic text-amber">
            <span>seat tonight.</span>
          </span>
        </h2>

        <a
          href={`mailto:${brand.email}`}
          className="group mt-12 inline-flex items-center gap-3 rounded-full bg-amber px-9 py-4 text-sm uppercase tracking-[0.2em] text-ink"
        >
          Book a table
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      {/* footer grid */}
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-10">
          <div className="md:col-span-2">
            <div className="font-display text-3xl tracking-[0.2em]">
              {brand.name}
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              {brand.tagline} Coffee, culture and horsepower under one roof.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-muted">
              Visit
            </h4>
            <p className="mt-4 text-sm text-cream/90">{brand.address}</p>
            <p className="mt-1 text-sm text-muted">{brand.city}</p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-muted">
              Connect
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`mailto:${brand.email}`} className="link-underline text-cream/90">
                  {brand.email}
                </a>
              </li>
              <li>
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="link-underline text-cream/90">
                  {brand.phone}
                </a>
              </li>
              <li className="flex gap-4 pt-2 text-muted">
                <a href="#" className="hover:text-amber">Instagram</a>
                <a href="#" className="hover:text-amber">YouTube</a>
                <a href="#" className="hover:text-amber">Spotify</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-[11px] uppercase tracking-[0.18em] text-muted md:flex-row md:items-center md:justify-between md:px-10">
          <span>© {brand.name} — All nights reserved.</span>
          <span>Demo concept · Crafted with care</span>
        </div>
      </div>
    </footer>
  );
}
