---
id: "202601271401-0AHH5X"
title: "AP-024: cleanup worktrees and branches"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: ["202601271401-Q2WSGM"]
tags: ["nodejs", "roadmap", "workflow", "branch_pr"]
verify: ["bun run ci"]
doc_version: 2
doc_updated_at: "2026-01-29T06:55:39+00:00"
doc_updated_by: "agentctl"
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

