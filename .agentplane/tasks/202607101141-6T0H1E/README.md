---
id: "202607101141-6T0H1E"
title: "Recognize rebased pre-merge closure recorded on base"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
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
  updated_at: "2026-07-10T12:21:49.067Z"
  updated_by: "REVIEWER"
  note: "Review follow-up accepted legacy closure markers without duplicated PR number only when canonical meta.pr_number matches. Focused suites 5/21, typecheck, lint, full-fast local CI 364/2153, and critical CLI E2E passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T12:21:51.290Z"
  updated_by: "EVALUATOR"
  note: "Rebased closure recovery now supports both current and legacy marker shapes while failing closed on explicit mismatches."
  evaluated_sha: "712c07b655601581d0b461203a798a2af26a2e2d"
  blueprint_digest: "4f2b06a19d39733f66dbff9364510f7adfc531ad949afe01e4e0f4b032685652"
  evidence_refs:
    - ".agentplane/tasks/202607101141-6T0H1E/README.md"
    - ".agentplane/tasks/202607101141-6T0H1E/quality/20260710-122151290-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607101141-6T0H1E/quality/20260710-122151290-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607101141-6T0H1E/quality/20260710-122151290-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607101141-6T0H1E/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/task/close-tail-state.test.ts"
  findings:
    - "Base evidence requires matching task id, DONE commit, branch, and canonical PR number; the optional duplicated marker PR number is enforced when present."
commit:
  hash: "a7be2858dfabbe4246a8461c7a7af1068da37d20"
  message: "🧪 6T0H1E task: verify legacy closure recovery"
comments:
  -
    author: "CODER"
    body: "Start: validate rebased pre-merge closure from artifacts recorded on protected main."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
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
  -
    type: "verify"
    at: "2026-07-10T12:21:49.067Z"
    author: "REVIEWER"
    state: "ok"
    note: "Review follow-up accepted legacy closure markers without duplicated PR number only when canonical meta.pr_number matches. Focused suites 5/21, typecheck, lint, full-fast local CI 364/2153, and critical CLI E2E passed."
  -
    type: "status"
    at: "2026-07-10T12:27:36.761Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-10T12:27:36.762Z"
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

    ### 2026-07-10T12:21:49.067Z — VERIFY — ok

    By: REVIEWER

    Note: Review follow-up accepted legacy closure markers without duplicated PR number only when canonical meta.pr_number matches. Focused suites 5/21, typecheck, lint, full-fast local CI 364/2153, and critical CLI E2E passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T12:16:45.849Z, excerpt_hash=sha256:e77b4bb6fa5f6a907b7132d18945e0287039f3d5fd91f297e3788fa9d9d59203

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
    - safe_command: agentplane evaluator run 202607101141-6T0H1E --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607101141-6T0H1E/README.md
    - diagnostic_command: agentplane evaluator run 202607101141-6T0H1E --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607101141-6T0H1E/README.md
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Root cause: close-tail recovery only accepted a pre-merge basis commit when it was still an ancestor of the final PR head. A legitimate GitHub rebase kept the old basis object locally but removed that ancestry, so the merged task remained in handoff even though protected main contained matching DONE task metadata and PR closure metadata.

    Implementation: validate the task README and PR metadata directly from the configured base branch. Accept recorded_on_base only when the task is DONE with a non-empty commit and task id, branch, and canonical PR number match exactly. Legacy closure markers may omit their duplicated PR number when meta.pr_number matches; an explicit mismatched marker number remains rejected.

    Review follow-up: PR review identified the legacy marker shape without pre_merge_closure.pr_number. Added a regression test for the absent number and retained rejection of an explicit mismatch.

    Verification: focused suites 5 files / 21 tests; typecheck; lint:core. Earlier ci:contract, policy routing, doctor, full test:fast 364 files / 2152 tests, full-fast local CI, critical CLI E2E, and the first hosted matrix passed; the post-review commit is revalidated below.
extensions:
  implementation_commit:
    hash: "712c07b655601581d0b461203a798a2af26a2e2d"
    message: "🐛 6T0H1E task: accept legacy closure marker shape"
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

### 2026-07-10T12:21:49.067Z — VERIFY — ok

By: REVIEWER

Note: Review follow-up accepted legacy closure markers without duplicated PR number only when canonical meta.pr_number matches. Focused suites 5/21, typecheck, lint, full-fast local CI 364/2153, and critical CLI E2E passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T12:16:45.849Z, excerpt_hash=sha256:e77b4bb6fa5f6a907b7132d18945e0287039f3d5fd91f297e3788fa9d9d59203

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
- safe_command: agentplane evaluator run 202607101141-6T0H1E --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607101141-6T0H1E/README.md
- diagnostic_command: agentplane evaluator run 202607101141-6T0H1E --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607101141-6T0H1E/README.md
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Root cause: close-tail recovery only accepted a pre-merge basis commit when it was still an ancestor of the final PR head. A legitimate GitHub rebase kept the old basis object locally but removed that ancestry, so the merged task remained in handoff even though protected main contained matching DONE task metadata and PR closure metadata.

Implementation: validate the task README and PR metadata directly from the configured base branch. Accept recorded_on_base only when the task is DONE with a non-empty commit and task id, branch, and canonical PR number match exactly. Legacy closure markers may omit their duplicated PR number when meta.pr_number matches; an explicit mismatched marker number remains rejected.

Review follow-up: PR review identified the legacy marker shape without pre_merge_closure.pr_number. Added a regression test for the absent number and retained rejection of an explicit mismatch.

Verification: focused suites 5 files / 21 tests; typecheck; lint:core. Earlier ci:contract, policy routing, doctor, full test:fast 364 files / 2152 tests, full-fast local CI, critical CLI E2E, and the first hosted matrix passed; the post-review commit is revalidated below.
