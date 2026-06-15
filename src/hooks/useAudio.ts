"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "playing" | "done" | "unavailable";

/**
 * Plays a single audio file in response to a user gesture (a click).
 * Browsers block sound on load, so playback MUST be triggered by an interaction.
 * If the file is missing or playback is blocked, we fail silently and the site
 * works exactly the same — just without sound.
 */
export function useAudio(src: string) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = "none";
    const onEnded = () => setStatus("done");
    const onError = () => setStatus("unavailable");
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    ref.current = audio;
    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [src]);

  const play = useCallback(async () => {
    const audio = ref.current;
    if (!audio) return;
    try {
      audio.currentTime = 0;
      await audio.play();
      setStatus("playing");
    } catch {
      setStatus("unavailable");
    }
  }, []);

  const stop = useCallback(() => {
    const audio = ref.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setStatus("done");
  }, []);

  return { play, stop, status };
}
