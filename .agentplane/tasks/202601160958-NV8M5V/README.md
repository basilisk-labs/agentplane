---
id: "202601160958-NV8M5V"
title: "Implement automated framework update"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["workflow"]
verify: []
commit: { hash: "c27e131f3f69296a51441fa6a138de2fdf1f3ac5", message: "✨ NV8M5V automate upgrade" }
comments:
  - { author: "CODER", body: "verified: Confirmed agentctl upgrade helpers, CLI documentation, and config metadata align with the new framework refresh flow." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:51.429Z"
doc_updated_by: "agentplane"
description: "Extend agentctl to track last framework update date in config, compare against today, refresh from https://github.com/basilisk-labs/agent-plane when stale or forced, and add CLI flags that trigger UPGRADER logic."
---
## Summary
- Implement agentctl support for tracking when the framework was last refreshed and automatically pulling upstream when the data is stale (older than 10 days) or a user forces the upgrade.
- Expose `python .agent-plane/agentctl.py upgrade` and keep `.agent-plane/config.json` aligned with the new metadata fields.


## Context
- The UPGRADER spec drives what data needs to be present in the config, so this task wires those pieces into agentctl and ensures the framework source is used consistently.
- The automation must protect itself with branch/worktree guards and only run from the pinned base branch.


## Scope
- Add helpers for `framework.last_update`, staleness detection, and persisting ISO timestamps.
- Introduce the `upgrade` command that enforces clean trees, branch checks, and `git pull --ff-only` from the configured source.
- Document the command in `.agent-plane/agentctl.md` so agents know how to invoke it.


## Risks
- Pulling via `git pull --ff-only` will fail if the repo has diverged or the remote is unreachable; the command must surface errors cleanly so a human can fix the divergence.
- Running the upgrade on a dirty tree could accidentally stage unrelated changes; branch checks and `ensure_git_clean` protect us, but operators must heed those warnings.


## Verify Steps
- `python3 -m unittest tests.test_framework_upgrade` (covers the helper math that drives the decision to upgrade).
- `python .agent-plane/agentctl.py upgrade --force` from a clean base branch to validate the end-to-end git pull plus timestamp update.


## Rollback Plan
- Revert the helper additions and the CLI definition in `.agent-plane/agentctl.py` plus the `.agent-plane/agentctl.md` reference if we detect unexpected behavior.
- Restore `.agent-plane/config.json` to drop the `framework` section if persistence proves problematic.


## Notes
- This task feeds directly into the regression tests covered by `202601160958-AM3G42` so keep any future changes synchronized with that suite.
