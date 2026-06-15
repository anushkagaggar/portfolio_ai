// ──────────────────────────────────────────────────────────────────────────
// SITE CONFIG — the only file you need to edit for personal info & links.
// Everything (nav, hero, about, scenes, footer) reads from here.
// ──────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Anushka Maheshwari",
  role: "AI Engineer",

  // Short punchy line shown in the hero under your name.
  tagline: "I engineer intelligent systems that turn data into decisions.",

  email: "gaggaranushka@gmail.com",
  phone: "+91 9462877942",

  // Every embedded link in the whole site lives here.
  links: {
    github: "https://github.com/anushkagaggar",
    linkedin: "https://www.linkedin.com/in/anushka-maheshwari-6a4ab7269/",
    resume:
      "https://drive.google.com/file/d/1QzH8r6cx3ZmUQsl8V9tMpLDDDadp7ujU/view?usp=drive_link",

    // project links
    vaultaiRepo: "https://github.com/anushkagaggar/vaultai",
    vaultaiLive: "https://vaultai-frontend.vercel.app/",
    facialEmotion:
      "https://drive.google.com/drive/folders/1OYkb0HsqfWrwHNHcZmkeArf2zsScd-rS?usp=sharing",
    stockPrediction:
      "https://colab.research.google.com/drive/1OUsREtmrP-JYkY1W2qPaQsTi1bl8e8hn?usp=sharing",
  },

  about: {
    // Swap this file in public/images to change your photo.
    photo: "/images/anushka.jpg",

    // This paragraph is BOTH typed on screen and spoken by the voice.
    // If you regenerate the audio, keep scripts/generate_intro.py in sync.
    intro:
      "I'm Anushka Maheshwari, an AI engineer who builds intelligent systems end to end — from data pipelines to deployed, agentic GenAI platforms. I work across machine learning, deep learning, NLP, and data engineering, turning messy data into decisions people can act on. Most recently I built VaultAI, a production financial-intelligence platform with retrieval-grounded answers and a multi-agent core. I care about systems that are reliable, measurable, and honest about their own confidence.",

    // milliseconds per character of the typewriter (lower = faster typing)
    typeSpeedMs: 42,
  },

  intro: {
    // Generated once and stored (see scripts/generate_intro.py). The live site
    // only plays this file — it never calls an API. Plays when the About
    // section comes into view (a scroll counts as the interaction browsers
    // require, so it plays reliably).
    audioUrl: "/audio/intro.mp3",
  },
} as const;

export type Scene = { id: string; label: string };

// Order here defines the scroll journey and the nav.
export const SCENES: Scene[] = [
  { id: "hero", label: "intro" },
  { id: "about", label: "about" },
  { id: "vaultai", label: "vaultai" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "ai-systems", label: "systems" },
  { id: "contact", label: "contact" },
];
