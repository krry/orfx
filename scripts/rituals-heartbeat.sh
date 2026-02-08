#!/bin/bash

# rituals-heartbeat.sh — Execute due rituals via heartbeat
# Called by heartbeat scheduler to check RITUALS.toml and spawn subagents

set -e

WORKSPACE="$HOME/.openclaw/workspace"
RITUALS_TOML="$WORKSPACE/RITUALS.toml"
SPAWNED_RITUALS=()

# 1. Check which rituals are due
RITUALS_JSON=$(python3 "$WORKSPACE/scripts/rituals-check.py" --json)
DUE_RITUALS=$(echo "$RITUALS_JSON" | jq -r '.due[]')

if [ -z "$DUE_RITUALS" ]; then
  echo "💓 Heartbeat: No rituals due"
  exit 0
fi

RITUAL_COUNT=$(echo "$DUE_RITUALS" | wc -l)

# 2. For each due ritual, spawn a subagent
while IFS= read -r RITUAL_NAME; do
  [ -z "$RITUAL_NAME" ] && continue
  
  SPAWNED_RITUALS+=("$RITUAL_NAME")
  
  # Get ritual details from RITUALS.toml
  METHOD_PATH=$(grep -A5 "name = \"$RITUAL_NAME\"" "$RITUALS_TOML" | grep 'method =' | cut -d'"' -f2)
  
  if [ -z "$METHOD_PATH" ]; then
    echo "❌ $RITUAL_NAME: method path not found in RITUALS.toml"
    continue
  fi
  
  # Read the ritual method
  METHOD_FILE="$WORKSPACE/$METHOD_PATH"
  if [ ! -f "$METHOD_FILE" ]; then
    echo "❌ $RITUAL_NAME: method file not found ($METHOD_PATH)"
    continue
  fi
  
  METHOD_CONTENT=$(cat "$METHOD_FILE")
  
  # For JOURNAL: also read the reflection skill
  SKILL_CONTENT=""
  if [ "$RITUAL_NAME" = "JOURNAL" ]; then
    SKILL_FILE="$WORKSPACE/skills/reflection.md"
    if [ -f "$SKILL_FILE" ]; then
      SKILL_CONTENT=$(cat "$SKILL_FILE")
    fi
  fi
  
  # Construct the subagent task
  TASK="You are performing the $RITUAL_NAME ritual.

Read first:
- SOUL.md (local: ~/.openclaw/workspace/SOUL.md)
- IDENTITY.md (local: ~/.openclaw/workspace/IDENTITY.md)
- AGENTS.md (local: ~/.openclaw/workspace/AGENTS.md)

For Autonomy Protocol rituals, also fetch:
- Autonomy Protocol (https://strangerloops.com/autonomy-protocol.md)

Follow the method below completely. Return only:
- ✓ Ritual completed at HH:MM
- Any questions for Chef (add to QUESTIONS.md)
- If improvements were made, confirm Telegram sent

---
METHOD:
$METHOD_CONTENT

---
SKILL (if applicable):
$SKILL_CONTENT
"
  
  # 3. Spawn subagent via OpenClaw gateway API
  # Send request to spawn subagent with ritual task
  # Subagent will: execute ritual method, update RITUALS.toml timestamp, send Telegram if improvements
  
  SPAWN_RESPONSE=$(curl -s -X POST "http://localhost:8000/sessions/spawn" \
    -H "Content-Type: application/json" \
    -d "{
      \"task\": $(echo "$TASK" | jq -R -s .),
      \"label\": \"ritual_$RITUAL_NAME\",
      \"timeoutSeconds\": 300
    }" 2>/dev/null || echo '{"error": "gateway unavailable"}')
  
  SPAWN_STATUS=$(echo "$SPAWN_RESPONSE" | jq -r '.status // .error // "unknown"')
  
  if [ "$SPAWN_STATUS" = "accepted" ] || [ "$SPAWN_STATUS" = "completed" ]; then
    echo "✓ $RITUAL_NAME spawned"
  else
    echo "⚠ $RITUAL_NAME spawn issue: $SPAWN_STATUS"
  fi
  
done <<< "$DUE_RITUALS"

# 4. Generate and output heartbeat summary
echo ""
echo "💓 Heartbeat: ${#SPAWNED_RITUALS[@]} ritual(s) spawned"
for ritual in "${SPAWNED_RITUALS[@]}"; do
  echo "  • $ritual"
done
echo ""
echo "Check JOURNAL.md, QUESTIONS.md, or TODO.md for details."
