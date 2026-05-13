---
id: "202605131043-802HWG"
title: "Extract local context domain logic from command handlers"
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
  updated_at: "2026-05-13T13:01:31.945Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T13:13:51.505Z"
  updated_by: "CODER"
  note: "Verified: context domain implementation moved to packages/agentplane/src/context with commands/context wrappers kept as CLI adapters. Checks passed: focused context Vitest, typecheck, eslint, prettier, arch:check, knip:check, docs:ia:check, framework:dev:bootstrap."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Extracting context domain modules from CLI command handlers with behavior-compatible command adapters."
events:
  -
    type: "status"
    at: "2026-05-13T13:01:49.296Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extracting context domain modules from CLI command handlers with behavior-compatible command adapters."
  -
    type: "verify"
    at: "2026-05-13T13:13:51.505Z"
    author: "CODER"
    state: "ok"
    note: "Verified: context domain implementation moved to packages/agentplane/src/context with commands/context wrappers kept as CLI adapters. Checks passed: focused context Vitest, typecheck, eslint, prettier, arch:check, knip:check, docs:ia:check, framework:dev:bootstrap."
doc_version: 3
doc_updated_at: "2026-05-13T13:13:51.510Z"
doc_updated_by: "CODER"
description: "Move domain logic from packages/agentplane/src/commands/context into a src/context domain layer while keeping command handlers as thin CLI adapters."
sections:
  Summary: |-
    Extract local context domain logic from command handlers
    
    Move domain logic from packages/agentplane/src/commands/context into a src/context domain layer while keeping command handlers as thin CLI adapters.
  Scope: |-
    - In scope: Move domain logic from packages/agentplane/src/commands/context into a src/context domain layer while keeping command handlers as thin CLI adapters.
    - Out of scope: unrelated refactors not required for "Extract local context domain logic from command handlers".
  Plan: "Batch member under primary 202605131043-2GMHKQ. Scope: move context-domain logic out of CLI handlers into src/context modules while keeping command behavior stable and handlers as adapters. Verification: focused context tests, import/topology checks, typecheck/lint, and hosted checks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T13:13:51.505Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: context domain implementation moved to packages/agentplane/src/context with commands/context wrappers kept as CLI adapters. Checks passed: focused context Vitest, typecheck, eslint, prettier, arch:check, knip:check, docs:ia:check, framework:dev:bootstrap.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T13:01:49.296Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131043-2GMHKQ-generated-scripts-context-refactor/.agentplane/tasks/202605131043-802HWG/blueprint/resolved-snapshot.json
    - old_digest: 436748743c22d310db5924305b23e5adfd28398c7d863e3bf34de634c27d239e
    - current_digest: 436748743c22d310db5924305b23e5adfd28398c7d863e3bf34de634c27d239e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131043-802HWG
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Extract local context domain logic from command handlers

Move domain logic from packages/agentplane/src/commands/context into a src/context domain layer while keeping command handlers as thin CLI adapters.

## Scope

- In scope: Move domain logic from packages/agentplane/src/commands/context into a src/context domain layer while keeping command handlers as thin CLI adapters.
- Out of scope: unrelated refactors not required for "Extract local context domain logic from command handlers".

## Plan

Batch member under primary 202605131043-2GMHKQ. Scope: move context-domain logic out of CLI handlers into src/context modules while keeping command behavior stable and handlers as adapters. Verification: focused context tests, import/topology checks, typecheck/lint, and hosted checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T13:13:51.505Z — VERIFY — ok

By: CODER

Note: Verified: context domain implementation moved to packages/agentplane/src/context with commands/context wrappers kept as CLI adapters. Checks passed: focused context Vitest, typecheck, eslint, prettier, arch:check, knip:check, docs:ia:check, framework:dev:bootstrap.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T13:01:49.296Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131043-2GMHKQ-generated-scripts-context-refactor/.agentplane/tasks/202605131043-802HWG/blueprint/resolved-snapshot.json
- old_digest: 436748743c22d310db5924305b23e5adfd28398c7d863e3bf34de634c27d239e
- current_digest: 436748743c22d310db5924305b23e5adfd28398c7d863e3bf34de634c27d239e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131043-802HWG

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
