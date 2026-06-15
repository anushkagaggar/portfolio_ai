import { Section, Chip } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SKILL_GROUPS } from "@/data/skills";

// headline technologies for the scrolling strip
const MARQUEE = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "scikit-learn",
  "FastAPI",
  "LangGraph",
  "LangChain",
  "Qdrant",
  "Groq",
  "Apache Airflow",
  "Trino",
  "Docker",
  "Next.js",
  "Hugging Face",
  "AWS",
];

export function TechStack() {
  return (
    <Section
      id="tech-stack"
      title="Tech stack."
      intro="The toolkit I reach for across the lifecycle — from data pipelines to deployed, monitored GenAI systems."
    >
      {/* scrolling strip of headline tech */}
      <div className="marquee-mask relative mb-12 overflow-hidden border-y border-line py-4">
        <div className="marquee-track flex gap-3">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span
              key={i}
              className="shrink-0 rounded-md border border-line bg-paper px-3 py-1.5 font-mono text-xs text-ink"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* categorized groups */}
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
