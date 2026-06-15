"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

/**
 * Plays the intro voice automatically, a couple of seconds after load.
 * Browsers block audio-with-sound until the user interacts with the page, so a
 * guaranteed zero-touch autoplay isn't possible. We try after the configured
 * delay, and if blocked, arm a one-shot listener so the voice fires the instant
 * the visitor moves the mouse, scrolls, taps, or presses a key. No visible UI.
 */
export function IntroAudio() {
  useEffect(() => {
    const audio = new Audio(siteConfig.intro.audioUrl);
    audio.preload = "auto";
    let played = false;

    const gestures: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "wheel",
      "touchstart",
      "mousemove",
    ];
    const onGesture = () => play();
    const cleanupGestures = () =>
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
    const armGestures = () =>
      gestures.forEach((g) =>
        window.addEventListener(g, onGesture, { once: true, passive: true })
      );

    function play() {
      if (played) return;
      played = true;
      audio.play().catch(() => {});
      cleanupGestures();
    }

    const timer = window.setTimeout(() => {
      audio
        .play()
        .then(() => {
          played = true;
        })
        .catch(() => {
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
