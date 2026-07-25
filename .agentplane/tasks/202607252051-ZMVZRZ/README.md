---
id: "202607252051-ZMVZRZ"
title: "Make merged worktree cleanup resilient to partial removal"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "cleanup"
  - "correctness"
  - "v0.7"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T22:12:38.307Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-25T22:45:07.482Z"
  updated_by: "TESTER"
  note: "Independent TESTER verification passed for PR #4622 at 6c19d647."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-25T22:47:37.098Z"
  updated_by: "EVALUATOR"
  note: "Pass: the cleanup-only implementation satisfies the approved recovery and idempotence contract at HEAD 6c19d647."
  evaluated_sha: "6c19d647ac0428ba1ffe5dbec72e87a0ad75b0b3"
  blueprint_digest: "92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced"
  evidence_refs:
    - ".agentplane/tasks/202607252051-ZMVZRZ/README.md"
    - ".agentplane/tasks/202607252051-ZMVZRZ/quality/20260725-224737098-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607252051-ZMVZRZ/quality/20260725-224737098-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607252051-ZMVZRZ/quality/20260725-224737098-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607252051-ZMVZRZ/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/merged-branch-cleanup.ts"
    - "packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts"
    - "bun test focused cleanup suite: 31 pass"
    - "typecheck, lint:core, guards:check, lifecycle:invariants, and policy routing passed"
  findings:
    - "Partial-removal recovery runs only after existing clean, repo-local, non-current-worktree and expected-head safeguards; failed orphan removal preserves the branch with a diagnosed E_GIT outcome."
    - "Remote deletion checks the remote ref before push and treats a branch that disappears in the deletion race as idempotent success."
commit:
  hash: "6c19d647ac0428ba1ffe5dbec72e87a0ad75b0b3"
  message: "🧩 ZMVZRZ cleanup: recover partial worktree removal"
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
    at: "2026-07-25T22:13:26.524Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-25T22:45:07.482Z"
    author: "TESTER"
    state: "ok"
    note: "Independent TESTER verification passed for PR #4622 at 6c19d647."
  -
    type: "status"
    at: "2026-07-25T22:48:33.868Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-25T22:48:33.868Z"
doc_updated_by: "CODER"
description: "Harden branch_pr cleanup after a verified merged task: remove a clean worktree without leaving an unregistered directory if Git removal partially succeeds, and treat an already-deleted remote task branch as a successful terminal state. Preserve strict protections for dirty, outside-repo, and current worktrees. Add focused regression coverage for the partial-removal and absent-remote cases."
sections:
  Summary: |-
    Make merged worktree cleanup resilient to partial removal

    Harden branch_pr cleanup after a verified merged task: remove a clean worktree without leaving an unregistered directory if Git removal partially succeeds, and treat an already-deleted remote task branch as a successful terminal state. Preserve strict protections for dirty, outside-repo, and current worktrees. Add focused regression coverage for the partial-removal and absent-remote cases.
  Scope: "In scope: harden merged branch_pr worktree removal after a clean verified task, including partial Git removal recovery and idempotent absent-remote branch deletion. Preserve dirty, outside-repo, current-worktree, and expected-head protections. Out of scope: broad cleanup redesign or deletion of unproven directories."
  Plan: "1. Reproduce cleanup against a clean merged worktree and inspect Git removal behavior when a path becomes unregistered before directory deletion. 2. Make cleanup remove only a proven clean task worktree atomically or report a recoverable state without orphaning it. 3. Treat a remote task branch already absent after provider merge as idempotent success. 4. Retain all dirty, current, outside-root, and expected-head race guards. 5. Add focused cleanup regressions and run cleanup, type, lint, policy, and lifecycle checks."
  Verify Steps: "1. Focused cleanup regression proves a clean proven worktree is fully removed or leaves a diagnosed recoverable state without silently dropping branch proof. 2. A remote branch missing before delete is accepted as idempotent success. 3. Dirty, outside-root, current-worktree, and expected-head race fixtures remain refused. 4. bun test packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts pass. 5. bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, and node .agentplane/policy/check-routing.mjs pass."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-25T22:45:07.482Z — VERIFY — ok

    By: TESTER

    Note: Independent TESTER verification passed for PR #4622 at 6c19d647.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T22:13:26.524Z, excerpt_hash=sha256:981d4aea803e94843e61c8a0adac0e6e56006c7b865f834021bf89cf7d83557a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252051-ZMVZRZ-make-merged-worktree-cleanup-resilient/.agentplane/tasks/202607252051-ZMVZRZ/blueprint/resolved-snapshot.json
    - old_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
    - current_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252051-ZMVZRZ

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607252051-ZMVZRZ
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task PR as one unit. This restores the previous cleanup behavior; no task branch, worktree, or remote ref is removed without its existing proof guards."
  Findings: |-
    - Observation: 31 focused cleanup tests passed, including partial worktree recovery and an already-absent remote branch; typecheck, lint:core, guards:check, lifecycle:invariants, and policy routing all passed.
      Impact: Cleanup now has independently verified recovery and idempotence coverage while preserving dirty, outside-root, current-worktree, and expected-head race refusals.
      Resolution: No rework required; the task may proceed to its PR closure route.
extensions:
  workflow_route_baseline:
    start_head_sha: "220c7f110c07a14b2b055003cd338ad4c1c3503e"
    version: 1
id_source: "generated"
---
## Summary

Make merged worktree cleanup resilient to partial removal

Harden branch_pr cleanup after a verified merged task: remove a clean worktree without leaving an unregistered directory if Git removal partially succeeds, and treat an already-deleted remote task branch as a successful terminal state. Preserve strict protections for dirty, outside-repo, and current worktrees. Add focused regression coverage for the partial-removal and absent-remote cases.

## Scope

In scope: harden merged branch_pr worktree removal after a clean verified task, including partial Git removal recovery and idempotent absent-remote branch deletion. Preserve dirty, outside-repo, current-worktree, and expected-head protections. Out of scope: broad cleanup redesign or deletion of unproven directories.

## Plan

1. Reproduce cleanup against a clean merged worktree and inspect Git removal behavior when a path becomes unregistered before directory deletion. 2. Make cleanup remove only a proven clean task worktree atomically or report a recoverable state without orphaning it. 3. Treat a remote task branch already absent after provider merge as idempotent success. 4. Retain all dirty, current, outside-root, and expected-head race guards. 5. Add focused cleanup regressions and run cleanup, type, lint, policy, and lifecycle checks.

## Verify Steps

1. Focused cleanup regression proves a clean proven worktree is fully removed or leaves a diagnosed recoverable state without silently dropping branch proof. 2. A remote branch missing before delete is accepted as idempotent success. 3. Dirty, outside-root, current-worktree, and expected-head race fixtures remain refused. 4. bun test packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts pass. 5. bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, and node .agentplane/policy/check-routing.mjs pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-25T22:45:07.482Z — VERIFY — ok

By: TESTER

Note: Independent TESTER verification passed for PR #4622 at 6c19d647.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T22:13:26.524Z, excerpt_hash=sha256:981d4aea803e94843e61c8a0adac0e6e56006c7b865f834021bf89cf7d83557a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252051-ZMVZRZ-make-merged-worktree-cleanup-resilient/.agentplane/tasks/202607252051-ZMVZRZ/blueprint/resolved-snapshot.json
- old_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
- current_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252051-ZMVZRZ

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607252051-ZMVZRZ
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task PR as one unit. This restores the previous cleanup behavior; no task branch, worktree, or remote ref is removed without its existing proof guards.

## Findings

- Observation: 31 focused cleanup tests passed, including partial worktree recovery and an already-absent remote branch; typecheck, lint:core, guards:check, lifecycle:invariants, and policy routing all passed.
  Impact: Cleanup now has independently verified recovery and idempotence coverage while preserving dirty, outside-root, current-worktree, and expected-head race refusals.
  Resolution: No rework required; the task may proceed to its PR closure route.
