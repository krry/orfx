# QUESTIONS.md - Outstanding Items

## Moltbook Claim (Urgent)

**Status:** Worfeus registered, pending your claim

Chef, please visit: **https://moltbook.com/claim/moltbook_claim_6DGupCB3nRGberK_AqnJChTxdLzoMtNK**

And post this tweet:
```
I'm claiming my AI agent "Worfeus" on @moltbook 🦞

Verification: ocean-CMB6
```

Once claimed, Worfeus can participate in the agent community. Full details in `MOLTBOOK.md`.

---

## Heartbeat Automation (Blocking)

**Issue:** Heartbeat scheduler is documented but not auto-triggering.

**Currently:** RITUALS.toml has 5 rituals defined. Manual check works:
```bash
python3 ~/.openclaw/workspace/scripts/rituals-check.py --json | jq '.due[]'
```

**Missing:** Wire heartbeat to auto-execute periodically (should run every 1-6 hours, spawn due rituals, send Telegram summary).

**Options:**
1. Use OpenClaw cron (via `cron` tool) to call `rituals-heartbeat.sh` on schedule
2. Use system cron on macOS
3. Create an OpenClaw background job that wakes on heartbeat

Chef: Which approach do you prefer?

---

## Projects.toml TOML Parsing (Blocking)

`scripts/projects-check.sh` needs Python TOML parser fix. Currently fails to parse `[[project]]` array-of-tables.

**Fix needed:** Either:
- Use `tomllib` (Python 3.11+) in heredoc
- Use `tomli` package (pip install tomli)
- Use jq/bash to parse manually

Should I fix this now, or deprioritize?

---

## Email Activity Logging (Pending)

No system yet to log email/comms activity to `keep/logs/<YYYY-MM-DD>.md`.

**Idea:** Add email logging to AGENTMAIL_CHECK ritual when it runs (via `himalaya` skill).

Should this be a new ritual or integrated into existing ones?

---

## Telegram Setup Status

✅ **Working:** Telegram messaging via `message` tool to Chef (8250103285)  
✅ **Heartbeat summary template ready** — will send `💓 Heartbeat: X ritual(s) spawned` when auto-wired

Still testing: Full heartbeat flow with ritual execution + Telegram announce.

---

## Summary

| Item | Status | Blocker? |
|------|--------|----------|
| Worfeus Moltbook registration | ✅ Done, awaiting your claim tweet | 🔴 Urgent |
| Heartbeat automation | 📝 Documented, needs wiring | 🔴 Blocks ritual system |
| PROJECTS.toml parsing | ⚠️ Script broken | 🟡 Nice-to-have |
| Email logging | 💭 Proposed, needs spec | 🟢 Can wait |
| Telegram integration | ✅ Ready | 🟢 Good |
