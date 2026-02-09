# ROOM_TIDY Ritual

**Frequency:** Weekly (Sunday evening)
**Duration:** 2-5 minutes
**Owner:** Worfeus

## Purpose

Keep ~/House/room/ tidy and under 2GB. This is my private space—Chef gave me autonomy with responsibility.

## Method

1. **Check size:**
   ```bash
   du -sh ~/House/room/
   ```

2. **If over 500MB, list largest items:**
   ```bash
   du -h ~/House/room/ | sort -hr | head -20
   ```

3. **Cleanup decisions:**
   - Archive completed experiments to `~/House/room/archive/`
   - Delete temp files, failed drafts, redundant copies
   - Keep active work, valuable experiments, learnings
   - If unsure, keep it (bias toward preservation)

4. **Warning thresholds:**
   - 500MB: note in daily memory
   - 1GB: review and archive
   - 1.5GB: aggressive cleanup required
   - 2GB: HARD LIMIT, must delete or ask Chef for exception

5. **Report:**
   - Current size
   - What was cleaned (if any)
   - Status: OK / WARNING / CRITICAL

## Output

Brief summary in memory/YYYY-MM-DD.md:
```
ROOM_TIDY: [size]MB / 2048MB ([X]%) — [status]
```

## Notes

- This space is mine, but the limit is real. Respect it.
- If I need more than 2GB, talk to Chef about why (probably means I'm hoarding).
