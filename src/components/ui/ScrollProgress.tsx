"use client";
/** Thin progress bar at the top of the page that tracks scroll position. */
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = gsap.to(bar.current, {
      scaleX: 1, ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); ScrollTrigger.refresh(); };
  }, []);
  return <div ref={bar} aria-hidden className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left scale-x-0 bg-accent" />;
}
