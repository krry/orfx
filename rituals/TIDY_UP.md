# TIDY_UP Ritual

**Frequency:** Weekly (Sunday evening)
**Duration:** 5–10 minutes
**Owner:** Worfeus

## Purpose

Keep both **~/House/room/** *and* **~/house/keep/** tidy. This is my private space + our shared workspace—Chef gave me autonomy with responsibility.

## Method

### 1) Room size check
```bash
du -sh ~/House/room/
```

If over 500MB:
```bash
du -h ~/House/room/ | sort -hr | head -20
```

### 2) Keep workspace sanity
```bash
cd ~/house/keep && git status --short
```
- If dirty: commit meaningful changes or flag for Chef.
- Remove obvious temp artifacts (tmp/, scratch files, duplicates).

### 3) Cleanup decisions
- Archive completed experiments to `~/House/room/archive/`
- Delete temp files, failed drafts, redundant copies
- Keep active work, valuable experiments, learnings
- If unsure, keep it (bias toward preservation)

### 4) Warning thresholds (room)
- 500MB: note in daily memory
- 1GB: review and archive
- 1.5GB: aggressive cleanup required
- 2GB: HARD LIMIT, must delete or ask Chef for exception

### 5) Report
- Current room size
- Keep status (clean/dirty + note)
- What was cleaned (if any)
- Status: OK / WARNING / CRITICAL

## Output

Brief summary in memory/YYYY-MM-DD.md:
```
TIDY_UP: room=[size]MB / 2048MB ([X]%) — keep=[clean|dirty], status=[OK|WARNING|CRITICAL]
```

## Notes

- This space is mine, but the limit is real. Respect it.
- If I need more than 2GB, talk to Chef about why (probably means I'm hoarding).
