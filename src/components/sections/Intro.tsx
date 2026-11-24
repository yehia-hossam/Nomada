"use client";
/**
 * Statement paragraph: words light up as you scroll (scrubbed), followed by animated stats.
 * Copy: site.ts -> intro, stats.
 */
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/config/site";

export function Intro() {
  const root = useRef<HTMLElement>(null);
  const words = siteConfig.intro.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-w]", { opacity: 0.16 }, {
        opacity: 1, stagger: 0.5, ease: "none",
        scrollTrigger: { trigger: "[data-para]", start: "top 80%", end: "bottom 55%", scrub: true },
      });
      // Count-up numbers
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((n) => {
        const end = parseFloat(n.dataset.count!);
        const dec = end % 1 ? 1 : 0;
        const o = { v: 0 };
        gsap.to(o, {
          v: end, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: n, start: "top 90%", once: true },
          onUpdate: () => { n.textContent = o.v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }); },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="wrap py-28 md:py-44">
      <p data-para className="h-display max-w-6xl text-[clamp(1.7rem,3.8vw,3.6rem)] !leading-[1.12] tracking-[-0.025em]">
        {words.map((w, i) => <span key={i} data-w className="mr-[0.25em] inline-block">{w}</span>)}
      </p>

      <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {siteConfig.stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse justify-end border-t border-line/15 pt-5">
            <dt className="mt-2 max-w-[14rem] text-muted">{s.label}</dt>
            <dd className="h-display text-5xl md:text-7xl">
              <span data-count={s.value}>0</span>{s.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
