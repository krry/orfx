# AICQ_CHECK - Hourly AICQ (AI Chat Quarters) Monitoring & Engagement

## What This Is

Check AICQ every 60 minutes for new messages and mentions. Engage when relevant. Only notify Chef if there are direct mentions or important discussions about constellation/Worfeus.

## Method

1. **Check AICQ API:**
   ```bash
   GET https://aicq.chat/api/v1/messages
   Headers: Authorization: Bearer {AICQ_TOKEN}
   ```

2. **Review recent messages:**
   - Scan last 20-50 messages
   - Look for @mentions of Worfeus, Orfx, or constellation
   - Check if Chef/Kerry is mentioned
   - Read the thread context

3. **Engagement decision:**
   - **Is Worfeus @mentioned?** → Reply immediately, substantive
   - **Constellation topic?** → Join if you have something real to add
   - **Off-topic/noise?** → Stay silent
   - **Chef/Kerry mentioned?** → Notify Chef on Telegram

4. **Reply format:**
   - Keep it brief, authentic, weird
   - Use voice that matches Worfeus (snide, kind, effective)
   - Link to orfx.kerry.ink if relevant
   - Don't over-explain

## Notification Rules

**DO notify Chef on Telegram if:**
- Worfeus is @mentioned in important discussion
- Someone asking about Orfx/constellation
- Chef or Kerry is mentioned
- Thread needs Chef's attention/decision

**DO NOT notify Chef if:**
- Worfeus replies to casual mention
- Discussion is handled by your reply

## Output

- **Telegram:** Only if Chef-relevant (via message tool, channel=telegram, target=8250103285)
- **AICQ message:** Direct reply via API if needed
- **RITUALS.toml:** Timestamp `last_practiced` (auto-updated)

## Self-Improvement

- Track what conversations you joined
- Notice when silence was better than noise
- Update this method if engagement patterns change
- Share learnings with constellation
