#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Retrieve API key from keychain or environment
let apiKey = process.env.AGENTMAIL_API_KEY;
if (!apiKey) {
  try {
    apiKey = execSync('security find-generic-password -s "openclaw.agentmail.token" -w', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.error('AGENTMAIL_API_KEY not set and not found in keychain');
    process.exit(1);
  }
}

if (!apiKey) {
  console.error('AGENTMAIL_API_KEY not set');
  process.exit(1);
}

const client = new AgentMailClient({ apiKey });

// Track which messages we've already processed
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

function mentionsChef(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return lower.includes('chef') || lower.includes('kerry');
}

// Simple MIME body extraction (handles plain text and basic multipart)
async function extractBody(rawEmail) {
  const lines = rawEmail.split('\n');
  let inBody = false;
  let bodyLines = [];
  let isBase64 = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for base64 encoding
    if (line.includes('Content-Transfer-Encoding: base64')) {
      isBase64 = true;
    }
    
    // Empty line marks end of headers, start of body
    if (!inBody && line.trim() === '') {
      inBody = true;
      continue;
    }
    
    if (inBody) {
      // Stop at MIME boundaries
      if (line.startsWith('--')) {
        break;
      }
      bodyLines.push(line);
    }
  }
  
  let body = bodyLines.join('\n').trim();
  
  // Decode base64 if needed
  if (isBase64 && body) {
    try {
      body = Buffer.from(body.replace(/\s/g, ''), 'base64').toString('utf8');
    } catch (e) {
      // If decode fails, return raw
    }
  }
  
  return body;
}

// Output message details for ritual handler to generate LLM reply
async function outputReplyNeeded(msg, inboxId) {
  // Fetch full message body using getRaw
  let body = '';
  try {
    const rawMsg = await client.inboxes.messages.getRaw(inboxId, msg.messageId);
    const bytes = await rawMsg.bytes();
    const rawEmail = Buffer.from(bytes).toString('utf8');
    body = await extractBody(rawEmail);
  } catch (error) {
    console.error(`      ⚠️ Failed to fetch message body: ${error.message}`);
  }
  
  const replyData = {
    inbox: inboxId,
    messageId: msg.messageId,
    threadId: msg.threadId,
    from: msg.from,
    to: msg.to,
    subject: msg.subject || '(no subject)',
    body: body,
    receivedAt: msg.timestamp
  };
  
  // Output as JSON on a single line with marker prefix
  console.log('REPLY_NEEDED:' + JSON.stringify(replyData));
}

async function checkInbox(inboxId, processed) {
  console.log(`\n📬 Checking ${inboxId}...`);
  
  try {
    const response = await client.inboxes.messages.list(inboxId, { limit: 5 });
    const messages = response.messages || [];
    
    if (messages.length === 0) {
      console.log('   No messages.');
      return { checked: 0, new: 0, replied: 0, notified: 0 };
    }
    
    let newCount = 0;
    let repliedCount = 0;
    let notifiedCount = 0;
    
    for (const msg of messages) {
      const msgKey = `${inboxId}:${msg.messageId}`;
      
      // Skip if already processed
      if (processed.messages[msgKey]) {
        continue;
      }
      
      newCount++;
      console.log(`\n   📧 New message from ${msg.from || 'unknown'}`);
      console.log(`      Subject: ${msg.subject || '(no subject)'}`);
      console.log(`      Body preview: ${(msg.body || '').substring(0, 100)}...`);
      
      // Check if it mentions Chef
      const needsNotification = mentionsChef(msg.subject) || mentionsChef(msg.body);
      
      if (needsNotification) {
        console.log('      🔔 Mentions Chef/Kerry → notifying on Telegram');
        console.log(`NOTIFY_CHEF: New email in ${inboxId} from ${msg.from}: "${msg.subject}"`);
        notifiedCount++;
        // Mark as notified (don't auto-reply to these)
        processed.messages[msgKey] = {
          from: msg.from,
          subject: msg.subject,
          processedAt: new Date().toISOString(),
          notified: true
        };
      } else {
        // Output message for ritual handler to reply
        console.log('      💬 Needs reply → sending to ritual handler');
        outputReplyNeeded(msg, inboxId);
        
        // Mark as pending reply (so it won't be re-detected, but ritual can update status after sending)
        processed.messages[msgKey] = {
          from: msg.from,
          subject: msg.subject,
          status: 'pending_reply',
          queuedAt: new Date().toISOString()
        };
      }
    }
    
    return { checked: messages.length, new: newCount, replied: repliedCount, notified: notifiedCount };
    
  } catch (error) {
    console.error(`   ✗ Failed to check inbox: ${error.message}`);
    return { checked: 0, new: 0, replied: 0, notified: 0, error: error.message };
  }
}

async function main() {
  const processed = loadProcessed();
  
  const inboxes = [
    'orfx@agentmail.to',
    'worfeus@agentmail.to',
    'svnr@agentmail.to'
  ];
  
  let totalChecked = 0;
  let totalNew = 0;
  let totalReplied = 0;
  let totalNotified = 0;
  
  for (const inbox of inboxes) {
    const stats = await checkInbox(inbox, processed);
    totalChecked += stats.checked;
    totalNew += stats.new;
    totalReplied += stats.replied;
    totalNotified += stats.notified;
  }
  
  // Save processed message IDs
  saveProcessed(processed);
  
  // Log summary
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const logLine = `[${timestamp}] AGENTMAIL_CHECK: status=OK, checked=${totalChecked}, new=${totalNew}, replied=${totalReplied}, notified=${totalNotified}\n`;
  
  const logPath = path.join(process.env.HOME, '.openclaw/workspace/logs/cron.log');
  fs.appendFileSync(logPath, logLine, 'utf8');
  
  console.log(`\n✅ Summary: ${totalNew} new messages, ${totalReplied} replies sent, ${totalNotified} notifications`);
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
