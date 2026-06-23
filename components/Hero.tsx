"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { brand, heroSlides } from "@/lib/site";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // crossfade slideshow
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % heroSlides.length),
      4200
    );
    return () => clearInterval(id);
  }, []);

  // headline reveal (starts after preloader)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.5 });
      tl.from(".hero-line > span", {
        yPercent: 120,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
      })
        .from(
          ".hero-fade",
          { y: 22, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 },
          "-=0.5"
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* slideshow */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((s, i) => (
          <div
            key={s.src}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <img
              src={s.src}
              alt={s.label}
              className="h-full w-full object-cover transition-transform ease-out"
              style={{
                transitionDuration: "6500ms",
                transform: i === active ? "scale(1.12)" : "scale(1)",
              }}
            />
          </div>
        ))}
      </div>

      {/* floating embers (3D) */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-70 mix-blend-screen">
        <ParticleField />
      </div>

      {/* overlays */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-ink via-ink/35 to-ink/55" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(10,9,8,0.75),transparent_55%)]" />

      {/* slide indicators */}
      <div className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-end gap-3 md:right-10 md:flex">
        {heroSlides.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setActive(i)}
            className="group flex items-center gap-3"
            aria-label={s.label}
          >
            <span
              className={`text-[10px] uppercase tracking-[0.22em] transition-colors ${
                i === active ? "text-amber" : "text-cream/40"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-px transition-all duration-500 ${
                i === active ? "w-10 bg-amber" : "w-5 bg-cream/30"
              }`}
            />
          </button>
        ))}
      </div>

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-14 md:px-10 md:pb-20">
        <span className="hero-fade mb-5 block text-[11px] uppercase tracking-[0.4em] text-amber">
          Café · Live Music · Auto Culture
        </span>

        <h1 className="font-display text-[19vw] leading-[0.82] tracking-tight md:text-[13vw] lg:text-[12rem]">
          <span className="reveal-line hero-line">
            <span>EL</span>
          </span>
          <span className="reveal-line hero-line -mt-2 italic text-amber md:-mt-6">
            <span>Lazina</span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-balance text-base text-cream/80 md:text-lg">
            {brand.tagline} Open mics, live jamming, in-house production and
            weekend auto shows — over coffee that stays up as late as you do.
          </p>

          <a
            href="#experiences"
            className="hero-fade group inline-flex items-center gap-3 self-start rounded-full bg-cream px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-ink md:self-auto"
          >
            Explore the nights
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
