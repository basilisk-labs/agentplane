---
id: "202605251947-63FTP6"
title: "Reduce low-risk duplicate implementation paths"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-25T19:47:55.496Z"
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
    body: "Start: Implementing the approved first refactoring slice in the dedicated worktree; scope is limited to unused CLI cleanup, verification finding helper extraction, and duplicated workflow branch-prefix parser centralization."
events:
  -
    type: "status"
    at: "2026-05-25T19:51:43.802Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the approved first refactoring slice in the dedicated worktree; scope is limited to unused CLI cleanup, verification finding helper extraction, and duplicated workflow branch-prefix parser centralization."
doc_version: 3
doc_updated_at: "2026-05-25T19:58:03.869Z"
doc_updated_by: "CODER"
description: "Implement the first safe refactoring slice from the duplicate/redundancy audit: remove confirmed unused CLI code, extract repeated verification finding construction, and centralize small duplicated script/config parsing helpers without changing public CLI behavior."
sections:
  Summary: |-
    Reduce low-risk duplicate implementation paths

    Implement the first safe refactoring slice from the duplicate/redundancy audit: remove confirmed unused CLI code, extract repeated verification finding construction, and centralize small duplicated script/config parsing helpers without changing public CLI behavior.
  Scope: |-
    - In scope: Implement the first safe refactoring slice from the duplicate/redundancy audit: remove confirmed unused CLI code, extract repeated verification finding construction, and centralize small duplicated script/config parsing helpers without changing public CLI behavior.
    - Out of scope: unrelated refactors not required for "Reduce low-risk duplicate implementation paths".
  Plan: |-
    1. Confirm unused CLI critical runner has no dynamic references and remove it if still unused.
    2. Extract the repeated verification finding payload builder in task verify code without changing command behavior.
    3. Centralize duplicated workflow branch-prefix parsing used by release/hosted-close scripts into a scripts/lib helper.
    4. Run focused unit/script checks, then update task verification evidence.
  Verify Steps: |-
    1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: all targeted tests pass.
    2. Run `bun run typecheck`. Expected: TypeScript project build succeeds.
    3. Run `bun run lint:core -- packages/agentplane/src/commands/task/verify-record.ts scripts/lib/workflow-config.mjs scripts/workflow/prepare-hosted-task-closure.mjs scripts/release/release-task-evidence.mjs`. Expected: lint succeeds.
    4. Run `bun run clone:report`. Expected: clone metrics do not regress and duplicate lines decrease for touched scope.
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

Reduce low-risk duplicate implementation paths

Implement the first safe refactoring slice from the duplicate/redundancy audit: remove confirmed unused CLI code, extract repeated verification finding construction, and centralize small duplicated script/config parsing helpers without changing public CLI behavior.

## Scope

- In scope: Implement the first safe refactoring slice from the duplicate/redundancy audit: remove confirmed unused CLI code, extract repeated verification finding construction, and centralize small duplicated script/config parsing helpers without changing public CLI behavior.
- Out of scope: unrelated refactors not required for "Reduce low-risk duplicate implementation paths".

## Plan

1. Confirm unused CLI critical runner has no dynamic references and remove it if still unused.
2. Extract the repeated verification finding payload builder in task verify code without changing command behavior.
3. Centralize duplicated workflow branch-prefix parsing used by release/hosted-close scripts into a scripts/lib helper.
4. Run focused unit/script checks, then update task verification evidence.

## Verify Steps

1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: all targeted tests pass.
2. Run `bun run typecheck`. Expected: TypeScript project build succeeds.
3. Run `bun run lint:core -- packages/agentplane/src/commands/task/verify-record.ts scripts/lib/workflow-config.mjs scripts/workflow/prepare-hosted-task-closure.mjs scripts/release/release-task-evidence.mjs`. Expected: lint succeeds.
4. Run `bun run clone:report`. Expected: clone metrics do not regress and duplicate lines decrease for touched scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
