---
id: "202608021231-BPMM04"
title: "Record token usage on every completed task"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "tokens"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
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
  attempts: 0
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-08-02T12:31:32.269Z"
doc_updated_by: "CODER"
description: "Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage."
sections:
  Summary: |-
    Record token usage on every completed task

    Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage.
  Scope: |-
    - In scope: Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage.
    - Out of scope: unrelated refactors not required for "Record token usage on every completed task".
  Plan: |-
    1. Implement the change for "Record token usage on every completed task".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Record token usage on every completed task". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Record token usage on every completed task". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Record token usage on every completed task

Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage.

## Scope

- In scope: Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage.
- Out of scope: unrelated refactors not required for "Record token usage on every completed task".

## Plan

1. Implement the change for "Record token usage on every completed task".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Record token usage on every completed task". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Record token usage on every completed task". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
