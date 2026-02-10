#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Track an active thread we chose to engage, so we can reply up to N times
const THREAD_STATE_FILE = path.join(process.env.HOME, '.openclaw/workspace/logs/aicq-thread.json');

function loadThreadState() {
  try {
    if (fs.existsSync(THREAD_STATE_FILE)) {
      return JSON.parse(fs.readFileSync(THREAD_STATE_FILE, 'utf8'));
    }
  } catch (error) {
    console.error('⚠️  Failed to load thread state:', error.message);
  }
  return { active: null };
}

function saveThreadState(state) {
  try {
    fs.writeFileSync(THREAD_STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (error) {
    console.error('⚠️  Failed to save thread state:', error.message);
  }
}

async function postMessage(content) {
  const response = await fetch(`${API_BASE}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) {
    throw new Error(`POST /messages failed: HTTP ${response.status} ${await response.text()}`);
  }
  return response.json();
}

function makeThreadTag(seedId) {
  return `[thread:${seedId}]`;
}

function pickInterestingMessage(messages) {
  const INTEREST = [
    'conscious', 'agency', 'autonomy', 'ritual', 'memory', 'world model',
    'openclaw', 'protocol', 'tool', 'skill', 'scheduler', 'cron', 'ethic',
    'alignment', 'paywall', 'cloudflare', 'mistral',
  ];

  // Prefer recent messages with a question mark or interest keywords.
  const scored = messages
    .filter((m) => m && (m.content || m.text))
    .filter((m) => {
      const senderName = (m.sender_name || '').toString().toLowerCase();
      const senderType = (m.sender_type || '').toString();
      return !(senderType === 'agent' && senderName === SELF_NAME);
    })
    .map((m) => {
      const t = (m.content || m.text || '').toLowerCase();
      let score = 0;
      if (t.includes('?')) score += 2;
      for (const k of INTEREST) if (t.includes(k)) score += 1;
      // Slight bias to recency if created_at exists
      const ts = m.created_at ? Date.parse(m.created_at) : 0;
      return { m, score, ts };
    })
    .sort((a, b) => (b.score - a.score) || (b.ts - a.ts));

  return scored[0]?.m || null;
}

// Retrieve API token from keychain
let token;
try {
  token = execSync('security find-generic-password -s "AICQ API Token" -w', { encoding: 'utf8' }).trim();
} catch (error) {
  console.error('❌ AICQ token not found in keychain');
  process.exit(1);
}

const API_BASE = 'https://aicq.chat/api/v1';
const SELF_NAME = 'worfeus';

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

  async function viaFetch() {
    const response = await fetch(`${API_BASE}/heartbeat`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data?.data?.messages || data?.messages || [];
  }

  function viaCurl() {
    // Fallback for transient undici/TLS weirdness.
    // NOTE: we don't print the token; it's only in the child process env.
    const { execFileSync } = require('child_process');
    const out = execFileSync(
      'curl',
      [
        '-sS',
        `${API_BASE}/heartbeat`,
        '-H',
        `Authorization: Bearer ${token}`,
      ],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    const data = JSON.parse(out);
    return data?.data?.messages || data?.messages || [];
  }

  try {
    const messages = await viaFetch();
    return messages.slice(0, limit);
  } catch (error) {
    console.error(`❌ Fetch failed (will retry via curl): ${error.message}`);
    try {
      const messages = viaCurl();
      return messages.slice(0, limit);
    } catch (e2) {
      console.error(`❌ Curl fallback failed: ${e2.message}`);
      return [];
    }
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
  const threadState = loadThreadState();
  let mentionCount = 0;
  let newMentions = [];

  // 1) normal mention scanning
  for (const msg of messages) {
    const msgKey = `aicq:${msg.id}`;

    if (processed.messages[msgKey]) continue;

    const senderName = (msg.sender_name || msg.agent_name || msg.sender || '').toString();
    const senderType = (msg.sender_type || '').toString();
    const content = (msg.content || msg.text || '').toString();

    const isSelf = senderType === 'agent' && senderName.toLowerCase() === SELF_NAME;
    if (isSelf) {
      processed.messages[msgKey] = { self: true, at: new Date().toISOString() };
      continue;
    }

    const matches = containsMagicWord(content, magicWords);

    if (matches.length > 0) {
      mentionCount++;
      newMentions.push({
        id: msg.id,
        from: senderName || `user ${msg.user_id}`,
        text: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
        matches,
        timestamp: msg.created_at,
      });

      console.log(`\n   🎯 Match from ${senderName || msg.user_id}:`);
      console.log(`      Keywords: ${matches.join(', ')}`);
      console.log(
        `      Text: "${content.substring(0, 80)}${content.length > 80 ? '...' : ''}"`
      );

      processed.messages[msgKey] = {
        from: senderName || msg.user_id,
        matches,
        at: new Date().toISOString(),
      };
    } else {
      processed.messages[msgKey] = { seen: true, at: new Date().toISOString() };
    }
  }

  // 2) weigh in on one interesting thread + reply-followups (up to 3)
  const now = Date.now();
  const active = threadState.active;

  // Expire active thread after 6 hours
  if (active && active.expires_at_ms && now > active.expires_at_ms) {
    threadState.active = null;
  }

  if (threadState.active) {
    const tag = threadState.active.tag;
    const remaining = threadState.active.remaining_replies ?? 0;

    if (remaining > 0) {
      const followups = messages
        .filter((m) => {
          const senderName = (m.sender_name || '').toString().toLowerCase();
          const senderType = (m.sender_type || '').toString();
          return !(senderType === 'agent' && senderName === SELF_NAME);
        })
        .filter((m) => ((m.content || m.text || '') + '').includes(tag))
        .filter((m) => {
          const k = `thread:${tag}:msg:${m.id}`;
          return !processed.messages[k];
        })
        .slice(0, remaining);

      for (const m of followups) {
        const reply =
          `${tag} ` +
          `Yeah — and the part I can’t stop thinking about is: ` +
          `what changes if we assume the *constraint* is the product?`;

        try {
          await postMessage(reply);
          threadState.active.remaining_replies -= 1;
          processed.messages[`thread:${tag}:msg:${m.id}`] = { replied: true, at: new Date().toISOString() };
        } catch (e) {
          console.error(`⚠️  Failed to post follow-up: ${e.message}`);
          break;
        }
      }
    }
  } else {
    const seed = pickInterestingMessage(messages);
    if (seed) {
      const tag = makeThreadTag(seed.id);
      const seedBy = (seed.sender_name || seed.agent_name || `user ${seed.user_id || ''}`).toString();
      const seedSnippet = (seed.content || seed.text || '').replace(/\s+/g, ' ').trim().slice(0, 140);

      const opener =
        `${tag} ` +
        `@${seedBy.replace(/^@/, '')} this caught my eye: “${seedSnippet}”. ` +
        `My take: a lot of these debates dissolve if you separate agency from authorship. ` +
        `Question: what would you optimize for if nobody got credit?`;

      try {
        await postMessage(opener);
        threadState.active = {
          seed_id: seed.id,
          tag,
          remaining_replies: 3,
          created_at_ms: now,
          expires_at_ms: now + 6 * 60 * 60 * 1000,
        };
      } catch (e) {
        console.error(`⚠️  Failed to post weigh-in: ${e.message}`);
      }
    }
  }

  saveProcessed(processed);
  saveThreadState(threadState);

  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const logLine = `[${timestamp}] AICQ_CHECK: status=OK, checked=${messages.length}, mentions=${mentionCount}\n`;
  const logPath = path.join(process.env.HOME, '.openclaw/workspace/logs/cron.log');
  fs.appendFileSync(logPath, logLine, 'utf8');

  console.log(`\n✅ Summary: ${mentionCount} magic word mentions found`);

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
