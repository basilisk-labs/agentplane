---
id: "202604220254-Q6YYWM"
title: "Extract pure CLI command specs for lazy loaders"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "cli"
  - "perf"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:52.502Z"
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
doc_updated_at: "2026-04-22T02:54:28.823Z"
doc_updated_by: "PLANNER"
description: "Split heavy command spec metadata from runtime command handlers so command catalog modules can be imported without loading command implementations."
sections:
  Summary: "Create pure spec modules for heavy command groups currently imported through command catalog files and keep handler loading dynamic."
  Scope: "Touch CLI command catalog/spec modules and the minimum command files needed to separate metadata from executable handlers. Do not change command behavior or user-facing output except where snapshots prove unchanged."
  Plan: |-
    1. Inventory command-catalog files that statically import heavy command modules.
    2. Add pure spec modules for the heavy commands.
    3. Update command loaders to load handlers dynamically from implementation modules.
    4. Update tests/snapshots only for intentional unchanged wiring expectations.
  Verify Steps: "Run CLI catalog/unit tests, run cold-path benchmark/check, run arch baseline/deps, run fast local CI."
  Verification: "Pending implementation."
  Rollback Plan: "Revert spec extraction and restore prior command-catalog imports; no data migration is involved."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Create pure spec modules for heavy command groups currently imported through command catalog files and keep handler loading dynamic.

## Scope

Touch CLI command catalog/spec modules and the minimum command files needed to separate metadata from executable handlers. Do not change command behavior or user-facing output except where snapshots prove unchanged.

## Plan

1. Inventory command-catalog files that statically import heavy command modules.
2. Add pure spec modules for the heavy commands.
3. Update command loaders to load handlers dynamically from implementation modules.
4. Update tests/snapshots only for intentional unchanged wiring expectations.

## Verify Steps

Run CLI catalog/unit tests, run cold-path benchmark/check, run arch baseline/deps, run fast local CI.

## Verification

Pending implementation.

## Rollback Plan

Revert spec extraction and restore prior command-catalog imports; no data migration is involved.

## Findings

None yet.
