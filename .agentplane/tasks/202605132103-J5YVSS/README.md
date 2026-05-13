---
id: "202605132103-J5YVSS"
title: "Remove legacy tasks.json export surface"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cleanup"
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T21:06:11.760Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T21:27:44.265Z"
  updated_by: "CODER"
  note: "Removed legacy tasks.json export generation paths; checks passed: eslint touched files, tsc agentplane noEmit, targeted cli-core/agentplane/core vitest suites, migrate-doc regression, policy routing."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement removal of obsolete tasks.json export surface and complete the four approved TODO tasks in one related batch worktree."
events:
  -
    type: "status"
    at: "2026-05-13T21:06:28.002Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement removal of obsolete tasks.json export surface and complete the four approved TODO tasks in one related batch worktree."
  -
    type: "verify"
    at: "2026-05-13T21:27:44.265Z"
    author: "CODER"
    state: "ok"
    note: "Removed legacy tasks.json export generation paths; checks passed: eslint touched files, tsc agentplane noEmit, targeted cli-core/agentplane/core vitest suites, migrate-doc regression, policy routing."
doc_version: 3
doc_updated_at: "2026-05-13T21:27:44.276Z"
doc_updated_by: "CODER"
description: "Remove the obsolete .agentplane/tasks.json export snapshot surface now that task reads use task docs and sqlite cache."
sections:
  Summary: |-
    Remove legacy tasks.json export surface
    
    Remove the obsolete .agentplane/tasks.json export snapshot surface now that task reads use task docs and sqlite cache.
  Scope: |-
    - In scope: Remove the obsolete .agentplane/tasks.json export snapshot surface now that task reads use task docs and sqlite cache.
    - Out of scope: unrelated refactors not required for "Remove legacy tasks.json export surface".
  Plan: "Batch implementation plan. Primary task removes obsolete .agentplane/tasks.json export generation and tracked snapshot. Included tasks: 202605132049-69HCQ3, 202605132049-K2TDB9, 202605132049-YXKBR3, 202605132052-NHGFC4. Steps: 1) remove task export writer/default paths and update tests/docs so tasks.json is no longer generated; 2) hide non-variadic group roots from generated CLI reference; 3) make evaluator catalog builtin toggle support project-only output; 4) surface evaluator project-root lookup failures instead of silent builtin-only fallback; 5) fix hosted sync credential resolution from branch_pr worktrees; 6) run focused tests, routing check, and doctor."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T21:27:44.265Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed legacy tasks.json export generation paths; checks passed: eslint touched files, tsc agentplane noEmit, targeted cli-core/agentplane/core vitest suites, migrate-doc regression, policy routing.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:06:28.002Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132103-J5YVSS-remove-tasks-json/.agentplane/tasks/202605132103-J5YVSS/blueprint/resolved-snapshot.json
    - old_digest: 23cb3278a45e66fe2b45e36675d23909dd920ae303d6a6844bd518917f98c26f
    - current_digest: 23cb3278a45e66fe2b45e36675d23909dd920ae303d6a6844bd518917f98c26f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132103-J5YVSS
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove legacy tasks.json export surface

Remove the obsolete .agentplane/tasks.json export snapshot surface now that task reads use task docs and sqlite cache.

## Scope

- In scope: Remove the obsolete .agentplane/tasks.json export snapshot surface now that task reads use task docs and sqlite cache.
- Out of scope: unrelated refactors not required for "Remove legacy tasks.json export surface".

## Plan

Batch implementation plan. Primary task removes obsolete .agentplane/tasks.json export generation and tracked snapshot. Included tasks: 202605132049-69HCQ3, 202605132049-K2TDB9, 202605132049-YXKBR3, 202605132052-NHGFC4. Steps: 1) remove task export writer/default paths and update tests/docs so tasks.json is no longer generated; 2) hide non-variadic group roots from generated CLI reference; 3) make evaluator catalog builtin toggle support project-only output; 4) surface evaluator project-root lookup failures instead of silent builtin-only fallback; 5) fix hosted sync credential resolution from branch_pr worktrees; 6) run focused tests, routing check, and doctor.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T21:27:44.265Z — VERIFY — ok

By: CODER

Note: Removed legacy tasks.json export generation paths; checks passed: eslint touched files, tsc agentplane noEmit, targeted cli-core/agentplane/core vitest suites, migrate-doc regression, policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:06:28.002Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132103-J5YVSS-remove-tasks-json/.agentplane/tasks/202605132103-J5YVSS/blueprint/resolved-snapshot.json
- old_digest: 23cb3278a45e66fe2b45e36675d23909dd920ae303d6a6844bd518917f98c26f
- current_digest: 23cb3278a45e66fe2b45e36675d23909dd920ae303d6a6844bd518917f98c26f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132103-J5YVSS

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
