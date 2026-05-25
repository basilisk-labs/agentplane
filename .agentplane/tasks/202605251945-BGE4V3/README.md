---
id: "202605251945-BGE4V3"
title: "Normalize stale branch_pr integration queue entries"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-25T19:46:59.166Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-25T19:55:01.436Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts; Result: pass; Evidence: 2 files, 15 tests passed. Command: bunx vitest run packages/agentplane/src/commands/integrate-queue.spec.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts; Result: pass; Evidence: 2 files, 9 tests passed. Command: ap integrate queue list after rebuild; Result: pass; Evidence: stale DONE queue entries normalized, output: No integration queue entries found. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK, errors=0 warnings=0. Extra checks: bun run --filter=agentplane typecheck and prettier --check passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-25T19:57:37.902Z"
  updated_by: "EVALUATOR"
  note: "Queue hygiene change is scoped to terminal stale integration queue entries and keeps claimed lanes protected."
  evaluated_sha: "af745d9e203b9eb289c6a6c3298e3436ba08f982"
  blueprint_digest: "f2497afc7acd18280ff4d74040ed27c3edc57db1b309c276a4fb43c853be6105"
  evidence_refs:
    - ".agentplane/tasks/202605251945-BGE4V3/README.md"
    - ".agentplane/tasks/202605251945-BGE4V3/quality/20260525-195737902-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605251945-BGE4V3/quality/20260525-195737902-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605251945-BGE4V3/quality/20260525-195737902-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605251945-BGE4V3/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/integrate-queue.command.ts"
    - "packages/agentplane/src/commands/integrate-queue-recovery.ts"
    - "packages/agentplane/src/commands/integrate-queue-recovery.test.ts"
    - "bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts"
    - "ap doctor"
  findings:
    - "PASS: integrate queue list now normalizes non-claimed DONE task entries to done before rendering, and keeps claimed active lanes out of automatic terminal recovery."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement branch_pr integration queue hygiene in the dedicated worktree, limiting scope to stale terminal queue normalization and focused tests."
events:
  -
    type: "status"
    at: "2026-05-25T19:51:34.132Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement branch_pr integration queue hygiene in the dedicated worktree, limiting scope to stale terminal queue normalization and focused tests."
  -
    type: "verify"
    at: "2026-05-25T19:55:01.436Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts; Result: pass; Evidence: 2 files, 15 tests passed. Command: bunx vitest run packages/agentplane/src/commands/integrate-queue.spec.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts; Result: pass; Evidence: 2 files, 9 tests passed. Command: ap integrate queue list after rebuild; Result: pass; Evidence: stale DONE queue entries normalized, output: No integration queue entries found. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK, errors=0 warnings=0. Extra checks: bun run --filter=agentplane typecheck and prettier --check passed."
doc_version: 3
doc_updated_at: "2026-05-25T19:55:01.488Z"
doc_updated_by: "CODER"
description: "Make branch_pr integration queue listing recover terminal stale entries so DONE tasks no longer remain visible as queued work. Scope is limited to queue hygiene logic and focused tests."
sections:
  Summary: |-
    Normalize stale branch_pr integration queue entries

    Make branch_pr integration queue listing recover terminal stale entries so DONE tasks no longer remain visible as queued work. Scope is limited to queue hygiene logic and focused tests.
  Scope: |-
    - In scope: Make branch_pr integration queue listing recover terminal stale entries so DONE tasks no longer remain visible as queued work. Scope is limited to queue hygiene logic and focused tests.
    - Out of scope: unrelated refactors not required for "Normalize stale branch_pr integration queue entries".
  Plan: "1. Add a branch_pr integration queue normalization path that can mark terminal stale non-done entries as done using existing route/PR/close-tail truth. 2. Apply it to queue listing so operators do not see already-DONE tasks as queued work. 3. Cover terminal DONE normalization and non-terminal preservation with focused unit tests. 4. Verify targeted queue tests, routing policy check, and doctor."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts`. Expected: pass; covers queue terminal recovery decision behavior and queue state invariants.
    2. Run `bunx vitest run packages/agentplane/src/commands/integrate-queue.spec.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts`. Expected: pass; covers queue CLI parsing plus stale terminal recovery behavior.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: `policy routing OK`.
    4. Run `ap doctor`. Expected: pass or only unrelated pre-existing warnings, with no new branch_pr queue hygiene errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-25T19:55:01.436Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts; Result: pass; Evidence: 2 files, 15 tests passed. Command: bunx vitest run packages/agentplane/src/commands/integrate-queue.spec.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts; Result: pass; Evidence: 2 files, 9 tests passed. Command: ap integrate queue list after rebuild; Result: pass; Evidence: stale DONE queue entries normalized, output: No integration queue entries found. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK, errors=0 warnings=0. Extra checks: bun run --filter=agentplane typecheck and prettier --check passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T19:51:34.132Z, excerpt_hash=sha256:5394cf786918d2657bd4c66ba0344a7e538cc12b4cac311605ce06ce3afce301

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251945-BGE4V3-normalize-integration-queue/.agentplane/tasks/202605251945-BGE4V3/blueprint/resolved-snapshot.json
    - old_digest: f2497afc7acd18280ff4d74040ed27c3edc57db1b309c276a4fb43c853be6105
    - current_digest: f2497afc7acd18280ff4d74040ed27c3edc57db1b309c276a4fb43c853be6105
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605251945-BGE4V3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Normalize stale branch_pr integration queue entries

Make branch_pr integration queue listing recover terminal stale entries so DONE tasks no longer remain visible as queued work. Scope is limited to queue hygiene logic and focused tests.

## Scope

- In scope: Make branch_pr integration queue listing recover terminal stale entries so DONE tasks no longer remain visible as queued work. Scope is limited to queue hygiene logic and focused tests.
- Out of scope: unrelated refactors not required for "Normalize stale branch_pr integration queue entries".

## Plan

1. Add a branch_pr integration queue normalization path that can mark terminal stale non-done entries as done using existing route/PR/close-tail truth. 2. Apply it to queue listing so operators do not see already-DONE tasks as queued work. 3. Cover terminal DONE normalization and non-terminal preservation with focused unit tests. 4. Verify targeted queue tests, routing policy check, and doctor.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts`. Expected: pass; covers queue terminal recovery decision behavior and queue state invariants.
2. Run `bunx vitest run packages/agentplane/src/commands/integrate-queue.spec.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts`. Expected: pass; covers queue CLI parsing plus stale terminal recovery behavior.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: `policy routing OK`.
4. Run `ap doctor`. Expected: pass or only unrelated pre-existing warnings, with no new branch_pr queue hygiene errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-25T19:55:01.436Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts; Result: pass; Evidence: 2 files, 15 tests passed. Command: bunx vitest run packages/agentplane/src/commands/integrate-queue.spec.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts; Result: pass; Evidence: 2 files, 9 tests passed. Command: ap integrate queue list after rebuild; Result: pass; Evidence: stale DONE queue entries normalized, output: No integration queue entries found. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK, errors=0 warnings=0. Extra checks: bun run --filter=agentplane typecheck and prettier --check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T19:51:34.132Z, excerpt_hash=sha256:5394cf786918d2657bd4c66ba0344a7e538cc12b4cac311605ce06ce3afce301

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251945-BGE4V3-normalize-integration-queue/.agentplane/tasks/202605251945-BGE4V3/blueprint/resolved-snapshot.json
- old_digest: f2497afc7acd18280ff4d74040ed27c3edc57db1b309c276a4fb43c853be6105
- current_digest: f2497afc7acd18280ff4d74040ed27c3edc57db1b309c276a4fb43c853be6105
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605251945-BGE4V3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
