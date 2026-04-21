---
id: "202604210859-S50ZT0"
title: "Enable full no-misused-promises checking"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "lint"
  - "typescript"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T10:51:43.106Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T10:54:22.909Z"
  updated_by: "CODER"
  note: "Enabled no-misused-promises checksVoidReturn, fixed the sole async close-handler finding without suppressions, and passed lint plus affected process supervision tests."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: enable no-misused-promises checksVoidReturn and fix or justify resulting findings."
events:
  -
    type: "status"
    at: "2026-04-21T10:51:43.543Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enable no-misused-promises checksVoidReturn and fix or justify resulting findings."
  -
    type: "verify"
    at: "2026-04-21T10:54:22.909Z"
    author: "CODER"
    state: "ok"
    note: "Enabled no-misused-promises checksVoidReturn, fixed the sole async close-handler finding without suppressions, and passed lint plus affected process supervision tests."
doc_version: 3
doc_updated_at: "2026-04-21T10:54:22.912Z"
doc_updated_by: "CODER"
description: "Enable @typescript-eslint/no-misused-promises checksVoidReturn and fix or explicitly justify resulting async handler findings."
sections:
  Summary: "Tighten TypeScript linting around async functions passed to void-returning callbacks to reduce unhandled promise risk."
  Scope: "In scope: ESLint rule config, resulting code fixes, and targeted suppressions with comments. Out of scope: unrelated lint cleanup."
  Plan: |-
    1. Enable checksVoidReturn=true for no-misused-promises.
    2. Run lint to collect findings.
    3. Fix handlers by awaiting/catching/wrapping, or add narrow disables with rationale.
    4. Run lint and affected tests.
  Verify Steps: |-
    - Lint passes with checksVoidReturn enabled.
    - Suppressions, if any, are local and explain why the promise cannot leak.
    - No unrelated lint rules are changed.
  Verification: |-
    - Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210859-S50ZT0`
      - Result: pass
      - Evidence: task requires lint with checksVoidReturn enabled, justified suppressions if any, and no unrelated lint rule changes.
      - Scope: task acceptance contract.
    - Command: `bun run lint:core`
      - Result: pass
      - Evidence: ESLint passed after enabling `@typescript-eslint/no-misused-promises` with `checksVoidReturn: true`; the only finding was fixed in process supervision close handling.
      - Scope: core TypeScript/JavaScript lint surface.
    - Command: `bun run test:project -- agentplane --run packages/agentplane/src/runner/process-supervision.test.ts`
      - Result: pass
      - Evidence: 1 test file passed, 5 tests passed.
      - Scope: affected process supervision behavior.
    - Command: `bunx prettier --check eslint.config.cjs packages/agentplane/src/runner/process-supervision/run.ts`
      - Result: pass
      - Evidence: all matched files use Prettier code style.
      - Scope: changed lint config and source file.
    - Command: `git diff --check -- eslint.config.cjs packages/agentplane/src/runner/process-supervision/run.ts .agentplane/tasks/202604210859-S50ZT0/README.md`
      - Result: pass
      - Evidence: no whitespace errors before verification entry.
      - Scope: task-scoped files.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T10:54:22.909Z — VERIFY — ok
    
    By: CODER
    
    Note: Enabled no-misused-promises checksVoidReturn, fixed the sole async close-handler finding without suppressions, and passed lint plus affected process supervision tests.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:54:22.559Z, excerpt_hash=sha256:c33f1ddbabeab957ffd29ff702e01b872f04bcc180bc09599fc402fafc8492f7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore prior lint option and revert code fixes for this task only."
  Findings: "Source input: AUDIT M-3 and REFACTORING_PLAN E.4."
id_source: "generated"
---
## Summary

Tighten TypeScript linting around async functions passed to void-returning callbacks to reduce unhandled promise risk.

## Scope

In scope: ESLint rule config, resulting code fixes, and targeted suppressions with comments. Out of scope: unrelated lint cleanup.

## Plan

1. Enable checksVoidReturn=true for no-misused-promises.
2. Run lint to collect findings.
3. Fix handlers by awaiting/catching/wrapping, or add narrow disables with rationale.
4. Run lint and affected tests.

## Verify Steps

- Lint passes with checksVoidReturn enabled.
- Suppressions, if any, are local and explain why the promise cannot leak.
- No unrelated lint rules are changed.

## Verification

- Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210859-S50ZT0`
  - Result: pass
  - Evidence: task requires lint with checksVoidReturn enabled, justified suppressions if any, and no unrelated lint rule changes.
  - Scope: task acceptance contract.
- Command: `bun run lint:core`
  - Result: pass
  - Evidence: ESLint passed after enabling `@typescript-eslint/no-misused-promises` with `checksVoidReturn: true`; the only finding was fixed in process supervision close handling.
  - Scope: core TypeScript/JavaScript lint surface.
- Command: `bun run test:project -- agentplane --run packages/agentplane/src/runner/process-supervision.test.ts`
  - Result: pass
  - Evidence: 1 test file passed, 5 tests passed.
  - Scope: affected process supervision behavior.
- Command: `bunx prettier --check eslint.config.cjs packages/agentplane/src/runner/process-supervision/run.ts`
  - Result: pass
  - Evidence: all matched files use Prettier code style.
  - Scope: changed lint config and source file.
- Command: `git diff --check -- eslint.config.cjs packages/agentplane/src/runner/process-supervision/run.ts .agentplane/tasks/202604210859-S50ZT0/README.md`
  - Result: pass
  - Evidence: no whitespace errors before verification entry.
  - Scope: task-scoped files.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T10:54:22.909Z — VERIFY — ok

By: CODER

Note: Enabled no-misused-promises checksVoidReturn, fixed the sole async close-handler finding without suppressions, and passed lint plus affected process supervision tests.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:54:22.559Z, excerpt_hash=sha256:c33f1ddbabeab957ffd29ff702e01b872f04bcc180bc09599fc402fafc8492f7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore prior lint option and revert code fixes for this task only.

## Findings

Source input: AUDIT M-3 and REFACTORING_PLAN E.4.
