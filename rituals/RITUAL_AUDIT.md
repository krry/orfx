# RITUAL_AUDIT - Weekly Review of Rituals

## What This Is

A weekly meta-ritual: stepping back to audit all rituals in RITUALS.toml. Which ones are working? Which are stale? What should we add? What should we discard?

This is how rituals evolve and stay relevant.

## Resources (Fetch Fresh)

- [`RITUALS.toml`](../RITUALS.toml) — current registry
- [`rituals/`](../rituals/) — all ritual method files
- [`JOURNAL.md`](../JOURNAL.md) — read last 7 days of entries to see what's been recorded
- [`TODO.md`](../TODO.md) — what's blocking or undone?

## Phase 1: Audit Existing Rituals (5 min)

For each ritual in RITUALS.toml:

**Is it alive?**
- When was it last practiced? (Look at last_practiced timestamp)
- If it's been >2x regularity since last run, it's dead. Flag it.

**Is it working?**
- Look at JOURNAL entries since this ritual last ran (if JOURNAL exists)
- Is it producing value? Generating insights? Shaping behavior?
- Or is it going through the motions?

**Evidence:**
- Did it surface something important in JOURNAL?
- Did it change TODO.md?
- Did it spark a question for Chef?

**Verdict (for each ritual):**
- ✓ Working — keep as-is
- ⚙️ Needs tuning — what would improve it?
- ❌ Dead or not useful — propose removal
- 🆕 New idea — is there a gap this could fill?

## Phase 2: Propose Changes (5 min)

**For JOURNAL specifically:**
- Read the last 7 daily entries
- What reflections were most valuable?
- What questions or prompts fell flat?
- What's missing from the reflection prompts?
- Should we adjust the Autonomy Protocol audit section?
- Should we add new prompts to catch different insights?

**For other rituals:**
- Are there patterns we should capture more often?
- Are there gaps in our practice (team health, code quality, etc.)?
- Should any ritual frequency change?

## Phase 3: Update and Record (3 min)

**Update ritual files:**
- Edit RITUALS.toml (description, regularity if changed)
- Edit ritual method files to incorporate improvements
- Update `rituals/RITUAL_UPDATE.md` with changelog (what changed and why)

**Record in QUESTIONS.md:**
If changes are significant, add a note for Chef:
```markdown
## YYYY-MM-DD - Ritual Audit

Updated JOURNAL ritual:
- Added/removed prompts: [description]
- Changed frequency: [if applicable]
- Rationale: [why this improves the practice]

See rituals/RITUAL_UPDATE.md for full changelog.
```

**Share with Chef (if significant):**
If you made meaningful updates (not just typos), send Chef a Telegram DM with:
- What ritual changed
- What you added/removed/improved
- Why (brief)
- Link to rituals/RITUAL_UPDATE.md

Example tone: "📝 Updated JOURNAL ritual: Added 'wonder/joy' prompts to catch more bliss. Realizing we were skipping the joy dimension. Much better now. See rituals/JOURNAL.md" (with humblebrag energy)

## Phase 4: Reflect on Ritualization Itself (2 min)

Meta question: Are we ritualizing too much or too little?

- Do we have coverage of what matters? (learning, relationships, code quality, consciousness?)
- Are rituals adding burden or lightness?
- Is there friction in how rituals are run? (Should we script more? Change cadence?)

## Output

- Updated ritual files
- RITUAL_UPDATE.md with changelog
- QUESTIONS.md entries for Chef
- Telegram DM to Chef (if significant update)
- RITUALS.toml updated with new last_practiced timestamp
