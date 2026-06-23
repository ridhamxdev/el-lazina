"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { events } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".event-row", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);

    const xTo = gsap.quickTo(preview.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(preview.current, "y", { duration: 0.5, ease: "power3" });
    const move = (e: MouseEvent) => {
      xTo(e.clientX + 24);
      yTo(e.clientY - 120);
    };
    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="events"
      ref={root}
      className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-5xl md:text-7xl">
          Upcoming <span className="italic text-amber">nights</span>
        </h2>
        <p className="max-w-xs text-sm text-muted">
          Walk in or reserve ahead. Doors at 7, the good stuff starts late.
        </p>
      </div>

      <div className="border-t border-line">
        {events.map((e, i) => (
          <a
            key={e.title}
            href="#reserve"
            className="event-row group flex items-center gap-4 border-b border-line py-7 transition-colors hover:bg-surface/40 md:gap-10 md:py-9"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <span className="w-20 shrink-0 font-display text-lg text-amber md:w-28 md:text-2xl">
              {e.date}
            </span>
            <span className="hidden w-24 shrink-0 text-xs uppercase tracking-[0.2em] text-muted md:block">
              {e.day}
            </span>
            <span className="flex-1 font-display text-2xl transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-4xl">
              {e.title}
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.2em] text-muted md:block">
              {e.kind}
            </span>
            <span className="text-amber transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </a>
        ))}
      </div>

      {/* floating preview */}
      <div
        ref={preview}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-48 w-64 overflow-hidden rounded-sm md:block"
        style={{
          opacity: active !== null ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      >
        {events.map((e, i) => (
          <img
            key={e.title}
            src={e.image}
            alt={e.title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: active === i ? 1 : 0, transition: "opacity 0.3s" }}
          />
        ))}
      </div>
    </section>
  );
}
