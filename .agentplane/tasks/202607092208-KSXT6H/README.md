---
id: "202607092208-KSXT6H"
title: "Split runtime and backend hotspots for v0.6.22"
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
  - "runtime"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run arch:check"
  - "bun run hotspots:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/hermes packages/agentplane/src/runner packages/agentplane/src/commands/insights packages/agentplane/src/runtime/sgr packages/agentplane/src/backends/task-backend"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:57.070Z"
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
    body: "Start: split runtime and backend hotspots behind existing public APIs and schemas."
events:
  -
    type: "status"
    at: "2026-07-11T11:31:25.595Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split runtime and backend hotspots behind existing public APIs and schemas."
doc_version: 3
doc_updated_at: "2026-07-11T11:46:41.305Z"
doc_updated_by: "CODER"
description: "Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior."
sections:
  Summary: |-
    Split runtime and backend hotspots for v0.6.22

    Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior.
  Scope: |-
    - In scope: Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior.
    - Out of scope: unrelated refactors not required for "Split runtime and backend hotspots for v0.6.22".
  Plan: |-
    1. Identify stable seams in Hermes, result manifests, insights, SGR contracts, and cloud backends.
    2. Extract internal helpers while leaving public exports, schemas, serialized output, and backend semantics unchanged.
    3. Add regression tests for each moved boundary and verify architecture rules.
    4. Run focused suites, hotspot checks, architecture checks, and typecheck.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/hermes packages/agentplane/src/runner packages/agentplane/src/commands/insights packages/agentplane/src/runtime/sgr packages/agentplane/src/backends/task-backend`; focused suites pass.
    2. Run `bun run arch:check`; dependency boundaries remain valid.
    3. Run `bun run hotspots:check`; touched modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
    4. Run `bun run typecheck` and `bun run ci:contract`; both pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "Extracted cohesive internal modules for Hermes command/runtime, result-manifest artifacts, insights loading/rendering, SGR validation/routing, and cloud configuration overrides. All seven scoped >400-line runtime hotspots are now below the threshold; the repository-wide runtime hotspot count fell from 9 to 2, with the remaining PR flow-status and evaluator command files outside this task scope. Verification passed: focused suites 33 files / 246 tests, full suite 364 files / 2157 tests, build, typecheck, arch:check, hotspots:check, ci:contract, Knip baseline 574/574, and coverage thresholds."
id_source: "generated"
---
## Summary

Split runtime and backend hotspots for v0.6.22

Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior.

## Scope

- In scope: Decompose Hermes command/runtime, result manifest, insights report, SGR contracts, and cloud backend modules into cohesive helpers while retaining public APIs, schemas, and backend behavior.
- Out of scope: unrelated refactors not required for "Split runtime and backend hotspots for v0.6.22".

## Plan

1. Identify stable seams in Hermes, result manifests, insights, SGR contracts, and cloud backends.
2. Extract internal helpers while leaving public exports, schemas, serialized output, and backend semantics unchanged.
3. Add regression tests for each moved boundary and verify architecture rules.
4. Run focused suites, hotspot checks, architecture checks, and typecheck.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/hermes packages/agentplane/src/runner packages/agentplane/src/commands/insights packages/agentplane/src/runtime/sgr packages/agentplane/src/backends/task-backend`; focused suites pass.
2. Run `bun run arch:check`; dependency boundaries remain valid.
3. Run `bun run hotspots:check`; touched modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
4. Run `bun run typecheck` and `bun run ci:contract`; both pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Extracted cohesive internal modules for Hermes command/runtime, result-manifest artifacts, insights loading/rendering, SGR validation/routing, and cloud configuration overrides. All seven scoped >400-line runtime hotspots are now below the threshold; the repository-wide runtime hotspot count fell from 9 to 2, with the remaining PR flow-status and evaluator command files outside this task scope. Verification passed: focused suites 33 files / 246 tests, full suite 364 files / 2157 tests, build, typecheck, arch:check, hotspots:check, ci:contract, Knip baseline 574/574, and coverage thresholds.
