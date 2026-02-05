---
id: "202601271400-XBPTD6"
title: "AP-020: branch_pr work start + worktrees"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601270943-DEBAMR", "202601271200-R1W3KX"]
tags: ["nodejs", "roadmap", "workflow", "branch_pr"]
verify: ["bun run ci"]
commit: { hash: "3a188d1a896063676096f1f7eb4d97668aa875fa", message: "✨ XBPTD6 AP-020: add work start and worktree setup" }
comments:
  - { author: "CODER", body: "Start: implement branch_pr work start command with branch/worktree creation and validation." }
  - { author: "CODER", body: "verified: bun run ci completed (format, typecheck, lint, coverage) for AP-020 work start." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:12.942Z"
doc_updated_by: "agentplane"
description: "Implement branch_pr work start to create task branches and worktrees."
---
## Summary

Added branch_pr work start command that creates task branches and worktrees, with git env sanitization for hook safety.

## Scope

CLI parsing for work start; git worktree creation; help/docs updates; tests for work start/guard edge cases; .gitignore worktrees path.

## Risks

Work start depends on git worktree behavior and requires base branch; misconfigured worktrees_dir could block creation.

## Verify Steps

bun run ci

## Rollback Plan

Revert commit 3a188d1a8960.
