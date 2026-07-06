"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section, Chip } from "@/components/ui/Section";
import { EXPERIENCE, EDUCATION } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

type Milestone = {
  period: string; title: string; org: string; location?: string;
  points: string[]; tech?: string[];
};

const TECH_BY_ORG: Record<string, string[]> = {
  "Drona Pay": ["Apache Airflow", "Trino", "Iceberg", "SQL"],
  "IBM SkillsBuild": ["Python", "pandas", "NumPy", "scikit-learn"],
};

const MILESTONES: Milestone[] = [
  {
    period: EDUCATION.period, title: EDUCATION.degree, org: EDUCATION.school,
    points: [`Graduated with ${EDUCATION.grade}.`],
  },
  ...[...EXPERIENCE].reverse().map((r) => ({
    period: r.period, title: r.title, org: r.org, location: r.location,
    points: r.points, tech: TECH_BY_ORG[r.org],
  })),
];

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!track || !progress) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: track, start: "top 65%", end: "bottom 75%", scrub: true, invalidateOnRefresh: true },
        }
      );
      gsap.from("[data-milestone]", {
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out", stagger: 0.14,
        scrollTrigger: { trigger: track, start: "top 75%", once: true, invalidateOnRefresh: true },
      });
    }, track);

    const fb = window.setTimeout(() => {
      if (track.getBoundingClientRect().top < window.innerHeight) {
        gsap.set("[data-milestone]", { opacity: 1, y: 0 });
      }
    }, 1600);

    return () => { window.clearTimeout(fb); ctx.revert(); };
  }, []);

  return (
    <Section
      id="experience"
      title="The road so far."
      intro="From an AI & ML degree into shipping production data systems — each stop built on the last."
    >
      <div ref={trackRef} className="relative">
        <span className="absolute left-[14px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
        <span ref={progressRef} className="absolute left-[14px] top-2 bottom-2 w-px origin-top bg-accent" aria-hidden="true" />

        <div className="relative flex flex-col gap-10">
          {MILESTONES.map((m, i) => (
            <div key={i} data-milestone className="grid grid-cols-[28px_1fr] gap-5">
              <div className="relative flex justify-center pt-1.5">
                <span className="relative z-10 h-3.5 w-3.5 rounded-full border-2 border-accent bg-paper" />
              </div>
              <article className="box-hover rounded-xl border border-line bg-paper p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{m.period}</p>
                <h3 className="mt-2 font-grotesk text-xl font-medium text-ink">{m.title}</h3>
                <p className="text-sm text-muted">{m.org}{m.location ? ` · ${m.location}` : ""}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/80">
                  {m.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{pt}
                    </li>
                  ))}
                </ul>
                {m.tech && m.tech.length ? (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {m.tech.map((t) => <Chip key={t}>{t}</Chip>)}
                  </div>
                ) : null}
              </article>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
