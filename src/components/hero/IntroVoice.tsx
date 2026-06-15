"use client";

import { Play, Volume2, Square } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";
import { PROFILE } from "@/lib/constants";

/**
 * A small, non-blocking control that plays the intro voice. The click itself
 * is the gesture browsers require to allow sound — so this is how the voice
 * gets unlocked. If no audio file exists yet, the button still renders and
 * simply does nothing audible.
 */
export function IntroVoice() {
  const { play, stop, status } = useAudio(PROFILE.introAudioUrl);

  if (status === "playing") {
    return (
      <button
        type="button"
        onClick={stop}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-accent"
      >
        <Square size={13} aria-hidden="true" />
        Stop intro
      </button>
    );
  }

  const played = status === "done";
  return (
    <button
      type="button"
      onClick={play}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {played ? (
        <Volume2 size={13} aria-hidden="true" />
      ) : (
        <Play size={13} aria-hidden="true" />
      )}
      {played ? "Replay intro" : "Play intro"}
    </button>
  );
}
