---
id: "202605141849-0C84Z2"
title: "Fix doc section readback for issue #3747"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T18:50:04.286Z"
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
    body: "Start: Implement issue #3747 fix in task doc section persistence/readback, add focused regression coverage, and verify with targeted tests from the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-05-14T18:50:36.323Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement issue #3747 fix in task doc section persistence/readback, add focused regression coverage, and verify with targeted tests from the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-05-14T18:54:29.235Z"
doc_updated_by: "CODER"
description: "Fix GitHub issue #3747: task doc set can accept a section that is later filtered from canonical task doc readback, causing task doc show and task plan approve to disagree."
sections:
  Summary: "Fix GitHub issue #3747 where task doc set can report success for a section that later disappears from canonical task doc readback, making task doc show and task plan approve disagree."
  Scope: "In scope: local task README/doc section handling for doc_version=3, command behavior for task doc set/show, plan approval validation, and regression coverage for issue #3747. Out of scope: release publication, unrelated task backend sync, and unrelated existing task artifact drift."
  Plan: |-
    1. Add a regression test for issue #3747 that reproduces a configured doc section accepted by task doc set but filtered from v3 canonical readback.
    2. Fix the section contract so task doc set/show and task plan approve use a consistent persisted/readback model for configured task doc sections. Prefer preserving explicitly configured sections over reporting a successful write that cannot be read back.
    3. Run focused task doc/plan tests plus policy routing validation.
    4. Link GitHub issue #3747 to this task and close/delete/project-sync after the PR lands.
  Verify Steps: |-
    1. Run focused task doc/plan unit tests covering issue #3747. Expected: a v3 task cannot report a successful write for a non-canonical section that is dropped from readback, or the section remains readable and approvable consistently.
    2. Run targeted task document core tests. Expected: canonical section parsing/rendering behavior is stable.
    3. Run policy routing check. Expected: gateway and loaded policy route remain valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task branch commit if the section contract fix regresses supported task README sections or plan approval behavior."
  Findings: |-
    Issue link: https://github.com/basilisk-labs/agentplane/issues/3747. Linked comment: https://github.com/basilisk-labs/agentplane/issues/3747#issuecomment-4453752174.
    
    Verification evidence:
    - Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts
    - Result: pass
    - Evidence: 3 files passed, 44 tests passed.
    - Scope: backend task record read-model plus task doc and plan command behavior.
    
    - Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-readme.test.ts
    - Result: pass
    - Evidence: 1 file passed, 18 tests passed.
    - Scope: core task README parse/render behavior.
    
    - Command: node .agentplane/policy/check-routing.mjs
    - Result: pass
    - Evidence: policy routing OK.
    - Scope: gateway/policy route validity.
id_source: "generated"
---
## Summary

Fix GitHub issue #3747 where task doc set can report success for a section that later disappears from canonical task doc readback, making task doc show and task plan approve disagree.

## Scope

In scope: local task README/doc section handling for doc_version=3, command behavior for task doc set/show, plan approval validation, and regression coverage for issue #3747. Out of scope: release publication, unrelated task backend sync, and unrelated existing task artifact drift.

## Plan

1. Add a regression test for issue #3747 that reproduces a configured doc section accepted by task doc set but filtered from v3 canonical readback.
2. Fix the section contract so task doc set/show and task plan approve use a consistent persisted/readback model for configured task doc sections. Prefer preserving explicitly configured sections over reporting a successful write that cannot be read back.
3. Run focused task doc/plan tests plus policy routing validation.
4. Link GitHub issue #3747 to this task and close/delete/project-sync after the PR lands.

## Verify Steps

1. Run focused task doc/plan unit tests covering issue #3747. Expected: a v3 task cannot report a successful write for a non-canonical section that is dropped from readback, or the section remains readable and approvable consistently.
2. Run targeted task document core tests. Expected: canonical section parsing/rendering behavior is stable.
3. Run policy routing check. Expected: gateway and loaded policy route remain valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task branch commit if the section contract fix regresses supported task README sections or plan approval behavior.

## Findings

Issue link: https://github.com/basilisk-labs/agentplane/issues/3747. Linked comment: https://github.com/basilisk-labs/agentplane/issues/3747#issuecomment-4453752174.

Verification evidence:
- Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts
- Result: pass
- Evidence: 3 files passed, 44 tests passed.
- Scope: backend task record read-model plus task doc and plan command behavior.

- Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-readme.test.ts
- Result: pass
- Evidence: 1 file passed, 18 tests passed.
- Scope: core task README parse/render behavior.

- Command: node .agentplane/policy/check-routing.mjs
- Result: pass
- Evidence: policy routing OK.
- Scope: gateway/policy route validity.
