import { Reveal } from "@/components/ui/Reveal";

/** Small pill for a skill / tech tag */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-paper px-2.5 py-1 font-mono text-xs text-ink">
      {children}
    </span>
  );
}

type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
};

/** Consistent section frame: title → intro → content. Heading drifts on scroll. */
export function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section
      id={id}
      className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-28 md:px-10"
    >
      <Reveal>
        <h2 className="max-w-3xl font-grotesk text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
        {intro ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {intro}
          </p>
        ) : null}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
