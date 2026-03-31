---
id: "202603301857-3KGV43"
title: "Introduce a lightweight read-only usecase context"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603301856-VXFT03"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T10:13:06.957Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T10:23:36.995Z"
  updated_by: "CODER"
  note: "Read-only usecase context unit tests and task list query contract passed after removing full context allocation from taskListUsecase."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split read-only usecase context from the full adapter/policy bundle so task list no longer allocates unused execution scaffolding."
events:
  -
    type: "status"
    at: "2026-03-31T10:13:54.344Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split read-only usecase context from the full adapter/policy bundle so task list no longer allocates unused execution scaffolding."
  -
    type: "verify"
    at: "2026-03-31T10:22:44.107Z"
    author: "CODER"
    state: "ok"
    note: "Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-3KGV43-readonly-usecase-context/.tmp bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/usecases/task/task-list-usecase.unit.test.ts; Result: pass; Evidence: 3 tests passed. Scope: read-only usecase context factories and task-list caller. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-3KGV43-readonly-usecase-context/.tmp bunx eslint packages/agentplane/src/usecases/context/resolve-context.ts packages/agentplane/src/usecases/task/task-list-usecase.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/usecases/task/task-list-usecase.unit.test.ts; Result: pass; Evidence: no lint errors. Scope: changed usecase context and caller files. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-3KGV43-readonly-usecase-context/.tmp bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t \"task list|task search|task next\"; Result: pass; Evidence: 16 passed, 25 skipped. Scope: query command behavior remained stable."
  -
    type: "verify"
    at: "2026-03-31T10:23:36.995Z"
    author: "CODER"
    state: "ok"
    note: "Read-only usecase context unit tests and task list query contract passed after removing full context allocation from taskListUsecase."
doc_version: 3
doc_updated_at: "2026-03-31T10:23:37.000Z"
doc_updated_by: "CODER"
description: "Implement Epic 4 / R4.3 from REFACTOR.md. read-only commands no longer allocate adapters or extra policy wrappers unless they actually use them."
sections:
  Summary: |-
    Introduce a lightweight read-only usecase context
    
    Implement Epic 4 / R4.3 from REFACTOR.md. read-only commands no longer allocate adapters or extra policy wrappers unless they actually use them.
  Scope: |-
    - In scope: Implement Epic 4 / R4.3 from REFACTOR.md. read-only commands no longer allocate adapters or extra policy wrappers unless they actually use them.
    - Out of scope: unrelated refactors not required for "Introduce a lightweight read-only usecase context".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/usecases/context/resolve-context.ts`, usecase callers to isolate the exact behavior gap for R4.3.
    2. Implement the smallest change set that satisfies the REFACTOR contract: read-only commands no longer allocate adapters or extra policy wrappers unless they actually use them.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/usecases/context/resolve-context.ts`, usecase callers. Expected: the behavior described by R4.3 is observable and stable.
    2. Inspect the final diff for 202603301857-3KGV43. Expected: scope stays limited to `packages/agentplane/src/usecases/context/resolve-context.ts`, usecase callers plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: read-only commands no longer allocate adapters or extra policy wrappers unless they actually use them.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T10:22:44.107Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-3KGV43-readonly-usecase-context/.tmp bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/usecases/task/task-list-usecase.unit.test.ts; Result: pass; Evidence: 3 tests passed. Scope: read-only usecase context factories and task-list caller. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-3KGV43-readonly-usecase-context/.tmp bunx eslint packages/agentplane/src/usecases/context/resolve-context.ts packages/agentplane/src/usecases/task/task-list-usecase.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/usecases/task/task-list-usecase.unit.test.ts; Result: pass; Evidence: no lint errors. Scope: changed usecase context and caller files. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-3KGV43-readonly-usecase-context/.tmp bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t "task list|task search|task next"; Result: pass; Evidence: 16 passed, 25 skipped. Scope: query command behavior remained stable.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:13:54.345Z, excerpt_hash=sha256:96a606f98956903192772586af4dff510a87a5dbe0aba2b5d148ef1217567a92
    
    ### 2026-03-31T10:23:36.995Z — VERIFY — ok
    
    By: CODER
    
    Note: Read-only usecase context unit tests and task list query contract passed after removing full context allocation from taskListUsecase.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:22:44.111Z, excerpt_hash=sha256:96a606f98956903192772586af4dff510a87a5dbe0aba2b5d148ef1217567a92
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce a lightweight read-only usecase context

Implement Epic 4 / R4.3 from REFACTOR.md. read-only commands no longer allocate adapters or extra policy wrappers unless they actually use them.

## Scope

- In scope: Implement Epic 4 / R4.3 from REFACTOR.md. read-only commands no longer allocate adapters or extra policy wrappers unless they actually use them.
- Out of scope: unrelated refactors not required for "Introduce a lightweight read-only usecase context".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/usecases/context/resolve-context.ts`, usecase callers to isolate the exact behavior gap for R4.3.
2. Implement the smallest change set that satisfies the REFACTOR contract: read-only commands no longer allocate adapters or extra policy wrappers unless they actually use them.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/usecases/context/resolve-context.ts`, usecase callers. Expected: the behavior described by R4.3 is observable and stable.
2. Inspect the final diff for 202603301857-3KGV43. Expected: scope stays limited to `packages/agentplane/src/usecases/context/resolve-context.ts`, usecase callers plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: read-only commands no longer allocate adapters or extra policy wrappers unless they actually use them.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T10:22:44.107Z — VERIFY — ok

By: CODER

Note: Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-3KGV43-readonly-usecase-context/.tmp bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/usecases/task/task-list-usecase.unit.test.ts; Result: pass; Evidence: 3 tests passed. Scope: read-only usecase context factories and task-list caller. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-3KGV43-readonly-usecase-context/.tmp bunx eslint packages/agentplane/src/usecases/context/resolve-context.ts packages/agentplane/src/usecases/task/task-list-usecase.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/usecases/task/task-list-usecase.unit.test.ts; Result: pass; Evidence: no lint errors. Scope: changed usecase context and caller files. Command: TMPDIR=/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202603301857-3KGV43-readonly-usecase-context/.tmp bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t "task list|task search|task next"; Result: pass; Evidence: 16 passed, 25 skipped. Scope: query command behavior remained stable.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:13:54.345Z, excerpt_hash=sha256:96a606f98956903192772586af4dff510a87a5dbe0aba2b5d148ef1217567a92

### 2026-03-31T10:23:36.995Z — VERIFY — ok

By: CODER

Note: Read-only usecase context unit tests and task list query contract passed after removing full context allocation from taskListUsecase.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:22:44.111Z, excerpt_hash=sha256:96a606f98956903192772586af4dff510a87a5dbe0aba2b5d148ef1217567a92

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
