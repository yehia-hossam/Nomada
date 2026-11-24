/**
 * Generated landscape artwork (pure SVG, no image files, no licensing issues).
 * Deterministic: same `seed` always draws the same picture, so server and
 * client markup match. If `image` is passed, a real photo is shown instead.
 */
import type { Scene } from "@/config/site";

interface Props {
  scene: Scene;
  palette: [string, string, string, string, string, string];
  seed?: number;
  image?: string;
  alt?: string;
  className?: string;
}

// Small seeded random generator (mulberry32).
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 400, H = 500;

/** A ridge line made of random peaks, closed to the bottom of the canvas. */
function ridge(r: () => number, base: number, amp: number, steps: number, sharp: boolean) {
  const pts: string[] = [`M0 ${H}`];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * W;
    const y = base - r() * amp * (sharp ? 1 : 0.6);
    pts.push(`L${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  pts.push(`L${W} ${H}Z`);
  return pts.join("");
}

/** Smooth rolling curve (dunes / waves). */
function wave(r: () => number, base: number, amp: number) {
  const p1 = r() * 6, p2 = r() * 6;
  let d = `M0 ${H}`;
  for (let x = 0; x <= W; x += 10) {
    const y = base + Math.sin(x / 60 + p1) * amp + Math.sin(x / 23 + p2) * amp * 0.35;
    d += `L${x} ${y.toFixed(1)}`;
  }
  return d + `L${W} ${H}Z`;
}

function skyline(r: () => number, base: number, minH: number, maxH: number) {
  let d = `M0 ${H}L0 ${base}`;
  let x = 0;
  while (x < W) {
    const w = 18 + r() * 34, h = base - (minH + r() * (maxH - minH));
    d += `L${x.toFixed(1)} ${h.toFixed(1)}L${(x + w).toFixed(1)} ${h.toFixed(1)}L${(x + w).toFixed(1)} ${base}`;
    x += w;
  }
  return d + `L${W} ${H}Z`;
}

export function Art({ scene, palette, seed = 1, image, alt = "", className }: Props) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className ?? ""}`} />;
  }
  const [skyTop, skyBottom, sun, far, mid, near] = palette;
  const r = rng(seed);
  const id = `g${seed}`;
  const sunY = 150 + r() * 60;

  let layers: React.ReactNode;
  if (scene === "mountains") {
    layers = (<>
      <path d={ridge(r, 330, 150, 14, true)} fill={far} opacity=".85" />
      <path d={ridge(r, 390, 130, 12, true)} fill={mid} />
      <path d={ridge(r, 460, 90, 10, false)} fill={near} />
    </>);
  } else if (scene === "dunes") {
    layers = (<>
      <path d={wave(r, 330, 26)} fill={far} />
      <path d={wave(r, 395, 34)} fill={mid} />
      <path d={wave(r, 455, 28)} fill={near} />
    </>);
  } else if (scene === "islands") {
    layers = (<>
      <rect y="320" width={W} height="180" fill={far} />
      <path d={ridge(r, 330, 70, 8, false)} fill={mid} />
      <path d={ridge(r, 385, 55, 7, false)} fill={near} />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={20 + r() * 330} y={345 + i * 20} width={40 + r() * 60} height="2" fill={sun} opacity=".35" />
      ))}
    </>);
  } else {
    layers = (<>
      <path d={skyline(r, 380, 40, 150)} fill={far} opacity=".8" />
      <path d={skyline(r, 430, 30, 110)} fill={mid} />
      <path d={wave(r, 470, 8)} fill={near} />
    </>);
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={alt} className={`h-full w-full ${className ?? ""}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skyTop} />
          <stop offset="1" stopColor={skyBottom} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
      <circle cx={80 + r() * 240} cy={sunY} r={38 + r() * 14} fill={sun} opacity=".92" />
      {layers}
    </svg>
  );
}
