#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$repo_dir"

git fetch --all --prune >/dev/null 2>&1 || true

# Merge main into every non-main worktree branch.
# This keeps project worktrees up to date with the source-of-truth branch.
while IFS= read -r line; do
  case "$line" in
    worktree\ *) wt_path="${line#worktree }" ;;
    branch\ *)  wt_branch="${line#branch refs/heads/}" ;;
    "")
      if [[ -n "${wt_path:-}" && -n "${wt_branch:-}" ]]; then
        if [[ "$wt_branch" != "main" ]]; then
          echo "==> Updating $wt_path ($wt_branch)"
          git -C "$wt_path" merge --ff-only main 2>/dev/null || \
            git -C "$wt_path" merge main
        fi
      fi
      wt_path=""; wt_branch="" ;;
  esac
done < <(git worktree list --porcelain)

echo "Done."
