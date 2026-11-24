"use client";
/**
 * Infinite destination ticker. Speeds up (and reverses) with scroll velocity.
 */
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { siteConfig } from "@/config/site";

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current!;
    const loop = gsap.to(el, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 5);
        loop.timeScale(self.direction === 1 ? boost : -boost);
        gsap.to(loop, { timeScale: self.direction === 1 ? 1 : -1, duration: 0.9, overwrite: true, delay: 0.1 });
      },
    });
    return () => { loop.kill(); st.kill(); };
  }, []);

  const names = [...siteConfig.destinations.map((d) => d.name), ...siteConfig.destinations.map((d) => d.name)];
  return (
    <div className="overflow-hidden border-y border-line/10 py-6" aria-hidden>
      <div ref={track} className="flex w-max whitespace-nowrap">
        {[...names, ...names].map((n, i) => (
          <span key={i} className={`mx-6 text-5xl md:text-7xl ${i % 2 ? "h-serif" : "h-display"}`}>
            {n}
            <span className="ml-12 inline-block h-3 w-3 rounded-full bg-accent align-middle" />
          </span>
        ))}
      </div>
    </div>
  );
}
