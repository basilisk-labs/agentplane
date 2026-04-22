---
id: "202604220254-7TACEE"
title: "Replace recipes facade imports with direct command imports"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220254-Q6YYWM"
tags:
  - "cli"
  - "perf"
  - "recipes"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:53.945Z"
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
doc_updated_at: "2026-04-22T02:54:34.891Z"
doc_updated_by: "PLANNER"
description: "Stop recipe command entrypoints from importing the broad recipes facade and route each CLI command to its minimal implementation module."
sections:
  Summary: "Reduce cold-path import weight by removing broad imports through packages/agentplane/src/commands/recipes.ts for per-command recipe handlers."
  Scope: "Recipe CLI command entrypoints and related tests only. Preserve public recipe CLI behavior."
  Plan: |-
    1. Map each recipe command to its minimal implementation module.
    2. Replace facade imports in list/add/remove/apply style commands.
    3. Keep any public facade only for compatibility if still referenced externally.
    4. Verify command snapshots and recipe command tests.
  Verify Steps: "Run recipe command tests, CLI fast tests, cold-path check, and arch checks."
  Verification: "Pending implementation."
  Rollback Plan: "Restore imports from the recipes facade and remove direct import rewiring."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Reduce cold-path import weight by removing broad imports through packages/agentplane/src/commands/recipes.ts for per-command recipe handlers.

## Scope

Recipe CLI command entrypoints and related tests only. Preserve public recipe CLI behavior.

## Plan

1. Map each recipe command to its minimal implementation module.
2. Replace facade imports in list/add/remove/apply style commands.
3. Keep any public facade only for compatibility if still referenced externally.
4. Verify command snapshots and recipe command tests.

## Verify Steps

Run recipe command tests, CLI fast tests, cold-path check, and arch checks.

## Verification

Pending implementation.

## Rollback Plan

Restore imports from the recipes facade and remove direct import rewiring.

## Findings

None yet.
