---
id: "202603250509-YN909A"
title: "Fix branch_pr integrate with local-backend task artifacts on base checkout"
result_summary: "integrate: squash task/202603250509-YN909A/integrate-artifacts"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "branch_pr"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T05:10:36.807Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T05:34:38.816Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts
    Result: pass
    Evidence: 19 integrate and merge tests passed, including the new untracked local-backend task-artifact collision regression.
    Scope: branch_pr integrate collision handling on the base checkout plus merge helper behavior.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0.
    Scope: repo-local compilation for the updated integrate path.
    
    Command: bunx prettier --check packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/merge.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts && bunx eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/merge.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts
    Result: pass
    Evidence: prettier matched and eslint reported no findings.
    Scope: changed files only.
commit:
  hash: "35937b4744a0404e59e6fc495ae0ab0ece06dc33"
  message: "📝 YN909A tasks: persist branch_pr PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the base-checkout integrate collision with local-backend task artifacts and remove the need for manual artifact shuffling."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603250509-YN909A/pr."
events:
  -
    type: "status"
    at: "2026-03-25T05:25:51.757Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the base-checkout integrate collision with local-backend task artifacts and remove the need for manual artifact shuffling."
  -
    type: "verify"
    at: "2026-03-25T05:34:38.816Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts
      Result: pass
      Evidence: 19 integrate and merge tests passed, including the new untracked local-backend task-artifact collision regression.
      Scope: branch_pr integrate collision handling on the base checkout plus merge helper behavior.
      
      Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: both package builds exited with code 0.
      Scope: repo-local compilation for the updated integrate path.
      
      Command: bunx prettier --check packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/merge.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts && bunx eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/merge.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts
      Result: pass
      Evidence: prettier matched and eslint reported no findings.
      Scope: changed files only.
  -
    type: "status"
    at: "2026-03-25T06:01:55.940Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603250509-YN909A/pr."
doc_version: 3
doc_updated_at: "2026-03-25T06:01:55.940Z"
doc_updated_by: "INTEGRATOR"
description: "Make branch_pr integration succeed when local-backend task README and pr artifacts already exist on the base checkout, instead of failing because git merge refuses to overwrite untracked task files."
sections:
  Summary: |-
    Fix branch_pr integrate with local-backend task artifacts on base checkout
    
    Make branch_pr integration succeed when local-backend task README and pr artifacts already exist on the base checkout, instead of failing because git merge refuses to overwrite untracked task files.
  Scope: |-
    - In scope: Make branch_pr integration succeed when local-backend task README and pr artifacts already exist on the base checkout, instead of failing because git merge refuses to overwrite untracked task files.
    - Out of scope: unrelated refactors not required for "Fix branch_pr integrate with local-backend task artifacts on base checkout".
  Plan: |-
    1. Reproduce branch_pr integrate against a base checkout that already has local-backend task README and PR artifacts present as untracked files.
    2. Change the integrate path so local-backend task artifacts no longer collide with git merge --squash when the task branch carries tracked copies of the same paths.
    3. Add regression coverage that proves canonical integrate succeeds without manual moving or deleting task artifacts on the base checkout.
  Verify Steps: |-
    1. Reproduce branch_pr integrate from the pinned base branch while the local backend already has task artifacts present. Expected: canonical integrate succeeds without manual moving or deleting the task subtree.
    2. Run targeted integration regression coverage. Expected: merge --squash no longer collides with local-backend task artifacts on the base checkout.
    3. Confirm the documented branch_pr integrate path works end to end without ad hoc workarounds. Expected: no manual backup/restore of task artifacts is required.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T05:34:38.816Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts\nResult: pass\nEvidence: 19 integrate and merge tests passed, including the new untracked local-backend task-artifact collision regression.\nScope: branch_pr integrate collision handling on the base checkout plus merge helper behavior.\n\nCommand: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build\nResult: pass\nEvidence: both package builds exited with code 0.\nScope: repo-local compilation for the updated integrate path.\n\nCommand: bunx prettier --check packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/merge.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts && bunx eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/merge.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts\nResult: pass\nEvidence: prettier matched and eslint reported no findings.\nScope: changed files only.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T05:25:51.760Z, excerpt_hash=sha256:3d37cce6ae343d8216e58268213663466be252fc7e3684b2abd91c108d4472d9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix branch_pr integrate with local-backend task artifacts on base checkout

Make branch_pr integration succeed when local-backend task README and pr artifacts already exist on the base checkout, instead of failing because git merge refuses to overwrite untracked task files.

## Scope

- In scope: Make branch_pr integration succeed when local-backend task README and pr artifacts already exist on the base checkout, instead of failing because git merge refuses to overwrite untracked task files.
- Out of scope: unrelated refactors not required for "Fix branch_pr integrate with local-backend task artifacts on base checkout".

## Plan

1. Reproduce branch_pr integrate against a base checkout that already has local-backend task README and PR artifacts present as untracked files.
2. Change the integrate path so local-backend task artifacts no longer collide with git merge --squash when the task branch carries tracked copies of the same paths.
3. Add regression coverage that proves canonical integrate succeeds without manual moving or deleting task artifacts on the base checkout.

## Verify Steps

1. Reproduce branch_pr integrate from the pinned base branch while the local backend already has task artifacts present. Expected: canonical integrate succeeds without manual moving or deleting the task subtree.
2. Run targeted integration regression coverage. Expected: merge --squash no longer collides with local-backend task artifacts on the base checkout.
3. Confirm the documented branch_pr integrate path works end to end without ad hoc workarounds. Expected: no manual backup/restore of task artifacts is required.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T05:34:38.816Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts\nResult: pass\nEvidence: 19 integrate and merge tests passed, including the new untracked local-backend task-artifact collision regression.\nScope: branch_pr integrate collision handling on the base checkout plus merge helper behavior.\n\nCommand: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build\nResult: pass\nEvidence: both package builds exited with code 0.\nScope: repo-local compilation for the updated integrate path.\n\nCommand: bunx prettier --check packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/merge.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts && bunx eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/merge.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts\nResult: pass\nEvidence: prettier matched and eslint reported no findings.\nScope: changed files only.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T05:25:51.760Z, excerpt_hash=sha256:3d37cce6ae343d8216e58268213663466be252fc7e3684b2abd91c108d4472d9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
