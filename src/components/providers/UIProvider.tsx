"use client";
/**
 * Global UI state: theme, wishlist (saved to localStorage), and the
 * booking / command-palette overlays. Any component can call useUI().
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { BookingModal } from "@/components/ui/BookingModal";
import { CommandPalette } from "@/components/ui/CommandPalette";

type Theme = "dark" | "light";
interface UICtx {
  theme: Theme;
  toggleTheme: () => void;
  wishlist: string[];
  toggleWish: (id: string) => void;
  openBooking: (opts?: { destination?: string }) => void;
  openPalette: () => void;
}
const Ctx = createContext<UICtx | null>(null);

export const useUI = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useUI must be used inside <UIProvider>");
  return c;
};

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [booking, setBooking] = useState<{ open: boolean; destination?: string }>({ open: false });
  const [palette, setPalette] = useState(false);

  // Sync initial state from the DOM / localStorage (set by the inline script in layout.tsx).
  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) || "dark");
    try {
      setWishlist(JSON.parse(localStorage.getItem("nomada:wishlist") || "[]"));
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("nomada:theme", next); } catch { /* private mode */ }
      return next;
    });
  }, []);

  const toggleWish = useCallback((id: string) => {
    setWishlist((w) => {
      const next = w.includes(id) ? w.filter((x) => x !== id) : [...w, id];
      try { localStorage.setItem("nomada:wishlist", JSON.stringify(next)); } catch { /* private mode */ }
      return next;
    });
  }, []);

  const openBooking = useCallback((o?: { destination?: string }) => setBooking({ open: true, destination: o?.destination }), []);
  const openPalette = useCallback(() => setPalette(true), []);

  // Cmd/Ctrl + K opens the command palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Freeze page scroll while an overlay is open.
  useEffect(() => {
    const locked = booking.open || palette;
    if (locked) window.lenis?.stop();
    else window.lenis?.start();
  }, [booking.open, palette]);

  const value = useMemo(
    () => ({ theme, toggleTheme, wishlist, toggleWish, openBooking, openPalette }),
    [theme, toggleTheme, wishlist, toggleWish, openBooking, openPalette]
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <BookingModal open={booking.open} destination={booking.destination} onClose={() => setBooking({ open: false })} />
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </Ctx.Provider>
  );
}
