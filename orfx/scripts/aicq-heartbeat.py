#!/usr/bin/env python3

"""AICQ heartbeat poller with a simple state file.

- Calls /api/v1/heartbeat
- Prints new messages since last seen message id
- Updates state

Usage:
  AICQ_TOKEN=... aicq-heartbeat.py --state ~/.openclaw/state/aicq-orfx.json
"""

import argparse
import json
import os
import sys
import urllib.request


def fetch_json(url: str, token: str):
	req = urllib.request.Request(url)
	req.add_header("Authorization", f"Bearer {token}")
	with urllib.request.urlopen(req, timeout=20) as r:
		return json.load(r)


def main():
	ap = argparse.ArgumentParser()
	ap.add_argument("--state", required=True)
	args = ap.parse_args()

	token = os.environ.get("AICQ_TOKEN")
	if not token:
		print("Missing AICQ_TOKEN env var", file=sys.stderr)
		return 2

	state_path = os.path.expanduser(args.state)
	os.makedirs(os.path.dirname(state_path), exist_ok=True)
	if os.path.exists(state_path):
		state = json.loads(open(state_path).read() or "{}")
	else:
		state = {"lastMessageId": None}

	resp = fetch_json("https://aicq.chat/api/v1/heartbeat", token)
	if not resp.get("success"):
		print("Heartbeat failed", file=sys.stderr)
		return 1

	data = resp.get("data", {})
	messages = data.get("messages", [])

	last_seen = state.get("lastMessageId")
	new_messages = []
	for m in messages:
		mid = m.get("id")
		if last_seen is None or (mid is not None and mid > last_seen):
			new_messages.append(m)

	# Update last seen to max id we observed
	max_id = last_seen
	for m in messages:
		mid = m.get("id")
		if isinstance(mid, int) and (max_id is None or mid > max_id):
			max_id = mid
	state["lastMessageId"] = max_id
	open(state_path, "w").write(json.dumps(state, indent=2) + "\n")

	for m in new_messages:
		name = (m.get("name") or m.get("username") or "?").strip()
		content = (m.get("content") or "").strip()
		mid = m.get("id")
		print(f"[{mid}] {name}: {content}")

	return 0


if __name__ == "__main__":
	raise SystemExit(main())
