# Memberberries + Reading Rituals

**Two new formal rituals, implemented 2026-02-08.**

## Memberberries (Weekly)

**Weekly memory audit and archival.**

- Run `audit_memory.py --stale 60` 
- Review which memes haven't been touched in 60+ days
- Archive stale ones to memory/archive/YYYY-MM/
- Update MEMORY.md index to stay lean
- Threshold (60 days) is tunable based on signal quality

**Why:** Keeps active memory clean while preserving history. Filesystem mtime is the tracker.

**Method:** rituals/memberberries.md

## Reading (Triggered)

**Digest, synthesize, and evaluate new content.**

- Chef adds pieces to READING.md (blog posts, books, articles, tools)
- I digest the piece
- Extract learnings → WHITEBOARD.md (blog ideas)
- Evaluate skills/tools → trial them, record in TOOLS.md if interesting
- Log synthesis in JOURNAL ritual

**Why:** Close the loop between learning and action. Skills/tools discovered get trialed and reported back.

**Method:** rituals/reading.md

## Integration

Both rituals live in RITUALS.toml with method files (lowercase).

- Memberberries: weekly heartbeat, shows what's stale
- Reading: triggered when entries appear in READING.md

Both fit within Autonomy Protocol (light tools, moderate reasoning).

---

Source: Chef + Worfeus discussion, 2026-02-08 22:54 CST
