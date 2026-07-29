---
id: "202607291148-1F9GZD"
title: "Formalize SHA-bound qualification packets for evaluator review"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 23
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "v0.7"
verify:
  - "bun run ci:contract"
  - "bun run test:fast -- packages/agentplane/src/commands/evaluator"
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T11:49:29.041Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-29T14:19:04.724Z"
  updated_by: "TESTER"
  note: "Verified SHA-bound dependency lifecycle packet on 28b541f8."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-29T14:20:46.996Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "28b541f82687e465f36e5ecd50e98efdb806f85e"
  blueprint_digest: "1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391"
  evidence_refs:
    - ".agentplane/tasks/202607291148-1F9GZD/quality/20260729-141940105-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607291148-1F9GZD/quality/20260729-141940105-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607291148-1F9GZD/quality/20260729-141940105-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607291148-1F9GZD/quality/20260729-141940105-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607291148-1F9GZD/quality/20260729-141940105-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607291148-1F9GZD/README.md"
    - ".agentplane/tasks/202607291148-1F9GZD/quality/20260729-141940105-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607291148-1F9GZD/quality/20260729-141940105-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607291148-1F9GZD/quality/20260729-141940105-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The frozen change implements the approved SHA-bound qualification contract and the final verification covers packet sealing, transitive dependency leaves, historical lifecycle state, negative cases, and repository-wide contract checks."
commit:
  hash: "28b541f82687e465f36e5ecd50e98efdb806f85e"
  message: "test(evaluator): pin dependency lifecycle to reviewed sha"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented: SHA-bound qualification packets freeze accepted verification, dependency closure, and RF-04 replay evidence before evaluator review. Verified locally: 53 focused tests and full contract gates."
  -
    author: "CODER"
    body: "Reworked: evaluator now targets a sealing commit that contains and hash-matches the qualification packet, durable verification record, RF-04 baselines, and per-leaf artifacts."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-29T11:49:50.493Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-29T12:33:58.870Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: SHA-bound qualification packets freeze accepted verification, dependency closure, and RF-04 replay evidence before evaluator review. Verified locally: 53 focused tests and full contract gates."
  -
    type: "verify"
    at: "2026-07-29T12:34:27.639Z"
    author: "TESTER"
    state: "ok"
    note: "Focused evaluator regression coverage and the repository contract passed on d720aaa8."
  -
    type: "status"
    at: "2026-07-29T12:44:13.986Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Reworked: evaluator now targets a sealing commit that contains and hash-matches the qualification packet, durable verification record, RF-04 baselines, and per-leaf artifacts."
  -
    type: "verify"
    at: "2026-07-29T13:19:18.602Z"
    author: "TESTER"
    state: "ok"
    note: "Focused evaluator coverage and the repository contract passed on ac1339976."
  -
    type: "verify"
    at: "2026-07-29T13:46:59.182Z"
    author: "TESTER"
    state: "ok"
    note: "Verified c15433: qualification evidence is bound to the reviewed SHA."
  -
    type: "verify"
    at: "2026-07-29T13:57:35.756Z"
    author: "TESTER"
    state: "ok"
    note: "Verified 8a94a0a: qualification evidence traverses terminal dependency leaves."
  -
    type: "verify"
    at: "2026-07-29T14:19:04.724Z"
    author: "TESTER"
    state: "ok"
    note: "Verified SHA-bound dependency lifecycle packet on 28b541f8."
  -
    type: "status"
    at: "2026-07-29T14:21:30.102Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-29T14:21:30.102Z"
doc_updated_by: "CODER"
description: "Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9."
sections:
  Summary: |-
    Formalize SHA-bound qualification packets for evaluator review

    Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9.
  Scope: |-
    - In scope: Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9.
    - Out of scope: unrelated refactors not required for "Formalize SHA-bound qualification packets for evaluator review".
  Plan: "1. Reproduce the beta.1 evaluator rework against a metadata-only qualification task and define the single reviewed-SHA contract. 2. Extend the CLI evidence builder to generate a deterministic qualification packet containing verified check records, per-leaf dependency closure and lifecycle evidence, and RF-04 baseline-versus-current metric values. 3. Freeze that packet into the evaluator work order and make metadata-only qualification reviews target the packet commit rather than a stale source-only SHA. 4. Add focused regression tests for packet contents, SHA binding, closure completeness, and metric comparison. 5. Run focused evaluator tests and ci:contract; keep the change limited to CLI evidence and review routing."
  Verify Steps: "1. Add focused tests that prepare a metadata-only qualification task with structured verification details and assert that the frozen evaluator work order contains one SHA-bound qualification packet, accepted verification evidence, per-leaf dependency closure, and RF-04 baseline-versus-current metrics. 2. Add a regression that fails if a packet is bound to a stale reviewed SHA or has incomplete dependency lifecycle evidence. 3. Run bun run test:fast -- packages/agentplane/src/commands/evaluator and the new targeted test files. Expected: all pass. 4. Run bun run ci:contract. Expected: full repository contract passes. 5. Inspect the packet schema and evaluator prompt evidence list. Expected: an EVALUATOR can cite only frozen packet evidence and can evaluate a metadata-only qualification change at its actual reviewed SHA."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-29T12:34:27.639Z — VERIFY — ok

    By: TESTER

    Note: Focused evaluator regression coverage and the repository contract passed on d720aaa8.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T12:33:58.870Z, excerpt_hash=sha256:e49fbad205c0347b323803a08a46b1fecf4ec1d48cca69d1e743c4b7476fb582

    Details:

    Command: bun run test:fast -- packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
    Result: pass
    Evidence: 53 tests passed across 5 files.
    Scope: qualification-packet creation, frozen evaluator evidence, stale-SHA rejection, and verification record parsing.

    Command: bun run ci:contract
    Result: pass
    Evidence: formatting, schemas, RF-04 baseline and replay 50/70/27/170, hotspot, guards, lint, clone, knip, and coverage gates passed.
    Scope: repository contract for the committed implementation.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291148-1F9GZD-formalize-sha-bound-qualification-packets-for-ev/.agentplane/tasks/202607291148-1F9GZD/blueprint/resolved-snapshot.json
    - old_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
    - current_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291148-1F9GZD

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607291148-1F9GZD
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-29T13:19:18.602Z — VERIFY — ok

    By: TESTER

    Note: Focused evaluator coverage and the repository contract passed on ac1339976.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T12:44:13.986Z, excerpt_hash=sha256:e49fbad205c0347b323803a08a46b1fecf4ec1d48cca69d1e743c4b7476fb582

    Details:

    Command: bun run test:fast -- packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
    Result: pass
    Evidence: 55 tests passed across 5 files.
    Scope: qualification packet capture, frozen evaluator evidence, stale-SHA rejection, and verification record parsing.

    Command: bun run ci:contract
    Result: pass
    Evidence: formatting, schemas, RF-04 50/70/27/170 replay, lifecycle, guards, lint, architecture, clone, knip, and coverage gates passed.
    Scope: repository contract for the committed implementation.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291148-1F9GZD-formalize-sha-bound-qualification-packets-for-ev/.agentplane/tasks/202607291148-1F9GZD/blueprint/resolved-snapshot.json
    - old_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
    - current_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291148-1F9GZD

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

    ### 2026-07-29T13:46:59.182Z — VERIFY — ok

    By: TESTER

    Note: Verified c15433: qualification evidence is bound to the reviewed SHA.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T13:19:21.728Z, excerpt_hash=sha256:e49fbad205c0347b323803a08a46b1fecf4ec1d48cca69d1e743c4b7476fb582

    Details:

    Command: bun run test:fast -- packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
    Result: pass (55 tests)
    Evidence: c15433cc1f9595570ab3ab4dae6defea4caebd49; focused evaluator and verification regression suite
    Scope: sealing lineage, exact dependency artifact blobs, RF-04 packet evidence

    Command: bun run ci:contract
    Result: pass
    Evidence: RF-04 50 runs, 70/70 outcomes, 27/27 provider token cells, 170/170 scalar cells; lint, architecture, clone, Knip, and coverage guards passed
    Scope: repository contract for c15433cc1f9595570ab3ab4dae6defea4caebd49

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291148-1F9GZD-formalize-sha-bound-qualification-packets-for-ev/.agentplane/tasks/202607291148-1F9GZD/blueprint/resolved-snapshot.json
    - old_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
    - current_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291148-1F9GZD

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

    ### 2026-07-29T13:57:35.756Z — VERIFY — ok

    By: TESTER

    Note: Verified 8a94a0a: qualification evidence traverses terminal dependency leaves.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T13:46:59.973Z, excerpt_hash=sha256:e49fbad205c0347b323803a08a46b1fecf4ec1d48cca69d1e743c4b7476fb582

    Details:

    Command: bun run test:fast -- packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
    Result: pass (56 tests)
    Evidence: 8a94a0a4b8c1026be5b1a51b8bc0e6c095eaf381; nested terminal leaf, missing-node, and cycle regressions
    Scope: SHA-bound qualification packet, transitive dependency closure, RF-04 packet evidence

    Command: bun run ci:contract
    Result: pass
    Evidence: RF-04 50 runs, 70/70 outcomes, 27/27 provider token cells, 170/170 scalar cells; lint, architecture, clone, Knip, and coverage guards passed
    Scope: repository contract for 8a94a0a4b8c1026be5b1a51b8bc0e6c095eaf381

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291148-1F9GZD-formalize-sha-bound-qualification-packets-for-ev/.agentplane/tasks/202607291148-1F9GZD/blueprint/resolved-snapshot.json
    - old_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
    - current_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291148-1F9GZD

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

    ### 2026-07-29T14:19:04.724Z — VERIFY — ok

    By: TESTER

    Note: Verified SHA-bound dependency lifecycle packet on 28b541f8.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T13:57:36.535Z, excerpt_hash=sha256:e49fbad205c0347b323803a08a46b1fecf4ec1d48cca69d1e743c4b7476fb582

    Details:

    Command: bun run test:fast -- packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
    Result: pass (56 tests)
    Evidence: 28b541f82687e465f36e5ecd50e98efdb806f85e; historical dependency lifecycle cannot be overridden by current DONE/ok state.
    Scope: SHA-bound qualification packets, transitive terminal leaves, lifecycle and quality-report state at the reviewed implementation SHA.

    Command: bun run ci:contract
    Result: pass
    Evidence: RF-04 replay 50 runs, 70/70 outcomes, 27/27 provider token cells, 170/170 scalar cells; architecture, lint, clone, knip, and coverage checks pass.
    Scope: repository contract.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291148-1F9GZD-formalize-sha-bound-qualification-packets-for-ev/.agentplane/tasks/202607291148-1F9GZD/blueprint/resolved-snapshot.json
    - old_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
    - current_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291148-1F9GZD

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
    - Observation: The evaluator work order freezes a packet bound to the durable verification record SHA and hashes each required leaf artifact.
      Impact: The beta qualification evaluator can inspect deterministic, pre-existing evidence instead of inferring cross-task state from prose.
      Resolution: Verification accepted; proceed to independent evaluator review.
extensions:
  workflow_route_baseline:
    start_head_sha: "d0b9d694451714a0cbd5a01cdfb8db1faffee6aa"
    version: 1
id_source: "generated"
---
## Summary

Formalize SHA-bound qualification packets for evaluator review

Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9.

## Scope

- In scope: Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9.
- Out of scope: unrelated refactors not required for "Formalize SHA-bound qualification packets for evaluator review".

## Plan

1. Reproduce the beta.1 evaluator rework against a metadata-only qualification task and define the single reviewed-SHA contract. 2. Extend the CLI evidence builder to generate a deterministic qualification packet containing verified check records, per-leaf dependency closure and lifecycle evidence, and RF-04 baseline-versus-current metric values. 3. Freeze that packet into the evaluator work order and make metadata-only qualification reviews target the packet commit rather than a stale source-only SHA. 4. Add focused regression tests for packet contents, SHA binding, closure completeness, and metric comparison. 5. Run focused evaluator tests and ci:contract; keep the change limited to CLI evidence and review routing.

## Verify Steps

1. Add focused tests that prepare a metadata-only qualification task with structured verification details and assert that the frozen evaluator work order contains one SHA-bound qualification packet, accepted verification evidence, per-leaf dependency closure, and RF-04 baseline-versus-current metrics. 2. Add a regression that fails if a packet is bound to a stale reviewed SHA or has incomplete dependency lifecycle evidence. 3. Run bun run test:fast -- packages/agentplane/src/commands/evaluator and the new targeted test files. Expected: all pass. 4. Run bun run ci:contract. Expected: full repository contract passes. 5. Inspect the packet schema and evaluator prompt evidence list. Expected: an EVALUATOR can cite only frozen packet evidence and can evaluate a metadata-only qualification change at its actual reviewed SHA.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-29T12:34:27.639Z — VERIFY — ok

By: TESTER

Note: Focused evaluator regression coverage and the repository contract passed on d720aaa8.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T12:33:58.870Z, excerpt_hash=sha256:e49fbad205c0347b323803a08a46b1fecf4ec1d48cca69d1e743c4b7476fb582

Details:

Command: bun run test:fast -- packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
Result: pass
Evidence: 53 tests passed across 5 files.
Scope: qualification-packet creation, frozen evaluator evidence, stale-SHA rejection, and verification record parsing.

Command: bun run ci:contract
Result: pass
Evidence: formatting, schemas, RF-04 baseline and replay 50/70/27/170, hotspot, guards, lint, clone, knip, and coverage gates passed.
Scope: repository contract for the committed implementation.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291148-1F9GZD-formalize-sha-bound-qualification-packets-for-ev/.agentplane/tasks/202607291148-1F9GZD/blueprint/resolved-snapshot.json
- old_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
- current_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291148-1F9GZD

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607291148-1F9GZD
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-29T13:19:18.602Z — VERIFY — ok

By: TESTER

Note: Focused evaluator coverage and the repository contract passed on ac1339976.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T12:44:13.986Z, excerpt_hash=sha256:e49fbad205c0347b323803a08a46b1fecf4ec1d48cca69d1e743c4b7476fb582

Details:

Command: bun run test:fast -- packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
Result: pass
Evidence: 55 tests passed across 5 files.
Scope: qualification packet capture, frozen evaluator evidence, stale-SHA rejection, and verification record parsing.

Command: bun run ci:contract
Result: pass
Evidence: formatting, schemas, RF-04 50/70/27/170 replay, lifecycle, guards, lint, architecture, clone, knip, and coverage gates passed.
Scope: repository contract for the committed implementation.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291148-1F9GZD-formalize-sha-bound-qualification-packets-for-ev/.agentplane/tasks/202607291148-1F9GZD/blueprint/resolved-snapshot.json
- old_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
- current_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291148-1F9GZD

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

### 2026-07-29T13:46:59.182Z — VERIFY — ok

By: TESTER

Note: Verified c15433: qualification evidence is bound to the reviewed SHA.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T13:19:21.728Z, excerpt_hash=sha256:e49fbad205c0347b323803a08a46b1fecf4ec1d48cca69d1e743c4b7476fb582

Details:

Command: bun run test:fast -- packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
Result: pass (55 tests)
Evidence: c15433cc1f9595570ab3ab4dae6defea4caebd49; focused evaluator and verification regression suite
Scope: sealing lineage, exact dependency artifact blobs, RF-04 packet evidence

Command: bun run ci:contract
Result: pass
Evidence: RF-04 50 runs, 70/70 outcomes, 27/27 provider token cells, 170/170 scalar cells; lint, architecture, clone, Knip, and coverage guards passed
Scope: repository contract for c15433cc1f9595570ab3ab4dae6defea4caebd49

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291148-1F9GZD-formalize-sha-bound-qualification-packets-for-ev/.agentplane/tasks/202607291148-1F9GZD/blueprint/resolved-snapshot.json
- old_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
- current_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291148-1F9GZD

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

### 2026-07-29T13:57:35.756Z — VERIFY — ok

By: TESTER

Note: Verified 8a94a0a: qualification evidence traverses terminal dependency leaves.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T13:46:59.973Z, excerpt_hash=sha256:e49fbad205c0347b323803a08a46b1fecf4ec1d48cca69d1e743c4b7476fb582

Details:

Command: bun run test:fast -- packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
Result: pass (56 tests)
Evidence: 8a94a0a4b8c1026be5b1a51b8bc0e6c095eaf381; nested terminal leaf, missing-node, and cycle regressions
Scope: SHA-bound qualification packet, transitive dependency closure, RF-04 packet evidence

Command: bun run ci:contract
Result: pass
Evidence: RF-04 50 runs, 70/70 outcomes, 27/27 provider token cells, 170/170 scalar cells; lint, architecture, clone, Knip, and coverage guards passed
Scope: repository contract for 8a94a0a4b8c1026be5b1a51b8bc0e6c095eaf381

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291148-1F9GZD-formalize-sha-bound-qualification-packets-for-ev/.agentplane/tasks/202607291148-1F9GZD/blueprint/resolved-snapshot.json
- old_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
- current_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291148-1F9GZD

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

### 2026-07-29T14:19:04.724Z — VERIFY — ok

By: TESTER

Note: Verified SHA-bound dependency lifecycle packet on 28b541f8.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T13:57:36.535Z, excerpt_hash=sha256:e49fbad205c0347b323803a08a46b1fecf4ec1d48cca69d1e743c4b7476fb582

Details:

Command: bun run test:fast -- packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts
Result: pass (56 tests)
Evidence: 28b541f82687e465f36e5ecd50e98efdb806f85e; historical dependency lifecycle cannot be overridden by current DONE/ok state.
Scope: SHA-bound qualification packets, transitive terminal leaves, lifecycle and quality-report state at the reviewed implementation SHA.

Command: bun run ci:contract
Result: pass
Evidence: RF-04 replay 50 runs, 70/70 outcomes, 27/27 provider token cells, 170/170 scalar cells; architecture, lint, clone, knip, and coverage checks pass.
Scope: repository contract.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-evaluator-recovery-base-20260729/.agentplane/worktrees/202607291148-1F9GZD-formalize-sha-bound-qualification-packets-for-ev/.agentplane/tasks/202607291148-1F9GZD/blueprint/resolved-snapshot.json
- old_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
- current_digest: 1d103f73fa887ae7b0b43792c0c138dbd07b3de020062145eb0832324e88a391
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291148-1F9GZD

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

- Observation: The evaluator work order freezes a packet bound to the durable verification record SHA and hashes each required leaf artifact.
  Impact: The beta qualification evaluator can inspect deterministic, pre-existing evidence instead of inferring cross-task state from prose.
  Resolution: Verification accepted; proceed to independent evaluator review.
