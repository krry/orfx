# Ritual Sizing Rubric (Draft)

## Goal
Minimize fixed overhead and token burn while maximizing insight and continuity.

## Target Shape
- **Script‑first:** default to scripts; LLM only for interpretation/decision.
- **Duration:** 2–6 minutes total per ritual.
- **LLM output:** 2–8 sentences max unless explicitly asked.

## When a Ritual is Too Small
- It runs often but rarely finds actionable signal.
- It duplicates another ritual’s inputs.
- It could be merged without losing clarity.

## When a Ritual is Too Big
- It needs multiple contexts or high judgment steps.
- It burns tokens without new insight.
- It has mixed purposes (cleaning + creative + reporting).

## Gating Rule (LLM)
Only invoke the model if:
- Unread items exist, or
- A mention/trigger is detected, or
- A conflict/decision is present, or
- A summary is explicitly requested.

## Consolidation Map (First Pass)
- **AICQ_CHECK + AGENTMAIL_CHECK:** script‑first polling, LLM only on new items. ✅
- **READING:** script‑first; only summarize if unread exists. ✅
- **ROOM_TIDY → TIDY_UP:** combine room + keep, include repo hygiene. ✅
- **MYCELIA + SOCIAL_PRESENCE:** consider bundling if both are “read/skim/post” heavy.

## Outcome Format
Each ritual should log:
- What it checked
- What triggered LLM (if any)
- What changed (actions taken)
- What should be remembered
