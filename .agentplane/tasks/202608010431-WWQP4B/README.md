---
id: "202608010431-WWQP4B"
title: "Bound evaluator review packets to implementation evidence"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "evaluator"
  - "performance"
  - "rf-26"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run guards:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T04:32:56.468Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T04:39:45.244Z"
  updated_by: "TESTER"
  note: "Verified bounded evaluator evidence repair at a6b5051e7: focused evaluator suite 31/31, critical CLI 77/77, typecheck, schemas, guards/trust ratchet, lifecycle 8/8, Knip, lint, format, and diff checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T07:52:03.614Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "a6b5051e73fdbbcd59fce21ee4be58833775e0f5"
  blueprint_digest: "636a8dcbfd32efc90e7ff96d659bce2e3bf154b9bd72a551263b5492de4c1abf"
  evidence_refs:
    - ".agentplane/tasks/202608010431-WWQP4B/quality/20260801-075112549-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608010431-WWQP4B/quality/20260801-075112549-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608010431-WWQP4B/quality/20260801-075112549-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608010431-WWQP4B/quality/20260801-075112549-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608010431-WWQP4B/quality/20260801-075112549-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608010431-WWQP4B/README.md"
    - ".agentplane/tasks/202608010431-WWQP4B/quality/20260801-075112549-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608010431-WWQP4B/quality/20260801-075112549-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608010431-WWQP4B/quality/20260801-075112549-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The implementation matches the approved bounded-diff contract: it excludes only the active task artifact subtree while retaining source, binary, rename, and unrelated-task changes."
commit:
  hash: "7f77c56b3e4de624d1b7ab9bc4ad9cb74d537cff"
  message: "🧾 WWQP4B task: preserve prepared quality review"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: active-task generated artifacts are excluded from actual_diff while implementation and other-task deltas remain. YD5J89 measurement dropped from 6,043 lines/277,075 bytes to 4,306 lines/194,186 bytes; focused and full local gates passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-01T04:33:32.535Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T04:39:10.247Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: active-task generated artifacts are excluded from actual_diff while implementation and other-task deltas remain. YD5J89 measurement dropped from 6,043 lines/277,075 bytes to 4,306 lines/194,186 bytes; focused and full local gates passed."
  -
    type: "verify"
    at: "2026-08-01T04:39:45.244Z"
    author: "TESTER"
    state: "ok"
    note: "Verified bounded evaluator evidence repair at a6b5051e7: focused evaluator suite 31/31, critical CLI 77/77, typecheck, schemas, guards/trust ratchet, lifecycle 8/8, Knip, lint, format, and diff checks passed."
  -
    type: "status"
    at: "2026-08-01T07:52:46.259Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-01T07:52:46.259Z"
doc_updated_by: "CODER"
description: "Fix the measured evaluator timeout by excluding the active task's generated control artifacts from actual_diff while preserving the task document, blueprint, observed checks, policy, and complete implementation delta as separately digest-verified evidence."
sections:
  Summary: |-
    Bound evaluator review packets to implementation evidence

    Fix the measured evaluator timeout by excluding the active task's generated control artifacts from actual_diff while preserving the task document, blueprint, observed checks, policy, and complete implementation delta as separately digest-verified evidence.
  Scope: |-
    - In scope: change evaluator actual_diff preparation so the active task artifact subtree is excluded from the patch because task README, blueprint, observed checks, and policy are already separate digest-verified evidence; add regression coverage for generated README/blueprint/pr/verification/quality artifacts and preserve implementation plus unrelated-task changes.
    - In scope: record before/after line and byte counts on the YD5J89 review surface.
    - Out of scope: changing evaluator verdict rules, provider selection, frozen digest validation, or excluding another task's intentional artifacts.
  Plan: |-
    1. Reproduce the oversized actual_diff against the YD5J89 branch and record line/byte composition.
    2. Change renderActualDiff to exclude the complete active task artifact subtree while retaining the full implementation delta and any other-task artifacts.
    3. Extend focused fixtures for README, blueprint, PR, verification, quality, source, rename, binary, and other-task changes.
    4. Measure the compacted surface and run focused tests, typecheck, guards, and diff checks.
    5. Record residual risk and route the bounded repair through independent quality review and hosted integration.
  Verify Steps: |-
    1. Run the focused evaluator diff/review suite. Expected: active-task generated artifacts are absent from actual_diff, source changes and other-task changes remain, and frozen digest validation still passes.
    2. Rebuild the YD5J89-style review surface before and after the change. Expected: exact line/byte counts decrease without removing task_document, blueprint, observed_checks, or policy evidence.
    3. Run typecheck and guards. Expected: no schema, trust-boundary, or lifecycle regression.
    4. Run git diff --check and inspect the final task scope. Expected: only evaluator evidence preparation, focused tests, and task artifacts changed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T04:39:45.244Z — VERIFY — ok

    By: TESTER

    Note: Verified bounded evaluator evidence repair at a6b5051e7: focused evaluator suite 31/31, critical CLI 77/77, typecheck, schemas, guards/trust ratchet, lifecycle 8/8, Knip, lint, format, and diff checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T04:39:10.247Z, excerpt_hash=sha256:d45cd28a705b78674e597411823cb544ffe42b1af95af87368e653e743d421fa

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608010431-WWQP4B-bound-evaluator-review-packets-to-implementation/.agentplane/tasks/202608010431-WWQP4B/blueprint/resolved-snapshot.json
    - old_digest: 636a8dcbfd32efc90e7ff96d659bce2e3bf154b9bd72a551263b5492de4c1abf
    - current_digest: 636a8dcbfd32efc90e7ff96d659bce2e3bf154b9bd72a551263b5492de4c1abf
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608010431-WWQP4B

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608010431-WWQP4B
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the evaluator diff-filter commit.
    - Re-run focused evaluator review tests and guards.
    - Existing frozen work orders remain valid because their digests and files are immutable.
  Findings: |-
    - Observation: Two independent read-only Claude evaluator attempts against the frozen YD5J89 packet produced no terminal output within 20 minutes. The exact actual_diff was 6,043 lines and 277,075 bytes; 1,737 lines and 82,889 bytes were generated artifacts under the active task subtree that duplicated separately frozen task, blueprint, and verification evidence.
      Impact: Provider substitution alone did not unblock the quality gate, and repeated review artifacts increased evaluator latency and token pressure without adding implementation evidence.
      Resolution: Exclude only the active task artifact subtree from actual_diff while preserving the full implementation delta and artifacts of other tasks. The measured YD5J89 surface becomes 4,306 lines and 194,186 bytes, a 28.7% line and 29.9% byte reduction.

    - Observation: The exact YD5J89 review surface shrinks from 6,043 lines/277,075 bytes to 4,306 lines/194,186 bytes while tests preserve source, binary, rename, and other-task artifact changes.
      Impact: Evaluator receives 28.7% fewer diff lines and 29.9% fewer bytes without losing separately digest-verified task, blueprint, observed-check, or policy evidence.
      Resolution: Exclude only the active task artifact subtree from actual_diff; keep all other branch delta and frozen evidence contracts unchanged.
extensions:
  implementation_commit:
    hash: "a6b5051e73fdbbcd59fce21ee4be58833775e0f5"
    message: "♻️ WWQP4B task: bound evaluator implementation evidence"
  workflow_route_baseline:
    start_head_sha: "56bb919419e198f3ecfd1a074358e6ead81deaa7"
    version: 1
id_source: "generated"
---
## Summary

Bound evaluator review packets to implementation evidence

Fix the measured evaluator timeout by excluding the active task's generated control artifacts from actual_diff while preserving the task document, blueprint, observed checks, policy, and complete implementation delta as separately digest-verified evidence.

## Scope

- In scope: change evaluator actual_diff preparation so the active task artifact subtree is excluded from the patch because task README, blueprint, observed checks, and policy are already separate digest-verified evidence; add regression coverage for generated README/blueprint/pr/verification/quality artifacts and preserve implementation plus unrelated-task changes.
- In scope: record before/after line and byte counts on the YD5J89 review surface.
- Out of scope: changing evaluator verdict rules, provider selection, frozen digest validation, or excluding another task's intentional artifacts.

## Plan

1. Reproduce the oversized actual_diff against the YD5J89 branch and record line/byte composition.
2. Change renderActualDiff to exclude the complete active task artifact subtree while retaining the full implementation delta and any other-task artifacts.
3. Extend focused fixtures for README, blueprint, PR, verification, quality, source, rename, binary, and other-task changes.
4. Measure the compacted surface and run focused tests, typecheck, guards, and diff checks.
5. Record residual risk and route the bounded repair through independent quality review and hosted integration.

## Verify Steps

1. Run the focused evaluator diff/review suite. Expected: active-task generated artifacts are absent from actual_diff, source changes and other-task changes remain, and frozen digest validation still passes.
2. Rebuild the YD5J89-style review surface before and after the change. Expected: exact line/byte counts decrease without removing task_document, blueprint, observed_checks, or policy evidence.
3. Run typecheck and guards. Expected: no schema, trust-boundary, or lifecycle regression.
4. Run git diff --check and inspect the final task scope. Expected: only evaluator evidence preparation, focused tests, and task artifacts changed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T04:39:45.244Z — VERIFY — ok

By: TESTER

Note: Verified bounded evaluator evidence repair at a6b5051e7: focused evaluator suite 31/31, critical CLI 77/77, typecheck, schemas, guards/trust ratchet, lifecycle 8/8, Knip, lint, format, and diff checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T04:39:10.247Z, excerpt_hash=sha256:d45cd28a705b78674e597411823cb544ffe42b1af95af87368e653e743d421fa

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608010431-WWQP4B-bound-evaluator-review-packets-to-implementation/.agentplane/tasks/202608010431-WWQP4B/blueprint/resolved-snapshot.json
- old_digest: 636a8dcbfd32efc90e7ff96d659bce2e3bf154b9bd72a551263b5492de4c1abf
- current_digest: 636a8dcbfd32efc90e7ff96d659bce2e3bf154b9bd72a551263b5492de4c1abf
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608010431-WWQP4B

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608010431-WWQP4B
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the evaluator diff-filter commit.
- Re-run focused evaluator review tests and guards.
- Existing frozen work orders remain valid because their digests and files are immutable.

## Findings

- Observation: Two independent read-only Claude evaluator attempts against the frozen YD5J89 packet produced no terminal output within 20 minutes. The exact actual_diff was 6,043 lines and 277,075 bytes; 1,737 lines and 82,889 bytes were generated artifacts under the active task subtree that duplicated separately frozen task, blueprint, and verification evidence.
  Impact: Provider substitution alone did not unblock the quality gate, and repeated review artifacts increased evaluator latency and token pressure without adding implementation evidence.
  Resolution: Exclude only the active task artifact subtree from actual_diff while preserving the full implementation delta and artifacts of other tasks. The measured YD5J89 surface becomes 4,306 lines and 194,186 bytes, a 28.7% line and 29.9% byte reduction.

- Observation: The exact YD5J89 review surface shrinks from 6,043 lines/277,075 bytes to 4,306 lines/194,186 bytes while tests preserve source, binary, rename, and other-task artifact changes.
  Impact: Evaluator receives 28.7% fewer diff lines and 29.9% fewer bytes without losing separately digest-verified task, blueprint, observed-check, or policy evidence.
  Resolution: Exclude only the active task artifact subtree from actual_diff; keep all other branch delta and frozen evidence contracts unchanged.
