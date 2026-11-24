"use client";
/** "Why us" bento grid. Tiles and spans are controlled in site.ts -> why. */
import { siteConfig } from "@/config/site";
import { Icon, type IconName } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

// Different corner radii per tile so the grid does not look stamped from one mould.
const SHAPES = ["rounded-[2.5rem]", "rounded-3xl", "rounded-[1.25rem] rounded-tr-[3rem]", "rounded-3xl rounded-bl-[3rem]", "rounded-[2.5rem]"];
const TONES = ["bg-accent text-accent-ink", "bg-card", "bg-card", "bg-card", "border border-line/15"];

export function Why() {
  return (
    <section id="why" className="wrap py-24 md:py-36">
      <h2 className="h-display mb-12 max-w-3xl text-[clamp(2.4rem,6vw,5.5rem)]">Travel with people who pick up the phone.</h2>
      <div className="grid auto-rows-[minmax(200px,auto)] gap-4 md:grid-cols-4">
        {siteConfig.why.map((w, i) => {
          const I = Icon[w.icon as IconName];
          return (
            <div key={w.title} className={cn("group flex flex-col justify-between p-7 transition-transform duration-500 ease-out hover:-translate-y-1", SHAPES[i % SHAPES.length], TONES[i % TONES.length], w.span)}>
              <I width={30} height={30} className="transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
              <div>
                <h3 className={cn("font-semibold", i === 0 ? "h-display text-4xl md:text-5xl" : "text-xl")}>{w.title}</h3>
                <p className={cn("mt-2 max-w-sm", i === 0 ? "text-lg opacity-80" : "opacity-70")}>{w.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
