---
id: "202603251535-3DZ26K"
title: "Introduce unified workflow transition service for task lifecycle mutations"
result_summary: "Merged on GitHub main via PR #16 after green CI."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202603251535-DNNMD4"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-26T18:39:11.594Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-26T18:56:18.056Z"
  updated_by: "CODER"
  note: |-
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds stayed clean after routing lifecycle writes through the shared workflow transition service.
    Scope: packages/core and packages/agentplane build graph.
    
    Command: bunx vitest run packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: 11 files, 159 tests passed across the shared service plus migrated lifecycle commands and CLI flows.
    Scope: task lifecycle mutation behavior and regression surface.
    
    Command: bunx eslint packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/workflow-transition-service.ts packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts && bunx prettier --check packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/workflow-transition-service.ts packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts
    Result: pass
    Evidence: all touched lifecycle files passed lint and formatting checks after the service extraction.
    Scope: touched source files and the new unit test.
commit:
  hash: "035858b8170fdc4c802ab501fcb00f6f81584563"
  message: "✨ 3DZ26K task: unify workflow transition mutations (#16)"
comments:
  -
    author: "CODER"
    body: "Start: implement the shared workflow transition service and migrate task lifecycle mutation paths without changing observable task or verification behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: Hosted PR #16 merged on main after fresh green checks; local verification evidence from the task branch already covers the extracted transition service and migrated lifecycle flows."
events:
  -
    type: "verify"
    at: "2026-03-26T18:53:28.490Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun run --filter=agentplane build
      Result: pass
      Evidence: agentplane compiled cleanly after introducing the shared workflow transition service and migrating start/block/set-status/verify/finish write paths to it.
      Scope: packages/agentplane task lifecycle mutation paths.
      
      Command: bunx vitest run packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testTimeout 60000 --hookTimeout 60000
      Result: pass
      Evidence: 11 files, 159 tests passed, covering the new transition service plus the migrated lifecycle commands and CLI flows.
      Scope: lifecycle mutation behavior and regression surface.
      
      Command: bunx eslint <touched-files> && bunx prettier --check <touched-files>
      Result: pass
      Evidence: all touched task lifecycle files passed lint and formatting checks after the service extraction.
      Scope: touched source and new unit test.
  -
    type: "status"
    at: "2026-03-26T18:56:03.075Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the shared workflow transition service and migrate task lifecycle mutation paths without changing observable task or verification behavior."
  -
    type: "verify"
    at: "2026-03-26T18:56:18.056Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: both package builds stayed clean after routing lifecycle writes through the shared workflow transition service.
      Scope: packages/core and packages/agentplane build graph.
      
      Command: bunx vitest run packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testTimeout 60000 --hookTimeout 60000
      Result: pass
      Evidence: 11 files, 159 tests passed across the shared service plus migrated lifecycle commands and CLI flows.
      Scope: task lifecycle mutation behavior and regression surface.
      
      Command: bunx eslint packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/workflow-transition-service.ts packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts && bunx prettier --check packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/workflow-transition-service.ts packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts
      Result: pass
      Evidence: all touched lifecycle files passed lint and formatting checks after the service extraction.
      Scope: touched source files and the new unit test.
  -
    type: "status"
    at: "2026-03-26T19:06:26.876Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Hosted PR #16 merged on main after fresh green checks; local verification evidence from the task branch already covers the extracted transition service and migrated lifecycle flows."
doc_version: 3
doc_updated_at: "2026-03-26T19:06:26.876Z"
doc_updated_by: "INTEGRATOR"
description: "Replace ad hoc task state mutations across start, block, set-status, verify, and finish with one transition service that owns status, plan approval, verification, commit, and comment/event side effects."
sections:
  Summary: |-
    Introduce unified workflow transition service for task lifecycle mutations
    
    Replace ad hoc task state mutations across start, block, set-status, verify, and finish with one transition service that owns status, plan approval, verification, commit, and comment/event side effects.
  Scope: |-
    - In scope: Replace ad hoc task state mutations across start, block, set-status, verify, and finish with one transition service that owns status, plan approval, verification, commit, and comment/event side effects.
    - Out of scope: unrelated refactors not required for "Introduce unified workflow transition service for task lifecycle mutations".
  Plan: |-
    1. Inventory every direct task-state mutation path across start-ready, block, set-status, verify, finish, and shared task backend helpers, and define one canonical transition service API that owns status, approval, verification, commit, comment, and event writes.
    2. Implement that transition service in the shared task domain, migrate the touched commands to it incrementally, and keep task doc/task backend projections behaviorally stable.
    3. Add focused regression coverage for each migrated lifecycle path, then run the smallest targeted build/test surface and record remaining follow-up in Findings.
  Verify Steps: |-
    1. Inspect the migrated lifecycle commands and shared task-domain writes. Expected: start-ready, block, set-status, verify, and finish all route their status/comment/event/verification updates through one shared transition service instead of each command mutating task state ad hoc.
    2. Run focused lifecycle and task-backend regression tests covering the migrated commands. Expected: task status, plan approval, verification records, commit metadata, and emitted comments/events stay identical to the pre-refactor behavior for the touched flows.
    3. Run the smallest relevant package builds for core and agentplane. Expected: the new transition service compiles cleanly, and no downstream command/import breakage appears in touched lifecycle paths.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-26T18:53:28.490Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run --filter=agentplane build
    Result: pass
    Evidence: agentplane compiled cleanly after introducing the shared workflow transition service and migrating start/block/set-status/verify/finish write paths to it.
    Scope: packages/agentplane task lifecycle mutation paths.
    
    Command: bunx vitest run packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: 11 files, 159 tests passed, covering the new transition service plus the migrated lifecycle commands and CLI flows.
    Scope: lifecycle mutation behavior and regression surface.
    
    Command: bunx eslint <touched-files> && bunx prettier --check <touched-files>
    Result: pass
    Evidence: all touched task lifecycle files passed lint and formatting checks after the service extraction.
    Scope: touched source and new unit test.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T18:39:11.318Z, excerpt_hash=sha256:a54a16c2b945e7e1288a9f8f691d873a0a4ac4c88507f3c397a376ff9ceec383
    
    ### 2026-03-26T18:56:18.056Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds stayed clean after routing lifecycle writes through the shared workflow transition service.
    Scope: packages/core and packages/agentplane build graph.
    
    Command: bunx vitest run packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: 11 files, 159 tests passed across the shared service plus migrated lifecycle commands and CLI flows.
    Scope: task lifecycle mutation behavior and regression surface.
    
    Command: bunx eslint packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/workflow-transition-service.ts packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts && bunx prettier --check packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/workflow-transition-service.ts packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts
    Result: pass
    Evidence: all touched lifecycle files passed lint and formatting checks after the service extraction.
    Scope: touched source files and the new unit test.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T18:56:03.075Z, excerpt_hash=sha256:a54a16c2b945e7e1288a9f8f691d873a0a4ac4c88507f3c397a376ff9ceec383
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce unified workflow transition service for task lifecycle mutations

Replace ad hoc task state mutations across start, block, set-status, verify, and finish with one transition service that owns status, plan approval, verification, commit, and comment/event side effects.

## Scope

- In scope: Replace ad hoc task state mutations across start, block, set-status, verify, and finish with one transition service that owns status, plan approval, verification, commit, and comment/event side effects.
- Out of scope: unrelated refactors not required for "Introduce unified workflow transition service for task lifecycle mutations".

## Plan

1. Inventory every direct task-state mutation path across start-ready, block, set-status, verify, finish, and shared task backend helpers, and define one canonical transition service API that owns status, approval, verification, commit, comment, and event writes.
2. Implement that transition service in the shared task domain, migrate the touched commands to it incrementally, and keep task doc/task backend projections behaviorally stable.
3. Add focused regression coverage for each migrated lifecycle path, then run the smallest targeted build/test surface and record remaining follow-up in Findings.

## Verify Steps

1. Inspect the migrated lifecycle commands and shared task-domain writes. Expected: start-ready, block, set-status, verify, and finish all route their status/comment/event/verification updates through one shared transition service instead of each command mutating task state ad hoc.
2. Run focused lifecycle and task-backend regression tests covering the migrated commands. Expected: task status, plan approval, verification records, commit metadata, and emitted comments/events stay identical to the pre-refactor behavior for the touched flows.
3. Run the smallest relevant package builds for core and agentplane. Expected: the new transition service compiles cleanly, and no downstream command/import breakage appears in touched lifecycle paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-26T18:53:28.490Z — VERIFY — ok

By: CODER

Note: Command: bun run --filter=agentplane build
Result: pass
Evidence: agentplane compiled cleanly after introducing the shared workflow transition service and migrating start/block/set-status/verify/finish write paths to it.
Scope: packages/agentplane task lifecycle mutation paths.

Command: bunx vitest run packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: 11 files, 159 tests passed, covering the new transition service plus the migrated lifecycle commands and CLI flows.
Scope: lifecycle mutation behavior and regression surface.

Command: bunx eslint <touched-files> && bunx prettier --check <touched-files>
Result: pass
Evidence: all touched task lifecycle files passed lint and formatting checks after the service extraction.
Scope: touched source and new unit test.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T18:39:11.318Z, excerpt_hash=sha256:a54a16c2b945e7e1288a9f8f691d873a0a4ac4c88507f3c397a376ff9ceec383

### 2026-03-26T18:56:18.056Z — VERIFY — ok

By: CODER

Note: Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds stayed clean after routing lifecycle writes through the shared workflow transition service.
Scope: packages/core and packages/agentplane build graph.

Command: bunx vitest run packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: 11 files, 159 tests passed across the shared service plus migrated lifecycle commands and CLI flows.
Scope: task lifecycle mutation behavior and regression surface.

Command: bunx eslint packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/workflow-transition-service.ts packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts && bunx prettier --check packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/close-shared.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/workflow-transition-service.ts packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/verify-record.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts
Result: pass
Evidence: all touched lifecycle files passed lint and formatting checks after the service extraction.
Scope: touched source files and the new unit test.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T18:56:03.075Z, excerpt_hash=sha256:a54a16c2b945e7e1288a9f8f691d873a0a4ac4c88507f3c397a376ff9ceec383

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
