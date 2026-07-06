"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, FileText, Mail } from "lucide-react";
import type Lenis from "lenis";
import { siteConfig, SCENES } from "@/config/site";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -64 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function StickyNav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = SCENES.filter((s) => s.id !== "hero" && s.id !== "vaultai");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-paper/85 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
        <ul className="hidden items-center gap-6 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => scrollToId(s.id)}
                className="font-mono text-xs text-muted transition-colors hover:text-ink"
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1.5">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:text-[#181717]"
          >
            <Github size={16} />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:text-[#0A66C2]"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:text-[#EA4335]"
          >
            <Mail size={16} />
          </a>
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1.5 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <FileText size={13} aria-hidden="true" />
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
