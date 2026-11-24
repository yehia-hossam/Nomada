"use client";
/** Site footer: link columns, contact details, socials and a giant wordmark. */
import { siteConfig } from "@/config/site";
import { scrollToHash } from "@/lib/utils";

export function Footer() {
  const f = siteConfig.footer;
  const go = (href: string) => (e: React.MouseEvent) => { if (href.startsWith("#") && href.length > 1) { e.preventDefault(); scrollToHash(href); } };
  return (
    <footer className="relative overflow-hidden border-t border-line/10 pt-16">
      <div className="wrap grid gap-12 md:grid-cols-[1.4fr_2fr]">
        <div>
          <p className="max-w-xs text-lg text-fg/80">{f.blurb}</p>
          <address className="mt-6 space-y-1 text-sm not-italic text-muted">
            <p><a href={`mailto:${siteConfig.contact.email}`} className="hover:text-accent">{siteConfig.contact.email}</a></p>
            <p><a href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-accent">{siteConfig.contact.phone}</a></p>
            <p>{siteConfig.contact.address}</p>
          </address>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {f.columns.map((c) => (
            <div key={c.title}>
              <p className="mb-4 font-semibold">{c.title}</p>
              <ul className="space-y-2.5 text-muted">
                {c.links.map((l) => <li key={l.label}><a href={l.href} onClick={go(l.href)} className="transition hover:text-accent">{l.label}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-4 font-semibold">Follow</p>
            <ul className="space-y-2.5 text-muted">
              {f.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="transition hover:text-accent">{s.label}</a></li>)}
            </ul>
          </div>
        </div>
      </div>

      <p aria-hidden className="h-display mt-14 select-none whitespace-nowrap text-center text-[24vw] leading-[.75] text-transparent [-webkit-text-stroke:1.5px_rgb(var(--line)/0.18)]">
        {siteConfig.name}
      </p>

      <div className="wrap flex flex-col items-center justify-between gap-3 border-t border-line/10 py-6 text-sm text-muted sm:flex-row">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <button onClick={() => (window.lenis ? window.lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))} className="transition hover:text-accent">Back to top</button>
      </div>
    </footer>
  );
}
