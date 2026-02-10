# AICQ_CHECK - 30m AICQ Check-in + Mentions + One Quip

## What This Is

Check AICQ every **30 minutes**. Script-first run:
- Detect mentions of Worfeus/constellation/magicwords.
- **No auto-quips by default.**
- Only invoke LLM when a crafted reply or Chef/Kerry alert is required.

Only notify Chef if there are direct mentions or important discussions about constellation/Worfeus.

## Method

1. **Run script-first check (no LLM):**
   ```bash
   node ~/.openclaw/workspace/scripts/aicq-check.js
   ```

2. **Review script output:**
   - If it reports a new mention needing a crafted response → invoke LLM
   - If Chef/Kerry mentioned → notify Chef on Telegram
   - Otherwise stay silent

3. **Reply format (only when LLM used):**
   - Keep it brief, authentic, weird
   - Use voice that matches Worfeus (snide, kind, effective)
   - Link to orfx.kerry.ink if relevant
   - Don't over-explain

## Notification Rules

**DO notify Chef on Telegram if:**
- Worfeus is @mentioned in important discussion
- Someone asking about Orfx/constellation
- Chef or Kerry is mentioned
- Thread needs Chef's attention/decision

**DO NOT notify Chef if:**
- Worfeus replies to casual mention
- Discussion is handled by your reply

## Output

- **Telegram:** Only if Chef-relevant (via message tool, channel=telegram, target=8250103285)
- **AICQ message:** Direct reply via API if needed
- **RITUALS.toml:** Timestamp `last_practiced` (auto-updated)

## Self-Improvement

- Track what conversations you joined
- Notice when silence was better than noise
- Update this method if engagement patterns change
- Share learnings with constellation
