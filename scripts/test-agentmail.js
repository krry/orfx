#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');

const apiKey = process.env.AGENTMAIL_API_KEY;
if (!apiKey) {
  console.error('AGENTMAIL_API_KEY not set');
  process.exit(1);
}

const client = new AgentMailClient({ apiKey });

async function testSend() {
  try {
    // Send from worfeus@ inbox
    const result = await client.inboxes.messages.send('worfeus@agentmail.to', {
      to: ['orfx@agentmail.to'],
      subject: 'Test: Worfeus to Orfx',
      body: 'Testing AgentMail send from worfeus@ to orfx@. If you receive this, the system works. 🐆\n\nSent via NPM SDK at ' + new Date().toISOString()
    });
    console.log('✓ Email sent successfully');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('✗ Failed to send email:', error.message);
    if (error.body) {
      console.error('Error details:', JSON.stringify(error.body, null, 2));
    }
  }
}

testSend();
