---
id: "202604270854-N1QDXW"
title: "Extract branch_pr testkit fixture builders"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604270852-PR9VMK"
tags:
  - "branch-pr"
  - "code"
  - "testing"
verify:
  - "bun run typecheck"
  - "bun test packages/testkit packages/agentplane/src/cli/run-cli.core.pr-flow*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T08:56:39.604Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-27T08:56:37.679Z"
doc_updated_by: "PLANNER"
description: "Extract reusable branch_pr fixture builders for git repos, task READMEs, PR meta artifacts, verify logs, worktrees, and hosted-close state to reduce duplication across large CLI and command test suites."
sections:
  Summary: |-
    Extract branch_pr testkit fixture builders
    
    Extract reusable branch_pr fixture builders for git repos, task READMEs, PR meta artifacts, verify logs, worktrees, and hosted-close state to reduce duplication across large CLI and command test suites.
  Scope: |-
    - In scope: Extract reusable branch_pr fixture builders for git repos, task READMEs, PR meta artifacts, verify logs, worktrees, and hosted-close state to reduce duplication across large CLI and command test suites.
    - Out of scope: unrelated refactors not required for "Extract branch_pr testkit fixture builders".
  Plan: "1. Inventory repeated branch_pr test setup across the largest PR flow and hosted close suites. 2. Extract reusable fixture builders into testkit or local shared helpers for repo, task, PR meta, verify logs, branches, and worktrees. 3. Migrate a small representative test slice to prove the builder boundary. 4. Keep behavior assertions unchanged. 5. Verify migrated tests and typecheck."
  Verify Steps: |-
    1. Run `bun test packages/testkit packages/agentplane/src/cli/run-cli.core.pr-flow*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Extract branch_pr testkit fixture builders

Extract reusable branch_pr fixture builders for git repos, task READMEs, PR meta artifacts, verify logs, worktrees, and hosted-close state to reduce duplication across large CLI and command test suites.

## Scope

- In scope: Extract reusable branch_pr fixture builders for git repos, task READMEs, PR meta artifacts, verify logs, worktrees, and hosted-close state to reduce duplication across large CLI and command test suites.
- Out of scope: unrelated refactors not required for "Extract branch_pr testkit fixture builders".

## Plan

1. Inventory repeated branch_pr test setup across the largest PR flow and hosted close suites. 2. Extract reusable fixture builders into testkit or local shared helpers for repo, task, PR meta, verify logs, branches, and worktrees. 3. Migrate a small representative test slice to prove the builder boundary. 4. Keep behavior assertions unchanged. 5. Verify migrated tests and typecheck.

## Verify Steps

1. Run `bun test packages/testkit packages/agentplane/src/cli/run-cli.core.pr-flow*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
