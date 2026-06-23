"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Experiences() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const wrap = track.current?.parentElement;

    if (reduce) {
      if (wrap) {
        wrap.style.overflowX = "auto";
        wrap.style.scrollSnapType = "x mandatory";
      }
      return;
    }

    const ctx = gsap.context(() => {
      const t = track.current!;
      const distance = () => t.scrollWidth - window.innerWidth;

      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experiences"
      ref={section}
      className="relative overflow-hidden bg-ink-2"
    >
      <div className="overflow-hidden">
        <div ref={track} className="flex w-max">
          {/* intro panel */}
          <div className="flex h-[100svh] w-screen shrink-0 flex-col justify-center px-6 md:w-[60vw] md:px-20">
            <span className="text-[11px] uppercase tracking-[0.3em] text-amber">
              (What happens here)
            </span>
            <h2 className="mt-6 font-display text-6xl leading-[0.95] md:text-8xl">
              Four ways
              <br />
              the room
              <br />
              <span className="italic text-amber">comes alive.</span>
            </h2>
            <p className="mt-8 max-w-sm text-muted">
              Drag through the night — every corner of EL LAZINA has its own
              tempo. Scroll to move sideways.
            </p>
          </div>

          {experiences.map((exp) => (
            <article
              key={exp.index}
              className="group relative h-[100svh] w-screen shrink-0 overflow-hidden md:w-[46vw]"
              style={{ scrollSnapAlign: "start" }}
            >
              <img
                src={exp.image}
                alt={exp.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
              <div className="relative flex h-full flex-col justify-end p-8 md:p-12">
                <span className="font-display text-7xl text-amber/80">
                  {exp.index}
                </span>
                <h3 className="mt-3 font-display text-4xl md:text-5xl">
                  {exp.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80 md:text-base">
                  {exp.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
