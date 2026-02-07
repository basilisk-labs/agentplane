---
id: "202602060332-B46WJ2"
title: "AP-BR-04 Direct mode work start alignment"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "workflow"
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
    body: "Verified: bun run test:core; bun run test:cli:core; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build.\\nSummary: Implemented base-branch cleanup (remove base_branch, new base resolution/clear/explain), direct work start without worktree, task exports only via task export, docs/tests updates.\\nCommit: 01fb738a7780db1f8f3c140d0bc6de6455909a7d."
  -
    author: "CODER"
    body: "Commit update: 7a1d5d3d1ada80c2c1c1b136238e17e2d0bf60ea (main changes), 938f94545ae17e44868559cd779fa1a18d5a9b31 (task finish/export snapshots)."
doc_version: 2
doc_updated_at: "2026-02-06T04:23:17.545Z"
doc_updated_by: "CODER"
description: "Implement work start in direct mode (create task branch from HEAD, optional worktree, minimal scaffold) and align docs. Includes tests and docs updates."
id_source: "generated"
---
## Summary

Enabled work start in direct mode (optional worktree) and aligned CLI parsing/tests/docs.

## Scope

Work start command behavior, CLI flag validation, tests, and workflow documentation.

## Risks

Direct-mode work start now switches/creates branches; users must be ready for checkout changes.

## Verify Steps

bun run test:core; bun run test:cli:core.

## Verification

bun run test:core; bun run test:cli:core.

## Rollback Plan

Revert work start direct-mode changes and restore strict branch_pr-only behavior.

## Plan
