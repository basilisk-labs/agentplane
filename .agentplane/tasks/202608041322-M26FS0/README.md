---
id: "202608041322-M26FS0"
title: "Stabilize hosted release evidence closeout"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
task_kind: "release"
mutation_scope: "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T13:24:02.060Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-04T14:39:34.380Z"
  updated_by: "TESTER"
  note: "Release-tail closeout fixes pass all declared local gates for semantic implementation 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0."
  attempts: 0
commit:
  hash: "8005cbc506c4c944c33a096a4ad4d6fdf4a210c0"
  message: "🧩 M26FS0 task: stabilize release evidence closeout"
comments:
  -
    author: "CODER"
    body: "Start: implement exact-SHA release evidence verification and terminal DONE routing regressions."
  -
    author: "CODER"
    body: "Implementation: preserve accepted task verification during hosted publish evidence, verify the exact evidence SHA, publish the required GitHub Actions check, wait for evidence PR merge, and release v0.7.3."
  -
    author: "CODER"
    body: "Verification baseline: include the committed task-local implementation and evidence artifacts; product implementation remains 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0."
  -
    author: "CODER"
    body: "Implementation receipt corrected to the semantic release-tail implementation commit; later commits contain lifecycle evidence only."
events:
  -
    type: "status"
    at: "2026-08-04T13:24:55.462Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement exact-SHA release evidence verification and terminal DONE routing regressions."
  -
    type: "status"
    at: "2026-08-04T14:24:26.419Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: preserve accepted task verification during hosted publish evidence, verify the exact evidence SHA, publish the required GitHub Actions check, wait for evidence PR merge, and release v0.7.3."
  -
    type: "verify"
    at: "2026-08-04T14:25:18.886Z"
    author: "TESTER"
    state: "ok"
    note: "Release-tail fixes verified against implementation 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0."
  -
    type: "status"
    at: "2026-08-04T14:27:07.492Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Verification baseline: include the committed task-local implementation and evidence artifacts; product implementation remains 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0."
  -
    type: "verify"
    at: "2026-08-04T14:27:34.212Z"
    author: "TESTER"
    state: "ok"
    note: "Release-tail fixes verified against semantic task head 92097f3ba42c432580de5b8bc75f558f012a2849; product implementation is 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0."
  -
    type: "verify"
    at: "2026-08-04T14:37:04.258Z"
    author: "TESTER"
    state: "ok"
    note: "Release-tail closeout fixes pass the complete local release and CLI verification surface."
  -
    type: "status"
    at: "2026-08-04T14:39:08.120Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation receipt corrected to the semantic release-tail implementation commit; later commits contain lifecycle evidence only."
  -
    type: "verify"
    at: "2026-08-04T14:39:34.380Z"
    author: "TESTER"
    state: "ok"
    note: "Release-tail closeout fixes pass all declared local gates for semantic implementation 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0."
doc_version: 3
doc_updated_at: "2026-08-04T14:39:35.820Z"
doc_updated_by: "CODER"
description: "Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release."
sections:
  Summary: |-
    Stabilize hosted release evidence closeout

    Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release.
  Scope: |-
    - In scope: Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release.
    - Out of scope: unrelated refactors not required for "Stabilize hosted release evidence closeout".
  Plan: "Patch-release plan: version=0.7.3, tag=v0.7.3. 1. Preserve the v0.7.2 live evidence for both release-tail failures. 2. Make release-evidence verification validate the exact closure SHA, wait for that Core CI run, publish a GitHub Actions-owned required PR verification check, and fail closed before merge automation. 3. Keep a fully closed DONE task terminal across a task-evidence-only README advance while preserving stale-verification blocking for real implementation changes. 4. Add focused route and publish-workflow regressions. 5. Run targeted tests, ci:contract, release:prepublish, and independent evaluator. 6. Merge through branch_pr, publish v0.7.3 for the exact merged SHA, and prove that the evidence PR merges without reopen/admin repair and the release task route remains terminal. Stop on product drift outside these release-tail repairs, active incidents, failed required checks, or version/tag drift."
  Verify Steps: |-
    1. Run the focused route regression that closes a branch_pr task, advances main with only its hosted release-evidence README, and queries next-action. Expected: the task remains terminal.done; a real implementation commit still makes verification stale.
    2. Run the publish-workflow contract tests. Expected: release evidence CI validates the exact closure SHA, waits for success, emits a GitHub Actions-owned PR verification check, and does not silently continue after a failed evidence gate.
    3. Run bun run ci:contract and bun run release:prepublish. Expected: all blocking contracts, release checks, release CI suites, coverage guards, and release-critical tests pass.
    4. After merge and publish, verify npm latest for all three packages is 0.7.3, tag and GitHub Release v0.7.3 point to the exact release SHA, clean install and postpublish audit pass, and the release-evidence PR merges without reopen/admin repair.
    5. Pull the evidence merge to main and query next-action for this task. Expected: status is DONE, route is terminal.done, hosted publish evidence is present, token provenance is explicit, and no merged task branch/worktree remains.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T14:25:18.886Z — VERIFY — ok

    By: TESTER

    Note: Release-tail fixes verified against implementation 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T14:24:26.419Z, excerpt_hash=sha256:58fcb1ec6db74ef7a19938f48e4d39814a73563824f3098db990c937dfe61550

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041322-M26FS0-stabilize-hosted-release-evidence-closeout/.agentplane/tasks/202608041322-M26FS0/blueprint/resolved-snapshot.json
    - old_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
    - current_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041322-M26FS0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608041322-M26FS0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T14:27:34.212Z — VERIFY — ok

    By: TESTER

    Note: Release-tail fixes verified against semantic task head 92097f3ba42c432580de5b8bc75f558f012a2849; product implementation is 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T14:27:07.492Z, excerpt_hash=sha256:58fcb1ec6db74ef7a19938f48e4d39814a73563824f3098db990c937dfe61550

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041322-M26FS0-stabilize-hosted-release-evidence-closeout/.agentplane/tasks/202608041322-M26FS0/blueprint/resolved-snapshot.json
    - old_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
    - current_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041322-M26FS0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608041322-M26FS0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T14:37:04.258Z — VERIFY — ok

    By: TESTER

    Note: Release-tail closeout fixes pass the complete local release and CLI verification surface.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T14:27:35.458Z, excerpt_hash=sha256:58fcb1ec6db74ef7a19938f48e4d39814a73563824f3098db990c937dfe61550

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041322-M26FS0-stabilize-hosted-release-evidence-closeout/.agentplane/tasks/202608041322-M26FS0/blueprint/resolved-snapshot.json
    - old_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
    - current_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041322-M26FS0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608041322-M26FS0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-04T14:39:34.380Z — VERIFY — ok

    By: TESTER

    Note: Release-tail closeout fixes pass all declared local gates for semantic implementation 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T14:39:08.120Z, excerpt_hash=sha256:58fcb1ec6db74ef7a19938f48e4d39814a73563824f3098db990c937dfe61550

    Details:

    Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
    Result: pass
    Evidence: 20 tests passed with 246 assertions.
    Scope: hosted release evidence preservation and fail-closed publish workflow contract

    Command: bun run ci:contract
    Result: pass
    Evidence: all repository contract checks completed successfully.
    Scope: policy routing, architecture, compatibility, docs, and release contracts

    Command: bun run release:prepublish
    Result: pass
    Evidence: 101 release CI chunks, 50 workflow coverage tests, 204 significant coverage tests, and 16 release-critical tests passed; clean tarball and migration scenarios passed.
    Scope: complete prepublication gate for v0.7.3

    Command: AGENTPLANE_FAST_CHANGED_FILES scoped full-fast local CI
    Result: pass
    Evidence: 538 test files and 3794 unit tests passed; all 12 critical CLI/E2E chunks passed.
    Scope: changed release-tail and task lifecycle surface

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041322-M26FS0-stabilize-hosted-release-evidence-closeout/.agentplane/tasks/202608041322-M26FS0/blueprint/resolved-snapshot.json
    - old_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
    - current_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608041322-M26FS0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608041322-M26FS0
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
    - v0.7.2 publish run 30911823733 created release-evidence PR #4777 and dispatched Core CI, but the workflow_dispatch run did not attach the required `PR verification` context to the PR head. The PR required a close/reopen repair before merge.
    - Hosted evidence apply replaced the accepted TESTER verification metadata for task 202608041057-WZRXEX with DEUS publish metadata without creating a matching immutable verification record. The route therefore regressed from `terminal.done` to `verification_required` after the evidence merge.
    - The 0.7.3 fix preserves canonical verification metadata, validates the exact evidence closure SHA, waits for Core CI, publishes the required GitHub Actions-owned check, and fails closed until the evidence PR is merged.
    - Restoring the original TESTER metadata for 202608041057-WZRXEX returned the live route to `terminal.done`. Final acceptance still requires the autonomous v0.7.3 hosted release path.

    - Observation: Focused release tests passed 20/20; compatibility critical passed 9/9; ci:contract passed; release:prepublish passed 101/101 release-ci chunks, 50 workflow coverage tests, 204 significant coverage tests, and 16 release-critical tests.
      Impact: Hosted evidence now preserves immutable TESTER verification and cannot merge until the exact closure SHA has a successful GitHub Actions-owned PR verification check.
      Resolution: Accept the implementation for hosted CI, integration, and the live v0.7.3 release-tail proof.

    - Observation: Focused release tests passed 20/20; compatibility critical passed 9/9; ci:contract passed; release:prepublish passed 101/101 release-ci chunks, 50 workflow coverage tests, 204 significant coverage tests, and 16 release-critical tests.
      Impact: Hosted evidence preserves immutable TESTER verification and the evidence PR cannot merge until its exact SHA has the required GitHub Actions-owned verification check.
      Resolution: Accept for hosted CI, integration, and live v0.7.3 release-tail proof.

    - Observation: Passed: focused release-tail contracts (20 tests), critical efficiency baseline (9 tests), ci:contract, release:prepublish, full-fast unit suite (538 files / 3794 tests), and all 12 critical CLI/E2E chunks.
      Impact: The current canonical implementation target is covered by concrete deterministic evidence; hosted publish and evidence-merge behavior remains the release-time acceptance gate.
      Resolution: Accept local verification and proceed to independent evaluator review plus hosted PR and release validation.
extensions:
  workflow_route_baseline:
    start_head_sha: "9d0e0089dd83487defa8950d787a5fa67f53db10"
    version: 1
id_source: "generated"
---
## Summary

Stabilize hosted release evidence closeout

Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release.

## Scope

- In scope: Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release.
- Out of scope: unrelated refactors not required for "Stabilize hosted release evidence closeout".

## Plan

Patch-release plan: version=0.7.3, tag=v0.7.3. 1. Preserve the v0.7.2 live evidence for both release-tail failures. 2. Make release-evidence verification validate the exact closure SHA, wait for that Core CI run, publish a GitHub Actions-owned required PR verification check, and fail closed before merge automation. 3. Keep a fully closed DONE task terminal across a task-evidence-only README advance while preserving stale-verification blocking for real implementation changes. 4. Add focused route and publish-workflow regressions. 5. Run targeted tests, ci:contract, release:prepublish, and independent evaluator. 6. Merge through branch_pr, publish v0.7.3 for the exact merged SHA, and prove that the evidence PR merges without reopen/admin repair and the release task route remains terminal. Stop on product drift outside these release-tail repairs, active incidents, failed required checks, or version/tag drift.

## Verify Steps

1. Run the focused route regression that closes a branch_pr task, advances main with only its hosted release-evidence README, and queries next-action. Expected: the task remains terminal.done; a real implementation commit still makes verification stale.
2. Run the publish-workflow contract tests. Expected: release evidence CI validates the exact closure SHA, waits for success, emits a GitHub Actions-owned PR verification check, and does not silently continue after a failed evidence gate.
3. Run bun run ci:contract and bun run release:prepublish. Expected: all blocking contracts, release checks, release CI suites, coverage guards, and release-critical tests pass.
4. After merge and publish, verify npm latest for all three packages is 0.7.3, tag and GitHub Release v0.7.3 point to the exact release SHA, clean install and postpublish audit pass, and the release-evidence PR merges without reopen/admin repair.
5. Pull the evidence merge to main and query next-action for this task. Expected: status is DONE, route is terminal.done, hosted publish evidence is present, token provenance is explicit, and no merged task branch/worktree remains.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T14:25:18.886Z — VERIFY — ok

By: TESTER

Note: Release-tail fixes verified against implementation 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T14:24:26.419Z, excerpt_hash=sha256:58fcb1ec6db74ef7a19938f48e4d39814a73563824f3098db990c937dfe61550

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041322-M26FS0-stabilize-hosted-release-evidence-closeout/.agentplane/tasks/202608041322-M26FS0/blueprint/resolved-snapshot.json
- old_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
- current_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041322-M26FS0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608041322-M26FS0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T14:27:34.212Z — VERIFY — ok

By: TESTER

Note: Release-tail fixes verified against semantic task head 92097f3ba42c432580de5b8bc75f558f012a2849; product implementation is 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T14:27:07.492Z, excerpt_hash=sha256:58fcb1ec6db74ef7a19938f48e4d39814a73563824f3098db990c937dfe61550

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041322-M26FS0-stabilize-hosted-release-evidence-closeout/.agentplane/tasks/202608041322-M26FS0/blueprint/resolved-snapshot.json
- old_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
- current_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041322-M26FS0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608041322-M26FS0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T14:37:04.258Z — VERIFY — ok

By: TESTER

Note: Release-tail closeout fixes pass the complete local release and CLI verification surface.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T14:27:35.458Z, excerpt_hash=sha256:58fcb1ec6db74ef7a19938f48e4d39814a73563824f3098db990c937dfe61550

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041322-M26FS0-stabilize-hosted-release-evidence-closeout/.agentplane/tasks/202608041322-M26FS0/blueprint/resolved-snapshot.json
- old_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
- current_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041322-M26FS0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608041322-M26FS0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-04T14:39:34.380Z — VERIFY — ok

By: TESTER

Note: Release-tail closeout fixes pass all declared local gates for semantic implementation 8005cbc506c4c944c33a096a4ad4d6fdf4a210c0.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T14:39:08.120Z, excerpt_hash=sha256:58fcb1ec6db74ef7a19938f48e4d39814a73563824f3098db990c937dfe61550

Details:

Command: bun test packages/agentplane/src/commands/release/release-task-evidence-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts
Result: pass
Evidence: 20 tests passed with 246 assertions.
Scope: hosted release evidence preservation and fail-closed publish workflow contract

Command: bun run ci:contract
Result: pass
Evidence: all repository contract checks completed successfully.
Scope: policy routing, architecture, compatibility, docs, and release contracts

Command: bun run release:prepublish
Result: pass
Evidence: 101 release CI chunks, 50 workflow coverage tests, 204 significant coverage tests, and 16 release-critical tests passed; clean tarball and migration scenarios passed.
Scope: complete prepublication gate for v0.7.3

Command: AGENTPLANE_FAST_CHANGED_FILES scoped full-fast local CI
Result: pass
Evidence: 538 test files and 3794 unit tests passed; all 12 critical CLI/E2E chunks passed.
Scope: changed release-tail and task lifecycle surface

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608041322-M26FS0-stabilize-hosted-release-evidence-closeout/.agentplane/tasks/202608041322-M26FS0/blueprint/resolved-snapshot.json
- old_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
- current_digest: 3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608041322-M26FS0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608041322-M26FS0
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

- v0.7.2 publish run 30911823733 created release-evidence PR #4777 and dispatched Core CI, but the workflow_dispatch run did not attach the required `PR verification` context to the PR head. The PR required a close/reopen repair before merge.
- Hosted evidence apply replaced the accepted TESTER verification metadata for task 202608041057-WZRXEX with DEUS publish metadata without creating a matching immutable verification record. The route therefore regressed from `terminal.done` to `verification_required` after the evidence merge.
- The 0.7.3 fix preserves canonical verification metadata, validates the exact evidence closure SHA, waits for Core CI, publishes the required GitHub Actions-owned check, and fails closed until the evidence PR is merged.
- Restoring the original TESTER metadata for 202608041057-WZRXEX returned the live route to `terminal.done`. Final acceptance still requires the autonomous v0.7.3 hosted release path.

- Observation: Focused release tests passed 20/20; compatibility critical passed 9/9; ci:contract passed; release:prepublish passed 101/101 release-ci chunks, 50 workflow coverage tests, 204 significant coverage tests, and 16 release-critical tests.
  Impact: Hosted evidence now preserves immutable TESTER verification and cannot merge until the exact closure SHA has a successful GitHub Actions-owned PR verification check.
  Resolution: Accept the implementation for hosted CI, integration, and the live v0.7.3 release-tail proof.

- Observation: Focused release tests passed 20/20; compatibility critical passed 9/9; ci:contract passed; release:prepublish passed 101/101 release-ci chunks, 50 workflow coverage tests, 204 significant coverage tests, and 16 release-critical tests.
  Impact: Hosted evidence preserves immutable TESTER verification and the evidence PR cannot merge until its exact SHA has the required GitHub Actions-owned verification check.
  Resolution: Accept for hosted CI, integration, and live v0.7.3 release-tail proof.

- Observation: Passed: focused release-tail contracts (20 tests), critical efficiency baseline (9 tests), ci:contract, release:prepublish, full-fast unit suite (538 files / 3794 tests), and all 12 critical CLI/E2E chunks.
  Impact: The current canonical implementation target is covered by concrete deterministic evidence; hosted publish and evidence-merge behavior remains the release-time acceptance gate.
  Resolution: Accept local verification and proceed to independent evaluator review plus hosted PR and release validation.
