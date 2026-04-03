---
id: "202604030442-NBBE36"
title: "F-008 Introduce task intake contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604030442-Y53F5X"
  - "202604030442-YD0K3G"
tags:
  - "code"
  - "framework"
  - "intake"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:05.462Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "ok"
  updated_at: "2026-04-03T13:35:42.746Z"
  updated_by: "CODER"
  note: "Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/task-intake/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; node scripts/run-pre-commit-hook.mjs"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: define framework-level intake, clarification, graph draft, and materialization contracts, then connect them to the canonical execution context without coupling to runner or recipes."
events:
  -
    type: "status"
    at: "2026-04-03T11:24:23.030Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define framework-level intake, clarification, graph draft, and materialization contracts, then connect them to the canonical execution context without coupling to runner or recipes."
  -
    type: "verify"
    at: "2026-04-03T13:35:42.746Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/task-intake/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; node scripts/run-pre-commit-hook.mjs"
doc_version: 3
doc_updated_at: "2026-04-03T13:35:42.753Z"
doc_updated_by: "CODER"
description: "Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows."
sections:
  Summary: |-
    F-008 Introduce task intake contracts
    
    Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows.
  Scope: |-
    - In scope: Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows.
    - Out of scope: unrelated refactors not required for "F-008 Introduce task intake contracts".
  Plan: |-
    1. Define TaskIntakeContext, ClarificationContract, TaskGraphDraft, and TaskMaterializationPlan in a recipe-agnostic runtime module.
    2. Connect the contracts to the canonical execution context and precedence surfaces without importing runner-specific behavior.
    3. Add tests that preserve separation between clarification, drafting, and materialization.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T13:35:42.746Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/task-intake/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; node scripts/run-pre-commit-hook.mjs
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T11:24:23.040Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

F-008 Introduce task intake contracts

Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows.

## Scope

- In scope: Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows.
- Out of scope: unrelated refactors not required for "F-008 Introduce task intake contracts".

## Plan

1. Define TaskIntakeContext, ClarificationContract, TaskGraphDraft, and TaskMaterializationPlan in a recipe-agnostic runtime module.
2. Connect the contracts to the canonical execution context and precedence surfaces without importing runner-specific behavior.
3. Add tests that preserve separation between clarification, drafting, and materialization.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T13:35:42.746Z — VERIFY — ok

By: CODER

Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/task-intake/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; node scripts/run-pre-commit-hook.mjs

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T11:24:23.040Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
