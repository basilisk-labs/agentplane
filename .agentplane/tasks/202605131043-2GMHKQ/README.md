---
id: "202605131043-2GMHKQ"
title: "Move generated projections under .agentplane/generated"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T12:42:24.848Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T13:13:34.331Z"
  updated_by: "CODER"
  note: "Verified: Obsidian/task navigation projection now writes to .agentplane/generated/obsidian with legacy generated-root cleanup. Checks passed: focused obsidian/context Vitest, typecheck, eslint, prettier, docs:cli:check, docs:ia:check, framework:dev:bootstrap."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing generated projection relocation with compatibility paths, focused tests, and docs updates in the batch worktree."
events:
  -
    type: "status"
    at: "2026-05-13T13:01:39.500Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing generated projection relocation with compatibility paths, focused tests, and docs updates in the batch worktree."
  -
    type: "verify"
    at: "2026-05-13T13:13:34.331Z"
    author: "CODER"
    state: "ok"
    note: "Verified: Obsidian/task navigation projection now writes to .agentplane/generated/obsidian with legacy generated-root cleanup. Checks passed: focused obsidian/context Vitest, typecheck, eslint, prettier, docs:cli:check, docs:ia:check, framework:dev:bootstrap."
doc_version: 3
doc_updated_at: "2026-05-13T13:13:34.336Z"
doc_updated_by: "CODER"
description: "Consolidate AgentPlane generated projection surfaces under .agentplane/generated, including task navigation/Obsidian output as a wiki/navigation adapter while preserving compatibility and cleanup behavior."
sections:
  Summary: |-
    Move generated projections under .agentplane/generated
    
    Consolidate AgentPlane generated projection surfaces under .agentplane/generated, including task navigation/Obsidian output as a wiki/navigation adapter while preserving compatibility and cleanup behavior.
  Scope: |-
    - In scope: Consolidate AgentPlane generated projection surfaces under .agentplane/generated, including task navigation/Obsidian output as a wiki/navigation adapter while preserving compatibility and cleanup behavior.
    - Out of scope: unrelated refactors not required for "Move generated projections under .agentplane/generated".
  Plan: "Batch member under primary 202605131049-2NHAWN. Scope: move generated task/wiki/navigation projections under .agentplane/generated with compatibility for legacy cleanup/read surfaces and update docs/tests. Verification: focused task navigation/export tests, docs checks, typecheck/lint, hosted checks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T13:13:34.331Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: Obsidian/task navigation projection now writes to .agentplane/generated/obsidian with legacy generated-root cleanup. Checks passed: focused obsidian/context Vitest, typecheck, eslint, prettier, docs:cli:check, docs:ia:check, framework:dev:bootstrap.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T13:01:39.500Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131043-2GMHKQ-generated-scripts-context-refactor/.agentplane/tasks/202605131043-2GMHKQ/blueprint/resolved-snapshot.json
    - old_digest: ea7e545f421b2b1d629f3be5c917c66a779a18a19adf804d5352c4ca91c0b249
    - current_digest: ea7e545f421b2b1d629f3be5c917c66a779a18a19adf804d5352c4ca91c0b249
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131043-2GMHKQ
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Move generated projections under .agentplane/generated

Consolidate AgentPlane generated projection surfaces under .agentplane/generated, including task navigation/Obsidian output as a wiki/navigation adapter while preserving compatibility and cleanup behavior.

## Scope

- In scope: Consolidate AgentPlane generated projection surfaces under .agentplane/generated, including task navigation/Obsidian output as a wiki/navigation adapter while preserving compatibility and cleanup behavior.
- Out of scope: unrelated refactors not required for "Move generated projections under .agentplane/generated".

## Plan

Batch member under primary 202605131049-2NHAWN. Scope: move generated task/wiki/navigation projections under .agentplane/generated with compatibility for legacy cleanup/read surfaces and update docs/tests. Verification: focused task navigation/export tests, docs checks, typecheck/lint, hosted checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T13:13:34.331Z — VERIFY — ok

By: CODER

Note: Verified: Obsidian/task navigation projection now writes to .agentplane/generated/obsidian with legacy generated-root cleanup. Checks passed: focused obsidian/context Vitest, typecheck, eslint, prettier, docs:cli:check, docs:ia:check, framework:dev:bootstrap.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T13:01:39.500Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131043-2GMHKQ-generated-scripts-context-refactor/.agentplane/tasks/202605131043-2GMHKQ/blueprint/resolved-snapshot.json
- old_digest: ea7e545f421b2b1d629f3be5c917c66a779a18a19adf804d5352c4ca91c0b249
- current_digest: ea7e545f421b2b1d629f3be5c917c66a779a18a19adf804d5352c4ca91c0b249
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131043-2GMHKQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
