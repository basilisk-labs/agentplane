---
id: "202604030441-AQRVW4"
title: "F-001 Introduce ResolvedHarnessContract"
result_summary: "ResolvedHarnessContract is now part of the framework runtime and runner base-prompt wiring uses the centralized harness contract."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "framework"
  - "runtime"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:41:59.975Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "ok"
  updated_at: "2026-04-03T08:42:27.857Z"
  updated_by: "CODER"
  note: |-
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b completed without diagnostics.
    Scope: framework harness contract, command-context memo, runner prompt wiring.
    
    Command: bunx vitest run packages/agentplane/src/runtime/harness/resolve.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 2 files passed, 5 tests passed; new harness resolver and runner base prompt fallback remained green.
    Scope: runtime/harness resolver coverage and first consumer integration in runner base prompts.
commit:
  hash: "6ab727805ffc6a67c364d17175fca0f6c0705d85"
  message: "🛠 framework: add resolved harness contract"
comments:
  -
    author: "CODER"
    body: "Start: implement the centralized ResolvedHarnessContract and migrate the first framework consumers onto the explicit harness resolver."
  -
    author: "INTEGRATOR"
    body: "Verified: merged ResolvedHarnessContract into main with typecheck and targeted harness tests recorded in the task artifact."
events:
  -
    type: "status"
    at: "2026-04-03T04:43:51.536Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the centralized ResolvedHarnessContract and migrate the first framework consumers onto the explicit harness resolver."
  -
    type: "verify"
    at: "2026-04-03T08:42:27.857Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun run typecheck
      Result: pass
      Evidence: tsc -b completed without diagnostics.
      Scope: framework harness contract, command-context memo, runner prompt wiring.
      
      Command: bunx vitest run packages/agentplane/src/runtime/harness/resolve.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts --hookTimeout 60000 --testTimeout 60000
      Result: pass
      Evidence: 2 files passed, 5 tests passed; new harness resolver and runner base prompt fallback remained green.
      Scope: runtime/harness resolver coverage and first consumer integration in runner base prompts.
  -
    type: "status"
    at: "2026-04-03T08:51:31.884Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged ResolvedHarnessContract into main with typecheck and targeted harness tests recorded in the task artifact."
doc_version: 3
doc_updated_at: "2026-04-03T08:51:31.885Z"
doc_updated_by: "INTEGRATOR"
description: "Centralize harness sources of truth into an explicit framework contract with merge tests."
sections:
  Summary: |-
    F-001 Introduce ResolvedHarnessContract
    
    Centralize harness sources of truth into an explicit framework contract with merge tests.
  Scope: |-
    - In scope: Centralize harness sources of truth into an explicit framework contract with merge tests.
    - Out of scope: unrelated refactors not required for "F-001 Introduce ResolvedHarnessContract".
  Plan: |-
    1. Catalog the current harness facts spread across config, policy gateway, runner, and helper layers.
    2. Add a centralized ResolvedHarnessContract resolver under the runtime harness surface with explicit sources of truth and merge semantics.
    3. Migrate the first consumers and lock the merge behavior with unit tests.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T08:42:27.857Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run typecheck\nResult: pass\nEvidence: tsc -b completed without diagnostics.\nScope: framework harness contract, command-context memo, runner prompt wiring.\n\nCommand: bunx vitest run packages/agentplane/src/runtime/harness/resolve.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts --hookTimeout 60000 --testTimeout 60000\nResult: pass\nEvidence: 2 files passed, 5 tests passed; new harness resolver and runner base prompt fallback remained green.\nScope: runtime/harness resolver coverage and first consumer integration in runner base prompts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T04:43:51.546Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

F-001 Introduce ResolvedHarnessContract

Centralize harness sources of truth into an explicit framework contract with merge tests.

## Scope

- In scope: Centralize harness sources of truth into an explicit framework contract with merge tests.
- Out of scope: unrelated refactors not required for "F-001 Introduce ResolvedHarnessContract".

## Plan

1. Catalog the current harness facts spread across config, policy gateway, runner, and helper layers.
2. Add a centralized ResolvedHarnessContract resolver under the runtime harness surface with explicit sources of truth and merge semantics.
3. Migrate the first consumers and lock the merge behavior with unit tests.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T08:42:27.857Z — VERIFY — ok

By: CODER

Note: Command: bun run typecheck\nResult: pass\nEvidence: tsc -b completed without diagnostics.\nScope: framework harness contract, command-context memo, runner prompt wiring.\n\nCommand: bunx vitest run packages/agentplane/src/runtime/harness/resolve.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts --hookTimeout 60000 --testTimeout 60000\nResult: pass\nEvidence: 2 files passed, 5 tests passed; new harness resolver and runner base prompt fallback remained green.\nScope: runtime/harness resolver coverage and first consumer integration in runner base prompts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T04:43:51.546Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
