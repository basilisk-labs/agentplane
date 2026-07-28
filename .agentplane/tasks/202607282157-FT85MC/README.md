---
id: "202607282157-FT85MC"
title: "Freeze complete branch evidence for evaluator review"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "quality"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T21:58:01.517Z"
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
    author: "ORCHESTRATOR"
    body: "Start: isolate the evaluator evidence contract so quality review always receives the complete branch change and concrete verification evidence."
events:
  -
    type: "status"
    at: "2026-07-28T21:58:01.832Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: isolate the evaluator evidence contract so quality review always receives the complete branch change and concrete verification evidence."
doc_version: 3
doc_updated_at: "2026-07-28T21:58:01.832Z"
doc_updated_by: "ORCHESTRATOR"
description: "RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior."
sections:
  Summary: |-
    Freeze complete branch evidence for evaluator review

    RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior.
  Scope: |-
    - In scope: RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior.
    - Out of scope: unrelated refactors not required for "Freeze complete branch evidence for evaluator review".
  Plan: "1. Reproduce the evaluator evidence gap using a multi-commit branch and identify the authoritative merge base for a branch_pr task. 2. Replace one-commit snapshotting with a bounded full branch patch from that merge base to the evaluated SHA, including binary/rename-safe content and a fail-closed error if base resolution is unavailable. 3. Freeze machine-readable verification records in the same work order and cover their discovery. 4. Add focused regression tests for complete multi-commit evidence, no-change handling, and base-resolution failure. 5. Run focused tests, formatting, typecheck, policy routing, and an independent evaluator review before PR integration."
  Verify Steps: |-
    1. Create a multi-commit fixture and prepare an evaluator work order. Expected: the frozen actual diff includes every change from the merge base through the evaluated SHA, and the work order records that base SHA.
    2. Prepare a no-work-unit review and a missing-base case. Expected: no-work-unit output remains explicit; unresolved base references fail closed with E_VALIDATION.
    3. Run focused evaluator tests, formatting, typecheck, policy routing, and doctor. Expected: all pass and their task verification records are frozen in the final evaluator work order.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "7f44e71fa8dbe12987744e4442ba0110dc150090"
    version: 1
id_source: "generated"
---
## Summary

Freeze complete branch evidence for evaluator review

RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior.

## Scope

- In scope: RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior.
- Out of scope: unrelated refactors not required for "Freeze complete branch evidence for evaluator review".

## Plan

1. Reproduce the evaluator evidence gap using a multi-commit branch and identify the authoritative merge base for a branch_pr task. 2. Replace one-commit snapshotting with a bounded full branch patch from that merge base to the evaluated SHA, including binary/rename-safe content and a fail-closed error if base resolution is unavailable. 3. Freeze machine-readable verification records in the same work order and cover their discovery. 4. Add focused regression tests for complete multi-commit evidence, no-change handling, and base-resolution failure. 5. Run focused tests, formatting, typecheck, policy routing, and an independent evaluator review before PR integration.

## Verify Steps

1. Create a multi-commit fixture and prepare an evaluator work order. Expected: the frozen actual diff includes every change from the merge base through the evaluated SHA, and the work order records that base SHA.
2. Prepare a no-work-unit review and a missing-base case. Expected: no-work-unit output remains explicit; unresolved base references fail closed with E_VALIDATION.
3. Run focused evaluator tests, formatting, typecheck, policy routing, and doctor. Expected: all pass and their task verification records are frozen in the final evaluator work order.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
