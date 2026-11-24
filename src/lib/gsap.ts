"use client";
/**
 * Single place where GSAP plugins are registered.
 * Always import { gsap, ScrollTrigger } from "@/lib/gsap" - never from "gsap" directly.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
