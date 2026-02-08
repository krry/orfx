# PROTOCOL — Orfx

## Public repo hygiene
- Assume everything here is public.
- No secrets, tokens, private URLs, or personal context.
- Prefer links to public sources; redact or omit anything sensitive.

## Language policy — acronyms
- No acronyms unless explicitly **defined and expanded** first.
- Canonical list: `BLOPA.md` (Binary List of Permissible Acronyms).

## Pings and notifications
Default behavior when running work that takes time:
- If a task is likely to take **longer than 30 seconds**, send a **native notification** when it finishes.
- If a task runs **longer than 5 minutes**, also send a **Telegram direct message** (assumes you may have stepped away).

### Telegram rule
- When Kerry says “Telegram me”, interpret as:
  - “Send a direct message from **OrfxBot** to **+12177217217**.”
- If OrfxBot is not configured yet, ask for the bot token and confirm the chat is reachable.

## Subagents: announce policy (stop the spam)
OpenClaw subagents have an automatic “announce” step that posts a system-formatted summary including run stats.

Default Orfx rule:
- Subagents should write durable results to files (docs/investigations/, docs/decisions/, etc.).
- Then the subagent should reply exactly: `ANNOUNCE_SKIP`.

Only announce when Kerry explicitly asks to see the result in chat.

## Background task report template (when explicitly requested)
If Kerry asks for a background report:
- Start with: `<Subagent name> reporting back!`
- Then: `Findings/results: <one-line headline>`
- Then: 2–6 bullets with concrete outcomes and file paths/links.
- Do not include tool boilerplate, session identifiers, or transcript paths unless asked.
