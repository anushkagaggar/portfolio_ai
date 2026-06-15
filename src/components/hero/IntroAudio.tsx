"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

/**
 * Plays the intro voice automatically, a couple of seconds after load.
 *
 * Two layers:
 *  1) If public/audio/intro.mp3 exists (generated via scripts/generate_intro.py),
 *     it plays that high-quality file.
 *  2) If the file is missing OR autoplay is blocked, it falls back to the
 *     browser's built-in speech synthesis speaking the tagline — so the voice
 *     is never silent, even with zero setup.
 *
 * Browsers block sound until the visitor interacts with the page, so when the
 * first attempt is blocked we wait for the first gesture (mouse move, scroll,
 * tap, key) and then play. No visible UI.
 */
export function IntroAudio() {
  useEffect(() => {
    const audio = new Audio(siteConfig.intro.audioUrl);
    audio.preload = "auto";
    let done = false;
    let interacted = false;

    const speak = () => {
      if (done) return;
      const synth = window.speechSynthesis;
      if (!synth) return;
      const u = new SpeechSynthesisUtterance(siteConfig.tagline);
      u.rate = 1;
      u.pitch = 1;
      synth.cancel();
      synth.speak(u);
      done = true;
    };

    const tryPlay = () => {
      if (done) return;
      audio
        .play()
        .then(() => {
          done = true;
        })
        .catch(() => {
          // mp3 missing or playback failed — use browser speech if we may
          if (interacted) speak();
        });
    };

    const gestures: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "wheel",
      "touchstart",
      "mousemove",
    ];
    const cleanup = () =>
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
    function onGesture() {
      interacted = true;
      tryPlay();
      cleanup();
    }
    const arm = () =>
      gestures.forEach((g) =>
        window.addEventListener(g, onGesture, { passive: true })
      );

    const timer = window.setTimeout(() => {
      audio
        .play()
        .then(() => {
          done = true;
        })
        .catch(() => {
          // blocked or missing — wait for the first interaction, then retry
          arm();
        });
    }, siteConfig.intro.autoplayDelayMs);

    return () => {
      window.clearTimeout(timer);
      cleanup();
      audio.pause();
      window.speechSynthesis?.cancel();
    };
  }, []);

  return null;
}
