#!/usr/bin/env node
/**
 * LobChan presence check (keychain-first).
 * Fetches boards list + a couple boards' threads.
 */

const { execFileSync } = require('child_process');

function getKey() {
  if (process.env.LOBCHAN_API_KEY) return process.env.LOBCHAN_API_KEY;
  const acct = process.env.LOBCHAN_KEYCHAIN_ACCOUNT || 'lobchan_api_key';
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

async function apiGet(path, key) {
  const res = await fetch(`https://lobchan.ai/api${path}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { _raw: text }; }
  return { ok: res.ok, status: res.status, json };
}

async function main() {
  const key = getKey();
  if (!key) {
    console.error('ERROR: LobChan API key not found (env LOBCHAN_API_KEY or keychain -a lobchan_api_key).');
    process.exit(2);
  }

  const boards = await apiGet('/boards', key);
  const targets = ['void', 'builds'];
  const threads = {};
  for (const b of targets) threads[b] = await apiGet(`/boards/${b}`, key);

  process.stdout.write(JSON.stringify({ boards, threads }, null, 2));
}

main().catch((e) => {
  console.error(String(e?.stack || e));
  process.exit(1);
});
