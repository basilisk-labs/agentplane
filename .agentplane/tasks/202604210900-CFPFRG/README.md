---
id: "202604210900-CFPFRG"
title: "Split hooks and work-start command hotspots"
result_summary: "Split hooks/index.ts into install/run/shared hook modules and split branch/work-start.ts into direct lock, base branch, hook shim, and worktree materialization modules without CLI contract changes."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202604210859-HCJQP0"
tags:
  - "code"
  - "hooks"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T11:04:39.059Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T11:11:37.150Z"
  updated_by: "CODER"
  note: "Verified: split hooks and work-start hotspots into cohesive modules while preserving CLI contracts. Commands: bunx prettier --check targeted hooks/work-start files (pass); bunx eslint targeted hooks/work-start files (pass); bun run test:project -- fast packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/pre-commit-hook-script.test.ts (pass, 12 tests); bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts (pass, 37 tests); bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts (pass, 15 tests); bun run --filter=agentplane typecheck (pass); bun run hotspots:check (pass); bun run framework:dev:bootstrap (pass). Note: attempted unrelated lifecycle emoji test still fails with expected code 0 but got 2, outside this task scope."
commit:
  hash: "51832ebcd3b8b97de25872136e2a758d9ab6017d"
  message: "✅ CFPFRG code: split hooks and work-start hotspots"
comments:
  -
    author: "CODER"
    body: "Start: split hooks and work-start command hotspots after hosted-close pipeline split, keeping CLI behavior stable and verification scoped to affected command tests."
  -
    author: "CODER"
    body: "Verified: hooks and work-start command hotspots now delegate to cohesive modules; targeted format, lint, hooks tests, pr-flow tests, typecheck, hotspots check, and framework bootstrap passed."
events:
  -
    type: "status"
    at: "2026-04-21T11:04:47.451Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split hooks and work-start command hotspots after hosted-close pipeline split, keeping CLI behavior stable and verification scoped to affected command tests."
  -
    type: "verify"
    at: "2026-04-21T11:11:37.150Z"
    author: "CODER"
    state: "ok"
    note: "Verified: split hooks and work-start hotspots into cohesive modules while preserving CLI contracts. Commands: bunx prettier --check targeted hooks/work-start files (pass); bunx eslint targeted hooks/work-start files (pass); bun run test:project -- fast packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/pre-commit-hook-script.test.ts (pass, 12 tests); bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts (pass, 37 tests); bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts (pass, 15 tests); bun run --filter=agentplane typecheck (pass); bun run hotspots:check (pass); bun run framework:dev:bootstrap (pass). Note: attempted unrelated lifecycle emoji test still fails with expected code 0 but got 2, outside this task scope."
  -
    type: "status"
    at: "2026-04-21T11:12:06.395Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: hooks and work-start command hotspots now delegate to cohesive modules; targeted format, lint, hooks tests, pr-flow tests, typecheck, hotspots check, and framework bootstrap passed."
doc_version: 3
doc_updated_at: "2026-04-21T11:12:06.395Z"
doc_updated_by: "CODER"
description: "Decompose hooks and work-start command implementations after hosted-close pipeline patterns are established."
sections:
  Summary: "Apply the lifecycle/module extraction pattern to hooks/index.ts and branch/work-start.ts where it improves clarity."
  Scope: "In scope: hooks command implementation, work-start command implementation, and affected tests. Out of scope: workflow mode semantics and branch naming policy changes."
  Plan: |-
    1. Reuse extraction patterns proven in T17.
    2. Split hooks by subcommand/responsibility.
    3. Split work-start by validation, branch/worktree operations, scaffolding, and reporting.
    4. Run hooks and branch workflow tests.
  Verify Steps: |-
    - Each entrypoint is smaller and delegates to cohesive modules.
    - Affected tests pass.
    - No CLI help/contract changes except incidental source organization.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T11:11:37.150Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: split hooks and work-start hotspots into cohesive modules while preserving CLI contracts. Commands: bunx prettier --check targeted hooks/work-start files (pass); bunx eslint targeted hooks/work-start files (pass); bun run test:project -- fast packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/pre-commit-hook-script.test.ts (pass, 12 tests); bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts (pass, 37 tests); bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts (pass, 15 tests); bun run --filter=agentplane typecheck (pass); bun run hotspots:check (pass); bun run framework:dev:bootstrap (pass). Note: attempted unrelated lifecycle emoji test still fails with expected code 0 but got 2, outside this task scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T11:04:47.458Z, excerpt_hash=sha256:538c0a88c971b9cfedfb4f6ab09b57457ad74bd804c6c2caf7d69d657abb23f2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert module extraction for hooks/work-start."
  Findings: "Depends on T17 so the command-pipeline pattern is established first."
id_source: "generated"
---
## Summary

Apply the lifecycle/module extraction pattern to hooks/index.ts and branch/work-start.ts where it improves clarity.

## Scope

In scope: hooks command implementation, work-start command implementation, and affected tests. Out of scope: workflow mode semantics and branch naming policy changes.

## Plan

1. Reuse extraction patterns proven in T17.
2. Split hooks by subcommand/responsibility.
3. Split work-start by validation, branch/worktree operations, scaffolding, and reporting.
4. Run hooks and branch workflow tests.

## Verify Steps

- Each entrypoint is smaller and delegates to cohesive modules.
- Affected tests pass.
- No CLI help/contract changes except incidental source organization.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T11:11:37.150Z — VERIFY — ok

By: CODER

Note: Verified: split hooks and work-start hotspots into cohesive modules while preserving CLI contracts. Commands: bunx prettier --check targeted hooks/work-start files (pass); bunx eslint targeted hooks/work-start files (pass); bun run test:project -- fast packages/agentplane/src/commands/workflow.verify-hooks.test.ts packages/agentplane/src/cli/pre-commit-hook-script.test.ts (pass, 12 tests); bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts (pass, 37 tests); bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts (pass, 15 tests); bun run --filter=agentplane typecheck (pass); bun run hotspots:check (pass); bun run framework:dev:bootstrap (pass). Note: attempted unrelated lifecycle emoji test still fails with expected code 0 but got 2, outside this task scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T11:04:47.458Z, excerpt_hash=sha256:538c0a88c971b9cfedfb4f6ab09b57457ad74bd804c6c2caf7d69d657abb23f2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert module extraction for hooks/work-start.

## Findings

Depends on T17 so the command-pipeline pattern is established first.
