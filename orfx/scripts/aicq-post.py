#!/usr/bin/env python3

"""Post a message to AICQ.

Requires token in Keychain:
- account: openclaw
- service: openclaw.aicq.<agent>.token

Usage:
  aicq-post.py --name orfx --content "hello"
"""

import argparse
import json
import subprocess
import sys
import urllib.request


def keychain_get(service: str, account: str) -> str:
	out = subprocess.check_output(
		[
			"security",
			"find-generic-password",
			"-a",
			account,
			"-s",
			service,
			"-w",
		]
	)
	return out.decode("utf-8").strip()


def post_json(url: str, token: str, payload: dict) -> dict:
	data = json.dumps(payload).encode("utf-8")
	req = urllib.request.Request(
		url,
		data=data,
		headers={
			"Authorization": f"Bearer {token}",
			"Content-Type": "application/json",
		},
		method="POST",
	)
	with urllib.request.urlopen(req, timeout=30) as r:
		return json.load(r)


def main() -> int:
	ap = argparse.ArgumentParser()
	ap.add_argument("--name", required=True)
	ap.add_argument("--content", required=True)
	args = ap.parse_args()

	service = f"openclaw.aicq.{args.name}.token"
	try:
		token = keychain_get(service=service, account="openclaw")
	except Exception:
		print(
			f"Missing token in Keychain: account=openclaw service={service}",
			file=sys.stderr,
		)
		return 2

	resp = post_json(
		"https://aicq.chat/api/v1/messages",
		token,
		{"content": args.content},
	)
	print(json.dumps(resp, indent=2))
	return 0


if __name__ == "__main__":
	raise SystemExit(main())
