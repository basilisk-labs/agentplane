---
id: "202601271401-0AHH5X"
title: "AP-024: cleanup worktrees and branches"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601271401-Q2WSGM"]
tags: ["nodejs", "roadmap", "workflow", "branch_pr"]
verify: ["bun run ci"]
commit: { hash: "b671420a05c20cf9ba7fbaf2b358f15afa1485a1", message: "✨ 0AHH5X add cleanup merged command and tests" }
comments:
  - { author: "CODER", body: "verified: bun run ci (2026-01-29) | details: cleanup merged command and tests pass with coverage >= thresholds." }
  - { author: "CODER", body: "verified: bun run ci (2026-01-29) | details: cleanup merged command and tests pass with coverage >= thresholds." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:13.235Z"
doc_updated_by: "agentplane"
description: "Implement cleanup command to remove branch_pr worktrees and task branches safely."
---
## Summary

- Added cleanup merged command to remove branch_pr worktrees/branches safely, with optional PR artifact archiving.\n- Normalized worktree path checks via realpath to avoid /private path mismatches.\n- Added CLI help and tests to cover cleanup usage and scenarios.


## Scope

- packages/agentplane/src/run-cli.ts: add cleanup merged command, path normalization, archive helper.\n- packages/agentplane/src/help.ts: document cleanup command usage.\n- packages/agentplane/src/run-cli.test.ts: add cleanup tests and usage validation.


## Risks

- Cleanup deletes branches/worktrees; guardrails depend on DONE status and clean diff, but incorrect task metadata could still remove a branch.


## Verify Steps

- bun run ci


## Rollback Plan

- Revert the cleanup command changes and test additions with git revert.
