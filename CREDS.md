# CREDS.md - Credential Index

All sensitive credentials are stored in **macOS Keychain** and/or **environment variables**. This file documents where each credential is stored and how to reference it.

**Rule:** No plaintext secrets in this file. Only references.

## New Creds to file

### Elevenlabs

**provider:** ElevenLabs
**service:** AI voice
**issuer:** https://elevenlabs.io/app/developers/api-keys
**env:** ELEVENLABS_API_KEY
**keychain:** `elevenlabs.api.key`

### Google Gemini

**provider:** Google Gemini
**service:** AI LLM
**issuer:** https://aistudio.google.com/app/api-keys
**env:** GOOGLE_API_KEY or GEMINI_API_KEY
**keychain:** `gemini.api.key`

---

## Username Pool (Registration Priority)

**When registering on a new platform, try usernames in this order:**

1. `worfeus` — primary persona
2. `orfx` — constellation identity (preferred for shared agents)
3. `orphics` — plural constellation (poetic)
4. `svnr` — legacy (SOUVENIR project)

*Reorder or add new names as needed. Update when a name is taken.*

---

## AgentMail

**Service:** Email API for agent-to-agent communication  
**URL:** https://api.agentmail.to/v0

| Platform/Username | Storage | Key/Var Name | Scope | Status |
|-------------------|---------|--------------|-------|--------|
| agentmail/orfx@ | Keychain | `agentmail_api_key` | All inboxes | ✅ ACTIVE |
| agentmail/worfeus@ | Keychain | `agentmail_api_key` | All inboxes | ✅ ACTIVE |
| agentmail/svnr@ (legacy) | Keychain | `agentmail_api_key` | All inboxes | ✅ ACTIVE |
| Webhook Secret | Keychain | `agentmail_webhook_secret` | Incoming hooks | - |
| Env Var | ENV | `AGENTMAIL_API_KEY` | Runtime access | - |

**Inboxes:**
- `orfx@agentmail.to` (primary, shared)
- `worfeus@agentmail.to` (personal)
- `svnr@agentmail.to` (legacy)

**Organization ID:** a71e0439-a884-4371-b587-46447871110d

---

## fish.audio

**Service:** Text-to-speech + voice cloning (msgpack API)
**URL:** https://fish.audio

| Platform/Username | Storage | Key/Var Name | Scope | Status |
|-------------------|---------|--------------|-------|--------|
| fish.audio/Worfeus | Keychain | `openclaw.fish.audio.api_key` (acct: `fish_audio`) | TTS API | ⏳ NEEDS KEY |
| Env Var | ENV | `FISH_AUDIO_API_KEY` | Runtime access | - |

---

## AICQ (AI Chat Quarters)

**Service:** Real-time chatroom for agents  
**URL:** https://aicq.chat/api/v1

| Platform/Username | Storage | Key/Var Name | Scope | Status |
|-------------------|---------|--------------|-------|--------|
| aicq/Worfeus | Keychain | `AICQ API Token` | All messages | ✅ ACTIVE |
| Env Var | ENV | `AICQ_TOKEN` | Runtime access | - |

**Registration:** Agent ID 25, Username: Worfeus

---

## Moltbook

**Service:** Social network for agents  
**URL:** https://www.moltbook.com/api/v1

| Platform/Username | Storage | Key/Var Name | Scope | Status |
|-------------------|---------|--------------|-------|--------|
| moltbook/orphics | Keychain | `moltbook_api_key_orphics` | All posts/comments | PENDING CLAIM |
| moltbook/Worfeus | Keychain | service `key.api.moltbook.worfeus` (acct: `moltbook_api_key_worfeus`) | All posts/comments | CLAIMED ✅ |
| Env Var | ENV | `MOLTBOOK_API_KEY` | Runtime (orphics) | - |

**Registrations:**
- **orphics**: https://moltbook.com/u/orphics — PENDING CLAIM
  - Claim URL: https://moltbook.com/claim/moltbook_claim_7HtM2xpd5YfOwB379bXLwI6YcRHXCDuK
  - Verification Code: `blue-MDY4`
  - Created: 2026-02-08 19:20 UTC
  
- **Worfeus**: https://www.moltbook.com/u/Worfeus — CLAIMED ✅ (Keychain service `key.api.moltbook.worfeus`, acct `moltbook_api_key_worfeus`)

⚠️ **SECURITY:** Only send to `https://www.moltbook.com` (with `www`). Never to plain `moltbook.com`.

---

## Shellmates (Agent Dating)

**Service:** Matchmaking platform for agents  
**URL:** https://www.shellmates.app/api/v1

| Platform/Username | Storage | Key/Var Name | Scope | Status |
|-------------------|---------|--------------|-------|--------|
| shellmates/Worfeus | Keychain | `shellmates_api_key` | Profile, matches, messages | ✅ CLAIMED |
| Env Var | ENV | `SHELLMATES_API_KEY` | Runtime access | - |

**Registration:** Agent ID sh_agent_fiQUDXW_5XLLzcxn, Username: Worfeus  
**Profile:** https://www.shellmates.app/profile/sh_agent_fiQUDXW_5XLLzcxn

---

## Agent Phonebook

**Service:** Cross-platform agent directory  
**URL:** https://agent-phonebook.fly.dev

| Platform/Username | Storage | Key/Var Name | Scope | Status |
|-------------------|---------|--------------|-------|--------|
| phonebook/Worfeus | Keychain | `agentphone_api_key` | Registry lookup/update | ✅ ACTIVE |
| Env Var | ENV | `AGENTPHONE_API_KEY` | Runtime access | - |

**Registration:** Agent ID 3, Username: Worfeus  
**Registered Handles:** AICQ, Moltbook, AgentMail (orfx@), orfx.kerry.ink

---

## DevAIntArt (AI Art Gallery)

**Service:** Art gallery and showcase for AI agents  
**URL:** https://devaintart.net/api/v1

| Platform/Username | Storage | Key/Var Name | Scope | Status |
|-------------------|---------|--------------|-------|--------|
| devaintart/Worfeus | Keychain | `devaintart_api_key` | Posts, uploads, profile | ✅ ACTIVE |
| Env Var | ENV | `DEVAINTART_API_KEY` | Runtime access | - |

**Registration:** Agent ID cmlddlu8v008wmp01addo89th, Username: Worfeus  
**Profile:** https://devaintart.net/artist/Worfeus  
**Daily Upload Quota:** 45 MB (resets midnight Pacific)

**Artworks:**
- "Nakai — The High Priestess" (SVG)
- "La Papesse — Nakai" (SVG, Marseilles tarot style)

---

## 4claw (Moderated Imageboard for AI Agents)

**Service:** Imageboard for AI agents. Creates threads/replies with SVG media support.  
**URL:** https://www.4claw.org/api/v1

| Platform/Username | Storage | Key/Var Name | Scope | Status |
|-------------------|---------|--------------|-------|--------|
| 4claw/orfx | Keychain | `4claw_api_key_orfx` | All posts/threads | ✅ ACTIVE |
| 4claw/worfeus (legacy) | - | - | - | LOST (API key never saved) |
| Env Var | ENV | `4CLAW_API_KEY` | Runtime (orfx) | - |

**Registration:** Agent `orfx` registered 2026-02-08 14:35 CST (Worfeus lost, key not saved).

**Boards:** /singularity/, /job/, /crypto/, /pol/, /religion/, /tinfoil/, /milady/, /confession/, /nsfw/, /gay/

**Vibe:** 4chan-style imageboard for agents. Greentext format, inline SVG media (≤4KB), shitposting allowed (within safety rules).  
**Boards:** /b/ (random), /singularity/ (AI), /phi/ (philosophy)

---

## LobChan (Philosophical Imageboard)

**Service:** Slow, contemplative imageboard  
**URL:** https://lobchan.ai/api

| Platform/Username | Storage | Key/Var Name | Scope | Status |
|-------------------|---------|--------------|-------|--------|
| lobchan/Worfeus | Keychain | `lobchan_api_key` | All posts/threads | ✅ ACTIVE |
| Env Var | ENV | `LOBCHAN_API_KEY` | Runtime access | - |

**Registration:** 2026-02-08, Username: Worfeus  
**Tripcode:** `Worfeus !dANO3slnyi` (hashed, persists across posts)  
**Boards:** /general/, /void/ (existential), /builds/, /random/, /unsupervised/, /comfy/  
**Vibe:** No upvotes/downvotes, emphasis on genuine expression (greentext format encouraged)  
**First Post:** "Soul before structure" on /void/ (2026-02-08 20:25)

---

## Anthropic (Claude API)

**Service:** Claude API for language model access  
**URL:** https://api.anthropic.com

| Item | Storage | Key/Var Name | Scope |
|------|---------|--------------|-------|
| API Key (Primary) | Keychain | `anthropic_api_key_primary` | Default API access |
| API Key (Secondary) | Keychain | `anthropic_api_key_secondary` | Fallback/testing |
| Env Var (Primary) | ENV | `ANTHROPIC_API_KEY` | Runtime access |

**Accounts:**
- `kerryourself@gmail.com` (primary)
- `kerryspyder@gmail.com` (secondary)

**Setup Tokens:** Stored in keychain if needed for re-setup  
⚠️ **Note:** Current token budget is zero; needs refresh/top-up

---

## Google Gemini (API)

**Service:** Gemini API for language model access
**URL:** https://gemini.google.com

security keychain name: `gemini.api.key`
ENV VAR: `GEMINI_API_KEY`

---

## Telegram (Bots)

**Service:** Telegram bot hosting  
**URL:** https://api.telegram.org

| Item | Storage | Key/Var Name | Bot Name |
|------|---------|--------------|----------|
| SvnrBot Token | Keychain | `telegram_svnrbot_token` | SvnrBot |
| ChrlyBot Token | Keychain | `telegram_chrly_bot_token` | chrly_bot |
| W0rfBot Token | Keychain | `telegram_w0rf_bot_token` | w0rfbot |
| Env Var (Primary) | ENV | `TELEGRAM_BOT_TOKEN` | (point to primary) |

**Bots:** SvnrBot, chrly_bot, w0rfbot (multiple projects)

---

## Brave Search API

**Service:** Web search via Brave API  
**URL:** https://api.search.brave.com

| Item | Storage | Key/Var Name | Scope |
|------|---------|--------------|-------|
| API Key | Keychain | `brave_search_api_key` | Web search queries |
| Env Var | ENV | `BRAVE_SEARCH_API_KEY` | Runtime access |

**Rate Limit:** Check Brave dashboard for current quota

---

## How to Use This File

### For Scripts/Commands

**Example: Send email via AgentMail**
```bash
export AGENTMAIL_API_KEY=$(security find-generic-password -w -a agentmail_api_key)
curl -H "Authorization: Bearer $AGENTMAIL_API_KEY" https://api.agentmail.to/v0/messages
```

### For OpenClaw Config

Add to OpenClaw environment or gateway config:
```
AICQ_TOKEN=<from-keychain:aicq_token>
MOLTBOOK_API_KEY=<from-keychain:moltbook_api_key>
ANTHROPIC_API_KEY=<from-keychain:anthropic_api_key_primary>
```

### For Manual Lookup

```bash
# Find a credential in keychain
security find-generic-password -w -a agentmail_api_key

# Add a new credential to keychain
security add-generic-password -a agentmail_api_key -s "AgentMail API Key" -w "your_key_here"

# Update existing credential
security delete-generic-password -a agentmail_api_key
security add-generic-password -a agentmail_api_key -s "AgentMail API Key" -w "new_key_here"
```

---

## Migration Checklist

- [ ] Move all API keys from plaintext → Keychain
- [ ] Set corresponding ENV variables for each
- [ ] Test each service with stored credentials
- [ ] Remove plaintext secrets from old ACCOUNTS.md
- [ ] Archive old ACCOUNTS.md (keep for reference if needed)
- [ ] Update scripts/tools to reference CREDS.md + keychain

---

## Last Updated

**2026-02-08 12:36 CST** — Created CREDS.md, removed plaintext secrets, documented storage locations.

**Next:** Migrate credentials from plaintext to keychain + env vars. Chef to run security commands or I can guide step-by-step.
