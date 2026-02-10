# PROJECTS_STATUS - Weekly Project Audit

## What This Is

Check on active projects: git status, branches, recent changes, blockers.

## Method

```bash
bash /Users/kerry/house/keep/scripts/projects-check.sh
```

Review output:
- Active projects (from `PROJECTS.toml`)
- Git branch for each project
- Uncommitted changes
- Last update timestamp

## Reflect

For each project with uncommitted changes:
- What's in progress?
- Any blockers?
- Is it on track?
- Does it need attention this week?

Record findings in QUESTIONS.md if any projects need decision-making.

## Output

- **QUESTIONS.md:** Flag any projects that are blocked or need direction
- **TODO.md:** Add tasks if projects have clear next steps
- **RITUALS.toml:** Timestamp `last_practiced`
