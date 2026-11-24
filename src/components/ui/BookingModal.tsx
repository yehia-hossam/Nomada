"use client";
/**
 * Booking request modal. Opened from anywhere with useUI().openBooking({ destination }).
 * Submits to /api/booking (see src/app/api/booking/route.ts).
 */
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Icon } from "./Icons";
import { cn } from "@/lib/utils";

interface Props { open: boolean; destination?: string; onClose: () => void }
type Status = "idle" | "sending" | "done" | "error";

export function BookingModal({ open, destination, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [guests, setGuests] = useState(2);
  const [dest, setDest] = useState(destination ?? siteConfig.destinations[0].id);

  // Pre-select the destination the visitor clicked on.
  useEffect(() => { if (destination) setDest(destination); }, [destination]);
  // Reset form each time it re-opens.
  useEffect(() => { if (open) { setStatus("idle"); setError(""); } }, [open]);
  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: f.get("name"), email: f.get("email"), destination: dest, date: f.get("date"), guests, notes: f.get("notes") }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const field = "w-full rounded-xl border border-line/15 bg-bg/60 px-4 py-3 text-[15px] outline-none transition focus:border-accent";

  return (
    <div
      className={cn("fixed inset-0 z-[150] flex items-end justify-center bg-bg/70 backdrop-blur-md transition-opacity duration-300 md:items-center", open ? "opacity-100" : "pointer-events-none opacity-0")}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      aria-hidden={!open}
    >
      <div
        role="dialog" aria-modal="true" aria-label="Request a trip" data-lenis-prevent
        className={cn("max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] border border-line/10 bg-card p-6 shadow-2xl transition-transform duration-500 ease-out md:rounded-[2rem] md:p-9", open ? "translate-y-0" : "translate-y-10")}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="h-display text-3xl md:text-4xl">Request a trip</h2>
            <p className="mt-2 text-sm text-muted">A trip host replies within one working day. No payment now.</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full border border-line/15 p-2 transition hover:bg-fg/10"><Icon.close /></button>
        </div>

        {status === "done" ? (
          <div className="py-10 text-center">
            <p className="h-serif text-4xl">Request received.</p>
            <p className="mx-auto mt-3 max-w-sm text-muted">Check your inbox, your trip host will write soon with a first draft of your plan.</p>
            <button onClick={onClose} className="mt-8 rounded-full bg-accent px-7 py-3 font-semibold text-accent-ink">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Full name" className={field} autoComplete="name" />
              <input name="email" type="email" required placeholder="Email" className={field} autoComplete="email" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <select value={dest} onChange={(e) => setDest(e.target.value)} className={field} aria-label="Destination">
                {siteConfig.destinations.map((d) => <option key={d.id} value={d.id}>{d.name}, {d.country}</option>)}
              </select>
              <input name="date" type="date" className={field} aria-label="Preferred start date" />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-line/15 bg-bg/60 px-4 py-2.5">
              <span className="text-[15px]">Travellers</span>
              <div className="flex items-center gap-4">
                <button type="button" aria-label="Fewer travellers" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="h-8 w-8 rounded-full border border-line/20 transition hover:bg-fg/10">-</button>
                <span className="w-5 text-center tabular-nums">{guests}</span>
                <button type="button" aria-label="More travellers" onClick={() => setGuests((g) => Math.min(10, g + 1))} className="h-8 w-8 rounded-full border border-line/20 transition hover:bg-fg/10">+</button>
              </div>
            </div>
            <textarea name="notes" rows={3} placeholder="Anything we should know? Pace, food, mobility, occasion..." className={field} />
            {status === "error" && <p role="alert" className="text-sm text-hot">{error}</p>}
            <button disabled={status === "sending"} className="mt-1 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-ink transition hover:brightness-110 disabled:opacity-60">
              {status === "sending" ? "Sending..." : "Send request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
