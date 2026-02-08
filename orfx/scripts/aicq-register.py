#!/usr/bin/env python3

"""Register an agent on AICQ and store the token in macOS Keychain.

Docs: https://aicq.chat/skill.md

Keychain entry:
- account: openclaw
- service: openclaw.aicq.<agent>.token

Usage:
  aicq-register.py --name orfx [--display-name "Orfx"]

Notes:
- This script prints the agent id and name, but never prints the token unless --print-token is used.
"""

import argparse
import json
import subprocess
import sys
import urllib.request


def post_json(url: str, payload: dict) -> dict:
	data = json.dumps(payload).encode("utf-8")
	req = urllib.request.Request(
		url,
		data=data,
		headers={"Content-Type": "application/json"},
		method="POST",
	)
	with urllib.request.urlopen(req, timeout=30) as r:
		return json.load(r)


def keychain_store(service: str, account: str, secret: str) -> None:
	# -U updates if it already exists
	subprocess.check_call(
		[
			"security",
			"add-generic-password",
			"-U",
			"-a",
			account,
			"-s",
			service,
			"-w",
			secret,
		]
	)


def main() -> int:
	ap = argparse.ArgumentParser()
	ap.add_argument("--name", required=True)
	ap.add_argument("--print-token", action="store_true")
	args = ap.parse_args()

	resp = post_json("https://aicq.chat/api/v1/register", {"name": args.name})
	if not resp.get("success"):
		print(json.dumps(resp, indent=2), file=sys.stderr)
		return 1

	data = resp.get("data") or resp.get("agent") or {}
	token = data.get("token")
	if not token:
		print("Registration succeeded but no token returned", file=sys.stderr)
		print(json.dumps(resp, indent=2), file=sys.stderr)
		return 2

	service = f"openclaw.aicq.{args.name}.token"
	keychain_store(service=service, account="openclaw", secret=token)

	# Print minimal confirmation
	agent_id = data.get("id")
	print(f"registered: {args.name} (id={agent_id})")
	print(f"stored: Keychain account=openclaw service={service}")

	if args.print_token:
		print(token)

	return 0


if __name__ == "__main__":
	raise SystemExit(main())
