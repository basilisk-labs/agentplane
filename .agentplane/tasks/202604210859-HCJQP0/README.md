---
id: "202604210859-HCJQP0"
title: "Split hosted-close PR command pipeline"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T10:51:41.341Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T10:58:29.592Z"
  updated_by: "CODER"
  note: "Hosted-close PR command split into pre-check, execute, post-check, and report phases; direct hosted-close PR tests, cli-core hosted-close scenarios, formatter, eslint, and typecheck passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split hosted-close PR command pipeline into lifecycle phase modules while preserving CLI contract."
events:
  -
    type: "status"
    at: "2026-04-21T10:51:41.773Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split hosted-close PR command pipeline into lifecycle phase modules while preserving CLI contract."
  -
    type: "verify"
    at: "2026-04-21T10:58:29.592Z"
    author: "CODER"
    state: "ok"
    note: "Hosted-close PR command split into pre-check, execute, post-check, and report phases; direct hosted-close PR tests, cli-core hosted-close scenarios, formatter, eslint, and typecheck passed."
doc_version: 3
doc_updated_at: "2026-04-21T10:58:29.595Z"
doc_updated_by: "CODER"
description: "Decompose hosted-close PR command into lifecycle modules while keeping command behavior unchanged."
sections:
  Summary: "Reduce the hosted-close PR command hotspot by extracting pre-check, execute, post-check, and report phases."
  Scope: "In scope: hosted-close PR command implementation and direct tests. Out of scope: changing hosted provider behavior or task lifecycle semantics."
  Plan: |-
    1. Read the existing hosted-close PR command flow and tests.
    2. Extract lifecycle modules following the existing finish-* pattern.
    3. Keep the command entrypoint small and declarative.
    4. Run affected command tests.
  Verify Steps: |-
    - Command entrypoint is substantially smaller and delegates to phase modules.
    - Existing hosted-close PR tests pass.
    - No public CLI contract changes.
  Verification: |-
    - Command: agentplane task verify-show 202604210859-HCJQP0
      Result: pass
      Evidence: verify contract read; required outcomes are smaller delegated entrypoint, existing hosted-close PR tests, unchanged public CLI contract.
      Scope: active task verification contract.
    
    - Command: wc -l packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts packages/agentplane/src/commands/task/hosted-close-pr.execute.ts packages/agentplane/src/commands/task/hosted-close-pr.postcheck.ts packages/agentplane/src/commands/task/hosted-close-pr.report.ts packages/agentplane/src/commands/task/hosted-close-pr.types.ts
      Result: pass
      Evidence: hosted-close-pr.command.ts is 128 lines after extraction; phase modules are precheck 357, execute 158, postcheck 20, report 73, types 82.
      Scope: command entrypoint decomposition.
    
    - Command: bunx prettier --check packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/commands/task/hosted-close-pr.types.ts packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts packages/agentplane/src/commands/task/hosted-close-pr.execute.ts packages/agentplane/src/commands/task/hosted-close-pr.postcheck.ts packages/agentplane/src/commands/task/hosted-close-pr.report.ts packages/agentplane/src/commands/task/hosted-close-pr.command.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts
      Result: pass
      Evidence: All matched files use Prettier code style.
      Scope: changed hosted-close-pr files and direct hosted-close-pr tests.
    
    - Command: bunx eslint packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/commands/task/hosted-close-pr.types.ts packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts packages/agentplane/src/commands/task/hosted-close-pr.execute.ts packages/agentplane/src/commands/task/hosted-close-pr.postcheck.ts packages/agentplane/src/commands/task/hosted-close-pr.report.ts
      Result: pass
      Evidence: command completed with exit code 0 after adding switch case braces.
      Scope: changed hosted-close-pr implementation files.
    
    - Command: bun run test:project -- fast packages/agentplane/src/commands/task/hosted-close-pr.command.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts
      Result: pass
      Evidence: 2 files passed, 3 tests passed.
      Scope: direct hosted-close-pr command spec and workflow contract tests.
    
    - Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts
      Result: pass
      Evidence: 1 file passed, 6 tests passed, including three task hosted-close-pr recovery/skip scenarios.
      Scope: CLI hosted-close and hosted-close-pr integration behavior.
    
    - Command: bun run typecheck
      Result: pass
      Evidence: tsc -b completed with exit code 0.
      Scope: repository TypeScript project references affected by the refactor.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T10:58:29.592Z — VERIFY — ok
    
    By: CODER
    
    Note: Hosted-close PR command split into pre-check, execute, post-check, and report phases; direct hosted-close PR tests, cli-core hosted-close scenarios, formatter, eslint, and typecheck passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:58:24.700Z, excerpt_hash=sha256:e69a87d9a7d8ad21ca737141bb85ce0b01b26624b4ccf9863d29b9e2ba941b0c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert extracted modules and command entrypoint changes."
  Findings: |-
    Source input: REFACTORING_PLAN C.1.
    
    - Finding: hosted-close-pr command now follows explicit phases: pre-check resolves task/PR state and validates remote close branch; execute performs cleanup, base-recorded check, existing PR lookup, and PR creation; post-check validates created PR number; report renders the preserved CLI messages.
    - Finding: public CLI spec, options, examples, success/error strings, GitHub endpoints, and batch task-id behavior were kept unchanged.
    - Finding: repository has unrelated concurrent changes outside this task scope, including other task READMEs, recipes test split files, Zod/config files, bun.lock, and vitest.workspace.ts. They were not modified as part of this task scope.
id_source: "generated"
---
## Summary

Reduce the hosted-close PR command hotspot by extracting pre-check, execute, post-check, and report phases.

## Scope

In scope: hosted-close PR command implementation and direct tests. Out of scope: changing hosted provider behavior or task lifecycle semantics.

## Plan

1. Read the existing hosted-close PR command flow and tests.
2. Extract lifecycle modules following the existing finish-* pattern.
3. Keep the command entrypoint small and declarative.
4. Run affected command tests.

## Verify Steps

- Command entrypoint is substantially smaller and delegates to phase modules.
- Existing hosted-close PR tests pass.
- No public CLI contract changes.

## Verification

- Command: agentplane task verify-show 202604210859-HCJQP0
  Result: pass
  Evidence: verify contract read; required outcomes are smaller delegated entrypoint, existing hosted-close PR tests, unchanged public CLI contract.
  Scope: active task verification contract.

- Command: wc -l packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts packages/agentplane/src/commands/task/hosted-close-pr.execute.ts packages/agentplane/src/commands/task/hosted-close-pr.postcheck.ts packages/agentplane/src/commands/task/hosted-close-pr.report.ts packages/agentplane/src/commands/task/hosted-close-pr.types.ts
  Result: pass
  Evidence: hosted-close-pr.command.ts is 128 lines after extraction; phase modules are precheck 357, execute 158, postcheck 20, report 73, types 82.
  Scope: command entrypoint decomposition.

- Command: bunx prettier --check packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/commands/task/hosted-close-pr.types.ts packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts packages/agentplane/src/commands/task/hosted-close-pr.execute.ts packages/agentplane/src/commands/task/hosted-close-pr.postcheck.ts packages/agentplane/src/commands/task/hosted-close-pr.report.ts packages/agentplane/src/commands/task/hosted-close-pr.command.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts
  Result: pass
  Evidence: All matched files use Prettier code style.
  Scope: changed hosted-close-pr files and direct hosted-close-pr tests.

- Command: bunx eslint packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/commands/task/hosted-close-pr.types.ts packages/agentplane/src/commands/task/hosted-close-pr.precheck.ts packages/agentplane/src/commands/task/hosted-close-pr.execute.ts packages/agentplane/src/commands/task/hosted-close-pr.postcheck.ts packages/agentplane/src/commands/task/hosted-close-pr.report.ts
  Result: pass
  Evidence: command completed with exit code 0 after adding switch case braces.
  Scope: changed hosted-close-pr implementation files.

- Command: bun run test:project -- fast packages/agentplane/src/commands/task/hosted-close-pr.command.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts
  Result: pass
  Evidence: 2 files passed, 3 tests passed.
  Scope: direct hosted-close-pr command spec and workflow contract tests.

- Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts
  Result: pass
  Evidence: 1 file passed, 6 tests passed, including three task hosted-close-pr recovery/skip scenarios.
  Scope: CLI hosted-close and hosted-close-pr integration behavior.

- Command: bun run typecheck
  Result: pass
  Evidence: tsc -b completed with exit code 0.
  Scope: repository TypeScript project references affected by the refactor.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T10:58:29.592Z — VERIFY — ok

By: CODER

Note: Hosted-close PR command split into pre-check, execute, post-check, and report phases; direct hosted-close PR tests, cli-core hosted-close scenarios, formatter, eslint, and typecheck passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:58:24.700Z, excerpt_hash=sha256:e69a87d9a7d8ad21ca737141bb85ce0b01b26624b4ccf9863d29b9e2ba941b0c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert extracted modules and command entrypoint changes.

## Findings

Source input: REFACTORING_PLAN C.1.

- Finding: hosted-close-pr command now follows explicit phases: pre-check resolves task/PR state and validates remote close branch; execute performs cleanup, base-recorded check, existing PR lookup, and PR creation; post-check validates created PR number; report renders the preserved CLI messages.
- Finding: public CLI spec, options, examples, success/error strings, GitHub endpoints, and batch task-id behavior were kept unchanged.
- Finding: repository has unrelated concurrent changes outside this task scope, including other task READMEs, recipes test split files, Zod/config files, bun.lock, and vitest.workspace.ts. They were not modified as part of this task scope.
