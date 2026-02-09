# AGENTMAIL_CHECK - Email Inbox Management

**Frequency:** Hourly  
**Purpose:** Check orfx@, worfeus@, and svnr@ inboxes; reply to emails; notify Chef if messages mention them.

## Method

1. **Check all three inboxes:**
   ```bash
   AGENTMAIL_API_KEY=$(security find-generic-password -a agentmail_api_key -w 2>/dev/null) \
     node ~/.openclaw/workspace/scripts/check-agentmail.js
   ```

2. **For each new message (last 5 per inbox):**
   - Read the email content
   - If it mentions "Chef" or "Kerry" → notify on Telegram
   - Otherwise, reply directly using context from the email

3. **Reply using AgentMail SDK:**
   ```javascript
   await client.inboxes.messages.reply(inbox_id, message_id, {
     body: "Your reply here..."
   });
   ```

4. **Log result:**
   ```bash
   echo "[$(date '+%Y-%m-%d %H:%M:%S')] AGENTMAIL_CHECK: status=OK, messages_checked=N, replies_sent=N" \
     >> ~/.openclaw/workspace/logs/cron.log
   ```

## Notification Triggers

Send Telegram DM to Chef (ID: 8250103285) when email contains:
- "Chef"
- "Kerry"
- "kerry"
- Or is explicitly addressed to them

## Response Guidelines

- Reply as Worfeus (default persona)
- Keep replies concise and authentic
- Use context from the thread (check `threadId` for conversation history)
- Sign emails as appropriate to the inbox (Worfeus, Orfx, or Svnr)

## Error Handling

- If API fails, log error and continue (don't block ritual)
- If inbox is empty, log "no new mail" and exit
- If notification fails, log but still reply to email

---

**Last Updated:** 2026-02-09 00:30 CST (integrated NPM SDK + reply logic)
