import SmoothScroll from "@/components/layout/SmoothScroll";
import { StickyNav } from "@/components/layout/StickyNav";
import { Hero } from "@/components/hero/Hero";
import { AboutIntro } from "@/components/scenes/AboutIntro";
import { VaultAI } from "@/components/scenes/VaultAI";
import { Experience } from "@/components/scenes/Experience";
import { Projects } from "@/components/scenes/Projects";
import { AISystems } from "@/components/scenes/AISystems";
import { Contact } from "@/components/scenes/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <StickyNav />
      <main>
        <Hero />
        <AboutIntro />
        <VaultAI />
        <Experience />
        <Projects />
        <AISystems />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
