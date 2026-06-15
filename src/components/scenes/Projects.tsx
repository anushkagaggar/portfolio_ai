import { Section, Chip } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";
import { FOUNDATION_PROJECTS } from "@/data/projects";

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects."
      intro="Hands-on builds across computer vision and time-series — from preprocessing to a working model."
    >
      <Reveal stagger className="grid gap-5 md:grid-cols-2">
        {FOUNDATION_PROJECTS.map((p) => (
          <article
            key={p.title}
            className="group rounded-xl border border-line bg-paper p-6 transition-colors hover:border-ink/30"
          >
            <h3 className="font-grotesk text-xl font-medium text-ink">{p.title}</h3>
            <p className="mt-1 text-sm text-muted">{p.tagline}</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/80">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              {p.link ? (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-accent"
                >
                  {p.link.label}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
