---
id: "202603250509-6CN8CS"
title: "Fix branch_pr worktrees to materialize local-backend task READMEs"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-03-25T05:10:36.809Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T05:23:38.350Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
    Result: pass
    Evidence: 9 tests passed, including the new fresh-worktree local-backend README seeding regression.
    Scope: branch_pr work start plus worktree lifecycle bootstrap.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0.
    Scope: repo-local CLI/runtime compilation for the changed paths.
    
    Command: bunx prettier --check packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts && bunx eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
    Result: pass
    Evidence: prettier matched and eslint reported no findings.
    Scope: changed files only.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement local-backend README seeding for fresh branch_pr worktrees and lock it with an integration regression."
events:
  -
    type: "status"
    at: "2026-03-25T05:21:01.882Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement local-backend README seeding for fresh branch_pr worktrees and lock it with an integration regression."
  -
    type: "verify"
    at: "2026-03-25T05:23:38.350Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
      Result: pass
      Evidence: 9 tests passed, including the new fresh-worktree local-backend README seeding regression.
      Scope: branch_pr work start plus worktree lifecycle bootstrap.
      
      Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: both package builds exited with code 0.
      Scope: repo-local CLI/runtime compilation for the changed paths.
      
      Command: bunx prettier --check packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts && bunx eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
      Result: pass
      Evidence: prettier matched and eslint reported no findings.
      Scope: changed files only.
doc_version: 3
doc_updated_at: "2026-03-25T05:23:38.355Z"
doc_updated_by: "CODER"
description: "Ensure a fresh branch_pr worktree can run owner-scoped lifecycle commands against local-backend tasks without manual README copying from the base checkout."
sections:
  Summary: |-
    Fix branch_pr worktrees to materialize local-backend task READMEs
    
    Ensure a fresh branch_pr worktree can run owner-scoped lifecycle commands against local-backend tasks without manual README copying from the base checkout.
  Scope: |-
    - In scope: Ensure a fresh branch_pr worktree can run owner-scoped lifecycle commands against local-backend tasks without manual README copying from the base checkout.
    - Out of scope: unrelated refactors not required for "Fix branch_pr worktrees to materialize local-backend task READMEs".
  Plan: |-
    1. Reproduce branch_pr worktree bootstrap against the local backend and confirm which task README and metadata paths are missing in a fresh worktree.
    2. Change the work start/local-backend handoff so the task README contract is materialized in the task worktree before owner-scoped lifecycle commands run.
    3. Add regression coverage for start-ready and other task lifecycle commands in a fresh worktree, without manual README copying from the base checkout.
  Verify Steps: |-
    1. Reproduce branch_pr work start in a fresh worktree for a local-backend task. Expected: owner-scoped lifecycle commands can find the task README without manual copying from the base checkout.
    2. Run the targeted worktree lifecycle regression suite. Expected: fresh-worktree start-ready and related task commands pass after the fix.
    3. Confirm no manual README bootstrap is needed in the documented branch_pr flow. Expected: the runtime now materializes the task contract automatically.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T05:23:38.350Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts\nResult: pass\nEvidence: 9 tests passed, including the new fresh-worktree local-backend README seeding regression.\nScope: branch_pr work start plus worktree lifecycle bootstrap.\n\nCommand: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build\nResult: pass\nEvidence: both package builds exited with code 0.\nScope: repo-local CLI/runtime compilation for the changed paths.\n\nCommand: bunx prettier --check packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts && bunx eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts\nResult: pass\nEvidence: prettier matched and eslint reported no findings.\nScope: changed files only.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T05:21:01.891Z, excerpt_hash=sha256:2a37864a8e34620300716900b4fa6414d818990d41be7c1ab251c01d410b8d79
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix branch_pr worktrees to materialize local-backend task READMEs

Ensure a fresh branch_pr worktree can run owner-scoped lifecycle commands against local-backend tasks without manual README copying from the base checkout.

## Scope

- In scope: Ensure a fresh branch_pr worktree can run owner-scoped lifecycle commands against local-backend tasks without manual README copying from the base checkout.
- Out of scope: unrelated refactors not required for "Fix branch_pr worktrees to materialize local-backend task READMEs".

## Plan

1. Reproduce branch_pr worktree bootstrap against the local backend and confirm which task README and metadata paths are missing in a fresh worktree.
2. Change the work start/local-backend handoff so the task README contract is materialized in the task worktree before owner-scoped lifecycle commands run.
3. Add regression coverage for start-ready and other task lifecycle commands in a fresh worktree, without manual README copying from the base checkout.

## Verify Steps

1. Reproduce branch_pr work start in a fresh worktree for a local-backend task. Expected: owner-scoped lifecycle commands can find the task README without manual copying from the base checkout.
2. Run the targeted worktree lifecycle regression suite. Expected: fresh-worktree start-ready and related task commands pass after the fix.
3. Confirm no manual README bootstrap is needed in the documented branch_pr flow. Expected: the runtime now materializes the task contract automatically.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T05:23:38.350Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts\nResult: pass\nEvidence: 9 tests passed, including the new fresh-worktree local-backend README seeding regression.\nScope: branch_pr work start plus worktree lifecycle bootstrap.\n\nCommand: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build\nResult: pass\nEvidence: both package builds exited with code 0.\nScope: repo-local CLI/runtime compilation for the changed paths.\n\nCommand: bunx prettier --check packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts && bunx eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts\nResult: pass\nEvidence: prettier matched and eslint reported no findings.\nScope: changed files only.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T05:21:01.891Z, excerpt_hash=sha256:2a37864a8e34620300716900b4fa6414d818990d41be7c1ab251c01d410b8d79

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
