"use client";
/**
 * Hero: big editorial headline + interactive 3D globe.
 * One orchestrated entrance (after the preloader), then a gentle scroll parallax.
 * Edit copy in src/config/site.ts -> hero.
 */
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { useUI } from "@/components/providers/UIProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { Icon } from "@/components/ui/Icons";
import { scrollToHash } from "@/lib/utils";
import { HeroScene } from "@/components/three/HeroScene";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { openBooking } = useUI();
  const h = siteConfig.hero;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-word]", { yPercent: 115 });
      gsap.set("[data-fade]", { opacity: 0, y: 20 });
      const play = () => {
        gsap.to("[data-word]", { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.07 });
        gsap.to("[data-fade]", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.5 });
      };
      if (document.documentElement.dataset.ready === "true") play();
      else window.addEventListener("nomada:ready", play, { once: true });

      // Headline drifts up slower than the page for depth.
      gsap.to("[data-title]", { yPercent: -14, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32 md:pb-20">
      <HeroScene className="absolute inset-0 z-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />

      <div className="wrap relative z-10">
        <h1 data-title className="h-display text-[clamp(3rem,10.5vw,10.5rem)]">
          {h.lines.map((line, i) => (
            <span key={i} className={`block ${line.serif ? "h-serif" : ""}`}>
              {line.text.split(" ").map((w, j) => (
                <span key={j} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span data-word className="inline-block">{w}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-md">
            <p data-fade className="text-lg text-fg/80">{h.sub}</p>
            <div data-fade className="mt-7 flex flex-wrap gap-3">
              <Magnetic>
                <button onClick={() => openBooking()} className="flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-semibold text-accent-ink transition hover:brightness-110">
                  {h.cta} <Icon.arrow width={18} height={18} />
                </button>
              </Magnetic>
              <button onClick={() => scrollToHash("#destinations")} className="rounded-full border border-line/25 px-7 py-4 font-semibold transition hover:bg-fg/10">{h.cta2}</button>
            </div>
          </div>

          {/* Rotating text badge */}
          <div data-fade className="relative hidden h-32 w-32 shrink-0 md:block" aria-hidden>
            <svg viewBox="0 0 120 120" className="h-full w-full animate-[spin_18s_linear_infinite]">
              <defs><path id="circ" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
              <text fontSize="10.5" fill="currentColor" letterSpacing="1.2"><textPath href="#circ">{h.badge}</textPath></text>
            </svg>
            <Icon.star className="absolute inset-0 m-auto h-6 w-6 text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
