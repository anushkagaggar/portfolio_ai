"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

// Prefer a female English voice for the browser-speech fallback.
function pickFemaleVoice(voices: SpeechSynthesisVoice[]) {
  const en = voices.filter((v) => /^en/i.test(v.lang));
  const pool = en.length ? en : voices;
  const prefer = [
    /female/i,
    /samantha/i,
    /victoria/i,
    /karen/i,
    /tessa/i,
    /moira/i,
    /fiona/i,
    /zira/i,
    /aria/i,
    /jenny/i,
    /libby/i,
    /sonia/i,
    /google uk english female/i,
    /google us english/i,
  ];
  for (const re of prefer) {
    const v = pool.find((x) => re.test(x.name));
    if (v) return v;
  }
  return pool[0];
}

/**
 * Plays the intro voice. If public/audio/intro.mp3 exists (generated via
 * scripts/generate_intro.py) it plays that. If not, it falls back to the
 * browser's speech synthesis using a female voice. Browsers block sound until
 * the visitor interacts, so it tries shortly after load and otherwise fires on
 * the first interaction - reliably, on every reload.
 */
export function IntroAudio() {
  useEffect(() => {
    const audio = new Audio(siteConfig.intro.audioUrl);
    audio.preload = "auto";
    let done = false;

    const speak = () => {
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
      if (synth.getVoices().length) {
        utter();
      } else {
        const onVoices = () => {
          synth.removeEventListener("voiceschanged", onVoices);
          utter();
        };
        synth.addEventListener("voiceschanged", onVoices);
        window.setTimeout(utter, 300); // safety if the event never fires
      }
    };

    // play the mp3, or speak as a fallback
    const start = () => {
      if (done) return;
      done = true;
      audio.play().catch(() => speak());
    };

    // optimistic attempt after load (works only if the browser allows it)
    const timer = window.setTimeout(() => {
      if (done) return;
      audio
        .play()
        .then(() => {
          done = true;
        })
        .catch(() => {
          /* blocked - the first interaction below will start it */
        });
    }, siteConfig.intro.autoplayDelayMs);

    // first interaction guarantees playback on every load/reload
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "wheel",
      "touchstart",
      "scroll",
      "mousemove",
    ];
    const onInteract = () => {
      start();
      cleanup();
    };
    const cleanup = () =>
      events.forEach((e) => window.removeEventListener(e, onInteract));
    events.forEach((e) =>
      window.addEventListener(e, onInteract, { passive: true })
    );

    return () => {
      window.clearTimeout(timer);
      cleanup();
      audio.pause();
      window.speechSynthesis?.cancel();
    };
  }, []);

  return null;
}
