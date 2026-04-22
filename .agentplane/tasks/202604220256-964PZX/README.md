---
id: "202604220256-964PZX"
title: "Extract workflow transition ports to break task shared cycles"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604220256-YQQDSQ"
tags:
  - "architecture"
  - "deps"
  - "tasks"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:10.374Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-22T02:56:22.776Z"
doc_updated_by: "PLANNER"
description: "Break dependency cycles around commands/task/shared transitions and workflow-transition-service by extracting stable types/ports."
sections:
  Summary: "Reduce known dep-cruiser cycles in task shared transition code without changing transition behavior."
  Scope: "Task shared transition modules and their imports. No lifecycle semantics change."
  Plan: |-
    1. Inspect known cycles involving task shared transition modules.
    2. Extract type-only ports or dependency-inverted interfaces.
    3. Rewire modules to depend inward on ports.
    4. Lower dep-cruiser known baseline if cycles are removed.
  Verify Steps: "Run arch:baseline && arch:deps, task lifecycle tests, fast CI."
  Verification: "Pending implementation."
  Rollback Plan: "Restore previous imports and dep-cruiser baseline."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Reduce known dep-cruiser cycles in task shared transition code without changing transition behavior.

## Scope

Task shared transition modules and their imports. No lifecycle semantics change.

## Plan

1. Inspect known cycles involving task shared transition modules.
2. Extract type-only ports or dependency-inverted interfaces.
3. Rewire modules to depend inward on ports.
4. Lower dep-cruiser known baseline if cycles are removed.

## Verify Steps

Run arch:baseline && arch:deps, task lifecycle tests, fast CI.

## Verification

Pending implementation.

## Rollback Plan

Restore previous imports and dep-cruiser baseline.

## Findings

None yet.
