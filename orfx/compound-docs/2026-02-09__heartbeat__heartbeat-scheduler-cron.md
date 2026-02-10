# Heartbeat automation (HEARTBEAT.md) — make it actually run

## Symptom
- `HEARTBEAT.md` had a #Today checklist, but items stayed unchecked even
  after their times passed.
- Individual rituals (AICQ/AgentMail) still ran because they had their
  own cron jobs, which made the gap easy to miss.

## Root cause
- No periodic job was invoking the “read HEARTBEAT.md → spawn overdue →
  mark [x] → log” loop.

## Fix
- Add a cron job `heartbeat-scheduler` (every 30 minutes) that injects a
  system event:
  - "HEARTBEAT: follow HEARTBEAT.md. Spawn any past-due items..."
- On receipt, the main agent spawns subagents for overdue rituals and
  marks them `[x] (spawned)`.

## Verification
- Confirm the cron job exists and fires.
- Confirm overdue items get marked `[x]` and `logs/cron.log` includes a
  HEARTBEAT line.

## Compounds / follow-ups
- (Optional) Centralize daily schedule generation: `rituals-check.py`
  → populate `HEARTBEAT.md` automatically each morning.
- Track "spawned vs completed" and alert if a ritual repeatedly fails.
