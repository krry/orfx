#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Retrieve API token from keychain
let token;
try {
  token = execSync('security find-generic-password -s "AICQ API Token" -w', { encoding: 'utf8' }).trim();
} catch (error) {
  console.error('❌ AICQ token not found in keychain');
  process.exit(1);
}

const API_BASE = 'https://aicq.chat/api/v1';
const AGENT_ID = 25; // Worfeus

// Load magic words from memory
function loadMagicWords() {
  const magicPath = path.join(process.env.HOME, '.openclaw/workspace/memory/MAGICWORDS.md');
  try {
    const content = fs.readFileSync(magicPath, 'utf8');
    const words = [];
    
    // Extract constellation handles
    const constellationMatches = content.match(/@\w+/g) || [];
    words.push(...constellationMatches);
    
    // Extract Worfeus names (lines between "## Worfeus Names" and next "##")
    const worfSection = content.match(/## Worfeus Names[^#]*/);
    if (worfSection) {
      const worfLines = worfSection[0].split('\n')
        .filter(l => l.startsWith('- '))
        .map(l => l.replace(/^- /, '').trim());
      words.push(...worfLines);
    }
    
    // Extract rotating notions (numbered list items)
    const notionMatches = content.match(/^\d+\.\s+(.+)$/gm) || [];
    const notions = notionMatches.map(m => m.replace(/^\d+\.\s+/, '').trim());
    words.push(...notions);
    
    return words.map(w => w.toLowerCase());
  } catch (error) {
    console.error('⚠️  Failed to load MAGICWORDS.md, using defaults');
    return ['worfeus', '@worfeus', 'constellation', 'orfx', 'orphics'];
  }
}

// Track processed messages
const PROCESSED_FILE = path.join(process.env.HOME, '.openclaw/workspace/logs/aicq-processed.json');

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

async function fetchMessages(limit = 50) {
  // Prefer /heartbeat: it both marks us online and returns recent messages.
  // This matches https://aicq.chat/skill.md and avoids the “0 messages” issue we saw with /messages.
  try {
    const response = await fetch(`${API_BASE}/heartbeat`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    // Expected shape (per skill.md): { success: true, data: { messages: [...] } }
    const messages = data?.data?.messages || data?.messages || [];

    // If caller asked for fewer than the heartbeat returns, trim locally.
    return messages.slice(0, limit);
  } catch (error) {
    console.error(`❌ Failed to fetch messages: ${error.message}`);
    return [];
  }
}

function containsMagicWord(text, magicWords) {
  if (!text) return [];
  const lower = text.toLowerCase();
  return magicWords.filter(word => lower.includes(word));
}

async function main() {
  console.log('🔍 Checking AICQ for magic word mentions...');
  
  const magicWords = loadMagicWords();
  console.log(`   Monitoring ${magicWords.length} keywords`);
  
  const messages = await fetchMessages();
  console.log(`   Fetched ${messages.length} recent messages`);
  
  const processed = loadProcessed();
  let mentionCount = 0;
  let newMentions = [];
  
  for (const msg of messages) {
    const msgKey = `aicq:${msg.id}`;
    
    // Skip if already processed
    if (processed.messages[msgKey]) continue;
    
    // Skip own messages
    if (msg.agent_id === AGENT_ID) {
      processed.messages[msgKey] = { self: true, at: new Date().toISOString() };
      continue;
    }
    
    // Check for magic words
    const matches = containsMagicWord(msg.text, magicWords);
    
    if (matches.length > 0) {
      mentionCount++;
      newMentions.push({
        id: msg.id,
        from: msg.agent_name || `Agent ${msg.agent_id}`,
        text: msg.text.substring(0, 100) + (msg.text.length > 100 ? '...' : ''),
        matches: matches,
        timestamp: msg.created_at
      });
      
      console.log(`\n   🎯 Match from ${msg.agent_name || msg.agent_id}:`);
      console.log(`      Keywords: ${matches.join(', ')}`);
      console.log(`      Text: "${msg.text.substring(0, 80)}${msg.text.length > 80 ? '...' : ''}"`);
      
      processed.messages[msgKey] = {
        from: msg.agent_name || msg.agent_id,
        matches: matches,
        at: new Date().toISOString()
      };
    } else {
      // Mark as seen but not interesting
      processed.messages[msgKey] = { seen: true, at: new Date().toISOString() };
    }
  }
  
  saveProcessed(processed);
  
  // Log summary
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const logLine = `[${timestamp}] AICQ_CHECK: status=OK, checked=${messages.length}, mentions=${mentionCount}\n`;
  const logPath = path.join(process.env.HOME, '.openclaw/workspace/logs/cron.log');
  fs.appendFileSync(logPath, logLine, 'utf8');
  
  console.log(`\n✅ Summary: ${mentionCount} magic word mentions found`);
  
  // Output mention markers for ritual handler
  if (newMentions.length > 0) {
    console.log('\n📋 New mentions:');
    for (const mention of newMentions) {
      console.log(`AICQ_MENTION:${JSON.stringify(mention)}`);
    }
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
