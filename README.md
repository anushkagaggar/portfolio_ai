# Anushka Maheshwari — Portfolio

A scroll-driven, white "engineering blueprint" portfolio. The hero is a living
neural field that converges on load while the name resolves from blur to focus;
the intro voice plays on its own. No on-screen buttons, no labels, no backend —
fully static and free to host.

Flow: **Hero** → **Foundation** → **Data engineering** → **VaultAI** →
**Systems** → **Contact**.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- GSAP + ScrollTrigger (scroll reveals + blur-to-solid hero)
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

Every personal detail and **every link** lives in `src/config/site.ts` — name,
role, tagline, email, phone, and all URLs (GitHub, LinkedIn, resume, the VaultAI
repo + live demo, and the foundation project links). Change them there; nothing
is hardcoded in components. Longer content (project bullets, skills, experience)
lives in `src/data/`.

## The intro voice

The hero plays a short voice line a couple of seconds after the page loads.

Browsers block audio-with-sound until the visitor interacts with the page, so a
guaranteed zero-touch autoplay isn't possible. This site tries to play after the
delay in `siteConfig.intro.autoplayDelayMs`, and if blocked, the voice fires the
instant the visitor moves the mouse, scrolls, taps, or presses a key. No visible
audio control by design.

### Generate the voice (one time, Python)

```bash
pip install -r requirements.txt          # groq, python-dotenv
# put your key in .env:  GROQ_API_KEY=gsk_...
python scripts/generate_intro.py         # writes public/audio/intro.mp3
```

The script reads `.env` via `load_dotenv()`. Get a free key at
https://console.groq.com (accept the `playai-tts` terms once). Commit the
resulting MP3 — the live site only plays the file and never calls an API.
`.env` is gitignored; never commit real keys. The site stays silent until the
file exists.

## Deploy

Push to GitHub, import the repo at https://vercel.com — automatic builds. For a
static export to host anywhere, uncomment the `output: "export"` lines in
`next.config.ts` and run `npm run build` (outputs to `out/`).

## Structure

```
src/
  app/            layout, page (section order), globals.css
  config/site.ts  ← all personal info + links
  components/
    layout/       SmoothScroll (Lenis+GSAP), StickyNav
    hero/         Hero, NeuralField (canvas), IntroAudio (auto-play)
    scenes/       Foundation, DataEngineering, VaultAI, AISystems, Contact
    ui/           Section, Chip, Reveal
  hooks/          useReducedMotion
  data/           projects, skills, experience
scripts/          generate_intro.py
.env / .env.example / requirements.txt   ← voice generation
```
