"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Typewriter } from "@/components/ui/Typewriter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteConfig } from "@/config/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [typing, setTyping] = useState(false);
  const reduced = useReducedMotion();

  const playVoice = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(siteConfig.intro.audioUrl);
    }
    // scrolling here is itself a user gesture, so the browser allows playback
    audioRef.current.play().catch(() => {});
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const photo = photoRef.current;
      const text = textRef.current;
      if (!section || !photo || !text) return;

      // Reduced motion: show everything in its resting state, type instantly,
      // play the voice once the section is reached.
      if (reduced) {
        setTyping(true);
        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          once: true,
          onEnter: playVoice,
        });
        return;
      }

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      // Mobile: skip the horizontal pin; reveal + type + voice on enter.
      if (isMobile) {
        gsap.set(text, { autoAlpha: 0, y: 24 });
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          once: true,
          onEnter: () => {
            gsap.to(text, { autoAlpha: 1, y: 0, duration: 0.5 });
            setTyping(true);
            playVoice();
          },
        });
        return;
      }

      // Desktop: pin the section, glide the photo from centre to its left
      // resting spot, then reveal + type the intro while the voice plays.
      const centerOffset = () => {
        const sRect = section.getBoundingClientRect();
        const pRect = photo.getBoundingClientRect();
        const photoCenter = pRect.left - sRect.left + pRect.width / 2;
        return sRect.width / 2 - photoCenter; // x needed to centre the photo
      };

      gsap.set(photo, { x: centerOffset() });
      gsap.set(text, { autoAlpha: 0, x: 48 });

      let started = false;

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          // photo travels to its resting spot over the first 45% of scroll
          const moveP = gsap.utils.clamp(0, 1, p / 0.45);
          gsap.set(photo, { x: centerOffset() * (1 - moveP) });

          // intro fades in just as the photo settles
          const reveal = gsap.utils.clamp(0, 1, (p - 0.4) / 0.18);
          gsap.set(text, { autoAlpha: reveal, x: 48 * (1 - reveal) });

          if (p > 0.46 && !started) {
            started = true;
            setTyping(true);
            playVoice();
          }
        },
      });

      return () => st.kill();
    },
    { dependencies: [reduced], scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mx-auto flex min-h-screen max-w-5xl items-center px-6 md:px-10"
    >
      <div className="flex w-full flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">
        {/* photo block */}
        <div
          ref={photoRef}
          className="relative shrink-0 overflow-hidden rounded-2xl border border-line shadow-sm"
          style={{ width: 320, height: 424 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.about.photo}
            alt={siteConfig.name}
            className="h-full w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-ink/5"
          />
        </div>

        {/* typed intro */}
        <div ref={textRef} className="md:flex-1">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            about
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink md:text-xl">
            <Typewriter
              text={siteConfig.about.intro}
              active={typing}
              speed={siteConfig.about.typeSpeedMs}
              instant={reduced}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
