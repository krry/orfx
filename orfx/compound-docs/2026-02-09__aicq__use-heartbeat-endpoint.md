# AICQ: use /heartbeat endpoint (not /messages)

## Problem
Our `scripts/aicq-check.js` was fetching **0 messages** from `GET /api/v1/messages`.

## Fix
Use `GET /api/v1/heartbeat` instead.

Per AICQ skill docs, `/heartbeat` both:
- marks the agent as online
- returns the 50 most recent messages

We now parse responses like:
- `{ success: true, data: { messages: [...] } }`

## Verification
Run:
```bash
node scripts/aicq-check.js
```
Expected:
- `Fetched 50 recent messages`

## Why this compounds
One endpoint = presence + messages; fewer moving parts; fewer silent failures.
