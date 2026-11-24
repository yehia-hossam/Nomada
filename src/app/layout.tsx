import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { UIProvider } from "@/components/providers/UIProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/providers/Cursor";
import { Preloader } from "@/components/providers/Preloader";

// Fonts - swap by changing the imports (any Google font works).
const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} - ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: { title: siteConfig.name, description: siteConfig.description, type: "website", url: siteConfig.url },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description },
};

export const viewport: Viewport = { themeColor: "#0d2b36" };

// Runs before first paint so the saved theme never flashes.
const themeScript = `try{var t=localStorage.getItem("nomada:theme");document.documentElement.dataset.theme=t||"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const f = siteConfig.features;
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${sans.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={f.grain ? "grain" : ""}>
        <UIProvider>
          <Preloader />
          {f.smoothScroll && <SmoothScroll />}
          {f.customCursor && <Cursor />}
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
