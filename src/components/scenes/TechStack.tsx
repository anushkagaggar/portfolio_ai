import type { IconType } from "react-icons";
import {
  SiPython,
  SiTypescript,
  SiNextdotjs,
  SiLinux,
  SiFastapi,
  SiPydantic,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiOpencv,
  SiNumpy,
  SiPandas,
  SiLangchain,
  SiOllama,
  SiHuggingface,
  SiApacheairflow,
  SiDocker,
  SiGit,
  SiGithub,
  SiGitlab,
  SiVercel,
  SiMlflow,
  SiPrometheus,
  SiGrafana,
  SiGooglecloud,
} from "react-icons/si";
import { Section, Chip } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Tech = { name: string; Icon?: IconType; mono?: string };

// Inverted triangle (widest row on top, narrowing to the point), filled in the
// requested priority order: languages → libraries → backend → LLM frameworks →
// GenAI/vector → cloud → deployment → version control → data engineering →
// frontend last. Tiles without a brand logo get a clean monogram.
const ROWS: Tech[][] = [
  [
    { name: "Python", Icon: SiPython },
    { name: "SQL", mono: "SQL" },
    { name: "NumPy", Icon: SiNumpy },
    { name: "Pandas", Icon: SiPandas },
    { name: "Matplotlib", mono: "MPL" },
    { name: "Keras", Icon: SiKeras },
    { name: "scikit-learn", Icon: SiScikitlearn },
    { name: "PyTorch", Icon: SiPytorch },
  ],
  [
    { name: "TensorFlow", Icon: SiTensorflow },
    { name: "OpenCV", Icon: SiOpencv },
    { name: "FastAPI", Icon: SiFastapi },
    { name: "Pydantic", Icon: SiPydantic },
    { name: "LangChain", Icon: SiLangchain },
    { name: "LangGraph", mono: "LG" },
    { name: "Ollama", Icon: SiOllama },
  ],
  [
    { name: "Groq", mono: "GQ" },
    { name: "Qdrant", mono: "QD" },
    { name: "Sentence Transformers", mono: "ST" },
    { name: "AWS", mono: "AWS" },
    { name: "GCP", Icon: SiGooglecloud },
    { name: "Vercel", Icon: SiVercel },
  ],
  [
    { name: "Hugging Face", Icon: SiHuggingface },
    { name: "Docker", Icon: SiDocker },
    { name: "MLflow", Icon: SiMlflow },
    { name: "Prometheus", Icon: SiPrometheus },
    { name: "Grafana", Icon: SiGrafana },
  ],
  [
    { name: "Alembic", mono: "AL" },
    { name: "Git", Icon: SiGit },
    { name: "GitHub", Icon: SiGithub },
    { name: "GitLab", Icon: SiGitlab },
  ],
  [
    { name: "Apache Airflow", Icon: SiApacheairflow },
    { name: "Iceberg", mono: "IB" },
    { name: "Next.js", Icon: SiNextdotjs },
  ],
  [
    { name: "TypeScript", Icon: SiTypescript },
    { name: "Linux", Icon: SiLinux },
  ],
];

// Methods & concepts from the resume that aren't "logo" tiles.
const CONCEPTS = [
  "ML",
  "Deep Learning",
  "Computer Vision",
  "NLP",
  "Generative AI",
  "Agentic AI",
  "RAG",
  "Prompt Engineering",
  "Confidence Scoring",
  "Guardrail Validation",
  "JWT Auth",
  "Async Programming",
  "ETL Pipelines",
  "Data Lake Optimization",
  "CI/CD",
];

function Tile({ t }: { t: Tech }) {
  const Icon = t.Icon;
  return (
    <div className="group relative flex h-[84px] w-[84px] flex-col items-center justify-center gap-2 rounded-xl border border-line bg-paper text-ink transition duration-200 hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-[0_10px_30px_-14px_rgba(79,70,229,0.55)]">
      {Icon ? (
        <Icon size={26} aria-hidden="true" />
      ) : (
        <span className="font-grotesk text-base font-semibold">{t.mono}</span>
      )}
      <span className="max-w-[74px] truncate px-1 font-mono text-[10px] text-muted transition-colors group-hover:text-accent">
        {t.name}
      </span>
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[10px] text-paper opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {t.name}
      </span>
    </div>
  );
}

export function TechStack() {
  return (
    <Section
      id="tech-stack"
      title="Tech stack."
      intro="The toolkit I reach for across the lifecycle — from data pipelines to deployed, monitored GenAI systems."
    >
      <Reveal stagger className="flex flex-col items-center gap-2.5">
        {ROWS.map((row, i) => (
          <div key={i} className="flex flex-wrap justify-center gap-2.5">
            {row.map((t) => (
              <Tile key={t.name} t={t} />
            ))}
          </div>
        ))}
      </Reveal>

      {/* methods & concepts, so nothing from the resume is left out */}
      <Reveal className="mx-auto mt-12 max-w-3xl border-t border-line pt-8">
        <p className="mb-4 text-center font-mono text-xs uppercase tracking-widest text-muted">
          methods &amp; concepts
        </p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {CONCEPTS.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
