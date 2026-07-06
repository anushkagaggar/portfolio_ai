import type { IconType } from "react-icons";
import {
  SiPython,
  SiPostgresql,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiKeras,
  SiScikitlearn,
  SiPytorch,
  SiTensorflow,
  SiOpencv,
  SiFastapi,
  SiPydantic,
  SiLangchain,
  SiOllama,
  SiHuggingface,
  SiGooglecloud,
  SiVercel,
  SiDocker,
  SiMlflow,
  SiPrometheus,
  SiGrafana,
  SiGit,
  SiGithub,
  SiGitlab,
  SiApacheairflow,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Tech = {
  name: string;
  Icon?: IconType;
  color?: string; // brand colour revealed on hover
  img?: string; // full-colour logo (greyscale until hover)
  wordmark?: string;
  mono?: string;
};

// Inverted triangle (8/7/6/5/4/3) in priority order.
const ROWS: Tech[][] = [
  [
    { name: "Python", Icon: SiPython, color: "#3776AB" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
    { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
    { name: "NumPy", Icon: SiNumpy, color: "#4DABCF" },
    { name: "Pandas", Icon: SiPandas, color: "#150458" },
    { name: "Matplotlib", img: "/images/matplotlib.png" },
    { name: "Keras", Icon: SiKeras, color: "#D00000" },
    { name: "scikit-learn", Icon: SiScikitlearn, color: "#F7931E" },
  ],
  [
    { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
    { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
    { name: "OpenCV", Icon: SiOpencv, color: "#5C3EE8" },
    { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
    { name: "Pydantic", Icon: SiPydantic, color: "#E92063" },
    { name: "LangChain", Icon: SiLangchain, color: "#1C3C3C" },
    { name: "LangGraph", img: "/images/langgraph.png" },
  ],
  [
    { name: "Ollama", Icon: SiOllama, color: "#000000" },
    { name: "Groq", wordmark: "groq", color: "#F04D22" },
    { name: "Qdrant", img: "/images/qdrant.png" },
    { name: "AWS", img: "/images/aws.png" },
    { name: "GCP", Icon: SiGooglecloud, color: "#4285F4" },
    { name: "Vercel", Icon: SiVercel, color: "#000000" },
  ],
  [
    { name: "Hugging Face", Icon: SiHuggingface, color: "#FFD21E" },
    { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    { name: "MLflow", Icon: SiMlflow, color: "#0194E2" },
    { name: "Prometheus", Icon: SiPrometheus, color: "#E6522C" },
    { name: "Grafana", Icon: SiGrafana, color: "#F46800" },
  ],
  [
    { name: "Git", Icon: SiGit, color: "#F05032" },
    { name: "GitHub", Icon: SiGithub, color: "#181717" },
    { name: "GitLab", Icon: SiGitlab, color: "#FC6D26" },
    { name: "Apache Airflow", Icon: SiApacheairflow, color: "#017CEE" },
  ],
  [
    { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
    { name: "Linux", img: "/images/linux.png" },
  ],
];

function Tile({ t }: { t: Tech }) {
  const Icon = t.Icon;
  return (
    <div
      style={{ ["--brand" as string]: t.color ?? "var(--color-accent)" } as React.CSSProperties}
      className="transition duration-200 hover:-translate-y-1 hover:scale-[1.03] hover:border-accent hover:shadow-[0_16px_36px_-16px_rgba(79,70,229,0.45)] group relative flex h-[84px] w-[84px] flex-col items-center justify-center gap-2 rounded-xl border border-line bg-paper text-ink"
    >
      {Icon ? (
        <Icon
          size={26}
          aria-hidden="true"
          className="transition-colors duration-200 group-hover:text-[var(--brand)]"
        />
      ) : t.img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={t.img}
          alt=""
          aria-hidden="true"
          className="h-7 w-auto max-w-[52px] object-contain grayscale transition duration-300 group-hover:grayscale-0"
        />
      ) : t.wordmark ? (
        <span className="font-grotesk text-xl font-bold lowercase tracking-tight transition-colors duration-200 group-hover:text-[var(--brand)]">
          {t.wordmark}
        </span>
      ) : (
        <span className="font-grotesk text-base font-semibold transition-colors duration-200 group-hover:text-[var(--brand)]">
          {t.mono}
        </span>
      )}
      <span className="max-w-[74px] truncate px-1 font-mono text-[10px] text-muted transition-colors group-hover:text-ink">
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
      intro="The toolkit I reach for across the lifecycle, from data pipelines to deployed, monitored GenAI systems."
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
    </Section>
  );
}
