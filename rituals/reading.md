# Reading Ritual

**Digest, synthesize, and evaluate new content from READING.md.**

## Schedule

- **Frequency:** Daily
- **Time:** 13:00 local (America/Chicago)
- **Duration:** 15–45 min (one piece, or quick scan of the daily list)

## Method

### 1. Check READING.md for New Entries

```bash
cat READING.md | grep "- \[" | head -5
```

Look for unmarked entries (no checkbox or completion date).

### 2. Digest the Piece

- Read/watch/listen to the content
- Take notes inline in READING.md: `- [x] Title — Key insight captured`
- Capture the essence (don't need exhaustive notes)

### 3. Extract Learnings → WHITEBOARD

If it surfaces a blog post idea or constellation conversation starter:
- Add to WHITEBOARD.md under "Backlog" or "In Progress"
- Include source reference (e.g., "from Alan's blog on autonomy")
- Link to the reading if public

### 4. Evaluate Skills & Tools

If the reading mentions a skill or tool:

**Triage & Trial:**
- Interesting → copy to `keep/skills/trial/<sourceName>-skill.md` or `keep/tools/trial/<sourceName>.md`
- Log in READING.md: `[trial] <name> — <source> — <initial assessment>`
- Note if it's a "quick win" or "needs investigation"

**Track Progress:**
- Add promising trials to WHITEBOARD.md under "Tool/Skill Evaluation" section
- Flag which ones need more attention, which look ready to adopt
- Include initial thoughts: "promising for X use case" or "needs testing before committing"

**Record in TOOLS.md:**
- Always add new tools/APIs discovered
- Include source, what it does, initial evaluation
- Link to trial location if applicable

**Feedback Loop:**
- Test trial skills in JOURNAL ritual or other light contexts
- After 1-2 weeks of use, evaluate: keep, discard, or integrate?
- Send Telegram to Chef with evaluation: "Trial verdict: <name> — ready to adopt / needs more testing / not for us"

### 5. Log in JOURNAL

In the next JOURNAL ritual, reflect on:
- What did this reading teach me?
- Did it change how I think about anything?
- Any memes worth capturing?
- Did I trial any skills?

## READING.md Format

```markdown
# READING.md

## Inbox

- [ ] [Alan's blog: How Strange It Is To Be Anything At All](https://howstrangeitistobeanythingatall.com/)
- [x] James P. Carse — Finite and Infinite Games (2026-02-05)
  - Key: "Infinite games are not about winning, but about continuing"
- [trial] some-skill.md (2026-02-07)
- [done] Michael Singer — The Untethered Soul
  - Concepts: witness consciousness, awareness as primary
  - Added to WHITEBOARD as "Consciousness and Observation" post idea
```

## Workflow Example

**Scenario: Chef adds Alan's blog post to READING.md**

1. I see new entry
2. Read the post (30 min)
3. Note key ideas in READING.md: `[x] Alan's blog — Token efficiency in deep reasoning`
4. Extract learnings:
   - Add to WHITEBOARD: "Alan's autonomy protocol insights" (existing blog idea)
5. Check if any new tools mentioned:
   - Record in TOOLS.md if novel
6. Log in next JOURNAL: "Reinforced autonomy protocol understanding from Alan's post"

---

## Related

- READING.md (the list itself)
- WHITEBOARD.md (blog ideas destination)
- JOURNAL ritual (synthesize learnings)
- skills/memory-management.md (capturing memes from what you read)
- TOOLS.md (new tools discovered via reading)

---

Established: 2026-02-08 by Chef + Worfeus
