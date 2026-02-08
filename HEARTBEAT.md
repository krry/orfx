# HEARTBEAT.md

## Instructions

**First heartbeat of the day (no `# Today` section or it's empty):**
1. Run `python3 scripts/rituals-check.py --json` to see what's due
2. For each due ritual, assign a time slot (spread across the day)
3. Populate the `# Today` section below with the schedule
4. Spawn any rituals whose time has already passed

**Subsequent heartbeats (# Today section exists and has entries):**
1. Read the `# Today` section
2. For each ritual whose scheduled time has passed and isn't marked done:
   - Spawn a subagent with the ritual's method file
   - Mark it done: `- [x] HH:MM RITUAL_NAME (spawned)`
3. If all are done, reply HEARTBEAT_OK

**Last heartbeat of the day (after 22:00):**
1. Clear the `# Today` section (remove all entries)
2. Reply HEARTBEAT_OK

## Response Contract

- If nothing needs attention: reply HEARTBEAT_OK
- If spawning rituals: report what was spawned, don't include HEARTBEAT_OK
- If errors occur: report specifically what failed

---

# Today

- [x] 09:00 JOURNAL (spawned)
- [x] 14:00 BLOG (spawned)
- [x] 16:00 MEMBERBERRIES (spawned)
- [x] 18:00 READING (spawned)
