"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { brand } from "@/lib/site";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.5 });
      tl.from(".hero-word > span", {
        yPercent: 115,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
      })
        .from(
          ".hero-sub",
          { y: 24, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          ".hero-meta",
          { y: 16, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 },
          "-=0.6"
        )
        .from(
          ".hero-cue",
          { opacity: 0, duration: 1 },
          "-=0.4"
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* glow + vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_45%,rgba(231,169,75,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(120%_90%_at_50%_120%,rgba(10,9,8,0.9),transparent_55%)]" />

      {/* headline */}
      <div className="relative z-10 flex flex-col items-center px-5 text-center">
        <span className="hero-meta mb-7 text-[11px] uppercase tracking-[0.4em] text-amber">
          Café · Live Music · Auto Culture
        </span>

        <h1 className="font-display text-[16vw] leading-[0.86] tracking-tight md:text-[12vw] lg:text-[10.5rem]">
          <span className="hero-word display-clip">
            <span>EL</span>
          </span>{" "}
          <span className="hero-word display-clip italic text-amber">
            <span>LAZINA</span>
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-xl text-balance text-base text-muted md:text-lg">
          {brand.tagline} Open mics, live jamming, in-house production and
          weekend auto shows — over coffee that stays up as late as you do.
        </p>

        <a
          href="#experiences"
          className="hero-meta group mt-10 inline-flex items-center gap-3 rounded-full bg-cream px-7 py-3 text-xs uppercase tracking-[0.2em] text-ink"
        >
          Explore the nights
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      {/* scroll cue */}
      <div className="hero-cue absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-amber to-transparent" />
      </div>
    </section>
  );
}
