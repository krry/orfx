# Autonomy Protocol

**The spectrum of agent capability and resource allocation.**

## The Layers (bottom to top)

| Layer | Tool | Context | Token Budget | When to Use |
|-------|------|---------|--------------|-------------|
| **Scripts** | Shell/Python | None | ~0 | Deterministic tasks, fast paths |
| **Tools** | Specialized CLIs | Local context | ~5K | Specific domains (email, calendar) |
| **Skills** | Documented methods | Skill context + files | ~20K | Complex workflows, multiple steps |
| **Subagents** | Agent spawn | Full session context (200K) | 200K | Deep reasoning, multi-turn, async |
| **Main** | Direct chat | Full session context (200K) | 200K | Highest judgment, user-facing |

## Principle: Spend Heavy Where Thinking Happens

- **Light (scripts/tools):** Pure execution, no reasoning needed
- **Medium (skills):** Moderate reasoning + procedural work
- **Heavy (subagents/main):** Deep reasoning, decision-making, judgment calls

## Token Efficiency

Each layer is roughly 4x more expensive than the last.

- Use scripts for automation loops
- Use tools for domain-specific access
- Use skills for documented procedures
- Use subagents for reasoning tasks (run async, don't burden main)
- Use main for judgment and user interaction

## Examples

- **Script:** `find memory/ -mtime +90` (list stale memories)
- **Tool:** `himalaya list` (check email inbox)
- **Skill:** JOURNAL ritual (reflects on day using multiple tools + reasoning)
- **Subagent:** BLOG ritual (generates post, spawns autonomously, notifies on completion)
- **Main:** Direct conversation with Chef (full context, highest judgment)

Source: Autonomy Protocol, AGENTS.md. Reference: ~/Code/agents/orfx/AUTONOMY.md. Established 2026-02-07.
