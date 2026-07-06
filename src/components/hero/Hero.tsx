"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IntroAudio } from "@/components/hero/IntroAudio";
import { siteConfig } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero='name']", {
        opacity: 0,
        filter: "blur(14px)",
        y: 24,
        duration: 1.3,
        delay: 0.4,
      }).from(
        "[data-hero='tagline']",
        { opacity: 0, filter: "blur(8px)", y: 16, duration: 1.0 },
        "-=0.8"
      );

      // content lifts + blurs out as you scroll away (neural field is now global)
      gsap.to("[data-hero='content']", {
        y: -160,
        opacity: 0,
        filter: "blur(10px)",
        ease: "none",
        scrollTrigger: { trigger: node, start: "top top", end: "bottom top", scrub: true },
      });
    }, node);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-10"
    >
      <IntroAudio />

      <div data-hero="content" className="relative z-10 mx-auto w-full max-w-5xl">
        <h1
          data-hero="name"
          className="font-grotesk text-5xl font-medium leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-8xl"
        >
          {siteConfig.name}
        </h1>
        <p
          data-hero="tagline"
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
        >
          {siteConfig.tagline}
        </p>
      </div>
    </section>
  );
}
