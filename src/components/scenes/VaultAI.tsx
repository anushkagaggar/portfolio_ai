import { Section, Chip } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Upload, Database, ArrowRight, Github, ExternalLink } from "lucide-react";
import { AGENTS, VAULTAI_STACK } from "@/data/projects";
import { siteConfig } from "@/config/site";

export function VaultAI() {
  return (
    <Section
      id="vaultai"
      title="VaultAI — a financial intelligence platform."
      intro="Not a chatbot. A production full-stack GenAI system: users bring their financial data, a RAG layer grounds every answer, and three agents plan, invest, and optimize — with confidence scoring and guardrails keeping the LLM honest."
    >
      {/* repo + live links */}
      <Reveal className="mb-10 flex flex-wrap gap-3">
        <a
          href={siteConfig.links.vaultaiLive}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-xs text-paper transition-colors hover:bg-accent"
        >
          <ExternalLink size={13} aria-hidden="true" />
          Live demo
        </a>
        <a
          href={siteConfig.links.vaultaiRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-accent hover:text-accent"
        >
          <Github size={13} aria-hidden="true" />
          GitHub repo
        </a>
      </Reveal>

      {/* the flow */}
      <Reveal>
        <div className="mb-10 flex flex-col items-stretch gap-3 rounded-xl border border-line bg-paper p-5 sm:flex-row sm:items-center">
          <FlowStep icon={<Upload size={16} />} title="Upload" sub="Financial data" />
          <FlowArrow />
          <FlowStep icon={<Database size={16} />} title="Qdrant" sub="User-isolated retrieval" />
          <FlowArrow />
          <div className="flex flex-1 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-center">
            <span className="font-mono text-xs text-accent">
              Plan · Invest · Goal agents
            </span>
          </div>
        </div>
      </Reveal>

      {/* agents */}
      <Reveal stagger className="grid gap-5 md:grid-cols-3">
        {AGENTS.map((a) => (
          <article key={a.name} className="rounded-xl border border-line bg-paper p-6">
            <h3 className="font-grotesk text-lg font-medium text-ink">{a.name}</h3>
            <p className="mt-1 font-mono text-xs text-accent">{a.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{a.detail}</p>
          </article>
        ))}
      </Reveal>

      {/* what makes it production-grade */}
      <Reveal className="mt-6 grid gap-3 sm:grid-cols-2">
        <Highlight
          title="Validation-driven analytics"
          body="Confidence scoring and guardrails reduce LLM hallucinations on financial outputs."
        />
        <Highlight
          title="Deterministic agents"
          body="LangGraph orchestration with reproducible financial simulations and optimization logic."
        />
      </Reveal>

      {/* stack */}
      <Reveal className="mt-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          stack
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {VAULTAI_STACK.map((s) => (
            <div key={s.layer} className="rounded-lg border border-line bg-paper px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {s.layer}
              </p>
              <p className="mt-1 text-sm text-ink">{s.value}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function FlowStep({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-lg border border-line bg-paper-2 px-4 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-paper text-ink">
        {icon}
      </span>
      <span>
        <span className="block font-grotesk text-sm font-medium text-ink">{title}</span>
        <span className="block font-mono text-[11px] text-muted">{sub}</span>
      </span>
    </div>
  );
}

function FlowArrow() {
  return (
    <span className="grid place-items-center text-muted">
      <ArrowRight size={16} className="hidden sm:block" aria-hidden="true" />
      <ArrowRight size={16} className="rotate-90 sm:hidden" aria-hidden="true" />
    </span>
  );
}

function Highlight({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <h4 className="font-grotesk text-base font-medium text-ink">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
