---
id: "202604200931-4K75DY"
title: "Introduce generated artifact check helper"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "scripts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T09:32:09.864Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T09:34:57.406Z"
  updated_by: "CODER"
  note: "Command: bun run docs:recipes:check -> pass. Command: bun run docs:cli:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Add a shared generated-artifact check helper and migrate the shortest freshness checks first."
events:
  -
    type: "status"
    at: "2026-04-20T09:32:11.402Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add a shared generated-artifact check helper and migrate the shortest freshness checks first."
  -
    type: "verify"
    at: "2026-04-20T09:34:57.406Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run docs:recipes:check -> pass. Command: bun run docs:cli:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass."
doc_version: 3
doc_updated_at: "2026-04-20T09:34:57.416Z"
doc_updated_by: "CODER"
description: "Start Epic F-prime script-runtime DSL by adding a shared generated-artifact check helper and migrating short freshness check scripts away from repeated main/catch boilerplate."
sections:
  Summary: |-
    Introduce generated artifact check helper
    
    Start Epic F-prime script-runtime DSL by adding a shared generated-artifact check helper and migrating short freshness check scripts away from repeated main/catch boilerplate.
  Scope: |-
    - In scope: Start Epic F-prime script-runtime DSL by adding a shared generated-artifact check helper and migrating short freshness check scripts away from repeated main/catch boilerplate.
    - Out of scope: unrelated refactors not required for "Introduce generated artifact check helper".
  Plan: |-
    1. Extend scripts/lib/generated-artifacts.mjs with a defineGeneratedArtifactCheck helper that wraps checkGeneratedArtifactFresh and shared error reporting.
    2. Migrate check-recipes-inventory-fresh.mjs and check-cli-reference-fresh.mjs to the helper without changing output or failure semantics.
    3. Run the migrated check scripts plus typecheck/lint/format/bootstrap where relevant, record evidence, commit, and finish.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T09:34:57.406Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run docs:recipes:check -> pass. Command: bun run docs:cli:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:32:11.431Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce generated artifact check helper

Start Epic F-prime script-runtime DSL by adding a shared generated-artifact check helper and migrating short freshness check scripts away from repeated main/catch boilerplate.

## Scope

- In scope: Start Epic F-prime script-runtime DSL by adding a shared generated-artifact check helper and migrating short freshness check scripts away from repeated main/catch boilerplate.
- Out of scope: unrelated refactors not required for "Introduce generated artifact check helper".

## Plan

1. Extend scripts/lib/generated-artifacts.mjs with a defineGeneratedArtifactCheck helper that wraps checkGeneratedArtifactFresh and shared error reporting.
2. Migrate check-recipes-inventory-fresh.mjs and check-cli-reference-fresh.mjs to the helper without changing output or failure semantics.
3. Run the migrated check scripts plus typecheck/lint/format/bootstrap where relevant, record evidence, commit, and finish.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T09:34:57.406Z — VERIFY — ok

By: CODER

Note: Command: bun run docs:recipes:check -> pass. Command: bun run docs:cli:check -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:32:11.431Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
