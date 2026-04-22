---
id: "202604220257-AMWKB1"
title: "Extract PR sync ports to break PR artifact cycles"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202604220256-964PZX"
tags:
  - "architecture"
  - "deps"
  - "pr"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:11.378Z"
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
doc_updated_at: "2026-04-22T02:57:28.713Z"
doc_updated_by: "PLANNER"
description: "Break known dependency cycles across post-commit PR artifacts and PR sync internals by separating ports from implementations."
sections:
  Summary: "Remove PR sync related no-circular violations using dependency inversion."
  Scope: "PR sync internals, post-commit artifact helpers, and tests. Preserve PR artifact behavior."
  Plan: |-
    1. Inspect known PR sync cycles.
    2. Extract shared contracts into a neutral module.
    3. Rewire sync implementations and artifact helpers to avoid mutual imports.
    4. Update dep-cruiser baseline.
  Verify Steps: "Run arch checks, PR command tests, fast CI."
  Verification: "Pending implementation."
  Rollback Plan: "Restore previous PR sync imports and baseline."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Remove PR sync related no-circular violations using dependency inversion.

## Scope

PR sync internals, post-commit artifact helpers, and tests. Preserve PR artifact behavior.

## Plan

1. Inspect known PR sync cycles.
2. Extract shared contracts into a neutral module.
3. Rewire sync implementations and artifact helpers to avoid mutual imports.
4. Update dep-cruiser baseline.

## Verify Steps

Run arch checks, PR command tests, fast CI.

## Verification

Pending implementation.

## Rollback Plan

Restore previous PR sync imports and baseline.

## Findings

None yet.
