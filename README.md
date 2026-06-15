# Anushka Maheshwari — Portfolio

A scroll-driven, white "engineering blueprint" portfolio.

Flow: **Hero** (name resolves from blur over a converging neural field) →
**About** (your photo starts centred, slides left as you scroll, then your intro
types itself out while the voice speaks) → **VaultAI** → **Experience** →
**Projects** → **Systems** → **Contact**. No on-screen buttons or labels in the
hero, no backend — fully static and free to host.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- GSAP + ScrollTrigger (pinned About sequence, scroll reveals, blur-to-solid hero)
- Lenis (smooth scroll)
- Canvas 2D (the neural field)
- lucide-react (icons)

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## One file to edit: `src/config/site.ts`

Everything personal lives here — name, role, tagline, email, phone, **every
link**, your **photo** path, and your **intro paragraph** (the text that's both
typed on screen and spoken). Longer content (project bullets, skills,
experience) is in `src/data/`.

To change your photo, drop a new image in `public/images/` and update
`about.photo`. Typewriter speed is `about.typeSpeedMs`.

## The intro voice

The voice plays when the **About** section scrolls into view, in time with the
typewriter. Because scrolling there is itself a user interaction, the browser
allows playback reliably (no autoplay-blocking issues). There's no visible audio
control by design. The site stays silent until you generate the audio file.

### Generate the voice (one time, Python)

```bash
pip install -r requirements.txt          # groq, python-dotenv
# put your key in .env:  GROQ_API_KEY=gsk_...
python scripts/generate_intro.py         # writes public/audio/intro.mp3
```

The script reads `.env` via `load_dotenv()` and speaks the same paragraph as
`siteConfig.about.intro` — keep the two in sync if you change the wording. Get a
free key at https://console.groq.com (accept the `playai-tts` terms once).
Commit the resulting MP3; the live site only plays the file and never calls an
API. `.env` is gitignored — never commit real keys.

## Deploy

Push to GitHub, import the repo at https://vercel.com — automatic builds. For a
static export to host anywhere, uncomment the `output: "export"` lines in
`next.config.ts` and run `npm run build` (outputs to `out/`).

## Structure

```
src/
  app/            layout, page (section order), globals.css
  config/site.ts  ← all personal info, links, photo, intro text
  components/
    layout/       SmoothScroll (Lenis+GSAP), StickyNav
    hero/         Hero, NeuralField (canvas)
    scenes/       AboutIntro, VaultAI, Experience, Projects, AISystems, Contact
    ui/           Section, Chip, Reveal, Typewriter
  hooks/          useReducedMotion
  data/           projects, skills, experience
scripts/          generate_intro.py
.env / .env.example / requirements.txt   ← voice generation
```
