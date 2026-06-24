import { Reveal } from "@/components/ui/Reveal";
import { FileText } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { siteConfig } from "@/config/site";

type Tab = {
  label: string;
  href: string;
  hover: string;
  icon?: React.ReactNode;
  img?: string;
};

export function Contact() {
  // Opens a Gmail compose window addressed to me (works without a desktop mail client).
  const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    siteConfig.email
  )}`;

  const tabs: Tab[] = [
    { label: "Gmail", href: gmailCompose, img: "/images/gmail.png", hover: "#EA4335" },
    { label: "LinkedIn", href: siteConfig.links.linkedin, icon: <FaLinkedin size={22} />, hover: "#0A66C2" },
    { label: "GitHub", href: siteConfig.links.github, icon: <SiGithub size={22} />, hover: "#181717" },
    { label: "Resume", href: siteConfig.links.resume, icon: <FileText size={21} />, hover: "#4F46E5" },
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

      <Reveal stagger className="mt-12 flex flex-wrap gap-7">
        {tabs.map((t) => (
          <a
            key={t.label}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.label}
            style={{ ["--brand" as string]: t.hover } as React.CSSProperties}
            className="group flex flex-col items-center gap-2.5"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full border border-line bg-paper text-ink transition duration-200 group-hover:-translate-y-1 group-hover:border-[var(--brand)] group-hover:text-[var(--brand)] group-hover:shadow-[0_12px_30px_-14px_var(--brand)]">
              {t.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={t.img}
                  alt=""
                  aria-hidden="true"
                  className="h-6 w-6 object-contain grayscale transition duration-300 group-hover:grayscale-0"
                />
              ) : (
                t.icon
              )}
            </span>
            <span className="font-mono text-xs text-muted transition-colors group-hover:text-ink">
              {t.label}
            </span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
