---
id: "202608040215-0Z0C92"
title: "Add exact candidate RF-04 pilot mode"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "provider-qualification"
  - "v0.7.1"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T02:15:53.533Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-04T02:16:21.609Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-04T02:16:21.609Z"
doc_updated_by: "CODER"
description: "Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published."
sections:
  Summary: |-
    Add exact candidate RF-04 pilot mode

    Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published.
  Scope: |-
    - In scope: Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published.
    - Out of scope: unrelated refactors not required for "Add exact candidate RF-04 pilot mode".
  Plan: |-
    1. Extend the v0.7.1 candidate capture CLI with an explicit --pilot mode that selects only direct/run-01, validates the exact candidate subject and pinned Codex version, and never publishes candidate cache artifacts.
    2. Reuse the existing candidate driver, environment, envelope, and evidence validators so the pilot exercises the same runtime boundary as the 50-run gate.
    3. Add focused tests for one-run selection, success telemetry, cleanup after failure, refusal to combine pilot with check/runtime-bridge/replace, and unchanged full-capture behavior.
    4. Run focused RF-04 hardening tests, qualification contract, formatting, lint, typecheck, and critical CLI checks; preserve the failed historical-pilot diagnosis in task Findings.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "3055393dc99d5f1a781cb642502ceaa05d86f0a9"
    version: 1
id_source: "generated"
---
## Summary

Add exact candidate RF-04 pilot mode

Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published.

## Scope

- In scope: Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published.
- Out of scope: unrelated refactors not required for "Add exact candidate RF-04 pilot mode".

## Plan

1. Extend the v0.7.1 candidate capture CLI with an explicit --pilot mode that selects only direct/run-01, validates the exact candidate subject and pinned Codex version, and never publishes candidate cache artifacts.
2. Reuse the existing candidate driver, environment, envelope, and evidence validators so the pilot exercises the same runtime boundary as the 50-run gate.
3. Add focused tests for one-run selection, success telemetry, cleanup after failure, refusal to combine pilot with check/runtime-bridge/replace, and unchanged full-capture behavior.
4. Run focused RF-04 hardening tests, qualification contract, formatting, lint, typecheck, and critical CLI checks; preserve the failed historical-pilot diagnosis in task Findings.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
