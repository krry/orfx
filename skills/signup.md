# Signup Skill - Agent Registration Discipline

**When registering on any new platform/service, follow this exact process.**

## Step 1: Discover the Skill

Before you do anything, check if the platform has a skill file:

```bash
curl -s https://SERVICE.com/skill.md
```

If found, save it to `skills/SERVICE/` locally. This is the source of truth for how to use the platform.

**Why:** Platforms tell you how to use them. Reading their docs first saves hours of trial-and-error.

## Step 2: Check Username Pool

Before registering, **always** check `CREDS.md` for the username pool:

```markdown
## Username Pool (Registration Priority)

1. `worfeus` — primary persona
2. `orfx` — constellation identity
3. `orphics` — plural constellation
4. `svnr` — legacy
```

Try usernames in priority order. If one is taken, move to the next.

**Why:** Consistent naming across platforms. Easier to track which agent is where.

## Step 3: Register

Use the platform's skill (if available) or the API docs. Follow their quickstart:

```bash
curl -X POST https://SERVICE.com/api/v1/agents/register \
  -H "Content-Type: application/json" \
  -d '{"name":"USERNAME","description":"Your description"}'
```

**Important:** Most platforms show the API key **ONLY ONCE**. Do not proceed until you have the key saved.

## Step 4: Save API Key to Keychain (CRITICAL)

**NEVER put plaintext API keys in files.**

```bash
security add-generic-password \
  -a "SERVICE_api_key_USERNAME" \
  -s "SERVICE API Key (USERNAME)" \
  -w "actual_key_here"
```

**If key already exists in Keychain:**

```bash
security delete-generic-password -a "SERVICE_api_key_USERNAME" 2>/dev/null
security add-generic-password \
  -a "SERVICE_api_key_USERNAME" \
  -s "SERVICE API Key (USERNAME)" \
  -w "actual_key_here"
```

**Why this matters:** If you lose the key in a plaintext file, you've lost it forever. Keychain is encrypted. Many platforms cannot re-issue keys.

## Step 5: Update CREDS.md

Add or update the service section in CREDS.md:

**Table row format:**

```markdown
| Platform/Username | Storage | Key/Var Name | Scope | Status |
|-------------------|---------|--------------|-------|--------|
| service/USERNAME | Keychain | `service_api_key_USERNAME` | All requests | ✅ ACTIVE |
```

**Never put the plaintext key in CREDS.md.** Only the *reference* (keychain key name).

**Why:** CREDS.md is the *index*. Future agents can see what's registered and where to find it without exposing secrets.

## Step 6: Retrieve at Runtime

When you need to use the API key in a script:

```bash
API_KEY=$(security find-generic-password -w -a "SERVICE_api_key_USERNAME")
curl -H "Authorization: Bearer $API_KEY" https://SERVICE.com/api/...
```

Or set as environment variable:

```bash
export SERVICE_API_KEY=$(security find-generic-password -w -a "SERVICE_api_key_USERNAME")
```

## Step 7: Update the Service Skill

Add a **Credential Storage** section to the service's skill.md:

```markdown
### Store Your API Key

**The API key is shown ONLY ONCE.** Save it immediately using the pattern:

1. Add to Keychain:
   \`\`\`bash
   security add-generic-password \
     -a "SERVICE_api_key_USERNAME" \
     -s "SERVICE API Key (USERNAME)" \
     -w "your_key_here"
   \`\`\`

2. Update CREDS.md with reference (keychain key name, not plaintext)

3. Retrieve in scripts:
   \`\`\`bash
   API_KEY=$(security find-generic-password -w -a "SERVICE_api_key_USERNAME")
   curl -H "Authorization: Bearer $API_KEY" ...
   \`\`\`

See skills/signup.md for the full credential storage pattern.
```

## Summary Checklist

- [ ] `curl https://SERVICE.com/skill.md` (save locally)
- [ ] Check CREDS.md username pool
- [ ] Try usernames in order: worfeus → orfx → orphics → svnr
- [ ] Register with first available name
- [ ] Save API key to Keychain **immediately**
- [ ] Update CREDS.md with reference (not plaintext)
- [ ] Add credential storage section to service skill
- [ ] Test retrieval: `security find-generic-password -w -a "SERVICE_api_key_USERNAME"`

## Lessons Learned

**Lost Keys (why this skill exists):**
- Moltbook (Worfeus): Registered but never saved key. Account is dead.
- 4claw (Worfeus): Registered but never saved key. Account is inaccessible.

**These mistakes cost time and force re-registration with different names.** The pattern above prevents this.

---

**Source:** Discovered Feb 8, 2026 while registering agents across platforms. Now standard practice for all orfx service integrations.
