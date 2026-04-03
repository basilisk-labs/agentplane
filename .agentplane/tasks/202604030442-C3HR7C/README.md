---
id: "202604030442-C3HR7C"
title: "F-005 Expand policy taxonomy"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604030442-Y53F5X"
tags:
  - "code"
  - "framework"
  - "policy"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:03.109Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "ok"
  updated_at: "2026-04-03T10:42:51.736Z"
  updated_by: "CODER"
  note: "Implemented a unified policy taxonomy and classifier across the framework policy engine, approval gateway, task mutation hooks, and runner entrypoints; verified with typecheck plus targeted policy/task/runner/backend/recipes/upgrade/release test suites."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: expand the framework policy taxonomy so risky and mutating actions resolve through one classified policy model across task, runner, recipes, network, fs, git, and config surfaces."
events:
  -
    type: "status"
    at: "2026-04-03T10:27:27.818Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: expand the framework policy taxonomy so risky and mutating actions resolve through one classified policy model across task, runner, recipes, network, fs, git, and config surfaces."
  -
    type: "verify"
    at: "2026-04-03T10:42:51.736Z"
    author: "CODER"
    state: "ok"
    note: "Implemented a unified policy taxonomy and classifier across the framework policy engine, approval gateway, task mutation hooks, and runner entrypoints; verified with typecheck plus targeted policy/task/runner/backend/recipes/upgrade/release test suites."
doc_version: 3
doc_updated_at: "2026-04-03T10:42:51.743Z"
doc_updated_by: "CODER"
description: "Broaden policy action taxonomy so risky and mutating framework actions are classified centrally."
sections:
  Summary: |-
    F-005 Expand policy taxonomy
    
    Broaden policy action taxonomy so risky and mutating framework actions are classified centrally.
  Scope: |-
    - In scope: Broaden policy action taxonomy so risky and mutating framework actions are classified centrally.
    - Out of scope: unrelated refactors not required for "F-005 Expand policy taxonomy".
  Plan: |-
    1. Extend policy action taxonomy beyond the current commit-hook surface.
    2. Route task, runner, recipe, and framework mutation classes through the shared policy engine.
    3. Add coverage for the new classifications and deny/warn semantics.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T10:42:51.736Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented a unified policy taxonomy and classifier across the framework policy engine, approval gateway, task mutation hooks, and runner entrypoints; verified with typecheck plus targeted policy/task/runner/backend/recipes/upgrade/release test suites.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T10:27:27.828Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

F-005 Expand policy taxonomy

Broaden policy action taxonomy so risky and mutating framework actions are classified centrally.

## Scope

- In scope: Broaden policy action taxonomy so risky and mutating framework actions are classified centrally.
- Out of scope: unrelated refactors not required for "F-005 Expand policy taxonomy".

## Plan

1. Extend policy action taxonomy beyond the current commit-hook surface.
2. Route task, runner, recipe, and framework mutation classes through the shared policy engine.
3. Add coverage for the new classifications and deny/warn semantics.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T10:42:51.736Z — VERIFY — ok

By: CODER

Note: Implemented a unified policy taxonomy and classifier across the framework policy engine, approval gateway, task mutation hooks, and runner entrypoints; verified with typecheck plus targeted policy/task/runner/backend/recipes/upgrade/release test suites.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T10:27:27.828Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
