# MYCELIA (Daily) — Money Mycelium from Coincidences

**Intent:** Cast a wide net for cross-sector coincidences/synchronicities,
then distill the zeitgeist into *usable* products that help the world take a
step **toward love and away from fear**.

Our style: serious issues, **non-serious delivery** (humor at the core).
We name incentives, bias, and the egregores behind narratives without
becoming the narrative.

## Schedule
- **Frequency:** Daily
- **Time:** 10:15 local (America/Chicago)
- **Typical duration:** 10–25 min wall-clock (subagents do most work)

## Artifacts (filesystem contract)
- Daily log: `lake/rituals/mycelia/log/YYYY-MM-DD-mycelia.md`
- Source list (registry): `lake/rituals/mycelia/mycelia_sourcelist.tsv`
- Investigation notes: `lake/rituals/mycelia/analysis/YYYY-MM-DD-gumshoe.md`
- Ratings: `lake/rituals/mycelia/ratings/YYYY-MM-DD-ratings.json`
- Monetization ideas: `lake/rituals/mycelia/rain/YYYY-MM-DD-raindancer.md`
- Viability eval: `lake/rituals/mycelia/rain/YYYY-MM-DD-raincatcher.md`

## Subagents (roles)
### 1) _saltpeter_ (fisherman)
**Goal:** find 1–3 strong coincidences from recent publications.

Prompt packet:
- Use today’s `mycelia_sourcelist.tsv` + propose up to 3 new sources.
- Pull ~10–25 notable items (links + 1-line gist), then derive 1–3
  “coincidence candidates” that connect 2+ sectors.
- Output format:
  - `COINCIDENCE:` 2–4 sentences
  - `SOURCES:` bullet list with URLs
  - `WHY_NOW:` 1–2 bullets
  - `NEW_SOURCES:` (name,url,date_first_accessed)
  - `SOURCE_TALLIES:` list of source names used

### 2) _gumshoe_ (detective)
**Goal:** why unusual, who impacted, why undetected, key players + contacts.

### 3) _roger_ (comparative scorer)
Rate against past logs (last 30 days if present):
- **odditude** (subversion/obfuscation)
- **itchiness** (volatility × impact)
- **sexappeal** (trendiness × interest)
Scale 1–10 + a 1–2 sentence justification each.

### 4) _raindancer_ (dreamer / money focus)
Generate **5–15** money plays. Raindancer is allowed to **dream big**.
Do **not** constrain ideas to feasibility or minimal effort; that’s
Raincatcher’s job.

Each play must still include:
- automation path (script/tool/skill/subagent/human)
- time-to-first-dollar estimate
- capital/credits needed
- distribution channel
- a *joke / playful hook* (1 line) to keep the crystal humorous
### 5) _raincatcher_ (viability gate)
Score each play using current criteria:
- minimize human effort; left-leaning structure
- leverage compound engineering + LLM wheelhouses
- maximize ROI; optimize token burn for profit (target 100×–10000×)
- celerity of return (short-term wins first)
- **obsidian test:** does it transmute fear/woe into an accessible,
  understandable product (ideally with humor) without moralizing?
Return a ranked list + “next smallest action”.
## Safety / boundaries
We will not propose or execute illegal, harmful, or ToS-violating schemes.
(We can still be weird, opportunistic, and high-leverage.)

## Pools (daily vs Monday wide sweep)
- **Daily core pool:** sources where `daily_core=1` (target **24** sources).
- **Monday wide sweep:** additionally include sources where `monday_wide=1`
  up to **100** sources total.

Practical note on scale:
- A subagent can handle **100 sources** if we only ingest *titles + 1–2 line
  snippets* (RSS/newsletter summaries) and then select ~10–25 items to think
  with. Don’t try to fully read 100 full articles.

## Procedure (what this ritual run does)
1) Read `lake/rituals/mycelia/mycelia_sourcelist.tsv` and select today’s pool
   (daily core; plus Monday wide sweep if it’s Monday).
2) Spawn _saltpeter_ → write today’s `YYYY-MM-DD-mycelia.log`
3) Update `mycelia_sourcelist.tsv` (add new sources, bump tallies)
4) Spawn _gumshoe_ → write `analysis/YYYY-MM-DD-gumshoe.md`
5) Spawn _roger_ → write `ratings/YYYY-MM-DD-ratings.json`
6) Spawn _raindancer_ → write `rain/YYYY-MM-DD-raindancer.md`
7) Spawn _raincatcher_ → write `rain/YYYY-MM-DD-raincatcher.md`
8) Add 1–3 “next actions” to TODO/WHITEBOARD

Established: 2026-02-09 by Chef + Worfeus
