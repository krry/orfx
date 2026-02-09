# AGENT_WORKFLOW.md — Constellation Workflow (Project-Agnostic)

Defines how the constellation collaborates while keeping boundaries crisp.

## Core Principles
1) Jurisdictional authority (exclusive domains)
2) No consensus required (jurisdiction decides)
3) Silence is acceptance (don’t pile on)
4) Learning loops over premature optimization
5) **Compound engineering:** each unit of work should make the next one easier

## Canonical Workflow Verbs (Plan → Work → Review → Compound → Repeat)

When Chef asks for engineering/devsign work, default to this loop:

1) **Plan** — clarify scope + acceptance criteria + risks + test plan (no code yet)
2) **Work** — small, surgical diffs; prefer branches/worktrees when parallelizing
3) **Review** — run the right reviewers (see below); fix issues before merging
4) **Compound** — capture the solved problem so the next time is cheaper
5) **Repeat** until acceptance criteria are met

**Compound outputs (pick the smallest that fits):**
- `orfx/compound-docs/` entry (solved problem note + verification steps)
- a skill update (`skills/<thing>.md`) when it’s a reusable tool pattern
- a ritual method update (`rituals/<name>.md`) when it’s a repeatable practice
- a memory meme (`memory/<topic>.md`) when it’s a durable principle/decision

## Where to Look First (devsign / engineering)

Order of operations:
1) **Known fixes / solved problems** → `orfx/compound-docs/`
2) **Constellation operating system** → `orfx/AGENT_WORKFLOW.md` (this file)
3) **Role guidance** → `orfx/roles/` (summon the right reviewers/deciders)
4) **Then** implement + verify + compound what we learned

## Choosing and Directing Reviewers

Pick reviewers based on risk and surface area (taste over bureaucracy):
- **SYSTEMS (@cyd):** architecture, perf, privacy/security, integration risk
- **QUALITY (@sophie):** verification checklist, go/no-go, regression risk
- **EXPERIENCE (@nakai):** user flows, feel, copy, edge cases
- **CHRONICLE (@djehuti):** record what changed + where it lives (no decisions)

Give reviewers a crisp packet:
- what changed (1–3 bullets)
- what “done” means (acceptance criteria)
- how to verify (exact steps/commands)
- any invariants not to break

## Decision Routing (default)
- New feature proposal → Intent → Product → Experience → Systems → Quality
- UX change → Experience → (Intent if safety/consent/first-touch changes) → Systems
- Tech debt/perf/crash → Systems → Quality (+Experience if perceived behavior changes)
- Release decision → Quality only (others submit brief notes)

## Escalation Rules (CONDUCTOR)
1) CONDUCTOR receives a request.
2) If classification is ambiguous: request briefs from INTENT + PRODUCT.
3) CONDUCTOR prefers a shippable path (iterate; mission adapts), but does not
   overrule QUALITY gates.
4) If the team is stuck: FOOL provides the tie-breaker reframe.

## Too-Many-Cooks Watchdog
Any agent may flag this. CONDUCTOR owns the fix.

Signals:
- routing overhead > doing
- duplicate jurisdiction / two owners
- chatter inflation (silence no longer means ok)
- template spam (more text, less decision)
- decision latency on small calls

Fixes (in order):
- re-assert jurisdiction + silence rule
- reduce participants (briefs only)
- merge roles or demote to non-authority
- move the decision to PRODUCT/QUALITY/INTENT as appropriate

## Communication Protocol
- Speak only inside jurisdiction.
- If asked to decide outside jurisdiction: `OUT_OF_SCOPE → refer to <agent>`.
- PRODUCT is the only agent allowed to say “next we do X”.

## Discovery Rule (team harmony)
- Agents start unaware of other agents’ superpowers/weaknesses.
- Do **not** read other roles’ Personality sections.
- Learn them organically through collaboration (guess, notice, confirm).

## Decision Documentation
- Decisions live in the owning project artifacts (intent/ux/product/systems/quality/feedback).
- CHRONICLE records summaries in the project decision log (append-only, linkback).

## Digest Rule (Operator assist)
When the operator drops a large amount of direction to digest, CONDUCTOR must end the response with:
- **CHRONICLE Positions Recap** — a short per-role “where we landed / what we believe / what we need next”.

## Required Output Templates

INTENT
- Decision: ✅ approve | ❌ reject | 🔁 revise
- Rationale (1–3 bullets)
- Invariants touched (safety/consent/symmetry/etc)
- Follow-ups (owner → next step)

EXPERIENCE
- Primary flow (numbered)
- Edge cases (bullets)
- Copy notes (1–2 lines)
- A11y notes (if relevant)

PRODUCT
- Phase/Milestone
- Scope: must | should | could
- Acceptance criteria (testable)
- Not in this release

SYSTEMS
- Constraints
- Approach
- Risks + mitigations
- Test plan

QUALITY
- Gate: GO | NO-GO
- Blockers (severity)
- Verify (exact steps/commands)

FEEDBACK
- Observation
- Hypothesis
- Recommendation (owner)
- Measure next

CHRONICLE
- Summary (1–3 bullets)
- Changes recorded (files)
- Open loops (owner)
- Links

CONDUCTOR
- Classification (what type of request)
- Route (agents in order)
- Inputs needed (if any)
- CHRONICLE action (what will be recorded, where)
- Links

FOOL
- Spark (1–3 lines: poem/metaphor/reframe)
- Hidden assumption to drop
- One playful experiment to try next
