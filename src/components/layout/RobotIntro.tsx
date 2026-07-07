"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { NeuralField } from "@/components/hero/NeuralField";
import { siteConfig } from "@/config/site";

/* ---- on-brand SVG robot: glossy visor, big glinting cyan eyes ---- */
function Robot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 210" className={className} role="img" aria-label="Robot assistant">
      <defs>
        <linearGradient id="rbBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef1f8" />
        </linearGradient>
        <radialGradient id="rbVisor" cx="50%" cy="34%" r="78%">
          <stop offset="0" stopColor="#273149" />
          <stop offset="100%" stopColor="#0b0f1a" />
        </radialGradient>
        <linearGradient id="rbEye" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8af2ff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <filter id="rbGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="100" cy="197" rx="40" ry="7" fill="#161616" opacity="0.08" />

      <line x1="100" y1="30" x2="100" y2="13" stroke="#9aa0b3" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="9" r="6" fill="#22d3ee" className="robot-glow" filter="url(#rbGlow)" />

      <g fill="url(#rbBody)" stroke="#dfe2ee" strokeWidth="1.5">
        <g className="robot-wave">
          <rect x="52" y="140" width="16" height="30" rx="8" />
        </g>
        <rect x="132" y="140" width="16" height="30" rx="8" />
      </g>
      <rect x="66" y="132" width="68" height="52" rx="26" fill="url(#rbBody)" stroke="#4f46e5" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="100" cy="158" r="8" fill="#eafaff" stroke="#22d3ee" strokeWidth="1.5" />
      <circle cx="100" cy="158" r="3.5" fill="#22d3ee" className="robot-core" />

      <rect x="38" y="30" width="124" height="104" rx="52" fill="url(#rbBody)" stroke="#4f46e5" strokeOpacity="0.28" strokeWidth="2" />
      <ellipse cx="86" cy="52" rx="26" ry="12" fill="#ffffff" opacity="0.6" />
      <circle cx="40" cy="82" r="8" fill="#4f46e5" fillOpacity="0.8" />
      <circle cx="160" cy="82" r="8" fill="#4f46e5" fillOpacity="0.8" />
      <rect x="52" y="44" width="96" height="78" rx="40" fill="url(#rbVisor)" />
      <ellipse cx="100" cy="60" rx="40" ry="14" fill="#ffffff" opacity="0.07" />

      <g className="robot-eyes" filter="url(#rbGlow)">
        <g fill="url(#rbEye)">
          <ellipse cx="80" cy="82" rx="10" ry="12" />
          <ellipse cx="120" cy="82" rx="10" ry="12" />
        </g>
        <circle cx="84" cy="77" r="3" fill="#ffffff" opacity="0.9" />
        <circle cx="124" cy="77" r="3" fill="#ffffff" opacity="0.9" />
      </g>
      <path d="M86 100 Q100 112 114 100" fill="none" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" filter="url(#rbGlow)" />
      <ellipse cx="68" cy="98" rx="5" ry="3" fill="#22d3ee" opacity="0.25" />
      <ellipse cx="132" cy="98" rx="5" ry="3" fill="#22d3ee" opacity="0.25" />
    </svg>
  );
}

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

// slides the robot's centre to the bottom-left corner and shrinks it
const CORNER = "translate(calc(40px - 50vw), calc(50vh - 40px)) scale(0.2)";

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
    playIntro();
    setPhase("leaving");
    window.setTimeout(() => setPhase("done"), 950);
  };

  const robotClick = () => {
    if (phase === "intro") enter();
    else if (phase === "done") playIntro();
  };

  const faded = phase === "intro" ? "opacity-100" : "opacity-0";

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{ pointerEvents: phase === "done" ? "none" : "auto" }}
      onClick={phase === "intro" ? enter : undefined}
    >
      {phase !== "done" && (
        <div
          className="absolute inset-0 overflow-hidden bg-paper transition-opacity duration-700"
          style={{ opacity: phase === "intro" ? 1 : 0 }}
          aria-hidden="true"
        >
          <NeuralField />
        </div>
      )}

      <div className="absolute inset-0 grid place-items-center" style={{ pointerEvents: "none" }}>
        <div
          className="relative"
          style={{
            transform: phase === "intro" ? "none" : CORNER,
            transition: "transform 0.9s cubic-bezier(0.55,0.06,0.3,1)",
            pointerEvents: "auto",
          }}
        >
          <div className={`absolute left-full top-[64px] ml-3 w-max transition-opacity duration-300 ${faded}`}>
            <div className="relative flex items-center gap-2 rounded-2xl rounded-bl-md border border-line bg-paper-2/95 px-4 py-2.5 shadow-[0_10px_30px_-14px_rgba(79,70,229,0.5)] backdrop-blur">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#22d3ee]" />
              <p className="font-grotesk text-sm font-medium text-ink">
                Hi, I&apos;m Anushka&apos;s assistant.
              </p>
              <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-l border-line bg-paper-2" />
            </div>
          </div>

          <div className="robot-bob cursor-pointer" onClick={robotClick} title={phase === "done" ? "Replay intro" : undefined}>
            <Robot className="h-64 w-auto md:h-72" />
          </div>
        </div>
      </div>

      <p className={`absolute bottom-16 left-1/2 -translate-x-1/2 font-mono text-xs uppercase tracking-widest text-muted transition-opacity duration-300 ${faded}`}>
        <span className="animate-pulse">tap anywhere to see her work</span>
      </p>
    </div>
  );
}
