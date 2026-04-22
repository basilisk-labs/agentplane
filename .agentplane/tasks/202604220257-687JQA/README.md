---
id: "202604220257-687JQA"
title: "Split incidents shared dependencies and lower cycle baseline"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202604220257-AMWKB1"
tags:
  - "architecture"
  - "deps"
  - "incidents"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:12.246Z"
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
doc_updated_at: "2026-04-22T02:57:41.193Z"
doc_updated_by: "PLANNER"
description: "Resolve remaining no-circular violations around incidents/shared and publish a stricter dep-cruiser baseline."
sections:
  Summary: "Finish current known no-circular cleanup after task and PR cycle reductions."
  Scope: "Incidents shared modules, dep-cruiser known violations file, and affected tests. Do not change incident semantics."
  Plan: |-
    1. Inspect incidents/shared cycle path.
    2. Move neutral types/helpers into a cycle-free module.
    3. Update imports and tests.
    4. Lower known violation baseline to the remaining count or zero.
  Verify Steps: "Run arch:baseline && arch:deps, incident tests, fast CI."
  Verification: "Pending implementation."
  Rollback Plan: "Restore previous incident imports and known violations baseline."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Finish current known no-circular cleanup after task and PR cycle reductions.

## Scope

Incidents shared modules, dep-cruiser known violations file, and affected tests. Do not change incident semantics.

## Plan

1. Inspect incidents/shared cycle path.
2. Move neutral types/helpers into a cycle-free module.
3. Update imports and tests.
4. Lower known violation baseline to the remaining count or zero.

## Verify Steps

Run arch:baseline && arch:deps, incident tests, fast CI.

## Verification

Pending implementation.

## Rollback Plan

Restore previous incident imports and known violations baseline.

## Findings

None yet.
