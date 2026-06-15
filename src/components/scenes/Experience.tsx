import { Section, Chip } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EXPERIENCE } from "@/data/experience";

const TECH_BY_ORG: Record<string, string[]> = {
  "Drona Pay": ["Apache Airflow", "Trino", "Iceberg", "SQL"],
  "IBM SkillsBuild": ["Python", "pandas", "NumPy", "scikit-learn"],
};

const HIGHLIGHT_BY_ORG: Record<string, string> = {
  "Drona Pay": "−50% storage",
};

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience."
      intro="Where the engineering met production — building and shipping the data layer behind real systems."
    >
      <Reveal stagger className="grid gap-5">
        {EXPERIENCE.map((role) => (
          <article key={role.org} className="rounded-xl border border-line bg-paper p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div>
                <h3 className="font-grotesk text-xl font-medium text-ink">{role.title}</h3>
                <p className="text-sm text-muted">
                  {role.org} · {role.location}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {HIGHLIGHT_BY_ORG[role.org] ? (
                  <span className="rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent">
                    {HIGHLIGHT_BY_ORG[role.org]}
                  </span>
                ) : null}
                <span className="font-mono text-xs text-muted">{role.period}</span>
              </div>
            </div>

            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-ink/80">
              {role.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {pt}
                </li>
              ))}
            </ul>

            {TECH_BY_ORG[role.org] ? (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {TECH_BY_ORG[role.org].map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
