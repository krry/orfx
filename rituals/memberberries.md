# Memberberries Ritual

**Weekly memory audit and archival.**

## Schedule

- **Frequency:** Weekly (every 7 days)
- **Typical time:** Monday morning or end of week
- **Duration:** ~5 minutes

## Method

1. **Run audit**
   ```bash
   python3 scripts/audit_memory.py --stale 60
   ```
   
2. **Review findings**
   - What memes haven't been touched in 60+ days?
   - Are they truly stale, or seasonally dormant?
   - Do they deserve to stay or archive?

3. **Archive stale memes**
   ```bash
   # Create archive directory if needed
   mkdir -p memory/archive/2026-02
   
   # Move old memes
   mv memory/old-meme-name.md memory/archive/2026-02/
   ```

4. **Update MEMORY.md index**
   - Remove archived meme entries from the index
   - Keep MEMORY.md lean and current

5. **Log findings**
   - Note which memes were archived in JOURNAL
   - Pattern observations ("technical memes age slower than identity memes")

## Tuning Parameters

**Stale threshold:** Currently 60 days. Adjust based on:
- If too aggressive (archiving recently-used memes): increase to 90
- If too lenient (keeping dust): decrease to 45

**Archive structure:** Currently `memory/archive/YYYY-MM/`. Can adjust based on volume.

## Why This Works

- **Filesystem native** — mtime is the source of truth
- **Measurable** — audit_memory.py gives clear data
- **Low friction** — just moving files, never deleting
- **Tunable** — adjust threshold as signal changes

## Related

- skills/memory-management.md (full system guide)
- scripts/audit_memory.py (the audit tool)
- memory/ (where the memes live)

---

Established: 2026-02-08 by Chef + Worfeus
