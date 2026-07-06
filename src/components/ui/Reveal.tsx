"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  staggerAmount?: number;
};

/** Fades + rises content as it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  staggerAmount = 0.08,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const targets = stagger
      ? (Array.from(node.children) as HTMLElement[])
      : node;

    let fb: number | undefined;
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        targets,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          stagger: stagger ? staggerAmount : 0,
          clearProps: "transform",
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );
      // safety: if in view but the trigger never fired, show it anyway
      fb = window.setTimeout(() => {
        const top = node.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.98 && tween.progress() === 0) {
          tween.scrollTrigger?.kill();
          gsap.set(targets, { opacity: 1, clearProps: "transform" });
        }
      }, 1600);
    }, node);

    return () => {
      if (fb) window.clearTimeout(fb);
      ctx.revert();
    };
  }, [delay, stagger, staggerAmount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
