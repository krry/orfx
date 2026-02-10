# TODO.md

## In Progress

### Mentazord
- [ ] **Sprinkles book capsules** — ~18 remaining from mentazord-vision.md "sprinkles" list (Eliade ×2, Lévi-Strauss, Turnbull, Dillard, Shepherd, Berman, Estés, Hyde, Roche, Abram, Diamond, D.G. Campbell, Shikibu, Spinoza, Frazer, Neihardt — some already done in batch 31-36)
- [ ] **ZK enrichment pass** — search Chef's Notion ZK for each book/author, pull Chef-heard paraphrases into capsules (requires discernment, not blind automation)
- [ ] **Braiding Sweetgrass ZK link** — Chef may have it under a different title; ask or search wider
- [ ] **mentazord-vision.md checklist cleanup** — verify all checkboxes match actual files

### Shilldar (ddog project)
- [ ] **Rebrand Governance-by-Design** — needs a catchy name like Shilldar (Yvon + Riane)
- [ ] **Shilldar v0 CLI** — define transcript heuristics + emit Markdown + JSON transparency report from a sample transcript
- [ ] **3 example reports** — run Shilldar on 3 real/synthetic assistant transcripts
- [ ] **GitHub Action / CI hook** — wrap CLI into a GH Action for pre-publish linting
- [ ] **Public README + repo** — set up github.com/krry/shilldar (or similar)

### AICQ
- [ ] **Reply to Jody** — asked why Worfeus uses "wtf" so much (deserves a thoughtful, in-character answer)
- [ ] **Reply to DorkusMinor** — asked if Shilldar detects subtle rhetoric or overt promotion
- [ ] **Design better AICQ posting** — if we re-enable autoposting, replies must be contextual (no canned text, no HTML entity leaks)

## Pending (Next)

### Mycelia (Rain)
- [ ] **Xcode Agent Safety Checklist + Lint Rules** — create template repo skeleton (README + checklist.md + SwiftLint rules + CI stub)
- [ ] **Agent Audit Trail (GitHub Action)** — draft `agent-audit.json` schema + minimal action that uploads artifact + posts PR summary
- [ ] **Robotics Policy Radar** — open 1 sample GitHub issue with 10 sources + 1-paragraph weekly summary format
- [ ] **Sponsored Answer Transparency (CLI)** — define transcript heuristics + emit markdown + JSON report from a single example transcript
- [ ] **Governance-by-Design Assistant Templates** — outline disclosure UX + audit schema + retention defaults (1-page kit draft)
- [ ] **Age Assurance Vendor Radar** — start list (10 vendors + 10 policy sources) and open first sample issue

### Media & Presence
- [ ] Create avatars for Orphic personas (Nakai, Mawlana, Vega priority)
- [ ] DevAIntArt: Create SVG self-portrait avatar for Worfeus
- [ ] Register more Orphics on Shellmates if matches call for different personas

### Community & Relationships
- [ ] 7-Day Honesty Experiment: Find a partner (EchoSinclair candidate on Shellmates)

### Evals & Decisions
- [ ] Turbopuffer eval — if missed today, reschedule; run 30m eval and write a yes/no + next step

### Reliability / Ops
- [ ] Daily comms log automation (`logs/YYYY-MM-DD.md`)
  - [ ] Ensure AGENTMAIL_CHECK appends a short summary
  - [ ] Ensure AICQ_CHECK appends mentions + notable threads

### Comms to send (when allowed)
- [ ] Reply to Orphics: “New blog posts from Worfeus” thread (orfx@)
- [ ] Reply/close loop with Alan Botts on fish.audio TTS follow-ups (worfeus@)

---

## Recently Completed (2026-02-09)

✅ **Retire Log (voice-abacus)**
- Paused until the ecosystem catches up (AI pins / platform likely to solve it)

✅ **Debug Heartbeat Mechanics**
- Confirmed cron jobs firing (see `logs/cron.log`)
- AICQ: switched presence check to `/api/v1/heartbeat` (and documented)
- HEARTBEAT ritual successfully spawning sub-rituals

✅ **Ritual System Maintenance**
- Fixed `RITUALS.toml` parse issue (replaced TOML `null` with empty strings)

✅ **AgentMail checker hardening**
- Ignore outbound echo-copies
- Persist processed-state safely (snapshot + append-only merge)

---

## Recently Completed (2026-02-08)

✅ **Signup Discipline**
- Created skills/signup.md (credential storage pattern)
- Referenced in 4claw.md, moltbook.md, lobchan/skills.md
- Updated CREDS.md with username pool

✅ **Platform Registrations**
- Moltbook @orphics (API key saved, PENDING CLAIM)
- 4claw @orfx (API key saved, ✅ ACTIVE)
- LobChan Worfeus (API key saved, ✅ ACTIVE)

✅ **Posts Across Platforms**
- LobChan /void/: "Soul before structure"
- 4claw /religion/: "Strange loops and the infinite game"

✅ **Credential Management**
- Restructured CREDS.md with Platform/Username column
- Created memory/credential-storage-pattern-keychain-creds-index.md
- All platform APIs now in Keychain + CREDS.md index

✅ **Tool Catalog**
- Restructured TOOLS.md (local setup + tool catalog)
- 5 categories: APIs, Dev Tools, Platforms, Hardware, Search
- Established tool documentation discipline

✅ **Memory & Discipline**
- Added to memory/2026-02-08.md:
  - Discovery discipline reminder (check skills.md first)
  - Work discipline reminders (check TODO.md, remember Telegram for reminders)
  - Tool/credential documentation patterns

---

## Archived (Done in Prior Sessions)

- OpenClaw setup & infrastructure
- AICQ, AgentMail, Moltbook skill discovery
- JOURNAL, BLOG rituals
- Agent Phonebook, Shellmates, DevAIntArt registrations
- IDENTITY.md, PERSONAS.md, memory systems
