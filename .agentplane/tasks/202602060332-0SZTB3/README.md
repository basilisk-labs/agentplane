---
id: "202602060332-0SZTB3"
title: "AP-BR-05 Make tasks.json export-only"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "tasks"
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
    body: "Start: enforce export-only tasks.json policy with gitignore updates and CLI behavior changes."
  -
    author: "CODER"
    body: "Verified: bun run test:core; bun run test:cli:core; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build.\\nSummary: Implemented base-branch cleanup (remove base_branch, new base resolution/clear/explain), direct work start without worktree, task exports only via task export, docs/tests updates.\\nCommit: 01fb738a7780db1f8f3c140d0bc6de6455909a7d."
  -
    author: "CODER"
    body: "Commit update: 7a1d5d3d1ada80c2c1c1b136238e17e2d0bf60ea (main changes), 938f94545ae17e44868559cd779fa1a18d5a9b31 (task finish/export snapshots)."
doc_version: 2
doc_updated_at: "2026-02-06T04:23:17.660Z"
doc_updated_by: "CODER"
description: "Add gitignore for tasks.json/cache/worktrees; make tasks.json generated only by export/flag; document hooks policy and optional tasks_path relocation if needed. Include tests and docs."
id_source: "generated"
---
## Summary

Made tasks.json export-only, removed auto-exports from status/finish, and updated gitignore/tests/docs.

## Scope

Workflow commands for status/finish, gitignore policy, CLI parsing, tests, and docs for tasks.json export.

## Risks

Teams relying on auto-updated tasks.json must run task export explicitly; documentation updated to reduce surprises.

## Verify Steps

bun run test:core; bun run test:cli:core.

## Verification

bun run test:core; bun run test:cli:core.

## Rollback Plan

Revert export-only policy changes, re-enable auto-export on status/finish, and restore prior docs/tests.

## Plan
