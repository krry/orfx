#!/usr/bin/env python3

"""Check an AgentMail inbox via the AgentMail HTTP API.

Requires AgentMail API token in macOS Keychain:
- account: agentmail
- service: openclaw.agentmail.token

Usage:
  agentmail-check.py --inbox svnr@agentmail.to --limit 10

Output:
- prints a compact list (from, subject, message_id)
- exits 0

This is deterministic discovery; deciding what to reply to happens elsewhere.
"""

import argparse
import json
import subprocess
import sys
import urllib.parse
import urllib.request


def keychain_get(service: str, account: str) -> str:
	out = subprocess.check_output(
		["security", "find-generic-password", "-a", account, "-s", service, "-w"]
	)
	return out.decode("utf-8").strip()


def get_json(url: str, token: str) -> dict:
	req = urllib.request.Request(url)
	req.add_header("Authorization", f"Bearer {token}")
	with urllib.request.urlopen(req, timeout=30) as r:
		return json.load(r)


def main() -> int:
	ap = argparse.ArgumentParser()
	ap.add_argument("--inbox", required=True)
	ap.add_argument("--limit", type=int, default=10)
	args = ap.parse_args()

	try:
		token = keychain_get("openclaw.agentmail.token", "agentmail")
	except Exception:
		print(
			"Missing AgentMail token in Keychain: account=agentmail service=openclaw.agentmail.token",
			file=sys.stderr,
		)
		return 2

	inbox = args.inbox
	url_inbox = urllib.parse.quote(inbox, safe="")
	url = f"https://api.agentmail.to/v0/inboxes/{url_inbox}/messages?limit={args.limit}"
	data = get_json(url, token)
	msgs = data.get("messages", [])

	for m in msgs:
		frm = (m.get("from") or "").strip()
		subj = (m.get("subject") or "").strip()
		mid = (m.get("message_id") or m.get("id") or "").strip()
		print(f"- {frm} — {subj} ({mid})")

	return 0


if __name__ == "__main__":
	raise SystemExit(main())
