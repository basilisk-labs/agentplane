---
id: "202606050702-9E8DFM"
title: "Recover README when closing no-op tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts --config vitest.workspace.ts --project cli-core --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
  - "node scripts/manifest.mjs release-ready --json --sha HEAD --ref HEAD --check-registry"
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T07:02:26.571Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix close-noop README recovery, close stale bookkeeping tasks, and verify release readiness before continuing v0.6.18 publication."
events:
  -
    type: "status"
    at: "2026-06-05T07:02:58.518Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix close-noop README recovery, close stale bookkeeping tasks, and verify release readiness before continuing v0.6.18 publication."
doc_version: 3
doc_updated_at: "2026-06-05T07:02:58.518Z"
doc_updated_by: "CODER"
description: "Fix task close-noop so stale bookkeeping tasks without local README can be closed through the CLI, then close orphan active tasks blocking release readiness."
sections:
  Summary: |-
    Recover README when closing no-op tasks

    Fix task close-noop so stale bookkeeping tasks without local README can be closed through the CLI, then close orphan active tasks blocking release readiness.
  Scope: |-
    - In scope: Fix task close-noop so stale bookkeeping tasks without local README can be closed through the CLI, then close orphan active tasks blocking release readiness.
    - Out of scope: unrelated refactors not required for "Recover README when closing no-op tasks".
  Plan: "Plan: (1) add README recovery to task close-noop matching close-duplicate behavior; (2) extend lifecycle regression coverage for missing README no-op closure; (3) use the fixed CLI to close stale active tasks 202606040927-KSESDS and 202606041702-TVTSM2 as no-op bookkeeping; (4) verify lifecycle tests and release-ready manifest; (5) publish through branch_pr PR and merge before continuing v0.6.18 publish."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts --config vitest.workspace.ts --project cli-core --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node scripts/manifest.mjs release-ready --json --sha HEAD --ref HEAD --check-registry`. Expected: it succeeds and confirms the requested outcome for this task.
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

Recover README when closing no-op tasks

Fix task close-noop so stale bookkeeping tasks without local README can be closed through the CLI, then close orphan active tasks blocking release readiness.

## Scope

- In scope: Fix task close-noop so stale bookkeeping tasks without local README can be closed through the CLI, then close orphan active tasks blocking release readiness.
- Out of scope: unrelated refactors not required for "Recover README when closing no-op tasks".

## Plan

Plan: (1) add README recovery to task close-noop matching close-duplicate behavior; (2) extend lifecycle regression coverage for missing README no-op closure; (3) use the fixed CLI to close stale active tasks 202606040927-KSESDS and 202606041702-TVTSM2 as no-op bookkeeping; (4) verify lifecycle tests and release-ready manifest; (5) publish through branch_pr PR and merge before continuing v0.6.18 publish.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts --config vitest.workspace.ts --project cli-core --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node scripts/manifest.mjs release-ready --json --sha HEAD --ref HEAD --check-registry`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
