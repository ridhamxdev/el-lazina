"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3" });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

    const move = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const grow = () =>
      gsap.to(ring.current, { scale: 1.9, opacity: 0.6, duration: 0.3 });
    const shrink = () =>
      gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3 });

    window.addEventListener("mousemove", move);
    const targets = document.querySelectorAll(
      "a, button, [data-cursor]"
    );
    targets.forEach((t) => {
      t.addEventListener("mouseenter", grow);
      t.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", grow);
        t.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="cursor-ring"
        style={{ marginLeft: -21, marginTop: -21 }}
      />
      <div
        ref={dot}
        className="cursor-dot"
        style={{ marginLeft: -3.5, marginTop: -3.5 }}
      />
    </>
  );
}
