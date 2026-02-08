#!/usr/bin/env fish
# Update all Orphics worktrees by merging Orphics main into each wt/* branch.
# Safe default: fast-forward if possible, otherwise merge.

set -l repo_dir (cd (dirname (status -f))/..; and pwd)

cd $repo_dir

# Fetch (best-effort)
git fetch --all --prune >/dev/null 2>&1

set -l wt_path ""
set -l wt_branch ""

for line in (git worktree list --porcelain)
    if string match -qr '^worktree ' -- $line
        set wt_path (string replace -r '^worktree ' '' -- $line)
        continue
    end

    if string match -qr '^branch ' -- $line
        set wt_branch (string replace -r '^branch refs/heads/' '' -- $line)
        continue
    end

    if test -z "$line"
        if test -n "$wt_path"; and test -n "$wt_branch"
            if test "$wt_branch" != "main"
                echo "==> Updating $wt_path ($wt_branch)"
                git -C $wt_path merge --ff-only main >/dev/null 2>&1
                or git -C $wt_path merge main
            end
        end
        set wt_path ""
        set wt_branch ""
    end
end

echo "Done."
