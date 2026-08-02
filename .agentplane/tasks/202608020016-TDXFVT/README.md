---
id: "202608020016-TDXFVT"
title: "Preserve evaluator work units across base-sync merges"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "bugfix"
  - "evaluator"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T00:16:35.930Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-02T00:25:39.006Z"
  updated_by: "TESTER"
  note: "Merge-aware evaluator packet regression and compatibility checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-02T00:29:47.022Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "3d3129f30832f6dab30d64d0bf6c0e8755aeb8c3"
  blueprint_digest: "d4366b001e684e8df76d3b8d527cf4dfec91eee2c0a506bb4d3a515d734f9d4c"
  evidence_refs:
    - ".agentplane/tasks/202608020016-TDXFVT/quality/20260802-002914710-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608020016-TDXFVT/quality/20260802-002914710-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608020016-TDXFVT/quality/20260802-002914710-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608020016-TDXFVT/quality/20260802-002914710-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608020016-TDXFVT/quality/20260802-002914710-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608020016-TDXFVT/README.md"
    - ".agentplane/tasks/202608020016-TDXFVT/quality/20260802-002914710-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608020016-TDXFVT/quality/20260802-002914710-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608020016-TDXFVT/verification/20260802002539006-c06b0678e1fb29bf.json"
    - ".agentplane/tasks/202608020016-TDXFVT/quality/20260802-002914710-recovery-context/evaluator-blueprint.json"
  findings:
    - "Hosted integration required by the approved plan is not represented in the frozen verification record."
commit:
  hash: "3d3129f30832f6dab30d64d0bf6c0e8755aeb8c3"
  message: "🐛 TDXFVT evaluator: preserve base-sync work units"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: merge-aware evaluator target selection now preserves the task diff and SHA-bound verification after base-sync merges."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-02T00:17:10.217Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T00:25:20.752Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: merge-aware evaluator target selection now preserves the task diff and SHA-bound verification after base-sync merges."
  -
    type: "verify"
    at: "2026-08-02T00:25:39.006Z"
    author: "TESTER"
    state: "ok"
    note: "Merge-aware evaluator packet regression and compatibility checks passed."
  -
    type: "status"
    at: "2026-08-02T00:30:30.292Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-02T00:30:30.293Z"
doc_updated_by: "CODER"
description: "Fix branch_pr evaluator packet preparation so a merge of current main into a task branch preserves the committed task work unit, actual diff, and matching verification records instead of freezing an empty packet. Add focused regression coverage for merge-aware target selection."
sections:
  Summary: |-
    Preserve evaluator work units across base-sync merges

    Fix branch_pr evaluator packet preparation so a merge of current main into a task branch preserves the committed task work unit, actual diff, and matching verification records instead of freezing an empty packet. Add focused regression coverage for merge-aware target selection.
  Scope: |-
    - In scope: make branch_pr semantic review target selection merge-aware for base-sync merges; preserve the actual task diff and current verification records; add focused regression tests.
    - Out of scope: evaluator prompt/rubric changes, provider behavior changes, unrelated lifecycle refactors.
  Plan: |-
    1. Reproduce the empty evaluator packet with a branch_pr base-sync merge fixture.
    2. Make quality-review target resolution recognize a merge whose non-first-parent comparison contains the current task work unit.
    3. Prove the actual diff and verification record remain bound to the merge head while unrelated/lifecycle-only behavior remains unchanged.
    4. Run focused tests, typecheck, evaluator quality review, and hosted integration.
  Verify Steps: |-
    1. Run focused quality-target and evaluator evidence tests. Expected: a task branch that merges updated base history freezes the merge commit as evaluated_sha, the actual task patch, and the matching SHA-bound verification record.
    2. Run evaluator command tests and repository typecheck. Expected: existing metadata-only, lifecycle-only, batch, and direct-mode target semantics remain green.
    3. Inspect the final diff against main. Expected: only merge-aware target selection and focused tests plus task-local evidence are changed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-02T00:25:39.006Z — VERIFY — ok

    By: TESTER

    Note: Merge-aware evaluator packet regression and compatibility checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T00:25:20.752Z, excerpt_hash=sha256:04a114f897859dcb74e1397d85f2228b064cb0ebcce6c9a9e2802fbdaebe5b4e

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts
    Result: pass
    Evidence: 2 test files and 22 tests passed; the base-sync fixture froze the merge head, actual task diff, and matching verification record.
    Scope: merge-aware review-target and evaluator evidence behavior.

    Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts
    Result: pass
    Evidence: 1 test file and 20 evaluator command tests passed.
    Scope: evaluator command compatibility.

    Command: bun run typecheck
    Result: pass
    Evidence: native TypeScript build completed without diagnostics.
    Scope: repository type surface.

    Command: bun run format:check
    Result: pass
    Evidence: all matched files use Prettier code style.
    Scope: repository formatting.

    Command: git diff --check
    Result: pass
    Evidence: no whitespace errors were reported.
    Scope: committed implementation diff.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608020016-TDXFVT-preserve-evaluator-work-units-across-base-sync-m/.agentplane/tasks/202608020016-TDXFVT/blueprint/resolved-snapshot.json
    - old_digest: d4366b001e684e8df76d3b8d527cf4dfec91eee2c0a506bb4d3a515d734f9d4c
    - current_digest: d4366b001e684e8df76d3b8d527cf4dfec91eee2c0a506bb4d3a515d734f9d4c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608020016-TDXFVT

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608020016-TDXFVT
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "5d4a8de1a96bc29e13012ce01bfc65661ff5fa19"
    version: 1
id_source: "generated"
---
## Summary

Preserve evaluator work units across base-sync merges

Fix branch_pr evaluator packet preparation so a merge of current main into a task branch preserves the committed task work unit, actual diff, and matching verification records instead of freezing an empty packet. Add focused regression coverage for merge-aware target selection.

## Scope

- In scope: make branch_pr semantic review target selection merge-aware for base-sync merges; preserve the actual task diff and current verification records; add focused regression tests.
- Out of scope: evaluator prompt/rubric changes, provider behavior changes, unrelated lifecycle refactors.

## Plan

1. Reproduce the empty evaluator packet with a branch_pr base-sync merge fixture.
2. Make quality-review target resolution recognize a merge whose non-first-parent comparison contains the current task work unit.
3. Prove the actual diff and verification record remain bound to the merge head while unrelated/lifecycle-only behavior remains unchanged.
4. Run focused tests, typecheck, evaluator quality review, and hosted integration.

## Verify Steps

1. Run focused quality-target and evaluator evidence tests. Expected: a task branch that merges updated base history freezes the merge commit as evaluated_sha, the actual task patch, and the matching SHA-bound verification record.
2. Run evaluator command tests and repository typecheck. Expected: existing metadata-only, lifecycle-only, batch, and direct-mode target semantics remain green.
3. Inspect the final diff against main. Expected: only merge-aware target selection and focused tests plus task-local evidence are changed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-02T00:25:39.006Z — VERIFY — ok

By: TESTER

Note: Merge-aware evaluator packet regression and compatibility checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T00:25:20.752Z, excerpt_hash=sha256:04a114f897859dcb74e1397d85f2228b064cb0ebcce6c9a9e2802fbdaebe5b4e

Details:

Command: bunx vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-runtime-evidence.test.ts
Result: pass
Evidence: 2 test files and 22 tests passed; the base-sync fixture froze the merge head, actual task diff, and matching verification record.
Scope: merge-aware review-target and evaluator evidence behavior.

Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts
Result: pass
Evidence: 1 test file and 20 evaluator command tests passed.
Scope: evaluator command compatibility.

Command: bun run typecheck
Result: pass
Evidence: native TypeScript build completed without diagnostics.
Scope: repository type surface.

Command: bun run format:check
Result: pass
Evidence: all matched files use Prettier code style.
Scope: repository formatting.

Command: git diff --check
Result: pass
Evidence: no whitespace errors were reported.
Scope: committed implementation diff.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608020016-TDXFVT-preserve-evaluator-work-units-across-base-sync-m/.agentplane/tasks/202608020016-TDXFVT/blueprint/resolved-snapshot.json
- old_digest: d4366b001e684e8df76d3b8d527cf4dfec91eee2c0a506bb4d3a515d734f9d4c
- current_digest: d4366b001e684e8df76d3b8d527cf4dfec91eee2c0a506bb4d3a515d734f9d4c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608020016-TDXFVT

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608020016-TDXFVT
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
