#!/bin/bash
# projects-check.sh — discover active project status

set -e

WORKSPACE="${WORKSPACE:-.}"
PROJECTS_FILE="$WORKSPACE/PROJECTS.toml"

if [ ! -f "$PROJECTS_FILE" ]; then
  echo "ERROR: PROJECTS.toml not found at $PROJECTS_FILE"
  exit 1
fi

echo "=== ACTIVE PROJECTS ==="

python3 << EOF
try:
    import tomllib
except ImportError:
    import tomli as tomllib

with open("$PROJECTS_FILE", 'rb') as f:
    data = tomllib.load(f)

for project in data.get('project', []):
    if project.get('status') == 'active':
        print(f"  • {project.get('name')} ({project.get('type')})")
EOF

echo ""
echo "=== GIT STATUS ==="

python3 << 'EOF'
import os
import subprocess

try:
    import tomllib
except ImportError:
    import tomli as tomllib

projects_file = os.path.expanduser("/Users/kerry/house/keep/PROJECTS.toml")

with open(projects_file, 'rb') as f:
    data = tomllib.load(f)

for project in data.get('project', []):
    if project.get('status') == 'active':
        path = project.get('local_path', '')
        expanded = os.path.expanduser(path)
        if os.path.isdir(os.path.join(expanded, '.git')):
            os.chdir(expanded)
            try:
                status = subprocess.check_output(['git', 'status', '--short'], text=True).strip()
                status_count = len(status.split('\n')) if status else 0
                branch = subprocess.check_output(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], text=True).strip()
            except:
                status_count = '?'
                branch = 'detached'
            print(f"  {path}: {branch} ({status_count} changes)")
EOF

echo ""
echo "Last updated: $(grep 'last_updated' "$PROJECTS_FILE" | cut -d'"' -f2)"
