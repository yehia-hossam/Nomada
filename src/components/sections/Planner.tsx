"use client";
/**
 * Trip budget planner: visitors pick destination, nights, travellers and style
 * and see an animated cost estimate. Cost formula lives in `estimate()` - tweak the
 * multipliers there. Per-destination costs: site.ts -> destinations (daily, flight).
 */
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { useUI } from "@/components/providers/UIProvider";
import { cn, money } from "@/lib/utils";

const TIERS = [
  { id: "essential", label: "Essential", mult: 0.7 },
  { id: "comfort", label: "Comfort", mult: 1 },
  { id: "signature", label: "Signature", mult: 1.9 },
] as const;

function estimate(destId: string, nights: number, people: number, mult: number) {
  const d = siteConfig.destinations.find((x) => x.id === destId)!;
  const rooms = Math.ceil(people / 2);
  return [
    { label: "Flights", value: d.flight * people, tone: "bg-hot" },
    { label: "Stays", value: d.daily * 0.5 * mult * nights * rooms, tone: "bg-accent" },
    { label: "Food", value: d.daily * 0.25 * mult * nights * people, tone: "bg-fg/70" },
    { label: "Experiences", value: d.daily * 0.25 * mult * nights * people, tone: "bg-muted" },
  ];
}

/** Number that tweens to its new value whenever it changes. */
function Money({ value, className }: { value: number; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const cur = useRef({ v: 0 });
  useEffect(() => {
    const t = gsap.to(cur.current, { v: value, duration: 0.8, ease: "power3.out", onUpdate: () => { if (el.current) el.current.textContent = money(cur.current.v); } });
    return () => { t.kill(); };
  }, [value]);
  return <span ref={el} className={className}>{money(value)}</span>;
}

export function Planner() {
  const { openBooking } = useUI();
  const [dest, setDest] = useState(siteConfig.destinations[0].id);
  const [nights, setNights] = useState(7);
  const [people, setPeople] = useState(2);
  const [tier, setTier] = useState<(typeof TIERS)[number]>(TIERS[1]);

  const parts = estimate(dest, nights, people, tier.mult);
  const total = parts.reduce((a, p) => a + p.value, 0);

  const range = "h-1 w-full cursor-pointer appearance-none rounded-full bg-line/20 accent-[rgb(var(--accent))]";

  return (
    <section id="planner" className="bg-card py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-2">
        <div>
          <h2 className="h-display text-[clamp(2.4rem,5.5vw,5rem)]">What will your trip <span className="h-serif">cost?</span></h2>
          <p className="mt-5 max-w-md text-muted">Move the sliders for an honest estimate. Final prices are fixed in your plan, with no surprises later.</p>

          <div className="mt-10 grid gap-8">
            <div>
              <p className="mb-3 text-sm text-muted">Destination</p>
              <div className="flex flex-wrap gap-2">
                {siteConfig.destinations.map((d) => (
                  <button key={d.id} onClick={() => setDest(d.id)} className={cn("rounded-full border px-4 py-2 text-[15px] transition", dest === d.id ? "border-accent bg-accent text-accent-ink" : "border-line/20 hover:bg-fg/10")}>{d.name}</button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className="mb-3 flex justify-between text-sm text-muted"><span>Nights</span><span className="text-fg">{nights}</span></span>
              <input type="range" min={3} max={21} value={nights} onChange={(e) => setNights(+e.target.value)} className={range} />
            </label>
            <label className="block">
              <span className="mb-3 flex justify-between text-sm text-muted"><span>Travellers</span><span className="text-fg">{people}</span></span>
              <input type="range" min={1} max={10} value={people} onChange={(e) => setPeople(+e.target.value)} className={range} />
            </label>
            <div>
              <p className="mb-3 text-sm text-muted">Travel style</p>
              <div className="grid grid-cols-3 gap-2">
                {TIERS.map((t) => (
                  <button key={t.id} onClick={() => setTier(t)} className={cn("rounded-2xl border py-3 transition", tier.id === t.id ? "border-accent bg-accent/15" : "border-line/20 hover:bg-fg/10")}>{t.label}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="self-center rounded-[2.5rem] border border-line/15 bg-bg p-8 md:p-10">
          <p className="text-muted">Estimated total</p>
          <Money value={total} className="h-display block text-6xl md:text-8xl" />
          <p className="mt-1 text-muted">about <Money value={total / people} className="text-fg" /> per person</p>

          <div className="mt-8 flex h-3 overflow-hidden rounded-full" aria-hidden>
            {parts.map((p) => <div key={p.label} className={cn("transition-all duration-700 ease-out", p.tone)} style={{ width: `${(p.value / total) * 100}%` }} />)}
          </div>
          <ul className="mt-6 space-y-3">
            {parts.map((p) => (
              <li key={p.label} className="flex items-center justify-between border-b border-line/10 pb-3">
                <span className="flex items-center gap-3"><i className={cn("h-3 w-3 rounded-full", p.tone)} />{p.label}</span>
                <Money value={p.value} />
              </li>
            ))}
          </ul>
          <button onClick={() => openBooking({ destination: dest })} className="mt-8 w-full rounded-full bg-accent py-4 text-lg font-semibold text-accent-ink transition hover:brightness-110">Request this plan</button>
        </div>
      </div>
    </section>
  );
}
