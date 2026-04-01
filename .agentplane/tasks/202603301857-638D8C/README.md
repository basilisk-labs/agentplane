---
id: "202603301857-638D8C"
title: "Remove temporary back-compat aliases after caller migration"
result_summary: "integrate: squash task/202603301857-638D8C/drop-command-context-aliases"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202603301857-3KGV43"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T10:29:50.088Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T11:05:38.434Z"
  updated_by: "CODER"
  note: "Refreshed R4.4 verification on current main baseline: focused eslint slice passed and focused vitest slice passed (61 tests) after removing CommandContext back-compat aliases from task-backend helpers and aligning affected fixtures."
commit:
  hash: "4ad65e64af136c51e960fda791cc39632cc75494"
  message: "🧩 638D8C integrate: squash task/202603301857-638D8C/drop-command-context-aliases"
comments:
  -
    author: "CODER"
    body: "Start: remove CommandContext alias fields now that callers have migrated to resolvedProject/taskBackend and keep test fixtures aligned with the narrower type."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-638D8C/pr."
events:
  -
    type: "status"
    at: "2026-03-31T10:30:12.859Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove CommandContext alias fields now that callers have migrated to resolvedProject/taskBackend and keep test fixtures aligned with the narrower type."
  -
    type: "verify"
    at: "2026-03-31T10:33:19.985Z"
    author: "CODER"
    state: "ok"
    note: "Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-638D8C-drop-command-context-aliases/.tmp bunx eslint packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts; Result: pass; Evidence: no lint errors. Scope: CommandContext alias removal and affected tests. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-638D8C-drop-command-context-aliases/.tmp bunx vitest run packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/commands/shared/task-store.test.ts; Result: pass; Evidence: 61 tests passed. Scope: shared backend/store helpers plus affected task helper fixtures remained stable after dropping CommandContext aliases."
  -
    type: "verify"
    at: "2026-03-31T11:05:38.434Z"
    author: "CODER"
    state: "ok"
    note: "Refreshed R4.4 verification on current main baseline: focused eslint slice passed and focused vitest slice passed (61 tests) after removing CommandContext back-compat aliases from task-backend helpers and aligning affected fixtures."
  -
    type: "status"
    at: "2026-03-31T11:09:03.226Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-638D8C/pr."
doc_version: 3
doc_updated_at: "2026-03-31T11:09:03.231Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 4 / R4.4 from REFACTOR.md. the command context no longer carries duplicate naming solely for transitional compatibility."
sections:
  Summary: |-
    Remove temporary back-compat aliases after caller migration
    
    Implement Epic 4 / R4.4 from REFACTOR.md. the command context no longer carries duplicate naming solely for transitional compatibility.
  Scope: |-
    - In scope: Implement Epic 4 / R4.4 from REFACTOR.md. the command context no longer carries duplicate naming solely for transitional compatibility.
    - Out of scope: unrelated refactors not required for "Remove temporary back-compat aliases after caller migration".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/commands/shared/task-backend.ts` to isolate the exact behavior gap for R4.4.
    2. Implement the smallest change set that satisfies the REFACTOR contract: the command context no longer carries duplicate naming solely for transitional compatibility.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/commands/shared/task-backend.ts`. Expected: the behavior described by R4.4 is observable and stable.
    2. Inspect the final diff for 202603301857-638D8C. Expected: scope stays limited to `packages/agentplane/src/commands/shared/task-backend.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: the command context no longer carries duplicate naming solely for transitional compatibility.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T10:33:19.985Z — VERIFY — ok
    By: CODER
    Note: Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-638D8C-drop-command-context-aliases/.tmp bunx eslint packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts; Result: pass; Evidence: no lint errors. Scope: CommandContext alias removal and affected tests. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-638D8C-drop-command-context-aliases/.tmp bunx vitest run packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/commands/shared/task-store.test.ts; Result: pass; Evidence: 61 tests passed. Scope: shared backend/store helpers plus affected task helper fixtures remained stable after dropping CommandContext aliases.
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:30:12.861Z, excerpt_hash=sha256:068a45fb7caddddc20128e66128b976edcd3330087ce5ebb97b33994e989d49b
    ### 2026-03-31T11:05:38.434Z — VERIFY — ok
    By: CODER
    Note: Refreshed R4.4 verification on current main baseline: focused eslint slice passed and focused vitest slice passed (61 tests) after removing CommandContext back-compat aliases from task-backend helpers and aligning affected fixtures.
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:33:19.989Z, excerpt_hash=sha256:068a45fb7caddddc20128e66128b976edcd3330087ce5ebb97b33994e989d49b
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove temporary back-compat aliases after caller migration

Implement Epic 4 / R4.4 from REFACTOR.md. the command context no longer carries duplicate naming solely for transitional compatibility.

## Scope

- In scope: Implement Epic 4 / R4.4 from REFACTOR.md. the command context no longer carries duplicate naming solely for transitional compatibility.
- Out of scope: unrelated refactors not required for "Remove temporary back-compat aliases after caller migration".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/commands/shared/task-backend.ts` to isolate the exact behavior gap for R4.4.
2. Implement the smallest change set that satisfies the REFACTOR contract: the command context no longer carries duplicate naming solely for transitional compatibility.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/commands/shared/task-backend.ts`. Expected: the behavior described by R4.4 is observable and stable.
2. Inspect the final diff for 202603301857-638D8C. Expected: scope stays limited to `packages/agentplane/src/commands/shared/task-backend.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: the command context no longer carries duplicate naming solely for transitional compatibility.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T10:33:19.985Z — VERIFY — ok
By: CODER
Note: Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-638D8C-drop-command-context-aliases/.tmp bunx eslint packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts; Result: pass; Evidence: no lint errors. Scope: CommandContext alias removal and affected tests. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-638D8C-drop-command-context-aliases/.tmp bunx vitest run packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/commands/shared/task-store.test.ts; Result: pass; Evidence: 61 tests passed. Scope: shared backend/store helpers plus affected task helper fixtures remained stable after dropping CommandContext aliases.
VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:30:12.861Z, excerpt_hash=sha256:068a45fb7caddddc20128e66128b976edcd3330087ce5ebb97b33994e989d49b
### 2026-03-31T11:05:38.434Z — VERIFY — ok
By: CODER
Note: Refreshed R4.4 verification on current main baseline: focused eslint slice passed and focused vitest slice passed (61 tests) after removing CommandContext back-compat aliases from task-backend helpers and aligning affected fixtures.
VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:33:19.989Z, excerpt_hash=sha256:068a45fb7caddddc20128e66128b976edcd3330087ce5ebb97b33994e989d49b
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
