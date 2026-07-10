---
id: "202607100435-A932SP"
title: "Release integration lane after pre-merge Hosted Close"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  updated_at: "2026-07-10T09:02:16.777Z"
  updated_by: "TESTER"
  note: "Verified current implementation head 0d24f754: focused 3 files/12 tests, typecheck, lint:core, ci:contract, routing check, doctor, and full fast 364 files/2150 tests passed. Live queue release proof will use the next merged task after this change lands."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T09:01:39.454Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "0d24f75419c384d2abdfbc14a472bea2516bac44"
  blueprint_digest: "964681ba05503b0eb186864846a3938b514d7d678ebad7141c02b04d1a0a7611"
  evidence_refs:
    - ".agentplane/tasks/202607100435-A932SP/README.md"
    - ".agentplane/tasks/202607100435-A932SP/quality/20260710-090139454-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607100435-A932SP/quality/20260710-090139454-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607100435-A932SP/quality/20260710-090139454-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607100435-A932SP/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make queue recovery treat a successful no-op Hosted Close with a valid pre-merge closure packet as terminal after protected-main merge."
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
doc_version: 3
doc_updated_at: "2026-07-10T09:02:16.886Z"
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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Protected-main rebase rewrites the implementation commit, so ancestry-only close-tail detection misses valid pre-merge closure evidence.
      Impact: A successful Hosted Close can leave the integration lane in handoff until an operator manually releases it.
      Resolution: Flow status now recognizes only a MERGED PR whose pre-merge closure marker matches the task branch and, when present, the PR number.
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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Protected-main rebase rewrites the implementation commit, so ancestry-only close-tail detection misses valid pre-merge closure evidence.
  Impact: A successful Hosted Close can leave the integration lane in handoff until an operator manually releases it.
  Resolution: Flow status now recognizes only a MERGED PR whose pre-merge closure marker matches the task branch and, when present, the PR number.
