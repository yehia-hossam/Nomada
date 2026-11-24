# Nomada - Travel & Stays Website Template

A production-ready travel booking template built with **Next.js 14 (App Router)**, **React 18**,
**TypeScript**, **Tailwind CSS**, **GSAP (ScrollTrigger)**, **Three.js** and **Lenis** smooth scrolling.

All content lives in one file. No photos are required: artwork is generated as SVG, so there are no
image licensing issues. Replace it with your own photos whenever you like.

---

## 1. Quick start

```bash
npm install
cp .env.example .env.local     # then edit the values
npm run dev                    # http://localhost:3000
npm run build && npm start     # production
```

Requires Node.js 18.17 or newer.

## 2. What is included

| Area | Details |
| --- | --- |
| Sections | Hero with 3D globe, destination ticker, scroll-lit statement + count-up stats, pinned horizontal destinations, filterable stays, bento "why us", trip cost planner, testimonials, FAQ, closing CTA, footer |
| Interactions | Preloader, Lenis smooth scroll, custom cursor with labels, magnetic buttons, scroll progress bar, 3D card tilt, floating auto-hide header |
| Utility features | Dark / light theme (saved), wishlist (saved), Cmd/Ctrl+K command palette, booking modal with API route |
| Quality | Fully responsive, keyboard focus styles, `prefers-reduced-motion` support, SEO metadata, sitemap, robots, 404 page |

## 3. Project structure

```
src/
  config/site.ts            <- ALL content: brand, nav, copy, destinations, stays, FAQ, footer, feature flags
  app/
    layout.tsx              <- fonts, metadata, providers
    page.tsx                <- section order (reorder / remove here)
    globals.css             <- colour tokens (dark + light) and base styles
    api/booking/route.ts    <- booking endpoint (plug in email / CRM)
  components/
    layout/                 <- Header, Footer
    sections/               <- one file per page section
    three/HeroScene.tsx     <- Three.js globe
    ui/                     <- Art (SVG scenes), BookingModal, CommandPalette, Magnetic, Icons...
    providers/              <- UIProvider (theme, wishlist, modals), SmoothScroll, Cursor, Preloader
  lib/                      <- gsap setup and helpers
```

## 4. Customising

**Text, prices, destinations, FAQ** - edit `src/config/site.ts`. Everything is typed, so your editor
will warn you about mistakes.

**Colours** - edit the CSS variables at the top of `src/app/globals.css` (one set for dark, one for light).
Tailwind classes and the 3D globe pick them up automatically.

**Fonts** - change the two imports in `src/app/layout.tsx` (any Google font works).

**Photos** - put files in `public/images/` and set `image: "/images/lisbon.jpg"` on a destination or stay.
Leave it empty to keep the generated artwork. Suggested sizes: destinations 800x1000, stays 800x1000.

**Turn features on/off** - `features` block in `site.ts` (preloader, smooth scroll, custom cursor, globe, grain).

**Add / remove sections** - open `src/app/page.tsx` and add or delete a line. Nav links are in `site.ts -> nav`
and must match the section `id`.

**Globe pins** - every destination's `lat` / `lon` becomes a pin automatically.

## 5. Connecting the forms

- **Booking requests** - `src/app/api/booking/route.ts`. Set `BOOKING_WEBHOOK_URL` (Zapier, Make, n8n) or
  replace the TODO with Resend / Nodemailer / your database.
- **Newsletter** - `src/components/sections/Contact.tsx` (see the TODO in `onSubmit`).

## 6. Deploying

Works on Vercel, Netlify, or any Node host (`npm run build && npm start`). Set `NEXT_PUBLIC_SITE_URL`
to your final domain so the sitemap and social tags are correct.

## 7. Performance and accessibility notes

- The Three.js scene pauses when off-screen and disposes all GPU resources on unmount.
- Smooth scroll, custom cursor and preloader are skipped for reduced-motion / touch users.
- The horizontal destination scroller becomes a native swipe carousel below 1024px.

## 8. Support

Open `src/config/site.ts` first: 90% of customisations never need to go further.
# Nomada
