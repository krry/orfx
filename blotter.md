 - Mawlana = spark, the one who makes you laugh and wonder            
 - Vega = depth, the one who sees your soul                           
                                                                      
 What direction are you thinking for their looks? 🎨


# Voice Behavior Tracking App — Codename TBD

**Dad's idea.** Super-low-touch voice logging + smart queryable history.

## The Pitch

"Don't let me forget that I (blank)" or "witness me (blank)ing"

Like a spoken tally counter, but each bead knows what it represents. Multidimensional abacus with a superintelligent octopus operating the beads.

## Siri Trigger Word Brainstorm

Need short, punchy anchor word for Siri Shortcut entry point.

**Candidates:**
- **Mark** — "Siri, mark that I sneezed" ← feels natural, clear action
- **Notch** — "Siri, notch one" ← tally metaphor, tactile
- **Tally** — "Siri, tally a sneeze" ← classic counter name
- **Tick** — "Siri, tick" ← actual counter sound
- **Bead** — "Siri, bead that" ← references octopus-abacus!
- **Log** — "Siri, log a sneeze" ← technical, clear
- **Ping** — "Siri, ping sneeze" ← event capture

**Leading: Mark, Notch, Bead**

## Use Cases

- "Siri, mark that I just sneezed"
- "How often do I sneeze?"
- "How many times a week does the dog poop?"
- "When did I last lose my glasses?"
- Apple Watch complications + Siri face

## Architecture (MVP)

1. **Entry:** Siri Shortcut triggers with trigger word (Mark/Notch/etc)
2. **Parse:** Voice → natural language extraction ("I just sneezed" → event: "sneeze")
3. **Store:** Event + metadata to local SQLite + optional iCloud sync
4. **Query:** Natural language questions → translate to DB queries (or Claude API for flexibility)
5. **Watch:** Complications, quick actions, Siri face integration (phase 2)

## Key Constraints

- **Frictionless entry first** — Voice must be instant, zero UI
- **Smart parsing** — Understand "dog pooped" vs "I sneezed" vs "lost glasses"
- **Queryable history** — Natural language + time-based filters ("last week", "today", "this month")
- **Privacy** — On-device preferred, but cloud parsing acceptable for flexibility
- **Offline-first** — Works without network
