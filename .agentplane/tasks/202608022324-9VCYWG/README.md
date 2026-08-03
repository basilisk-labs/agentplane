---
id: "202608022324-9VCYWG"
title: "Complete the task advance semantic-result round trip"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "external-agent"
  - "agent-protocol"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Run focused task advance, SemanticResult, supervisor, replay, and stale-fingerprint suites."
  - "Run typecheck, lint:core, knip:check, hotspots:check, policy routing, test:critical, and a two-call external-agent E2E fixture."
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T23:27:17.824Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-03T01:06:36.442Z"
  updated_by: "TESTER"
  note: "Verified implementation rework for the completed-journal crash window."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-03T00:58:02.223Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "146ff7f11d22b4fe58e198b087f6ea1756ec7b0c"
  blueprint_digest: "cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84"
  evidence_refs:
    - ".agentplane/tasks/202608022324-9VCYWG/quality/20260803-005714529-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608022324-9VCYWG/quality/20260803-005714529-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608022324-9VCYWG/quality/20260803-005714529-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608022324-9VCYWG/quality/20260803-005714529-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608022324-9VCYWG/quality/20260803-005714529-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608022324-9VCYWG/quality/20260803-005714529-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608022324-9VCYWG/README.md"
    - ".agentplane/tasks/202608022324-9VCYWG/quality/20260803-005714529-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608022324-9VCYWG/quality/20260803-005714529-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608022324-9VCYWG/verification/20260803005622552-d603d9be08ea58d1.json"
    - ".agentplane/tasks/202608022324-9VCYWG/quality/20260803-005714529-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "A crash after the supervisor journal is completed but before the exchange is marked consumed leaves the accepted result permanently unrecoverable."
commit:
  hash: "3c778153fe757a64eabda7db140593dca5012f17"
  message: "🚧 9VCYWG task: recover completed external result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: completed the typed external-agent SemanticResult round trip with CLI-owned verification, evaluator routing, crash recovery, and fail-closed exchange binding."
  -
    author: "CODER"
    body: "Implementation rework: recovered the completed-journal and accepted-exchange crash window without reapplying semantic effects."
events:
  -
    type: "status"
    at: "2026-08-02T23:28:26.953Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T00:53:34.301Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: completed the typed external-agent SemanticResult round trip with CLI-owned verification, evaluator routing, crash recovery, and fail-closed exchange binding."
  -
    type: "verify"
    at: "2026-08-03T00:54:15.784Z"
    author: "TESTER"
    state: "ok"
    note: "Verified external-agent round trip: 12 task-advance E2E tests and 97 focused contract/supervisor tests passed; typecheck, lint:core, knip:check (539 baseline, no growth), hotspots:check, schema sync, compatibility contract, policy routing, formatting, and all 12 critical chunks passed."
  -
    type: "verify"
    at: "2026-08-03T00:56:22.552Z"
    author: "TESTER"
    state: "ok"
    note: "Verified the external-agent SemanticResult round trip and fail-closed recovery contract."
  -
    type: "status"
    at: "2026-08-03T01:05:37.583Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework: recovered the completed-journal and accepted-exchange crash window without reapplying semantic effects."
  -
    type: "verify"
    at: "2026-08-03T01:06:36.442Z"
    author: "TESTER"
    state: "ok"
    note: "Verified implementation rework for the completed-journal crash window."
doc_version: 3
doc_updated_at: "2026-08-03T01:06:37.974Z"
doc_updated_by: "CODER"
description: "Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics."
sections:
  Summary: |-
    Complete the task advance semantic-result round trip

    Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.
  Scope: |-
    - In scope: Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.
    - Out of scope: unrelated refactors not required for "Complete the task advance semantic-result round trip".
  Plan: "1. Reuse the canonical AgentSemanticResult contract and add a task advance result input envelope bound to task_id, transition_id, role, and state_fingerprint; reject stale, mismatched, malformed, or replayed results before mutation. 2. Expose only compact work-order and result-schema references plus one deterministic return invocation in the agent packet, keeping the serialized packet at or below 2 KiB and free of Git/PR/verify/finish/integrate choreography. 3. Feed accepted results into the same persisted supervisor episode and lifecycle operation registry used by task run, execute all newly eligible deterministic operations within the existing bound, and emit the next semantic/approval/wait/terminal packet. 4. Add direct and branch_pr E2E fixtures for planning, implementation, evaluator, stale fingerprint, duplicate result, crash recovery, and terminal convergence; prove task run and task advance do not fork lifecycle behavior. 5. Run focused suites and the full critical/static/size/policy gates, then record structured verification and evaluator evidence."
  Verify Steps: "1. Run focused task advance packet, result-ingestion, AgentSemanticResult validation, supervisor episode, stale-fingerprint, replay, and recovery tests. Expected: a valid result advances the same state machine as task run; malformed, stale, mismatched, or replayed results fail closed without duplicate effects. 2. Run direct and branch_pr external-agent E2E fixtures from task creation through terminal state. Expected: after task creation the external agent uses only task advance plus semantic-result files; Agentplane owns all Git, worktree, PR, verification, evaluator, integration, and cleanup transitions; every emitted packet is at most 2048 bytes and has one representation per field. 3. Run bun run typecheck, bun run lint:core, bun run knip:check, bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and bun run test:critical. Expected: all gates pass without Knip or hotspot baseline growth."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T00:54:15.784Z — VERIFY — ok

    By: TESTER

    Note: Verified external-agent round trip: 12 task-advance E2E tests and 97 focused contract/supervisor tests passed; typecheck, lint:core, knip:check (539 baseline, no growth), hotspots:check, schema sync, compatibility contract, policy routing, formatting, and all 12 critical chunks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T00:53:34.301Z, excerpt_hash=sha256:36f96cfdec205a481215a21fa5d778959c18c4de7da763b3fe738b4032ef8378

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022324-9VCYWG-complete-the-task-advance-semantic-result-round/.agentplane/tasks/202608022324-9VCYWG/blueprint/resolved-snapshot.json
    - old_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
    - current_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608022324-9VCYWG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608022324-9VCYWG
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-03T00:56:22.552Z — VERIFY — ok

    By: TESTER

    Note: Verified the external-agent SemanticResult round trip and fail-closed recovery contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T00:54:16.717Z, excerpt_hash=sha256:36f96cfdec205a481215a21fa5d778959c18c4de7da763b3fe738b4032ef8378

    Details:

    Command: bun x vitest run focused external-agent, WorkOrder, supervisor, route, direct, branch_pr, and task-advance suites
    Result: pass
    Evidence: 12 test files passed; 97 tests passed, including 12 task-advance E2E scenarios
    Scope: SemanticResult validation, packet size, stale and replay rejection, tamper resistance, direct and branch_pr convergence, crash recovery

    Command: bun run typecheck and bun run lint:core
    Result: pass
    Evidence: TypeScript build completed and ESLint exited cleanly
    Scope: Changed core and CLI production paths

    Command: bun run knip:check and bun run hotspots:check
    Result: pass
    Evidence: Knip baseline 539 of 539 with no growth; runtime and test size thresholds passed
    Scope: Unused-code and module-size regressions

    Command: bun run schemas:check, bun run bench:compatibility:check, node .agentplane/policy/check-routing.mjs, and bun run format:changed
    Result: pass
    Evidence: Schema sync, compatibility contract, policy routing, and changed-file formatting all passed
    Scope: Generated contracts, public CLI surface, policy graph, and formatting

    Command: bun run test:critical
    Result: pass
    Evidence: All 12 critical-cli chunks passed
    Scope: Agent efficiency, replay hardening, exit codes, Git edges, protected paths, scope leaks, symlink roots, and trust-boundary ratchets

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022324-9VCYWG-complete-the-task-advance-semantic-result-round/.agentplane/tasks/202608022324-9VCYWG/blueprint/resolved-snapshot.json
    - old_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
    - current_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608022324-9VCYWG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608022324-9VCYWG
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-03T01:06:36.442Z — VERIFY — ok

    By: TESTER

    Note: Verified implementation rework for the completed-journal crash window.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T01:05:37.583Z, excerpt_hash=sha256:36f96cfdec205a481215a21fa5d778959c18c4de7da763b3fe738b4032ef8378

    Details:

    Command: bun x vitest run focused external-agent, WorkOrder, supervisor, route, direct, branch_pr, and task-advance suites
    Result: pass
    Evidence: 12 test files passed; 97 tests passed, including fault injection after supervisor completion and before exchange consumption
    Scope: SemanticResult validation, packet size, stale and replay rejection, tamper resistance, direct and branch_pr convergence, and both accepted-result crash windows

    Command: bun run typecheck and bun run lint:core
    Result: pass
    Evidence: TypeScript build completed and ESLint exited cleanly
    Scope: Changed core and CLI production paths

    Command: bun run knip:check and bun run hotspots:check
    Result: pass
    Evidence: Knip baseline 539 of 539 with no growth; runtime and test size thresholds passed
    Scope: Unused-code and module-size regressions

    Command: bun run schemas:check, bun run bench:compatibility:check, node .agentplane/policy/check-routing.mjs, and bun run format:changed
    Result: pass
    Evidence: Schema sync, compatibility contract, policy routing, and changed-file formatting all passed
    Scope: Generated contracts, public CLI surface, policy graph, and formatting

    Command: bun run test:critical
    Result: pass
    Evidence: All 12 critical-cli chunks passed after implementation rework
    Scope: Agent efficiency, replay hardening, exit codes, Git edges, protected paths, scope leaks, symlink roots, and trust-boundary ratchets

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022324-9VCYWG-complete-the-task-advance-semantic-result-round/.agentplane/tasks/202608022324-9VCYWG/blueprint/resolved-snapshot.json
    - old_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
    - current_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608022324-9VCYWG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608022324-9VCYWG
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
    - Observation: Issued exchange and WorkOrder are digest-bound to supervisor intent; stale, mismatched, tampered, replayed, and crash-recovery paths fail closed without duplicate effects.
      Impact: The external agent needs only task advance plus one typed SemanticResult while Agentplane owns lifecycle, Git, checks, evaluator routing, and closeout mechanics.
      Resolution: Added direct and branch_pr round-trip coverage, accepted-effect recovery, immutable exchange binding, and compatibility ratchets; no residual blocker in task scope.
extensions:
  workflow_route_baseline:
    start_head_sha: "d7b766b9c4f7c8df771e06f3c8a1a60129035087"
    version: 1
id_source: "generated"
---
## Summary

Complete the task advance semantic-result round trip

Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.

## Scope

- In scope: Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.
- Out of scope: unrelated refactors not required for "Complete the task advance semantic-result round trip".

## Plan

1. Reuse the canonical AgentSemanticResult contract and add a task advance result input envelope bound to task_id, transition_id, role, and state_fingerprint; reject stale, mismatched, malformed, or replayed results before mutation. 2. Expose only compact work-order and result-schema references plus one deterministic return invocation in the agent packet, keeping the serialized packet at or below 2 KiB and free of Git/PR/verify/finish/integrate choreography. 3. Feed accepted results into the same persisted supervisor episode and lifecycle operation registry used by task run, execute all newly eligible deterministic operations within the existing bound, and emit the next semantic/approval/wait/terminal packet. 4. Add direct and branch_pr E2E fixtures for planning, implementation, evaluator, stale fingerprint, duplicate result, crash recovery, and terminal convergence; prove task run and task advance do not fork lifecycle behavior. 5. Run focused suites and the full critical/static/size/policy gates, then record structured verification and evaluator evidence.

## Verify Steps

1. Run focused task advance packet, result-ingestion, AgentSemanticResult validation, supervisor episode, stale-fingerprint, replay, and recovery tests. Expected: a valid result advances the same state machine as task run; malformed, stale, mismatched, or replayed results fail closed without duplicate effects. 2. Run direct and branch_pr external-agent E2E fixtures from task creation through terminal state. Expected: after task creation the external agent uses only task advance plus semantic-result files; Agentplane owns all Git, worktree, PR, verification, evaluator, integration, and cleanup transitions; every emitted packet is at most 2048 bytes and has one representation per field. 3. Run bun run typecheck, bun run lint:core, bun run knip:check, bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and bun run test:critical. Expected: all gates pass without Knip or hotspot baseline growth.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T00:54:15.784Z — VERIFY — ok

By: TESTER

Note: Verified external-agent round trip: 12 task-advance E2E tests and 97 focused contract/supervisor tests passed; typecheck, lint:core, knip:check (539 baseline, no growth), hotspots:check, schema sync, compatibility contract, policy routing, formatting, and all 12 critical chunks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T00:53:34.301Z, excerpt_hash=sha256:36f96cfdec205a481215a21fa5d778959c18c4de7da763b3fe738b4032ef8378

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022324-9VCYWG-complete-the-task-advance-semantic-result-round/.agentplane/tasks/202608022324-9VCYWG/blueprint/resolved-snapshot.json
- old_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
- current_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608022324-9VCYWG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608022324-9VCYWG
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-03T00:56:22.552Z — VERIFY — ok

By: TESTER

Note: Verified the external-agent SemanticResult round trip and fail-closed recovery contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T00:54:16.717Z, excerpt_hash=sha256:36f96cfdec205a481215a21fa5d778959c18c4de7da763b3fe738b4032ef8378

Details:

Command: bun x vitest run focused external-agent, WorkOrder, supervisor, route, direct, branch_pr, and task-advance suites
Result: pass
Evidence: 12 test files passed; 97 tests passed, including 12 task-advance E2E scenarios
Scope: SemanticResult validation, packet size, stale and replay rejection, tamper resistance, direct and branch_pr convergence, crash recovery

Command: bun run typecheck and bun run lint:core
Result: pass
Evidence: TypeScript build completed and ESLint exited cleanly
Scope: Changed core and CLI production paths

Command: bun run knip:check and bun run hotspots:check
Result: pass
Evidence: Knip baseline 539 of 539 with no growth; runtime and test size thresholds passed
Scope: Unused-code and module-size regressions

Command: bun run schemas:check, bun run bench:compatibility:check, node .agentplane/policy/check-routing.mjs, and bun run format:changed
Result: pass
Evidence: Schema sync, compatibility contract, policy routing, and changed-file formatting all passed
Scope: Generated contracts, public CLI surface, policy graph, and formatting

Command: bun run test:critical
Result: pass
Evidence: All 12 critical-cli chunks passed
Scope: Agent efficiency, replay hardening, exit codes, Git edges, protected paths, scope leaks, symlink roots, and trust-boundary ratchets

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022324-9VCYWG-complete-the-task-advance-semantic-result-round/.agentplane/tasks/202608022324-9VCYWG/blueprint/resolved-snapshot.json
- old_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
- current_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608022324-9VCYWG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608022324-9VCYWG
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-03T01:06:36.442Z — VERIFY — ok

By: TESTER

Note: Verified implementation rework for the completed-journal crash window.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T01:05:37.583Z, excerpt_hash=sha256:36f96cfdec205a481215a21fa5d778959c18c4de7da763b3fe738b4032ef8378

Details:

Command: bun x vitest run focused external-agent, WorkOrder, supervisor, route, direct, branch_pr, and task-advance suites
Result: pass
Evidence: 12 test files passed; 97 tests passed, including fault injection after supervisor completion and before exchange consumption
Scope: SemanticResult validation, packet size, stale and replay rejection, tamper resistance, direct and branch_pr convergence, and both accepted-result crash windows

Command: bun run typecheck and bun run lint:core
Result: pass
Evidence: TypeScript build completed and ESLint exited cleanly
Scope: Changed core and CLI production paths

Command: bun run knip:check and bun run hotspots:check
Result: pass
Evidence: Knip baseline 539 of 539 with no growth; runtime and test size thresholds passed
Scope: Unused-code and module-size regressions

Command: bun run schemas:check, bun run bench:compatibility:check, node .agentplane/policy/check-routing.mjs, and bun run format:changed
Result: pass
Evidence: Schema sync, compatibility contract, policy routing, and changed-file formatting all passed
Scope: Generated contracts, public CLI surface, policy graph, and formatting

Command: bun run test:critical
Result: pass
Evidence: All 12 critical-cli chunks passed after implementation rework
Scope: Agent efficiency, replay hardening, exit codes, Git edges, protected paths, scope leaks, symlink roots, and trust-boundary ratchets

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022324-9VCYWG-complete-the-task-advance-semantic-result-round/.agentplane/tasks/202608022324-9VCYWG/blueprint/resolved-snapshot.json
- old_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
- current_digest: cbe774b992ba26e5f5785208fc292347cd98d7813c67deda927fd3e545eeef84
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608022324-9VCYWG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608022324-9VCYWG
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

- Observation: Issued exchange and WorkOrder are digest-bound to supervisor intent; stale, mismatched, tampered, replayed, and crash-recovery paths fail closed without duplicate effects.
  Impact: The external agent needs only task advance plus one typed SemanticResult while Agentplane owns lifecycle, Git, checks, evaluator routing, and closeout mechanics.
  Resolution: Added direct and branch_pr round-trip coverage, accepted-effect recovery, immutable exchange binding, and compatibility ratchets; no residual blocker in task scope.
