import SmoothScroll from "@/components/layout/SmoothScroll";
import { StickyNav } from "@/components/layout/StickyNav";
import { Hero } from "@/components/hero/Hero";
import { Foundation } from "@/components/scenes/Foundation";
import { DataEngineering } from "@/components/scenes/DataEngineering";
import { VaultAI } from "@/components/scenes/VaultAI";
import { AISystems } from "@/components/scenes/AISystems";
import { Contact } from "@/components/scenes/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <StickyNav />
      <main>
        <Hero />
        <Foundation />
        <DataEngineering />
        <VaultAI />
        <AISystems />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
