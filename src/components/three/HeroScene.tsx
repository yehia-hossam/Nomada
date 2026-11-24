"use client";
/**
 * Interactive 3D globe (Three.js, no extra libraries).
 *  - Dotted sphere + orbit rings, pins for every destination in site.ts, glowing arcs between them.
 *  - Reacts to pointer and scroll, pauses when off-screen, recolours when the theme changes.
 *  - Falls back silently (renders nothing) if WebGL is unavailable.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { siteConfig } from "@/config/site";
import { prefersReducedMotion } from "@/lib/utils";

const R = 1.7;

/** lat/lon (degrees) -> point on a sphere of radius r */
const toVec = (lat: number, lon: number, r: number) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};

/** Read a "R G B" CSS variable as a THREE.Color */
const cssColor = (name: string) => {
  const [r, g, b] = getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);
  return new THREE.Color(r / 255, g / 255, b / 255);
};

export function HeroScene({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // WebGL not available
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 6.2;
    const root = new THREE.Group(); // positioned for layout
    const globe = new THREE.Group(); // rotated by time / pointer
    root.add(globe);
    scene.add(root);

    // ----- dotted sphere (fibonacci distribution) -----
    const N = 3400;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const t = Math.PI * (3 - Math.sqrt(5)) * i;
      pos.set([Math.cos(t) * rad * R, y * R, Math.sin(t) * rad * R], i * 3);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dotMat = new THREE.PointsMaterial({ size: 0.024, transparent: true, opacity: 0.8 });
    globe.add(new THREE.Points(dotGeo, dotMat));

    // Core hides the dots on the far side so the globe reads as solid.
    const coreMat = new THREE.MeshBasicMaterial();
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 48, 48), coreMat));

    // ----- orbit rings -----
    const ringMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.28 });
    const ring = (radius: number, tiltX: number, tiltZ: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 128; i++) { const a = (i / 128) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius)); }
      const line = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), ringMat);
      line.rotation.set(tiltX, 0, tiltZ);
      return line;
    };
    root.add(ring(R * 1.35, 1.2, 0.3), ring(R * 1.7, 0.9, -0.5));

    // ----- pins + arcs -----
    const pinMat = new THREE.MeshBasicMaterial();
    const arcMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.7 });
    const pins: THREE.Mesh[] = [];
    const dests = siteConfig.destinations;
    dests.forEach((d) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), pinMat);
      m.position.copy(toVec(d.lat, d.lon, R));
      globe.add(m);
      pins.push(m);
    });
    for (let i = 0; i < dests.length; i++) {
      const a = toVec(dests[i].lat, dests[i].lon, 1).normalize();
      const b = toVec(dests[(i + 1) % dests.length].lat, dests[(i + 1) % dests.length].lon, 1).normalize();
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= 48; s++) {
        const t = s / 48;
        const v = a.clone().lerp(b, t).normalize().multiplyScalar(R + Math.sin(Math.PI * t) * 0.45);
        pts.push(v);
      }
      globe.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), arcMat));
    }

    // ----- colours follow the CSS theme -----
    const applyColors = () => {
      const accent = cssColor("--accent");
      dotMat.color.copy(accent);
      ringMat.color.copy(accent);
      arcMat.color.copy(accent);
      coreMat.color.copy(cssColor("--bg"));
      pinMat.color.copy(cssColor("--hot"));
    };
    applyColors();
    const mo = new MutationObserver(applyColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // ----- sizing -----
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      root.position.x = w / h > 1.1 ? 1.5 : 0; // push globe right on wide screens
      root.scale.setScalar(w / h > 1.1 ? 1 : 0.85);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // ----- interaction -----
    const pointer = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(el);

    const still = prefersReducedMotion();
    const clock = new THREE.Clock();
    let raf = 0, spin = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = clock.getDelta(), t = clock.elapsedTime;
      if (!still) spin += dt * 0.12;
      globe.rotation.y += (spin + pointer.x * 0.5 - globe.rotation.y) * 0.05;
      globe.rotation.x += (pointer.y * 0.25 + 0.25 - globe.rotation.x) * 0.05;
      root.rotation.z = window.scrollY * 0.0004;
      pins.forEach((p, i) => p.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.35));
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect(); ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else mat?.dispose?.();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} aria-hidden className={className} />;
}
