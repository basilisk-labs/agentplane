---
id: "202605281632-XW33V9"
title: "Remove runtime tasks.json dependencies"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T16:32:38.260Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T06:26:03.393Z"
  updated_by: "CODER"
  note: "Verified after merging origin/main into PR #4195: focused vitest suite passed (3 files, 13 tests), bun run typecheck passed, bun run lint:core passed, node .agentplane/policy/check-routing.mjs passed, ap doctor exited 0 with only historical DONE-task warnings unrelated to this PR."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Auditing and replacing runtime paths that still read or depend on legacy .agentplane/tasks.json during agent workflows; compatibility-only import/export references remain in scope only when they do not affect normal agent operation."
events:
  -
    type: "status"
    at: "2026-05-28T16:32:53.441Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Auditing and replacing runtime paths that still read or depend on legacy .agentplane/tasks.json during agent workflows; compatibility-only import/export references remain in scope only when they do not affect normal agent operation."
  -
    type: "verify"
    at: "2026-05-28T16:40:55.430Z"
    author: "CODER"
    state: "ok"
    note: "Focused tests, typecheck, eslint, routing check, and doctor passed."
  -
    type: "verify"
    at: "2026-05-31T06:26:03.393Z"
    author: "CODER"
    state: "ok"
    note: "Verified after merging origin/main into PR #4195: focused vitest suite passed (3 files, 13 tests), bun run typecheck passed, bun run lint:core passed, node .agentplane/policy/check-routing.mjs passed, ap doctor exited 0 with only historical DONE-task warnings unrelated to this PR."
doc_version: 3
doc_updated_at: "2026-05-31T06:26:03.412Z"
doc_updated_by: "CODER"
description: "Audit and fix remaining runtime code paths that read or depend on legacy .agentplane/tasks.json during agent workflows; keep only explicit optional export/import compatibility surfaces."
sections:
  Summary: |-
    Remove runtime tasks.json dependencies

    Audit and fix remaining runtime code paths that read or depend on legacy .agentplane/tasks.json during agent workflows; keep only explicit optional export/import compatibility surfaces.
  Scope: |-
    - In scope: Audit and fix remaining runtime code paths that read or depend on legacy .agentplane/tasks.json during agent workflows; keep only explicit optional export/import compatibility surfaces.
    - Out of scope: unrelated refactors not required for "Remove runtime tasks.json dependencies".
  Plan: |-
    1. Audit runtime references to legacy .agentplane/tasks.json and classify them as compatibility, docs/tests, or active agent workflow dependencies.
    2. Replace active agent workflow reads/log-producing dependencies with backend/task-doc/projection reads, keeping tasks.json only as explicit optional export/import compatibility.
    3. Update focused tests for doctor/branch/workflow paths that previously touched tasks.json.
    4. Run task verify-show, focused tests for changed modules, policy routing validation, and agentplane doctor.
  Verify Steps: |-
    1. Run focused agentplane tests for doctor, direct work start, and workflow task lint surfaces. Expected: all selected tests pass.
    2. Run `bun run typecheck`. Expected: TypeScript project references build without errors.
    3. Run eslint on the changed TypeScript files. Expected: no lint errors.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK.
    5. Run `ap doctor`. Expected: command exits 0; historical archive issues may appear only as WARN/INFO.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T16:40:55.430Z — VERIFY — ok

    By: CODER

    Note: Focused tests, typecheck, eslint, routing check, and doctor passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T16:32:53.441Z, excerpt_hash=sha256:03f95f9cf8916b8def6c7065146b70881b720662003040d56cc90fac877311d4

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/branch/work-start.direct.test.ts packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts packages/agentplane/src/commands/workflow.test.ts
    Result: pass
    Evidence: 5 test files passed, 50 tests passed.
    Scope: doctor archive/migration/open-PR drift, direct work start cleanliness, task lint no tasks.json export.

    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b completed with exit code 0 after runtime bootstrap completed.
    Scope: repository TypeScript project references.

    Command: bunx eslint packages/agentplane/src/commands/branch/work-start.direct.ts packages/agentplane/src/commands/branch/work-start.direct.test.ts packages/agentplane/src/commands/doctor/archive.ts packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/doctor/workspace-task-state.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts
    Result: pass
    Evidence: eslint completed with exit code 0.
    Scope: changed TypeScript files.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy routing constraints.

    Command: ap doctor
    Result: pass
    Evidence: doctor (OK), errors=0; existing historical DONE tasks without commit hash reported as WARN only.
    Scope: live repo doctor/runtime surface.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281632-XW33V9-remove-runtime-tasks-json-dependencies/.agentplane/tasks/202605281632-XW33V9/blueprint/resolved-snapshot.json
    - old_digest: 89d2e7dc3200fedb1c565a37f1ebd3c4d9c7741a4339bb4a3bfce06fe1853bd8
    - current_digest: 89d2e7dc3200fedb1c565a37f1ebd3c4d9c7741a4339bb4a3bfce06fe1853bd8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281632-XW33V9

    ### 2026-05-31T06:26:03.393Z — VERIFY — ok

    By: CODER

    Note: Verified after merging origin/main into PR #4195: focused vitest suite passed (3 files, 13 tests), bun run typecheck passed, bun run lint:core passed, node .agentplane/policy/check-routing.mjs passed, ap doctor exited 0 with only historical DONE-task warnings unrelated to this PR.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T16:40:55.446Z, excerpt_hash=sha256:03f95f9cf8916b8def6c7065146b70881b720662003040d56cc90fac877311d4

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281632-XW33V9-remove-runtime-tasks-json-dependencies/.agentplane/tasks/202605281632-XW33V9/blueprint/resolved-snapshot.json
    - old_digest: 89d2e7dc3200fedb1c565a37f1ebd3c4d9c7741a4339bb4a3bfce06fe1853bd8
    - current_digest: 89d2e7dc3200fedb1c565a37f1ebd3c4d9c7741a4339bb4a3bfce06fe1853bd8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281632-XW33V9

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove runtime tasks.json dependencies

Audit and fix remaining runtime code paths that read or depend on legacy .agentplane/tasks.json during agent workflows; keep only explicit optional export/import compatibility surfaces.

## Scope

- In scope: Audit and fix remaining runtime code paths that read or depend on legacy .agentplane/tasks.json during agent workflows; keep only explicit optional export/import compatibility surfaces.
- Out of scope: unrelated refactors not required for "Remove runtime tasks.json dependencies".

## Plan

1. Audit runtime references to legacy .agentplane/tasks.json and classify them as compatibility, docs/tests, or active agent workflow dependencies.
2. Replace active agent workflow reads/log-producing dependencies with backend/task-doc/projection reads, keeping tasks.json only as explicit optional export/import compatibility.
3. Update focused tests for doctor/branch/workflow paths that previously touched tasks.json.
4. Run task verify-show, focused tests for changed modules, policy routing validation, and agentplane doctor.

## Verify Steps

1. Run focused agentplane tests for doctor, direct work start, and workflow task lint surfaces. Expected: all selected tests pass.
2. Run `bun run typecheck`. Expected: TypeScript project references build without errors.
3. Run eslint on the changed TypeScript files. Expected: no lint errors.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing OK.
5. Run `ap doctor`. Expected: command exits 0; historical archive issues may appear only as WARN/INFO.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T16:40:55.430Z — VERIFY — ok

By: CODER

Note: Focused tests, typecheck, eslint, routing check, and doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T16:32:53.441Z, excerpt_hash=sha256:03f95f9cf8916b8def6c7065146b70881b720662003040d56cc90fac877311d4

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/branch/work-start.direct.test.ts packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts packages/agentplane/src/commands/workflow.test.ts
Result: pass
Evidence: 5 test files passed, 50 tests passed.
Scope: doctor archive/migration/open-PR drift, direct work start cleanliness, task lint no tasks.json export.

Command: bun run typecheck
Result: pass
Evidence: tsc -b completed with exit code 0 after runtime bootstrap completed.
Scope: repository TypeScript project references.

Command: bunx eslint packages/agentplane/src/commands/branch/work-start.direct.ts packages/agentplane/src/commands/branch/work-start.direct.test.ts packages/agentplane/src/commands/doctor/archive.ts packages/agentplane/src/commands/doctor/archive.test.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/doctor/workspace-task-state.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts
Result: pass
Evidence: eslint completed with exit code 0.
Scope: changed TypeScript files.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing constraints.

Command: ap doctor
Result: pass
Evidence: doctor (OK), errors=0; existing historical DONE tasks without commit hash reported as WARN only.
Scope: live repo doctor/runtime surface.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281632-XW33V9-remove-runtime-tasks-json-dependencies/.agentplane/tasks/202605281632-XW33V9/blueprint/resolved-snapshot.json
- old_digest: 89d2e7dc3200fedb1c565a37f1ebd3c4d9c7741a4339bb4a3bfce06fe1853bd8
- current_digest: 89d2e7dc3200fedb1c565a37f1ebd3c4d9c7741a4339bb4a3bfce06fe1853bd8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281632-XW33V9

### 2026-05-31T06:26:03.393Z — VERIFY — ok

By: CODER

Note: Verified after merging origin/main into PR #4195: focused vitest suite passed (3 files, 13 tests), bun run typecheck passed, bun run lint:core passed, node .agentplane/policy/check-routing.mjs passed, ap doctor exited 0 with only historical DONE-task warnings unrelated to this PR.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T16:40:55.446Z, excerpt_hash=sha256:03f95f9cf8916b8def6c7065146b70881b720662003040d56cc90fac877311d4

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281632-XW33V9-remove-runtime-tasks-json-dependencies/.agentplane/tasks/202605281632-XW33V9/blueprint/resolved-snapshot.json
- old_digest: 89d2e7dc3200fedb1c565a37f1ebd3c4d9c7741a4339bb4a3bfce06fe1853bd8
- current_digest: 89d2e7dc3200fedb1c565a37f1ebd3c4d9c7741a4339bb4a3bfce06fe1853bd8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281632-XW33V9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
