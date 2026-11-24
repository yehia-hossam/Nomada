"use client";
/** FAQ accordion (CSS grid-rows animation, no JS measuring). Data: site.ts -> faqs. */
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="wrap grid gap-12 py-24 md:py-36 lg:grid-cols-[1fr_1.6fr]">
      <h2 className="h-display text-[clamp(2.4rem,5vw,4.5rem)]">Good questions, straight answers.</h2>
      <div>
        {siteConfig.faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-line/15">
              <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-medium">
                {f.q}
                <Icon.plus className={cn("shrink-0 transition-transform duration-500", isOpen && "rotate-[135deg] text-accent")} />
              </button>
              <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <p className="overflow-hidden text-muted"><span className="block max-w-2xl pb-6">{f.a}</span></p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
