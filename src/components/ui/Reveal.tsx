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
  /** seconds between staggered children */
  staggerAmount?: number;
};

/**
 * Fades + rises its content as it enters the viewport. Under reduced motion it
 * renders fully visible immediately. A safety net forces content visible if a
 * section is already on screen but the trigger somehow hasn't fired — content
 * is never left stuck hidden.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  staggerAmount = 0.08,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const targets = stagger
        ? (Array.from(ref.current.children) as HTMLElement[])
        : ref.current;

      const tween = gsap.fromTo(
        targets,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          stagger: stagger ? staggerAmount : 0,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      const fallback = window.setTimeout(() => {
        if (!ref.current) return;
        const top = ref.current.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.95 && tween.progress() === 0) {
          tween.scrollTrigger?.kill();
          gsap.set(targets, { opacity: 1, y: 0 });
        }
      }, 1500);

      return () => window.clearTimeout(fallback);
    },
    { dependencies: [reduced], scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
