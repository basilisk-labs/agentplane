---
id: "202604171154-4M51J8"
title: "Fix overlay when matching semantics"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "workflow"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T12:23:30.298Z"
  updated_by: "CODER"
  note: "Verified conjunctive overlay when matching and command-aware runner prompt filtering."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make overlay when matching conjunctive and carry command context into overlay resolution."
events:
  -
    type: "status"
    at: "2026-04-17T12:15:12.875Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make overlay when matching conjunctive and carry command context into overlay resolution."
  -
    type: "verify"
    at: "2026-04-17T12:23:30.298Z"
    author: "CODER"
    state: "ok"
    note: "Verified conjunctive overlay when matching and command-aware runner prompt filtering."
doc_version: 3
doc_updated_at: "2026-04-17T12:23:30.303Z"
doc_updated_by: "CODER"
description: "Make overlay when matching conjunctive, propagate command context into runtime matching, and either fully support or remove dead command matching fields."
sections:
  Summary: |-
    Fix overlay when matching semantics
    
    Make overlay when matching conjunctive, propagate command context into runtime matching, and either fully support or remove dead command matching fields.
  Scope: |-
    - In scope: Make overlay when matching conjunctive, propagate command context into runtime matching, and either fully support or remove dead command matching fields.
    - Out of scope: unrelated refactors not required for "Fix overlay when matching semantics".
  Plan: |-
    1. Reproduce the current overlay when-matching behavior and identify where command context is dropped.
    2. Rewrite overlay matching to require all specified when conditions to hold instead of short-circuiting at the first field.
    3. Pass command context through the runner overlay prompt assembly, or remove dead schema fields if they are truly unsupported.
    4. Add focused tests for combined task_kinds, repo_types, tags_any, and commands matching.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T12:23:30.298Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified conjunctive overlay when matching and command-aware runner prompt filtering.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:15:12.883Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Overlay fragments with combined when predicates now require every configured predicate, and runner prompt assembly forwards command context.
      Impact: Recipes no longer activate mismatched overlays when multiple selectors are configured; command-scoped overlays now work for task and scenario execution paths.
      Resolution: Replaced else-if matching with conjunctive checks, added command propagation from runner target, and covered both layers with focused tests.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Fix overlay when matching semantics

Make overlay when matching conjunctive, propagate command context into runtime matching, and either fully support or remove dead command matching fields.

## Scope

- In scope: Make overlay when matching conjunctive, propagate command context into runtime matching, and either fully support or remove dead command matching fields.
- Out of scope: unrelated refactors not required for "Fix overlay when matching semantics".

## Plan

1. Reproduce the current overlay when-matching behavior and identify where command context is dropped.
2. Rewrite overlay matching to require all specified when conditions to hold instead of short-circuiting at the first field.
3. Pass command context through the runner overlay prompt assembly, or remove dead schema fields if they are truly unsupported.
4. Add focused tests for combined task_kinds, repo_types, tags_any, and commands matching.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T12:23:30.298Z — VERIFY — ok

By: CODER

Note: Verified conjunctive overlay when matching and command-aware runner prompt filtering.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:15:12.883Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Overlay fragments with combined when predicates now require every configured predicate, and runner prompt assembly forwards command context.
  Impact: Recipes no longer activate mismatched overlays when multiple selectors are configured; command-scoped overlays now work for task and scenario execution paths.
  Resolution: Replaced else-if matching with conjunctive checks, added command propagation from runner target, and covered both layers with focused tests.
  Promotion: incident-candidate
  Fixability: external
