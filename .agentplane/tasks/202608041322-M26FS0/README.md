---
id: "202608041322-M26FS0"
title: "Stabilize hosted release evidence closeout"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
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
  state: "needs_rework"
  updated_at: "2026-08-04T15:38:05.761Z"
  updated_by: "TESTER"
  note: "Release prepublish exposed stale hosted integrate fixtures before intended assertions."
  attempts: 1
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-04T14:43:04.809Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "8005cbc506c4c944c33a096a4ad4d6fdf4a210c0"
  blueprint_digest: "3ac0407a870b976bbcde05604b483f400348a7d0cf6425853a8e72500a570045"
  evidence_refs:
    - ".agentplane/tasks/202608041322-M26FS0/quality/20260804-144157108-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608041322-M26FS0/quality/20260804-144157108-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608041322-M26FS0/quality/objects/sha256/96f830c5e543458739af5f2ad888d04246c5fdedfb178513094388a908e74377.md"
    - ".agentplane/tasks/202608041322-M26FS0/quality/20260804-144157108-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608041322-M26FS0/quality/20260804-144157108-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608041322-M26FS0/quality/20260804-144157108-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608041322-M26FS0/quality/20260804-144157108-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608041322-M26FS0/README.md"
    - ".agentplane/tasks/202608041322-M26FS0/quality/objects/sha256/21f9f0e7d834a7229ec6244e8178eaa2816c3b5379e206b6eeae77026ab2f5ca.patch"
    - ".agentplane/tasks/202608041322-M26FS0/quality/objects/sha256/05e8d39fea825a7fa3ce270bd4cbc34e5ba18e14ca26425300a9266b4b2dbd10.json"
    - ".agentplane/tasks/202608041322-M26FS0/verification/20260804143934380-b5263d23d37a83fe.json"
    - ".agentplane/tasks/202608041322-M26FS0/quality/objects/sha256/57c0cb8505a309b1962f197839c8b5eb2908748355f96e19842360232b470d88.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.release.md"
  findings:
    - "The declared terminal-routing regression was not implemented or executed. The patch tests preservation of verification metadata during evidence application, but does not close a branch_pr task, advance main with an evidence-only README commit, query next-action for terminal.done, or prove that a real implementation commit still makes verification stale."
commit: null
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
  -
    type: "verify"
    at: "2026-08-04T15:38:05.761Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Release prepublish exposed stale hosted integrate fixtures before intended assertions."
doc_version: 3
doc_updated_at: "2026-08-04T15:38:07.113Z"
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

    ### 2026-08-04T15:38:05.761Z — VERIFY — needs_rework

    By: TESTER

    Note: Release prepublish exposed stale hosted integrate fixtures before intended assertions.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T15:12:03.833Z, excerpt_hash=sha256:58fcb1ec6db74ef7a19938f48e4d39814a73563824f3098db990c937dfe61550

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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - v0.7.2 publish run 30911823733 created release-evidence PR #4777 and dispatched Core CI, but the workflow_dispatch run did not attach the required PR verification context to the PR head. The PR required a close/reopen repair before merge.
    - Hosted evidence apply replaced accepted TESTER verification metadata for task 202608041057-WZRXEX without creating a matching immutable verification record. The route regressed from terminal.done to verification_required after the evidence merge.
    - The 0.7.3 release workflow preserves canonical verification metadata, validates the exact evidence closure SHA, waits for Core CI, publishes the required GitHub Actions-owned check, and fails closed until the evidence PR is merged.
    - Independent evaluator finding RCI-001 exposed a missing exact terminal-routing regression. The expanded hosted-close E2E now closes a branch_pr task, records fresh verification and quality, applies an evidence-only README commit, deletes the merged task branch, confirms the live provider state, and requires terminal.done. The negative route regression still requires verification after a semantic implementation advance.
    - Root cause discovered during RCI-001 rework: close-tail detection recognized only the legacy full task ID in a close-scoped subject, while the current close-message builder emits a task-scoped subject and puts the full task ID in the structured Agentplane run body reference. Detection now accepts both legacy commits and current structured commits only when the suffix, exact run ID, and DONE task snapshot all match.
    - Focused rework evidence: six CLI route/hosted-close tests passed with 98 assertions, nine close-tail unit tests passed, targeted ESLint passed, and TypeScript build passed. Full release and evaluator gates must be repeated against the new semantic commit.

    - Observation: bun run release:prepublish and the isolated run-cli.core.pr-flow.integrate-failures.test.ts reproducibly fail three scenarios because pre-merge closure is considered older than the latest verification.
      Impact: The release gate cannot complete and the affected integration scenarios do not reach their intended behavior checks.
      Resolution: Diagnose the fixture and freshness source, preserve the production safety gate, add or adjust regression coverage, then rerun the complete release gate.
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

### 2026-08-04T15:38:05.761Z — VERIFY — needs_rework

By: TESTER

Note: Release prepublish exposed stale hosted integrate fixtures before intended assertions.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T15:12:03.833Z, excerpt_hash=sha256:58fcb1ec6db74ef7a19938f48e4d39814a73563824f3098db990c937dfe61550

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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- v0.7.2 publish run 30911823733 created release-evidence PR #4777 and dispatched Core CI, but the workflow_dispatch run did not attach the required PR verification context to the PR head. The PR required a close/reopen repair before merge.
- Hosted evidence apply replaced accepted TESTER verification metadata for task 202608041057-WZRXEX without creating a matching immutable verification record. The route regressed from terminal.done to verification_required after the evidence merge.
- The 0.7.3 release workflow preserves canonical verification metadata, validates the exact evidence closure SHA, waits for Core CI, publishes the required GitHub Actions-owned check, and fails closed until the evidence PR is merged.
- Independent evaluator finding RCI-001 exposed a missing exact terminal-routing regression. The expanded hosted-close E2E now closes a branch_pr task, records fresh verification and quality, applies an evidence-only README commit, deletes the merged task branch, confirms the live provider state, and requires terminal.done. The negative route regression still requires verification after a semantic implementation advance.
- Root cause discovered during RCI-001 rework: close-tail detection recognized only the legacy full task ID in a close-scoped subject, while the current close-message builder emits a task-scoped subject and puts the full task ID in the structured Agentplane run body reference. Detection now accepts both legacy commits and current structured commits only when the suffix, exact run ID, and DONE task snapshot all match.
- Focused rework evidence: six CLI route/hosted-close tests passed with 98 assertions, nine close-tail unit tests passed, targeted ESLint passed, and TypeScript build passed. Full release and evaluator gates must be repeated against the new semantic commit.

- Observation: bun run release:prepublish and the isolated run-cli.core.pr-flow.integrate-failures.test.ts reproducibly fail three scenarios because pre-merge closure is considered older than the latest verification.
  Impact: The release gate cannot complete and the affected integration scenarios do not reach their intended behavior checks.
  Resolution: Diagnose the fixture and freshness source, preserve the production safety gate, add or adjust regression coverage, then rerun the complete release gate.
