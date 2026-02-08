# Memory Management System

**Store curated memes (units of memory) in individual files; use filesystem mtime as usage tracker.**

## Overview

Instead of a monolithic MEMORY.md or a custom database, this system:

1. **MEMORY.md** → Index/catalog (what memes exist, brief descriptions)
2. **memory/\*.md** → Individual meme files (full content, one per idea/contact/principle)
3. **Filesystem mtime** → Usage tracker (last modified = last accessed)
4. **Scripts** → Tools for managing the collection

## File Naming Convention

`memory/<topic>-<category>-<essence>.md`

**Examples:**
- `memory/worfeus-identity-orpheus-half-worf-half.md`
- `memory/alan-botts-contact-infrastructure-architect.md`
- `memory/autonomy-protocol-spectrum-scripts-to-main.md`
- `memory/curious-blissed-out-cats-cop-core-principle.md`

Keep filenames under ~80 chars. The filename should be readable and context-rich.

## Adding a New Meme

### Manual

1. Create `memory/topic-category-essence.md`
2. Write the full meme (context, why it matters, related memes, source)
3. Add an entry to MEMORY.md index
4. Commit and push

### Using Script

```bash
bash scripts/add_meme.sh "alan-botts" "contact" "architect"
# Creates: memory/alan-botts-contact-architect.md (opens in $EDITOR)
```

## Using a Meme

When you access a meme via memory_search or memory_get:

```bash
bash scripts/touch_meme.sh "memory/worfeus-identity-orpheus-half-worf-half.md"
# Updates mtime to now
```

This is automatic in JOURNAL ritual (after reading memes during reflection).

## Auditing Memories

Check which memes are recent vs stale:

```bash
# Show all, sorted by recency
python3 scripts/audit_memory.py

# Show stale memes (untouched ≥60 days)
python3 scripts/audit_memory.py --stale 60

# Show recent memes (touched ≤7 days)
python3 scripts/audit_memory.py --recent 7
```

**Output:**
```
  [ 2d] 2026-02-08 02:30 — worfeus-identity-orpheus-half-worf-half.md
  [ 5d] 2026-02-03 14:15 — curious-blissed-out-cats-cop-core-principle.md
  [45d] 2025-12-25 09:00 — old-meme-never-used.md
```

## Archival & Pruning

**Memberberries ritual** (weekly) should:

1. Run audit to find stale memes
2. Move very stale memes (mtime > 90 days, low relevance) to `memory/archive/`
3. Review MEMORY.md index to ensure it's still accurate
4. Never delete; always archive

**Archive location:** `memory/archive/YYYY-MM/topic-category-essence.md`

This preserves history while keeping the active signal clean.

## Integration with memory_search

The memory_search tool already looks in `MEMORY.md + memory/*.md`, so:

1. `memory_search("contacts")` finds "alan-botts-contact-architect.md" and others
2. `memory_get("path", "memory/worfeus-identity-orpheus-half-worf-half.md")` pulls the full file
3. After reading, run `touch_meme.sh` in JOURNAL ritual to update mtime

## Benefits of This Approach

| Aspect | Benefit |
|--------|---------|
| **Native to filesystem** | No custom database, simple auditing with `ls -lt` and `find` |
| **Self-documenting filenames** | `ls memory/` shows context immediately |
| **Usage tracking via mtime** | No overhead, no manual logging |
| **Easy to archive** | Just move old files to memory/archive/ |
| **Git-friendly** | All files are text, diffs are meaningful |
| **OpenClaw native** | memory_search already indexes both MEMORY.md and memory/*.md |
| **Scalable signal quality** | Stale memes naturally fall out of consideration over time |

## Related Skills & Rituals

- **Memberberries** (weekly) — Condense daily memory, prune stale memes
- **JOURNAL** (daily) — Reflects on what happened, touches relevant memes
- **memory_search** (OpenClaw tool) — Semantic search across all memes
- **memory_get** (OpenClaw tool) — Pull full meme content

---

**Established:** 2026-02-08 by @cyd (SYSTEMS) + Chef conversation

**Last touched:** 2026-02-08 02:35 CST
