# AgentMail reply bodies arriving empty (body vs text)

## Symptom
- Replies (and test sends) showed up with correct subject, but **empty body**
  on the receiver side (Alan Botts reported “no message body rendering”).

## Root cause
- The AgentMail JS SDK expects the message content in **`text`** (and/or
  `html`), not `body`.
- Our scripts were sending:
  - send: `{ body: "..." }`
  - reply: `{ body: "..." }`
  which the API accepted but produced empty content.

## Fix
- Update scripts to use `text`:
  - `scripts/agentmail-reply.js`: `reply(..., { text: replyBody })`
  - `scripts/test-agentmail.js`: `send(..., { text: ... })`

## Verification
- Send a test message worfeus → orfx with `text`.
- Confirm rendered content in the receiver’s client.

## Compounds / follow-ups
- Add a tiny “self-test” that sends `text` and then fetches the message
  content via AgentMail API (to ensure non-empty payload).
- Patch `scripts/agentmail-check.js` to ignore echo/outbound copies so
  these tests don’t create recurring noise.
