"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gal-item").forEach((el, i) => {
        const img = el.querySelector("img");
        gsap.fromTo(
          img,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          delay: (i % 2) * 0.08,
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={root}
      className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mb-14 flex items-end justify-between">
        <h2 className="font-display text-5xl md:text-7xl">
          The <span className="italic text-amber">scene</span>
        </h2>
        <span className="hidden text-xs uppercase tracking-[0.25em] text-muted md:block">
          (Moments / EL LAZINA)
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {gallery.map((g, i) => (
          <figure
            key={i}
            className={`gal-item relative overflow-hidden rounded-sm ${
              g.tall ? "row-span-2 aspect-[3/4]" : "aspect-square"
            }`}
          >
            <img
              src={g.src}
              alt={g.label}
              loading="lazy"
              className="h-[124%] w-full object-cover"
            />
            <figcaption className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.25em] text-cream/85">
              {g.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
