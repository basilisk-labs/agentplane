---
id: "202604030442-VB1XAH"
title: "F-007 Operationalize execution profiles"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604030442-Y53F5X"
  - "202604030442-C0JQDY"
tags:
  - "code"
  - "framework"
  - "execution-profile"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:04.679Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "ok"
  updated_at: "2026-04-03T11:21:58.372Z"
  updated_by: "CODER"
  note: "Verified: bun run typecheck; node scripts/run-pre-commit-hook.mjs; bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/execution-profile/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: operationalize execution profiles so budgets, stop conditions, handoff boundaries, approvals, and timeout/trace behavior resolve through explicit runtime contracts instead of scattered helpers."
events:
  -
    type: "status"
    at: "2026-04-03T10:58:29.434Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: operationalize execution profiles so budgets, stop conditions, handoff boundaries, approvals, and timeout/trace behavior resolve through explicit runtime contracts instead of scattered helpers."
  -
    type: "verify"
    at: "2026-04-03T11:21:58.372Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run typecheck; node scripts/run-pre-commit-hook.mjs; bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/execution-profile/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000"
doc_version: 3
doc_updated_at: "2026-04-03T11:21:58.378Z"
doc_updated_by: "CODER"
description: "Turn execution profiles into executable runtime behavior for budgets, stop, handoff, timeout, and trace policies."
sections:
  Summary: |-
    F-007 Operationalize execution profiles
    
    Turn execution profiles into executable runtime behavior for budgets, stop, handoff, timeout, and trace policies.
  Scope: |-
    - In scope: Turn execution profiles into executable runtime behavior for budgets, stop, handoff, timeout, and trace policies.
    - Out of scope: unrelated refactors not required for "F-007 Operationalize execution profiles".
  Plan: |-
    1. Extend execution-profile resolution from static presets into computed runtime policy objects.
    2. Make budgets, stop conditions, handoff rules, timeout rules, and trace policy explicit and testable.
    3. Update config and runtime consumers to use the operationalized profile contract.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T11:21:58.372Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run typecheck; node scripts/run-pre-commit-hook.mjs; bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/execution-profile/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T10:58:29.446Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

F-007 Operationalize execution profiles

Turn execution profiles into executable runtime behavior for budgets, stop, handoff, timeout, and trace policies.

## Scope

- In scope: Turn execution profiles into executable runtime behavior for budgets, stop, handoff, timeout, and trace policies.
- Out of scope: unrelated refactors not required for "F-007 Operationalize execution profiles".

## Plan

1. Extend execution-profile resolution from static presets into computed runtime policy objects.
2. Make budgets, stop conditions, handoff rules, timeout rules, and trace policy explicit and testable.
3. Update config and runtime consumers to use the operationalized profile contract.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T11:21:58.372Z — VERIFY — ok

By: CODER

Note: Verified: bun run typecheck; node scripts/run-pre-commit-hook.mjs; bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/execution-profile/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T10:58:29.446Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
