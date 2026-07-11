---
id: "202607092208-1J49NQ"
title: "Split routing and task-command hotspots for v0.6.22"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "patch-0.6.22"
  - "refactor"
  - "routing"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run hotspots:check"
  - "bun run lifecycle:invariants"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/shared packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:56.765Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split routing and task-command hotspots along existing domain boundaries while preserving lifecycle and CLI contracts."
events:
  -
    type: "status"
    at: "2026-07-10T16:21:23.394Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split routing and task-command hotspots along existing domain boundaries while preserving lifecycle and CLI contracts."
doc_version: 3
doc_updated_at: "2026-07-11T11:16:05.227Z"
doc_updated_by: "CODER"
description: "Decompose route-oracle, hosted-close, task new, platform CLI, and close-message rendering modules into typed domain helpers while preserving route decisions, exit codes, and task lifecycle contracts."
sections:
  Summary: |-
    Split routing and task-command hotspots for v0.6.22

    Decompose route-oracle, hosted-close, task new, platform CLI, and close-message rendering modules into typed domain helpers while preserving route decisions, exit codes, and task lifecycle contracts.
  Scope: |-
    - In scope: Decompose route-oracle, hosted-close, task new, platform CLI, and close-message rendering modules into typed domain helpers while preserving route decisions, exit codes, and task lifecycle contracts.
    - Out of scope: unrelated refactors not required for "Split routing and task-command hotspots for v0.6.22".
  Plan: |-
    1. Partition route, hosted-close, task-new, platform, and close-message responsibilities along typed contract boundaries.
    2. Preserve blocker codes, exact repair commands, exit codes, and lifecycle invariants.
    3. Add focused regression tests at each extracted boundary.
    4. Run route/task suites, lifecycle invariants, hotspots, and typecheck.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/shared packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`; route and task lifecycle tests pass.
    2. Run `bun run lifecycle:invariants`; it passes against the split implementation.
    3. Run `bun run hotspots:check`; touched modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
    4. Run `bun run typecheck` and `bun run ci:contract`; both pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Split route execution packets from route phase selection while preserving exported route-oracle APIs, blocker codes, argv safety, and exact recovery commands.
    - Split hosted-close pre-merge validation, task-new duplicate detection, platform role-guide rendering, and close-message verification normalization into focused helpers.
    - All touched runtime modules are below 400 lines; runtime hotspot count decreased from 14 to 9 (18 before the v0.6.22 refactor tranche).
    - Verification passed: focused route/task/guard suite 62 files/440 tests, lifecycle invariants, hotspots:check, typecheck, ci:contract, and full test:fast 364 files/2157 tests.
id_source: "generated"
---
## Summary

Split routing and task-command hotspots for v0.6.22

Decompose route-oracle, hosted-close, task new, platform CLI, and close-message rendering modules into typed domain helpers while preserving route decisions, exit codes, and task lifecycle contracts.

## Scope

- In scope: Decompose route-oracle, hosted-close, task new, platform CLI, and close-message rendering modules into typed domain helpers while preserving route decisions, exit codes, and task lifecycle contracts.
- Out of scope: unrelated refactors not required for "Split routing and task-command hotspots for v0.6.22".

## Plan

1. Partition route, hosted-close, task-new, platform, and close-message responsibilities along typed contract boundaries.
2. Preserve blocker codes, exact repair commands, exit codes, and lifecycle invariants.
3. Add focused regression tests at each extracted boundary.
4. Run route/task suites, lifecycle invariants, hotspots, and typecheck.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/shared packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`; route and task lifecycle tests pass.
2. Run `bun run lifecycle:invariants`; it passes against the split implementation.
3. Run `bun run hotspots:check`; touched modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
4. Run `bun run typecheck` and `bun run ci:contract`; both pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Split route execution packets from route phase selection while preserving exported route-oracle APIs, blocker codes, argv safety, and exact recovery commands.
- Split hosted-close pre-merge validation, task-new duplicate detection, platform role-guide rendering, and close-message verification normalization into focused helpers.
- All touched runtime modules are below 400 lines; runtime hotspot count decreased from 14 to 9 (18 before the v0.6.22 refactor tranche).
- Verification passed: focused route/task/guard suite 62 files/440 tests, lifecycle invariants, hotspots:check, typecheck, ci:contract, and full test:fast 364 files/2157 tests.
