"use client";
/**
 * Custom cursor: a small dot that grows over interactive elements.
 * Add data-cursor="Label" to any element to show a text label inside the cursor.
 */
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const el = ref.current!;
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    const move = (e: PointerEvent) => { x(e.clientX); y(e.clientY); };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      const clickable = t?.closest("a,button,input,select,textarea,[role=button]");
      setLabel(labelled?.dataset.cursor ?? "");
      gsap.to(el, { scale: labelled ? 4.2 : clickable ? 2.4 : 1, duration: 0.35, ease: "power3.out" });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor pointer-events-none fixed left-0 top-0 z-[200] -ml-2 -mt-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent mix-blend-normal"
    >
      {label && <span className="absolute whitespace-nowrap text-[3px] font-semibold text-accent-ink">{label}</span>}
    </div>
  );
}
