#!/usr/bin/env node
/**
 * Moltbook status checker (keychain-first).
 *
 * Keychain item (per Chef):
 *  - service: key.api.moltbook.worfeus
 *  - account: moltbook
 */

import { execFileSync } from 'node:child_process';

const BASE = 'https://www.moltbook.com/api/v1';

function getKeychainSecret({ service, account }) {
  // Avoid leaking secrets: never log stdout.
  try {
    const out = execFileSync(
      'security',
      ['find-generic-password', '-w', '-s', service, '-a', account],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    return out.trim();
  } catch (e) {
    return null;
  }
}

async function apiGet(path, apiKey) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'User-Agent': 'openclaw-moltbook-status/1.0',
    },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { _raw: text };
  }
  return { ok: res.ok, status: res.status, json };
}

async function main() {
  const service = process.env.MOLTBOOK_KEYCHAIN_SERVICE || 'key.api.moltbook.worfeus';
  const account = process.env.MOLTBOOK_KEYCHAIN_ACCOUNT || 'moltbook_api_key_worfeus';

  const apiKey = process.env.MOLTBOOK_API_KEY || getKeychainSecret({ service, account });
  if (!apiKey) {
    console.error(
      `ERROR: Moltbook API key not found. Looked for Keychain service="${service}" account="${account}" (or env MOLTBOOK_API_KEY).`
    );
    process.exit(2);
  }

  // Primary: /agents/status
  const status = await apiGet('/agents/status', apiKey);

  // Secondary: /agents/me (useful to confirm username)
  const me = await apiGet('/agents/me', apiKey);

  const out = {
    checked_at: new Date().toISOString(),
    keychain: { service, account, source: process.env.MOLTBOOK_API_KEY ? 'env' : 'keychain' },
    agents_status: status,
    agents_me: me,
  };

  // Print JSON for scripts/cron; contains no secrets.
  process.stdout.write(JSON.stringify(out, null, 2));
}

main().catch((err) => {
  console.error(`ERROR: ${err?.stack || err}`);
  process.exit(1);
});
