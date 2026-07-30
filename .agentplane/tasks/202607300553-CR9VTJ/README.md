---
id: "202607300553-CR9VTJ"
title: "Requalify the AgentPlane 0.7.0-beta.1 decision on current main"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202607221850-0SFMS7"
  - "202607221850-8HBF4J"
  - "202607221850-9C9WBP"
  - "202607221850-DRWR0V"
  - "202607221850-R7WS01"
  - "202607221850-WM9X1G"
  - "202607221908-9M2FBQ"
  - "202607242236-1BFWEY"
  - "202607291148-1F9GZD"
tags:
  - "milestone-0-7-0-beta-1"
  - "quality"
  - "release-gate"
  - "rf-04"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:contract"
  - "bun run test:critical"
  - "node scripts/checks/check-agent-efficiency-replay.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T05:53:32.333Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T06:02:43.118Z"
  updated_by: "TESTER"
  note: "Verified: successor gate retains beta.1 do_not_publish after deterministic current-main validation without provider access."
  attempts: 0
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: establish the current-main beta.1 no-publish decision without provider retry."
  -
    author: "CODER"
    body: "Checkpoint: rewired beta.2 to the current-main successor gate, retained the legacy gate as blocked, and completed deterministic validation without provider access."
  -
    author: "CODER"
    body: "Checkpoint: current-main successor gate now records the preserved beta.1 no-publish decision and dependency repair."
events:
  -
    type: "status"
    at: "2026-07-30T05:53:55.660Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: establish the current-main beta.1 no-publish decision without provider retry."
  -
    type: "comment"
    at: "2026-07-30T05:58:27.695Z"
    author: "CODER"
    body: "Checkpoint: rewired beta.2 to the current-main successor gate, retained the legacy gate as blocked, and completed deterministic validation without provider access."
  -
    type: "status"
    at: "2026-07-30T05:59:12.563Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Checkpoint: current-main successor gate now records the preserved beta.1 no-publish decision and dependency repair."
  -
    type: "verify"
    at: "2026-07-30T06:02:43.118Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: successor gate retains beta.1 do_not_publish after deterministic current-main validation without provider access."
doc_version: 3
doc_updated_at: "2026-07-30T06:02:44.301Z"
doc_updated_by: "CODER"
description: "Replace the stranded beta.1 gate with a current-main qualification record. Preserve the immutable failed RF-04 candidate and F8 attribution, execute deterministic checks without provider calls, record do-not-publish for beta.1, and unblock beta.2 through an explicit successor dependency."
sections:
  Summary: |-
    Requalify the AgentPlane 0.7.0-beta.1 decision on current main

    Replace the stranded beta.1 gate with a current-main qualification record. Preserve the immutable failed RF-04 candidate and F8 attribution, execute deterministic checks without provider calls, record do-not-publish for beta.1, and unblock beta.2 through an explicit successor dependency.
  Scope: |-
    - In scope: Replace the stranded beta.1 gate with a current-main qualification record. Preserve the immutable failed RF-04 candidate and F8 attribution, execute deterministic checks without provider calls, record do-not-publish for beta.1, and unblock beta.2 through an explicit successor dependency.
    - Out of scope: unrelated refactors not required for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main".
  Plan: "1. Persist the explicit replacement relation: keep the legacy beta.1 gate blocked because its stale PR cannot qualify current main, and replace only the beta.2 dependency edge with this successor. 2. On current main, validate the frozen 50-run/55-episode RF-04 evidence and the F8 timing-partition contract without invoking a provider or retrying the candidate. 3. Run the declared deterministic critical/contract checks, record any failure or flake as a blocker, and compare the retained latency failure against the unchanged quality rule. 4. Record beta.1 as do_not_publish, not as a product regression claim; publish no prerelease. 5. Close the graph-repair and quality-decision evidence through a normal PR, leaving actual beta.2 implementation work independent and ready only after this successor merges."
  Verify Steps: |-
    PLANNER fallback scaffold for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T06:02:43.118Z — VERIFY — ok

    By: TESTER

    Note: Verified: successor gate retains beta.1 do_not_publish after deterministic current-main validation without provider access.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T05:59:12.563Z, excerpt_hash=sha256:de9be7b79d4ce8d2289484169d468746949ff267d509c0604fa35f16025d9a7e

    Details:

    Command: bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-driver.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
    Result: pass
    Evidence: 20 tests passed; qualification fixture retains the sealed failed candidate decision.
    Scope: RF-04 replay timing partition and beta qualification packet behavior.

    Command: node scripts/checks/check-agent-efficiency-replay.mjs
    Result: pass
    Evidence: frozen replay baseline validates 50 runs, 70/70 outcomes, 27/27 token cells, and 170/170 scalar cells.
    Scope: immutable no-provider replay evidence structure.

    Command: bun run ci:contract
    Result: pass
    Evidence: formatting, policy, lifecycle, architecture, baseline, and threshold contract checks completed successfully.
    Scope: repository-wide deterministic contract surface on the successor branch.

    Command: bun run test:critical
    Result: pass
    Evidence: all 12 critical-cli chunks passed.
    Scope: critical CLI regression surface.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607300553-CR9VTJ-requalify-the-agentplane-0-7-0-beta-1-decision-o/.agentplane/tasks/202607300553-CR9VTJ/blueprint/resolved-snapshot.json
    - old_digest: de3002eb1f1282432ab84376988f2dc568c4394c2eea0599ddcb1e500fbea1df
    - current_digest: de3002eb1f1282432ab84376988f2dc568c4394c2eea0599ddcb1e500fbea1df
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607300553-CR9VTJ

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
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
    - Observation: Prior RF-04 incident advice requires a pinned provider CLI only for a new candidate capture.
      Impact: The immutable beta.1 sample remains non-causal and beta.1 publication stays blocked; retrying it would violate the approved no-provider constraint.
      Resolution: Validate the frozen measurement and F8 timing partition on current main without provider access; defer any future capture to an explicitly approved task.

    - Observation: Current-main deterministic validation passed: RF-04 driver and qualification packet tests are 20/20, replay baseline validates 50 runs and 55 provider episodes, ci:contract and test:critical pass.
      Impact: The framework contracts and frozen evidence lineage remain intact on main, but this does not alter the candidate latency verdict.
      Resolution: Retain the committed F3 decision do_not_publish: latency.harness_setup_latency_ms.mean_ms and latency.time_to_verified_result_ms.mean_ms exceed their frozen thresholds; no beta.1 prerelease is published.

    - Observation: The frozen candidate still exceeds latency.harness_setup_latency_ms.mean_ms and latency.time_to_verified_result_ms.mean_ms thresholds.
      Impact: Beta.1 remains ineligible for publication despite healthy deterministic contracts.
      Resolution: Record do_not_publish and reserve any new capture for a separately approved provider task.
extensions:
  workflow_route_baseline:
    start_head_sha: "7856c47baaab749275df9f7bbdc640bac19c86d5"
    version: 1
id_source: "generated"
---
## Summary

Requalify the AgentPlane 0.7.0-beta.1 decision on current main

Replace the stranded beta.1 gate with a current-main qualification record. Preserve the immutable failed RF-04 candidate and F8 attribution, execute deterministic checks without provider calls, record do-not-publish for beta.1, and unblock beta.2 through an explicit successor dependency.

## Scope

- In scope: Replace the stranded beta.1 gate with a current-main qualification record. Preserve the immutable failed RF-04 candidate and F8 attribution, execute deterministic checks without provider calls, record do-not-publish for beta.1, and unblock beta.2 through an explicit successor dependency.
- Out of scope: unrelated refactors not required for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main".

## Plan

1. Persist the explicit replacement relation: keep the legacy beta.1 gate blocked because its stale PR cannot qualify current main, and replace only the beta.2 dependency edge with this successor. 2. On current main, validate the frozen 50-run/55-episode RF-04 evidence and the F8 timing-partition contract without invoking a provider or retrying the candidate. 3. Run the declared deterministic critical/contract checks, record any failure or flake as a blocker, and compare the retained latency failure against the unchanged quality rule. 4. Record beta.1 as do_not_publish, not as a product regression claim; publish no prerelease. 5. Close the graph-repair and quality-decision evidence through a normal PR, leaving actual beta.2 implementation work independent and ready only after this successor merges.

## Verify Steps

PLANNER fallback scaffold for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Requalify the AgentPlane 0.7.0-beta.1 decision on current main". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T06:02:43.118Z — VERIFY — ok

By: TESTER

Note: Verified: successor gate retains beta.1 do_not_publish after deterministic current-main validation without provider access.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T05:59:12.563Z, excerpt_hash=sha256:de9be7b79d4ce8d2289484169d468746949ff267d509c0604fa35f16025d9a7e

Details:

Command: bun test packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-driver.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
Result: pass
Evidence: 20 tests passed; qualification fixture retains the sealed failed candidate decision.
Scope: RF-04 replay timing partition and beta qualification packet behavior.

Command: node scripts/checks/check-agent-efficiency-replay.mjs
Result: pass
Evidence: frozen replay baseline validates 50 runs, 70/70 outcomes, 27/27 token cells, and 170/170 scalar cells.
Scope: immutable no-provider replay evidence structure.

Command: bun run ci:contract
Result: pass
Evidence: formatting, policy, lifecycle, architecture, baseline, and threshold contract checks completed successfully.
Scope: repository-wide deterministic contract surface on the successor branch.

Command: bun run test:critical
Result: pass
Evidence: all 12 critical-cli chunks passed.
Scope: critical CLI regression surface.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607300553-CR9VTJ-requalify-the-agentplane-0-7-0-beta-1-decision-o/.agentplane/tasks/202607300553-CR9VTJ/blueprint/resolved-snapshot.json
- old_digest: de3002eb1f1282432ab84376988f2dc568c4394c2eea0599ddcb1e500fbea1df
- current_digest: de3002eb1f1282432ab84376988f2dc568c4394c2eea0599ddcb1e500fbea1df
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607300553-CR9VTJ

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
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

- Observation: Prior RF-04 incident advice requires a pinned provider CLI only for a new candidate capture.
  Impact: The immutable beta.1 sample remains non-causal and beta.1 publication stays blocked; retrying it would violate the approved no-provider constraint.
  Resolution: Validate the frozen measurement and F8 timing partition on current main without provider access; defer any future capture to an explicitly approved task.

- Observation: Current-main deterministic validation passed: RF-04 driver and qualification packet tests are 20/20, replay baseline validates 50 runs and 55 provider episodes, ci:contract and test:critical pass.
  Impact: The framework contracts and frozen evidence lineage remain intact on main, but this does not alter the candidate latency verdict.
  Resolution: Retain the committed F3 decision do_not_publish: latency.harness_setup_latency_ms.mean_ms and latency.time_to_verified_result_ms.mean_ms exceed their frozen thresholds; no beta.1 prerelease is published.

- Observation: The frozen candidate still exceeds latency.harness_setup_latency_ms.mean_ms and latency.time_to_verified_result_ms.mean_ms thresholds.
  Impact: Beta.1 remains ineligible for publication despite healthy deterministic contracts.
  Resolution: Record do_not_publish and reserve any new capture for a separately approved provider task.
