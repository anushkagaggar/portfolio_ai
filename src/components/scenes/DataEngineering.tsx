import { Section, Chip } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EXPERIENCE } from "@/data/experience";

export function DataEngineering() {
  const drona = EXPERIENCE[0];

  return (
    <Section
      id="data-engineering"
      title="Pipelines that hold up in production."
      intro="At Drona Pay, I built the data layer underneath the models — dynamic ETL, query optimization, and automated cleanup at scale."
    >
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
        <Reveal>
          <div className="rounded-xl border border-line bg-paper p-6">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <h3 className="font-grotesk text-xl font-medium text-ink">{drona.title}</h3>
                <p className="text-sm text-muted">{drona.org}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted">{drona.period}</span>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-ink/80">
              {drona.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["Apache Airflow", "Trino", "Iceberg", "SQL"].map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-accent/30 bg-accent-soft p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              impact
            </p>
            <p className="mt-3 font-grotesk text-6xl font-medium tracking-tight text-ink">
              50%
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              reduction in data lake storage, via automated snapshot and
              orphan-file cleanup on Iceberg tables.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
