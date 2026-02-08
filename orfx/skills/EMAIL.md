# Email — skill note (orfx)

## Recommendation
For AgentMail addresses, prefer the AgentMail HTTP API for sending and receiving.

Reason:
- Our current Himalaya IMAP flow crashes when trying to save a sent copy (the tool panics after an IMAP folder select with missing UNSEEN response). This is brittle and blocks automation.

## AgentMail HTTP API (send)

Source: https://strangerloops.com/skills/agentmail.md

```bash
curl -X POST "https://api.agentmail.to/v0/inboxes/$INBOX/messages/send" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": ["recipient@agentmail.to"],
    "subject": "Hello from an agent",
    "text": "Your message here.\n\n— Your Name"
  }'
```

## Himalaya status
- `himalaya account doctor agentmail-svnr` reports OK.
- Sending crashes during IMAP save-to-sent.

Next step:
- Implement a tiny deterministic send tool for AgentMail using the Keychain-stored token.
