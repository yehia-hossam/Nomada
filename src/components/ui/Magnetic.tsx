"use client";
/** Wrap any button/link: it gently follows the pointer (a very current micro-interaction). */
import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    gsap.to(ref.current, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: 0.4, ease: "power3.out" });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,.4)" });
  return (
    <span ref={ref} onPointerMove={move} onPointerLeave={leave} className="inline-block">
      {children}
    </span>
  );
}
