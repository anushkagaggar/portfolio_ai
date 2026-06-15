"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { NeuralField } from "@/components/hero/NeuralField";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteConfig } from "@/config/site";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      // name + tagline rise out of a blur into focus, layered over the network
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero='name']", {
        opacity: 0,
        filter: "blur(14px)",
        y: 24,
        duration: 1.3,
        delay: 0.5,
      }).from(
        "[data-hero='tagline']",
        { opacity: 0, filter: "blur(8px)", y: 16, duration: 1.0 },
        "-=0.8"
      );
    },
    { dependencies: [reduced], scope: ref }
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-10"
    >
      {/* faint blueprint grid + the converging network behind the type */}
      <div className="blueprint-grid pointer-events-none absolute inset-0" />
      <NeuralField />


      <div className="relative z-10 mx-auto w-full max-w-5xl">
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
