---
id: "202605251947-63FTP6"
title: "Reduce low-risk duplicate implementation paths"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-05-25T20:00:35.269Z"
  updated_by: "CODER"
  note: "Local verification passed. Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts. Result: pass, 3 files and 30 tests passed. Command: bun run typecheck. Result: pass. Command: bun run lint:core -- packages/agentplane/src/commands/task/verify-record.ts scripts/lib/workflow-config.mjs scripts/workflow/prepare-hosted-task-closure.mjs scripts/release/release-task-evidence.mjs. Result: pass. Command: bun run clone:report. Result: pass; clones 89->86 and duplicatedLines 1403->1311 versus pre-change audit."
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
  -
    type: "verify"
    at: "2026-05-25T20:00:35.269Z"
    author: "CODER"
    state: "ok"
    note: "Local verification passed. Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts. Result: pass, 3 files and 30 tests passed. Command: bun run typecheck. Result: pass. Command: bun run lint:core -- packages/agentplane/src/commands/task/verify-record.ts scripts/lib/workflow-config.mjs scripts/workflow/prepare-hosted-task-closure.mjs scripts/release/release-task-evidence.mjs. Result: pass. Command: bun run clone:report. Result: pass; clones 89->86 and duplicatedLines 1403->1311 versus pre-change audit."
doc_version: 3
doc_updated_at: "2026-05-25T20:00:35.305Z"
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
    ### 2026-05-25T20:00:35.269Z — VERIFY — ok

    By: CODER

    Note: Local verification passed. Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts. Result: pass, 3 files and 30 tests passed. Command: bun run typecheck. Result: pass. Command: bun run lint:core -- packages/agentplane/src/commands/task/verify-record.ts scripts/lib/workflow-config.mjs scripts/workflow/prepare-hosted-task-closure.mjs scripts/release/release-task-evidence.mjs. Result: pass. Command: bun run clone:report. Result: pass; clones 89->86 and duplicatedLines 1403->1311 versus pre-change audit.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T19:58:03.869Z, excerpt_hash=sha256:6b2ed50014ef770f0d568f717e665294d0fbf7e902b9487e1df491d27192e37f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251947-63FTP6-reduce-duplicate-paths/.agentplane/tasks/202605251947-63FTP6/blueprint/resolved-snapshot.json
    - old_digest: 437df8d0fc9ccbb4a1949d7c6d1efeadc4a6c29e6556a04c20cfefeeae31935f
    - current_digest: 437df8d0fc9ccbb4a1949d7c6d1efeadc4a6c29e6556a04c20cfefeeae31935f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605251947-63FTP6

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
### 2026-05-25T20:00:35.269Z — VERIFY — ok

By: CODER

Note: Local verification passed. Command: bun run test:project -- agentplane packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts. Result: pass, 3 files and 30 tests passed. Command: bun run typecheck. Result: pass. Command: bun run lint:core -- packages/agentplane/src/commands/task/verify-record.ts scripts/lib/workflow-config.mjs scripts/workflow/prepare-hosted-task-closure.mjs scripts/release/release-task-evidence.mjs. Result: pass. Command: bun run clone:report. Result: pass; clones 89->86 and duplicatedLines 1403->1311 versus pre-change audit.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T19:58:03.869Z, excerpt_hash=sha256:6b2ed50014ef770f0d568f717e665294d0fbf7e902b9487e1df491d27192e37f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251947-63FTP6-reduce-duplicate-paths/.agentplane/tasks/202605251947-63FTP6/blueprint/resolved-snapshot.json
- old_digest: 437df8d0fc9ccbb4a1949d7c6d1efeadc4a6c29e6556a04c20cfefeeae31935f
- current_digest: 437df8d0fc9ccbb4a1949d7c6d1efeadc4a6c29e6556a04c20cfefeeae31935f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605251947-63FTP6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
