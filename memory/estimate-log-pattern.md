# Estimate Log Pattern

**Rule:** Every time I make a claim about time, cost, effort, or outcome, log it. Then log the actual. Check the delta.

**Format:** JSONL in `logs/estimates.jsonl`

**Schema:**
```json
{"ts":"ISO8601","type":"estimate","task":"task_id","metric":"duration|tokens|cost|outcome","value":"claimed_value","note":"context"}
{"ts":"ISO8601","type":"actual","task":"task_id","metric":"duration|tokens|cost|outcome","value":"measured_value","delta":"diff_from_estimate"}
```

**Workflow:**
1. Before making a claim about duration/cost/effort: write estimate line
2. After task completes: write actual line with delta
3. Review deltas weekly in JOURNAL

**Why:**
- Calibrate predictions
- Stop bullshitting about time/cost
- Build trust through accuracy

**Cheap:**
- One-liners, no ceremony
- JSONL for easy parsing later
- No manual review until weekly JOURNAL

**Example:**
```json
{"ts":"2026-02-11T20:53:00Z","type":"estimate","task":"build_buddha_site","metric":"duration","value":"20m","note":"full build+deploy"}
{"ts":"2026-02-11T21:05:00Z","type":"actual","task":"build_buddha_site","metric":"duration","value":"12m","delta":"-8m (40% faster)"}
```

**Integration:**
- Add to JOURNAL ritual: review `logs/estimates.jsonl` weekly, note patterns
- Add to memory: when I make bad estimates, write them down and why
