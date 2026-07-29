---
id: "202607292104-W03KZ0"
title: "Measure SHA-bound RF-04 candidate performance"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "benchmark"
  - "milestone-beta1"
  - "performance"
  - "quality"
  - "rf-04"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T21:05:22.597Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-29T21:31:37.014Z"
  updated_by: "TESTER"
  note: "Focused RF-04 candidate tests, generated scripts catalog, and ci:contract pass. Beta.1 candidate qualification remains incomplete: the authorized capture preflight stopped before provider execution because the installed Codex CLI is 0.146.0-alpha.3.1 but the RF-04 driver pins 0.145.0-alpha.18. No automatic retry occurred; 50-run / 55-episode actual values and evaluator materialization remain absent."
  attempts: 1
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: ac7bd6a2a0febfd5ee927eb217c8d8f66bde5384. Focused candidate comparator test and scripts catalog check pass. The authorized capture preflight for 64fd6cd8a2cff4da0cbff5a8db44ef2a7992d097 stopped before any provider episode because the installed Codex CLI reports 0.146.0-alpha.3.1 while the RF-04 driver pins 0.145.0-alpha.18; failed-capture receipt is retained under the ignored candidate cache. No retry was performed."
events:
  -
    type: "status"
    at: "2026-07-29T21:06:49.461Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-29T21:28:54.763Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: ac7bd6a2a0febfd5ee927eb217c8d8f66bde5384. Focused candidate comparator test and scripts catalog check pass. The authorized capture preflight for 64fd6cd8a2cff4da0cbff5a8db44ef2a7992d097 stopped before any provider episode because the installed Codex CLI reports 0.146.0-alpha.3.1 while the RF-04 driver pins 0.145.0-alpha.18; failed-capture receipt is retained under the ignored candidate cache. No retry was performed."
  -
    type: "verify"
    at: "2026-07-29T21:31:37.014Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Focused RF-04 candidate tests, generated scripts catalog, and ci:contract pass. Beta.1 candidate qualification remains incomplete: the authorized capture preflight stopped before provider execution because the installed Codex CLI is 0.146.0-alpha.3.1 but the RF-04 driver pins 0.145.0-alpha.18. No automatic retry occurred; 50-run / 55-episode actual values and evaluator materialization remain absent."
doc_version: 3
doc_updated_at: "2026-07-29T21:31:37.937Z"
doc_updated_by: "CODER"
description: "Implement a candidate-SHA RF-04 measurement route that records actual token, latency, success, rework, and safety values for the reviewed beta.1 product SHA, compares them with the frozen baseline using declared thresholds, and emits evaluator-reviewable evidence. Keep publication blocked; do not weaken beta.1 acceptance criteria."
sections:
  Summary: |-
    Measure SHA-bound RF-04 candidate performance

    Implement a candidate-SHA RF-04 measurement route that records actual token, latency, success, rework, and safety values for the reviewed beta.1 product SHA, compares them with the frozen baseline using declared thresholds, and emits evaluator-reviewable evidence. Keep publication blocked; do not weaken beta.1 acceptance criteria.
  Scope: |-
    - In scope: Implement a candidate-SHA RF-04 measurement route that records actual token, latency, success, rework, and safety values for the reviewed beta.1 product SHA, compares them with the frozen baseline using declared thresholds, and emits evaluator-reviewable evidence. Keep publication blocked; do not weaken beta.1 acceptance criteria.
    - Out of scope: unrelated refactors not required for "Measure SHA-bound RF-04 candidate performance".
  Plan: "1. Inspect the historical RF-04 capture, the frozen baseline artifacts, and the beta.1 evaluator finding RCI-002; preserve the historical anchor as baseline-only. 2. Implement a candidate capture contract that binds every recorded run to an explicit reviewed product SHA and rejects a baseline-only capture as candidate evidence. 3. Capture actual per-run token, latency, success, rework, and safety values for the ten scenarios/fifty runs (and their provider episodes), then compare them with frozen baseline values through declared regression thresholds; timing cannot be silently disabled. 4. Emit bounded frozen evidence that an EVALUATOR can consume, including run records, summaries, comparison values/deltas/thresholds, the reviewed SHA, and the verdict. 5. Add focused deterministic tests for SHA binding, threshold failure, count-only rejection, and evidence materialization; run the provider capture only after the deterministic route passes. 6. Keep beta.1 publication blocked until the candidate comparison and a fresh semantic qualification are both complete."
  Verify Steps: |-
    1. Add focused tests for the RF-04 candidate capture and comparator. Expected: an explicit candidate SHA is required; a historical baseline anchor cannot be relabelled as candidate data; each run record binds to the reviewed product SHA; and a count-only or timing-disabled comparison fails qualification.
    2. Run the focused benchmark tests. Expected: declared thresholds are applied to actual baseline/candidate token, latency, success, rework, and safety values, including a regression verdict when any required metric is missing or worse than threshold.
    3. Run the deterministic candidate-capture fixture. Expected: it materializes ten scenarios, fifty runs, all provider-episode records, an immutable metric table, deltas, thresholds, and a reviewed-SHA binding without a live provider call.
    4. Run the authorized live candidate capture against the reviewed beta.1 SHA. Expected: fifty runs and fifty-five provider episodes complete once, with raw records and comparison verdict frozen under the approved evidence boundary; no retry is performed for a failed provider episode unless separately recorded as an incident.
    5. Run bun run ci:contract. Expected: the full repository contract passes.
    6. Run the beta.1 qualification evidence materializer and inspect its evaluator-facing packet. Expected: it cites the new candidate metrics, no longer accepts counts as values, and rejects a disabled timing comparison.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-29T21:31:37.014Z — VERIFY — needs_rework

    By: TESTER

    Note: Focused RF-04 candidate tests, generated scripts catalog, and ci:contract pass. Beta.1 candidate qualification remains incomplete: the authorized capture preflight stopped before provider execution because the installed Codex CLI is 0.146.0-alpha.3.1 but the RF-04 driver pins 0.145.0-alpha.18. No automatic retry occurred; 50-run / 55-episode actual values and evaluator materialization remain absent.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T21:28:54.763Z, excerpt_hash=sha256:be54a38d8d104dd6876e36618abd1bd557f312d6115402cc694e1efb0b1468f1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-benchmark-base-20260729/.agentplane/worktrees/202607292104-W03KZ0-measure-sha-bound-rf-04-candidate-performance/.agentplane/tasks/202607292104-W03KZ0/blueprint/resolved-snapshot.json
    - old_digest: a5d6ec4f4c5e9467b92a41ad7af7874f6496fa89756bbd7001681467813f18fc
    - current_digest: a5d6ec4f4c5e9467b92a41ad7af7874f6496fa89756bbd7001681467813f18fc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607292104-W03KZ0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607292104-W03KZ0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Candidate capture aborted at direct/run-01 before a provider episode with the deterministic RF04_DRIVER_ERROR:CODEX_VERSION_MISMATCH precondition.
      Impact: The beta.1 gate cannot truthfully compare SHA-bound token, latency, success, rework, and safety metrics; counts alone remain insufficient.
      Resolution: Run the existing capture only in the pinned provider CLI environment, then materialize the resulting candidate measurement and re-verify.
      Promotion: incident-candidate
      Fixability: external
extensions:
  workflow_route_baseline:
    start_head_sha: "8ae0a51a8684db03a0a9401f6c6b8f5b763850bd"
    version: 1
id_source: "generated"
---
## Summary

Measure SHA-bound RF-04 candidate performance

Implement a candidate-SHA RF-04 measurement route that records actual token, latency, success, rework, and safety values for the reviewed beta.1 product SHA, compares them with the frozen baseline using declared thresholds, and emits evaluator-reviewable evidence. Keep publication blocked; do not weaken beta.1 acceptance criteria.

## Scope

- In scope: Implement a candidate-SHA RF-04 measurement route that records actual token, latency, success, rework, and safety values for the reviewed beta.1 product SHA, compares them with the frozen baseline using declared thresholds, and emits evaluator-reviewable evidence. Keep publication blocked; do not weaken beta.1 acceptance criteria.
- Out of scope: unrelated refactors not required for "Measure SHA-bound RF-04 candidate performance".

## Plan

1. Inspect the historical RF-04 capture, the frozen baseline artifacts, and the beta.1 evaluator finding RCI-002; preserve the historical anchor as baseline-only. 2. Implement a candidate capture contract that binds every recorded run to an explicit reviewed product SHA and rejects a baseline-only capture as candidate evidence. 3. Capture actual per-run token, latency, success, rework, and safety values for the ten scenarios/fifty runs (and their provider episodes), then compare them with frozen baseline values through declared regression thresholds; timing cannot be silently disabled. 4. Emit bounded frozen evidence that an EVALUATOR can consume, including run records, summaries, comparison values/deltas/thresholds, the reviewed SHA, and the verdict. 5. Add focused deterministic tests for SHA binding, threshold failure, count-only rejection, and evidence materialization; run the provider capture only after the deterministic route passes. 6. Keep beta.1 publication blocked until the candidate comparison and a fresh semantic qualification are both complete.

## Verify Steps

1. Add focused tests for the RF-04 candidate capture and comparator. Expected: an explicit candidate SHA is required; a historical baseline anchor cannot be relabelled as candidate data; each run record binds to the reviewed product SHA; and a count-only or timing-disabled comparison fails qualification.
2. Run the focused benchmark tests. Expected: declared thresholds are applied to actual baseline/candidate token, latency, success, rework, and safety values, including a regression verdict when any required metric is missing or worse than threshold.
3. Run the deterministic candidate-capture fixture. Expected: it materializes ten scenarios, fifty runs, all provider-episode records, an immutable metric table, deltas, thresholds, and a reviewed-SHA binding without a live provider call.
4. Run the authorized live candidate capture against the reviewed beta.1 SHA. Expected: fifty runs and fifty-five provider episodes complete once, with raw records and comparison verdict frozen under the approved evidence boundary; no retry is performed for a failed provider episode unless separately recorded as an incident.
5. Run bun run ci:contract. Expected: the full repository contract passes.
6. Run the beta.1 qualification evidence materializer and inspect its evaluator-facing packet. Expected: it cites the new candidate metrics, no longer accepts counts as values, and rejects a disabled timing comparison.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-29T21:31:37.014Z — VERIFY — needs_rework

By: TESTER

Note: Focused RF-04 candidate tests, generated scripts catalog, and ci:contract pass. Beta.1 candidate qualification remains incomplete: the authorized capture preflight stopped before provider execution because the installed Codex CLI is 0.146.0-alpha.3.1 but the RF-04 driver pins 0.145.0-alpha.18. No automatic retry occurred; 50-run / 55-episode actual values and evaluator materialization remain absent.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T21:28:54.763Z, excerpt_hash=sha256:be54a38d8d104dd6876e36618abd1bd557f312d6115402cc694e1efb0b1468f1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-benchmark-base-20260729/.agentplane/worktrees/202607292104-W03KZ0-measure-sha-bound-rf-04-candidate-performance/.agentplane/tasks/202607292104-W03KZ0/blueprint/resolved-snapshot.json
- old_digest: a5d6ec4f4c5e9467b92a41ad7af7874f6496fa89756bbd7001681467813f18fc
- current_digest: a5d6ec4f4c5e9467b92a41ad7af7874f6496fa89756bbd7001681467813f18fc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607292104-W03KZ0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607292104-W03KZ0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Candidate capture aborted at direct/run-01 before a provider episode with the deterministic RF04_DRIVER_ERROR:CODEX_VERSION_MISMATCH precondition.
  Impact: The beta.1 gate cannot truthfully compare SHA-bound token, latency, success, rework, and safety metrics; counts alone remain insufficient.
  Resolution: Run the existing capture only in the pinned provider CLI environment, then materialize the resulting candidate measurement and re-verify.
  Promotion: incident-candidate
  Fixability: external
