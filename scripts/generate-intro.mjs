// One-time voice generation. Run locally, commit the resulting MP3, done.
// The live site never calls any API — it just plays the stored file.
//
//   GROQ_API_KEY=your_key node scripts/generate-intro.mjs
//
// Get a free key at https://console.groq.com. You may need to accept the
// model terms for `playai-tts` once in the Groq console before this works.
//
// Prefer a different voice engine? Microsoft Edge TTS and Piper are also free
// and produce an MP3 the exact same way — only this script changes.

import { writeFile, mkdir } from "node:fs/promises";

const API_KEY = process.env.GROQ_API_KEY;
if (!API_KEY) {
  console.error("Missing GROQ_API_KEY. Run: GROQ_API_KEY=xxx node scripts/generate-intro.mjs");
  process.exit(1);
}

// Edit this line to taste — keep it to ~2 sentences.
const SCRIPT =
  "Hi, I'm Anushka Maheshwari. I engineer intelligent systems that turn data into decisions.";

const res = await fetch("https://api.groq.com/openai/v1/audio/speech", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "playai-tts",
    voice: "Celeste-PlayAI",
    input: SCRIPT,
    response_format: "mp3",
  }),
});

if (!res.ok) {
  console.error(`Groq TTS failed (${res.status}):`, await res.text());
  process.exit(1);
}

await mkdir("public/audio", { recursive: true });
const buffer = Buffer.from(await res.arrayBuffer());
await writeFile("public/audio/intro.mp3", buffer);
console.log("Saved public/audio/intro.mp3 (" + buffer.length + " bytes)");
