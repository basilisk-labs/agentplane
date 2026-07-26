---
id: "202607252235-5ZKP6T"
title: "Prevent foreign task artifacts in branch_pr worktrees"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 17
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
  state: "needs_rework"
  updated_at: "2026-07-26T00:08:51.298Z"
  updated_by: "TESTER"
  note: "Rework: 49 focused tests pass, but cli-core worktree runtime fails because it still expects a sibling README to be materialized; that contradicts the active-task-only contract and would fail CI."
  attempts: 1
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-25T23:54:36.677Z"
  updated_by: "EVALUATOR"
  note: "Rework: the repair revalidates the authoritative source but can unlink a replica changed after inspection."
  evaluated_sha: "bc47bcd3a0153cba09908fb392d9078d20cc87a1"
  blueprint_digest: "2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb"
  evidence_refs:
    - ".agentplane/tasks/202607252235-5ZKP6T/README.md"
    - ".agentplane/tasks/202607252235-5ZKP6T/quality/20260725-235436677-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607252235-5ZKP6T/quality/20260725-235436677-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607252235-5ZKP6T/quality/20260725-235436677-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.ts:485-523"
    - "packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts:287-318"
    - "bunx vitest run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/shared/task-worktree-foreign-artifact-repair.test.ts packages/agentplane/src/commands/shared/route-decision-blockers.worktree.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 (42 passed)"
  findings:
    - "applyForeignTaskReadmeReplicaRepair captures a fresh replica identity at lines 496-504, then awaits full source revalidation at lines 509-512, and unlinks at line 514 without comparing the target to the original replica proof. A changed regular replica can therefore be deleted."
    - "The durable regression covers only source text mutation after inspection; it does not cover source replacement, removal, symlink substitution, or a replica mutation after proof."
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
doc_version: 3
doc_updated_at: "2026-07-26T00:20:40.587Z"
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
