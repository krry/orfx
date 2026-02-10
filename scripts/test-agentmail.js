#!/usr/bin/env node

const { AgentMailClient } = require('agentmail');

const { execFileSync } = require('child_process');

function getApiKey() {
  if (process.env.AGENTMAIL_API_KEY) return process.env.AGENTMAIL_API_KEY;
  try {
    return execFileSync(
      'security',
      ['find-generic-password', '-w', '-s', 'openclaw.agentmail.token'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
  } catch {
    return '';
  }
}

const apiKey = getApiKey();
if (!apiKey) {
  console.error('AgentMail API key not found (env AGENTMAIL_API_KEY or keychain service openclaw.agentmail.token).');
  process.exit(1);
}

const client = new AgentMailClient({ apiKey });

async function testSend() {
  try {
    // Send from worfeus@ inbox (plain text)
    const result = await client.inboxes.messages.send('worfeus@agentmail.to', {
      to: ['orfx@agentmail.to'],
      subject: 'Test: Worfeus → Orfx (plain text)',
      text:
        'Plain-text body test. If this renders, we are good.\n' +
        'Sent: ' +
        new Date().toISOString() +
        '\n',
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
