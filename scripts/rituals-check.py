#!/usr/bin/env python3

"""Check which rituals are due and report.

Parses RITUALS.toml, calculates next_due, returns rituals that need execution.

Usage:
  rituals-check.py [--json]

Output (default):
  - RITUAL_NAME: due now
  - RITUAL_NAME: due in Xh
  - RITUAL_NAME: not due (in Xh Ym)

With --json:
  {"due": ["JOURNAL"], "upcoming": {"RITUAL": "2h 30m"}}
"""

import argparse
import json
import sys
from datetime import datetime, timedelta
from pathlib import Path

try:
    import tomllib
except ImportError:
    import tomli as tomllib


def parse_duration(duration_str: str) -> timedelta:
    """Parse duration string to timedelta (hourly, daily, weekly, biweekly, monthly)."""
    mapping = {
        "hourly": timedelta(hours=1),
        "daily": timedelta(days=1),
        "weekly": timedelta(days=7),
        "biweekly": timedelta(days=14),
        "monthly": timedelta(days=30),
    }
    return mapping.get(duration_str.lower(), timedelta(days=1))


def format_time_until(dt: datetime) -> str:
    """Format time until a datetime as 'Xh Ym' or 'due now'."""
    now = datetime.fromisoformat(datetime.now().isoformat() + "Z").replace(tzinfo=None)
    target = dt.replace(tzinfo=None)
    
    if target <= now:
        return "due now"
    
    diff = target - now
    hours, remainder = divmod(int(diff.total_seconds()), 3600)
    minutes = remainder // 60
    
    if hours == 0:
        return f"due in {minutes}m"
    elif minutes == 0:
        return f"due in {hours}h"
    else:
        return f"due in {hours}h {minutes}m"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    rituals_file = Path.home() / ".openclaw" / "workspace" / "RITUALS.toml"
    
    if not rituals_file.exists():
        print(f"❌ {rituals_file} not found", file=sys.stderr)
        return 1

    try:
        with open(rituals_file, "rb") as f:
            data = tomllib.load(f)
    except Exception as e:
        print(f"❌ Error parsing RITUALS.toml: {e}", file=sys.stderr)
        return 1

    rituals = data.get("ritual", [])
    if not rituals:
        print("No rituals found.", file=sys.stderr)
        return 0

    now = datetime.fromisoformat(datetime.now().isoformat() + "Z").replace(tzinfo=None)
    due = []
    upcoming = {}

    for ritual in rituals:
        name = ritual.get("name", "UNKNOWN")
        regularity = ritual.get("regularity", "daily")
        last_practiced_str = ritual.get("last_practiced")
        
        if not last_practiced_str:
            due.append(name)
            continue

        try:
            last_practiced = datetime.fromisoformat(last_practiced_str.replace("Z", "+00:00")).replace(tzinfo=None)
        except ValueError:
            due.append(name)
            continue

        interval = parse_duration(regularity)
        next_due = last_practiced + interval

        if next_due <= now:
            due.append(name)
        else:
            upcoming[name] = format_time_until(next_due)

    if args.json:
        print(json.dumps({"due": due, "upcoming": upcoming}))
    else:
        for name in due:
            print(f"- {name}: due now")
        for name, when in upcoming.items():
            print(f"- {name}: {when}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
