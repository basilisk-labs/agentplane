---
id: "202603141209-6KFQMD"
title: "Add verify-aware parity between task derive and task new"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
depends_on: []
tags:
  - "code"
  - "tasks"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/commands/task/*.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T12:37:50.075Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T12:43:24.987Z"
  updated_by: "CODER"
  note: "Verified: task derive now accepts --verify, persists verify commands, seeds README Verify Steps for verify-required derived tasks, and passes the declared vitest and TypeScript checks."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add verify-aware parity between task derive and task new so derived code tasks start with the same verification scaffold expectations."
events:
  -
    type: "status"
    at: "2026-03-14T12:37:50.480Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add verify-aware parity between task derive and task new so derived code tasks start with the same verification scaffold expectations."
  -
    type: "verify"
    at: "2026-03-14T12:43:24.987Z"
    author: "CODER"
    state: "ok"
    note: "Verified: task derive now accepts --verify, persists verify commands, seeds README Verify Steps for verify-required derived tasks, and passes the declared vitest and TypeScript checks."
doc_version: 3
doc_updated_at: "2026-03-14T12:43:24.989Z"
doc_updated_by: "CODER"
description: "Extend task derive so derived implementation tasks can carry verify commands and README acceptance scaffolding comparable to task new, instead of requiring extra manual setup before approval or start."
sections:
  Summary: |-
    Add verify-aware parity between task derive and task new
    
    Extend task derive so derived implementation tasks can carry verify commands and README acceptance scaffolding comparable to task new, instead of requiring extra manual setup before approval or start.
  Scope: |-
    - In scope: Extend task derive so derived implementation tasks can carry verify commands and README acceptance scaffolding comparable to task new, instead of requiring extra manual setup before approval or start.
    - Out of scope: unrelated refactors not required for "Add verify-aware parity between task derive and task new".
  Plan: "1. Extend task derive input parsing and command behavior so derived implementation tasks can accept verify commands. 2. Seed README acceptance scaffolding for verify-required derived tasks in the same way task new does. 3. Cover the parity behavior with derive-focused command and CLI regressions."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/commands/task/*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T12:43:24.987Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: task derive now accepts --verify, persists verify commands, seeds README Verify Steps for verify-required derived tasks, and passes the declared vitest and TypeScript checks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T12:37:50.481Z, excerpt_hash=sha256:106b9a77682c7e88629cfdb67981de9465a0050b42a7b2a1524010103db5b584
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add verify-aware parity between task derive and task new

Extend task derive so derived implementation tasks can carry verify commands and README acceptance scaffolding comparable to task new, instead of requiring extra manual setup before approval or start.

## Scope

- In scope: Extend task derive so derived implementation tasks can carry verify commands and README acceptance scaffolding comparable to task new, instead of requiring extra manual setup before approval or start.
- Out of scope: unrelated refactors not required for "Add verify-aware parity between task derive and task new".

## Plan

1. Extend task derive input parsing and command behavior so derived implementation tasks can accept verify commands. 2. Seed README acceptance scaffolding for verify-required derived tasks in the same way task new does. 3. Cover the parity behavior with derive-focused command and CLI regressions.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/commands/task/*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T12:43:24.987Z — VERIFY — ok

By: CODER

Note: Verified: task derive now accepts --verify, persists verify commands, seeds README Verify Steps for verify-required derived tasks, and passes the declared vitest and TypeScript checks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T12:37:50.481Z, excerpt_hash=sha256:106b9a77682c7e88629cfdb67981de9465a0050b42a7b2a1524010103db5b584

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
