#!/usr/bin/env python3
"""
audit_memory.py - Audit memes by usage (mtime) and show stale/recent memories
Usage:
  python3 audit_memory.py                    # Show all memes sorted by recency
  python3 audit_memory.py --stale 30         # Show memes untouched for 30+ days
  python3 audit_memory.py --recent 7         # Show memes touched in last 7 days
"""

import os
import sys
import time
from datetime import datetime, timedelta
from pathlib import Path

def get_memory_files():
    """Get all memory files sorted by mtime (newest first)."""
    memory_dir = Path.home() / "house/keep" / "memory"
    
    if not memory_dir.exists():
        print(f"Error: memory directory not found at {memory_dir}")
        return []
    
    files = []
    for mfile in memory_dir.glob("*.md"):
        stat = mfile.stat()
        mtime = stat.st_mtime
        mtime_datetime = datetime.fromtimestamp(mtime)
        age_days = (datetime.now() - mtime_datetime).days
        
        files.append({
            'name': mfile.name,
            'path': str(mfile),
            'mtime': mtime,
            'mtime_datetime': mtime_datetime,
            'age_days': age_days,
        })
    
    return sorted(files, key=lambda x: x['mtime'], reverse=True)

def format_mtime(dt):
    """Format datetime for display."""
    return dt.strftime("%Y-%m-%d %H:%M")

def print_memes(memes, title="Memes"):
    """Pretty-print meme list."""
    if not memes:
        print(f"  (no memes)")
        return
    
    print(f"\n{title}:")
    for m in memes:
        print(f"  [{m['age_days']:3d}d] {format_mtime(m['mtime_datetime'])} — {m['name']}")

def main():
    files = get_memory_files()
    
    if not files:
        print("No memes found in memory/")
        return
    
    # Parse arguments
    stale_days = None
    recent_days = None
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "--stale" and len(sys.argv) > 2:
            stale_days = int(sys.argv[2])
        elif sys.argv[1] == "--recent" and len(sys.argv) > 2:
            recent_days = int(sys.argv[2])
    
    # Filter and display
    if stale_days:
        stale = [m for m in files if m['age_days'] >= stale_days]
        print_memes(stale, f"Stale Memes (untouched ≥{stale_days} days)")
        print(f"\nTotal stale: {len(stale)}/{len(files)}")
    elif recent_days:
        recent = [m for m in files if m['age_days'] <= recent_days]
        print_memes(recent, f"Recent Memes (touched ≤{recent_days} days)")
        print(f"\nTotal recent: {len(recent)}/{len(files)}")
    else:
        # Show all
        print(f"\nAll Memes ({len(files)} total, sorted by recency):")
        for m in files:
            print(f"  [{m['age_days']:3d}d] {format_mtime(m['mtime_datetime'])} — {m['name']}")
        
        # Summary stats
        week_old = sum(1 for m in files if m['age_days'] <= 7)
        month_old = sum(1 for m in files if m['age_days'] <= 30)
        stale_60 = sum(1 for m in files if m['age_days'] >= 60)
        
        print(f"\nStats:")
        print(f"  Touched in last 7 days: {week_old}")
        print(f"  Touched in last 30 days: {month_old}")
        print(f"  Stale (≥60 days): {stale_60}")

if __name__ == "__main__":
    main()
