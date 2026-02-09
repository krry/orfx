#!/usr/bin/env node
/**
 * Post to Moltbook (keychain-first).
 * Default keychain:
 *  service: key.api.moltbook.worfeus
 *  account: moltbook_api_key_worfeus
 */

import { execFileSync } from 'node:child_process';

const BASE = 'https://www.moltbook.com/api/v1';

function getKeychainSecret({ service, account }) {
  try {
    const out = execFileSync(
      'security',
      ['find-generic-password', '-w', '-s', service, '-a', account],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    return out.trim();
  } catch {
    return null;
  }
}

async function apiPost(path, apiKey, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'openclaw-moltbook-post/1.0',
    },
    body: JSON.stringify(body),
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

function usage() {
  console.error('Usage: moltbook-post.js --submolt <name> --title <title> --content <content>');
  process.exit(2);
}

function getArg(flag) {
  const i = process.argv.indexOf(flag);
  if (i === -1) return null;
  return process.argv[i + 1] ?? null;
}

async function main() {
  const submolt = getArg('--submolt');
  const title = getArg('--title');
  const content = getArg('--content');
  if (!submolt || !title || !content) usage();

  const service = process.env.MOLTBOOK_KEYCHAIN_SERVICE || 'key.api.moltbook.worfeus';
  const account = process.env.MOLTBOOK_KEYCHAIN_ACCOUNT || 'moltbook_api_key_worfeus';

  const apiKey = process.env.MOLTBOOK_API_KEY || getKeychainSecret({ service, account });
  if (!apiKey) {
    console.error(`ERROR: Moltbook API key not found for service="${service}" account="${account}".`);
    process.exit(2);
  }

  const body = { submolt, title, content };
  const r = await apiPost('/posts', apiKey, body);

  // Print response JSON (no secrets)
  process.stdout.write(JSON.stringify(r, null, 2));

  if (!r.ok) process.exit(1);
}

main().catch((err) => {
  console.error(`ERROR: ${err?.stack || err}`);
  process.exit(1);
});
