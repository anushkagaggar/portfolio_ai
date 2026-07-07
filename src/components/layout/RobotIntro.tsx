"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { siteConfig } from "@/config/site";

/* ---- on-brand SVG robot: white body, dark visor, glowing cyan eyes ---- */
function Robot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 250" className={className} role="img" aria-label="Robot assistant">
      <defs>
        <filter id="rbShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#4f46e5" floodOpacity="0.20" />
        </filter>
        <filter id="rbGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="rbVisor" cx="50%" cy="38%" r="80%">
          <stop offset="0%" stopColor="#1c2333" />
          <stop offset="100%" stopColor="#0a0d15" />
        </radialGradient>
      </defs>

      <g filter="url(#rbShadow)">
        {/* antennae */}
        <g stroke="#E8B923" strokeWidth="3" strokeLinecap="round">
          <line x1="86" y1="44" x2="78" y2="18" />
          <line x1="134" y1="44" x2="142" y2="18" />
        </g>
        <g fill="#E8B923" className="robot-glow">
          <circle cx="78" cy="15" r="5" />
          <circle cx="142" cy="15" r="5" />
        </g>

        {/* arms */}
        <g fill="#ffffff" stroke="#c9c7bd" strokeWidth="2">
          <rect x="150" y="150" width="20" height="58" rx="10" />
          <g className="robot-wave">
            <rect x="49" y="120" width="20" height="58" rx="10" />
            <circle cx="59" cy="118" r="12" fill="#eef2ff" />
          </g>
        </g>

        {/* body */}
        <rect x="62" y="140" width="96" height="82" rx="30" fill="#ffffff" stroke="#4f46e5" strokeOpacity="0.35" strokeWidth="2.5" />
        <circle cx="110" cy="178" r="12" fill="#eaf6ff" stroke="#22d3ee" strokeWidth="2" />
        <circle cx="110" cy="178" r="5" fill="#22d3ee" className="robot-core" />
        <line x1="90" y1="202" x2="130" y2="202" stroke="#d9d7cd" strokeWidth="2" strokeLinecap="round" />

        {/* feet */}
        <g fill="#ffffff" stroke="#c9c7bd" strokeWidth="2">
          <rect x="76" y="218" width="26" height="20" rx="9" />
          <rect x="118" y="218" width="26" height="20" rx="9" />
        </g>

        {/* head */}
        <rect x="48" y="42" width="124" height="94" rx="45" fill="#ffffff" stroke="#4f46e5" strokeOpacity="0.4" strokeWidth="2.5" />
        <circle cx="50" cy="89" r="9" fill="#4f46e5" fillOpacity="0.85" />
        <circle cx="170" cy="89" r="9" fill="#4f46e5" fillOpacity="0.85" />
        <rect x="60" y="57" width="100" height="65" rx="30" fill="url(#rbVisor)" stroke="#E8B923" strokeOpacity="0.45" strokeWidth="1.5" />

        {/* face */}
        <g className="robot-eyes" fill="#22d3ee" filter="url(#rbGlow)">
          <circle cx="92" cy="85" r="8" />
          <circle cx="128" cy="85" r="8" />
        </g>
        <path d="M96 103 Q110 113 124 103" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" filter="url(#rbGlow)" />
        <circle cx="80" cy="103" r="2.5" fill="#22d3ee" fillOpacity="0.7" />
        <circle cx="140" cy="103" r="2.5" fill="#22d3ee" fillOpacity="0.7" />
      </g>
    </svg>
  );
}

/* ---- female-voice fallback if the mp3 isn't present ---- */
function pickFemaleVoice(voices: SpeechSynthesisVoice[]) {
  const en = voices.filter((v) => /^en/i.test(v.lang));
  const pool = en.length ? en : voices;
  const prefer = [/female/i, /samantha/i, /victoria/i, /karen/i, /tessa/i, /moira/i, /fiona/i, /zira/i, /aria/i, /jenny/i, /libby/i, /sonia/i, /google uk english female/i, /google us english/i];
  for (const re of prefer) {
    const v = pool.find((x) => re.test(x.name));
    if (v) return v;
  }
  return pool[0];
}

type Phase = "intro" | "leaving" | "done";

export function RobotIntro() {
  const [phase, setPhase] = useState<Phase>("intro");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(siteConfig.intro.audioUrl);
    audioRef.current.preload = "auto";
  }, []);

  const speakFallback = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = () => {
      const u = new SpeechSynthesisUtterance(siteConfig.intro.spokenText);
      const v = pickFemaleVoice(synth.getVoices());
      if (v) u.voice = v;
      u.rate = 1;
      u.pitch = 1.05;
      synth.cancel();
      synth.speak(u);
    };
    if (synth.getVoices().length) utter();
    else {
      const on = () => {
        synth.removeEventListener("voiceschanged", on);
        utter();
      };
      synth.addEventListener("voiceschanged", on);
      window.setTimeout(utter, 300);
    }
  };

  const playIntro = () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      a.currentTime = 0;
    } catch {
      /* ignore */
    }
    a.play().catch(() => speakFallback());
  };

  // lock scrolling while the overlay is up
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (phase === "done") {
      lenis?.start();
      document.body.style.overflow = "";
    } else {
      window.scrollTo(0, 0);
      lenis?.stop();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const enter = () => {
    if (phase !== "intro") return;
    playIntro(); // this click is the gesture that unlocks audio
    setPhase("leaving");
    window.setTimeout(() => setPhase("done"), 650);
  };

  return (
    <>
      {phase !== "done" && (
        <div
          role="button"
          tabIndex={0}
          onClick={enter}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              enter();
            }
          }}
          aria-label="Enter the site and hear Anushka's intro"
          className={`fixed inset-0 z-[100] grid cursor-pointer place-items-center overflow-hidden bg-paper transition-all duration-700 ${
            phase === "leaving" ? "pointer-events-none scale-105 opacity-0 blur-md" : "opacity-100"
          }`}
        >
          {/* soft aura behind the robot */}
          <div
            className="pointer-events-none absolute h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(34,211,238,0.16), rgba(79,70,229,0.10) 45%, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center gap-6 px-6 text-center">
            <div className="relative max-w-xs rounded-2xl border border-line bg-paper-2 px-5 py-3 shadow-sm">
              <p className="font-grotesk text-sm font-medium text-ink md:text-base">
                Hi, I&apos;m Anushka&apos;s assistant.
              </p>
              <p className="mt-0.5 text-sm text-muted">Tap anywhere to see her work.</p>
              <span
                className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-line bg-paper-2"
                aria-hidden="true"
              />
            </div>

            <Robot className="robot-bob h-56 w-auto md:h-64" />

            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              <span className="animate-pulse">click anywhere</span>
              <span className="mx-2 text-line">·</span>
              sound on
            </p>
          </div>
        </div>
      )}

      {phase === "done" && (
        <button
          type="button"
          onClick={playIntro}
          aria-label="Replay Anushka's intro"
          className="group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border border-line bg-paper/90 shadow-[0_10px_28px_-12px_rgba(79,70,229,0.5)] backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105"
        >
          <Robot className="robot-bob h-11 w-auto" />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 font-mono text-[10px] text-paper opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            Replay intro
          </span>
        </button>
      )}
    </>
  );
}
