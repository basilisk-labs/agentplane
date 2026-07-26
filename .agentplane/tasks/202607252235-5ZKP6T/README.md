---
id: "202607252235-5ZKP6T"
title: "Prevent foreign task artifacts in branch_pr worktrees"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 21
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "correctness"
  - "milestone-alpha2"
  - "v0.7"
  - "workflow"
  - "code"
verify:
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run lifecycle:invariants"
  - "node .agentplane/policy/check-routing.mjs"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T00:20:57.688Z"
  updated_by: "ORCHESTRATOR"
  note: "Re-approved under the user's persistent corrective-scope authorization: bounded historical foreign-README proof and expanded fail-closed verification for the observed XBHBE5 to THDN0G lifecycle shape."
verification:
  state: "ok"
  updated_at: "2026-07-26T01:53:14.289Z"
  updated_by: "TESTER"
  note: "PASS at 35656c7f992fc4e0cda0771bcbaba91109b17f88: strict divergent proof now requires the exact direct first-parent TODO predecessor, a valid TODO-to-DOING Start transition, and verified DONE source; 68 focused tests, 6 CLI-core tests, typecheck, lint, lifecycle, routing, doctor, and diff check passed."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-26T02:01:43.461Z"
  updated_by: "EVALUATOR"
  note: "Rework: strict proof behavior passes the focused security suite, but the task fails the mandatory hotspot gate it itself regressed."
  evaluated_sha: "35656c7f992fc4e0cda0771bcbaba91109b17f88"
  blueprint_digest: "2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb"
  evidence_refs:
    - ".agentplane/tasks/202607252235-5ZKP6T/README.md"
    - ".agentplane/tasks/202607252235-5ZKP6T/quality/20260726-020143461-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607252235-5ZKP6T/quality/20260726-020143461-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607252235-5ZKP6T/quality/20260726-020143461-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json"
    - "bun run hotspots:check (failed: route-decision.ts 614 and workflow-step.ts 611 exceed 600; workflow-step.test.ts 1004 exceeds 1000; oversized baseline 11 entries and 12374 lines exceed budgets)"
    - "git merge-base main HEAD = 220c7f110c07a14b2b055003cd338ad4c1c3503e; 5ZKP diff changes route-decision.ts +15, workflow-step.ts +19, workflow-step.test.ts +4"
    - "bunx vitest run provenance suite: 7 passed"
    - "bunx vitest run focused agentplane suite: 61 passed"
    - "bunx vitest run cli-core worktree runtime: 6 passed"
    - "bun run typecheck; bun run lint:core; bun run lifecycle:invariants; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check (passed; doctor has only historical warnings)"
  findings:
    - "5ZKP changes route-decision.ts from 598 to 613 lines and workflow-step.ts from 591 to 610 lines; both now exceed the runtime 600-line gate."
    - "5ZKP changes workflow-step.test.ts from 999 to 1003 lines, creating a new oversized-test baseline violation; baseline growth must not be used to accept this regression."
    - "The task README states the hotspot failure is pre-existing and outside scope, but git history shows 5cae4c51 is the only commit after merge-base that modifies all three threshold-crossing files."
    - "Focused security behavior is otherwise corroborated: 68 proof and route tests plus 6 CLI-core worktree-runtime tests pass; real XBHBE5/THDN0G remains proof-null and its foreign README is preserved."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-25T22:39:31.207Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-25T23:29:57.587Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: guarded repair may unlink the replica after its authoritative source changed, so the proof is stale at deletion time."
  -
    type: "verify"
    at: "2026-07-25T23:48:22.803Z"
    author: "TESTER"
    state: "ok"
    note: "Verified rework SHA bc47bcd3: 42 focused tests passed; mutation, replacement, missing, and symlinked authoritative-source races each skipped with authoritative_source_changed_before_remove and retained the foreign replica; typecheck, lint, lifecycle, routing, diff, and doctor passed."
  -
    type: "verify"
    at: "2026-07-26T00:08:51.298Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: 49 focused tests pass, but cli-core worktree runtime fails because it still expects a sibling README to be materialized; that contradicts the active-task-only contract and would fail CI."
  -
    type: "verify"
    at: "2026-07-26T01:13:25.790Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: c587 passes the focused and CLI-core gates, but historical proof accepts an unrecorded TODO replica when the first authoritative path snapshot is DOING. This violates the approved strict requirement for a known TODO revision and allows an unknown replica to be deleted."
  -
    type: "verify"
    at: "2026-07-26T01:53:14.289Z"
    author: "TESTER"
    state: "ok"
    note: "PASS at 35656c7f992fc4e0cda0771bcbaba91109b17f88: strict divergent proof now requires the exact direct first-parent TODO predecessor, a valid TODO-to-DOING Start transition, and verified DONE source; 68 focused tests, 6 CLI-core tests, typecheck, lint, lifecycle, routing, doctor, and diff check passed."
doc_version: 3
doc_updated_at: "2026-07-26T02:16:52.940Z"
doc_updated_by: "CODER"
description: "Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion."
sections:
  Summary: |-
    Prevent foreign task artifacts in branch_pr worktrees

    Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.
  Scope: |-
    - In scope: Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.
    - Out of scope: unrelated refactors not required for "Prevent foreign task artifacts in branch_pr worktrees".
  Plan: "1. Preserve active-task-only work-start materialization and all existing TOCTOU protections. 2. Extend deterministic repair only for exactly one regular untracked foreign README in an otherwise clean task worktree; preserve the existing byte-identical and immediate start-ready proofs. 3. Add a fail-closed historical proof that reads only authoritative task branch history: the replica must exactly match a known same-task TODO revision N snapshot; its immediately succeeding authoritative README must be the exact TODO-to-DOING revision N+1 Start transition; the current source must be a later same-task lifecycle state with the same immutable identity and body. Revalidate authoritative branch head, source path-chain identity and content, and replica identity and content immediately before unlink. 4. Model the observed XBHBE5 and THDN0G TODO-to-DOING-to-DONE shape without hardcoding workspace-specific paths; reject ambiguous, missing, or rebased history, changed semantic fields or body, skipped or forged transitions, source or replica race, replacement or symlink, active-task or mixed worktree, and wrong root. 5. Ensure dry-run emits no mutation and safe-apply deletes only the proven replica. 6. Keep alpha.2 and roadmap evidence, run focused and CLI-core safety checks, then repeat independent verification, EVALUATOR review, hosted checks, and normal branch_pr integration."
  Verify Steps: "1. Run the focused work-start, foreign-replica, and CLI-core worktree-runtime suites. Expected: only the active task README is materialized and sibling task queries still work. 2. Add an authoritative-branch-history fixture matching the observed shape: foreign TODO revision N, direct valid Start transition to DOING revision N+1, then current verified or DONE README for the same immutable task/body. Expected: flow repair dry-run with --root emits the repair without mutation, and safe-apply deletes only that proven replica. 3. Prove fail-closed behavior for modified semantic fields or body, no matching historical blob, no direct TODO-to-DOING Start transition, skipped, forged, ambiguous, or rebased history, unavailable or non-regular current source, active-task or mixed worktree, wrong root, and source or replica mutation, replacement, removal, or symlink substitution after inspection. Expected: no deletion. 4. Run the focused suites, bun run typecheck, bun run lint:core, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, agentplane doctor, and git diff --check. 5. Confirm the alpha.2 gate depends on SNV847, THDN0G, and 5ZKP6T and the v0.7 roadmap lists both corrective leaves."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-25T23:29:57.587Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: guarded repair may unlink the replica after its authoritative source changed, so the proof is stale at deletion time.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:10:49.452Z, excerpt_hash=sha256:e861d2f2fe43755547db6bee543bf231d306135ebb7898f1a924c06b90c65dc8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
    - old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607252235-5ZKP6T
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T23:48:22.803Z — VERIFY — ok

    By: TESTER

    Note: Verified rework SHA bc47bcd3: 42 focused tests passed; mutation, replacement, missing, and symlinked authoritative-source races each skipped with authoritative_source_changed_before_remove and retained the foreign replica; typecheck, lint, lifecycle, routing, diff, and doctor passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:29:58.303Z, excerpt_hash=sha256:e861d2f2fe43755547db6bee543bf231d306135ebb7898f1a924c06b90c65dc8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
    - old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

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

    ### 2026-07-26T00:08:51.298Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: 49 focused tests pass, but cli-core worktree runtime fails because it still expects a sibling README to be materialized; that contradicts the active-task-only contract and would fail CI.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:48:23.473Z, excerpt_hash=sha256:e861d2f2fe43755547db6bee543bf231d306135ebb7898f1a924c06b90c65dc8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
    - old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

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

    ### 2026-07-26T01:13:25.790Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: c587 passes the focused and CLI-core gates, but historical proof accepts an unrecorded TODO replica when the first authoritative path snapshot is DOING. This violates the approved strict requirement for a known TODO revision and allows an unknown replica to be deleted.
    Attempts: 2

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T00:20:40.587Z, excerpt_hash=sha256:96932433b93f1fdfdee629869810a6e8b5afc26d89f23967f8b5e90cb3463c12

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
    - old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

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

    ### 2026-07-26T01:53:14.289Z — VERIFY — ok

    By: TESTER

    Note: PASS at 35656c7f992fc4e0cda0771bcbaba91109b17f88: strict divergent proof now requires the exact direct first-parent TODO predecessor, a valid TODO-to-DOING Start transition, and verified DONE source; 68 focused tests, 6 CLI-core tests, typecheck, lint, lifecycle, routing, doctor, and diff check passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T01:13:26.536Z, excerpt_hash=sha256:96932433b93f1fdfdee629869810a6e8b5afc26d89f23967f8b5e90cb3463c12

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
    - old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

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
    - Observation: Deterministic TOCTOU probe changed the authoritative source on inspect's post-proof git-status call; applyForeignTaskReadmeReplicaRepair still returned applied and removed the replica.
      Impact: A destructive repair can delete a README that is no longer an exact byte-identical or TODO-to-DOING replica of the live source.
      Resolution: Capture the authoritative source path-chain identity with the proof and revalidate it immediately before unlink; add a durable regression that mutates the source after proof and expects skipped/no deletion.

    - Observation: Independent TOCTOU probe exercised source mutation, inode replacement, removal, and symlink substitution after proof.
      Impact: A stale proof cannot delete the foreign README after authoritative-source drift.
      Resolution: Source identity and content are revalidated immediately before unlink; all required local checks passed.

    - Observation: packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts:210 asserts the sibling task README exists after work start, although this task intentionally stops foreign task artifact materialization.
      Impact: The relevant cli-core suite fails 1/16 and leaves the new safety invariant without a matching runtime regression assertion.
      Resolution: Update the runtime test to assert the sibling README is absent while sibling task queries still work; rerun the focused and cli-core suites.

    - Observation: The real XBHBE5 contamination is an exact historical THDN0G TODO README while the authoritative THDN0G worktree has advanced through DOING to DONE; the current immediate-replica classifier returns no proof.
      Impact: The repair remains fail-closed but cannot restore the actual blocked XBH worktree, so the approved recovery objective is incomplete.
      Resolution: Re-approved a bounded historical proof contract: accept only an exact branch-history TODO snapshot with an immediate valid Start transition and a later same-task authoritative lifecycle state; cover the real shape and adversarial negative cases before any safe apply.

    - Observation: task-worktree-foreign-artifact-history-proof.ts accepts previousText === null && !seenTaskReadme; the regression test explicitly treats an initial branch Start snapshot as eligible. Actual THDN first-parent README history starts at DOING, so it contains no authoritative TODO commit to prove XBH's replica.
      Impact: A structurally valid but unrecorded TODO README can satisfy proof and be unlinked. The required strict historical source-of-truth guarantee is not met.
      Resolution: Require an exact authoritative same-task TODO blob and fail closed for the XBH/THDN case, or formally define and verify a separate trusted provenance source for the pre-Start README; add a negative regression for an unavailable TODO snapshot.

    - Observation: Direct read-only invocation against the real XBHBE5/THDN0G shape resolved the THDN branch and returned proof:null because its first committed README snapshot is DOING; the XBH replica remains unchanged. Focused provenance coverage preserves wrong bytes, wrong branch, reflog-only, stash-only, post-Start receipt, missing predecessor, source/replica replacement, removal, symlink, and branch-resolution races.
      Impact: The prior unrecorded-TODO authorization path is removed; an unrelated untracked foreign README is eligible only on byte identity or strict authoritative history proof.
      Resolution: No repair, quarantine, publication, PR action, or integration was run. hotspots:check remains nonzero only for unmodified pre-existing route-decision.ts and workflow-step.ts thresholds, not this task's scope.

    - Observation: The EVALUATOR correctly attributed the threshold regressions to 5ZKP: its diff raised route-decision.ts, workflow-step.ts, and workflow-step.test.ts across their baseline limits; the older README claim that the failure was pre-existing was inaccurate.
      Impact: The task could not pass the mandatory hotspot gate despite its strict provenance behavior being otherwise verified.
      Resolution: This rework extracts route-local replica inspection and repair-operation metadata, and moves exhaustive argv projection coverage into a focused test file. hotspots:check now passes with route-decision.ts at 599 and workflow-step.ts at 599 according to the gate, and workflow-step.test.ts no longer expands the oversized-test baseline.
extensions:
  workflow_route_baseline:
    start_head_sha: "220c7f110c07a14b2b055003cd338ad4c1c3503e"
    version: 1
id_source: "generated"
---
## Summary

Prevent foreign task artifacts in branch_pr worktrees

Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.

## Scope

- In scope: Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.
- Out of scope: unrelated refactors not required for "Prevent foreign task artifacts in branch_pr worktrees".

## Plan

1. Preserve active-task-only work-start materialization and all existing TOCTOU protections. 2. Extend deterministic repair only for exactly one regular untracked foreign README in an otherwise clean task worktree; preserve the existing byte-identical and immediate start-ready proofs. 3. Add a fail-closed historical proof that reads only authoritative task branch history: the replica must exactly match a known same-task TODO revision N snapshot; its immediately succeeding authoritative README must be the exact TODO-to-DOING revision N+1 Start transition; the current source must be a later same-task lifecycle state with the same immutable identity and body. Revalidate authoritative branch head, source path-chain identity and content, and replica identity and content immediately before unlink. 4. Model the observed XBHBE5 and THDN0G TODO-to-DOING-to-DONE shape without hardcoding workspace-specific paths; reject ambiguous, missing, or rebased history, changed semantic fields or body, skipped or forged transitions, source or replica race, replacement or symlink, active-task or mixed worktree, and wrong root. 5. Ensure dry-run emits no mutation and safe-apply deletes only the proven replica. 6. Keep alpha.2 and roadmap evidence, run focused and CLI-core safety checks, then repeat independent verification, EVALUATOR review, hosted checks, and normal branch_pr integration.

## Verify Steps

1. Run the focused work-start, foreign-replica, and CLI-core worktree-runtime suites. Expected: only the active task README is materialized and sibling task queries still work. 2. Add an authoritative-branch-history fixture matching the observed shape: foreign TODO revision N, direct valid Start transition to DOING revision N+1, then current verified or DONE README for the same immutable task/body. Expected: flow repair dry-run with --root emits the repair without mutation, and safe-apply deletes only that proven replica. 3. Prove fail-closed behavior for modified semantic fields or body, no matching historical blob, no direct TODO-to-DOING Start transition, skipped, forged, ambiguous, or rebased history, unavailable or non-regular current source, active-task or mixed worktree, wrong root, and source or replica mutation, replacement, removal, or symlink substitution after inspection. Expected: no deletion. 4. Run the focused suites, bun run typecheck, bun run lint:core, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, agentplane doctor, and git diff --check. 5. Confirm the alpha.2 gate depends on SNV847, THDN0G, and 5ZKP6T and the v0.7 roadmap lists both corrective leaves.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-25T23:29:57.587Z — VERIFY — needs_rework

By: TESTER

Note: Rework: guarded repair may unlink the replica after its authoritative source changed, so the proof is stale at deletion time.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:10:49.452Z, excerpt_hash=sha256:e861d2f2fe43755547db6bee543bf231d306135ebb7898f1a924c06b90c65dc8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
- old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607252235-5ZKP6T
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T23:48:22.803Z — VERIFY — ok

By: TESTER

Note: Verified rework SHA bc47bcd3: 42 focused tests passed; mutation, replacement, missing, and symlinked authoritative-source races each skipped with authoritative_source_changed_before_remove and retained the foreign replica; typecheck, lint, lifecycle, routing, diff, and doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:29:58.303Z, excerpt_hash=sha256:e861d2f2fe43755547db6bee543bf231d306135ebb7898f1a924c06b90c65dc8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
- old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

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

### 2026-07-26T00:08:51.298Z — VERIFY — needs_rework

By: TESTER

Note: Rework: 49 focused tests pass, but cli-core worktree runtime fails because it still expects a sibling README to be materialized; that contradicts the active-task-only contract and would fail CI.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:48:23.473Z, excerpt_hash=sha256:e861d2f2fe43755547db6bee543bf231d306135ebb7898f1a924c06b90c65dc8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
- old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

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

### 2026-07-26T01:13:25.790Z — VERIFY — needs_rework

By: TESTER

Note: Rework: c587 passes the focused and CLI-core gates, but historical proof accepts an unrecorded TODO replica when the first authoritative path snapshot is DOING. This violates the approved strict requirement for a known TODO revision and allows an unknown replica to be deleted.
Attempts: 2

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T00:20:40.587Z, excerpt_hash=sha256:96932433b93f1fdfdee629869810a6e8b5afc26d89f23967f8b5e90cb3463c12

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
- old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

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

### 2026-07-26T01:53:14.289Z — VERIFY — ok

By: TESTER

Note: PASS at 35656c7f992fc4e0cda0771bcbaba91109b17f88: strict divergent proof now requires the exact direct first-parent TODO predecessor, a valid TODO-to-DOING Start transition, and verified DONE source; 68 focused tests, 6 CLI-core tests, typecheck, lint, lifecycle, routing, doctor, and diff check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T01:13:26.536Z, excerpt_hash=sha256:96932433b93f1fdfdee629869810a6e8b5afc26d89f23967f8b5e90cb3463c12

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
- old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

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

- Observation: Deterministic TOCTOU probe changed the authoritative source on inspect's post-proof git-status call; applyForeignTaskReadmeReplicaRepair still returned applied and removed the replica.
  Impact: A destructive repair can delete a README that is no longer an exact byte-identical or TODO-to-DOING replica of the live source.
  Resolution: Capture the authoritative source path-chain identity with the proof and revalidate it immediately before unlink; add a durable regression that mutates the source after proof and expects skipped/no deletion.

- Observation: Independent TOCTOU probe exercised source mutation, inode replacement, removal, and symlink substitution after proof.
  Impact: A stale proof cannot delete the foreign README after authoritative-source drift.
  Resolution: Source identity and content are revalidated immediately before unlink; all required local checks passed.

- Observation: packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts:210 asserts the sibling task README exists after work start, although this task intentionally stops foreign task artifact materialization.
  Impact: The relevant cli-core suite fails 1/16 and leaves the new safety invariant without a matching runtime regression assertion.
  Resolution: Update the runtime test to assert the sibling README is absent while sibling task queries still work; rerun the focused and cli-core suites.

- Observation: The real XBHBE5 contamination is an exact historical THDN0G TODO README while the authoritative THDN0G worktree has advanced through DOING to DONE; the current immediate-replica classifier returns no proof.
  Impact: The repair remains fail-closed but cannot restore the actual blocked XBH worktree, so the approved recovery objective is incomplete.
  Resolution: Re-approved a bounded historical proof contract: accept only an exact branch-history TODO snapshot with an immediate valid Start transition and a later same-task authoritative lifecycle state; cover the real shape and adversarial negative cases before any safe apply.

- Observation: task-worktree-foreign-artifact-history-proof.ts accepts previousText === null && !seenTaskReadme; the regression test explicitly treats an initial branch Start snapshot as eligible. Actual THDN first-parent README history starts at DOING, so it contains no authoritative TODO commit to prove XBH's replica.
  Impact: A structurally valid but unrecorded TODO README can satisfy proof and be unlinked. The required strict historical source-of-truth guarantee is not met.
  Resolution: Require an exact authoritative same-task TODO blob and fail closed for the XBH/THDN case, or formally define and verify a separate trusted provenance source for the pre-Start README; add a negative regression for an unavailable TODO snapshot.

- Observation: Direct read-only invocation against the real XBHBE5/THDN0G shape resolved the THDN branch and returned proof:null because its first committed README snapshot is DOING; the XBH replica remains unchanged. Focused provenance coverage preserves wrong bytes, wrong branch, reflog-only, stash-only, post-Start receipt, missing predecessor, source/replica replacement, removal, symlink, and branch-resolution races.
  Impact: The prior unrecorded-TODO authorization path is removed; an unrelated untracked foreign README is eligible only on byte identity or strict authoritative history proof.
  Resolution: No repair, quarantine, publication, PR action, or integration was run. hotspots:check remains nonzero only for unmodified pre-existing route-decision.ts and workflow-step.ts thresholds, not this task's scope.

- Observation: The EVALUATOR correctly attributed the threshold regressions to 5ZKP: its diff raised route-decision.ts, workflow-step.ts, and workflow-step.test.ts across their baseline limits; the older README claim that the failure was pre-existing was inaccurate.
  Impact: The task could not pass the mandatory hotspot gate despite its strict provenance behavior being otherwise verified.
  Resolution: This rework extracts route-local replica inspection and repair-operation metadata, and moves exhaustive argv projection coverage into a focused test file. hotspots:check now passes with route-decision.ts at 599 and workflow-step.ts at 599 according to the gate, and workflow-step.test.ts no longer expands the oversized-test baseline.
