---
id: "202605251818-28Z5H1"
title: "Reduce redundancy in AgentPlane code"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-25T18:19:41.278Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-25T18:34:50.305Z"
  updated_by: "CODER"
  note: |-
    Command: bun run arch:deps. Result: pass. Evidence: no dependency violations found across 1335 modules and 3423 dependencies. Scope: package import graph and circular dependency guard.
    Command: bun run clone:report. Result: pass. Evidence: clone metrics improved from 1.12% to 0.98%, clones 94 to 89, duplicated lines 1595 to 1403. Scope: touched source and script clone clusters.
    Command: bun run knip:report and bun run knip:check. Result: pass. Evidence: report preserved existing baseline shape; baseline OK files=1/1 exports=207/207 types=358/358 total=566/566. Scope: unused files/exports/types.
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/prompts.test.ts. Result: pass. Evidence: 1 file, 12 tests passed. Scope: prompt canonical function behavior after alias removal.
    Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts. Result: pass. Evidence: 2 files, 11 tests passed. Scope: route/task brief source confidence behavior.
    Command: bun run release:homebrew:check && bun run release:scoop:check && bun run release:setup-action:check. Result: pass. Evidence: all render checks reached skipped_missing_credentials gate. Scope: release distribution render helper extraction.
    Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references.
    Command: bun run format:changed. Result: pass. Evidence: all matched files use Prettier code style. Scope: changed file formatting.
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement approved low-risk redundancy reductions in the dedicated branch_pr worktree, preserving public CLI behavior and using the declared architecture, clone, knip, focused test, and typecheck verification contract."
events:
  -
    type: "status"
    at: "2026-05-25T18:20:35.052Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved low-risk redundancy reductions in the dedicated branch_pr worktree, preserving public CLI behavior and using the declared architecture, clone, knip, focused test, and typecheck verification contract."
  -
    type: "verify"
    at: "2026-05-25T18:34:50.305Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun run arch:deps. Result: pass. Evidence: no dependency violations found across 1335 modules and 3423 dependencies. Scope: package import graph and circular dependency guard.
      Command: bun run clone:report. Result: pass. Evidence: clone metrics improved from 1.12% to 0.98%, clones 94 to 89, duplicated lines 1595 to 1403. Scope: touched source and script clone clusters.
      Command: bun run knip:report and bun run knip:check. Result: pass. Evidence: report preserved existing baseline shape; baseline OK files=1/1 exports=207/207 types=358/358 total=566/566. Scope: unused files/exports/types.
      Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/prompts.test.ts. Result: pass. Evidence: 1 file, 12 tests passed. Scope: prompt canonical function behavior after alias removal.
      Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts. Result: pass. Evidence: 2 files, 11 tests passed. Scope: route/task brief source confidence behavior.
      Command: bun run release:homebrew:check && bun run release:scoop:check && bun run release:setup-action:check. Result: pass. Evidence: all render checks reached skipped_missing_credentials gate. Scope: release distribution render helper extraction.
      Command: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references.
      Command: bun run format:changed. Result: pass. Evidence: all matched files use Prettier code style. Scope: changed file formatting.
doc_version: 3
doc_updated_at: "2026-05-25T18:34:50.364Z"
doc_updated_by: "CODER"
description: "Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded."
sections:
  Summary: |-
    Reduce redundancy in AgentPlane code

    Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded.
  Scope: |-
    - In scope: Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded.
    - Out of scope: unrelated refactors not required for "Reduce redundancy in AgentPlane code".
  Plan: |-
    Atomic sequence:
    1. Establish baseline with existing architecture, clone, knip, and hotspot reports.
    2. Remove or replace prompt alias exports only if internal usage proves they are not public API critical.
    3. Centralize repeated task domain value sets used by task creation, backend record normalization, blueprint task input, and hooks task context.
    4. Extract common route/remote source-confidence construction and reuse it from task status/next-action and task brief.
    5. Reduce confirmed local clone clusters in release/check helpers only when the helper extraction stays narrow and covered by existing check scripts.
    6. Leave speculative public/barrel export deletions as classified findings unless current evidence proves safe removal.
    7. Run required checks and record verification evidence.
  Verify Steps: |-
    1. Run: bun run arch:deps. Expect no dependency violations or circular imports.
    2. Run: bun run knip:report. Expect no new high-confidence dead-code findings introduced by the refactor; classify remaining public/barrel findings if unchanged.
    3. Run: bun run clone:report. Expect clone percentage not to increase and target clone clusters reduced where touched.
    4. Run focused Vitest coverage for touched command/backend/route modules. Expect all targeted tests pass.
    5. Run: bun run typecheck. Expect TypeScript project references pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-25T18:34:50.305Z — VERIFY — ok

    By: CODER

    Note: Command: bun run arch:deps. Result: pass. Evidence: no dependency violations found across 1335 modules and 3423 dependencies. Scope: package import graph and circular dependency guard.\nCommand: bun run clone:report. Result: pass. Evidence: clone metrics improved from 1.12% to 0.98%, clones 94 to 89, duplicated lines 1595 to 1403. Scope: touched source and script clone clusters.\nCommand: bun run knip:report and bun run knip:check. Result: pass. Evidence: report preserved existing baseline shape; baseline OK files=1/1 exports=207/207 types=358/358 total=566/566. Scope: unused files/exports/types.\nCommand: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/prompts.test.ts. Result: pass. Evidence: 1 file, 12 tests passed. Scope: prompt canonical function behavior after alias removal.\nCommand: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts. Result: pass. Evidence: 2 files, 11 tests passed. Scope: route/task brief source confidence behavior.\nCommand: bun run release:homebrew:check && bun run release:scoop:check && bun run release:setup-action:check. Result: pass. Evidence: all render checks reached skipped_missing_credentials gate. Scope: release distribution render helper extraction.\nCommand: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references.\nCommand: bun run format:changed. Result: pass. Evidence: all matched files use Prettier code style. Scope: changed file formatting.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T18:20:35.052Z, excerpt_hash=sha256:dd4bb74e0f9d94118dfeadc34f756017ac7ae699f7b7e108ab8b042a6492eb31

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251818-28Z5H1-reduce-redundancy-in-agentplane-code/.agentplane/tasks/202605251818-28Z5H1/blueprint/resolved-snapshot.json
    - old_digest: 9fd821cb546f4b86fe783224e49ba7bec93f2ab63b182badd824738f2f3803da
    - current_digest: 9fd821cb546f4b86fe783224e49ba7bec93f2ab63b182badd824738f2f3803da
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605251818-28Z5H1

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the implementation commit on the task branch. If a shared helper introduces behavior drift, revert only that helper extraction and keep independent low-risk deletions that passed targeted tests."
  Findings: ""
id_source: "generated"
---
## Summary

Reduce redundancy in AgentPlane code

Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded.

## Scope

- In scope: Refactor low-risk repeated code surfaces identified by the redundancy audit: prompt aliases, duplicated task domain constants, shared route source confidence, and closely related helper duplication where verification remains bounded.
- Out of scope: unrelated refactors not required for "Reduce redundancy in AgentPlane code".

## Plan

Atomic sequence:
1. Establish baseline with existing architecture, clone, knip, and hotspot reports.
2. Remove or replace prompt alias exports only if internal usage proves they are not public API critical.
3. Centralize repeated task domain value sets used by task creation, backend record normalization, blueprint task input, and hooks task context.
4. Extract common route/remote source-confidence construction and reuse it from task status/next-action and task brief.
5. Reduce confirmed local clone clusters in release/check helpers only when the helper extraction stays narrow and covered by existing check scripts.
6. Leave speculative public/barrel export deletions as classified findings unless current evidence proves safe removal.
7. Run required checks and record verification evidence.

## Verify Steps

1. Run: bun run arch:deps. Expect no dependency violations or circular imports.
2. Run: bun run knip:report. Expect no new high-confidence dead-code findings introduced by the refactor; classify remaining public/barrel findings if unchanged.
3. Run: bun run clone:report. Expect clone percentage not to increase and target clone clusters reduced where touched.
4. Run focused Vitest coverage for touched command/backend/route modules. Expect all targeted tests pass.
5. Run: bun run typecheck. Expect TypeScript project references pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-25T18:34:50.305Z — VERIFY — ok

By: CODER

Note: Command: bun run arch:deps. Result: pass. Evidence: no dependency violations found across 1335 modules and 3423 dependencies. Scope: package import graph and circular dependency guard.\nCommand: bun run clone:report. Result: pass. Evidence: clone metrics improved from 1.12% to 0.98%, clones 94 to 89, duplicated lines 1595 to 1403. Scope: touched source and script clone clusters.\nCommand: bun run knip:report and bun run knip:check. Result: pass. Evidence: report preserved existing baseline shape; baseline OK files=1/1 exports=207/207 types=358/358 total=566/566. Scope: unused files/exports/types.\nCommand: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/prompts.test.ts. Result: pass. Evidence: 1 file, 12 tests passed. Scope: prompt canonical function behavior after alias removal.\nCommand: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts. Result: pass. Evidence: 2 files, 11 tests passed. Scope: route/task brief source confidence behavior.\nCommand: bun run release:homebrew:check && bun run release:scoop:check && bun run release:setup-action:check. Result: pass. Evidence: all render checks reached skipped_missing_credentials gate. Scope: release distribution render helper extraction.\nCommand: bun run typecheck. Result: pass. Evidence: tsc -b completed with exit 0. Scope: TypeScript project references.\nCommand: bun run format:changed. Result: pass. Evidence: all matched files use Prettier code style. Scope: changed file formatting.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T18:20:35.052Z, excerpt_hash=sha256:dd4bb74e0f9d94118dfeadc34f756017ac7ae699f7b7e108ab8b042a6492eb31

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251818-28Z5H1-reduce-redundancy-in-agentplane-code/.agentplane/tasks/202605251818-28Z5H1/blueprint/resolved-snapshot.json
- old_digest: 9fd821cb546f4b86fe783224e49ba7bec93f2ab63b182badd824738f2f3803da
- current_digest: 9fd821cb546f4b86fe783224e49ba7bec93f2ab63b182badd824738f2f3803da
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605251818-28Z5H1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation commit on the task branch. If a shared helper introduces behavior drift, revert only that helper extraction and keep independent low-risk deletions that passed targeted tests.

## Findings
