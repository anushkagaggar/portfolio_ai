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

/**
 * Scroll-driven motion: content drifts upward the whole time it's on screen,
 * un-blurs + fades in as it enters from the bottom, and blurs + fades out as it
 * leaves past the top. Everything is scrubbed to the scroll position, so it
 * keeps moving with the scroll instead of just appearing once.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  staggerAmount = 0.06,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const targets = stagger
      ? (Array.from(node.children) as HTMLElement[])
      : node;
    const stg = stagger ? staggerAmount : 0;

    let fb: number | undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // continuous upward drift the entire time it's in view
      tl.fromTo(
        targets,
        { y: 44 },
        { y: -44, ease: "none", duration: 4 },
        0
      );
      // enter: fade + un-blur (first ~30%)
      tl.fromTo(
        targets,
        { autoAlpha: 0, filter: "blur(10px)" },
        { autoAlpha: 1, filter: "blur(0px)", ease: "power2.out", duration: 1.2, stagger: stg },
        0
      );
      // exit: blur + fade out (last ~30%)
      tl.to(
        targets,
        { autoAlpha: 0, filter: "blur(10px)", ease: "power2.in", duration: 1.2, stagger: stg },
        2.8
      );

      // safety: if the trigger never initialised but content is on screen, show it
      fb = window.setTimeout(() => {
        const top = node.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.9 && tl.progress() === 0) {
          tl.scrollTrigger?.kill();
          gsap.set(targets, { autoAlpha: 1, filter: "blur(0px)", clearProps: "transform" });
        }
      }, 1800);
    }, node);

    return () => {
      if (fb) window.clearTimeout(fb);
      ctx.revert();
    };
  }, [stagger, staggerAmount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
