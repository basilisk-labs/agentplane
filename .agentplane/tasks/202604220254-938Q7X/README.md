---
id: "202604220254-938Q7X"
title: "Centralize task status normalization"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220254-GSBPC3"
tags:
  - "code"
  - "refactor"
  - "tasks"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:57.959Z"
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
doc_updated_at: "2026-04-22T02:54:59.327Z"
doc_updated_by: "PLANNER"
description: "Replace repeated status string normalization with a single typed helper used across task query, transition, and display code."
sections:
  Summary: "Remove duplicated status normalization expressions and make accepted task statuses explicit."
  Scope: "Task status helpers and callsites. No status model expansion unless tests prove existing implicit values need preservation."
  Plan: |-
    1. Inventory repeated status normalization callsites.
    2. Add or reuse a canonical status normalization helper.
    3. Replace callsites and tighten typing where local.
    4. Verify task query and lifecycle output tests.
  Verify Steps: "Run task command tests, lifecycle tests, TypeScript check through fast CI, arch checks."
  Verification: "Pending implementation."
  Rollback Plan: "Restore local normalization expressions at changed callsites."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Remove duplicated status normalization expressions and make accepted task statuses explicit.

## Scope

Task status helpers and callsites. No status model expansion unless tests prove existing implicit values need preservation.

## Plan

1. Inventory repeated status normalization callsites.
2. Add or reuse a canonical status normalization helper.
3. Replace callsites and tighten typing where local.
4. Verify task query and lifecycle output tests.

## Verify Steps

Run task command tests, lifecycle tests, TypeScript check through fast CI, arch checks.

## Verification

Pending implementation.

## Rollback Plan

Restore local normalization expressions at changed callsites.

## Findings

None yet.
