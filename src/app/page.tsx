import SmoothScroll from "@/components/layout/SmoothScroll";
import { NeuralBackground } from "@/components/layout/NeuralBackground";
import { RobotIntro } from "@/components/layout/RobotIntro";
import { StickyNav } from "@/components/layout/StickyNav";
import { Hero } from "@/components/hero/Hero";
import { VaultAI } from "@/components/scenes/VaultAI";
import { Experience } from "@/components/scenes/Experience";
import { Foundation } from "@/components/scenes/Foundation";
import { TechStack } from "@/components/scenes/TechStack";
import { Contact } from "@/components/scenes/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <NeuralBackground />
      <RobotIntro />
      <StickyNav />
      <main>
        <Hero />
        <VaultAI />
        <Experience />
        <Foundation />
        <TechStack />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
