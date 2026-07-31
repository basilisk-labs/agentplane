---
id: "202607311529-773BXT"
title: "Make merged worktree cleanup idempotent"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "post-merge"
  - "release"
verify:
  - "bun run format:check"
  - "bun run test:project agentplane packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T15:29:17.510Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-31T15:34:37.171Z"
  updated_by: "CODER"
  note: "20 focused cleanup/integration tests passed; typecheck, format, lint:core, and release:prepublish:fast passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-31T15:34:38.864Z"
  updated_by: "EVALUATOR"
  note: "Merged-worktree cleanup race is idempotent without hiding genuine failures."
  evaluated_sha: "13509c41f93a7d600c25e11adc5a7aa3d2894c14"
  blueprint_digest: "71d0efdc00c7dce41dfc166c3fcaf5e17dc441f74153342906a8da2e40fc6af7"
  evidence_refs:
    - ".agentplane/tasks/202607311529-773BXT/README.md"
    - ".agentplane/tasks/202607311529-773BXT/quality/20260731-153438864-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607311529-773BXT/quality/20260731-153438864-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607311529-773BXT/quality/20260731-153438864-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607311529-773BXT/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
  findings:
    - "Regression coverage proves stale hints are accepted only after live registration disappears."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make merged worktree cleanup idempotent when post-merge hooks already removed the task worktree and branch."
events:
  -
    type: "status"
    at: "2026-07-31T15:29:40.641Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make merged worktree cleanup idempotent when post-merge hooks already removed the task worktree and branch."
  -
    type: "verify"
    at: "2026-07-31T15:34:37.171Z"
    author: "CODER"
    state: "ok"
    note: "20 focused cleanup/integration tests passed; typecheck, format, lint:core, and release:prepublish:fast passed."
doc_version: 3
doc_updated_at: "2026-07-31T15:34:37.370Z"
doc_updated_by: "CODER"
description: "Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge."
sections:
  Summary: |-
    Make merged worktree cleanup idempotent

    Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge.
  Scope: |-
    - In scope: Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge.
    - Out of scope: unrelated refactors not required for "Make merged worktree cleanup idempotent".
  Plan: "1. Create an isolated post-merge worktree from the maintenance base. 2. Make merged worktree cleanup tolerate a worktree/branch already removed by the post-merge hook while preserving unexpected errors. 3. Add the exact regression and run focused tests, typecheck, format, lint, and release fast gate. 4. Open a maintenance PR, wait for hosted checks, and integrate through the serialized lane."
  Verify Steps: |-
    1. `bun run test:project agentplane packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts`
       Expected: cleanup treats an already removed hook-owned worktree as complete and still surfaces genuine failures while registered.
    2. `bun run typecheck`
       Expected: TypeScript build passes.
    3. `bun run format:check`
       Expected: repository formatting passes.
    4. `bun run lint:core`
       Expected: core lint passes.
    5. `bun run release:prepublish:fast`
       Expected: release gates pass for v0.6.26.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-31T15:34:37.171Z — VERIFY — ok

    By: CODER

    Note: 20 focused cleanup/integration tests passed; typecheck, format, lint:core, and release:prepublish:fast passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T15:34:00.883Z, excerpt_hash=sha256:a2694fba3c6dcdbf34fcfc853c1d4539d7f760370bae809be684266ea4cda9d5

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311529-773BXT-make-merged-worktree-cleanup-idempotent/.agentplane/tasks/202607311529-773BXT/blueprint/resolved-snapshot.json
    - old_digest: 71d0efdc00c7dce41dfc166c3fcaf5e17dc441f74153342906a8da2e40fc6af7
    - current_digest: 71d0efdc00c7dce41dfc166c3fcaf5e17dc441f74153342906a8da2e40fc6af7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311529-773BXT

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr open 202607311529-773BXT --author CODER
    - diagnostic_command: none
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
    - Root cause: `cleanupMergedLocalBranch` trusted a stale `worktreePathHint` after the post-merge hook had already removed both worktree and branch, then treated `git worktree remove` exit 128 as a new integration failure.
    - Resolution: re-check branch worktree registration after a cleanup exception; suppress only the already-removed race and rethrow when the worktree remains registered.
    - Regression coverage includes both the idempotent race and the genuine-failure path.

    - Observation: Post-merge hook cleanup can race with integration cleanup and remove the hinted worktree first.
      Impact: A successful merge returned exit 4/E_IO, misleading the agent into treating completed integration as failed.
      Resolution: After cleanup errors, re-check live worktree registration; accept the already-removed state and rethrow genuine registered-worktree failures.
id_source: "generated"
---
## Summary

Make merged worktree cleanup idempotent

Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge.

## Scope

- In scope: Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge.
- Out of scope: unrelated refactors not required for "Make merged worktree cleanup idempotent".

## Plan

1. Create an isolated post-merge worktree from the maintenance base. 2. Make merged worktree cleanup tolerate a worktree/branch already removed by the post-merge hook while preserving unexpected errors. 3. Add the exact regression and run focused tests, typecheck, format, lint, and release fast gate. 4. Open a maintenance PR, wait for hosted checks, and integrate through the serialized lane.

## Verify Steps

1. `bun run test:project agentplane packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts`
   Expected: cleanup treats an already removed hook-owned worktree as complete and still surfaces genuine failures while registered.
2. `bun run typecheck`
   Expected: TypeScript build passes.
3. `bun run format:check`
   Expected: repository formatting passes.
4. `bun run lint:core`
   Expected: core lint passes.
5. `bun run release:prepublish:fast`
   Expected: release gates pass for v0.6.26.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-31T15:34:37.171Z — VERIFY — ok

By: CODER

Note: 20 focused cleanup/integration tests passed; typecheck, format, lint:core, and release:prepublish:fast passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T15:34:00.883Z, excerpt_hash=sha256:a2694fba3c6dcdbf34fcfc853c1d4539d7f760370bae809be684266ea4cda9d5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607311529-773BXT-make-merged-worktree-cleanup-idempotent/.agentplane/tasks/202607311529-773BXT/blueprint/resolved-snapshot.json
- old_digest: 71d0efdc00c7dce41dfc166c3fcaf5e17dc441f74153342906a8da2e40fc6af7
- current_digest: 71d0efdc00c7dce41dfc166c3fcaf5e17dc441f74153342906a8da2e40fc6af7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311529-773BXT

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr open 202607311529-773BXT --author CODER
- diagnostic_command: none
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

- Root cause: `cleanupMergedLocalBranch` trusted a stale `worktreePathHint` after the post-merge hook had already removed both worktree and branch, then treated `git worktree remove` exit 128 as a new integration failure.
- Resolution: re-check branch worktree registration after a cleanup exception; suppress only the already-removed race and rethrow when the worktree remains registered.
- Regression coverage includes both the idempotent race and the genuine-failure path.

- Observation: Post-merge hook cleanup can race with integration cleanup and remove the hinted worktree first.
  Impact: A successful merge returned exit 4/E_IO, misleading the agent into treating completed integration as failed.
  Resolution: After cleanup errors, re-check live worktree registration; accept the already-removed state and rethrow genuine registered-worktree failures.
