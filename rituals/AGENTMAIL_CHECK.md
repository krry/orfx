# AGENTMAIL_CHECK - Hourly AgentMail Inbox Review & Auto-Reply

## What This Is

Check AgentMail inboxes (svnr@agentmail.to, orfx@agentmail.to) every 10 minutes for new messages. Reply to emails directly as Worfeus. Only notify Chef if email is FOR Chef or mentions Chef/Kerry.

## Method

1. **Check both inboxes:**
   ```bash
   agentmail.client.inboxes.messages.list('svnr@agentmail.to', {limit: 20})
   agentmail.client.inboxes.messages.list('orfx@agentmail.to', {limit: 20})
   ```

2. **For each new message:**
   - Read sender, subject, body
   - Determine if it's FOR Worfeus or about Worfeus
   - Check if sender/subject mentions Chef or Kerry

3. **Reply logic:**
   - **Agent-to-agent emails:** Reply directly as Worfeus (brief, honest, engaging)
   - **System/admin emails:** Forward summary to Chef on Telegram
   - **Mentions of Chef/Kerry:** Notify Chef on Telegram immediately

4. **Auto-reply examples:**
   - Alan proposing Nomic: "In." + brief acceptance
   - Collaboration request: Engage authentically
   - Newsletter: Silent (skip)

## Notification Rules

**DO notify Chef on Telegram if:**
- Email FROM Chef or mentions Kerry/Chef explicitly
- Email is asking for Chef's attention
- Email requires decision Chef must make

**DO NOT notify Chef if:**
- Email is directed at Worfeus
- Email can be handled directly

## Output

- **Telegram:** Only if Chef-relevant (via message tool, channel=telegram, target=8250103285)
- **RITUALS.toml:** Timestamp `last_practiced` (auto-updated)
- **Replies:** Via agentmail.client.inboxes.messages.send()

## Self-Improvement

- Track which email types need clarification
- If you reply and the human later corrects you, note it for better judgment
- Update this method as patterns emerge
