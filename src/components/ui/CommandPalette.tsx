"use client";
/**
 * Cmd/Ctrl + K quick navigator: jump to sections, open a destination's booking,
 * or switch theme. Add items by extending the `items` array below.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { useUI } from "@/components/providers/UIProvider";
import { scrollToHash, cn } from "@/lib/utils";
import { Icon } from "./Icons";

interface Item { label: string; hint: string; run: () => void }

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { openBooking, toggleTheme } = useUI();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => [
    ...siteConfig.nav.map((n) => ({ label: n.label, hint: "Go to section", run: () => scrollToHash(n.href) })),
    ...siteConfig.destinations.map((d) => ({ label: `${d.name}, ${d.country}`, hint: "Request this trip", run: () => openBooking({ destination: d.id }) })),
    { label: "Switch theme", hint: "Light / dark", run: toggleTheme },
  ], [openBooking, toggleTheme]);

  const results = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => { if (open) { setQ(""); setIdx(0); setTimeout(() => input.current?.focus(), 50); } }, [open]);
  useEffect(() => setIdx(0), [q]);

  const choose = (i?: Item) => { if (!i) return; onClose(); setTimeout(i.run, 250); };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter") choose(results[idx]);
  };

  return (
    <div
      className={cn("fixed inset-0 z-[160] flex items-start justify-center bg-bg/70 px-4 pt-[14vh] backdrop-blur-md transition-opacity duration-200", open ? "opacity-100" : "pointer-events-none opacity-0")}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()} aria-hidden={!open}
    >
      <div role="dialog" aria-label="Search" onKeyDown={onKey} className="w-full max-w-lg overflow-hidden rounded-2xl border border-line/10 bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line/10 px-4">
          <Icon.search className="text-muted" />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destinations or jump to a section" className="w-full bg-transparent py-4 outline-none placeholder:text-muted" />
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2" data-lenis-prevent>
          {results.length === 0 && <li className="px-3 py-6 text-center text-muted">Nothing matches &quot;{q}&quot;.</li>}
          {results.map((r, i) => (
            <li key={r.label}>
              <button onMouseEnter={() => setIdx(i)} onClick={() => choose(r)} className={cn("flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition", i === idx ? "bg-accent text-accent-ink" : "hover:bg-fg/5")}>
                <span>{r.label}</span>
                <span className={cn("text-xs", i === idx ? "opacity-80" : "text-muted")}>{r.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
