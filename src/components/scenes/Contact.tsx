"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Send } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const subject = `Portfolio enquiry${name.trim() ? ` from ${name.trim()}` : ""}`;
    const signoff =
      name.trim() || email.trim()
        ? `\n\n— ${name.trim()}${email.trim() ? ` (${email.trim()})` : ""}`
        : "";
    const body = `${message.trim()}${signoff}`;
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      siteConfig.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field =
    "w-full rounded-lg border border-line bg-paper-2 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent";
  const labelText =
    "mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted";

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
          Have a role, a project, or just an idea? Drop me a message and it lands
          straight in my inbox.
        </p>
      </Reveal>

      <Reveal className="mt-10 w-full max-w-xl">
        <form
          onSubmit={handleSubmit}
          className="box-hover flex flex-col gap-4 rounded-2xl border border-line bg-paper p-6 md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelText}>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={field}
              />
            </label>
            <label className="block">
              <span className={labelText}>Your email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={field}
              />
            </label>
          </div>

          <label className="block">
            <span className={labelText}>Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
              placeholder="Your message here..."
              className={`${field} resize-none`}
            />
          </label>

          <button
            type="submit"
            disabled={!message.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 font-grotesk text-sm font-medium text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={15} aria-hidden="true" />
            Send message
          </button>

          <p
            className={`text-center text-sm ${sent ? "text-accent" : "text-muted"}`}
            aria-live="polite"
          >
            {sent
              ? "Your message is ready in Gmail — just hit send. Looking forward to connecting!"
              : "Looking forward to connecting — I'll get back to you soon."}
          </p>
        </form>
      </Reveal>
    </section>
  );
}
