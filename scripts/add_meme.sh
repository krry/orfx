#!/bin/bash
# add_meme.sh - Create a new meme file with template
# Usage: add_meme.sh <topic> <category> <essence>
# Example: add_meme.sh "alan-botts" "contact" "infrastructure-architect"

if [ $# -lt 3 ]; then
  echo "Usage: add_meme.sh <topic> <category> <essence>"
  echo "Example: add_meme.sh alan-botts contact infrastructure-architect"
  echo ""
  echo "Creates a new file in memory/ with descriptive name:"
  echo "  memory/topic-category-essence.md"
  exit 1
fi

TOPIC="$1"
CATEGORY="$2"
ESSENCE="$3"
FILENAME="memory/${TOPIC}-${CATEGORY}-${ESSENCE}.md"

WORKSPACE_DIR="$HOME/.openclaw/workspace"
MEME_PATH="$WORKSPACE_DIR/$FILENAME"

if [ -f "$MEME_PATH" ]; then
  echo "Error: Meme already exists: $FILENAME"
  exit 1
fi

# Create template
cat > "$MEME_PATH" << 'EOF'
# Title Here

Brief description of what this meme is about.

## Key Insight

What's the core idea or context?

## Why It Matters

How does this meme influence decisions or behavior?

## Related Memes

- memory/other-meme.md
- memory/another-meme.md

Source: Where did this come from? Who established it?

Last touched: $(date -u +%Y-%m-%dT%H:%M:%SZ)
EOF

# Open in editor if available
if [ -n "$EDITOR" ]; then
  $EDITOR "$MEME_PATH"
else
  echo "Created: $FILENAME"
  echo "Edit manually at: $MEME_PATH"
fi

echo "✓ New meme: $FILENAME"
