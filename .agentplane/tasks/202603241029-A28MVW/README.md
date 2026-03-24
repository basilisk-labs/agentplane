---
id: "202603241029-A28MVW"
title: "Expose runner trace via first-class CLI commands"
result_summary: "Added first-class runner inspection commands for persisted runs."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603241029-3A427Q"
tags:
  - "code"
  - "runner"
  - "cli"
  - "traces"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T10:55:27.936Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T11:33:57.846Z"
  updated_by: "CODER"
  note: "Implemented first-class runner inspection commands task run show, task run trace, and task run tail with latest-run resolution, typed missing-run artifact errors, and raw trace tailing from existing runner artifacts. Verified with: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u; bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/agentplane/src/runner/usecases/task-run-inspect.ts packages/agentplane/src/commands/task/run-show.spec.ts packages/agentplane/src/commands/task/run-trace.spec.ts packages/agentplane/src/commands/task/run-tail.spec.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/commands/task/run-trace.command.ts packages/agentplane/src/commands/task/run-tail.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts."
commit:
  hash: "43e0a46ab9874ef9ecd2dc522dea54500643bd1a"
  message: "✅ A28MVW code: done"
comments:
  -
    author: "CODER"
    body: "Start: inspect the task-run command tree and runner artifact readers before adding show, trace, and tail inspection commands."
  -
    author: "CODER"
    body: "Verified: added task run show, trace, and tail commands with latest-run resolution and raw trace inspection; focused CLI tests, help snapshots, build, and lint passed."
events:
  -
    type: "status"
    at: "2026-03-24T10:55:35.559Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the task-run command tree and runner artifact readers before adding show, trace, and tail inspection commands."
  -
    type: "verify"
    at: "2026-03-24T11:33:57.846Z"
    author: "CODER"
    state: "ok"
    note: "Implemented first-class runner inspection commands task run show, task run trace, and task run tail with latest-run resolution, typed missing-run artifact errors, and raw trace tailing from existing runner artifacts. Verified with: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u; bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/agentplane/src/runner/usecases/task-run-inspect.ts packages/agentplane/src/commands/task/run-show.spec.ts packages/agentplane/src/commands/task/run-trace.spec.ts packages/agentplane/src/commands/task/run-tail.spec.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/commands/task/run-trace.command.ts packages/agentplane/src/commands/task/run-tail.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts."
  -
    type: "status"
    at: "2026-03-24T11:35:24.458Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added task run show, trace, and tail commands with latest-run resolution and raw trace inspection; focused CLI tests, help snapshots, build, and lint passed."
doc_version: 3
doc_updated_at: "2026-03-24T11:35:24.459Z"
doc_updated_by: "CODER"
description: "Add task run show, trace, and tail commands so run-state, result, events, and raw trace can be inspected without reading files directly."
sections:
  Summary: "Add first-class runner inspection commands for persisted runs so users can read run-state, result, events, and raw trace without opening files directly."
  Scope: |-
    - In scope: add `agentplane task run show`, `agentplane task run trace`, and `agentplane task run tail`; reuse existing run artifacts and typed error handling; cover CLI behavior with focused tests.
    - Out of scope: new runner execution semantics, retention/compression policy, or artifact format changes not required for inspection commands.
  Plan: |-
    1. Inspect current task-run command tree and runner artifact readers.
    2. Implement `show`, `trace`, and `tail` commands with task-id/run-id resolution and typed missing-run errors.
    3. Add focused CLI coverage for successful inspection and missing-artifact paths.
    4. Run focused tests and source build, then record verification evidence and finish.
  Verify Steps: |-
    1. Run `agentplane task run show <task-id> [run-id]` against a prepared fixture run. Expected: it prints persisted run metadata and result summary without reading files manually.
    2. Run `agentplane task run trace <task-id> [run-id]` and `agentplane task run tail <task-id> [run-id]`. Expected: raw trace and capped tail output are readable through CLI and missing runs fail with typed errors.
    3. Run focused CLI tests plus source build. Expected: touched runner/CLI scope passes without regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T11:33:57.846Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented first-class runner inspection commands task run show, task run trace, and task run tail with latest-run resolution, typed missing-run artifact errors, and raw trace tailing from existing runner artifacts. Verified with: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u; bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/agentplane/src/runner/usecases/task-run-inspect.ts packages/agentplane/src/commands/task/run-show.spec.ts packages/agentplane/src/commands/task/run-trace.spec.ts packages/agentplane/src/commands/task/run-tail.spec.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/commands/task/run-trace.command.ts packages/agentplane/src/commands/task/run-tail.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T10:55:35.561Z, excerpt_hash=sha256:84ce02cd70f64c45a36ca360f5ab1d26089bdf839f0838e196f3c96125b84a78
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit.
    - Re-run focused runner CLI tests and source build to confirm the inspection surface is removed cleanly.
  Findings: ""
id_source: "generated"
---
## Summary

Add first-class runner inspection commands for persisted runs so users can read run-state, result, events, and raw trace without opening files directly.

## Scope

- In scope: add `agentplane task run show`, `agentplane task run trace`, and `agentplane task run tail`; reuse existing run artifacts and typed error handling; cover CLI behavior with focused tests.
- Out of scope: new runner execution semantics, retention/compression policy, or artifact format changes not required for inspection commands.

## Plan

1. Inspect current task-run command tree and runner artifact readers.
2. Implement `show`, `trace`, and `tail` commands with task-id/run-id resolution and typed missing-run errors.
3. Add focused CLI coverage for successful inspection and missing-artifact paths.
4. Run focused tests and source build, then record verification evidence and finish.

## Verify Steps

1. Run `agentplane task run show <task-id> [run-id]` against a prepared fixture run. Expected: it prints persisted run metadata and result summary without reading files manually.
2. Run `agentplane task run trace <task-id> [run-id]` and `agentplane task run tail <task-id> [run-id]`. Expected: raw trace and capped tail output are readable through CLI and missing runs fail with typed errors.
3. Run focused CLI tests plus source build. Expected: touched runner/CLI scope passes without regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T11:33:57.846Z — VERIFY — ok

By: CODER

Note: Implemented first-class runner inspection commands task run show, task run trace, and task run tail with latest-run resolution, typed missing-run artifact errors, and raw trace tailing from existing runner artifacts. Verified with: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u; bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/agentplane/src/runner/usecases/task-run-inspect.ts packages/agentplane/src/commands/task/run-show.spec.ts packages/agentplane/src/commands/task/run-trace.spec.ts packages/agentplane/src/commands/task/run-tail.spec.ts packages/agentplane/src/commands/task/run-show.command.ts packages/agentplane/src/commands/task/run-trace.command.ts packages/agentplane/src/commands/task/run-tail.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T10:55:35.561Z, excerpt_hash=sha256:84ce02cd70f64c45a36ca360f5ab1d26089bdf839f0838e196f3c96125b84a78

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit.
- Re-run focused runner CLI tests and source build to confirm the inspection surface is removed cleanly.

## Findings
