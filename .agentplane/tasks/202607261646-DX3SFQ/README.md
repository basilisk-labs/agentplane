---
id: "202607261646-DX3SFQ"
title: "Allow targeted cleanup of registered sibling task worktrees"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T16:47:36.201Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-26T20:59:53.473Z"
  updated_by: "TESTER"
  note: "PASS: registered sibling cleanup is allowed only in the explicit task-id plus finalize lane after fresh Git-topology and common-directory validation; all other external paths remain fail-closed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-26T21:00:48.466Z"
  updated_by: "EVALUATOR"
  note: "PASS: DX3 adds one narrow authorization path for a registered sibling task worktree without relaxing the default external-path prohibition."
  evaluated_sha: "fe034f197a94572e70772fd64d5c215738224f94"
  blueprint_digest: "347000a7aa94812a27597d187e7457734485aa16293129c8a4872b09fdf9f819"
  evidence_refs:
    - ".agentplane/tasks/202607261646-DX3SFQ/README.md"
    - ".agentplane/tasks/202607261646-DX3SFQ/quality/20260726-210048466-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607261646-DX3SFQ/quality/20260726-210048466-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607261646-DX3SFQ/quality/20260726-210048466-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607261646-DX3SFQ/blueprint/resolved-snapshot.json"
    - "commit:375bf47b3 semantic review of cleanup authorization and revalidation"
    - "packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts"
    - "packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
    - "ci:local:fast exit 0: 467 files / 3247 tests; 11 critical CLI E2E chunks"
  findings:
    - "The external target is accepted only when cleanup is targeted and finalized, its branch registration is unique and exact, it is nested below a separately registered base-branch worktree under the configured worktrees directory, and all three worktrees share the canonical Git common directory."
    - "Before removal, cleanup rechecks expected branch head, cleanliness, and sibling registration; a topology race raises E_GIT_RACE. PR artifacts archive only after removal succeeds."
    - "Negative coverage rejects directly registered external worktrees, arbitrary children, foreign common directories, non-finalize and broad cleanup, dirty state, and registration changes."
commit:
  hash: "375bf47b3a222b2c72f58a55745ff5a6eaf07171"
  message: "🧩 DX3SFQ task: record runner rework evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-26T16:48:58.198Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-26T18:12:40.400Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Published HEAD 32359412: focused DX3SFQ matrix (52/52), typecheck, lifecycle, guards, and routing pass; ci:local:fast fails with 9 task-run lifecycle/claim/replay failures and 6 unhandled errors."
  -
    type: "verify"
    at: "2026-07-26T20:59:53.473Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: registered sibling cleanup is allowed only in the explicit task-id plus finalize lane after fresh Git-topology and common-directory validation; all other external paths remain fail-closed."
  -
    type: "status"
    at: "2026-07-26T21:01:11.322Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-26T21:01:11.322Z"
doc_updated_by: "CODER"
description: "Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests."
sections:
  Summary: |-
    Allow targeted cleanup of registered sibling task worktrees

    Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.
  Scope: |-
    - In scope: Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.
    - Out of scope: unrelated refactors not required for "Allow targeted cleanup of registered sibling task worktrees".
  Plan: |-
    1. Trace cleanup candidate derivation and prove the exact task worktree comes from the repository's registered worktree list.
    2. Permit only explicit targeted/finalize cleanup of a registered sibling task worktree with the same Git common directory; preserve rejection for arbitrary external, foreign, current, and dirty worktrees.
    3. Add regression coverage for the clean sibling-base finalization route and retain negative security coverage.
    4. Run focused cleanup tests, typecheck, lifecycle invariants, guards, routing validation, and relevant full CI.
  Verify Steps: |-
    1. Run the targeted finalize regression from a clean sibling base checkout. Expected: an exact branch-to-canonical-path registration under a separately registered base worktree with the same Git common directory is removed only for `cleanup merged --task-id <id> --finalize`.
    2. Exercise the negative matrix. Expected: broad cleanup, targeted non-finalize cleanup, foreign or arbitrary external hints, discovery-path mismatch, current checkout, dirty worktree, and changed expected head do not remove a worktree, branch, or external directory.
    3. Run the focused matrix exactly: `bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.remote.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts --no-file-parallelism --reporter=dot`. Expected: registered sibling acceptance and all fail-closed cases pass.
    4. Run `bun run typecheck`, `bun run lifecycle:invariants`, `bun run guards:check`, and `node .agentplane/policy/check-routing.mjs`. Expected: the focused security fix preserves repository contracts.
    5. Run `AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:fast`. Expected: the capacity-normalized fast suite passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-26T18:12:40.400Z — VERIFY — needs_rework

    By: TESTER

    Note: Published HEAD 32359412: focused DX3SFQ matrix (52/52), typecheck, lifecycle, guards, and routing pass; ci:local:fast fails with 9 task-run lifecycle/claim/replay failures and 6 unhandled errors.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T17:29:08.860Z, excerpt_hash=sha256:2d8ef12e6c4d4dd52dd094468f85b1bec82439eba89137a25afbba34512bb1be

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607261646-DX3SFQ-allow-targeted-cleanup-of-registered-sibling-tas/.agentplane/tasks/202607261646-DX3SFQ/blueprint/resolved-snapshot.json
    - old_digest: 347000a7aa94812a27597d187e7457734485aa16293129c8a4872b09fdf9f819
    - current_digest: 347000a7aa94812a27597d187e7457734485aa16293129c8a4872b09fdf9f819
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607261646-DX3SFQ

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607261646-DX3SFQ
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-26T20:59:53.473Z — VERIFY — ok

    By: TESTER

    Note: PASS: registered sibling cleanup is allowed only in the explicit task-id plus finalize lane after fresh Git-topology and common-directory validation; all other external paths remain fail-closed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T18:12:43.596Z, excerpt_hash=sha256:2d8ef12e6c4d4dd52dd094468f85b1bec82439eba89137a25afbba34512bb1be

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607261646-DX3SFQ-allow-targeted-cleanup-of-registered-sibling-tas/.agentplane/tasks/202607261646-DX3SFQ/blueprint/resolved-snapshot.json
    - old_digest: 347000a7aa94812a27597d187e7457734485aa16293129c8a4872b09fdf9f819
    - current_digest: 347000a7aa94812a27597d187e7457734485aa16293129c8a4872b09fdf9f819
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607261646-DX3SFQ

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
    - Observation: Fast CI: 4 failed/462 passed files; 9 failed/3236 passed tests; runner state/claim waits timed out and temporary run directories became unavailable.
      Impact: The required full fast-CI gate is red, so this branch cannot receive a passing TESTER verdict.
      Resolution: Investigate and reproduce the task-run lifecycle/claim/replay failures in a separate follow-up; rerun the full gate after stabilization.

    - Observation: Focused cleanup matrix passed 52 tests; typecheck, lifecycle invariants, guards, hotspots, and routing passed; full ci:local:fast passed with 467 files / 3247 tests and 11 critical CLI E2E chunks.
      Impact: DX3 can clean a canonical task worktree nested below a separately registered sibling main worktree without widening removal authority to arbitrary external paths.
      Resolution: Rebased task branch 375bf47b3 is verified against M57-stabilized main; the prior runner-only CI failures no longer reproduce.
extensions:
  implementation_commit:
    hash: "fe034f197a94572e70772fd64d5c215738224f94"
    message: "🐛 DX3SFQ task: allow registered sibling cleanup"
  workflow_route_baseline:
    start_head_sha: "ed2c279623dd429edd121a41e0fc0d8057bdab91"
    version: 1
id_source: "generated"
---
## Summary

Allow targeted cleanup of registered sibling task worktrees

Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.

## Scope

- In scope: Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.
- Out of scope: unrelated refactors not required for "Allow targeted cleanup of registered sibling task worktrees".

## Plan

1. Trace cleanup candidate derivation and prove the exact task worktree comes from the repository's registered worktree list.
2. Permit only explicit targeted/finalize cleanup of a registered sibling task worktree with the same Git common directory; preserve rejection for arbitrary external, foreign, current, and dirty worktrees.
3. Add regression coverage for the clean sibling-base finalization route and retain negative security coverage.
4. Run focused cleanup tests, typecheck, lifecycle invariants, guards, routing validation, and relevant full CI.

## Verify Steps

1. Run the targeted finalize regression from a clean sibling base checkout. Expected: an exact branch-to-canonical-path registration under a separately registered base worktree with the same Git common directory is removed only for `cleanup merged --task-id <id> --finalize`.
2. Exercise the negative matrix. Expected: broad cleanup, targeted non-finalize cleanup, foreign or arbitrary external hints, discovery-path mismatch, current checkout, dirty worktree, and changed expected head do not remove a worktree, branch, or external directory.
3. Run the focused matrix exactly: `bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.remote.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts --no-file-parallelism --reporter=dot`. Expected: registered sibling acceptance and all fail-closed cases pass.
4. Run `bun run typecheck`, `bun run lifecycle:invariants`, `bun run guards:check`, and `node .agentplane/policy/check-routing.mjs`. Expected: the focused security fix preserves repository contracts.
5. Run `AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:fast`. Expected: the capacity-normalized fast suite passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-26T18:12:40.400Z — VERIFY — needs_rework

By: TESTER

Note: Published HEAD 32359412: focused DX3SFQ matrix (52/52), typecheck, lifecycle, guards, and routing pass; ci:local:fast fails with 9 task-run lifecycle/claim/replay failures and 6 unhandled errors.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T17:29:08.860Z, excerpt_hash=sha256:2d8ef12e6c4d4dd52dd094468f85b1bec82439eba89137a25afbba34512bb1be

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607261646-DX3SFQ-allow-targeted-cleanup-of-registered-sibling-tas/.agentplane/tasks/202607261646-DX3SFQ/blueprint/resolved-snapshot.json
- old_digest: 347000a7aa94812a27597d187e7457734485aa16293129c8a4872b09fdf9f819
- current_digest: 347000a7aa94812a27597d187e7457734485aa16293129c8a4872b09fdf9f819
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607261646-DX3SFQ

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607261646-DX3SFQ
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-26T20:59:53.473Z — VERIFY — ok

By: TESTER

Note: PASS: registered sibling cleanup is allowed only in the explicit task-id plus finalize lane after fresh Git-topology and common-directory validation; all other external paths remain fail-closed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T18:12:43.596Z, excerpt_hash=sha256:2d8ef12e6c4d4dd52dd094468f85b1bec82439eba89137a25afbba34512bb1be

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607261646-DX3SFQ-allow-targeted-cleanup-of-registered-sibling-tas/.agentplane/tasks/202607261646-DX3SFQ/blueprint/resolved-snapshot.json
- old_digest: 347000a7aa94812a27597d187e7457734485aa16293129c8a4872b09fdf9f819
- current_digest: 347000a7aa94812a27597d187e7457734485aa16293129c8a4872b09fdf9f819
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607261646-DX3SFQ

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

- Observation: Fast CI: 4 failed/462 passed files; 9 failed/3236 passed tests; runner state/claim waits timed out and temporary run directories became unavailable.
  Impact: The required full fast-CI gate is red, so this branch cannot receive a passing TESTER verdict.
  Resolution: Investigate and reproduce the task-run lifecycle/claim/replay failures in a separate follow-up; rerun the full gate after stabilization.

- Observation: Focused cleanup matrix passed 52 tests; typecheck, lifecycle invariants, guards, hotspots, and routing passed; full ci:local:fast passed with 467 files / 3247 tests and 11 critical CLI E2E chunks.
  Impact: DX3 can clean a canonical task worktree nested below a separately registered sibling main worktree without widening removal authority to arbitrary external paths.
  Resolution: Rebased task branch 375bf47b3 is verified against M57-stabilized main; the prior runner-only CI failures no longer reproduce.
