---
id: "202607100435-A932SP"
title: "Release integration lane after pre-merge Hosted Close"
result_summary: "hardened pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 17
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "hosted-close"
  - "integration-queue"
  - "release-0.6.22"
verify:
  - "bun run ci:contract"
  - "bun run lint:core"
  - "bun run test:fast"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T04:36:15.736Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T09:26:59.847Z"
  updated_by: "TESTER"
  note: "Verified review hardening at 3fcc7b0: same Hosted Close task/marker/basis validation, focused 4 files/21 tests, typecheck, lint:core, Knip 574/574, ci:contract, and full fast 364 files/2150 tests passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T09:27:01.572Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed after CI and inline-review rework."
  evaluated_sha: "4963d4af67be3ab696c5b78cfe321ea2d93cd2de"
  blueprint_digest: "964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611"
  evidence_refs:
    - ".agentplane/tasks/202607100435-A932SP/README.md"
    - ".agentplane/tasks/202607100435-A932SP/quality/20260710-092701572-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607100435-A932SP/quality/20260710-092701572-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607100435-A932SP/quality/20260710-092701572-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings; queue release now reuses Hosted Close closure and basis validation."
commit:
  hash: "4963d4af67be3ab696c5b78cfe321ea2d93cd2de"
  message: "🐛 A932SP integration-queue: validate pre-close basis before release"
comments:
  -
    author: "CODER"
    body: "Start: make queue recovery treat a successful no-op Hosted Close with a valid pre-merge closure packet as terminal after protected-main merge."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: CI and review rework completed; refreshed pre-merge closure packet is ready."
events:
  -
    type: "status"
    at: "2026-07-10T04:36:53.015Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make queue recovery treat a successful no-op Hosted Close with a valid pre-merge closure packet as terminal after protected-main merge."
  -
    type: "verify"
    at: "2026-07-10T09:00:21.889Z"
    author: "TESTER"
    state: "ok"
    note: "Matching merged pre-merge closure accepted; open/mismatched evidence rejected. Focused 3 files/12 tests, typecheck, lint:core, ci:contract, routing check, doctor, and full fast 364 files/2150 tests passed. Live queue release proof will use the next merged task after this change lands."
  -
    type: "verify"
    at: "2026-07-10T09:02:16.777Z"
    author: "TESTER"
    state: "ok"
    note: "Verified current implementation head 0d24f754: focused 3 files/12 tests, typecheck, lint:core, ci:contract, routing check, doctor, and full fast 364 files/2150 tests passed. Live queue release proof will use the next merged task after this change lands."
  -
    type: "status"
    at: "2026-07-10T09:06:23.307Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-10T09:15:22.716Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Hosted verify-static found a stale Knip baseline entry because the new test imported RemotePrStatus directly; keep the helper signature structurally minimal and infer the test fixture type instead."
  -
    type: "verify"
    at: "2026-07-10T09:17:53.837Z"
    author: "TESTER"
    state: "ok"
    note: "Verified CI repair at 23be64c: Knip baseline 574/574, focused 3 files/12 tests, typecheck, ci:contract, and full fast 364 files/2150 tests passed."
  -
    type: "verify"
    at: "2026-07-10T09:24:23.963Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Review thread identified missing task-closure and basis/head validation before queue release; implement the same validation contract as Hosted Close."
  -
    type: "verify"
    at: "2026-07-10T09:26:59.847Z"
    author: "TESTER"
    state: "ok"
    note: "Verified review hardening at 3fcc7b0: same Hosted Close task/marker/basis validation, focused 4 files/21 tests, typecheck, lint:core, Knip 574/574, ci:contract, and full fast 364 files/2150 tests passed."
  -
    type: "status"
    at: "2026-07-10T09:27:40.354Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: CI and review rework completed; refreshed pre-merge closure packet is ready."
doc_version: 3
doc_updated_at: "2026-07-10T09:27:40.355Z"
doc_updated_by: "CODER"
description: "For v0.6.22, let integration queue recovery treat a merged PR with a valid pre-merge closure packet and successful no-op Hosted Close as terminal, so the handoff lane releases automatically after protected-main rebase."
sections:
  Summary: |-
    Release integration lane after pre-merge Hosted Close

    For v0.6.22, let integration queue recovery treat a merged PR with a valid pre-merge closure packet and successful no-op Hosted Close as terminal, so the handoff lane releases automatically after protected-main rebase.
  Scope: |-
    - In scope: For v0.6.22, let integration queue recovery treat a merged PR with a valid pre-merge closure packet and successful no-op Hosted Close as terminal, so the handoff lane releases automatically after protected-main rebase.
    - Out of scope: unrelated refactors not required for "Release integration lane after pre-merge Hosted Close".
  Plan: |-
    1. Reproduce a handoff entry after a protected-main rebase where the PR is MERGED, the task carries a valid pre-merge closure packet, and Hosted Close is a successful no-op.
    2. Extend close-tail/recovery evidence so this state releases the lane as done without requiring a redundant close-tail PR.
    3. Preserve waiting for genuinely incomplete merged tasks and rework handling for closed or missing PRs.
    4. Add the task id to the v0.6.22 plan and release dependencies.
    5. Run focused queue tests, typecheck, lint:core, ci:contract, full fast, and a live queue lifecycle proof.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/pr/flow-status.pre-merge.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts`. Expected: matching merged closure evidence is accepted while open and mismatched PR evidence is rejected, and queue recovery stays green.
    2. Run `bun run typecheck`. Expected: TypeScript contracts remain valid.
    3. Run `bun run lint:core`. Expected: core lint passes.
    4. Run `bun run ci:contract`. Expected: public CLI and repository contracts remain unchanged.
    5. Run `bun run test:fast`. Expected: the full fast regression suite passes.
    6. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    7. Run `ap doctor`. Expected: no new release-blocking diagnostics appear.
    8. Merge this task through the integration queue, complete Hosted Close, pull `main`, then run `ap integrate queue show --json`. Expected: a subsequent merged task with matching pre-merge closure evidence releases from `handoff` without manual `queue release`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T09:00:21.889Z — VERIFY — ok

    By: TESTER

    Note: Matching merged pre-merge closure accepted; open/mismatched evidence rejected. Focused 3 files/12 tests, typecheck, lint:core, ci:contract, routing check, doctor, and full fast 364 files/2150 tests passed. Live queue release proof will use the next merged task after this change lands.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T04:36:53.015Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
    - old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100435-A932SP

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607100435-A932SP
    - diagnostic_command: agentplane pr check 202607100435-A932SP
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-10T09:02:16.777Z — VERIFY — ok

    By: TESTER

    Note: Verified current implementation head 0d24f754: focused 3 files/12 tests, typecheck, lint:core, ci:contract, routing check, doctor, and full fast 364 files/2150 tests passed. Live queue release proof will use the next merged task after this change lands.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:00:22.054Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
    - old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100435-A932SP

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607100435-A932SP
    - diagnostic_command: agentplane pr check 202607100435-A932SP
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-10T09:15:22.716Z — VERIFY — needs_rework

    By: TESTER

    Note: Hosted verify-static found a stale Knip baseline entry because the new test imported RemotePrStatus directly; keep the helper signature structurally minimal and infer the test fixture type instead.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:06:23.308Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
    - old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100435-A932SP

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607100435-A932SP --branch task/202607100435-A932SP/release-lane-after-premerge-hosted-close
    - diagnostic_command: agentplane pr check 202607100435-A932SP
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-10T09:17:53.837Z — VERIFY — ok

    By: TESTER

    Note: Verified CI repair at 23be64c: Knip baseline 574/574, focused 3 files/12 tests, typecheck, ci:contract, and full fast 364 files/2150 tests passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:15:23.991Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
    - old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100435-A932SP

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607100435-A932SP --branch task/202607100435-A932SP/release-lane-after-premerge-hosted-close
    - diagnostic_command: agentplane pr check 202607100435-A932SP
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-10T09:24:23.963Z — VERIFY — needs_rework

    By: TESTER

    Note: Review thread identified missing task-closure and basis/head validation before queue release; implement the same validation contract as Hosted Close.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:17:54.061Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
    - old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100435-A932SP

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607100435-A932SP --branch task/202607100435-A932SP/release-lane-after-premerge-hosted-close
    - diagnostic_command: agentplane pr check 202607100435-A932SP
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-10T09:26:59.847Z — VERIFY — ok

    By: TESTER

    Note: Verified review hardening at 3fcc7b0: same Hosted Close task/marker/basis validation, focused 4 files/21 tests, typecheck, lint:core, Knip 574/574, ci:contract, and full fast 364 files/2150 tests passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:24:24.185Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
    - old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100435-A932SP

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607100435-A932SP --branch task/202607100435-A932SP/release-lane-after-premerge-hosted-close
    - diagnostic_command: agentplane pr check 202607100435-A932SP
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Protected-main rebase rewrites the implementation commit, so ancestry-only close-tail detection misses valid pre-merge closure evidence.
      Impact: A successful Hosted Close can leave the integration lane in handoff until an operator manually releases it.
      Resolution: Flow status now recognizes only a MERGED PR whose pre-merge closure marker matches the task branch and, when present, the PR number.

    - Observation: GitHub verify-static failed on a stale Knip baseline entry for RemotePrStatus.
      Impact: PR #4568 cannot merge while aggregate PR verification is red.
      Resolution: Remove the test-only RemotePrStatus import and keep the exported helper signature independent of that baseline-tracked type.

    - Observation: Branch/PR identity alone could accept a stale pre-merge marker.
      Impact: Queue recovery could release a handoff without terminal close evidence.
      Resolution: Require DONE task evidence plus Hosted Close branch/PR and basis-ancestor validation before recorded_on_base.
extensions:
  implementation_commit:
    hash: "58a98a88ccb78e4d4e40db068db7ea5b3da43e29"
    message: "🐛 A932SP integration-queue: release merged pre-close handoff"
id_source: "generated"
---
## Summary

Release integration lane after pre-merge Hosted Close

For v0.6.22, let integration queue recovery treat a merged PR with a valid pre-merge closure packet and successful no-op Hosted Close as terminal, so the handoff lane releases automatically after protected-main rebase.

## Scope

- In scope: For v0.6.22, let integration queue recovery treat a merged PR with a valid pre-merge closure packet and successful no-op Hosted Close as terminal, so the handoff lane releases automatically after protected-main rebase.
- Out of scope: unrelated refactors not required for "Release integration lane after pre-merge Hosted Close".

## Plan

1. Reproduce a handoff entry after a protected-main rebase where the PR is MERGED, the task carries a valid pre-merge closure packet, and Hosted Close is a successful no-op.
2. Extend close-tail/recovery evidence so this state releases the lane as done without requiring a redundant close-tail PR.
3. Preserve waiting for genuinely incomplete merged tasks and rework handling for closed or missing PRs.
4. Add the task id to the v0.6.22 plan and release dependencies.
5. Run focused queue tests, typecheck, lint:core, ci:contract, full fast, and a live queue lifecycle proof.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/pr/flow-status.pre-merge.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts`. Expected: matching merged closure evidence is accepted while open and mismatched PR evidence is rejected, and queue recovery stays green.
2. Run `bun run typecheck`. Expected: TypeScript contracts remain valid.
3. Run `bun run lint:core`. Expected: core lint passes.
4. Run `bun run ci:contract`. Expected: public CLI and repository contracts remain unchanged.
5. Run `bun run test:fast`. Expected: the full fast regression suite passes.
6. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
7. Run `ap doctor`. Expected: no new release-blocking diagnostics appear.
8. Merge this task through the integration queue, complete Hosted Close, pull `main`, then run `ap integrate queue show --json`. Expected: a subsequent merged task with matching pre-merge closure evidence releases from `handoff` without manual `queue release`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T09:00:21.889Z — VERIFY — ok

By: TESTER

Note: Matching merged pre-merge closure accepted; open/mismatched evidence rejected. Focused 3 files/12 tests, typecheck, lint:core, ci:contract, routing check, doctor, and full fast 364 files/2150 tests passed. Live queue release proof will use the next merged task after this change lands.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T04:36:53.015Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
- old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100435-A932SP

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607100435-A932SP
- diagnostic_command: agentplane pr check 202607100435-A932SP
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-10T09:02:16.777Z — VERIFY — ok

By: TESTER

Note: Verified current implementation head 0d24f754: focused 3 files/12 tests, typecheck, lint:core, ci:contract, routing check, doctor, and full fast 364 files/2150 tests passed. Live queue release proof will use the next merged task after this change lands.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:00:22.054Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
- old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100435-A932SP

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607100435-A932SP
- diagnostic_command: agentplane pr check 202607100435-A932SP
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-10T09:15:22.716Z — VERIFY — needs_rework

By: TESTER

Note: Hosted verify-static found a stale Knip baseline entry because the new test imported RemotePrStatus directly; keep the helper signature structurally minimal and infer the test fixture type instead.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:06:23.308Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
- old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100435-A932SP

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607100435-A932SP --branch task/202607100435-A932SP/release-lane-after-premerge-hosted-close
- diagnostic_command: agentplane pr check 202607100435-A932SP
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-10T09:17:53.837Z — VERIFY — ok

By: TESTER

Note: Verified CI repair at 23be64c: Knip baseline 574/574, focused 3 files/12 tests, typecheck, ci:contract, and full fast 364 files/2150 tests passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:15:23.991Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
- old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100435-A932SP

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607100435-A932SP --branch task/202607100435-A932SP/release-lane-after-premerge-hosted-close
- diagnostic_command: agentplane pr check 202607100435-A932SP
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-10T09:24:23.963Z — VERIFY — needs_rework

By: TESTER

Note: Review thread identified missing task-closure and basis/head validation before queue release; implement the same validation contract as Hosted Close.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:17:54.061Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
- old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100435-A932SP

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607100435-A932SP --branch task/202607100435-A932SP/release-lane-after-premerge-hosted-close
- diagnostic_command: agentplane pr check 202607100435-A932SP
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-10T09:26:59.847Z — VERIFY — ok

By: TESTER

Note: Verified review hardening at 3fcc7b0: same Hosted Close task/marker/basis validation, focused 4 files/21 tests, typecheck, lint:core, Knip 574/574, ci:contract, and full fast 364 files/2150 tests passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T09:24:24.185Z, excerpt_hash=sha256:01f2f85ec787476292f3f5162a49a1566b64e9c9ec6e86178e1bbea252d04073

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100435-A932SP-release-lane-after-premerge-hosted-close/.agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json
- old_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- current_digest: 964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100435-A932SP

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607100435-A932SP --branch task/202607100435-A932SP/release-lane-after-premerge-hosted-close
- diagnostic_command: agentplane pr check 202607100435-A932SP
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Protected-main rebase rewrites the implementation commit, so ancestry-only close-tail detection misses valid pre-merge closure evidence.
  Impact: A successful Hosted Close can leave the integration lane in handoff until an operator manually releases it.
  Resolution: Flow status now recognizes only a MERGED PR whose pre-merge closure marker matches the task branch and, when present, the PR number.

- Observation: GitHub verify-static failed on a stale Knip baseline entry for RemotePrStatus.
  Impact: PR #4568 cannot merge while aggregate PR verification is red.
  Resolution: Remove the test-only RemotePrStatus import and keep the exported helper signature independent of that baseline-tracked type.

- Observation: Branch/PR identity alone could accept a stale pre-merge marker.
  Impact: Queue recovery could release a handoff without terminal close evidence.
  Resolution: Require DONE task evidence plus Hosted Close branch/PR and basis-ancestor validation before recorded_on_base.
