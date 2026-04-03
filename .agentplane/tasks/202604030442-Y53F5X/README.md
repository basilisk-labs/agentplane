---
id: "202604030442-Y53F5X"
title: "F-002 Introduce AgentplaneExecutionContext"
result_summary: "integrate: squash task/202604030442-Y53F5X/agentplane-execution-context"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202604030441-AQRVW4"
tags:
  - "code"
  - "framework"
  - "context"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:00.756Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "ok"
  updated_at: "2026-04-03T09:35:47.399Z"
  updated_by: "CODER"
  note: "Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts."
commit:
  hash: "8784ee8b8d930e247ab33ce1164d053971c79244"
  message: "📝 Y53F5X task: refresh verification and pr state"
comments:
  -
    author: "CODER"
    body: "Start: introduce AgentplaneExecutionContext and reduce command-local context stitching onto the canonical framework execution context."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=ran; pr=.agentplane/tasks/202604030442-Y53F5X/pr."
events:
  -
    type: "status"
    at: "2026-04-03T08:55:12.985Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce AgentplaneExecutionContext and reduce command-local context stitching onto the canonical framework execution context."
  -
    type: "verify"
    at: "2026-04-03T09:09:35.898Z"
    author: "CODER"
    state: "ok"
    note: "Verified F-002 AgentplaneExecutionContext. Checks passed: bun run typecheck; vitest for resolve-context.unit, task-list-usecase.unit, scenario-materialize-task; vitest task-run-lifecycle resume/retry paths. Residual environment issue: live-process cancel tests still hit ps spawn EPERM in this sandbox and are recorded in Findings."
  -
    type: "verify"
    at: "2026-04-03T09:11:10.412Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/usecases/task/task-list-usecase.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts."
  -
    type: "verify"
    at: "2026-04-03T09:20:45.737Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runtime/capabilities/resolve-from-command-context.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts."
  -
    type: "verify"
    at: "2026-04-03T09:29:11.172Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runtime/capabilities/resolve-from-command-context.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts."
  -
    type: "verify"
    at: "2026-04-03T09:35:47.399Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts."
  -
    type: "status"
    at: "2026-04-03T09:37:13.074Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=ran; pr=.agentplane/tasks/202604030442-Y53F5X/pr."
doc_version: 3
doc_updated_at: "2026-04-03T09:37:13.080Z"
doc_updated_by: "INTEGRATOR"
description: "Create one canonical execution context for task, recipe, and runner paths."
sections:
  Summary: |-
    F-002 Introduce AgentplaneExecutionContext
    
    Create one canonical execution context for task, recipe, and runner paths.
  Scope: |-
    - In scope: Create one canonical execution context for task, recipe, and runner paths.
    - Out of scope: unrelated refactors not required for "F-002 Introduce AgentplaneExecutionContext".
  Plan: |-
    1. Define AgentplaneExecutionContext around repo, task, harness, config, policy, and execution-profile data.
    2. Refactor context assembly so use cases stop stitching ad hoc command-local structures.
    3. Update tests to prove the canonical context is reusable across framework entrypoints.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T09:09:35.898Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified F-002 AgentplaneExecutionContext. Checks passed: bun run typecheck; vitest for resolve-context.unit, task-list-usecase.unit, scenario-materialize-task; vitest task-run-lifecycle resume/retry paths. Residual environment issue: live-process cancel tests still hit ps spawn EPERM in this sandbox and are recorded in Findings.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:09:20.430Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    ### 2026-04-03T09:11:10.412Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/usecases/task/task-list-usecase.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:09:35.900Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    ### 2026-04-03T09:20:45.737Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runtime/capabilities/resolve-from-command-context.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:11:10.418Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    ### 2026-04-03T09:29:11.172Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runtime/capabilities/resolve-from-command-context.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:20:45.771Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    ### 2026-04-03T09:35:47.399Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:29:11.188Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Introduced a canonical execution context over CommandContext with repo/backend/harness/execution/approval metadata plus policy/adapters helpers.
    - Migrated task usecases and runner task/recipe lifecycle entrypoints to consume the canonical context instead of reassembling harness/config/backend fragments locally.
    - Full task-run lifecycle cancel tests that inspect live processes still hit `ps` spawn EPERM in this environment; typecheck plus non-process runner lifecycle paths passed.
id_source: "generated"
---
## Summary

F-002 Introduce AgentplaneExecutionContext

Create one canonical execution context for task, recipe, and runner paths.

## Scope

- In scope: Create one canonical execution context for task, recipe, and runner paths.
- Out of scope: unrelated refactors not required for "F-002 Introduce AgentplaneExecutionContext".

## Plan

1. Define AgentplaneExecutionContext around repo, task, harness, config, policy, and execution-profile data.
2. Refactor context assembly so use cases stop stitching ad hoc command-local structures.
3. Update tests to prove the canonical context is reusable across framework entrypoints.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T09:09:35.898Z — VERIFY — ok

By: CODER

Note: Verified F-002 AgentplaneExecutionContext. Checks passed: bun run typecheck; vitest for resolve-context.unit, task-list-usecase.unit, scenario-materialize-task; vitest task-run-lifecycle resume/retry paths. Residual environment issue: live-process cancel tests still hit ps spawn EPERM in this sandbox and are recorded in Findings.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:09:20.430Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

### 2026-04-03T09:11:10.412Z — VERIFY — ok

By: CODER

Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/usecases/task/task-list-usecase.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:09:35.900Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

### 2026-04-03T09:20:45.737Z — VERIFY — ok

By: CODER

Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runtime/capabilities/resolve-from-command-context.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:11:10.418Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

### 2026-04-03T09:29:11.172Z — VERIFY — ok

By: CODER

Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runtime/capabilities/resolve-from-command-context.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:20:45.771Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

### 2026-04-03T09:35:47.399Z — VERIFY — ok

By: CODER

Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/context/task-context.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:29:11.188Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Introduced a canonical execution context over CommandContext with repo/backend/harness/execution/approval metadata plus policy/adapters helpers.
- Migrated task usecases and runner task/recipe lifecycle entrypoints to consume the canonical context instead of reassembling harness/config/backend fragments locally.
- Full task-run lifecycle cancel tests that inspect live processes still hit `ps` spawn EPERM in this environment; typecheck plus non-process runner lifecycle paths passed.
