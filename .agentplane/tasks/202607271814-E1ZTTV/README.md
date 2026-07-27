---
id: "202607271814-E1ZTTV"
title: "Stabilize concurrent recovery-lease reads"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "reliability"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T18:14:43.269Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-27T18:55:40.772Z"
  updated_by: "TESTER"
  note: "Verified recovery-lease collision retry, runner wait resilience, and full fast CI on the committed task branch."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-27T18:56:35.491Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "9804dae6bdb5c97ab068ca435483573d1c6ff744"
  blueprint_digest: "1766a97a9f5dc03821b7af809d044d41903d47e3cd2a1edeb1774df74a3519cc"
  evidence_refs:
    - ".agentplane/tasks/202607271814-E1ZTTV/quality/20260727-185634917-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607271814-E1ZTTV/quality/20260727-185634917-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607271814-E1ZTTV/quality/20260727-185634917-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607271814-E1ZTTV/quality/20260727-185634917-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607271814-E1ZTTV/quality/20260727-185634917-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607271814-E1ZTTV/README.md"
    - ".agentplane/tasks/202607271814-E1ZTTV/quality/20260727-185634917-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607271814-E1ZTTV/quality/20260727-185634917-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607271814-E1ZTTV/quality/20260727-185634917-recovery-context/evaluator-blueprint.json"
  findings:
    - "The retry classification exactly mirrors the existing runner-state atomic-replacement guard; directory and inode validation still run on every attempt."
commit:
  hash: "9804dae6bdb5c97ab068ca435483573d1c6ff744"
  message: "🐛 E1ZTTV reliability: stabilize concurrent recovery-lease reads"
comments:
  -
    author: "CODER"
    body: "Start: isolate and stabilize concurrent recovery-lease observation without weakening file-integrity checks."
  -
    author: "CODER"
    body: "Implementation committed: bounded recovery-lease read retries, deterministic collision coverage, and resilient runner test waits passed the full fast CI."
  -
    author: "CODER"
    body: "Traceability correction: record the final amended implementation commit that was independently evaluated."
events:
  -
    type: "status"
    at: "2026-07-27T18:15:07.754Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: isolate and stabilize concurrent recovery-lease observation without weakening file-integrity checks."
  -
    type: "status"
    at: "2026-07-27T18:55:11.055Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: bounded recovery-lease read retries, deterministic collision coverage, and resilient runner test waits passed the full fast CI."
  -
    type: "verify"
    at: "2026-07-27T18:55:40.772Z"
    author: "TESTER"
    state: "ok"
    note: "Verified recovery-lease collision retry, runner wait resilience, and full fast CI on the committed task branch."
  -
    type: "status"
    at: "2026-07-27T18:57:23.413Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Traceability correction: record the final amended implementation commit that was independently evaluated."
doc_version: 3
doc_updated_at: "2026-07-27T18:57:23.413Z"
doc_updated_by: "CODER"
description: "Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability."
sections:
  Summary: |-
    Stabilize concurrent recovery-lease reads

    Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability.
  Scope: |-
    - In scope: Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability.
    - Out of scope: unrelated refactors not required for "Stabilize concurrent recovery-lease reads".
  Plan: "1. Inspect the recovery-lease read and retirement protocol plus both failing concurrent tests. 2. Add the smallest bounded retry or contention classification that never accepts an unstable file and preserves identity/boundary validation. 3. Add deterministic tests for a transient concurrent replacement/read collision. 4. Run focused runner tests repeatedly, static/type/lint gates, then publish a narrow PR and require hosted checks before integrating RF-12b."
  Verify Steps: |-
    PLANNER fallback scaffold for "Stabilize concurrent recovery-lease reads". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Stabilize concurrent recovery-lease reads". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-27T18:55:40.772Z — VERIFY — ok

    By: TESTER

    Note: Verified recovery-lease collision retry, runner wait resilience, and full fast CI on the committed task branch.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T18:55:11.055Z, excerpt_hash=sha256:596f2837052b262a38f7863e1faa9c226328800459a3f30780d720a3653b9f66

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607271814-E1ZTTV-stabilize-concurrent-recovery-lease-reads/.agentplane/tasks/202607271814-E1ZTTV/blueprint/resolved-snapshot.json
    - old_digest: 1766a97a9f5dc03821b7af809d044d41903d47e3cd2a1edeb1774df74a3519cc
    - current_digest: 1766a97a9f5dc03821b7af809d044d41903d47e3cd2a1edeb1774df74a3519cc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607271814-E1ZTTV

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607271814-E1ZTTV
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
    - Observation: bun run ci:local:fast passed: 474 test files, 3289 tests, and all 11 critical CLI chunks.
      Impact: Concurrent runner scenarios no longer fail on a transient stable-read collision or short local scheduling delay.
      Resolution: Added bounded retry only for the known recovery-lease read collision, deterministic coverage, and 30-second test-harness waits.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T18:15:21.246Z"
        authorityDigest: "sha256:54f3328549fb80154a5277c336aaed98a5fc8d8407afd1a82e9e7cf564666d60"
        digest: "sha256:e25f64c54ef3b320d9883d9db2ff7972fc02367e7a44839d048c9953e5b222f4"
        operationDigest: "sha256:d799f8b60a25c7603ce63d3cfc965d4e67b591fc5766ad361b65d1b9a2f8dac0"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:145801b6eeda9c522f4c9f62edb640063c6bfa52f801531bff1493c2087a93cd"
    grants:
      -
        actor: "USER"
        digest: "sha256:54f3328549fb80154a5277c336aaed98a5fc8d8407afd1a82e9e7cf564666d60"
        expiresAt: "2026-07-27T18:30:21.246Z"
        id: "authority-b2b36209-470d-44bd-8978-f7ca07ee47d9"
        issuedAt: "2026-07-27T18:15:21.246Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:d799f8b60a25c7603ce63d3cfc965d4e67b591fc5766ad361b65d1b9a2f8dac0"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:145801b6eeda9c522f4c9f62edb640063c6bfa52f801531bff1493c2087a93cd"
        stateScopeDigest: "sha256:5d044488cf62b25892931fe94449d6d9888d1033befb0f771a4c5d4a58756c4f"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "8c863087669ef21c562e8c230e851bc94a12e8a4"
    version: 1
id_source: "generated"
---
## Summary

Stabilize concurrent recovery-lease reads

Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability.

## Scope

- In scope: Prevent transient read-stability races from failing concurrent runner effect-resolution and active-claim retry flows; preserve strict file-integrity checks and verify repeatability.
- Out of scope: unrelated refactors not required for "Stabilize concurrent recovery-lease reads".

## Plan

1. Inspect the recovery-lease read and retirement protocol plus both failing concurrent tests. 2. Add the smallest bounded retry or contention classification that never accepts an unstable file and preserves identity/boundary validation. 3. Add deterministic tests for a transient concurrent replacement/read collision. 4. Run focused runner tests repeatedly, static/type/lint gates, then publish a narrow PR and require hosted checks before integrating RF-12b.

## Verify Steps

PLANNER fallback scaffold for "Stabilize concurrent recovery-lease reads". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Stabilize concurrent recovery-lease reads". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-27T18:55:40.772Z — VERIFY — ok

By: TESTER

Note: Verified recovery-lease collision retry, runner wait resilience, and full fast CI on the committed task branch.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T18:55:11.055Z, excerpt_hash=sha256:596f2837052b262a38f7863e1faa9c226328800459a3f30780d720a3653b9f66

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607271814-E1ZTTV-stabilize-concurrent-recovery-lease-reads/.agentplane/tasks/202607271814-E1ZTTV/blueprint/resolved-snapshot.json
- old_digest: 1766a97a9f5dc03821b7af809d044d41903d47e3cd2a1edeb1774df74a3519cc
- current_digest: 1766a97a9f5dc03821b7af809d044d41903d47e3cd2a1edeb1774df74a3519cc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607271814-E1ZTTV

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607271814-E1ZTTV
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

- Observation: bun run ci:local:fast passed: 474 test files, 3289 tests, and all 11 critical CLI chunks.
  Impact: Concurrent runner scenarios no longer fail on a transient stable-read collision or short local scheduling delay.
  Resolution: Added bounded retry only for the known recovery-lease read collision, deterministic coverage, and 30-second test-harness waits.
