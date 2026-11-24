"use client";
/**
 * Destinations: on desktop the section pins and scrolls sideways (GSAP ScrollTrigger);
 * on mobile it becomes a native swipe carousel. Cards use an arch shape.
 * Data: site.ts -> destinations.
 */
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { Art } from "@/components/ui/Art";
import { useUI } from "@/components/providers/UIProvider";
import { money } from "@/lib/utils";

export function Destinations() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const { openBooking } = useUI();

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const t = track.current!;
      const dist = () => Math.max(0, t.scrollWidth - window.innerWidth + 80);
      gsap.to(t, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: section.current, start: "top top", end: () => `+=${dist()}`,
          pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (s) => { if (bar.current) bar.current.style.transform = `scaleX(${s.progress})`; },
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="destinations" ref={section} className="relative flex flex-col justify-center py-24 lg:h-screen lg:overflow-hidden lg:py-0">
      <div className="wrap mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="h-display text-[clamp(2.4rem,6vw,5.5rem)]">Where to next?</h2>
        <p className="max-w-sm text-muted">Six places we know by heart. Pick one and we will build the trip around you.</p>
      </div>

      <div className="no-scrollbar overflow-x-auto lg:overflow-visible">
        <div ref={track} className="flex w-max gap-5 px-5 md:px-10 lg:gap-8">
          {siteConfig.destinations.map((d) => (
            <button
              key={d.id} onClick={() => openBooking({ destination: d.id })} data-cursor="Book"
              className="group relative block h-[56vh] min-h-[380px] w-[72vw] shrink-0 overflow-hidden rounded-t-full rounded-b-3xl text-left sm:w-[44vw] lg:h-[58vh] lg:w-[26vw] lg:max-w-[430px]"
            >
              <div className="h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]">
                <Art scene={d.scene} palette={d.palette} seed={d.seed} image={d.image} alt={`${d.name}, ${d.country}`} />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-24 text-white">
                <p className="h-display text-3xl">{d.name}</p>
                <p className="h-serif text-lg text-white/85">{d.tagline}</p>
                <p className="mt-3 text-sm text-white/70">{d.country} &middot; from {money(d.from)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="wrap mt-10 hidden lg:block" aria-hidden>
        <div className="h-px w-full bg-line/15"><div ref={bar} className="h-px origin-left scale-x-0 bg-accent" /></div>
      </div>
    </section>
  );
}
