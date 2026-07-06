# Anushka Maheshwari - Portfolio

A scroll-driven, white "engineering blueprint" portfolio. The hero is a living
neural field that converges on load while the name resolves from blur to focus;
the intro voice plays on its own. No backend, fully static and free to host.

Flow: **Hero** → **VaultAI** → **Experience** (a roadway timeline) →
**Projects** → **Tech stack** (scrolling strip + categories) → **Contact**.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- GSAP + ScrollTrigger (scroll reveals, blur-to-solid hero, the filling roadway)
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

Every personal detail and **every link** lives in `src/config/site.ts`. Longer
content (project bullets, skills, experience) is in `src/data/`.

## The intro voice

The voice plays a couple of seconds after load. It works in two layers:

1. If `public/audio/intro.mp3` exists, it plays that high-quality Groq file.
2. If that file is missing or autoplay is blocked, it falls back to the
   browser's built-in speech speaking your tagline, so it's never silent.

### To get the good Groq voice (one time)

Adding `GROQ_API_KEY` to `.env` is **not** enough on its own; the website never
calls Groq. You have to run the generator once to create the MP3:

```bash
pip install -r requirements.txt          # groq, python-dotenv
# put your key in .env:  GROQ_API_KEY=gsk_...
python scripts/generate_intro.py         # writes public/audio/intro.mp3
```

The script reads `.env` via `load_dotenv()`. The first time, accept the
`playai-tts` model terms once at https://console.groq.com or the call errors.
Commit the resulting MP3. `.env` is gitignored, never commit real keys.

Browsers block sound until the visitor interacts, so if the first attempt is
blocked the voice fires on the first mouse move / scroll / tap / key. No visible
audio control by design.

## Deploy

Push to GitHub, import the repo at https://vercel.com. For a static export,
uncomment the `output: "export"` lines in `next.config.ts` and `npm run build`.

## Structure

```
src/
  app/            layout, page (section order), globals.css
  config/site.ts  ← all personal info + links
  components/
    layout/       SmoothScroll (Lenis+GSAP), StickyNav
    hero/         Hero, NeuralField (canvas), IntroAudio (auto-play + fallback)
    scenes/       VaultAI, Experience (roadway), Foundation (projects),
                  TechStack, Contact
    ui/           Section, Chip, Reveal
  hooks/          useReducedMotion
  data/           projects, skills, experience
scripts/          generate_intro.py
.env / .env.example / requirements.txt   ← voice generation
```
