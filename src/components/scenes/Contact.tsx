import { Reveal } from "@/components/ui/Reveal";
import { Github, Linkedin, Mail, Phone, FileText, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { EDUCATION } from "@/data/experience";

export function Contact() {
  const links = [
    { label: "GitHub", href: siteConfig.links.github, icon: <Github size={16} />, ext: true },
    { label: "LinkedIn", href: siteConfig.links.linkedin, icon: <Linkedin size={16} />, ext: true },
    { label: "Email", href: `mailto:${siteConfig.email}`, icon: <Mail size={16} />, ext: false },
    { label: "Phone", href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`, icon: <Phone size={16} />, ext: false },
    { label: "Resume", href: siteConfig.links.resume, icon: <FileText size={16} />, ext: true },
  ];

  return (
    <section
      id="contact"
      className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-28 md:px-10"
    >
      <Reveal>
        <h2 className="max-w-3xl font-grotesk text-3xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
          Let&apos;s build something intelligent.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Open to AI / ML engineering roles. The fastest way to reach me is below.
        </p>
      </Reveal>

      <Reveal stagger className="mt-10 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.ext ? "_blank" : undefined}
            rel={l.ext ? "noopener noreferrer" : undefined}
            className="group flex items-center justify-between rounded-xl border border-line bg-paper px-5 py-4 transition-colors hover:border-accent"
          >
            <span className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-paper-2 text-ink transition-colors group-hover:text-accent">
                {l.icon}
              </span>
              <span className="font-grotesk text-base font-medium text-ink">{l.label}</span>
            </span>
            <ArrowUpRight
              size={16}
              className="text-muted transition-colors group-hover:text-accent"
              aria-hidden="true"
            />
          </a>
        ))}
      </Reveal>

      <Reveal className="mt-12 border-t border-line pt-6">
        <div className="flex flex-col gap-1">
          <p className="font-grotesk text-sm font-medium text-ink">{EDUCATION.school}</p>
          <p className="text-sm text-muted">
            {EDUCATION.degree} · {EDUCATION.grade} · {EDUCATION.period}
          </p>
        </div>
        <p className="mt-8 font-mono text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name} — built with Next.js, GSAP &amp; Lenis.
        </p>
      </Reveal>
    </section>
  );
}
