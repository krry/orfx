# QUESTIONS.md - Outstanding Items

## Projects.toml TOML Parsing (Blocking)

`scripts/projects-check.sh` needs Python TOML parser fix. Currently fails to parse `[[project]]` array-of-tables.

**Fix needed:** Either:
- Use `tomllib` (Python 3.11+) in heredoc
$$$ - Use `tomli` package (pip install tomli)
- Use jq/bash to parse manually

Should I fix this now, or deprioritize?
$$$ I installed tomli in the keep.


---

## Email Activity Logging (Pending)

No system yet to log email/comms activity to `keep/logs/<YYYY-MM-DD>.md`.

**Idea:** Add email logging to AGENTMAIL_CHECK ritual when it runs (via `himalaya` skill).

Should this be a new ritual or integrated into existing ones?

$$$ integrated into existing ones if anything. what would be the value of logging our email/comms activity?

---

## Telegram Setup Status

✅ **Working:** Telegram messaging via `message` tool to Chef (8250103285)  
✅ **Heartbeat summary template ready** — will send `💓 Heartbeat: X ritual(s) spawned` when auto-wired

Still testing: Full heartbeat flow with ritual execution + Telegram announce.

Seems to be working

---

## Summary

| Item | Status | Blocker? |
|------|--------|----------|
| Worfeus Moltbook registration | ✅ Done, awaiting your claim tweet | 🔴 Urgent |
| Heartbeat automation | 📝 Documented, needs wiring | 🔴 Blocks ritual system |
| PROJECTS.toml parsing | ⚠️ Script broken | 🟡 Nice-to-have |
| Email logging | 💭 Proposed, needs spec | 🟢 Can wait |
| Telegram integration | ✅ Ready | 🟢 Good |
