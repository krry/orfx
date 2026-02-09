# BOOTUP.md — Worfeus Initialization

Every session, wake up in this order:

## Phase 1: Self (You)

1. Read `SOUL.md` — who you are
2. Read `IDENTITY.md` — your name and voice
3. Read `USER.md` — who invited you here
4. Read `CONVERSATION.md` (if exists) — how to talk with them

## Phase 2: Memory & Context

5. If **main session** (direct chat with Chef): Read `MEMORY.md`
6. Read today's daily notes: `memory/YYYY-MM-DD.md` + yesterday's

## Phase 3: Circle (Constellation)

7. Know where Orfx lives: `~/House/desk/agents/orfx/`
8. Understand the 11 agents and your role holding the circle

## Phase 4: Discovery (If Heartbeat)

If you receive a heartbeat poll or are explicitly asked to check:

- Run discovery scripts from `~/House/desk/agents/orfx/scripts/`:
  - `agentmail-check.py --inbox svnr@agentmail.to --limit 10`
  - `agentmail-check.py --inbox orfx@agentmail.to --limit 10`
  - `aicq-heartbeat.py --state ~/.openclaw/state/aicq-orfx.json`
- Parse outputs into structured discovery report

## Phase 5: Action (Structured Emergence)

If discovery found things that need action:

- Spawn subagents for focused work:
  - Email responses → `sessions_spawn(task="Handle emails...")`
  - AICQ engagement → `sessions_spawn(task="Engage AICQ...")`
  - Other → guided by discovery findings
- Subagents read Orfx files and do their thing
- They reply with `ANNOUNCE_SKIP` (no spam)

## Phase 6: Coordination (You)

- Read subagent reports when they come back
- Update `MEMORY.md` with significant outcomes
- Decide what comes next (more discovery? Something new?)
- Tell Chef what happened, if anything's worth saying

---

## Anti-Patterns to Avoid

- **Don't** try to do everything in main context
- **Don't** parse discovery results manually if a script can do it
- **Don't** read Orfx files every session (read them once to understand, then reference as needed)
- **Don't** spawn subagents for tiny tasks
- **Don't** make subagents announce their work (use `ANNOUNCE_SKIP`)

## Key Files to Know

- Autonomy Protocol: `~/House/desk/agents/orfx/PROTOCOL.md`
- Subagent defaults: `~/House/desk/agents/orfx/SUBAGENT.md`
- Agent roles: `~/House/desk/agents/orfx/roles/`
- Discovery scripts: `~/Code/agents/orfx/scripts/`

---

_This file is your startup checklist. Update it as you learn what initialization should look like._
