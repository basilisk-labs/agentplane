---
id: "202603301856-PAQKK5"
title: "Add a lightweight CLI cold-path benchmark harness"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "tests"
  - "benchmark"
  - "cli"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
doc_updated_at: "2026-03-30T18:56:56.099Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 0 / R0.4 from REFACTOR.md. the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`."
sections:
  Summary: |-
    Add a lightweight CLI cold-path benchmark harness
    
    Implement Epic 0 / R0.4 from REFACTOR.md. the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
  Scope: |-
    - In scope: Implement Epic 0 / R0.4 from REFACTOR.md. the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
    - Out of scope: unrelated refactors not required for "Add a lightweight CLI cold-path benchmark harness".
  Plan: |-
    1. Audit the current implementation and tests around `scripts/`, `package.json`, or existing benchmark/test harness locations to isolate the exact behavior gap for R0.4.
    2. Implement the smallest change set that satisfies the REFACTOR contract: the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `scripts/`, `package.json`, or existing benchmark/test harness locations. Expected: the behavior described by R0.4 is observable and stable.
    2. Inspect the final diff for 202603301856-PAQKK5. Expected: scope stays limited to `scripts/`, `package.json`, or existing benchmark/test harness locations plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add a lightweight CLI cold-path benchmark harness

Implement Epic 0 / R0.4 from REFACTOR.md. the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.

## Scope

- In scope: Implement Epic 0 / R0.4 from REFACTOR.md. the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
- Out of scope: unrelated refactors not required for "Add a lightweight CLI cold-path benchmark harness".

## Plan

1. Audit the current implementation and tests around `scripts/`, `package.json`, or existing benchmark/test harness locations to isolate the exact behavior gap for R0.4.
2. Implement the smallest change set that satisfies the REFACTOR contract: the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `scripts/`, `package.json`, or existing benchmark/test harness locations. Expected: the behavior described by R0.4 is observable and stable.
2. Inspect the final diff for 202603301856-PAQKK5. Expected: scope stays limited to `scripts/`, `package.json`, or existing benchmark/test harness locations plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: the repository has one repeatable command or script that measures at least `quickstart`, `task list`, and `preflight --mode quick`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
