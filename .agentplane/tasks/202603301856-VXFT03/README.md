---
id: "202603301856-VXFT03"
title: "Lock task listing/query behavior with golden tests"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202603301721-9ZMFDY"
tags:
  - "code"
  - "refactor"
  - "tests"
  - "cli"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-30T19:05:50.804Z"
  updated_by: "CODER"
  note: "OK: final rerun passed after formatting — bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testNamePattern \"task (next|search|list)\"; exact-output task query contracts are locked and production query code remains unchanged."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: locking current task list, task search, and task next query behavior with focused CLI/query tests only; no refactor of production task-query logic in this task."
events:
  -
    type: "status"
    at: "2026-03-30T19:01:27.802Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: locking current task list, task search, and task next query behavior with focused CLI/query tests only; no refactor of production task-query logic in this task."
  -
    type: "verify"
    at: "2026-03-30T19:04:57.263Z"
    author: "CODER"
    state: "ok"
    note: "OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testNamePattern \"task (next|search|list)\"; added deterministic exact-output assertions that lock sorting, quiet, limit, and readiness behavior without touching production task-query code."
  -
    type: "verify"
    at: "2026-03-30T19:05:50.804Z"
    author: "CODER"
    state: "ok"
    note: "OK: final rerun passed after formatting — bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testNamePattern \"task (next|search|list)\"; exact-output task query contracts are locked and production query code remains unchanged."
doc_version: 3
doc_updated_at: "2026-03-30T19:05:50.807Z"
doc_updated_by: "CODER"
description: "Implement Epic 0 / R0.2 from REFACTOR.md. `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output."
sections:
  Summary: |-
    Lock task listing/query behavior with golden tests
    
    Implement Epic 0 / R0.2 from REFACTOR.md. `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.
  Scope: |-
    - In scope: Implement Epic 0 / R0.2 from REFACTOR.md. `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.
    - Out of scope: unrelated refactors not required for "Lock task listing/query behavior with golden tests".
  Plan: |-
    1. Audit the current task-query integration coverage in `packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts` and any adjacent workflow assertions to isolate where behavior is already covered versus only loosely asserted.
    2. Add the smallest set of deterministic exact-output assertions needed to lock current `task list`, `task search`, and `task next` behavior for sorting, quiet, limit, and readiness output.
    3. Run the focused CLI query test slice, capture verification evidence, and keep production task-query code unchanged in this task.
  Verify Steps: |-
    1. Run the focused CLI query test slice for `packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts`. Expected: `task list`, `task search`, and `task next` exact-output behavior stays green.
    2. Inspect the final diff for 202603301856-VXFT03. Expected: scope stays limited to task-query test coverage and task-local docs; production task-query code remains unchanged.
    3. Re-run the focused CLI query test slice after final edits. Expected: sorting, quiet, limit, and readiness output are all explicitly locked by tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T19:04:57.263Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testNamePattern "task (next|search|list)"; added deterministic exact-output assertions that lock sorting, quiet, limit, and readiness behavior without touching production task-query code.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T19:04:32.585Z, excerpt_hash=sha256:f29a73528e23df1a80f503f8537fac435ef85a8a0f1e5ec00b7645c0abddff70
    
    ### 2026-03-30T19:05:50.804Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: final rerun passed after formatting — bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testNamePattern "task (next|search|list)"; exact-output task query contracts are locked and production query code remains unchanged.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T19:04:57.265Z, excerpt_hash=sha256:f29a73528e23df1a80f503f8537fac435ef85a8a0f1e5ec00b7645c0abddff70
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Lock task listing/query behavior with golden tests

Implement Epic 0 / R0.2 from REFACTOR.md. `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.

## Scope

- In scope: Implement Epic 0 / R0.2 from REFACTOR.md. `task list`, `task search`, and `task next` cover filtering, sorting, `quiet`, `limit`, and readiness output.
- Out of scope: unrelated refactors not required for "Lock task listing/query behavior with golden tests".

## Plan

1. Audit the current task-query integration coverage in `packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts` and any adjacent workflow assertions to isolate where behavior is already covered versus only loosely asserted.
2. Add the smallest set of deterministic exact-output assertions needed to lock current `task list`, `task search`, and `task next` behavior for sorting, quiet, limit, and readiness output.
3. Run the focused CLI query test slice, capture verification evidence, and keep production task-query code unchanged in this task.

## Verify Steps

1. Run the focused CLI query test slice for `packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts`. Expected: `task list`, `task search`, and `task next` exact-output behavior stays green.
2. Inspect the final diff for 202603301856-VXFT03. Expected: scope stays limited to task-query test coverage and task-local docs; production task-query code remains unchanged.
3. Re-run the focused CLI query test slice after final edits. Expected: sorting, quiet, limit, and readiness output are all explicitly locked by tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T19:04:57.263Z — VERIFY — ok

By: CODER

Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testNamePattern "task (next|search|list)"; added deterministic exact-output assertions that lock sorting, quiet, limit, and readiness behavior without touching production task-query code.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T19:04:32.585Z, excerpt_hash=sha256:f29a73528e23df1a80f503f8537fac435ef85a8a0f1e5ec00b7645c0abddff70

### 2026-03-30T19:05:50.804Z — VERIFY — ok

By: CODER

Note: OK: final rerun passed after formatting — bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testNamePattern "task (next|search|list)"; exact-output task query contracts are locked and production query code remains unchanged.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T19:04:57.265Z, excerpt_hash=sha256:f29a73528e23df1a80f503f8537fac435ef85a8a0f1e5ec00b7645c0abddff70

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
