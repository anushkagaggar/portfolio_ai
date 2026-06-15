"""
Generate the intro voice ONCE, then commit public/audio/intro.mp3.
The live website only plays that file — it never calls an API.

Setup:
    pip install -r requirements.txt
    # put your key in .env  ->  GROQ_API_KEY=gsk_...
    python scripts/generate_intro.py

IMPORTANT: just adding the key to .env does NOT make the website talk. You must
run this script to actually create public/audio/intro.mp3. (If the file is
missing, the site falls back to the browser's built-in voice.)

Get a free key at https://console.groq.com. The first time, you also have to
accept the playai-tts model terms once in the console, or the call returns a
"terms acceptance" error.
"""

import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq

# Load secrets from the .env file (not from the shell environment).
load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    sys.exit("GROQ_API_KEY not found. Add it to your .env file (GROQ_API_KEY=gsk_...).")

# Edit to taste — keep it to about two sentences. This is what the voice says.
SCRIPT = "Hi, I'm Anushka Maheshwari. I engineer intelligent systems that turn data into decisions."

OUTPUT = Path("public/audio/intro.mp3")
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

client = Groq(api_key=api_key)

try:
    response = client.audio.speech.create(
        model="playai-tts",
        voice="Celeste-PlayAI",  # other voices: Fritz-PlayAI, Indigo-PlayAI, Quinn-PlayAI ...
        input=SCRIPT,
        response_format="mp3",
    )
    response.write_to_file(OUTPUT)
except Exception as err:  # noqa: BLE001
    print("Voice generation failed:", err)
    print(
        "\nMost common fixes:\n"
        "  - Accept the 'playai-tts' model terms once at https://console.groq.com\n"
        "  - Check your GROQ_API_KEY is valid\n"
        "  - Try a different voice (e.g. Fritz-PlayAI)\n"
    )
    sys.exit(1)

print(f"Saved {OUTPUT} ({OUTPUT.stat().st_size} bytes). Commit it and you're done.")
