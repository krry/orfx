#!/usr/bin/env node

// Script-first READING check: exit without LLM unless unread entries exist.
const fs = require('fs');
const path = require('path');

const readingPath = path.join(process.env.HOME, 'house/keep/READING.md');

if (!fs.existsSync(readingPath)) {
  console.error(`READING.md not found at ${readingPath}`);
  process.exit(2);
}

const content = fs.readFileSync(readingPath, 'utf8');
const unread = content.split('\n').filter((line) => line.match(/^\s*- \[ \]/));

if (unread.length === 0) {
  console.log('READING_OK: no unread items');
  process.exit(0);
}

console.log(`READING_NEEDS_LLM: ${unread.length} unread items`);
unread.slice(0, 10).forEach((line) => console.log(`- ${line.replace(/^\s*- \[ \]\s*/, '')}`));
process.exit(0);
