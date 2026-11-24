"use client";
/**
 * Intro loader: counts to 100, lifts away, then fires the "nomada:ready" event
 * (the Hero listens for it to start its entrance). Set features.preloader=false
 * in site.ts to skip it entirely.
 */
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion } from "@/lib/utils";

const ready = () => {
  document.documentElement.dataset.ready = "true";
  window.dispatchEvent(new Event("nomada:ready"));
};

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(!siteConfig.features.preloader);

  useEffect(() => {
    if (gone || prefersReducedMotion()) { setGone(true); ready(); return; }
    window.lenis?.stop();
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => { setGone(true); window.lenis?.start(); },
    });
    tl.to(counter, { v: 100, duration: 1.6, ease: "power2.inOut", onUpdate: () => setN(Math.round(counter.v)) })
      .to(".pre-word", { yPercent: -110, duration: 0.6, ease: "power3.in" }, "+=0.1")
      .add(ready, "-=0.15")
      .to(root.current, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "<");
    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[300] flex items-end justify-between bg-accent p-6 text-accent-ink md:p-12">
      <div className="overflow-hidden">
        <p className="pre-word h-display text-[22vw] leading-[.8] md:text-[14vw]">{siteConfig.name}</p>
      </div>
      <p className="h-display pb-1 text-5xl tabular-nums md:text-8xl">{n}</p>
    </div>
  );
}
