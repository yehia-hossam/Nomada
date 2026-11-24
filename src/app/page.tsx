/**
 * Page composition. Reorder, remove or duplicate sections here.
 * Each section is a self-contained file in src/components/sections.
 */
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Intro } from "@/components/sections/Intro";
import { Destinations } from "@/components/sections/Destinations";
import { Stays } from "@/components/sections/Stays";
import { Why } from "@/components/sections/Why";
import { Planner } from "@/components/sections/Planner";
import { Stories } from "@/components/sections/Stories";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Intro />
        <Destinations />
        <Stays />
        <Why />
        <Planner />
        <Stories />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
