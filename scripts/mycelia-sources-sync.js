#!/usr/bin/env node
/**
 * Sync MYCELIA sources (TSV) into blogwatcher.
 * - Reads lake/rituals/mycelia/mycelia_sourcelist.tsv
 * - Ensures daily_core sources exist in blogwatcher
 * - Optionally include monday_wide sources (pass --wide)
 *
 * This avoids web_fetch issues by relying on RSS/Atom/newsletter feeds
 * when available.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const TSV = path.join(process.env.HOME, 'house/keep/lake/rituals/mycelia/mycelia_sourcelist.tsv');

function run(cmd, args) {
  return execFileSync(cmd, args, { encoding: 'utf8' });
}

function parseTsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() && !l.startsWith('#'));
  const header = text
    .split(/\r?\n/)
    .find((l) => l.startsWith('# domain'))
    ?.replace(/^#\s*/, '')
    .split('\t');

  // If header isn't found in comment, fall back to hardcoded.
  const cols = header || [
    'domain','name','url','type','rss_url','cadence_guess','why_high_signal',
    'bias_angle_note','paywall_gate_risk','tags','notes','added_date','added_by',
    'last_used','used_count','daily_core','monday_wide'
  ];

  return lines.map((l) => {
    const parts = l.split('\t');
    const row = {};
    cols.forEach((c, i) => (row[c] = parts[i] ?? ''));
    return row;
  });
}

function getTrackedNames() {
  const out = run('blogwatcher', ['blogs']);
  const names = new Set();
  // Output format is human text; we just scrape indented name lines.
  for (const line of out.split(/\r?\n/)) {
    const m = line.match(/^\s{2}(.+)$/);
    if (m && !m[1].startsWith('URL:')) names.add(m[1].trim());
  }
  return names;
}

function addBlog(name, url) {
  run('blogwatcher', ['add', name, url]);
}

function main() {
  const wide = process.argv.includes('--wide');
  const text = fs.readFileSync(TSV, 'utf8');
  const rows = parseTsv(text);

  const pool = rows.filter((r) => {
    const daily = (r.daily_core || '').trim() === '1';
    const monday = (r.monday_wide || '').trim() === '1';
    return wide ? (daily || monday) : daily;
  });

  const tracked = getTrackedNames();

  let added = 0;
  for (const r of pool) {
    const name = (r.name || '').trim();
    if (!name) continue;
    if (tracked.has(name)) continue;

    const feed = (r.rss_url || '').trim();
    const url = feed || (r.url || '').trim();
    if (!url) continue;

    try {
      addBlog(name, url);
      added += 1;
    } catch {
      // best-effort; keep going
    }
  }

  process.stdout.write(JSON.stringify({ wide, selected: pool.length, added }, null, 2));
}

main();
