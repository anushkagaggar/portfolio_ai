"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** vertical travel in px, scrubbed to scroll (positive = drifts upward as you scroll) */
  distance?: number;
};

/**
 * Continuously drifts its content as the page scrolls (scrubbed, so it moves
 * in lockstep with the scroll position). This is what makes sections feel
 * alive while scrolling, on top of the one-shot Reveal entrances.
 */
export function Parallax({ children, className, distance = 48 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { y: distance },
        {
          y: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { dependencies: [reduced], scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
