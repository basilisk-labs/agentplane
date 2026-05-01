---
id: "202605010644-6YE9F6"
title: "AP-05: Extract prompt mutation engine"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202605010644-1HMJJA"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T07:40:21.540Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved AP-05 after AP-04 closed and base main synchronized."
verification:
  state: "ok"
  updated_at: "2026-05-01T07:59:00.605Z"
  updated_by: "CODER"
  note: "Verified: mutation engine extraction passes focused prompt-module tests, typecheck, full lint:core, formatting, diff check, and framework bootstrap."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract prompt mutation application into a dedicated mutations engine while keeping compiler orchestration and public APIs stable."
events:
  -
    type: "status"
    at: "2026-05-01T07:40:42.805Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract prompt mutation application into a dedicated mutations engine while keeping compiler orchestration and public APIs stable."
  -
    type: "verify"
    at: "2026-05-01T07:59:00.605Z"
    author: "CODER"
    state: "ok"
    note: "Verified: mutation engine extraction passes focused prompt-module tests, typecheck, full lint:core, formatting, diff check, and framework bootstrap."
doc_version: 3
doc_updated_at: "2026-05-01T07:59:00.609Z"
doc_updated_by: "CODER"
description: "Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable."
sections:
  Summary: |-
    AP-05: Extract prompt mutation engine
    
    Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable.
  Scope: |-
    - In scope: Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable.
    - Out of scope: unrelated refactors not required for "AP-05: Extract prompt mutation engine".
  Plan: |-
    1. Implement the change for "AP-05: Extract prompt mutation engine".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T07:59:00.605Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: mutation engine extraction passes focused prompt-module tests, typecheck, full lint:core, formatting, diff check, and framework bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T07:40:42.805Z, excerpt_hash=sha256:f96269a649691b444cd8ee7a547d4da02dd0b734a2a48b45b0ebe0284aa5e9dc
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts --testTimeout 60000 --hookTimeout 60000. Result: pass. Evidence: 2 files, 14 tests passed. Scope: prompt compiler and mutation contracts.
    Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: repository TypeScript project references.
    Command: bun run lint:core. Result: pass. Evidence: eslint packages scripts eslint.config.cjs vitest.config.ts exited 0. Scope: core lint gate.
    Command: bunx prettier --check packages/agentplane/src/runtime/prompt-modules/compiler.ts packages/agentplane/src/runtime/prompt-modules/mutations-engine.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts. Result: pass. Evidence: all matched files use Prettier code style. Scope: touched prompt-module files.
    Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: full diff.
    Command: bun run framework:dev:bootstrap. Result: pass. Evidence: repo-local runtime ready, agentplane/core 0.4.0 match expectation. Scope: framework dev build/runtime.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-05: Extract prompt mutation engine

Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable.

## Scope

- In scope: Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable.
- Out of scope: unrelated refactors not required for "AP-05: Extract prompt mutation engine".

## Plan

1. Implement the change for "AP-05: Extract prompt mutation engine".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T07:59:00.605Z — VERIFY — ok

By: CODER

Note: Verified: mutation engine extraction passes focused prompt-module tests, typecheck, full lint:core, formatting, diff check, and framework bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T07:40:42.805Z, excerpt_hash=sha256:f96269a649691b444cd8ee7a547d4da02dd0b734a2a48b45b0ebe0284aa5e9dc

Details:

Command: bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts --testTimeout 60000 --hookTimeout 60000. Result: pass. Evidence: 2 files, 14 tests passed. Scope: prompt compiler and mutation contracts.
Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: repository TypeScript project references.
Command: bun run lint:core. Result: pass. Evidence: eslint packages scripts eslint.config.cjs vitest.config.ts exited 0. Scope: core lint gate.
Command: bunx prettier --check packages/agentplane/src/runtime/prompt-modules/compiler.ts packages/agentplane/src/runtime/prompt-modules/mutations-engine.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts. Result: pass. Evidence: all matched files use Prettier code style. Scope: touched prompt-module files.
Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: full diff.
Command: bun run framework:dev:bootstrap. Result: pass. Evidence: repo-local runtime ready, agentplane/core 0.4.0 match expectation. Scope: framework dev build/runtime.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
