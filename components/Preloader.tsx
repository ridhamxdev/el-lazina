"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { brand } from "@/lib/site";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const barFill = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.body.style.overflow = "hidden";

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    tl.to(counter, {
      v: 100,
      duration: reduce ? 0.2 : 1.7,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.v)),
    });

    if (barFill.current) {
      tl.to(barFill.current, { scaleX: 1, duration: reduce ? 0.2 : 1.7, ease: "power2.inOut" }, 0);
    }

    tl.to(
      root.current,
      {
        yPercent: -100,
        duration: reduce ? 0 : 1,
        ease: "power4.inOut",
      },
      ">-0.1"
    );

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
    >
      <div className="overflow-hidden">
        <span className="font-display text-3xl tracking-[0.35em] text-cream md:text-4xl">
          {brand.name}
        </span>
      </div>
      <div className="mt-8 h-px w-56 overflow-hidden bg-line md:w-72">
        <span
          ref={barFill}
          className="block h-full w-full origin-left scale-x-0 bg-amber"
        />
      </div>
      <span className="mt-4 font-sans text-xs tracking-[0.3em] text-muted">
        {count.toString().padStart(3, "0")}
      </span>
    </div>
  );
}
