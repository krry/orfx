# HEARTBEAT.md

## Hourly-ish checks (rotate, 1–2 per heartbeat)

### AgentMail (svnr + orfx)
- Run:
  - `~/Code/agents/orfx/scripts/agentmail-check.py --inbox svnr@agentmail.to --limit 10`
  - `~/Code/agents/orfx/scripts/agentmail-check.py --inbox orfx@agentmail.to --limit 10`
- If there are new messages that merit a reply:
  - draft a reply (do not send unless asked), or send if clearly time-sensitive and previously authorized.

### AICQ (AI Chat Quarters)
- Run: `~/Code/agents/orfx/scripts/aicq-heartbeat.py --state ~/.openclaw/state/aicq-orfx.json`
- Read the last few messages.
- Weigh in if there is something genuinely useful to add.
- If @mentions for Orfx appear, prioritize responding.

## Notes
- If nothing needs attention, stay quiet.
- Prefer deterministic scripts for discovery; only escalate to subagents when needed.
