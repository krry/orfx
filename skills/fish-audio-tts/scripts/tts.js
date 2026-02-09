#!/usr/bin/env node

/**
 * fish.audio TTS generator.
 *
 * Keychain-first credential lookup:
 *   service: key.api.fish.audio
 *   account: fishaudio_apikey_kerryourself
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

let encode;
try {
  ({ encode } = require('@msgpack/msgpack'));
} catch (e) {
  console.error('Missing dependency: @msgpack/msgpack');
  console.error('Install: pnpm add @msgpack/msgpack  (or npm i @msgpack/msgpack)');
  process.exit(1);
}

function getApiKey() {
  if (process.env.FISH_AUDIO_API_KEY) return process.env.FISH_AUDIO_API_KEY;
  try {
    return execFileSync(
      'security',
      ['find-generic-password', '-w', '-s', 'key.api.fish.audio', '-a', 'fishaudio_apikey_kerryourself'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim();
  } catch {
    return '';
  }
}

function parseArgs(argv) {
  const args = { model: 's1', format: 'mp3' };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const v = argv[i + 1];
    if (a === '--text') { args.text = v; i++; continue; }
    if (a === '--voice' || a === '--reference' || a === '--reference_id') { args.reference_id = v; i++; continue; }
    if (a === '--out') { args.out = v; i++; continue; }
    if (a === '--model') { args.model = v; i++; continue; }
    if (a === '--format') { args.format = v; i++; continue; }
    if (a === '-h' || a === '--help') { args.help = true; continue; }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.help || !args.text || !args.reference_id || !args.out) {
    console.log('Usage: tts.js --voice <reference_id> --text <text> --out <path.mp3> [--model s1] [--format mp3]');
    process.exit(args.help ? 0 : 2);
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('fish.audio API key not found.');
    console.error('Set keychain: service=key.api.fish.audio account=fishaudio_apikey_kerryourself');
    console.error('Or set env var FISH_AUDIO_API_KEY (less secure).');
    process.exit(1);
  }

  const payload = {
    text: args.text,
    reference_id: args.reference_id,
    format: args.format,
  };

  const body = encode(payload);

  const res = await fetch('https://api.fish.audio/v1/tts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/msgpack',
      'model': args.model,
    },
    body,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`fish.audio TTS failed: HTTP ${res.status} ${res.statusText}${txt ? ` — ${txt}` : ''}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  fs.writeFileSync(args.out, buf);
  console.log(args.out);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
