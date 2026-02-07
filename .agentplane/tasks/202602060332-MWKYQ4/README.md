---
id: "202602060332-MWKYQ4"
title: "AP-BR-03 Branch base UX commands"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "01fb738a7780db1f8f3c140d0bc6de6455909a7d"
  message: "📝 S76RDP record task metadata"
comments:
  -
    author: "CODER"
    body: "Start: extend branch base commands (set --current, clear, explain) and update tests/docs."
  -
    author: "CODER"
    body: "Verified: bun run test:core; bun run test:cli:core; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build.\\nSummary: Implemented base-branch cleanup (remove base_branch, new base resolution/clear/explain), direct work start without worktree, task exports only via task export, docs/tests updates.\\nCommit: 01fb738a7780db1f8f3c140d0bc6de6455909a7d."
  -
    author: "CODER"
    body: "Commit update: 7a1d5d3d1ada80c2c1c1b136238e17e2d0bf60ea (main changes), 938f94545ae17e44868559cd779fa1a18d5a9b31 (task finish/export snapshots)."
doc_version: 2
doc_updated_at: "2026-02-06T04:23:17.428Z"
doc_updated_by: "CODER"
description: "Add branch base set --current, branch base clear, and branch base explain output; include tests and docs."
id_source: "generated"
---
## Summary

Extended branch base commands with set --current, clear, and explain, plus updated CLI parsing/tests.

## Scope

Branch base command handlers, git config helpers, CLI parsing, and tests.

## Risks

Users relying on previous branch base usage strings may see different output/usage guidance.

## Verify Steps

bun run test:core; bun run test:cli:core.

## Verification

bun run test:core; bun run test:cli:core.

## Rollback Plan

Revert branch base command additions and restore prior CLI parsing/tests.

## Plan
