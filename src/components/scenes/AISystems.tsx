import { Section, Chip } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SKILL_GROUPS } from "@/data/skills";

export function AISystems() {
  return (
    <Section
      id="ai-systems"
      title="The full stack, end to end."
      intro="From data pipelines to deployed, monitored GenAI systems — the toolkit I reach for across the lifecycle."
    >
      <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title} className="rounded-xl border border-line bg-paper p-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              {group.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
