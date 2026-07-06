// ──────────────────────────────────────────────────────────────────────────
// SITE CONFIG - the only file you need to edit for personal info & links.
// Everything (nav, hero, scenes, footer) reads from here.
// ──────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Anushka Maheshwari",
  role: "AI Engineer",

  // Spoken by the intro voice and shown as the hero subtitle.
  tagline: "I engineer intelligent systems that turn data into decisions.",

  email: "gaggaranushka@gmail.com",
  phone: "+91 9462877942",

  // Every embedded link in the whole site is here.
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
    // tapping the phone opens a WhatsApp chat (country code + number, no +/spaces)
    whatsapp: "https://wa.me/919462877942",
  },

  intro: {
    // Generated once and stored (see scripts/generate_intro.py). The live site
    // only plays this file - it never calls an API.
    audioUrl: "/audio/intro.mp3",
    // How long after load before the voice attempts to play.
    autoplayDelayMs: 1500,
    // What the browser voice says if the mp3 file isn't present yet.
    spokenText:
      "Hi, I'm Anushka Maheshwari. I engineer intelligent systems that turn data into decisions.",
  },
} as const;

export type Scene = { id: string; label: string };

// Order here defines the scroll journey and the nav.
export const SCENES: Scene[] = [
  { id: "hero", label: "intro" },
  { id: "vaultai", label: "vaultai" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "tech-stack", label: "tech" },
  { id: "contact", label: "contact" },
];
