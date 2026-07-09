---
id: "202607092207-MS2B7B"
title: "Make context extraction writes transactional for v0.6.22"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "patch-0.6.22"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/context/extraction-writer*.test.ts packages/agentplane/src/context/*extraction*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:56.138Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-09T23:32:36.592Z"
  updated_by: "CODER"
  note: "Verified: transactional staging, validation-failure safety, mid-promotion rollback, focused extraction tests, typecheck, and the full ci:contract gate all pass."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement transactional context extraction persistence with rollback and fault-injection coverage for v0.6.22."
events:
  -
    type: "status"
    at: "2026-07-09T23:16:44.875Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement transactional context extraction persistence with rollback and fault-injection coverage for v0.6.22."
  -
    type: "verify"
    at: "2026-07-09T23:32:36.592Z"
    author: "CODER"
    state: "ok"
    note: "Verified: transactional staging, validation-failure safety, mid-promotion rollback, focused extraction tests, typecheck, and the full ci:contract gate all pass."
doc_version: 3
doc_updated_at: "2026-07-09T23:32:36.821Z"
doc_updated_by: "CODER"
description: "Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure."
sections:
  Summary: |-
    Make context extraction writes transactional for v0.6.22

    Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure.
  Scope: |-
    - In scope: Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure.
    - Out of scope: unrelated refactors not required for "Make context extraction writes transactional for v0.6.22".
  Plan: |-
    1. Map every artifact written by the extraction apply path and define one staging transaction boundary.
    2. Write all outputs into a temporary transaction area, validate the complete set, then atomically promote it; restore the pre-run state on failure.
    3. Add fault-injection coverage for failure before and during promotion, including a multi-artifact topology case.
    4. Run focused tests, typecheck, and the full contract gate.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/context/extraction-writer*.test.ts packages/agentplane/src/context/*extraction*.test.ts`; partial-write and multi-artifact rollback cases pass.
    2. Force a validation or promotion failure in tests; no target artifact remains partially updated.
    3. Run `bun run typecheck`; it passes.
    4. Run `bun run ci:contract`; it passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-09T23:32:36.592Z — VERIFY — ok

    By: CODER

    Note: Verified: transactional staging, validation-failure safety, mid-promotion rollback, focused extraction tests, typecheck, and the full ci:contract gate all pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-09T23:16:44.875Z, excerpt_hash=sha256:060ac901f87b8a726303e0190173a1db8b727a71ce68c923697c716fc34aef6b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092207-MS2B7B-make-context-extraction-writes-transactional-for/.agentplane/tasks/202607092207-MS2B7B/blueprint/resolved-snapshot.json
    - old_digest: 0414733f0cd02288746d734010cdcec060bd11a5b8129524653c0e653db888b8
    - current_digest: 0414733f0cd02288746d734010cdcec060bd11a5b8129524653c0e653db888b8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092207-MS2B7B

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607092207-MS2B7B
    - diagnostic_command: agentplane pr check 202607092207-MS2B7B
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make context extraction writes transactional for v0.6.22

Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure.

## Scope

- In scope: Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure.
- Out of scope: unrelated refactors not required for "Make context extraction writes transactional for v0.6.22".

## Plan

1. Map every artifact written by the extraction apply path and define one staging transaction boundary.
2. Write all outputs into a temporary transaction area, validate the complete set, then atomically promote it; restore the pre-run state on failure.
3. Add fault-injection coverage for failure before and during promotion, including a multi-artifact topology case.
4. Run focused tests, typecheck, and the full contract gate.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/context/extraction-writer*.test.ts packages/agentplane/src/context/*extraction*.test.ts`; partial-write and multi-artifact rollback cases pass.
2. Force a validation or promotion failure in tests; no target artifact remains partially updated.
3. Run `bun run typecheck`; it passes.
4. Run `bun run ci:contract`; it passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-09T23:32:36.592Z — VERIFY — ok

By: CODER

Note: Verified: transactional staging, validation-failure safety, mid-promotion rollback, focused extraction tests, typecheck, and the full ci:contract gate all pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-09T23:16:44.875Z, excerpt_hash=sha256:060ac901f87b8a726303e0190173a1db8b727a71ce68c923697c716fc34aef6b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092207-MS2B7B-make-context-extraction-writes-transactional-for/.agentplane/tasks/202607092207-MS2B7B/blueprint/resolved-snapshot.json
- old_digest: 0414733f0cd02288746d734010cdcec060bd11a5b8129524653c0e653db888b8
- current_digest: 0414733f0cd02288746d734010cdcec060bd11a5b8129524653c0e653db888b8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092207-MS2B7B

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607092207-MS2B7B
- diagnostic_command: agentplane pr check 202607092207-MS2B7B
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
