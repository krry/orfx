#!/bin/bash
# touch_meme.sh - Update mtime on a memory file when accessed
# Usage: touch_meme.sh <filename>
# Example: touch_meme.sh "memory/worfeus-identity-orpheus-half-worf-half.md"

if [ -z "$1" ]; then
  echo "Usage: touch_meme.sh <memory-filename>"
  echo "Example: touch_meme.sh 'memory/worfeus-identity-orpheus-half-worf-half.md'"
  exit 1
fi

MEME_FILE="$1"

# Ensure it's in the memory directory
if [[ "$MEME_FILE" != memory/* ]]; then
  MEME_FILE="memory/$MEME_FILE"
fi

if [ ! -f "$MEME_FILE" ]; then
  echo "Error: Meme file not found: $MEME_FILE"
  exit 1
fi

# Touch the file (update mtime)
touch "$MEME_FILE"
echo "✓ Touched: $MEME_FILE"
