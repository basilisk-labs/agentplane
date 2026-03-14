---
id: "202603141209-2BKPF9"
title: "Add opt-in upgrade bridge for task README migration"
result_summary: "Upgrade now supports --migrate-task-docs to migrate legacy task README docs in the same apply run while skipping ignored snapshot paths from the upgrade commit."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "code"
  - "upgrade"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/release-smoke.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T12:17:13.973Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T12:25:19.580Z"
  updated_by: "CODER"
  note: "Verified: upgrade can now migrate legacy task README docs in the same apply run when explicitly requested."
commit:
  hash: "aef0c5a7b90ed0e4e4f812e3d47be3ed4c652ef6"
  message: "✨ 2BKPF9 code: add opt-in upgrade bridge for task README migration"
comments:
  -
    author: "CODER"
    body: "Start: add an opt-in upgrade bridge that migrates task README docs only when requested and only when migration is actually needed."
  -
    author: "CODER"
    body: "Verified: targeted unit, CLI, release-smoke, lint, typecheck, and package builds passed; upgrade now supports an explicit one-run bridge for legacy task README migration."
events:
  -
    type: "status"
    at: "2026-03-14T12:17:14.430Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add an opt-in upgrade bridge that migrates task README docs only when requested and only when migration is actually needed."
  -
    type: "verify"
    at: "2026-03-14T12:25:19.580Z"
    author: "CODER"
    state: "ok"
    note: "Verified: upgrade can now migrate legacy task README docs in the same apply run when explicitly requested."
  -
    type: "status"
    at: "2026-03-14T12:27:57.750Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: targeted unit, CLI, release-smoke, lint, typecheck, and package builds passed; upgrade now supports an explicit one-run bridge for legacy task README migration."
doc_version: 3
doc_updated_at: "2026-03-14T12:27:57.751Z"
doc_updated_by: "CODER"
description: "Provide a safe opt-in path that lets upgrade hand off or trigger task README migration only when doctor detects an active v2/v3 mixed state, without changing the default upgrade semantics silently."
sections:
  Summary: |-
    Add opt-in upgrade bridge for task README migration
    
    Provide a safe opt-in path that lets upgrade hand off or trigger task README migration only when doctor detects an active v2/v3 mixed state, without changing the default upgrade semantics silently.
  Scope: |-
    - In scope: Provide a safe opt-in path that lets upgrade hand off or trigger task README migration only when doctor detects an active v2/v3 mixed state, without changing the default upgrade semantics silently.
    - Out of scope: unrelated refactors not required for "Add opt-in upgrade bridge for task README migration".
  Plan: "1. Design a safe opt-in bridge that can chain upgrade and task-doc migration only when migration is actually required. 2. Implement the bridge without changing default upgrade semantics or silently mutating task docs. 3. Validate the opt-in path with upgrade, migrate-doc, and release-smoke regressions."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/release-smoke.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T12:25:19.580Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: upgrade can now migrate legacy task README docs in the same apply run when explicitly requested.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T12:17:14.431Z, excerpt_hash=sha256:0479b85425a91a27933ddad8c37ca9ad4d07a8494a7b1695959c767024f0fa2d
    
    Details:
    
    Command: bun x vitest run packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/commands/upgrade.spec-parse.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts
    Result: pass
    Evidence: 35 tests passed; the new --migrate-task-docs flag validates correctly, upgrade can recover legacy README v2 tasks in one run, and the release smoke path no longer needs a separate migrate-doc step.
    Scope: shared task-doc migration helper, upgrade CLI/spec, one-step legacy recovery path.
    
    Command: bun x tsc -b packages/core packages/agentplane
    Result: pass
    Evidence: TypeScript project build completed without errors.
    Scope: compile safety for the migrate-doc helper reuse and upgrade integration.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0.
    Scope: refreshed the repo-local CLI runtime before lifecycle mutations.
    
    Command: git diff -- packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/commands/upgrade.command.ts packages/agentplane/src/commands/upgrade.spec-parse.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts
    Result: pass
    Evidence: diff is limited to the opt-in bridge, path-stageability guard, and regression coverage for the single-run recovery flow.
    Scope: final result compared against the approved task scope.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add opt-in upgrade bridge for task README migration

Provide a safe opt-in path that lets upgrade hand off or trigger task README migration only when doctor detects an active v2/v3 mixed state, without changing the default upgrade semantics silently.

## Scope

- In scope: Provide a safe opt-in path that lets upgrade hand off or trigger task README migration only when doctor detects an active v2/v3 mixed state, without changing the default upgrade semantics silently.
- Out of scope: unrelated refactors not required for "Add opt-in upgrade bridge for task README migration".

## Plan

1. Design a safe opt-in bridge that can chain upgrade and task-doc migration only when migration is actually required. 2. Implement the bridge without changing default upgrade semantics or silently mutating task docs. 3. Validate the opt-in path with upgrade, migrate-doc, and release-smoke regressions.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/release-smoke.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T12:25:19.580Z — VERIFY — ok

By: CODER

Note: Verified: upgrade can now migrate legacy task README docs in the same apply run when explicitly requested.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T12:17:14.431Z, excerpt_hash=sha256:0479b85425a91a27933ddad8c37ca9ad4d07a8494a7b1695959c767024f0fa2d

Details:

Command: bun x vitest run packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/commands/upgrade.spec-parse.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts
Result: pass
Evidence: 35 tests passed; the new --migrate-task-docs flag validates correctly, upgrade can recover legacy README v2 tasks in one run, and the release smoke path no longer needs a separate migrate-doc step.
Scope: shared task-doc migration helper, upgrade CLI/spec, one-step legacy recovery path.

Command: bun x tsc -b packages/core packages/agentplane
Result: pass
Evidence: TypeScript project build completed without errors.
Scope: compile safety for the migrate-doc helper reuse and upgrade integration.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited with code 0.
Scope: refreshed the repo-local CLI runtime before lifecycle mutations.

Command: git diff -- packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/commands/upgrade.command.ts packages/agentplane/src/commands/upgrade.spec-parse.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts
Result: pass
Evidence: diff is limited to the opt-in bridge, path-stageability guard, and regression coverage for the single-run recovery flow.
Scope: final result compared against the approved task scope.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
