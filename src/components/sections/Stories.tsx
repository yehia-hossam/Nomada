"use client";
/** Testimonials slider with auto-advance (pauses on hover). Data: site.ts -> testimonials. */
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function Stories() {
  const items = siteConfig.testimonials;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  const go = (d: number) => setI((n) => (n + d + items.length) % items.length);

  return (
    <section id="stories" className="wrap py-24 md:py-40" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative min-h-[300px] md:min-h-[360px]">
        {items.map((t, k) => (
          <figure key={t.name} aria-hidden={k !== i}
            className={cn("absolute inset-0 transition-all duration-700 ease-out", k === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0")}>
            <blockquote className="h-serif max-w-5xl text-[clamp(1.9rem,4.6vw,4.4rem)] leading-[1.1]">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-8 text-lg">{t.name}<span className="text-muted"> on {t.trip}</span></figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button onClick={() => go(-1)} aria-label="Previous story" className="flex h-12 w-12 items-center justify-center rounded-full border border-line/20 transition hover:bg-fg/10"><Icon.arrow className="rotate-180" /></button>
        <button onClick={() => go(1)} aria-label="Next story" className="flex h-12 w-12 items-center justify-center rounded-full border border-line/20 transition hover:bg-fg/10"><Icon.arrow /></button>
        <div className="ml-4 flex gap-2" aria-hidden>
          {items.map((_, k) => <i key={k} className={cn("h-1.5 rounded-full transition-all duration-500", k === i ? "w-10 bg-accent" : "w-3 bg-line/25")} />)}
        </div>
      </div>
    </section>
  );
}
