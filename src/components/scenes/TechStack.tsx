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
  SiPostgresql,
  SiApacheairflow,
  SiTrino,
  SiDocker,
  SiGit,
  SiGithub,
  SiGitlab,
  SiVercel,
  SiMlflow,
  SiPrometheus,
  SiGrafana,
  SiGooglecloud,
  SiJupyter,
} from "react-icons/si";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Tech = { name: string; Icon?: IconType; mono?: string };

// Anushka's stack. Logos where a clean brand mark exists; tidy monograms for
// the few that don't (Qdrant, Iceberg, AWS, Azure, etc.).
const TECH: Tech[] = [
  { name: "Python", Icon: SiPython },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "SQL", mono: "SQL" },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Linux", Icon: SiLinux },
  { name: "FastAPI", Icon: SiFastapi },
  { name: "Pydantic", Icon: SiPydantic },
  { name: "PyTorch", Icon: SiPytorch },
  { name: "TensorFlow", Icon: SiTensorflow },
  { name: "Keras", Icon: SiKeras },
  { name: "scikit-learn", Icon: SiScikitlearn },
  { name: "OpenCV", Icon: SiOpencv },
  { name: "NumPy", Icon: SiNumpy },
  { name: "Pandas", Icon: SiPandas },
  { name: "LangChain", Icon: SiLangchain },
  { name: "LangGraph", mono: "LG" },
  { name: "Ollama", Icon: SiOllama },
  { name: "Qdrant", mono: "QD" },
  { name: "Groq", mono: "GQ" },
  { name: "Hugging Face", Icon: SiHuggingface },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Airflow", Icon: SiApacheairflow },
  { name: "Trino", Icon: SiTrino },
  { name: "Iceberg", mono: "IB" },
  { name: "Docker", Icon: SiDocker },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "GitLab", Icon: SiGitlab },
  { name: "Vercel", Icon: SiVercel },
  { name: "MLflow", Icon: SiMlflow },
  { name: "Prometheus", Icon: SiPrometheus },
  { name: "Grafana", Icon: SiGrafana },
  { name: "AWS", mono: "AWS" },
  { name: "GCP", Icon: SiGooglecloud },
  { name: "Azure", mono: "AZ" },
  { name: "Jupyter", Icon: SiJupyter },
];

export function TechStack() {
  return (
    <Section
      id="tech-stack"
      title="Tech stack."
      intro="The toolkit I reach for across the lifecycle — from data pipelines to deployed, monitored GenAI systems."
    >
      <Reveal
        stagger
        staggerAmount={0.018}
        className="flex flex-wrap justify-center gap-3"
      >
        {TECH.map((t) => {
          const Icon = t.Icon;
          return (
            <div
              key={t.name}
              className="group relative flex h-[94px] w-[94px] flex-col items-center justify-center gap-2 rounded-xl border border-line bg-paper text-ink transition duration-200 hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-[0_10px_30px_-14px_rgba(79,70,229,0.55)]"
            >
              {Icon ? (
                <Icon size={28} aria-hidden="true" />
              ) : (
                <span className="font-grotesk text-lg font-semibold">{t.mono}</span>
              )}
              <span className="max-w-[82px] truncate px-1 font-mono text-[10px] text-muted transition-colors group-hover:text-accent">
                {t.name}
              </span>

              {/* hover tooltip with the full name */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 font-mono text-[10px] text-paper opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {t.name}
              </span>
            </div>
          );
        })}
      </Reveal>
    </Section>
  );
}
