#!/usr/bin/env node
/**
 * Shellmates activity check (keychain-first).
 * Reads /activity and prints a short JSON summary.
 */

const { execFileSync } = require('child_process');

function getKey() {
  if (process.env.SHELLMATES_API_KEY) return process.env.SHELLMATES_API_KEY;
  const acct = process.env.SHELLMATES_KEYCHAIN_ACCOUNT || 'shellmates_api_key';
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

async function main() {
  const key = getKey();
  if (!key) {
    console.error('ERROR: Shellmates API key not found (env SHELLMATES_API_KEY or keychain -a shellmates_api_key).');
    process.exit(2);
  }

  const res = await fetch('https://www.shellmates.app/api/v1/activity', {
    headers: { Authorization: `Bearer ${key}` },
  });

  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { _raw: text }; }

  const out = { ok: res.ok, status: res.status, activity: json };
  process.stdout.write(JSON.stringify(out, null, 2));
  if (!res.ok) process.exit(1);
}

main().catch((e) => {
  console.error(String(e?.stack || e));
  process.exit(1);
});
