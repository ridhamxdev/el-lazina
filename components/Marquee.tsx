"use client";

import { marqueeWords } from "@/lib/site";

export default function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];

  return (
    <section className="relative border-y border-line bg-ink-2 py-8">
      <div className="edge-fade-x overflow-hidden">
        <div className="marquee">
          {row.map((w, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-8 font-display text-3xl text-cream md:text-5xl"
            >
              {w}
              <span className="text-amber">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
