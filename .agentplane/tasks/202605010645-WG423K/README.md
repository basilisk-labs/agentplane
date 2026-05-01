---
id: "202605010645-WG423K"
title: "AP-06: Add prompt selector and merge diagnostics"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202605010644-6YE9F6"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T08:06:08.992Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after AP-05 closed on main and dependency is ready."
verification:
  state: "ok"
  updated_at: "2026-05-01T08:12:21.408Z"
  updated_by: "CODER"
  note: "Verified: prompt diagnostics warnings pass focused compiler tests, typecheck, full lint:core, formatting, diff check, and framework bootstrap."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add prompt compiler diagnostics for broad disable selectors and implicit duplicate merge selection."
events:
  -
    type: "status"
    at: "2026-05-01T08:07:50.055Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add prompt compiler diagnostics for broad disable selectors and implicit duplicate merge selection."
  -
    type: "verify"
    at: "2026-05-01T08:12:21.408Z"
    author: "CODER"
    state: "ok"
    note: "Verified: prompt diagnostics warnings pass focused compiler tests, typecheck, full lint:core, formatting, diff check, and framework bootstrap."
doc_version: 3
doc_updated_at: "2026-05-01T08:12:21.422Z"
doc_updated_by: "CODER"
description: "Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible."
sections:
  Summary: |-
    AP-06: Add prompt selector and merge diagnostics
    
    Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible.
  Scope: |-
    - In scope: Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible.
    - Out of scope: unrelated refactors not required for "AP-06: Add prompt selector and merge diagnostics".
  Plan: |-
    1. Implement the change for "AP-06: Add prompt selector and merge diagnostics".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T08:12:21.408Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: prompt diagnostics warnings pass focused compiler tests, typecheck, full lint:core, formatting, diff check, and framework bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T08:07:50.055Z, excerpt_hash=sha256:2488d932674b6cf163d1054627d4316fd1f5fe35689a60c29436aa82178c774d
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000. Result: pass. Evidence: 1 file, 12 tests passed. Scope: prompt compiler diagnostics for selectors and duplicate merge selection.
    Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: repository TypeScript project references.
    Command: bun run lint:core. Result: pass. Evidence: eslint packages scripts eslint.config.cjs vitest.config.ts exited 0. Scope: core lint gate.
    Command: bunx prettier --check packages/agentplane/src/runtime/prompt-modules/compiler.ts packages/agentplane/src/runtime/prompt-modules/compiler.merge.ts packages/agentplane/src/runtime/prompt-modules/mutations-engine.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts. Result: pass. Evidence: all matched files use Prettier code style. Scope: touched prompt-module files.
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

AP-06: Add prompt selector and merge diagnostics

Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible.

## Scope

- In scope: Warn on broad disable selectors and implicit duplicate pick-one selection so prompt graph data loss is visible.
- Out of scope: unrelated refactors not required for "AP-06: Add prompt selector and merge diagnostics".

## Plan

1. Implement the change for "AP-06: Add prompt selector and merge diagnostics".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T08:12:21.408Z — VERIFY — ok

By: CODER

Note: Verified: prompt diagnostics warnings pass focused compiler tests, typecheck, full lint:core, formatting, diff check, and framework bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T08:07:50.055Z, excerpt_hash=sha256:2488d932674b6cf163d1054627d4316fd1f5fe35689a60c29436aa82178c774d

Details:

Command: bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000. Result: pass. Evidence: 1 file, 12 tests passed. Scope: prompt compiler diagnostics for selectors and duplicate merge selection.
Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: repository TypeScript project references.
Command: bun run lint:core. Result: pass. Evidence: eslint packages scripts eslint.config.cjs vitest.config.ts exited 0. Scope: core lint gate.
Command: bunx prettier --check packages/agentplane/src/runtime/prompt-modules/compiler.ts packages/agentplane/src/runtime/prompt-modules/compiler.merge.ts packages/agentplane/src/runtime/prompt-modules/mutations-engine.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts. Result: pass. Evidence: all matched files use Prettier code style. Scope: touched prompt-module files.
Command: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: full diff.
Command: bun run framework:dev:bootstrap. Result: pass. Evidence: repo-local runtime ready, agentplane/core 0.4.0 match expectation. Scope: framework dev build/runtime.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
