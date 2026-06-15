"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

/**
 * Plays the intro voice automatically, a couple of seconds after load.
 *
 * Reality check: browsers block audio-with-sound until the user has interacted
 * with the page, so a guaranteed zero-touch autoplay isn't possible. We do the
 * best achievable version: try to play after the configured delay, and if the
 * browser blocks it, arm a one-shot listener so the voice fires the instant the
 * visitor moves the mouse, scrolls, taps, or presses a key. No visible UI.
 */
export function IntroAudio() {
  useEffect(() => {
    const audio = new Audio(siteConfig.intro.audioUrl);
    audio.preload = "auto";
    let played = false;

    const play = () => {
      if (played) return;
      played = true;
      audio.play().catch(() => {
        // still blocked — leave it; nothing else we can do silently
      });
      cleanupGestures();
    };

    const gestures: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "wheel",
      "touchstart",
      "mousemove",
    ];
    const onGesture = () => play();
    const armGestures = () =>
      gestures.forEach((g) =>
        window.addEventListener(g, onGesture, { once: true, passive: true })
      );
    const cleanupGestures = () =>
      gestures.forEach((g) => window.removeEventListener(g, onGesture));

    const timer = window.setTimeout(() => {
      audio
        .play()
        .then(() => {
          played = true;
        })
        .catch(() => {
          // autoplay blocked — wait for the first interaction instead
          armGestures();
        });
    }, siteConfig.intro.autoplayDelayMs);

    return () => {
      window.clearTimeout(timer);
      cleanupGestures();
      audio.pause();
    };
  }, []);

  return null;
}
