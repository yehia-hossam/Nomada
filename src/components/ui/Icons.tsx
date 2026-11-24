/** Small inline icon set (stroke icons, inherit currentColor). */
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Icon = {
  search: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
  heart: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>,
  sun: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>,
  moon: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" /></svg>,
  arrow: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  close: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>,
  star: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} fill="currentColor" strokeWidth={0} {...p}><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9Z" /></svg>,
  chat: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M21 12a8 8 0 0 1-11.7 7L3 21l2-5.5A8 8 0 1 1 21 12Z" /></svg>,
  calendar: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>,
  boot: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5 3h6v8l8 3v5H5Z" /><path d="M5 15h14" /></svg>,
  users: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.2A6.5 6.5 0 0 1 21.5 20" /></svg>,
  leaf: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M5 19C5 10 10 4 20 4c0 10-6 15-15 15Z" /><path d="M5 19 13 11" /></svg>,
  plus: (p: React.SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>,
};
export type IconName = keyof typeof Icon;
