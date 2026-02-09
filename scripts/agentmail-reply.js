#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.AGENTMAIL_API_KEY;
if (!apiKey) {
  console.error('AGENTMAIL_API_KEY not set');
  process.exit(1);
}

const client = new AgentMailClient({ apiKey });

// Expect arguments: inbox messageId replyBody
const [,, inbox, messageId, replyBody] = process.argv;

if (!inbox || !messageId || !replyBody) {
  console.error('Usage: agentmail-reply.js <inbox> <messageId> <replyBody>');
  process.exit(1);
}

const PROCESSED_FILE = path.join(process.env.HOME, '.openclaw/workspace/logs/agentmail-processed.json');

function loadProcessed() {
  try {
    if (fs.existsSync(PROCESSED_FILE)) {
      return JSON.parse(fs.readFileSync(PROCESSED_FILE, 'utf8'));
    }
  } catch (error) {
    console.error('⚠️  Failed to load processed messages:', error.message);
  }
  return { messages: {} };
}

function saveProcessed(data) {
  try {
    fs.writeFileSync(PROCESSED_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('⚠️  Failed to save processed messages:', error.message);
  }
}

async function sendReply() {
  try {
    console.log(`📤 Sending reply to ${messageId} in ${inbox}...`);
    
    const result = await client.inboxes.messages.reply(inbox, messageId, {
      body: replyBody
    });
    
    console.log(`✅ Reply sent successfully`);
    console.log(`   Message ID: ${result.messageId || 'unknown'}`);
    console.log(`   Thread ID: ${result.threadId || 'unknown'}`);
    
    // Update processed status
    const processed = loadProcessed();
    const msgKey = `${inbox}:${messageId}`;
    
    if (processed.messages[msgKey]) {
      processed.messages[msgKey].status = 'replied';
      processed.messages[msgKey].repliedAt = new Date().toISOString();
      saveProcessed(processed);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to send reply: ${error.message}`);
    if (error.body) {
      console.error('Error details:', JSON.stringify(error.body, null, 2));
    }
    return false;
  }
}

sendReply().then(success => {
  process.exit(success ? 0 : 1);
});
