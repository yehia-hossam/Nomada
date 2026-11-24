import clsx, { type ClassValue } from "clsx";

/** Merge conditional class names. */
export const cn = (...v: ClassValue[]) => clsx(v);

/** Format a number as USD (change currency in one place). */
export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

/** True when the visitor prefers reduced motion - animations should be skipped. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth-scroll to a #hash target (uses Lenis when available). */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.lenis) window.lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}
