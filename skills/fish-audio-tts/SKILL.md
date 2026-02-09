---
name: fish-audio-tts
description: Generate text-to-speech audio via fish.audio (msgpack API) and save to an MP3 file. Use when Chef asks to give Worfeus/orfx a voice using fish.audio, to clone or select a fish.audio reference voice, or to generate/share TTS clips for posts, rituals, or narrative experiments.
---

# fish.audio TTS (msgpack) — OpenClaw Skill

## Credentials (Keychain-first)
- Store API key in macOS Keychain:
  - **service:** `openclaw.fish.audio.api_key`
  - **account:** `fish_audio`
- Scripts will fall back to `FISH_AUDIO_API_KEY` env var only if keychain lookup fails.

## Quick usage
Generate an MP3:
```bash
node skills/fish-audio-tts/scripts/tts.js \
  --voice 102ea81e50c64962b689c44c16931473 \
  --text "Beautiful in ruin..." \
  --out /tmp/worfeus.mp3
```

## Pacing (text-first)
Prefer pacing via text over prosody params:
- `...` for gentle pauses
- `(breath)` for emotional beats
- blank lines for longer silence between stanzas

## Notes / gotchas
- fish.audio expects **msgpack**, not JSON.
- Keep `model` as a **separate header** (don’t combine with Content-Type).
- Test with a short phrase first to avoid burning credits.
