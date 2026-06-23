"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brand, stats, aboutImages } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const paragraph =
  "EL LAZINA is not a quiet café. It is a stage, a studio and a garage with an espresso machine. By day, slow coffee and softer light. By night, the room turns up — voices, strings, engines and everyone who came to feel something.";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".about-word");
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-copy",
            start: "top 75%",
            end: "top 25%",
            scrub: true,
          },
        }
      );

      gsap.from(".about-img", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });

      gsap.from(".about-stat", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40"
    >
      <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-amber">
            (Our story)
          </span>
          <p className="about-copy mt-8 font-display text-3xl leading-[1.25] md:text-[2.7rem] md:leading-[1.2]">
            {paragraph.split(" ").map((w, i) => (
              <span key={i} className="about-word inline-block">
                {w}&nbsp;
              </span>
            ))}
          </p>
        </div>

        <div className="relative">
          <div className="about-img relative aspect-[3/4] overflow-hidden rounded-sm">
            <img
              src={aboutImages.primary}
              alt="A live night at EL LAZINA"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
          <div className="about-img absolute -bottom-10 -left-8 hidden aspect-square w-40 overflow-hidden rounded-sm border-4 border-ink md:block">
            <img
              src={aboutImages.secondary}
              alt="Coffee at the bar"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="about-stats mt-28 grid grid-cols-2 gap-y-12 border-t border-line pt-14 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="about-stat">
            <div className="font-display text-5xl text-amber md:text-6xl">
              {s.value}
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
