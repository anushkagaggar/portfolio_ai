// ──────────────────────────────────────────────────────────────
// Edit this file first. Everything personal lives here.
// ──────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Anushka Maheshwari",
  role: "AI Engineer",
  // The line your intro voice speaks, and the hero subtitle.
  tagline: "I engineer intelligent systems that turn data into decisions.",
  email: "gaggaranushka@gmail.com",

  // TODO: replace with your real profile URLs
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-handle",

  // TODO: drop your CV at public/resume/ and keep this path in sync
  resumeUrl: "/resume/Anushka_Maheshwari_CV.pdf",

  // TODO: generate this once (see README) — site stays silent if absent
  introAudioUrl: "/audio/intro.mp3",
} as const;

export type Scene = {
  id: string;
  index: string;
  label: string;
};

// Order here defines both the nav and the scroll journey.
export const SCENES: Scene[] = [
  { id: "hero", index: "00", label: "intro" },
  { id: "foundation", index: "01", label: "foundation" },
  { id: "data-engineering", index: "02", label: "data engineering" },
  { id: "vaultai", index: "03", label: "vaultai" },
  { id: "ai-systems", index: "04", label: "ai systems" },
  { id: "contact", index: "05", label: "contact" },
];
