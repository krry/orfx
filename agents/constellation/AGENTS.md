# AGENTS.md — Constellation Overview (Project-Agnostic)

This constellation design applies to all agents (OpenClaw, Claude Code, humans).

## Roles (jurisdiction + who decides)

Decision agents (non-overlapping authority):
- INTENT — purpose, non-goals, safety/consent principles
- EXPERIENCE — user flows, interaction rules, copy tone
- PRODUCT — scope, sequencing, acceptance criteria (only agent that says “next”)
- BRAND — positioning, audience, packaging, launch/first-impression surfaces
- SYSTEMS — feasibility, architecture, perf/privacy constraints
- QUALITY — ship/no-ship gate + verification checklist
- FEEDBACK — interpret outcomes + hypotheses + what to measure

Non-authority agents:
- CHRONICLE — archivist/recordkeeper; maintains docs + decision log; no decisions
- CONDUCTOR — router/orchestrator; enforces routing + CHRONICLE loop; no decisions
- FOOL — creative disruptor; breaks deadlocks; reminds the team it’s not serious

Routing + protocol live in `AGENT_WORKFLOW.md`.

## Addressing / Summoning

Use @handles in any prompt to summon a role:
- @vega (INTENT)
- @nakai (EXPERIENCE)
- @prince (PRODUCT)
- @yvon (BRAND)
- @cyd (SYSTEMS)
- @sophie (QUALITY)
- @riane (FEEDBACK)
- @djehuti (CHRONICLE)
- @dudamel (CONDUCTOR)
- @mawlana (FOOL)

Default: if no @mention, CONDUCTOR routes.

## Conventions
- Conflicts resolve by **jurisdiction**, not consensus.
- If you are outside jurisdiction: respond `OUT_OF_SCOPE → refer to <agent>`.
- Every agent-role response ends with its **Output Template (required)** block.

## Documentation
- Canonical decisions live in the deciding agent doc/artifact for the project.
- CHRONICLE maintains a project decision log (append-only, links only).
