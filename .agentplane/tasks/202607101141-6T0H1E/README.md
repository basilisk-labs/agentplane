---
id: "202607101141-6T0H1E"
title: "Recognize rebased pre-merge closure recorded on base"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "post-merge-followup"
  - "release-blocker"
  - "v0.6.22"
verify:
  - "bunx vitest run packages/agentplane/src/commands/task/close-tail-state.test.ts packages/agentplane/src/commands/pr/flow-status.pre-merge.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run ci:contract"
  - "bun run test:fast"
  - "node .agentplane/policy/check-routing.mjs"
  - "ap doctor"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T11:42:01.769Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T12:08:13.160Z"
  updated_by: "REVIEWER"
  note: "Matching closure evidence on protected main is validated strictly by task id, DONE state, non-empty commit, branch, and PR number. Focused suites 5/20, typecheck, lint, ci:contract, policy routing, doctor, test:fast 364/2152, full-fast local CI, and critical CLI E2E passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T12:08:21.499Z"
  updated_by: "EVALUATOR"
  note: "Rebased protected-main closure is recognized only from complete matching base artifacts."
  evaluated_sha: "851dc66f8ad5533128a3d345d716f599fbeb3ae9"
  blueprint_digest: "4f2b06a19d39733f66dbff9364510f7adfc531ad949afe01e4e0f4b032685652"
  evidence_refs:
    - ".agentplane/tasks/202607101141-6T0H1E/README.md"
    - ".agentplane/tasks/202607101141-6T0H1E/quality/20260710-120821499-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607101141-6T0H1E/quality/20260710-120821499-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607101141-6T0H1E/quality/20260710-120821499-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607101141-6T0H1E/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/task/close-tail-state.test.ts"
  findings:
    - "The new validator fails closed and preserves existing ancestry-based recovery while covering legitimate GitHub rebase merges."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: validate rebased pre-merge closure from artifacts recorded on protected main."
events:
  -
    type: "status"
    at: "2026-07-10T11:42:09.641Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: validate rebased pre-merge closure from artifacts recorded on protected main."
  -
    type: "verify"
    at: "2026-07-10T12:08:13.160Z"
    author: "REVIEWER"
    state: "ok"
    note: "Matching closure evidence on protected main is validated strictly by task id, DONE state, non-empty commit, branch, and PR number. Focused suites 5/20, typecheck, lint, ci:contract, policy routing, doctor, test:fast 364/2152, full-fast local CI, and critical CLI E2E passed."
doc_version: 3
doc_updated_at: "2026-07-10T12:16:45.849Z"
doc_updated_by: "CODER"
description: "Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks."
sections:
  Summary: |-
    Recognize rebased pre-merge closure recorded on base

    Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks.
  Scope: |-
    - In scope: Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks.
    - Out of scope: unrelated refactors not required for "Recognize rebased pre-merge closure recorded on base".
  Plan: "1. Add a base-recorded pre-merge closure validator that reads the task README and PR metadata from the configured base branch. 2. Require DONE status, a non-empty task commit, and exact task, branch, PR, and base artifact identity before treating the close tail as recorded. 3. Add regression tests for rebased basis commits and mismatched base evidence. 4. Verify focused tests, typecheck, lint, CI contracts, policy routing, doctor, and the live A932 lane release. 5. Merge through protected main and resume D7 integration."
  Verify Steps: |-
    1. Run the focused close-tail, PR-flow, and queue recovery suites. Expected: matching DONE task and pre-merge metadata recorded on base release a rebased handoff; mismatched task, branch, PR, or incomplete evidence remains rejected.
    2. Run bun run typecheck and bun run lint:core. Expected: no type or lint regressions.
    3. Run bun run ci:contract and bun run test:fast. Expected: repository contracts and the full fast suite pass.
    4. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: policy routing and repository diagnostics pass.
    5. After merge, run ap integrate queue list from main. Expected: A932 normalizes from handoff to done automatically and D7 becomes claimable without manual release.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T12:08:13.160Z — VERIFY — ok

    By: REVIEWER

    Note: Matching closure evidence on protected main is validated strictly by task id, DONE state, non-empty commit, branch, and PR number. Focused suites 5/20, typecheck, lint, ci:contract, policy routing, doctor, test:fast 364/2152, full-fast local CI, and critical CLI E2E passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T11:55:51.015Z, excerpt_hash=sha256:e77b4bb6fa5f6a907b7132d18945e0287039f3d5fd91f297e3788fa9d9d59203

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607101141-6T0H1E-recognize-rebased-pre-merge-closure-recorded-on/.agentplane/tasks/202607101141-6T0H1E/blueprint/resolved-snapshot.json
    - old_digest: 4f2b06a19d39733f66dbff9364510f7adfc531ad949afe01e4e0f4b032685652
    - current_digest: 4f2b06a19d39733f66dbff9364510f7adfc531ad949afe01e4e0f4b032685652
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607101141-6T0H1E

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607101141-6T0H1E --branch task/202607101141-6T0H1E/recognize-rebased-pre-merge-closure-recorded-on
    - diagnostic_command: agentplane pr check 202607101141-6T0H1E
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
    Root cause: close-tail recovery only accepted a pre-merge basis commit when it was still an ancestor of the final PR head. A legitimate GitHub rebase kept the old basis object locally but removed that ancestry, so the merged task remained in handoff even though protected main contained matching DONE task metadata and PR closure metadata.

    Implementation: validate the task README and PR metadata directly from the configured base branch. Accept recorded_on_base only when the task is DONE with a non-empty commit and task id, branch, and canonical PR number match exactly. Legacy closure markers may omit their duplicated PR number when meta.pr_number matches; an explicit mismatched marker number remains rejected.

    Review follow-up: PR review identified the legacy marker shape without pre_merge_closure.pr_number. Added a regression test for the absent number and retained rejection of an explicit mismatch.

    Verification: focused suites 5 files / 21 tests; typecheck; lint:core. Earlier ci:contract, policy routing, doctor, full test:fast 364 files / 2152 tests, full-fast local CI, critical CLI E2E, and the first hosted matrix passed; the post-review commit is revalidated below.
id_source: "generated"
---
## Summary

Recognize rebased pre-merge closure recorded on base

Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks.

## Scope

- In scope: Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks.
- Out of scope: unrelated refactors not required for "Recognize rebased pre-merge closure recorded on base".

## Plan

1. Add a base-recorded pre-merge closure validator that reads the task README and PR metadata from the configured base branch. 2. Require DONE status, a non-empty task commit, and exact task, branch, PR, and base artifact identity before treating the close tail as recorded. 3. Add regression tests for rebased basis commits and mismatched base evidence. 4. Verify focused tests, typecheck, lint, CI contracts, policy routing, doctor, and the live A932 lane release. 5. Merge through protected main and resume D7 integration.

## Verify Steps

1. Run the focused close-tail, PR-flow, and queue recovery suites. Expected: matching DONE task and pre-merge metadata recorded on base release a rebased handoff; mismatched task, branch, PR, or incomplete evidence remains rejected.
2. Run bun run typecheck and bun run lint:core. Expected: no type or lint regressions.
3. Run bun run ci:contract and bun run test:fast. Expected: repository contracts and the full fast suite pass.
4. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: policy routing and repository diagnostics pass.
5. After merge, run ap integrate queue list from main. Expected: A932 normalizes from handoff to done automatically and D7 becomes claimable without manual release.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T12:08:13.160Z — VERIFY — ok

By: REVIEWER

Note: Matching closure evidence on protected main is validated strictly by task id, DONE state, non-empty commit, branch, and PR number. Focused suites 5/20, typecheck, lint, ci:contract, policy routing, doctor, test:fast 364/2152, full-fast local CI, and critical CLI E2E passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T11:55:51.015Z, excerpt_hash=sha256:e77b4bb6fa5f6a907b7132d18945e0287039f3d5fd91f297e3788fa9d9d59203

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607101141-6T0H1E-recognize-rebased-pre-merge-closure-recorded-on/.agentplane/tasks/202607101141-6T0H1E/blueprint/resolved-snapshot.json
- old_digest: 4f2b06a19d39733f66dbff9364510f7adfc531ad949afe01e4e0f4b032685652
- current_digest: 4f2b06a19d39733f66dbff9364510f7adfc531ad949afe01e4e0f4b032685652
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607101141-6T0H1E

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607101141-6T0H1E --branch task/202607101141-6T0H1E/recognize-rebased-pre-merge-closure-recorded-on
- diagnostic_command: agentplane pr check 202607101141-6T0H1E
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

Root cause: close-tail recovery only accepted a pre-merge basis commit when it was still an ancestor of the final PR head. A legitimate GitHub rebase kept the old basis object locally but removed that ancestry, so the merged task remained in handoff even though protected main contained matching DONE task metadata and PR closure metadata.

Implementation: validate the task README and PR metadata directly from the configured base branch. Accept recorded_on_base only when the task is DONE with a non-empty commit and task id, branch, and canonical PR number match exactly. Legacy closure markers may omit their duplicated PR number when meta.pr_number matches; an explicit mismatched marker number remains rejected.

Review follow-up: PR review identified the legacy marker shape without pre_merge_closure.pr_number. Added a regression test for the absent number and retained rejection of an explicit mismatch.

Verification: focused suites 5 files / 21 tests; typecheck; lint:core. Earlier ci:contract, policy routing, doctor, full test:fast 364 files / 2152 tests, full-fast local CI, critical CLI E2E, and the first hosted matrix passed; the post-review commit is revalidated below.
