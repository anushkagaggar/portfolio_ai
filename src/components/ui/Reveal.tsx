"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** seconds before the animation starts */
  delay?: number;
  /** when true, direct children animate one after another */
  stagger?: boolean;
};

/**
 * Fades + rises its content as it enters the viewport. Under reduced motion it
 * renders fully visible immediately — no transforms, no opacity tricks.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const targets = stagger
        ? (Array.from(ref.current.children) as HTMLElement[])
        : ref.current;

      gsap.from(targets, {
        opacity: 0,
        y: 28,
        duration: 0.8,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { dependencies: [reduced], scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
