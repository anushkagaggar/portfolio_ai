"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, FileText } from "lucide-react";
import type Lenis from "lenis";
import { siteConfig, SCENES } from "@/config/site";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -64 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function StickyNav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = SCENES.filter((s) => s.id !== "hero");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-paper/85 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
        <button
          type="button"
          onClick={() => scrollToId("hero")}
          className="font-grotesk text-sm font-medium tracking-tight text-ink"
          aria-label="Back to top"
        >
          A<span className="text-accent">.</span>M
        </button>

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

        <div className="flex items-center gap-1.5">
          <IconLink href={siteConfig.links.github} label="GitHub">
            <Github size={16} />
          </IconLink>
          <IconLink href={siteConfig.links.linkedin} label="LinkedIn">
            <Linkedin size={16} />
          </IconLink>
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

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-paper-2 hover:text-ink"
    >
      {children}
    </a>
  );
}
