"use client";
/**
 * Stays: filterable grid with a save-to-wishlist heart and a subtle 3D tilt on hover.
 * Filtering re-animates the grid (motion answers the visitor's click).
 * Data: site.ts -> stays.
 */
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { siteConfig, type Stay } from "@/config/site";
import { Art } from "@/components/ui/Art";
import { Icon } from "@/components/ui/Icons";
import { useUI } from "@/components/providers/UIProvider";
import { cn, money } from "@/lib/utils";

const FILTERS = ["All", "Villa", "Cabin", "City", "Beach"] as const;

function StayCard({ s }: { s: Stay }) {
  const { wishlist, toggleWish, openBooking } = useUI();
  const ref = useRef<HTMLDivElement>(null);
  const saved = wishlist.includes(s.id);

  const tilt = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
  };
  const reset = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });

  return (
    <article data-stay className="group">
      <div ref={ref} onPointerMove={tilt} onPointerLeave={reset} className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] will-change-transform">
        <button onClick={() => openBooking()} data-cursor="Book" aria-label={`Request ${s.name}`} className="block h-full w-full">
          <Art scene={s.scene} palette={s.palette} seed={s.seed} image={s.image} alt={s.name} />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-3 py-1 text-xs font-medium backdrop-blur">{s.type}</span>
        <button
          onClick={() => toggleWish(s.id)} aria-pressed={saved} aria-label={saved ? "Remove from saved" : "Save stay"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-bg/80 backdrop-blur transition hover:scale-110"
        >
          <Icon.heart width={18} height={18} className={cn("transition", saved && "fill-hot stroke-hot")} />
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{s.name}</h3>
          <p className="text-sm text-muted">{s.area}</p>
        </div>
        <p className="flex items-center gap-1 text-sm"><Icon.star width={14} height={14} className="text-accent" />{s.rating.toFixed(1)}<span className="text-muted">({s.reviews})</span></p>
      </div>
      <p className="mt-1 text-[15px]"><span className="font-semibold">{money(s.price)}</span> <span className="text-muted">per night</span></p>
    </article>
  );
}

export function Stays() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const grid = useRef<HTMLDivElement>(null);
  const list = siteConfig.stays.filter((s) => filter === "All" || s.type === filter);

  // Re-animate cards whenever the filter changes.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-stay]", { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.07 });
    }, grid);
    return () => ctx.revert();
  }, [filter]);

  return (
    <section id="stays" className="wrap py-24 md:py-36">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="h-display text-[clamp(2.4rem,6vw,5.5rem)]">Stays worth <span className="h-serif">the flight</span></h2>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter stays">
          {FILTERS.map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
              className={cn("rounded-full border px-5 py-2 text-[15px] transition", filter === f ? "border-accent bg-accent text-accent-ink" : "border-line/20 hover:bg-fg/10")}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div ref={grid} className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((s) => <StayCard key={s.id} s={s} />)}
      </div>
    </section>
  );
}
