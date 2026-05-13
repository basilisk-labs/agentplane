---
id: "202605131049-2NHAWN"
title: "Harvest completed tasks into context knowledge"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T10:49:39.154Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T11:02:32.328Z"
  updated_by: "CODER"
  note: "Implemented context harvest tasks with provenance-backed raw evidence, fact/graph proposal rows, wiki synthesis, promotion gate, context-init write gate, docs, and focused tests."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement task-scoped context harvesting for completed tasks with source evidence, extraction artifacts, wiki/fact/graph proposals, and promotion gate validation."
events:
  -
    type: "status"
    at: "2026-05-13T10:49:55.746Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement task-scoped context harvesting for completed tasks with source evidence, extraction artifacts, wiki/fact/graph proposals, and promotion gate validation."
  -
    type: "verify"
    at: "2026-05-13T11:02:32.328Z"
    author: "CODER"
    state: "ok"
    note: "Implemented context harvest tasks with provenance-backed raw evidence, fact/graph proposal rows, wiki synthesis, promotion gate, context-init write gate, docs, and focused tests."
doc_version: 3
doc_updated_at: "2026-05-13T11:02:32.337Z"
doc_updated_by: "CODER"
description: "Add a context pipeline operation that harvests completed tasks into source-backed wiki, fact, graph, and promotion-gate artifacts with provenance, conflict handling, and stale markers."
sections:
  Summary: |-
    Harvest completed tasks into context knowledge

    Add a context pipeline operation that harvests completed tasks into source-backed wiki, fact, graph, and promotion-gate artifacts with provenance, conflict handling, and stale markers.
  Scope: |-
    - In scope: Add a context pipeline operation that harvests completed tasks into source-backed wiki, fact, graph, and promotion-gate artifacts with provenance, conflict handling, and stale markers.
    - Out of scope: unrelated refactors not required for "Harvest completed tasks into context knowledge".
  Plan: |-
    1. Inspect the existing context command architecture, task registry readers, context projection utilities, and docs to place task harvesting inside the current context pipeline.
    2. Add a task-harvest command surface that selects completed tasks by status/tag/date/task id, supports dry-run and proposal writes, and keeps raw evidence separate from extracted knowledge.
    3. Implement extraction outputs with provenance, confidence, conflict/staleness markers, wiki proposal synthesis, fact rows, graph rows, and promotion-gate report artifacts.
    4. Add verification/doctor coverage that rejects unsupported promotion artifacts without source refs and validates the harvest report shape.
    5. Update generated/user documentation and run focused tests, typecheck, routing, doctor, and task verification.
  Verify Steps: |-
    1. Run focused tests for the new context task-harvest command and changed context verification/projection helpers. Expected: task selection, dry-run, proposal writes in an initialized temp context, provenance, conflicts, stale markers, context-init write gate, and promotion blockers pass.
    2. Run TypeScript/lint/format checks covering touched implementation and docs files. Expected: no type, lint, formatting, CLI reference, or whitespace regressions in changed context/task command surfaces.
    3. Run `ap task verify-show 202605131049-2NHAWN`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: task evidence, policy routing, and runtime health remain valid.
    4. Run local CLI smokes: dry-run against a narrow DONE task/tag selection and write-proposal mode in the uninitialized repo context. Expected: dry-run emits source-backed selected tasks without writes, and write mode fails with an explicit `context init` gate instead of creating partial context artifacts.
    5. Review generated/user docs for the new operation. Expected: docs describe indexing, extraction, synthesis, promotion gates, and context-init write requirements without claiming canonical promotion by default.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T11:02:32.328Z — VERIFY — ok

    By: CODER

    Note: Implemented context harvest tasks with provenance-backed raw evidence, fact/graph proposal rows, wiki synthesis, promotion gate, context-init write gate, docs, and focused tests.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T11:02:05.847Z, excerpt_hash=sha256:a19d9e14ef8367c92a0333b619f0318bc617e0e260731a2130a22e6889466006

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131049-2NHAWN-context-task-harvest/.agentplane/tasks/202605131049-2NHAWN/blueprint/resolved-snapshot.json
    - old_digest: d327d812c821253c0baa732615c6ae00be6d383ef8bf74c06a69e3afb215291e
    - current_digest: d327d812c821253c0baa732615c6ae00be6d383ef8bf74c06a69e3afb215291e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131049-2NHAWN

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks passed: focused context tests (9 pass), exact-file eslint, package TypeScript noEmit, framework:dev:bootstrap, docs:cli:check, format:check, git diff --check, policy routing, ap doctor, dry-run CLI smoke. Write-proposal smoke in uninitialized repo correctly failed with explicit context init gate.
      Impact: Completed tasks can now be harvested oldest-first into reusable context proposals without silent canonical promotion or partial context workspace creation.
      Resolution: Use ap context harvest tasks with --dry-run first, then --write-proposals after ap context init, and --promote only when the promotion gate has no blockers.
id_source: "generated"
---
## Summary

Harvest completed tasks into context knowledge

Add a context pipeline operation that harvests completed tasks into source-backed wiki, fact, graph, and promotion-gate artifacts with provenance, conflict handling, and stale markers.

## Scope

- In scope: Add a context pipeline operation that harvests completed tasks into source-backed wiki, fact, graph, and promotion-gate artifacts with provenance, conflict handling, and stale markers.
- Out of scope: unrelated refactors not required for "Harvest completed tasks into context knowledge".

## Plan

1. Inspect the existing context command architecture, task registry readers, context projection utilities, and docs to place task harvesting inside the current context pipeline.
2. Add a task-harvest command surface that selects completed tasks by status/tag/date/task id, supports dry-run and proposal writes, and keeps raw evidence separate from extracted knowledge.
3. Implement extraction outputs with provenance, confidence, conflict/staleness markers, wiki proposal synthesis, fact rows, graph rows, and promotion-gate report artifacts.
4. Add verification/doctor coverage that rejects unsupported promotion artifacts without source refs and validates the harvest report shape.
5. Update generated/user documentation and run focused tests, typecheck, routing, doctor, and task verification.

## Verify Steps

1. Run focused tests for the new context task-harvest command and changed context verification/projection helpers. Expected: task selection, dry-run, proposal writes in an initialized temp context, provenance, conflicts, stale markers, context-init write gate, and promotion blockers pass.
2. Run TypeScript/lint/format checks covering touched implementation and docs files. Expected: no type, lint, formatting, CLI reference, or whitespace regressions in changed context/task command surfaces.
3. Run `ap task verify-show 202605131049-2NHAWN`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: task evidence, policy routing, and runtime health remain valid.
4. Run local CLI smokes: dry-run against a narrow DONE task/tag selection and write-proposal mode in the uninitialized repo context. Expected: dry-run emits source-backed selected tasks without writes, and write mode fails with an explicit `context init` gate instead of creating partial context artifacts.
5. Review generated/user docs for the new operation. Expected: docs describe indexing, extraction, synthesis, promotion gates, and context-init write requirements without claiming canonical promotion by default.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T11:02:32.328Z — VERIFY — ok

By: CODER

Note: Implemented context harvest tasks with provenance-backed raw evidence, fact/graph proposal rows, wiki synthesis, promotion gate, context-init write gate, docs, and focused tests.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T11:02:05.847Z, excerpt_hash=sha256:a19d9e14ef8367c92a0333b619f0318bc617e0e260731a2130a22e6889466006

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131049-2NHAWN-context-task-harvest/.agentplane/tasks/202605131049-2NHAWN/blueprint/resolved-snapshot.json
- old_digest: d327d812c821253c0baa732615c6ae00be6d383ef8bf74c06a69e3afb215291e
- current_digest: d327d812c821253c0baa732615c6ae00be6d383ef8bf74c06a69e3afb215291e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131049-2NHAWN

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Checks passed: focused context tests (9 pass), exact-file eslint, package TypeScript noEmit, framework:dev:bootstrap, docs:cli:check, format:check, git diff --check, policy routing, ap doctor, dry-run CLI smoke. Write-proposal smoke in uninitialized repo correctly failed with explicit context init gate.
  Impact: Completed tasks can now be harvested oldest-first into reusable context proposals without silent canonical promotion or partial context workspace creation.
  Resolution: Use ap context harvest tasks with --dry-run first, then --write-proposals after ap context init, and --promote only when the promotion gate has no blockers.
