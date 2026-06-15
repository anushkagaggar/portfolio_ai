"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  /** flips to true to begin typing */
  active: boolean;
  /** ms per character */
  speed?: number;
  className?: string;
  /** render the full text instantly (e.g. reduced motion) */
  instant?: boolean;
};

export function Typewriter({
  text,
  active,
  speed = 42,
  className,
  instant = false,
}: TypewriterProps) {
  const [out, setOut] = useState(instant ? text : "");
  const [done, setDone] = useState(instant);

  useEffect(() => {
    if (instant) {
      setOut(text);
      setDone(true);
      return;
    }
    if (!active) return;

    setOut("");
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [active, text, instant, speed]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
      <span
        aria-hidden="true"
        className={`ml-0.5 inline-block w-[2px] -translate-y-0.5 self-center bg-accent align-middle ${
          done ? "opacity-0" : "animate-pulse"
        }`}
        style={{ height: "0.9em" }}
      />
    </span>
  );
}
