# Voice Behavior Tracking App (Codename TBD)

Chef's dad's idea + collaborative prototype project.

## The Insight

Done and Reporter are great but too heavy for authentic tracking. Real behavior logging happens in-the-moment (you sneeze, you log it instantly). Friction is the enemy.

## Core Principle

**Frictionless entry first. Everything else second.**

Entry must be dumb-simple: Siri voice command, natural language capture, done. Sophisticated parsing/querying can live in the backend, but the user's friction must be near-zero.

## Use Cases

- "Siri, remember I just sneezed"
- "How often do I sneeze?"
- "When did the dog last poop?"
- "How many times a week do I lose my glasses?"

## MVP Architecture Questions (Unanswered)

1. **Storage scope** — Local only, or sync across devices?
2. **Query complexity** — Math (frequency) vs lookup (when)?
3. **Multi-user entities** — Track "dog poops" (plural subjects) or single user only?
4. **Privacy** — On-device parsing only, or okay with cloud/Claude API?
5. **Apple Watch** — In scope for MVP or phase 2?

## Inspiration

- Done (too heavy, deliberate action required)
- Reporter app (also requires app-open friction)
- Siri voice + natural language = the differentiator

## Next Steps

- Chef to write VISION.md with codename
- Prototype architecture
- Evaluate NLP/parsing strategy (regex vs ML vs Claude API)

Source: Chef + Worfeus conversation, 2026-02-07 22:49 CST (pinned before continuing on Memberberries/Reading)
