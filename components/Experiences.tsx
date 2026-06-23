"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Experiences() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-head", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-head", start: "top 82%" },
      });
      gsap.from(".exp-row", {
        y: 36,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-list", start: "top 78%" },
      });
      gsap.from(".exp-panel", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-panel", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experiences"
      ref={root}
      className="relative bg-ink-2 py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="exp-head flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
            Four ways the room
            <br />
            <span className="italic text-amber">comes alive.</span>
          </h2>
          <p className="max-w-xs text-sm text-muted">
            One roof, four tempos. Hover a night to step inside it.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* list */}
          <ul className="exp-list flex flex-col">
            {experiences.map((exp, i) => (
              <li key={exp.index}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="exp-row group flex w-full items-center gap-5 border-b border-line py-7 text-left md:py-8"
                >
                  <span
                    className={`font-mono text-xs transition-colors ${
                      active === i ? "text-amber" : "text-muted"
                    }`}
                  >
                    {exp.index}
                  </span>
                  <span
                    className={`font-display text-3xl transition-all duration-500 md:text-5xl ${
                      active === i
                        ? "translate-x-2 text-cream"
                        : "text-cream/45"
                    }`}
                  >
                    {exp.title}
                  </span>
                  <span
                    className={`ml-auto text-amber transition-all duration-500 ${
                      active === i
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-3 opacity-0"
                    }`}
                  >
                    →
                  </span>
                </button>

                {/* mobile inline image */}
                <div className="overflow-hidden lg:hidden">
                  <div className="relative my-4 aspect-[4/3] overflow-hidden rounded-sm">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  </div>
                  <p className="mb-2 text-sm leading-relaxed text-muted">
                    {exp.blurb}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* sticky preview (desktop) */}
          <div className="exp-panel relative hidden lg:block">
            <div className="sticky top-24 aspect-[4/5] overflow-hidden rounded-sm">
              {experiences.map((exp, i) => (
                <img
                  key={exp.index}
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "scale(1)" : "scale(1.08)",
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-9">
                <span className="font-display text-6xl text-amber/80">
                  {experiences[active].index}
                </span>
                <h3 className="mt-2 font-display text-4xl">
                  {experiences[active].title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/80">
                  {experiences[active].blurb}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
