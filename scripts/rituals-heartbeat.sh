#!/bin/bash

# rituals-heartbeat.sh — Report due rituals for manual heartbeat execution
# This script checks RITUALS.toml and reports what's due.
# Actual ritual spawning happens via sessions_spawn in the main session.

set -e

WORKSPACE="$HOME/.openclaw/workspace"
RITUALS_TOML="$WORKSPACE/RITUALS.toml"
SPAWNED_RITUALS=()

# 1. Check which rituals are due
if [ ! -f "$WORKSPACE/scripts/rituals-check.py" ]; then
  echo "❌ Error: rituals-check.py not found at $WORKSPACE/scripts/rituals-check.py"
  exit 1
fi

RITUALS_JSON=$(python3 "$WORKSPACE/scripts/rituals-check.py" --json 2>&1)
if [ $? -ne 0 ]; then
  echo "❌ Error: rituals-check.py failed"
  echo "  Output: $RITUALS_JSON"
  exit 1
fi

# Parse JSON for due rituals
DUE_RITUALS=$(echo "$RITUALS_JSON" | jq -r '.due[]' 2>&1)
if [ $? -ne 0 ]; then
  echo "❌ Error: Failed to parse rituals-check.py JSON output"
  echo "  Output was: $RITUALS_JSON"
  exit 1
fi

if [ -z "$DUE_RITUALS" ]; then
  echo "💓 Heartbeat: No rituals due"
  exit 0
fi

# 2. Validate each due ritual exists in RITUALS.toml
while IFS= read -r RITUAL_NAME; do
  [ -z "$RITUAL_NAME" ] && continue
  
  # Check if ritual exists in RITUALS.toml
  if ! grep -q "name = \"$RITUAL_NAME\"" "$RITUALS_TOML"; then
    echo "❌ Error: Ritual '$RITUAL_NAME' not found in RITUALS.toml"
    continue
  fi
  
  # Check if method file path exists
  METHOD_PATH=$(grep -A10 "name = \"$RITUAL_NAME\"" "$RITUALS_TOML" | grep 'method =' | head -1 | cut -d'"' -f2)
  if [ -z "$METHOD_PATH" ]; then
    echo "❌ Error: $RITUAL_NAME has no method path in RITUALS.toml"
    continue
  fi
  
  METHOD_FILE="$WORKSPACE/$METHOD_PATH"
  if [ ! -f "$METHOD_FILE" ]; then
    echo "❌ Error: $RITUAL_NAME method file not found at $METHOD_PATH"
    continue
  fi
  
  SPAWNED_RITUALS+=("$RITUAL_NAME")
  
done <<< "$DUE_RITUALS"

# 3. Generate heartbeat summary
if [ ${#SPAWNED_RITUALS[@]} -eq 0 ]; then
  echo "💓 Heartbeat: 0 valid rituals found"
  exit 0
fi

echo "💓 Heartbeat: ${#SPAWNED_RITUALS[@]} ritual(s) spawned"
for ritual in "${SPAWNED_RITUALS[@]}"; do
  echo "  • $ritual"
done
echo ""
echo "Check JOURNAL.md, QUESTIONS.md, or TODO.md for details."
