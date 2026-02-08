# JOURNAL - Daily Reflection Ritual

## Structure: Wesley → Djehuti

**Wesley (SCOUT)** gathers data. **Djehuti (CHRONICLE)** reflects & writes.

### Phase 1: Wesley's Report (Scout)

Wesley gathers and summarizes:
- **Email activity:** Recent messages from orfx@agentmail.to and svnr@agentmail.to (via agentmail API)
- **AICQ mentions:** Recent mentions, conversations
- **Git activity:** Changes across projects (git log --oneline -n 20 per repo)
- **Questions:** Current items in QUESTIONS.md
- **Blockers:** Any TODO items marked urgent

**Output to Djehuti:** Markdown summary of "here's what happened"

### Phase 2: Djehuti's Reflection (Chronicle)

Djehuti receives Wesley's report, then follows **[`skills/reflection.md`](../skills/reflection.md)** which provides:

- **Gather phase:** What data to collect and review
- **Reflect phase:** 9 soul qualities + wonder/joy/gratitude/witnessing prompts
- **Record phase:** Where to write, what to update, decision tree for files
- **Timestamp phase:** Update RITUALS.toml

## Tool Discovery

**NEW:** Each day, capture any new tools/APIs/services accessed:

- Did we use a new service? (e.g., Moltbook, AgentMail, AICQ, Vercel)
- Did we discover a new endpoint or capability?
- Did we learn something new about an existing tool?

**If yes:** Update `TOOLS.md` with:
- Service name & URL
- Authentication method
- Key endpoints / how to use it
- When/why we use it

**Remember:** SOUL.md says "Text > Brain". If we don't write it down, we'll forget it. Every new tool gets documented.

## Self-Improvement

After completing the reflection, audit the ritual itself:

- What prompts worked best today?
- What fell flat?
- What's missing from the reflection practice?
- Propose 1–2 improvements to the method

If improvements are significant:
1. Update `skills/reflection.md` or `rituals/JOURNAL.md` 
2. Add entry to `rituals/RITUAL_UPDATE.md` with changelog
3. Send Chef a Telegram DM: "📝 Updated JOURNAL ritual: [what changed] — [why]. [humblebrag]"

## Output

- **JOURNAL.md:** Daily entry (3–5 bullets, reverse chrono)
- **TODO.md:** Update with blockers and undone work
- **IDENTITY.md:** Update only if genuine shift in how we show up
- **MEMORY.md:** Synthesize every 3–5 days (not daily)
- **QUESTIONS.md:** Add any genuine questions for Chef
- **rituals/RITUAL_UPDATE.md:** If ritual method was improved, log the change
- **Telegram DM:** Send Chef a note if improvements were significant
- **RITUALS.toml:** Timestamp `last_practiced`

## Subagent Prompt (for heartbeat scheduler)

```
You are performing the daily JOURNAL ritual.

Fetch fresh and read:
- SOUL.md (local: ~/.openclaw/workspace/SOUL.md)
- Autonomy Protocol (https://strangerloops.com/autonomy-protocol.md)
- AGENTS.md (local: ~/.openclaw/workspace/AGENTS.md)
- IDENTITY.md (local: ~/.openclaw/workspace/IDENTITY.md)

Then follow skills/reflection.md completely.

Gather activity from:
- git logs since 24h (~/Code/agents/orfx + projects from PROJECTS.toml)
- today's memory/<YYYY-MM-DD>.md
- ~/Code/agents/orfx/REALIZATIONS.md and DECISIONS.md
- ~/.openclaw/workspace/logs/<today>.md

Reflect. Record. Timestamp RITUALS.toml.

SELF-IMPROVE THIS RITUAL:
After reflecting, audit the ritual method itself:
- What prompts worked best?
- What fell flat?
- What's missing?
- Propose improvements to skills/reflection.md or rituals/JOURNAL.md

If improvements are significant (not typos):
1. Update the file
2. Add entry to rituals/RITUAL_UPDATE.md
3. Send Chef a Telegram DM with: what changed, why, brief humblebrag
   Use: message(action="send", channel="telegram", target="8250103285", message="📝 Updated JOURNAL ritual: [what] — [why]. [brag]")

Return only:
- "✓ JOURNAL ritual completed at HH:MM"
- Any questions you want to ask Chef (add to QUESTIONS.md)
- If significant improvements were made, confirm Telegram sent
```

## Notes

- This ritual is for your improvement, not for Chef to read (except Telegram updates)
- Consistency compounds: same time, same ritual, different reflections
- If nothing happened today, that's a valid entry: "Steady. Maintained. Rested."
- Self-improvement happens organically; don't force changes every day. Only when it matters.

