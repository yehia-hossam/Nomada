"use client";
/**
 * Floating header: hides when scrolling down, returns when scrolling up.
 * Contains nav, search (Cmd+K), theme toggle, wishlist counter and mobile menu.
 */
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { useUI } from "@/components/providers/UIProvider";
import { Icon } from "@/components/ui/Icons";
import { scrollToHash, cn } from "@/lib/utils";

export function Header() {
  const { theme, toggleTheme, wishlist, openBooking, openPalette } = useUI();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => { menu ? window.lenis?.stop() : window.lenis?.start(); }, [menu]);

  const go = (href: string) => (e: React.MouseEvent) => { e.preventDefault(); setMenu(false); setTimeout(() => scrollToHash(href), 50); };
  const btn = "flex h-10 w-10 items-center justify-center rounded-full border border-line/15 transition hover:bg-fg/10";

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-[80] transition-transform duration-500 ease-out", hidden && !menu ? "-translate-y-full" : "translate-y-0")}>
        <div className="wrap pt-4">
          <div className={cn("flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-6", solid ? "border border-line/10 bg-bg/70 backdrop-blur-xl" : "border border-transparent")}>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.lenis ? window.lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }); }} className="h-display text-2xl">
              {siteConfig.name}
            </a>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {siteConfig.nav.map((n) => (
                <a key={n.href} href={n.href} onClick={go(n.href)} className="rounded-full px-4 py-2 text-[15px] text-fg/80 transition hover:bg-fg/10 hover:text-fg">{n.label}</a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button onClick={openPalette} aria-label="Search" className={btn}><Icon.search width={18} height={18} /></button>
              <button onClick={toggleTheme} aria-label="Toggle theme" className={btn}>{theme === "dark" ? <Icon.sun width={18} height={18} /> : <Icon.moon width={18} height={18} />}</button>
              <span className={cn(btn, "relative hidden sm:flex")} title="Saved stays" aria-label={`${wishlist.length} saved stays`}>
                <Icon.heart width={18} height={18} />
                {wishlist.length > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-hot px-1 text-[10px] font-bold text-white">{wishlist.length}</span>}
              </span>
              <button onClick={() => openBooking()} className="ml-1 hidden rounded-full bg-accent px-5 py-2.5 text-[15px] font-semibold text-accent-ink transition hover:brightness-110 md:block">Plan a trip</button>
              <button onClick={() => setMenu((m) => !m)} aria-label="Menu" aria-expanded={menu} className={cn(btn, "lg:hidden")}>
                {menu ? <Icon.close width={18} height={18} /> : <span className="flex flex-col gap-1.5"><i className="block h-px w-4 bg-current" /><i className="block h-px w-4 bg-current" /></span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={cn("fixed inset-0 z-[70] bg-bg px-6 pt-28 transition-[clip-path] duration-700 ease-out lg:hidden", menu ? "[clip-path:circle(150%_at_90%_5%)]" : "[clip-path:circle(0%_at_90%_5%)]")} aria-hidden={!menu}>
        <nav className="flex flex-col gap-2">
          {siteConfig.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={go(n.href)} className="h-display border-b border-line/10 py-4 text-4xl">{n.label}</a>
          ))}
        </nav>
        <button onClick={() => { setMenu(false); openBooking(); }} className="mt-8 w-full rounded-full bg-accent py-4 text-lg font-semibold text-accent-ink">Plan a trip</button>
      </div>
    </>
  );
}
