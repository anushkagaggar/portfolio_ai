"""
Generate the intro voice ONCE, then commit public/audio/intro.mp3.
The live website only plays that file — it never calls any API.

Setup:
    pip install -r requirements.txt
    # put your key in .env  ->  GROQ_API_KEY=gsk_...
    python scripts/generate_intro.py

Get a free key at https://console.groq.com (you may need to accept the
playai-tts model terms once in the console).
"""

import os
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq

# Load secrets from the .env file (not from the shell environment).
load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise SystemExit("GROQ_API_KEY not found. Add it to your .env file.")

# Edit this line to taste — keep it to about two sentences.
SCRIPT = "Hi, I'm Anushka Maheshwari. I engineer intelligent systems that turn data into decisions."

OUTPUT = Path("public/audio/intro.mp3")
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

client = Groq(api_key=api_key)

response = client.audio.speech.create(
    model="playai-tts",
    voice="Celeste-PlayAI",   # browse other voices in the Groq docs
    input=SCRIPT,
    response_format="mp3",
)

response.write_to_file(OUTPUT)
print(f"Saved {OUTPUT} ({OUTPUT.stat().st_size} bytes)")
