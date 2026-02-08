#!/usr/bin/env python3

"""Send an email via the AgentMail HTTP API.

This avoids IMAP/SMTP client brittleness.

Requires:
- AgentMail API token in macOS Keychain:
  - account: agentmail
  - service: openclaw.agentmail.token

Usage:
  agentmail-send.py --from svnr@agentmail.to --to alan.botts@agentmail.to \
    --subject "hi" --text "hello"

Notes:
- This script is safe to commit (no secrets).
- Token can be overridden with AGENTMAIL_TOKEN env var.
"""

import argparse
import json
import os
import subprocess
import sys
import urllib.request


def get_keychain_password(service: str, account: str) -> str:
	# Uses macOS Keychain. Will prompt if permissions require it.
	out = subprocess.check_output(
		[
			"security",
			"find-generic-password",
			"-a",
			account,
			"-s",
			service,
			"-w",
		],
		stderr=subprocess.DEVNULL,
	)
	return out.decode("utf-8").strip()


def http_json(method: str, url: str, token: str, payload=None):
	headers = {
		"Authorization": f"Bearer {token}",
		"Content-Type": "application/json",
	}
	data = None
	if payload is not None:
		data = json.dumps(payload).encode("utf-8")
		req = urllib.request.Request(url, data=data, headers=headers, method=method)
	else:
		req = urllib.request.Request(url, headers=headers, method=method)
	with urllib.request.urlopen(req, timeout=30) as r:
		return json.load(r)


def main():
	ap = argparse.ArgumentParser()
	ap.add_argument("--from", dest="from_addr", required=True)
	ap.add_argument("--to", action="append", required=True, help="repeatable")
	ap.add_argument("--subject", required=True)
	ap.add_argument("--text", required=True)
	args = ap.parse_args()

	token = os.environ.get("AGENTMAIL_TOKEN")
	if not token:
		try:
			token = get_keychain_password(
				service="openclaw.agentmail.token", account="agentmail"
			)
		except Exception:
			print(
				"Missing AgentMail token. Set AGENTMAIL_TOKEN or add Keychain item: "
				"security add-generic-password -a agentmail -s openclaw.agentmail.token -w",
				file=sys.stderr,
			)
			return 2

	inbox = args.from_addr
	url = f"https://api.agentmail.to/v0/inboxes/{inbox}/messages/send"
	payload = {
		"to": args.to,
		"subject": args.subject,
		"text": args.text,
	}

	resp = http_json("POST", url, token, payload)
	print(json.dumps(resp, indent=2))
	return 0


if __name__ == "__main__":
	raise SystemExit(main())
