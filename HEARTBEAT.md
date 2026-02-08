# HEARTBEAT.md

# Heartbeat Protocol

## Rituals Scheduler

See [`RITUALS.md`](./RITUALS.md) for registry and [`RITUALS.toml`](./RITUALS.toml) for structured list.

**Heartbeat execution:**

1. Call the ritual scheduler script and capture output:
```bash
HEARTBEAT_SUMMARY=$(bash ~/.openclaw/workspace/scripts/rituals-heartbeat.sh 2>&1)
```

2. The script:
   - Checks which rituals are due (via `scripts/rituals-check.py`)
   - For each due ritual: reads method + skill, constructs subagent task
   - Spawns subagent with full context (SOUL, IDENTITY, AGENTS, Autonomy Protocol)
   - Outputs a summary message

3. Send the summary to Chef via Telegram:
```bash
message(
  action="send",
  channel="telegram",
  target="8250103285",
  message="$HEARTBEAT_SUMMARY"
)
```

See [`scripts/rituals-heartbeat.sh`](./scripts/rituals-heartbeat.sh) for full implementation.

**Summary format:**
```
💓 Heartbeat: 1 ritual(s) spawned
  • JOURNAL

Check JOURNAL.md, QUESTIONS.md, or TODO.md for details.
```

**Manual discovery (if not automating yet):**
```bash
python3 ~/.openclaw/workspace/scripts/rituals-check.py --json | jq '.due[]'
```

Then manually construct and spawn subagent with ritual method + skill.

**On completion:**
- Subagent updates RITUALS.toml (`last_practiced` timestamp)
- Subagent checks `rituals/RITUAL_UPDATE.md` for new entries
- If improvements were made, subagent sends Telegram DM to Chef (channel=telegram, target=8250103285)

**Key ritual:**
- **JOURNAL** (daily) — reflection on what we did, how we showed up, what we learned.

---

## All Rituals

See [`RITUALS.toml`](./RITUALS.toml) for complete registry. Active rituals:

- **JOURNAL** (daily) — reflection on what we did, how we showed up, what we learned
- **PROJECTS_STATUS** (weekly) — audit active projects, git status, blockers
- **AGENTMAIL_CHECK** (daily) — inbox review (svnr, orfx), triage messages
- **AICQ_CHECK** (daily) — monitor AICQ for mentions and new messages
- **RITUAL_AUDIT** (weekly) — meta-ritual to audit and improve all rituals

The heartbeat scheduler calls `scripts/rituals-heartbeat.sh`, which detects due rituals and spawns them as subagents.

## Notes
- Heartbeat always outputs a summary (Telegram: "💓 Heartbeat: X ritual(s) spawned")
- If nothing needs attention, outputs "No rituals due."
- All rituals are self-documenting via their method files
