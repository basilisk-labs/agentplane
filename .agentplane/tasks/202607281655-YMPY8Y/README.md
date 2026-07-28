---
id: "202607281655-YMPY8Y"
title: "Authorize replacement evaluator episodes after terminal failure"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "recovery"
  - "refactor"
  - "supervisor"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T16:55:45.384Z"
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
    body: "Start: add the explicit, auditable replacement evaluator path required to continue the blocked semantic review without replaying the failed provider operation."
events:
  -
    type: "status"
    at: "2026-07-28T16:55:51.958Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add the explicit, auditable replacement evaluator path required to continue the blocked semantic review without replaying the failed provider operation."
doc_version: 3
doc_updated_at: "2026-07-28T16:55:51.958Z"
doc_updated_by: "CODER"
description: "Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review."
sections:
  Summary: |-
    Authorize replacement evaluator episodes after terminal failure

    Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.
  Scope: |-
    - In scope: Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.
    - Out of scope: unrelated refactors not required for "Authorize replacement evaluator episodes after terminal failure".
  Plan: "1. Inspect the terminal evaluator journal and existing provider boundary to define a distinct replacement operation, not a retry. 2. Add an explicit replacement-only execution path that preserves failed operation history and accumulated usage, starts a new bounded episode, and refuses effect_in_doubt or implicit replay. 3. Cover operation_failed replacement, terminal-effect rejection, default no-retry behavior, and command-level persistence. 4. Run focused supervisor/evaluator tests, typecheck, formatting, routing, and one real read-only replacement provider episode before publishing."
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
    start_head_sha: "a9b9d6a834893013c30b5046d0c618cb23553638"
    version: 1
id_source: "generated"
---
## Summary

Authorize replacement evaluator episodes after terminal failure

Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.

## Scope

- In scope: Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.
- Out of scope: unrelated refactors not required for "Authorize replacement evaluator episodes after terminal failure".

## Plan

1. Inspect the terminal evaluator journal and existing provider boundary to define a distinct replacement operation, not a retry. 2. Add an explicit replacement-only execution path that preserves failed operation history and accumulated usage, starts a new bounded episode, and refuses effect_in_doubt or implicit replay. 3. Cover operation_failed replacement, terminal-effect rejection, default no-retry behavior, and command-level persistence. 4. Run focused supervisor/evaluator tests, typecheck, formatting, routing, and one real read-only replacement provider episode before publishing.

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
