#!/usr/bin/env python3

"""Show or spawn subagents for due rituals.

Reads RITUALS.toml, finds due rituals, constructs subagent prompts.

Usage:
  rituals-spawn.py [--dry-run] [--execute]

With --dry-run: print what would be spawned (default)
With --execute: actually spawn subagents
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
    """Parse 'daily', 'weekly', 'monthly' to timedelta."""
    mapping = {
        "daily": timedelta(days=1),
        "weekly": timedelta(days=7),
        "monthly": timedelta(days=30),
        "hourly": timedelta(hours=1),
    }
    return mapping.get(duration_str.lower(), timedelta(days=1))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", default=True)
    ap.add_argument("--execute", action="store_true")
    args = ap.parse_args()

    workspace = Path.home() / "house/keep"
    rituals_file = workspace / "RITUALS.toml"
    
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
    now = datetime.fromisoformat(datetime.now().isoformat() + "Z").replace(tzinfo=None)
    due_rituals = []

    for ritual in rituals:
        name = ritual.get("name", "UNKNOWN")
        regularity = ritual.get("regularity", "daily")
        last_practiced_str = ritual.get("last_practiced")
        method = ritual.get("method", "")
        
        if not last_practiced_str:
            due_rituals.append((name, method))
            continue

        try:
            last_practiced = datetime.fromisoformat(last_practiced_str.replace("Z", "+00:00")).replace(tzinfo=None)
        except ValueError:
            due_rituals.append((name, method))
            continue

        interval = parse_duration(regularity)
        next_due = last_practiced + interval

        if next_due <= now:
            due_rituals.append((name, method))

    if not due_rituals:
        print("✓ No rituals due")
        return 0

    print(f"Rituals due: {len(due_rituals)}\n")

    for ritual_name, method_path in due_rituals:
        method_file = workspace / method_path
        
        if not method_file.exists():
            print(f"❌ {ritual_name}: method file not found ({method_path})")
            continue

        with open(method_file) as f:
            method_content = f.read()

        print(f"📋 {ritual_name}")
        print(f"   Method: {method_path}")
        print(f"   Status: {'Would spawn subagent' if args.dry_run else 'Spawning subagent...'}")
        
        if args.dry_run:
            print(f"\n   Subagent prompt:")
            print(f"   ---")
            print(f"   You are performing the {ritual_name} ritual.")
            print(f"   [reads SOUL.md, IDENTITY.md, AGENTS.md]")
            print(f"   [follows {method_path}]")
            print(f"   Return: ✓ Completed + any questions")
            print(f"   ---\n")
        else:
            # TODO: Actually spawn via sessions_spawn
            print(f"   [Would call sessions_spawn here]\n")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
