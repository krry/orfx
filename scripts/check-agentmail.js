#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');

const apiKey = process.env.AGENTMAIL_API_KEY;
if (!apiKey) {
  console.error('AGENTMAIL_API_KEY not set');
  process.exit(1);
}

const client = new AgentMailClient({ apiKey });

async function checkInbox(inboxId) {
  try {
    console.log(`\n📬 Checking ${inboxId}...`);
    const messages = await client.inboxes.messages.list(inboxId, { limit: 5 });
    
    if (messages.messages && messages.messages.length > 0) {
      console.log(`   Found ${messages.messages.length} recent messages:\n`);
      messages.messages.forEach((msg, i) => {
        console.log(`   ${i + 1}. From: ${msg.from || 'unknown'}`);
        console.log(`      Subject: ${msg.subject || '(no subject)'}`);
        console.log(`      Date: ${msg.receivedAt || msg.sentAt || 'unknown'}`);
        console.log(`      Preview: ${(msg.body || '').substring(0, 80)}...`);
        console.log('');
      });
    } else {
      console.log('   No messages found.\n');
    }
  } catch (error) {
    console.error(`   ✗ Failed to check inbox:`, error.message);
    if (error.body) {
      console.error('   Error details:', JSON.stringify(error.body, null, 2));
    }
  }
}

async function main() {
  await checkInbox('orfx@agentmail.to');
  await checkInbox('worfeus@agentmail.to');
  await checkInbox('svnr@agentmail.to');
}

main();
