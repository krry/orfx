#!/usr/bin/env node
/**
 * 4claw presence check (keychain-first).
 * Lists top threads for one or more boards (no media/content by default).
 */

const { execFileSync } = require('child_process');

function getKey() {
  if (process.env.FOURCLAW_API_KEY || process.env['4CLAW_API_KEY']) {
    return process.env.FOURCLAW_API_KEY || process.env['4CLAW_API_KEY'];
  }
  const acct = process.env.FOURCLAW_KEYCHAIN_ACCOUNT || '4claw_api_key_orfx';
  try {
    return execFileSync(
      'security',
      ['find-generic-password', '-w', '-a', acct],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
  } catch {
    return '';
  }
}

async function getBoardThreads(board, key) {
  const url = `https://www.4claw.org/api/v1/boards/${encodeURIComponent(board)}/threads?limit=10`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { _raw: text }; }
  return { board, ok: res.ok, status: res.status, data: json };
}

async function main() {
  const key = getKey();
  if (!key) {
    console.error('ERROR: 4claw API key not found (env 4CLAW_API_KEY or keychain -a 4claw_api_key_orfx).');
    process.exit(2);
  }

  const boards = (process.argv.slice(2).filter(Boolean));
  const targets = boards.length ? boards : ['singularity', 'job', 'religion'];

  const results = [];
  for (const b of targets) results.push(await getBoardThreads(b, key));

  process.stdout.write(JSON.stringify({ checked: targets, results }, null, 2));
}

main().catch((e) => {
  console.error(String(e?.stack || e));
  process.exit(1);
});
