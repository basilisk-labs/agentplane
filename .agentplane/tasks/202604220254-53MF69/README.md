---
id: "202604220254-53MF69"
title: "Remove broad PR action barrel imports from CLI loaders"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220254-7TACEE"
tags:
  - "cli"
  - "perf"
  - "pr"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:55.330Z"
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
doc_updated_at: "2026-04-22T02:54:41.089Z"
doc_updated_by: "PLANNER"
description: "Ensure PR command group specs/loaders do not import the full PR action barrel during catalog construction."
sections:
  Summary: "Narrow PR CLI imports so command discovery does not eagerly load all PR action implementations."
  Scope: "PR command catalog/loaders and direct tests. No PR workflow semantics change."
  Plan: |-
    1. Identify PR command imports that flow through action barrels.
    2. Replace them with per-action spec/handler imports.
    3. Add or adjust assertions that command registration remains unchanged.
    4. Confirm cold-path import footprint improves or does not regress.
  Verify Steps: "Run PR command tests, cold-path check, arch checks, fast CI."
  Verification: "Pending implementation."
  Rollback Plan: "Revert PR loader import changes to the previous barrel-based wiring."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Narrow PR CLI imports so command discovery does not eagerly load all PR action implementations.

## Scope

PR command catalog/loaders and direct tests. No PR workflow semantics change.

## Plan

1. Identify PR command imports that flow through action barrels.
2. Replace them with per-action spec/handler imports.
3. Add or adjust assertions that command registration remains unchanged.
4. Confirm cold-path import footprint improves or does not regress.

## Verify Steps

Run PR command tests, cold-path check, arch checks, fast CI.

## Verification

Pending implementation.

## Rollback Plan

Revert PR loader import changes to the previous barrel-based wiring.

## Findings

None yet.
