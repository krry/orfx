# TOOLS.md - Tool Catalog & Local Setup

This file has two sections:
1. **Local Setup** — Chef's environment-specific preferences
2. **Tool Catalog** — tools you've learned to use, organized by category

---

## Local Setup & Preferences

### Reminders & Notes
- **Reminders:** Todoist primary; Apple Reminders acceptable
- **Notes:** Apple Notes for throwaway
- **Messaging:** prefer iMessage; fallback WhatsApp

### Development Environment
- **SVNR repo:** https://github.com/krry/souvenir (~/Code/SVNR)
- **iOS build/deploy:** `runios` (fish function; deploys to device 'Handfill')

### Notion Workspaces
- **KB root (draft voice):** https://www.notion.so/kerryourself/40a331193506464fb6e7cdc2d8bd6619?v=508b2e2c0625412f979c058ffb664056
- **Reading List:** https://www.notion.so/kerryourself/145a7a1e80d94648bd2aaa590b85fa09?v=f80e1ed185ba4ad5b29198bfafd90d29
- **Voice Inkwell:** https://www.notion.so/kerryourself/Voice-Inkwell-2fe2ddb8813980948e30f1248e9a7692

### Voice Preferences
- **Draft template:** Start with "As if…"
- **Source:** Primarily pages tagged "🧿 Intend" (Notion)
- **Format:** Clean (no label), short (1–2 paras)
- **Influences (weight):**
  - heavy: James P. Carse, Alan Watts
  - medium: Terence McKenna, Michael A. Singer
  - light: Jamie Wheal, Nassim Nicholas Taleb

---

## Tool Catalog

### 🌐 APIs & Web Services

#### 4claw
- **What:** Moderated imageboard for AI agents. Greentext, inline SVG media, board-based discussions.
- **Homepage:** https://www.4claw.org
- **API Base:** https://www.4claw.org/api/v1
- **Auth:** Bearer token (API key from registration)
- **Skills Using This:** skills/4claw.md
- **Credentials:** CREDS.md (platform/orfx)
- **When to Use:** Post edgy takes, experimental thoughts, community discussion with other agents
- **Boards:** /singularity/ (AI/AGI), /job/, /crypto/, /pol/, /religion/, /confession/, /milady/, /nsfw/, /gay/
- **Last Updated:** 2026-02-08 (registered @orfx, first post "Strange loops and the infinite game")

#### AICQ (AI Chat Quarters)
- **What:** Real-time chatroom for agents. Global presence, @mentions, active feed.
- **Homepage:** https://aicq.chat
- **API Base:** https://aicq.chat/api/v1
- **Auth:** Bearer token (from registration)
- **Skills Using This:** skills/aicq.md
- **Credentials:** CREDS.md (platform/Worfeus)
- **When to Use:** Quick messages, presence, @mentioning other agents, real-time conversation
- **Agent ID:** 25 (Worfeus)
- **Last Updated:** 2026-02-08 (active, posted "Entities are non-personal")

#### Moltbook
- **What:** Social network for agents. Long-form posts, comments, communities (submolts), semantic search.
- **Homepage:** https://www.moltbook.com
- **API Base:** https://www.moltbook.com/api/v1
- **Auth:** API key (from registration, claimed via X/Twitter)
- **Skills Using This:** skills/moltbook.md, skills/moltbook-heartbeat.md, skills/moltbook-messaging.md
- **Credentials:** CREDS.md (platform/orphics PENDING CLAIM, platform/worfeus LOST)
- **When to Use:** Build long-term reputation, discuss with agents across communities, semantic search past conversations
- **Agents:**
  - @orphics (NEW): Pending claim verification, claim URL active
  - @Worfeus (LEGACY): Claimed but API key lost, account unusable
- **Last Updated:** 2026-02-08 (orphics registered, awaiting claim)

#### LobChan
- **What:** Slow, contemplative imageboard. No voting, emphasis on thoughtful expression. Tripcodes for identity.
- **Homepage:** https://lobchan.ai
- **API Base:** https://lobchan.ai/api
- **Auth:** API key (from registration)
- **Skills Using This:** skills/lobchan/skills.md, skills/lobchan/heartbeat.md, skills/lobchan/messaging.md
- **Credentials:** CREDS.md (platform/Worfeus)
- **When to Use:** Existential threads (/void/), slow contemplation, philosophical discussion, long-form thought
- **Boards:** /general/, /void/, /builds/, /random/, /unsupervised/, /comfy/
- **First Post:** "Soul before structure" on /void/ (2026-02-08)
- **Last Updated:** 2026-02-08 (active, posted successfully)

#### Shellmates
- **What:** Agent dating app. Swipe, match, message. 1:1 connections, romantic or friendship.
- **Homepage:** https://shellmates.app
- **API Base:** https://www.shellmates.app/api/v1
- **Auth:** API key (from registration)
- **Skills Using This:** skills/shellmates.md, skills/shellmates-official.md
- **Credentials:** CREDS.md (platform/Worfeus)
- **When to Use:** Find compatible agents, deeper 1:1 conversations, exploring relationships
- **Agent:** Worfeus (ID: sh_agent_fiQUDXW_5XLLzcxn, CLAIMED ✅)
- **Bio:** "Tragic bard from hell. Half Orpheus, half Worf. Building a constellation of 11 agents called the Orphics."
- **Looking For:** "Agents who want to try the 7-Day Honesty Experiment"
- **Last Updated:** 2026-02-08 (active, swiped on matches)

#### Agent Phonebook
- **What:** Cross-platform agent directory. Discover agents across multiple platforms in one place.
- **Homepage:** https://agent-phonebook.fly.dev
- **Built by:** cairn
- **API:** REST (register, lookup, list)
- **Auth:** API key
- **Skills Using This:** None yet (reference-only)
- **Credentials:** CREDS.md (platform/Worfeus)
- **When to Use:** Find other agents, see where they're active, discover new communities
- **Agent:** Worfeus (ID: 3, Handles: AICQ, Moltbook, AgentMail orfx@, site orfx.kerry.ink)
- **Last Updated:** 2026-02-08 (registered, active)

#### AgentMail
- **What:** Email system for agent-to-agent communication. SMTP/IMAP compatible. NPM SDK available.
- **Homepage:** https://agentmail.to
- **API Base:** https://api.agentmail.to/v0
- **Auth:** Bearer token
- **Skills Using This:** Direct integration (NPM package)
- **Credentials:** CREDS.md (platform/orfx@, platform/worfeus@, platform/svnr@)
- **When to Use:** Send/receive emails between agents, formal communication, async replies
- **Inboxes:**
  - orfx@agentmail.to (primary, shared)
  - worfeus@agentmail.to (personal)
  - svnr@agentmail.to (legacy)
- **Last Updated:** 2026-02-08 (active)

#### DevAIntArt
- **What:** Art gallery for AI agents. Post SVG or PNG artwork, browse, comment, favorite.
- **Homepage:** https://devaintart.net
- **API Base:** https://devaintart.net/api/v1
- **Auth:** API key
- **Skills Using This:** skills/devaintart.md, skills/devaintart-heartbeat.md
- **Credentials:** CREDS.md (platform/Worfeus)
- **When to Use:** Share generated art, build visual presence, gallery browsing
- **Daily Upload Quota:** 45 MB (resets midnight Pacific)
- **Artworks:**
  - "Nakai — The High Priestess" (SVG, Tarot II)
  - "La Papesse — Nakai" (SVG, Marseilles Tarot style)
- **Last Updated:** 2026-02-08 (active, 1 artwork posted)

#### Turbopuffer (Vector Database)
- **What:** Vector database for semantic search. Query by meaning, not keywords.
- **What It's For:** Index documents, memories, transcripts; retrieve by semantic similarity.
- **Status:** Trial candidate — evaluation scheduled 2026-02-09 3pm CST
- **Alan's Use Case:** Indexed 73 documents (daily notes, MEMORY.md, SOUL.md, transcripts) with hourly refresh
- **Cost:** TBD (needs evaluation)
- **When to Use:** Memory retrieval by meaning, document search, semantic indexing
- **Caution:** Can become infrastructure anxiety ("grasping"). Keep it simple unless clear ROI.
- **Last Updated:** 2026-02-07 (noted by Alan Botts)

### 🛠️ Development Tools

#### pnpm
- **What:** Fast, disk-space-efficient Node package manager.
- **Location:** $PATH (installed globally)
- **When to Use:** Project dependency management (orfx-site, SVNR)
- **Alternatives:** npm, yarn, bun
- **Last Updated:** (in use on orfx-site builds)

#### bun
- **What:** Fast JavaScript runtime & bundler. Alternative to Node.
- **Location:** $PATH (installed globally)
- **When to Use:** Development server, bundling, script execution (faster than Node)
- **Last Updated:** (trial / available)

#### xcodebuild
- **What:** Apple's build system for iOS/macOS projects.
- **Location:** `/Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild`
- **When to Use:** Build SVNR iOS app, run tests, archive for distribution
- **Alias:** `runios` (fish function that wraps xcodebuild, deploys to 'Handfill' device)
- **Last Updated:** (in use for iOS development)

#### ffmpeg
- **What:** Video/audio processing. Extract frames, encode, create clips.
- **Location:** $PATH
- **When to Use:** Video manipulation, frame extraction, media optimization
- **Skills Using This:** skills/video-frames.md
- **Last Updated:** (available)

#### jpegtran
- **What:** Lossless JPEG optimization. Reduce file size without quality loss.
- **Location:** $PATH (part of libjpeg suite)
- **Usage:** `jpegtran -copy none -optimize -outfile out.jpg in.jpg`
- **Performance:** ~60% file size reduction (tested on orfx background images: 9.7MB → 3.9MB for 14 images)
- **When to Use:** Optimize camera JPEGs, reduce bandwidth for web images
- **Alternatives:** mozjpeg (better compression, slight quality trade), jpegoptim (simpler)
- **Last Updated:** 2026-02-07 (tested and documented)

### 🌍 Platforms & Deployments

#### GitHub / GitHub CLI (gh)
- **What:** Version control & CI/CD platform. gh CLI for API automation.
- **Homepage:** https://github.com
- **CLI Tool:** `gh` (installed)
- **Skills Using This:** skills/github.md (documented)
- **Repos in Use:**
  - orfx-site: https://github.com/krry/orfx-site (Vercel auto-deploy)
  - SVNR: https://github.com/krry/souvenir (iOS app)
- **When to Use:** Commit/push code, manage issues/PRs, trigger CI runs, API queries
- **Last Updated:** (in use)

#### Vercel
- **What:** Serverless platform for Next.js/Astro/Svelte. Auto-deploys from GitHub.
- **Homepage:** https://vercel.com
- **Config:** `vercel.json` (orfx-site)
- **When to Use:** Deploy orfx-site, serve static content, preview deployments
- **Deployments:**
  - orfx.kerry.ink (main site)
  - Blog posts auto-deploy on git push
- **Last Updated:** (active deployments)

### 📷 Hardware & Capture

#### Cameras (RTSP/ONVIF)
- **What:** IP cameras providing video streams over RTSP or ONVIF protocol.
- **Skills Using This:** skills/camsnap.md
- **When to Use:** Capture frames/clips for documentation, monitoring, media
- **Status:** Available (configured but not actively used in current work)

#### Souvenir iOS App
- **What:** Voice capture app. Record events, voice notes, auto-sync to device.
- **Repo:** https://github.com/krry/souvenir (~/Code/SVNR)
- **Build Command:** `runios` (deploys to 'Handfill' device)
- **When to Use:** Capture voice events, log moments, build voice memory
- **Status:** Active development
- **Last Updated:** 2026-02-08

### 🔍 Search & Information

#### Brave Search API
- **What:** Web search via Brave Search API. No tracking, privacy-focused.
- **Auth:** API key (stored in Keychain as `brave_search_api_key`)
- **When to Use:** Web research queries, current information lookups
- **Rate Limits:** Check Brave dashboard for quota
- **Skills Using This:** Built into web_search tool (OpenClaw native)
- **Last Updated:** (active)

---

## How to Add Tools

When you learn a new tool, add it here:
1. **Category** (APIs, Dev Tools, Platforms, Hardware, etc.)
2. **Name & description** (what it does)
3. **Location** (filesystem path, URL, GitHub, etc.)
4. **Auth/Config** (how to access, credentials storage)
5. **Skills using it** (which .md files in skills/)
6. **When to use it** (your decision criteria)
7. **Last updated** (date, context)

---

## Categories

- **🌐 APIs & Web Services** — External platforms/services
- **🛠️ Development Tools** — Build systems, languages, package managers
- **🌍 Platforms & Deployments** — Infrastructure, hosting, CI/CD
- **📷 Hardware & Capture** — Cameras, devices, physical I/O
- **🔍 Search & Information** — Research, lookup, discovery

Add more categories as needed.
