---
id: "202604220254-Q6YYWM"
title: "Extract pure CLI command specs for lazy loaders"
result_summary: "Pure command specs extracted for heavy CLI catalog imports."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  state: "ok"
  updated_at: "2026-04-22T03:25:37.737Z"
  updated_by: "CODER"
  note: "Command spec extraction verified: focused command catalog/runtime tests passed; cold-start baseline passed after rerun; arch, knip, diff check, typecheck, lint, and full fast CI passed."
commit:
  hash: "f6038a868763a83a1512484c70e305d9bf6bb5e8"
  message: "♻️ Q6YYWM cli: extract pure command specs"
comments:
  -
    author: "CODER"
    body: "Start: Implement pure CLI command spec extraction for heavy command loaders, preserving command behavior and verifying catalog/runtime checks before closure."
  -
    author: "CODER"
    body: "Verified: Extracted pure command spec modules for heavy CLI catalog imports; focused tests, typecheck, arch checks, knip, cold-start check, and full fast CI passed."
events:
  -
    type: "status"
    at: "2026-04-22T03:02:31.809Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement pure CLI command spec extraction for heavy command loaders, preserving command behavior and verifying catalog/runtime checks before closure."
  -
    type: "verify"
    at: "2026-04-22T03:25:37.737Z"
    author: "CODER"
    state: "ok"
    note: "Command spec extraction verified: focused command catalog/runtime tests passed; cold-start baseline passed after rerun; arch, knip, diff check, typecheck, lint, and full fast CI passed."
  -
    type: "status"
    at: "2026-04-22T03:26:08.167Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Extracted pure command spec modules for heavy CLI catalog imports; focused tests, typecheck, arch checks, knip, cold-start check, and full fast CI passed."
doc_version: 3
doc_updated_at: "2026-04-22T03:26:08.168Z"
doc_updated_by: "CODER"
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
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T03:25:37.737Z — VERIFY — ok
    
    By: CODER
    
    Note: Command spec extraction verified: focused command catalog/runtime tests passed; cold-start baseline passed after rerun; arch, knip, diff check, typecheck, lint, and full fast CI passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T03:02:31.855Z, excerpt_hash=sha256:e8ed631d5d47a3ee1573c190e6f4767878e20df9e06ec3b1577ff5b392e0a6d5
    
    <!-- END VERIFICATION RESULTS -->
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

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T03:25:37.737Z — VERIFY — ok

By: CODER

Note: Command spec extraction verified: focused command catalog/runtime tests passed; cold-start baseline passed after rerun; arch, knip, diff check, typecheck, lint, and full fast CI passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T03:02:31.855Z, excerpt_hash=sha256:e8ed631d5d47a3ee1573c190e6f4767878e20df9e06ec3b1577ff5b392e0a6d5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert spec extraction and restore prior command-catalog imports; no data migration is involved.

## Findings

None yet.
